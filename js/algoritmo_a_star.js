import { TERRENO } from "./mapaLogica.js";
import { AlgoritmoBusqueda } from "./algoritmo_busqueda.js";

export class AlgoritmoAStar extends AlgoritmoBusqueda { // Clase que implementa el algoritmo A* y hereda de AlgoritmoBusqueda
    constructor(tablero, inicioX, inicioY, finX, finY){ // Constructor que recibe el tablero y las coordenadas de inicio y fin
        super(tablero, inicioX, inicioY, finX, finY); // Llama al constructor de la clase padre
    }

    encontrarCamino(){ // Método para encontrar el camino utilizando A*
        let listaAbierta = []; // Lista de nodos por explorar
        let mapaAbierto = new Map(); // Mapa para acceso rápido a nodos en la lista abierta
        let listaCerrada = new Set(); // Conjunto de nodos ya explorados

        let inicio = { // Nodo de inicio
            x: this.inicioX, // Coordenadas
            y: this.inicioY, // Coordenadas
            g: 0, // Costo desde el inicio
            h: this.heuristica(this.inicioX, this.inicioY, this.finX, this.finY), // Heurística al final
            f: 0, // Costo total
            padre: null // Nodo padre
        };

        inicio.f = inicio.g + inicio.h; // Costo total inicial

        listaAbierta.push(inicio); // Añade el nodo de inicio a la lista abierta
        mapaAbierto.set(`${inicio.x},${inicio.y}`, inicio); // Añade al mapa abierto

        while(listaAbierta.length > 0){ // Mientras haya nodos por explorar
            listaAbierta.sort((a,b) => a.f - b.f); // Ordena la lista abierta por costo total
            let actual = listaAbierta[0]; // Nodo con el menor costo total

            if(actual.x === this.finX && actual.y === this.finY){ // Si se llegó al nodo final
                return this.reconstruirRuta(this.tablero, actual); // Reconstruye y devuelve la ruta encontrada
            }

            listaAbierta.splice(0, 1); // Remueve el nodo actual de la lista abierta
            mapaAbierto.delete(`${actual.x},${actual.y}`); // Remueve del mapa abierto
            listaCerrada.add(`${actual.x},${actual.y}`); // Añade a la lista cerrada

            let movimientos = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // Movimientos posibles (arriba, abajo, derecha, izquierda)

            for(let m = 0; m < movimientos.length; m++){ // Recorre los movimientos posibles
                let nuevo_x = actual.x + movimientos[m][0];
                let nuevo_y = actual.y + movimientos[m][1];

                if(nuevo_x >= 0 && nuevo_x < this.tablero[0].length && nuevo_y >= 0 && nuevo_y < this.tablero.length){ // Verifica que la nueva posición esté dentro del tablero
                    let tipo_terreno = this.tablero[nuevo_y][nuevo_x]; // Tipo de terreno en la nueva posición
                    let clave = `${nuevo_x},${nuevo_y}`; // Clave para el mapa y conjunto

                    if(tipo_terreno === TERRENO.EDIFICIO || tipo_terreno === TERRENO.BLOQUEO) continue; // Si es un obstáculo, salta a la siguiente iteración

                    if(listaCerrada.has(clave)) continue; // Si ya fue explorado, salta

                    let costo_paso = (tipo_terreno === TERRENO.AGUA) ? 5 : 1; // Costo de paso según el tipo de terreno

                    let g_tentativo = actual.g + costo_paso; // Costo desde el inicio hasta el nuevo nodo

                    let vecino = mapaAbierto.get(clave); // Verifica si el vecino ya está en la lista abierta

                    if(!vecino || g_tentativo < vecino.g){ // Si no está en la lista abierta o se encontró un mejor camino
                        let nuevo_nodo = { // Crea el nuevo nodo
                            x: nuevo_x, // Coordenada x
                            y: nuevo_y, // Coordenada y
                            g: g_tentativo, // Costo desde el inicio
                            h: this.heuristica(nuevo_x, nuevo_y, this.finX, this.finY), // Heurística al final
                            padre: actual // Nodo padre
                        };
                        nuevo_nodo.f = nuevo_nodo.g + nuevo_nodo.h; // Calcula el nuevo costo total

                        if(!vecino){ // Si el vecino no está en la lista abierta
                            listaAbierta.push(nuevo_nodo); // Añade a la lista abierta
                            mapaAbierto.set(clave, nuevo_nodo); // Añade al mapa abierto
                        } else{ // Si ya está en la lista abierta, actualiza sus valores
                            vecino.g = nuevo_nodo.g; // Actualiza el costo desde el inicio
                            vecino.f = nuevo_nodo.f; // Actualiza el costo total
                            vecino.padre = actual; // Actualiza el nodo padre
                        }
                    }
                }
            }
        }
        return null; // Si no se encuentra una ruta, devuelve null
    } 
}