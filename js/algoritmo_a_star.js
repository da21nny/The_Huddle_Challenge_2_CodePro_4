import { TERRENO } from "./mapaLogica.js";
import { AlgoritmoBusqueda } from "./algoritmo_busqueda.js";

export class AlgoritmoAStar extends AlgoritmoBusqueda {
    constructor(tablero, inicioX, inicioY, fin_x, fin_y){
        super(tablero, inicioX, inicioY, fin_x, fin_y);    
    }

    encontrarCamino(){
        let listaAbierta = [];
        let mapaAbierto = new Map();
        let listaCerrada = new Set();

        let inicio = {
            x: this.inicioX,
            y: this.inicioY,
            g: 0,
            h: this.heuristica(this.inicioX, this.inicioY, this.fin_x, this.fin_y),
            f: 0,
            padre: null
        };

        inicio.f = inicio.g + inicio.h;

        listaAbierta.push(inicio);
        mapaAbierto.set(`${inicio.x},${inicio.y}`, inicio);

        while(listaAbierta.length > 0){
            listaAbierta.sort((a,b) => a.f - b.f);
            let actual = listaAbierta[0];

            if(actual.x === this.fin_x && actual.y === this.fin_y){
                return this.reconstruirRuta(this.tablero, actual);
            }

            listaAbierta.splice(0, 1);
            mapaAbierto.delete(`${actual.x},${actual.y}`)
            listaCerrada.add(`${actual.x},${actual.y}`)

            let movimientos = [[0, 1], [0, -1], [1, 0], [-1, 0]]; 

            for(let m = 0; m < movimientos.length; m++){
                let nuevo_x = actual.x + movimientos[m][0];
                let nuevo_y = actual.y + movimientos[m][1];

                if(nuevo_x >= 0 && nuevo_x < this.tablero[0].length && nuevo_y >= 0 && nuevo_y < this.tablero.length){
                    let tipo_terreno = this.tablero[nuevo_y][nuevo_x];
                    let clave = `${nuevo_x},${nuevo_y}`;

                    if(tipo_terreno === TERRENO.EDIFICIO || tipo_terreno === TERRENO.BLOQUEO) continue;

                    if(listaCerrada.has(clave)) continue;

                    let costo_paso = (tipo_terreno === TERRENO.AGUA) ? 5 : 1;

                    let g_tentativo = actual.g + costo_paso;

                    let vecino = mapaAbierto.get(clave);

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
                            listaAbierta.push(nuevo_nodo);
                            mapaAbierto.set(clave, nuevo_nodo);
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
}