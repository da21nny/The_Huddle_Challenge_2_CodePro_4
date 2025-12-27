import { TERRENO } from "./mapaLogica.js";
import { Coordenadas } from "./coordenadas.js";

// Algoritmo de Búsqueda en Anchura (BFS)
export function algoritmo_bfs(app, inicial_x, inicial_y, fin_x, fin_y){
    for (let x = 0; x < app.filas; x++) {
        for (let y = 0; y < app.columnas; y++) {
            if (app.matriz[y][x] === TERRENO.CAMINO) { // Limpiar caminos previos
                app.matriz[y][x] = TERRENO.LIBRE;
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
            return reconstruir_camino(app, padre, fin, inicio); // Reconstruir y devolver pasos
        }

        for(let i = 0; i < movimientos.length; i++){ // Explorar vecinos
            let vecino = actual.sumar(movimientos[i]); // Calcular coordenadas del vecino
            let clave = vecino.getClave(); // Clave única del vecino

            if(app.dentro_de_rango(vecino.coor_x, vecino.coor_y) && !visitados.has(clave)){ // Si está en rango y no visitado

                const tipo_valor = app.matriz[vecino.coor_y][vecino.coor_x]; // Obtener tipo de terreno

                if(tipo_valor === TERRENO.LIBRE || tipo_valor === TERRENO.INICIO || tipo_valor === TERRENO.FIN){ // Si es transitable

                    if(vecino.esIgual(fin)){ // Si es el nodo final
                        padre[clave] = actual; // Registrar padre
                        return reconstruir_camino(app, padre, fin, inicio); // Reconstruir y devolver pasos
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

// Función para reconstruir el camino desde el nodo final hasta el inicial
function reconstruir_camino(app, padre, fin, inicio){
    let actual = fin.getClave(); // Clave del nodo final
    let pasos = 0; // Contador de pasos

    // Retrocedemos desde el final hacia el inicio usando el mapa de padres
    while (padre[actual]) {
        let posicion = padre[actual]; // Obtener la posición del padre

        // Contamos el paso (cada salto padre->hijo es un paso)
        pasos += 1;
        
        // Si la celda no es el punto de inicio, la marcamos con el símbolo de camino
        if (!posicion.esIgual(inicio)) {
            app.matriz[posicion.coor_y][posicion.coor_x] = TERRENO.CAMINO; // Marcar camino
        }
        
        actual = posicion.getClave();// Mover al padre
    }
    return pasos; // Devolver el número total de pasos
}