import { huddleMap, TERRENO } from "./mapaLogica.js"
import { algoritmo_bfs } from "./algorimo_bfs.js";
import { mapaRender } from "./mapaRender.js";

let app; // Instancia global del mapa
let mapa;
let distancia = 0; // Distancia calculada por el algoritmo

function main_matriz(){ // Genera la matriz del mapa
    const numFila = parseInt(document.getElementById('fila').value); // Obtiene número de filas
    const numColumna = parseInt(document.getElementById('columna').value); // Obtiene número de columnas

    const radio_select = document.querySelector('input[name="dificultad"]:checked'); // Obtiene la dificultad seleccionada
    const dificultad = radio_select ? parseFloat(radio_select.value) : 0.1; // Valor por defecto si no hay selección
    
    let prevStart = null; // Guarda posición previa de inicio
    let prevEnd = null; // guarda posición previa de fin
    if(app && app.matriz){
        if(app.inicial_x !== null && app.inicial_y !== null) prevStart = { x: app.inicial_x, y: app.inicial_y };
        if(app.fin_x !== null && app.fin_y !== null) prevEnd = { x: app.fin_x, y: app.fin_y };
    }

    app = new huddleMap(numFila, numColumna); // Crea nueva instancia del mapa
    mapa = new mapaRender('resultado', numFila, numColumna);

    if(prevStart){ // Restaura posición previa de inicio
        app.inicial_x = prevStart.x;
        app.inicial_y = prevStart.y;
    }
    if(prevEnd){ // Restaura posición previa de fin
        app.fin_x = prevEnd.x;
        app.fin_y = prevEnd.y;
    }

    app.generar_matriz(); // Genera la matriz vacía
    app.generar_obstaculos(dificultad); // Genera obstáculos según la dificultad

    actualizar_interfaz(); // Actualiza la interfaz para mostrar el nuevo mapa
}

function main_coordenadas(){ // Establece las coordenadas de inicio y fin
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
    if (app.inicial_x !== null && app.fin_x !== null) {
        distancia = algoritmo_bfs(app, app.inicial_x, app.inicial_y, app.fin_x, app.fin_y); // Ejecuta el algoritmo BFS

        if(distancia === -1){ // Si no hay camino disponible
            mensaje = "No hay camino disponible";
        }else{
            mensaje = distancia + " pasos";
        }
    }
    document.getElementById('distancia').innerHTML = mensaje; // Actualiza el mensaje de distancia
    //app.mostrar_mapa(); // Muestra el mapa actualizado
    mapa.mostrar_mapa(app.matriz);
}

document.addEventListener('DOMContentLoaded', () => { // Espera a que el DOM esté cargado
    const btnGenerar = document.getElementById('btnGenerar'); // Botón para generar la matriz
    const btnEnviar = document.getElementById('btnEnviar'); // Botón para enviar las coordenadas

    btnGenerar.addEventListener('click', main_matriz); // Asocia el evento click al botón de generar matriz
    btnEnviar.addEventListener('click', main_coordenadas); // Asocia el evento click al botón de enviar coordenadas
});

const mapaContenedor = document.getElementById('resultado'); // 1. Obtenemos el contenedor del mapa

// 2. Escuchamos cualquier clic que ocurra dentro
mapaContenedor.addEventListener('click', (e) => {
    // Verificamos que el clic haya sido en una celda y que la app esté lista
    if (app && e.target.classList.contains('cell')) {
        
        // Obtenemos la posición de la celda clickeada
        const f = parseInt(e.target.dataset.fila);
        const c = parseInt(e.target.dataset.columna);
        const valorActual = app.matriz[f][c];

        // LÓGICA: Si no es el Inicio (E) ni el Fin (S), cambiamos el terreno        
        if (valorActual !== TERRENO.INICIO && valorActual !== TERRENO.FIN) {
            // Si es libre (0), lo volvemos cualquier tipo de TERRENO. Si no, lo volvemos libre.
            const tipo_terreno = Math.floor(Math.random() * 3) + 1;

            app.matriz[f][c] = (valorActual === TERRENO.LIBRE || valorActual === TERRENO.CAMINO) ? tipo_terreno : TERRENO.LIBRE;
            
            // ¡MAGIA! Llamamos a tu función para que limpie, recalcule el BFS y redibuje
            actualizar_interfaz(); 
        }
    }
});