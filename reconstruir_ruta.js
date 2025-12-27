import { TERRENO } from "./mapaLogica.js";

// Función para reconstruir el camino desde el nodo final hasta el inicial
export function reconstruir_camino(mapa_logica, padre, fin, inicio){
    let actual = fin.getClave(); // Clave del nodo final
    let pasos = 0; // Contador de pasos

    // Retrocedemos desde el final hacia el inicio usando el mapa de padres
    while (padre[actual]) {
        let posicion = padre[actual]; // Obtener la posición del padre

        // Contamos el paso (cada salto padre->hijo es un paso)
        pasos += 1;
        
        // Si la celda no es el punto de inicio, la marcamos con el símbolo de camino
        if (!posicion.esIgual(inicio)) {
            mapa_logica.matriz[posicion.coor_y][posicion.coor_x] = TERRENO.CAMINO; // Marcar camino
        }
        
        actual = posicion.getClave();// Mover al padre
    }
    return pasos; // Devolver el número total de pasos
}