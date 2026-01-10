import { TERRENO } from "./mapaLogica.js";
import { reconstruir_camino } from "./reconstruir_ruta.js";

export class algoritmo_a_star{
    constructor(tablero, inicio_x, inicio_y, fin_x, fin_y){
        this.tablero = tablero;
        this.inicio_x = inicio_x;
        this.inicio_y = inicio_y;
        this.fin_x = fin_x;
        this.fin_y = fin_y;
    }

    encontrar_camino_a_star(){
        let lista_abierta = [];
        let mapa_abierto = new Map();
        let lista_cerrada = new Set();

        let inicio = {
            x: this.inicio_x,
            y: this.inicio_y,
            g: 0,
            h: this.heuristica(this.inicio_x, this.inicio_y, this.fin_x, this.fin_y),
            f: 0,
            padre: null
        };

        inicio.f = inicio.g + inicio.h;

        lista_abierta.push(inicio);
        mapa_abierto.set(`${inicio.x},${inicio.y}`, inicio);

        while(lista_abierta.length > 0){
            lista_abierta.sort((a,b) => a.f - b.f);
            let actual = lista_abierta[0];

            if(actual.x === this.fin_x && actual.y === this.fin_y){
                return reconstruir_camino(this.tablero, actual);
            }

            lista_abierta.splice(0, 1);
            mapa_abierto.delete(`${actual.x},${actual.y}`)
            lista_cerrada.add(`${actual.x},${actual.y}`)

            let movimientos = [[0, 1], [0, -1], [1, 0], [-1, 0]]; 

            for(let m = 0; m < movimientos.length; m++){
                let nuevo_x = actual.x + movimientos[m][0];
                let nuevo_y = actual.y + movimientos[m][1];

                if(nuevo_x >= 0 && nuevo_x < this.tablero[0].length && nuevo_y >= 0 && nuevo_y < this.tablero.length){
                    let tipo_terreno = this.tablero[nuevo_y][nuevo_x];
                    let clave = `${nuevo_x},${nuevo_y}`;

                    if(tipo_terreno === TERRENO.EDIFICIO || tipo_terreno === TERRENO.BLOQUEO) continue;

                    if(lista_cerrada.has(clave)) continue;

                    let costo_paso = (tipo_terreno === TERRENO.AGUA) ? 5 : 1;

                    let g_tentativo = actual.g + costo_paso;

                    let vecino = mapa_abierto.get(clave);

                    if(!vecino || g_tentativo < vecino.g){
                        let nuevo_nodo = {
                            x: nuevo_x,
                            y: nuevo_y,
                            g: g_tentativo,
                            h: this.heuristica(nuevo_x, nuevo_y, this.fin_x, this.fin_y),
                            padre: actual
                        };
                        nuevo_nodo.f = nuevo_nodo.g + nuevo_nodo.h;

                        if(!vecino){
                            lista_abierta.push(nuevo_nodo);
                            mapa_abierto.set(clave, nuevo_nodo);
                        } else{
                            vecino.g = nuevo_nodo.g;
                            vecino.f = nuevo_nodo.f;
                            vecino.padre = actual;
                        }
                    }
                }
            }
        }
        return null;
    }

    heuristica(inicio_x, inicio_y, fin_x, fin_y){
        return Math.abs(inicio_x - fin_x) + Math.abs(inicio_y - fin_y);
    }
}