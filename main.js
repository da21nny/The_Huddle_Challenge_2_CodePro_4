import { huddleMap, TERRENO } from "./mapaLogica.js"
import { algoritmo_bfs } from "./algorimo_bfs.js";
import { mapaRender } from "./mapaRender.js";

let app; // Instancia global del mapa
let mapa; // Instancia global del renderizador del mapa

function iniciar_proyecto(){ // Función para iniciar el proyecto y asociar eventos a los botones
    const btnGenerar = document.getElementById('btnGenerar'); // Botón para generar la matriz
    const btnEnviar = document.getElementById('btnEnviar'); // Botón para enviar las coordenadas
    const mapaContenedor = document.getElementById('resultado'); //

    btnGenerar.addEventListener('click', crear_matriz); // Asocia el evento click al botón de generar matriz
    btnEnviar.addEventListener('click', procesar_coordenadas); // Asocia el evento click al botón de enviar coordenadas
    mapaContenedor.addEventListener('click', gestionar_click_mapa); // Asocia el evento click al contenedor del mapa
}

function crear_matriz(){ // Genera la matriz del mapa
    const numFila = parseInt(document.getElementById('fila').value); // Obtiene número de filas
    const numColumna = parseInt(document.getElementById('columna').value); // Obtiene número de columnas
    const radio_select = document.querySelector('input[name="dificultad"]:checked'); // Obtiene la dificultad seleccionada
    const dificultad = radio_select ? parseFloat(radio_select.value) : 0.1; // Valor por defecto si no hay selección
    
    let previo_inicio = null; // Guarda posición previa de inicio
    let previo_fin = null; // guarda posición previa de fin
   
    if(app && app.matriz){ // Si ya existe una instancia previa del mapa
        if(app.inicial_x !== null && app.inicial_y !== null) previo_inicio = { x: app.inicial_x, y: app.inicial_y };
        if(app.fin_x !== null && app.fin_y !== null) previo_fin = { x: app.fin_x, y: app.fin_y };
    }

    app = new huddleMap(numFila, numColumna); // Crea nueva instancia del mapa
    mapa = new mapaRender('resultado', numFila, numColumna); // Crea nueva instancia del renderizador del mapa

    if(previo_inicio){ // Restaura posición previa de inicio
        app.inicial_x = previo_inicio.x;
        app.inicial_y = previo_inicio.y;
    }
    if(previo_fin){ // Restaura posición previa de fin
        app.fin_x = previo_fin.x;
        app.fin_y = previo_fin.y;
    }

    app.generar_matriz(); // Genera la matriz vacía
    app.generar_obstaculos(dificultad); // Genera obstáculos según la dificultad
    actualizar_interfaz(); // Actualiza la interfaz para mostrar el nuevo mapa
}

function procesar_coordenadas(){ // Establece las coordenadas de inicio y fin
    if(!app){ // Verifica que la matriz esté generada
        alert("Genere primeramente la matriz");
        return;
    }

    const inicial_x = parseInt(document.getElementById('inicial_x').value); // Obtiene coordenada inicial X
    const inicial_y = parseInt(document.getElementById('inicial_y').value); // Obtiene coordenada inicial Y
    const fin_x = parseInt(document.getElementById('fin_x').value); // Obtiene coordenada final X
    const fin_y = parseInt(document.getElementById('fin_y').value); // Obtiene coordenada final Y

    app.coordenada_inicio_fin(inicial_x -1 , inicial_y - 1, fin_x - 1, fin_y - 1); // Establece las coordenadas en la matriz
    actualizar_interfaz(); // Actualiza la interfaz para reflejar los cambios
}

function actualizar_interfaz(){ // Actualiza la interfaz después de cambios en el mapa
    let mensaje = "0 pasos";
    if (app.inicial_x !== null && app.fin_x !== null) { // Verifica que las coordenadas de inicio y fin estén establecidas
        const distancia = algoritmo_bfs(app, app.inicial_x, app.inicial_y, app.fin_x, app.fin_y); // Ejecuta el algoritmo BFS

        if(distancia === -1){ // Si no hay camino disponible
            mensaje = "No hay camino disponible";
        }else{
            mensaje = distancia + " pasos"; // Actualiza el mensaje con la distancia encontrada
        }
    }
    document.getElementById('distancia').innerHTML = mensaje; // Actualiza el mensaje de distancia
    mapa.mostrar_mapa(app.matriz); // Muestra el mapa actualizado
}

function gestionar_click_mapa(evento){ // Gestiona los clics en el mapa para modificar terrenos
    // Verifica que la matriz esté generada y que se haya clickeado una celda válida.
    if (!app || !evento.target.classList.contains('cell')) return; 
    // Obtenemos la posición de la celda clickeada
    const fila = parseInt(evento.target.dataset.fila); // Fila de la celda clickeada
    const columna = parseInt(evento.target.dataset.columna); // Columna de la celda clickeada
    const valorActual = app.matriz[fila][columna]; // Valor actual de la celda clickeada
    // LÓGICA: Si es el Inicio (E) ni el Fin (S), no hacemos nada
    if (valorActual === TERRENO.INICIO || valorActual === TERRENO.FIN) return;
    // LÓGICA: Si no es el Inicio (E) ni el Fin (S), cambiamos el terreno        
    if (valorActual === TERRENO.LIBRE || valorActual === TERRENO.CAMINO) {
        const tipo_terreno = Math.floor(Math.random() * 3) + 1; // Valores entre 1 y 3
        app.matriz[fila][columna] = tipo_terreno; // Asignamos un obstáculo aleatorio
    } else{ // Si es un obstáculo, lo convertimos en libre
        app.matriz[fila][columna] = TERRENO.LIBRE; 
    }
    actualizar_interfaz(); // Actualizamos la interfaz para reflejar los cambios 
}

document.addEventListener('DOMContentLoaded', iniciar_proyecto) ; // Inicia el proyecto cuando el DOM esté cargado
