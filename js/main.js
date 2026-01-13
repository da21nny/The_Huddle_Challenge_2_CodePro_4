import { MapaLogica, TERRENO } from "./mapaLogica.js"
import { MapaRender } from "./mapaRender.js";
import { AlgoritmoAStar } from "./algoritmo_a_star.js";

let mapa_logica; // Instancia global del mapa lógico
let mapa_render; // Instancia global del renderizador del mapa

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
    
    let previo_inicio = null; // Guarda posición previa de inicio
    let previo_fin = null; // guarda posición previa de fin

    if(mapa_logica && mapa_logica.matriz){ // Si ya existe una instancia previa del mapa
        if(mapa_logica.inicial_x !== null && mapa_logica.inicial_y !== null) previo_inicio = { x: mapa_logica.inicial_x, y: mapa_logica.inicial_y };
        if(mapa_logica.fin_x !== null && mapa_logica.fin_y !== null) previo_fin = { x: mapa_logica.fin_x, y: mapa_logica.fin_y };
    }

    mapa_logica = new MapaLogica(numFila, numColumna); // Crea nueva instancia del mapa
    mapa_render = new MapaRender('resultado', numFila, numColumna); // Crea nueva instancia del renderizador del mapa

    if(previo_inicio){ // Restaura posición previa de inicio
        mapa_logica.inicial_x = previo_inicio.x;
        mapa_logica.inicial_y = previo_inicio.y;
    }
    if(previo_fin){ // Restaura posición previa de fin
        mapa_logica.fin_x = previo_fin.x;
        mapa_logica.fin_y = previo_fin.y;
    }

    mapa_logica.generar_matriz(); // Genera la matriz vacía
    mapa_logica.generar_obstaculos(); // Genera obstáculos según la dificultad
    actualizar_interfaz(); // Actualiza la interfaz para mostrar el nuevo mapa
}

function procesar_coordenadas(){ // Establece las coordenadas de inicio y fin
    if(!mapa_logica){ // Verifica que la matriz esté generada
        alert("Genere primeramente la matriz");
        return;
    }

    const inicial_x = parseInt(document.getElementById('inicial_x').value); // Obtiene coordenada inicial X
    const inicial_y = parseInt(document.getElementById('inicial_y').value); // Obtiene coordenada inicial Y
    const fin_x = parseInt(document.getElementById('fin_x').value); // Obtiene coordenada final X
    const fin_y = parseInt(document.getElementById('fin_y').value); // Obtiene coordenada final Y

    mapa_logica.coordenada_inicio_fin(inicial_x -1 , inicial_y - 1, fin_x - 1, fin_y - 1); // Establece las coordenadas en la matriz
    actualizar_interfaz(); // Actualiza la interfaz para reflejar los cambios
}

function actualizar_interfaz(){ // Actualiza la interfaz después de cambios en el mapa    
    let mensaje = "0 pasos";

    if (mapa_logica.inicial_x !== null && mapa_logica.fin_x !== null) { // Verifica que las coordenadas de inicio y fin estén establecidas
        mapa_logica.limpiar_camino(); // Limpia rutas previas en la matriz 
        const camino = new AlgoritmoAStar(mapa_logica.matriz, mapa_logica.inicial_x, mapa_logica.inicial_y, mapa_logica.fin_x, mapa_logica.fin_y);
        const pasos = camino.encontrar_camino_a_star();

        if(pasos !== null){
            mensaje = pasos + " pasos";
            document.getElementById('distancia').innerHTML = mensaje; // Actualiza el mensaje de distancia
        }else{
            mensaje = "No hay ruta disponible";
        }
    }
    document.getElementById('distancia').innerHTML = mensaje; // Actualiza el mensaje de distancia
    mapa_render.mostrar_mapa(mapa_logica.matriz); // Muestra el mapa actualizado
}

function gestionar_click_mapa(evento){ // Gestiona los clics en el mapa para modificar terrenos
    // Verifica que la matriz esté generada y que se haya clickeado una celda válida.
    if (!mapa_logica || !evento.target.classList.contains('cell')) return; 
    // Obtenemos la posición de la celda clickeada
    const fila = parseInt(evento.target.dataset.fila); // Fila de la celda clickeada
    const columna = parseInt(evento.target.dataset.columna); // Columna de la celda clickeada
    const valorActual = mapa_logica.matriz[fila][columna]; // Valor actual de la celda clickeada
    // LÓGICA: Si es el Inicio (E) ni el Fin (S), no hacemos nada
    if (valorActual === TERRENO.INICIO || valorActual === TERRENO.FIN) return;
    // LÓGICA: Si no es el Inicio (E) ni el Fin (S), cambiamos el terreno        
    if (valorActual === TERRENO.LIBRE || valorActual === TERRENO.CAMINO) {
        const tipo_terreno = Math.floor(Math.random() * 3) + 1; // Valores entre 1 y 3
        mapa_logica.matriz[fila][columna] = tipo_terreno; // Asignamos un obstáculo aleatorio
    } else{ // Si es un obstáculo, lo convertimos en libre
        mapa_logica.matriz[fila][columna] = TERRENO.LIBRE; 
    }
    actualizar_interfaz(); // Actualizamos la interfaz para reflejar los cambios 
}

document.addEventListener('DOMContentLoaded', iniciar_proyecto) ; // Inicia el proyecto cuando el DOM esté cargado
