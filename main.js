import { huddleMap, TERRENO } from "./mapa.js"
import { algoritmo_bfs } from "./algorimo_bfs.js";

let app;
let distancia = 0;

function actualizar_interfaz() {
    let mensaje = "0 pasos";
    if (app.inicial_x !== null && app.fin_x !== null) {
        distancia = algoritmo_bfs(app, app.inicial_x, app.inicial_y, app.fin_x, app.fin_y);

        if(distancia === -1){
            mensaje = "No hay camino disponible";
        }else{
            mensaje = distancia + " pasos";
        }
    }
    document.getElementById('distancia').innerHTML = mensaje;
    app.mostrar_mapa();
}

function main_matriz(){
    const numFila = parseInt(document.getElementById('fila').value);
    const numColumna = parseInt(document.getElementById('columna').value);

    const radio_select = document.querySelector('input[name="dificultad"]:checked');
    const dificultad = radio_select ? parseFloat(radio_select.value) : 0.1;
    
    let prevStart = null;
    let prevEnd = null;
    if(app && app.matriz){
        if(app.inicial_x !== null && app.inicial_y !== null) prevStart = { x: app.inicial_x, y: app.inicial_y };
        if(app.fin_x !== null && app.fin_y !== null) prevEnd = { x: app.fin_x, y: app.fin_y };
    }


    app = new huddleMap(numFila, numColumna);

    if(prevStart){
        app.inicial_x = prevStart.x;
        app.inicial_y = prevStart.y;
    }
    if(prevEnd){
        app.fin_x = prevEnd.x;
        app.fin_y = prevEnd.y;
    }

    app.generar_matriz();
    app.generar_obstaculos(dificultad);

    actualizar_interfaz();
}

function main_coordenadas(){
    if(!app){
        alert("Genere primeramente la matriz");
        return;
    }

    const inicial_x = parseInt(document.getElementById('inicial_x').value);
    const inicial_y = parseInt(document.getElementById('inicial_y').value);
    const fin_x = parseInt(document.getElementById('fin_x').value);
    const fin_y = parseInt(document.getElementById('fin_y').value);

    app.coordenada_inicio_fin(inicial_x -1 , inicial_y - 1, fin_x - 1, fin_y - 1);

    actualizar_interfaz();

}

document.addEventListener('DOMContentLoaded', () => {
    const btnGenerar = document.getElementById('btnGenerar');
    const btnEnviar = document.getElementById('btnEnviar');

    btnGenerar.addEventListener('click', main_matriz);
    btnEnviar.addEventListener('click', main_coordenadas);
});

const mapaContenedor = document.getElementById('resultado');

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