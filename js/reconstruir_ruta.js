import { TERRENO } from "./mapaLogica.js";

// Función para reconstruir el camino desde el nodo final hasta el inicial
export class AlgoritmoBusqueda {

    reconstruirCamino(tablero, actual){
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
}