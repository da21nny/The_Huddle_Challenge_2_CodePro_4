import { AlgoritmoBusqueda } from "./algoritmo_busqueda.js";
import { ReconstruirRuta } from "./reconstruir_ruta.js";

export class CalculadoraDeRuta{
    constructor(tablero, inicioX, inicioY, finX, finY){
        this.algoritmo = new AlgoritmoBusqueda(tablero, inicioX, inicioY, finX, finY);
    }
    
    calcularRuta(){
        return this.algoritmo.encontrarCaminoAStar();
    }

}