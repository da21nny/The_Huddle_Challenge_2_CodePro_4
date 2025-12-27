import { TERRENO } from "./mapaLogica.js";

export class MapaRender{ // Clase para renderizar el mapa en HTML
    constructor(contenedorID, fila, columna){
        this.contenedorID = document.getElementById(contenedorID); // Contenedor donde se renderiza el mapa
        this.fila = fila; // Número de filas del mapa
        this.columna = columna; // Número de columnas del mapa
    }

    mostrar_mapa(matriz){ // Renderiza la matriz del mapa en el contenedor HTML
        this.contenedorID.innerHTML = ''; // Limpiar contenido previo
        this.contenedorID.style.gridTemplateColumns = `repeat(${this.columna}, 35px)`; // Define columnas de la cuadrícula
        this.contenedorID.style.gridTemplateRows = `repeat(${this.fila}, 35px)`; // Define filas de la cuadrícula

        for(let fila = 0; fila < this.fila; fila++){ // Iterar sobre cada fila
            for(let columna = 0; columna < this.columna; columna++){ // Iterar sobre cada columna
                const celdaDiv = document.createElement('div'); // Crear div para la celda
                celdaDiv.classList.add('cell'); // Añadir clase común a todas las celdas
                celdaDiv.dataset.fila = fila; // Almacenar fila en dataset
                celdaDiv.dataset.columna = columna; // Almacenar columna en dataset
                celdaDiv.style.cursor = "pointer"; // Indica que es clickable

                const valor = matriz[fila][columna]; // Obtener el valor del terreno en la celda

                switch(valor){ // Asignar clase y contenido según el tipo de terreno
                    case TERRENO.EDIFICIO: // Edificio
                        celdaDiv.textContent = 'X';
                        celdaDiv.classList.add('edificio');
                        break;
                    case TERRENO.AGUA: // Agua
                        celdaDiv.textContent = 'a';
                        celdaDiv.classList.add('agua');
                        break
                    case TERRENO.BLOQUEO: // Bloqueo
                        celdaDiv.textContent = 'B';
                        celdaDiv.classList.add('bloqueo');
                        break; 
                    case TERRENO.INICIO: // Inicio
                        celdaDiv.textContent = 'E';
                        celdaDiv.classList.add('entrada');
                        break;
                    case TERRENO.FIN: // Fin
                        celdaDiv.textContent = 'S';
                        celdaDiv.classList.add('salida');
                        break;
                    case TERRENO.CAMINO: 
                        celdaDiv.textContent = '*';
                        celdaDiv.classList.add('camino');
                        break;
                    default: // Terreno libre
                        celdaDiv.textContent = '.';
                        celdaDiv.classList.add('libre');
                        break;
                }
                this.contenedorID.appendChild(celdaDiv); // Añadir la celda al contenedor
            }
        }
    }
}