import { Coordenadas } from "./coordenadas.js";

// Función para obtener la lista de camino desde el mapa de padres
export function obtener_lista_camino(padre, fin) {
    let camino = []; // Array para almacenar el camino
    let actual = fin; // Comenzar desde el nodo final
    while (padre[actual.getClave()]) { // Mientras haya un padre registrado
        let valor_padre = padre[actual.getClave()]; // Obtener el padre
        camino.push(valor_padre);
        actual = valor_padre; // Moverse al padre
    }
    return camino; // Retorna array de objetos Coordenadas
}