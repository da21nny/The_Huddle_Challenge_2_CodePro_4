import { TERRENO } from "./mapaLogica.js";

// Función para limpiar rutas previas en la matriz
export function limpiar_ruta_previa(mapa_logica){
    for (let fila = 0; fila < mapa_logica.filas; fila++) {
        for (let columna = 0; columna < mapa_logica.columnas; columna++) {
            if (mapa_logica.matriz[fila][columna] === TERRENO.CAMINO) { // Limpiar caminos previos
                   mapa_logica.matriz[fila][columna] = TERRENO.LIBRE;
            }
        }
    }
}

// Función para reconstruir el camino desde el nodo final hasta el inicial
export function reconstruir_camino(tablero, actual){
    let temporal = actual;
    let pasos = 0;

    while(temporal.padre !== null){
        if(tablero[temporal.y][temporal.x] !== TERRENO.FIN &&
            tablero[temporal.y][temporal.x] !== TERRENO.INICIO){
                if (tablero[temporal.y][temporal.x] === TERRENO.AGUA) { // Marcar camino sobre agua
                    tablero[temporal.y][temporal.x] = TERRENO.CAMINO_AGUA;
                } else { // Marcar camino sobre terreno libre
                    tablero[temporal.y][temporal.x] = TERRENO.CAMINO;
                }
        }
        temporal = temporal.padre; // Mover al nodo padre
        pasos++; // Incrementar contador de pasos
    }
    return pasos; 
}