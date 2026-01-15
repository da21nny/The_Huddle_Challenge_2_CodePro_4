import { AlgoritmoAStar } from "./algoritmo_a_star.js";
import { TERRENO } from "./mapaLogica.js";

export class CalculadoraDeRuta{
    constructor(tablero, fila, columna){
        this.tablero = tablero;
        this.fila = fila;
        this.columna = columna;
    }
    
    calcularRuta(inicioX, inicioY, finX, finY){
        const algoritmo = new AlgoritmoAStar(this.tablero, inicioX, inicioY, finX, finY);
        this.limpiarCamino();
        const pasos = algoritmo.encontrarCamino();
        let mensaje = "";
        if(pasos !== null){
            mensaje = pasos + " pasos";
            document.getElementById('distancia').innerHTML = mensaje; // Actualiza el mensaje de distancia
        }else{
            mensaje = "No hay ruta disponible";
        }
        return mensaje;
    }

    // Función para limpiar rutas previas en la matriz
    limpiarCamino(){ 
        for (let y = 0; y < this.fila; y++) {
            for (let x = 0; x < this.columna; x++) {
                const valorActual = this.tablero[y][x];
                if (valorActual === TERRENO.CAMINO) { // Limpiar caminos previos
                       this.tablero[y][x] = TERRENO.LIBRE;
                }
                if (valorActual === TERRENO.CAMINO_AGUA) {
                    this.tablero[y][x] = TERRENO.AGUA; // Si es camino sobre agua, lo vuelve agua
                }
            }
        }
    }
}