import { TERRENO } from "./mapaLogica.js"; // Importa los tipos de terreno

export class AlgoritmoBusqueda{  // Clase base para algoritmos de búsqueda
    constructor(tablero, inicioX, inicioY, finX, finY){ // Constructor que recibe el tablero y las coordenadas de inicio y fin
        this.tablero = tablero;
        this.inicioX = inicioX;
        this.inicioY = inicioY;
        this.finX = finX;
        this.finY = finY;
    }
    
    heuristica(inicioX, inicioY, finX, finY){ // Heurística de distancia Manhattan
        return Math.abs(inicioX - finX) + Math.abs(inicioY - finY); // Calcula la distancia Manhattan y la devuelve
    }

    reconstruirRuta(tablero, actual){ // Reconstruye la ruta desde el nodo final hasta el inicio
        let temporal = actual; // Nodo temporal para recorrer la ruta
        let pasos = 0; // Contador de pasos

         while(temporal.padre !== null){ // Mientras no se llegue al nodo inicial
            if(tablero[temporal.y][temporal.x] !== TERRENO.FIN && 
                tablero[temporal.y][temporal.x] !== TERRENO.INICIO){ // No sobreescribe inicio o fin
                    if (tablero[temporal.y][temporal.x] === TERRENO.AGUA) { // Marcar camino sobre agua
                        tablero[temporal.y][temporal.x] = TERRENO.CAMINO_AGUA; 
                    } else { // Marcar camino sobre terreno libre
                        tablero[temporal.y][temporal.x] = TERRENO.CAMINO;
                    }
            }
            temporal = temporal.padre; // Mover al nodo padre
            pasos++; // Incrementar contador de pasos
        }
        return pasos;  // Devuelve el número de pasos en la ruta
    }
}