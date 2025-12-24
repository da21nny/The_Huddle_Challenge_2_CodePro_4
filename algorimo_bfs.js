import { huddleMap, TERRENO } from "./mapa.js";

export function algoritmo_bfs(app, inicial_x, inicial_y, fin_x, fin_y){
    for (let x = 0; x < app.filas; x++) {
        for (let y = 0; y < app.columnas; y++) {
            if (app.matriz[y][x] === TERRENO.CAMINO) {
                app.matriz[y][x] = TERRENO.LIBRE;
            }
        }
    }

    // Validar que existan puntos de inicio y fin
    if (inicial_x === null || fin_x === null) return null;

    let cola = [[inicial_x, inicial_y]];
    let visitados = new Set();
    let padre = {};

    visitados.add(`${inicial_x},${inicial_y}`);

    const movimientos = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    while(cola.length > 0){
        let [x, y] = cola.shift();

        if(x === fin_x && y === fin_y){
            return reconstruir_camino(app, padre, fin_x, fin_y, inicial_x, inicial_y);
        }

        for(let [dx, dy] of movimientos){
            let nx = x + dx;
            let ny = y + dy;
            let clave = `${nx},${ny}`;

            if(app.dentro_de_rango(nx, ny) && !visitados.has(clave)){

                const tipo_valor = app.matriz[ny][nx];

                if(tipo_valor === TERRENO.LIBRE || tipo_valor === TERRENO.INICIO || tipo_valor === TERRENO.FIN){
                    visitados.add(clave);
                    padre[clave] = [x, y];
                    cola.push([nx, ny]);
                }
            }
        }
    }
    alert("No se encontro camino");
    return null;
}

function reconstruir_camino(app, padre, fin_x, fin_y, inicial_x, inicial_y){
    let actual = `${fin_x},${fin_y}`;

// Retrocedemos desde el final hacia el inicio usando el mapa de padres
    while (padre[actual]) {
        let [px, py] = padre[actual];
        
        // Si la celda no es el punto de inicio, la marcamos con el símbolo de camino
        if (!(px === inicial_x && py === inicial_y)) {
            app.matriz[py][px] = TERRENO.CAMINO;
        }
        
        actual = `${px},${py}`;
    }
    return true;
}