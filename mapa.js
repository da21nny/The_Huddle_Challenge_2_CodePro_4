const TERRENO = {
    LIBRE: 0,
    EDIFICIO: 1,
    AGUA: 2,
    BLOQUEO: 3
};

class huddleMap{
    constructor (filas, columnas){
        this.filas = filas;
        this.columnas = columnas;
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
        return this.matriz;
    }

    colocar_terreno(fila, columna, tipo_terreno){
        if(fila >= 0 && fila < this.filas && columna >= 0 && columna < this.columnas){
            this.matriz[fila][columna] = tipo_terreno;
        }else{
            alert("Valores fuera de rango");            
        }
    }

    generar_obstaculos(){
        const numObstaculos = Math.floor((this.filas * this.columnas) * 0.3);
        for(let i = 0; i < numObstaculos; i++){
            const fila = Math.floor(Math.random() * this.filas);
            const columna = Math.floor(Math.random() * this.columnas);
            const tipo = Math.floor(Math.random() * 3) + 1;

            this.colocar_terreno(fila, columna, tipo);
        }


    }

    coordenada_inicio_fin(inicial_x, inicial_y, fin_x, fin_y){
        if(inicial_y >= 0 && inicial_y < this.filas && this.matriz[inicial_y][inicial_x] != TERRENO.EDIFICIO 
            && this.matriz[inicial_y][inicial_x] != TERRENO.AGUA
            && this.matriz[inicial_y][inicial_x] != TERRENO.BLOQUEO){
                this.matriz[inicial_y][inicial_x] = 9;
        } else{
            alert("Posicion Inicial no Valida.");
        }

        if(fin_y >= 0 && fin_y < this.filas && this.matriz[fin_y][fin_x] != TERRENO.EDIFICIO
            && this.matriz[fin_y][fin_x] != TERRENO.AGUA
            && this.matriz[fin_y][fin_x] != TERRENO.BLOQUEO){
                this.matriz[fin_y][fin_x] = 7;
        } else{
            alert("Posicion Final no Valida")
        }
    }

    mostrar_mapa(){
        const contenedor = document.getElementById('resultado');
        contenedor.textContent = '';

        contenedor.style.gridTemplateColumns = `repeat(${this.columnas}, 35px)`;
        for(let fila = 0; fila < this.filas; fila++){
            for(let columna = 0; columna < this.columnas; columna++){
                const celdaDiv = document.createElement('div');
                celdaDiv.classList.add('cell');

                const valor = this.matriz[fila][columna];

                if(valor === 1){
                    celdaDiv.textContent = 'X';
                    celdaDiv.classList.add('edificio');
                }
                else if(valor === 2){
                    celdaDiv.textContent = 'a';
                    celdaDiv.classList.add('agua');
                }
                else if(valor === 3){
                    celdaDiv.textContent = 'B';
                    celdaDiv.classList.add('bloqueo');
                } 
                else if(valor === 9){
                    celdaDiv.textContent = 'E';
                    celdaDiv.classList.add('entrada');
                } 
                else if(valor === 7){
                    celdaDiv.textContent = 'S';
                    celdaDiv.classList.add('salida');
                }
                else{
                    celdaDiv.textContent = '.';
                    celdaDiv.classList.add('libre');
                }
                contenedor.appendChild(celdaDiv);
            }
        }
        //contenedor.textContent = texto_salida;
    }
}

export {huddleMap};