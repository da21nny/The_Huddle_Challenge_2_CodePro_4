import { huddleMap, TERRENO } from "./mapa.js";
import { Coordenadas } from "./coordenadas.js";

export function algoritmo_bfs(app, inicial_x, inicial_y, fin_x, fin_y){
    for (let x = 0; x < app.filas; x++) {
        for (let y = 0; y < app.columnas; y++) {
            if (app.matriz[y][x] === TERRENO.CAMINO) {
                app.matriz[y][x] = TERRENO.LIBRE;
            }
        }
    }

    // Validar que existan puntos de inicio y fin
    if (inicial_x === null || fin_x === null) return 0;

    let inicio = new Coordenadas(inicial_x, inicial_y);
    let fin = new Coordenadas(fin_x, fin_y);

    let cola = [inicio];
    let visitados = new Set();
    let padre = {};

    visitados.add(inicio.getClave());

    const movimientos = [new Coordenadas(0, 1),   // derecha
                         new Coordenadas(0, -1),  // izquierda
                         new Coordenadas(1, 0),   // abajo
                         new Coordenadas(-1, 0)   // arriba
                        ];

    while(cola.length > 0){
        let actual = cola.shift();

        if(actual.esIgual(fin)){
            return reconstruir_camino(app, padre, fin, inicio); // ahora devuelve número
        }

        for(let i = 0; i < movimientos.length; i++){
            let vecino = actual.sumar(movimientos[i]);
            let clave = vecino.getClave();

            if(app.dentro_de_rango(vecino.coor_x, vecino.coor_y) && !visitados.has(clave)){

                const tipo_valor = app.matriz[vecino.coor_y][vecino.coor_x];

                if(tipo_valor === TERRENO.LIBRE || tipo_valor === TERRENO.INICIO || tipo_valor === TERRENO.FIN){
                    visitados.add(clave);
                    padre[clave] = actual;
                    cola.push(vecino);
                }
            }
        }
    }
    // Si no se encuentra camino, devolver 0
    return 0;
}

function reconstruir_camino(app, padre, fin, inicio){
    let actual = fin.getClave();
    let pasos = 0;

    // Retrocedemos desde el final hacia el inicio usando el mapa de padres
    while (padre[actual]) {
        let posicion = padre[actual];

        // Contamos el paso (cada salto padre->hijo es un paso)
        pasos += 1;
        
        // Si la celda no es el punto de inicio, la marcamos con el símbolo de camino
        if (!posicion.esIgual(inicio)) {
            app.matriz[posicion.coor_y][posicion.coor_x] = TERRENO.CAMINO;
        }
        
        actual = posicion.getClave();
    }
    return pasos;
}