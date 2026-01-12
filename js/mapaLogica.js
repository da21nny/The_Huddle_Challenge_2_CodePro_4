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
    constructor (filas, columnas){
        this.filas = filas;
        this.columnas = columnas;
        this.inicial_x = null;
        this.inicial_y = null;
        this.fin_x = null;
        this.fin_y = null;
        this.matriz = this.generar_matriz();
    } // Constructor de la clase

    generar_matriz(){ // Genera una matriz vacía con el terreno libre
        this.matriz = [];
        for(let fila = 0; fila < this.filas; fila++){
            let fila_actual = [];
            for(let columna = 0; columna < this.columnas; columna++){
                fila_actual.push(TERRENO.LIBRE); // Inicializa con terreno libre
            } 
            this.matriz.push(fila_actual); // Añade la fila a la matriz
        }
        // Coloca el punto de inicio si existe
        if(this.inicial_x !== null && this.inicial_y !== null){
            if(this.dentro_de_rango(this.inicial_x, this.inicial_y)){
                this.matriz[this.inicial_y][this.inicial_x] = TERRENO.INICIO; 
            }
        }
        // Coloca el punto final si existe
        if(this.fin_x !== null && this.fin_y !== null){
            if(this.dentro_de_rango(this.fin_x, this.fin_y)){
                this.matriz[this.fin_y][this.fin_x] = TERRENO.FIN;
            }
        }

        return this.matriz; // Devuelve la matriz generada
    }

    colocar_terreno(fila, columna, tipo_terreno){ // Coloca un tipo de terreno en una posición específica
        if(!this.dentro_de_rango(columna, fila)){
            alert("Valores fuera de rango");
            return false;
        }

        const actual = this.matriz[fila][columna]; // Tipo de terreno actual

        if(actual === TERRENO.INICIO || actual === TERRENO.FIN){ // No se puede cambiar el terreno del inicio o fin
            return false;
        }
        this.matriz[fila][columna] = tipo_terreno; // Coloca el nuevo tipo de terreno
        return true;
    }

    generar_obstaculos(){ // Genera obstáculos aleatorios en la matriz según la dificultad
        const numObstaculos = Math.floor((this.filas * this.columnas) * PORCENTAJE_OBSTACULO); // Número de obstáculos a generar
        for(let i = 0; i < numObstaculos; i++){
            const fila = Math.floor(Math.random() * this.filas); // Fila aleatoria
            const columna = Math.floor(Math.random() * this.columnas); // Columna aleatoria
            const tipo = Math.floor(Math.random() * 3) + 1; // Tipo de terreno aleatorio (1 a 3)

            const actual = this.matriz[fila][columna]; // Tipo de terreno actual

            if(actual === TERRENO.INICIO || actual === TERRENO.FIN){ // No se puede cambiar el terreno del inicio o fin
                continue; // Saltar esta iteración
            }
            this.colocar_terreno(fila, columna, tipo); // Coloca el terreno
        }
    }

    coordenada_inicio_fin(inicial_x, inicial_y, fin_x, fin_y){ // Establece las coordenadas de inicio y fin
        if(this.dentro_de_rango(inicial_x, inicial_y) &&
           !(inicial_x === fin_x && inicial_y === fin_y) && 
           this.es_transitable(inicial_x, inicial_y)){ // Verifica validez de la posición inicial

            if(this.inicial_x !== null && this.inicial_y !== null &&
            !(this.inicial_x === inicial_x && this.inicial_y === inicial_y)){ // Si ya hay un inicio previo diferente
            if(!(this.fin_x === this.inicial_x && this.fin_y === this.inicial_y)){
                this.matriz[this.inicial_y][this.inicial_x] = TERRENO.LIBRE;
                } // Limpia la posición previa
            }

            this.matriz[inicial_y][inicial_x] = TERRENO.INICIO; // Coloca el punto de inicio
            this.inicial_x = inicial_x;
            this.inicial_y = inicial_y;
        } else{ // Si la posición no es válida
            alert("Posicion Inicial no Valida.");
        }

        if(this.dentro_de_rango(fin_x, fin_y) &&
            !(fin_x === inicial_x && fin_y === inicial_y) &&
            this.es_transitable(fin_x, fin_y)){ // Verifica validez de la posición final

            if(this.fin_x !== null && this.fin_y !== null &&
            !(this.fin_x === fin_x && this.fin_y === fin_y)){ // Si ya hay un fin previo diferente
            if(!(this.inicial_x === this.fin_x && this.inicial_y === this.fin_y)){
                this.matriz[this.fin_y][this.fin_x] = TERRENO.LIBRE;
                } // Limpia la posición previa
            }

            this.matriz[fin_y][fin_x] = TERRENO.FIN; // Coloca el punto final
            this.fin_x = fin_x;
            this.fin_y = fin_y;
        } else{ // Si la posición no es válida
            alert("Posicion Final no Valida")
        }
    }

    es_transitable(dato_x, dato_y){ // Verifica si una celda es transitable
        return (this.matriz[dato_y][dato_x] != TERRENO.EDIFICIO &&
           this.matriz[dato_y][dato_x] != TERRENO.AGUA &&
           this.matriz[dato_y][dato_x] != TERRENO.BLOQUEO)
    }

    dentro_de_rango(valor_x, valor_y){ // Verifica si las coordenadas están dentro del rango de la matriz
        return (valor_x >= 0 && valor_x < this.columnas && valor_y >= 0 && valor_y < this.filas); // Rango válido
    }

}
