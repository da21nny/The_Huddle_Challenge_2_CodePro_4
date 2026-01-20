import { TERRENO } from "./mapaLogica.js";
const TAMANHO_CELDA = 35;

export class MapaRender{ // Clase para renderizar el mapa en HTML
    constructor(contenedorID, fila, columna){
        this.contenedorID = document.getElementById(contenedorID); // Contenedor donde se renderiza el mapa
        this.fila = fila; // Número de filas del mapa
        this.columna = columna; // Número de columnas del mapa
    }

    mostrarMapa(matriz){ // Renderiza la matriz del mapa en el contenedor HTML
        this.contenedorID.style = 'grip';
        this.contenedorID.style.gridTemplateColumns = `repeat(${this.columna}, ${TAMANHO_CELDA}px)`; // Define columnas de la cuadrícula
        this.contenedorID.style.gridTemplateRows = `repeat(${this.fila}, ${TAMANHO_CELDA}px)`; // Define filas de la cuadrícula

        const celdasExistentes = this.contenedorID.querySelectorAll('.cell');

        if(celdasExistentes.length === (this.fila * this.columna)){
            let i = 0;
            for(let fila = 0; fila < this.fila; fila++){
                for(let columna = 0; columna < this.columna; columna++){
                    const celdaDiv = celdasExistentes[i];
                    const valor_terreno = matriz[fila][columna];

                    const info = this.obtenerInfoVisual(valor_terreno);
                    celdaDiv.className = `cell ${info.clase}`;
                    celdaDiv.textContent = info.texto;
                    i++;
                }
            }
        }else {
            this.contenedorID.innerHTML = '';
            for(let fila = 0; fila < this.fila; fila++){
                for(let columna = 0; columna < this.columna; columna++){
                    const celdaDiv = document.createElement('div');
                    const valor_terreno = matriz[fila][columna];
                    const info = this.obtenerInfoVisual(valor_terreno);

                    celdaDiv.classList.add('cell');
                    celdaDiv.classList.add(info.clase);
                    celdaDiv.textContent = info.texto;

                    celdaDiv.dataset.fila = fila;
                    celdaDiv.dataset.columna = columna;

                    this.contenedorID.appendChild(celdaDiv);
                }
            }
        }
    }

    obtenerInfoVisual(tipo_terreno){
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