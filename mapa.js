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
        return matriz;
    }
    
}
