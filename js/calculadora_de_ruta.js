import { AlgoritmoAStar } from "./algoritmo_a_star.js";
import { TERRENO } from "./mapaLogica.js";

export class CalculadoraDeRuta{
    constructor(tablero){
        this.tablero = tablero;
    }
    
    calcularRuta(inicioX, inicioY, finX, finY){
        this.limpiarCamino();
        const algoritmo = new AlgoritmoAStar(this.tablero, inicioX, inicioY, finX, finY);
        const pasos = algoritmo.encontrarCamino();
        let mensaje = "";
        if(pasos !== null){
            mensaje = pasos + " pasos";
        }else{
            mensaje = "No hay ruta disponible";
        }
        return mensaje;
    }

    // Función para limpiar rutas previas en la matriz
    limpiarCamino(){ 
        for (let y = 0; y < this.tablero.length; y++) {
            for (let x = 0; x < this.tablero[0].length; x++) {
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