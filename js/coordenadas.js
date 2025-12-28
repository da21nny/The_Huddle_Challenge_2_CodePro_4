// Clase para manejar coordenadas en el grid
export class Coordenadas{
    constructor(coor_x, coor_y){ // Inicializa las coordenadas
        this.coor_x = coor_x;
        this.coor_y = coor_y;
    }
    // Devuelve una clave única para la coordenada
    getClave(){
        return this.coor_x + ',' + this.coor_y;
    }
    // Suma otra coordenada a la actual y devuelve una nueva instancia
    sumar(nuevo){
        return new Coordenadas(this.coor_x + nuevo.coor_x, this.coor_y + nuevo.coor_y);
    }
    // Verifica si dos coordenadas son iguales
    esIgual(nuevo){
        return this.coor_x === nuevo.coor_x && this.coor_y === nuevo.coor_y;
    }
}