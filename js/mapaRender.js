import { TERRENO } from "./mapaLogica.js";
const TAMANHO_CELDA = 35;

export class MapaRender{ // Clase para renderizar el mapa en HTML
    constructor(contenedorID, fila, columna){
        this.contenedorID = document.getElementById(contenedorID); // Contenedor donde se renderiza el mapa
        this.fila = fila; // Número de filas del mapa
        this.columna = columna; // Número de columnas del mapa
    }

    mostrar_mapa(matriz){ // Renderiza la matriz del mapa en el contenedor HTML
        this.contenedorID.style = 'grip';
        this.contenedorID.style.gridTemplateColumns = `repeat(${this.columna}, ${TAMANHO_CELDA}px)`; // Define columnas de la cuadrícula
        this.contenedorID.style.gridTemplateRows = `repeat(${this.fila}, ${TAMANHO_CELDA}px)`; // Define filas de la cuadrícula

        const celdas_existentes = this.contenedorID.querySelectorAll('.cell');

        if(celdas_existentes.length === (this.fila * this.columna)){
            let i = 0;
            for(let fila = 0; fila < this.fila; fila++){
                for(let columna = 0; columna < this.columna; columna++){
                    const celda_div = celdas_existentes[i];
                    const valor_terreno = matriz[fila][columna];

                    const info = this.obtener_info_visual(valor_terreno);
                    celda_div.className = `cell ${info.clase}`;
                    celda_div.textContent = info.texto;
                    i++;
                }
            }
        }else {
            this.contenedorID.innerHTML = '';
            for(let fila = 0; fila < this.fila; fila++){
                for(let columna = 0; columna < this.columna; columna++){
                    const celda_div = document.createElement('div');
                    const valor_terreno = matriz[fila][columna];
                    const info = this.obtener_info_visual(valor_terreno);

                    celda_div.classList.add('cell');
                    celda_div.classList.add(info.clase);
                    celda_div.textContent = info.texto;

                    celda_div.dataset.fila = fila;
                    celda_div.dataset.columna = columna;

                    this.contenedorID.appendChild(celda_div);
                }
            }
        }
    }

    obtener_info_visual(tipo_terreno){
        switch(tipo_terreno){
            case TERRENO.EDIFICIO:
                return { texto: 'x', clase: 'edificio' };
            case TERRENO.AGUA:
                return { texto: 'a', clase: 'agua' };
            case TERRENO.BLOQUEO:
                return { texto: 'B', clase: 'bloqueo' };
            case TERRENO.INICIO:
                return { texto: 'I', clase: 'inicio' };
            case TERRENO.FIN:
                return { texto: 'F', clase: 'fin' };
            case TERRENO.CAMINO:
                return { texto: '*', clase: 'camino' };
            case TERRENO.CAMINO_AGUA:
                return { texto: 'a', clase: 'camino_agua' };
            default:
                return { texto: '.', clase: 'libre' };
        }
    }
}