
function main(){
    let matriz = [];

    const numFila = parseInt(document.getElementById('fila').value);
    const numColumna = parseInt(document.getElementById('columna').value);
    const contenedor = document.getElementById('resultado');
    
    for(let y = 0; y < numFila; y++){
        let fila = [];
        for(let x = 0; x < numColumna; x++){
            fila.push(1);
        }
        matriz.push(fila);
    }
    const representacionvisual = matriz.map(fila => fila.join(" ")).join("<br>");

    contenedor.innerHTML = representacionvisual;
}