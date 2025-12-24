export class Coordenadas{
    constructor(coor_x, coor_y){
        this.coor_x = coor_x;
        this.coor_y = coor_y;
    }

    getClave(){
        return this.coor_x + ',' + this.coor_y;
    }

    sumar(nuevo){
        return new Coordenadas(this.coor_x + nuevo.coor_x, this.coor_y + nuevo.coor_y);
    }

    esIgual(nuevo){
        return this.coor_x === nuevo.coor_x && this.coor_y === nuevo.coor_y;
    }
}