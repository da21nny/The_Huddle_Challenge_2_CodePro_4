import { TERRENO } from "./mapaLogica.js";
import { Coordenadas } from "./coordenadas.js";
import { reconstruir_camino } from "./reconstruir_ruta.js";

// Algoritmo de Búsqueda en Anchura (BFS)
export function algoritmo_bfs(mapa_logica, inicial_x, inicial_y, fin_x, fin_y){
    for (let fila = 0; fila < mapa_logica.filas; fila++) {
        for (let columna = 0; columna < mapa_logica.columnas; columna++) {
            if (mapa_logica.matriz[fila][columna] === TERRENO.CAMINO) { // Limpiar caminos previos
                mapa_logica.matriz[fila][columna] = TERRENO.LIBRE;
            }
        }
    }

    // Validar que existan puntos de inicio y fin
    if (inicial_x === null || fin_x === null) return 0;

    let inicio = new Coordenadas(inicial_x, inicial_y); // Coordenadas de inicio
    let fin = new Coordenadas(fin_x, fin_y); // Coordenadas de fin

    if(inicio.esIgual(fin)) return 0; // Si son iguales, no hay pasos necesarios

    // Estructuras para BFS
    let cola = [inicio]; // Cola para explorar nodos
    let head = 0; // Índice del frente de la cola
    let visitados = new Set(); // Conjunto para nodos visitados
    let padre = {}; // Mapa para reconstruir el camino

    visitados.add(inicio.getClave()); // Marcar inicio como visitado

    const movimientos = [new Coordenadas(0, 1),   // derecha
                         new Coordenadas(0, -1),  // izquierda
                         new Coordenadas(1, 0),   // abajo
                         new Coordenadas(-1, 0)   // arriba
                        ]; // Movimientos posibles

    while(head < cola.length){ // Mientras haya nodos por explorar
        let actual = cola[head++]; // Sacar el primer nodo de la cola

        if(actual.esIgual(fin)){ // Si es el nodo final
            return reconstruir_camino(mapa_logica, padre, fin, inicio); // Reconstruir y devolver pasos
        }

        for(let i = 0; i < movimientos.length; i++){ // Explorar vecinos
            let vecino = actual.sumar(movimientos[i]); // Calcular coordenadas del vecino
            let clave = vecino.getClave(); // Clave única del vecino

            if(mapa_logica.dentro_de_rango(vecino.coor_x, vecino.coor_y) && !visitados.has(clave)){ // Si está en rango y no visitado

                const tipo_valor = mapa_logica.matriz[vecino.coor_y][vecino.coor_x]; // Obtener tipo de terreno

                if(tipo_valor === TERRENO.LIBRE || tipo_valor === TERRENO.INICIO || tipo_valor === TERRENO.FIN){ // Si es transitable

                    if(vecino.esIgual(fin)){ // Si es el nodo final
                        padre[clave] = actual; // Registrar padre
                        return reconstruir_camino(mapa_logica, padre, fin, inicio); // Reconstruir y devolver pasos
                    } 

                    visitados.add(clave); // Marcar como visitado
                    padre[clave] = actual; // Registrar padre
                    cola.push(vecino); // Añadir a la cola para explorar
                }
            }
        }
    }
    // Si no se encuentra camino, devolver 0
    return -1;
}