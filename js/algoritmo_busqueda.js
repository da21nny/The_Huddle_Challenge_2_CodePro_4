import { TERRENO } from "./mapaLogica.js";

export class AlgoritmoBusqueda{
    constructor(tablero, inicioX, inicioY, fin_x, fin_y){
        this.tablero = tablero;
        this.inicioX = inicioX;
        this.inicioY = inicioY;
        this.fin_x = fin_x;
        this.fin_y = fin_y;
    }
    
    heuristica(inicioX, inicioY, fin_x, fin_y){
        return Math.abs(inicioX - fin_x) + Math.abs(inicioY - fin_y);
    }

    reconstruirRuta(tablero, actual){
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