import { huddleMap } from "./mapa.js"

function main(){
    const numFila = parseInt(document.getElementById('fila').value);
    const numColumna = parseInt(document.getElementById('columna').value);
    const inicial_x = parseInt(document.getElementById('inicial_x').value);
    const inicial_y = parseInt(document.getElementById('inicial_y').value);
    const fin_x = parseInt(document.getElementById('fin_x').value);
    const fin_y = parseInt(document.getElementById('fin_y').value);
 
    const app = new huddleMap(numFila, numColumna);
    app.generar_matriz();
    app.generar_obstaculos();
    app.coordenada_inicio_fin(inicial_x -1 , inicial_y - 1, fin_x - 1, fin_y - 1);
    app.mostrar_mapa();    
}

document.addEventListener('DOMContentLoaded', () => {
    const btnEnviar = document.getElementById('btnEnviar');
    btnEnviar.addEventListener('click', main);
});