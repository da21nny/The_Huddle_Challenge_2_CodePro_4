import { huddleMap } from "./mapa.js"

let app;

function main_matriz(){
    const numFila = parseInt(document.getElementById('fila').value);
    const numColumna = parseInt(document.getElementById('columna').value);
    
    app = new huddleMap(numFila, numColumna);
    app.generar_matriz();
    app.generar_obstaculos();
 
    app.mostrar_mapa();    
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
    app.mostrar_mapa();

}

document.addEventListener('DOMContentLoaded', () => {
    const btnGenerar = document.getElementById('btnGenerar');
    const btnEnviar = document.getElementById('btnEnviar');

    btnGenerar.addEventListener('click', main_matriz);
    btnEnviar.addEventListener('click', main_coordenadas);
});