var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntaPrimerValor() {
    rl.question('Ingresa el primer valor: ', function(num1) {
        preguntaSegundoValor(num1);
    });
}

function preguntaSegundoValor(num1) {
    rl.question('Ingresa el segundo valor: ', function(num2) {
        var a = Number(num1);
        var b = Number(num2);
        var suma = a + b;
        var resultado = suma * suma; // elevar al cuadrado usando multiplicación
        console.log('La suma elevada al cuadrado es: ' + resultado);
        rl.close();
    });
}

preguntaPrimerValor();