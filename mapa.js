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
        const numObstaculos = Math.floor((this.filas * this.columnas) * 0.5);
        for(let i = 0; i < numObstaculos; i++){
            const f = Math.floor(Math.random() * this.filas);
            const c = Math.floor(Math.random() * this.columnas);
            const tipo = Math.floor(Math.random() * 3) + 1;

            this.colocar_terreno(f, c, tipo);
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
        let texto_salida = '';
        for(let fila = 0; fila < this.filas; fila++){
            for(let columna = 0; columna < this.columnas; columna++){
                if(this.matriz[fila][columna] == 1) texto_salida += 'X'; //Edificio
                else if(this.matriz[fila][columna] == 2) texto_salida += 'a'; //Agua
                else if(this.matriz[fila][columna] == 3) texto_salida += 'B'; //Bloqueo
                else if(this.matriz[fila][columna] == 9) texto_salida += 'E';
                else if(this.matriz[fila][columna] == 7) texto_salida += 'S';
                else texto_salida += '.'; //Camino
            }
            texto_salida += '\n';
        }
        contenedor.textContent = texto_salida;
    }
}

export {huddleMap};