export const TERRENO = {
    LIBRE: 0,
    EDIFICIO: 1,
    AGUA: 2,
    BLOQUEO: 3,
    CAMINO: 5,
    INICIO: 6,
    FIN: 7,
    CAMINO_AGUA: 8
}; // Tipos de terreno posibles

const PORCENTAJE_OBSTACULO = 0.5 // Porcentaje de obstáculos en la matriz

export class MapaLogica{ // Clase para manejar la lógica del mapa
    constructor (fila, columna){
        this.fila = fila;
        this.columna = columna;
        this.inicio = {x: null, y: null};
        this.fin = {x: null, y: null};
        this.matriz = this.generarMatriz();
    } // Constructor de la clase

    generarMatriz(){ // Genera una matriz vacía con el terreno libre
        this.matriz = [];
        for(let y = 0; y < this.fila; y++){
            let fila_actual = [];
            for(let x = 0; x < this.columna; x++){
                fila_actual.push(TERRENO.LIBRE); // Inicializa con terreno libre
            } 
            this.matriz.push(fila_actual); // Añade la fila a la matriz
        }
        // Coloca el punto de inicio si existe
        if(this.inicio.x !== null && this.inicio.y !== null){
            if(this.dentroDeRango(this.inicio.x, this.inicio.y)){
                this.matriz[this.inicio.y][this.inicio.x] = TERRENO.INICIO; 
            }
        }
        // Coloca el punto final si existe
        if(this.fin.x !== null && this.fin.y !== null){
            if(this.dentroDeRango(this.fin.x, this.fin.y)){
                this.matriz[this.fin.y][this.fin.x] = TERRENO.FIN;
            }
        }

        return this.matriz; // Devuelve la matriz generada
    }

    colocarTerreno(fila, columna, tipo_terreno){ // Coloca un tipo de terreno en una posición específica
        if(!this.dentroDeRango(columna, fila)){
            alert("Valores fuera de rango");
            return;
        }

        const actual = this.matriz[fila][columna]; // Tipo de terreno actual

        if(actual === TERRENO.INICIO || actual === TERRENO.FIN){ // No se puede cambiar el terreno del inicio o fin
            return;
        }
        this.matriz[fila][columna] = tipo_terreno; // Coloca el nuevo tipo de terreno
        return true;
    }

    generarObstaculos(){ // Genera obstáculos aleatorios en la matriz según la dificultad
        const numObstaculos = Math.floor((this.fila * this.columna) * PORCENTAJE_OBSTACULO); // Número de obstáculos a generar
        for(let i = 0; i < numObstaculos; i++){
            const filaAlt = Math.floor(Math.random() * this.fila); // Fila aleatoria
            const columnaAlt = Math.floor(Math.random() * this.columna); // Columna aleatoria
            const tipo = Math.floor(Math.random() * 3) + 1; // Tipo de terreno aleatorio (1 a 3)

            const actual = this.matriz[filaAlt][columnaAlt]; // Tipo de terreno actual

            if(actual === TERRENO.INICIO || actual === TERRENO.FIN){ // No se puede cambiar el terreno del inicio o fin
                continue; // Saltar esta iteración
            }
            this.colocarTerreno(filaAlt, columnaAlt, tipo); // Coloca el terreno
        }
    }

    coordenadaInicioFin(inicio, fin){ // Establece las coordenadas de inicio y fin
        if(this.dentroDeRango(inicio.x, inicio.y) &&
           !(inicio.x === fin.x && inicio.y === fin.y) && 
           this.esTransitable(inicio.x, inicio.y)){ // Verifica validez de la posición inicial

            if(this.inicio.x !== null && this.inicio.y !== null &&
            !(this.inicio.x === inicio.x && this.inicio.y === inicio.y)){ // Si ya hay un inicio previo diferente
            if(!(this.fin.x === this.inicio.x && this.fin.y === this.inicio.y)){
                this.matriz[this.inicio.y][this.inicio.x] = TERRENO.LIBRE;
                } // Limpia la posición previa
            }

            this.matriz[inicio.y][inicio.x] = TERRENO.INICIO; // Coloca el punto de inicio
            this.inicio.x = inicio.x;
            this.inicio.y = inicio.y;
        } else{ // Si la posición no es válida
            alert("Posicion Inicial no Valida.");
        }

        if(this.dentroDeRango(fin.x, fin.y) &&
            !(fin.x === inicio.x && fin.y === inicio.y) &&
            this.esTransitable(fin.x, fin.y)){ // Verifica validez de la posición final

            if(this.fin.x !== null && this.fin.y !== null &&
            !(this.fin.x === fin.x && this.fin.y === fin.y)){ // Si ya hay un fin previo diferente
            if(!(this.inicio.x === this.fin.x && this.inicio.y === this.fin.y)){
                this.matriz[this.fin.y][this.fin.x] = TERRENO.LIBRE;
                } // Limpia la posición previa
            }

            this.matriz[fin.y][fin.x] = TERRENO.FIN; // Coloca el punto final
            this.fin.x = fin.x;
            this.fin.y = fin.y;
        } else{ // Si la posición no es válida
            alert("Posicion Final no Valida")
        }
    }

    alternarObstaculo(fila, columna){ // Método para alternar un obstáculo en una posición específica
        if(!this.dentroDeRango(columna, fila)) return; // Verifica rango válido
        const valorActual = this.matriz[fila][columna]; // Tipo de terreno actual
        // LÓGICA: Si es el Inicio (E) ni el Fin (S), no hacemos nada
        if (valorActual === TERRENO.INICIO || valorActual === TERRENO.FIN) return;
        // LÓGICA: Si no es el Inicio (E) ni el Fin (S), cambiamos el terreno        
        if (valorActual === TERRENO.LIBRE || valorActual === TERRENO.CAMINO) {
            const tipo_terreno = Math.floor(Math.random() * 3) + 1; // Valores entre 1 y 3
            this.matriz[fila][columna] = tipo_terreno; // Asignamos un obstáculo aleatorio
        } else{ // Si es un obstáculo, lo convertimos en libre
            this.matriz[fila][columna] = TERRENO.LIBRE; 
        }
    }

    esTransitable(datoX, datoY){ // Verifica si una celda es transitable
        return (this.matriz[datoY][datoX] != TERRENO.EDIFICIO &&
           this.matriz[datoY][datoX] != TERRENO.AGUA &&
           this.matriz[datoY][datoX] != TERRENO.BLOQUEO)
    }

    dentroDeRango(valorX, valorY){ // Verifica si las coordenadas están dentro del rango de la matriz
        return (valorX >= 0 && valorX < this.columna && valorY >= 0 && valorY < this.fila); // Rango válido
    }

}
