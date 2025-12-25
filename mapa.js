export const TERRENO = {
    LIBRE: 0,
    EDIFICIO: 1,
    AGUA: 2,
    BLOQUEO: 3,
    INICIO: 9,
    FIN: 7,
    CAMINO: 5
};

export class huddleMap{
    constructor (filas, columnas){
        this.filas = filas;
        this.columnas = columnas;
        this.inicial_x = null;
        this.inicial_y = null;
        this.fin_x = null;
        this.fin_y = null;
        this.matriz = this.generar_matriz();
    }

    generar_matriz(){
        this.matriz = [];
        for(let fila = 0; fila < this.filas; fila++){
            let fila_actual = [];
            for(let columna = 0; columna < this.columnas; columna++){
                fila_actual.push(TERRENO.LIBRE);
            }
            this.matriz.push(fila_actual);
        }

        if(this.inicial_x !== null && this.inicial_y !== null){
            if(this.dentro_de_rango(this.inicial_x, this.inicial_y)){
                this.matriz[this.inicial_y][this.inicial_x] = TERRENO.INICIO;
            }
        }

        if(this.fin_x !== null && this.fin_y !== null){
            if(this.dentro_de_rango(this.fin_x, this.fin_y)){
                this.matriz[this.fin_y][this.fin_x] = TERRENO.FIN;
            }
        }

        return this.matriz;
    }


    colocar_terreno(fila, columna, tipo_terreno){
        if(!this.dentro_de_rango(columna, fila)){
            alert("Valores fuera de rango");
            return false;
        }

        const actual = this.matriz[fila][columna];

        if(actual === TERRENO.INICIO || actual === TERRENO.FIN){
            return false;
        }
        this.matriz[fila][columna] = tipo_terreno;
        return true;
    }

    generar_obstaculos(dificultad){
        const numObstaculos = Math.floor((this.filas * this.columnas) * dificultad);
        for(let i = 0; i < numObstaculos; i++){
            const fila = Math.floor(Math.random() * this.filas);
            const columna = Math.floor(Math.random() * this.columnas);
            const tipo = Math.floor(Math.random() * 3) + 1;

            const actual = this.matriz[fila][columna];

            if(actual === TERRENO.INICIO || actual === TERRENO.FIN){
                continue;
            }
            this.colocar_terreno(fila, columna, tipo);
        }
    }

    coordenada_inicio_fin(inicial_x, inicial_y, fin_x, fin_y){
        if(this.dentro_de_rango(inicial_x, inicial_y) && 
           this.matriz[inicial_y][inicial_x] != TERRENO.EDIFICIO &&
           this.matriz[inicial_y][inicial_x] != TERRENO.AGUA &&
           this.matriz[inicial_y][inicial_x] != TERRENO.BLOQUEO){

            if(this.inicial_x !== null && this.inicial_y !== null &&
            !(this.inicial_x === inicial_x && this.inicial_y === inicial_y)){
            if(!(this.fin_x === this.inicial_x && this.fin_y === this.inicial_y)){
                this.matriz[this.inicial_y][this.inicial_x] = TERRENO.LIBRE;
                }
            }

            this.matriz[inicial_y][inicial_x] = TERRENO.INICIO;
            this.inicial_x = inicial_x;
            this.inicial_y = inicial_y;
        } else{
            alert("Posicion Inicial no Valida.");
        }

        if(this.dentro_de_rango(fin_x, fin_y) &&
           this.matriz[fin_y][fin_x] != TERRENO.EDIFICIO &&
           this.matriz[fin_y][fin_x] != TERRENO.AGUA &&
           this.matriz[fin_y][fin_x] != TERRENO.BLOQUEO){

            if(this.fin_x !== null && this.fin_y !== null &&
            !(this.fin_x === fin_x && this.fin_y === fin_y)){
            if(!(this.inicial_x === this.fin_x && this.inicial_y === this.fin_y)){
                this.matriz[this.fin_y][this.fin_x] = TERRENO.LIBRE;
                }
            }

            this.matriz[fin_y][fin_x] = TERRENO.FIN;
            this.fin_x = fin_x;
            this.fin_y = fin_y;
        } else{
            alert("Posicion Final no Valida")
        }
    }

    mostrar_mapa(callbackClick){
        const contenedor = document.getElementById('resultado');
        contenedor.innerHTML = '';
        contenedor.style.gridTemplateColumns = `repeat(${this.columnas}, 35px)`;

        for(let fila = 0; fila < this.filas; fila++){
            for(let columna = 0; columna < this.columnas; columna++){
                const celdaDiv = document.createElement('div');
                celdaDiv.classList.add('cell');
                const valor = this.matriz[fila][columna];

                if(valor === TERRENO.EDIFICIO){
                    celdaDiv.textContent = 'X';
                    celdaDiv.classList.add('edificio');
                }
                else if(valor === TERRENO.AGUA){
                    celdaDiv.textContent = 'a';
                    celdaDiv.classList.add('agua');
                }
                else if(valor === TERRENO.BLOQUEO){
                    celdaDiv.textContent = 'B';
                    celdaDiv.classList.add('bloqueo');
                } 
                else if(valor === TERRENO.INICIO){
                    celdaDiv.textContent = 'E';
                    celdaDiv.classList.add('entrada');
                } 
                else if(valor === TERRENO.FIN){
                    celdaDiv.textContent = 'S';
                    celdaDiv.classList.add('salida');
                }
                else if(valor === TERRENO.CAMINO){
                    celdaDiv.textContent = '*';
                    celdaDiv.classList.add('camino');
                }
                else{
                    celdaDiv.textContent = '.';
                    celdaDiv.classList.add('libre');
                }
                celdaDiv.style.cursor = "pointer"; // Indica que es clickable
                celdaDiv.onclick = () => {
                    // No permitimos editar el Inicio o el Fin
                    if (valor !== TERRENO.INICIO && valor !== TERRENO.FIN) {
                        // Cambiamos entre LIBRE y EDIFICIO (puedes añadir más tipos si quieres)
                        const tipo_terreno = Math.floor(Math.random() * 3) + 1;
                        this.matriz[fila][columna] = (valor === TERRENO.LIBRE || valor === TERRENO.CAMINO) ? tipo_terreno : TERRENO.LIBRE;
                        
                        // Si nos pasaron una función, la ejecutamos para recalcular todo
                        if (callbackClick) callbackClick();
                    }
                };
                contenedor.appendChild(celdaDiv);
            }
        }
        //contenedor.textContent = texto_salida;
    }

    dentro_de_rango(valor_x, valor_y){
        return (valor_x >= 0 && valor_x < this.columnas && valor_y >= 0 && valor_y < this.filas);
    }

}
