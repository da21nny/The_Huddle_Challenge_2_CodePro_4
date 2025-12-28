import { TERRENO } from "./mapaLogica.js";
import { Coordenadas } from "./coordenadas.js";
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
export function reconstruir_camino(mapa_logica, lista_camino, inicio_x, inicial_y, fin_x, fin_y){
    const inicial = new Coordenadas(inicio_x, inicial_y);
    const final = new Coordenadas(fin_x, fin_y);
    if(!lista_camino || lista_camino.length === 0) return 0;

    for(const coord of lista_camino){
        if(!coord.esIgual(inicial) && !coord.esIgual(final)){
            mapa_logica.matriz[coord.coor_y][coord.coor_x] = TERRENO.CAMINO; // Marcar el camino en la matriz
        }
    }
    return lista_camino.length; // Retorna la longitud del camino
}