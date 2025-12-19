
function main(){
    let matriz = [];

    const pos_x = parseInt(document.getElementById('posicion_x').value);
    const pos_y = parseInt(document.getElementById('posicion_y').value);

    const numFila = parseInt(document.getElementById('fila').value);
    const numColumna = parseInt(document.getElementById('columna').value);
    const contenedor = document.getElementById('resultado');
    
    for(let y = 0; y < numFila; y++){
        let fila = [];
        for(let x = 0; x < numColumna; x++){
            fila.push('⬜');
        }
        matriz.push(fila);
    }

    if(pos_x >= 0 && pos_x < numFila && pos_y >= 0 && pos_y < numColumna ){
        matriz[pos_y - 1][pos_x - 1] = '🏁';
    } else{
        alert("Posicion Invalida");
    }

    
    const representacionvisual = matriz.map(fila => fila.join(" ")).join("<br>");

    contenedor.innerHTML = representacionvisual;
}