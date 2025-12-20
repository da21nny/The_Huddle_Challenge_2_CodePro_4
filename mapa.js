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
            console.error("Valores fuera de rango");            
        }
    }

    mostrar_mapa(){
        let texto_salida = '';
        for(let fila = 0; fila < this.filas; fila++){
            for(let columna = 0; columna < this.columnas; columna++){
                if(this.matriz[fila][columna] == 1) texto_salida += 'X'; //Edificio
                else if(this.matriz[fila][columna] == 2) texto_salida += 'a'; //Agua
                else if(this.matriz[fila][columna] == 3) texto_salida += 'B'; //Bloqueo
                else texto_salida += '.'; //Camino
            }
            texto_salida += '\n';
        }
        console.log(texto_salida);
    }
}

const mapa = new huddleMap(5, 5);

mapa.colocar_terreno(1, 1, 1);
mapa.colocar_terreno(2, 2, 2);
mapa.colocar_terreno(3, 3, 3);

mapa.mostrar_mapa();