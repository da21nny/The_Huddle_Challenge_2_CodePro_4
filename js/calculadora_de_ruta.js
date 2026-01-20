import { AlgoritmoAStar } from "./algoritmo_a_star.js";
import { TERRENO } from "./mapaLogica.js";

export class CalculadoraDeRuta{ // Clase para calcular la ruta entre dos puntos
    constructor(mapaLogica){ // Constructor que recibe una instancia de MapaLogica
        this.mapaLogica = mapaLogica; // Guarda la instancia del mapa lógico
    }
    
    calcularRuta(inicioX, inicioY, finX, finY){ // Calcula la ruta utilizando el algoritmo A*
        this.limpiarCamino(); // Limpia rutas previas en la matriz
        const algoritmo = new AlgoritmoAStar(this.mapaLogica.matriz, inicioX, inicioY, finX, finY); // Instancia del algoritmo A*
        const pasos = algoritmo.encontrarCamino(); // Encuentra el camino y obtiene el número de pasos
        let mensaje = ""; 
        if(pasos !== null){ // Si se encontró una ruta
            mensaje = pasos + " pasos";
        }else{
            mensaje = "No hay ruta disponible";
        }
        return mensaje; // Devuelve el mensaje con el número de pasos o indicación de no ruta
    }

    // Función para limpiar rutas previas en la matriz
    limpiarCamino(){ 
        for (let y = 0; y < this.mapaLogica.fila; y++) {
            for (let x = 0; x < this.mapaLogica.columna; x++) {
                const valorActual = this.mapaLogica.matriz[y][x];
                if (valorActual === TERRENO.CAMINO) { // Si es camino, lo vuelve libre
                       this.mapaLogica.matriz[y][x] = TERRENO.LIBRE;
                }
                if (valorActual === TERRENO.CAMINO_AGUA) {
                    this.mapaLogica.matriz[y][x] = TERRENO.AGUA; // Si es camino sobre agua, lo vuelve agua
                }
            }
        }
    }
}