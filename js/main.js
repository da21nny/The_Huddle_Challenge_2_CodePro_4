import { MapaLogica, TERRENO } from "./mapaLogica.js"
import { MapaRender } from "./mapaRender.js";
import { CalculadoraDeRuta } from "./calculadora_de_ruta.js";

let mapaLogica; // Instancia global del mapa lógico
let mapaRender; // Instancia global del renderizador del mapa
let calculadoraRuta; // Instancia global de la calculadora de ruta

function iniciarProyecto(){ // Función para iniciar el proyecto y asociar eventos a los botones
    const btnGenerar = document.getElementById('btnGenerar'); // Botón para generar la matriz
    const btnEnviar = document.getElementById('btnEnviar'); // Botón para enviar las coordenadas
    const mapaContenedor = document.getElementById('resultado'); //

    btnGenerar.addEventListener('click', crearMatriz); // Asocia el evento click al botón de generar matriz
    btnEnviar.addEventListener('click', procesarCoordenadas); // Asocia el evento click al botón de enviar coordenadas
    mapaContenedor.addEventListener('click', gestionarClickMapa); // Asocia el evento click al contenedor del mapa
}

function crearMatriz(){ // Genera la matriz del mapa
    const numFila = parseInt(document.getElementById('fila').value); // Obtiene número de filas
    const numColumna = parseInt(document.getElementById('columna').value); // Obtiene número de columnas
    
    let previoInicio = null; // Guarda posición previa de inicio
    let previoFin = null; // guarda posición previa de fin

    if(mapaLogica && mapaLogica.matriz){ // Si ya existe una instancia previa del mapa
        if(mapaLogica.inicio.x !== null && mapaLogica.inicio.y !== null) previoInicio = { x: mapaLogica.inicio.x, y: mapaLogica.inicio.y };
        if(mapaLogica.fin.x !== null && mapaLogica.fin.y !== null) previoFin = { x: mapaLogica.fin.x, y: mapaLogica.fin.y };
    }

    mapaLogica = new MapaLogica(numFila, numColumna); // Crea nueva instancia del mapa
    mapaRender = new MapaRender('resultado', numFila, numColumna); // Crea nueva instancia del renderizador del mapa

    if(previoInicio){ // Restaura posición previa de inicio
        mapaLogica.inicio.x = previoInicio.x;
        mapaLogica.inicio.y = previoInicio.y;
    }
    if(previoFin){ // Restaura posición previa de fin
        mapaLogica.fin.x = previoFin.x;
        mapaLogica.fin.y = previoFin.y;
    }

    mapaLogica.generarMatriz(); // Genera la matriz vacía
    mapaLogica.generarObstaculos(); // Genera obstáculos según la dificultad
    actualizarInterfaz(); // Actualiza la interfaz para mostrar el nuevo mapa
}

function procesarCoordenadas(){ // Establece las coordenadas de inicio y fin
    if(!mapaLogica){ // Verifica que la matriz esté generada
        alert("Genere primeramente la matriz");
        return;
    }

    const inicio = {x: parseInt(document.getElementById('inicioX').value) - 1, y: parseInt(document.getElementById('inicioY').value) -1};
    const fin = {x: parseInt(document.getElementById('finX').value) - 1, y: parseInt(document.getElementById('finY').value) - 1}

    mapaLogica.coordenadaInicioFin(inicio, fin); // Establece las coordenadas en la matriz

    actualizarInterfaz(); // Actualiza la interfaz para reflejar los cambios
}

function actualizarInterfaz(){ // Actualiza la interfaz después de cambios en el mapa    
    let mensaje = "0 pasos";
    calculadoraRuta = new CalculadoraDeRuta(mapaLogica.matriz); // Nueva instancia de calculadora de ruta

    if (mapaLogica.inicio.x !== null && mapaLogica.fin.x !== null) { // Verifica que las coordenadas de inicio y fin estén establecidas
        mensaje = calculadoraRuta.calcularRuta(mapaLogica.inicio.x, mapaLogica.inicio.y, mapaLogica.fin.x, mapaLogica.fin.y); // Calcula la ruta
    }
    document.getElementById('distancia').innerHTML = mensaje; // Actualiza el mensaje de distancia
    mapaRender.mostrarMapa(mapaLogica.matriz); // Muestra el mapa actualizado
}

function gestionarClickMapa(evento){ // Gestiona los clics en el mapa para modificar terrenos
    // Verifica que la matriz esté generada y que se haya clickeado una celda válida.
    if (!mapaLogica || !evento.target.classList.contains('cell')) return; 
    // Obtenemos la posición de la celda clickeada
    const fila = parseInt(evento.target.dataset.fila); // Fila de la celda clickeada
    const columna = parseInt(evento.target.dataset.columna); // Columna de la celda clickeada
    const valorActual = mapaLogica.matriz[fila][columna]; // Valor actual de la celda clickeada
    // LÓGICA: Si es el Inicio (E) ni el Fin (S), no hacemos nada
    if (valorActual === TERRENO.INICIO || valorActual === TERRENO.FIN) return;
    // LÓGICA: Si no es el Inicio (E) ni el Fin (S), cambiamos el terreno        
    if (valorActual === TERRENO.LIBRE || valorActual === TERRENO.CAMINO) {
        const tipo_terreno = Math.floor(Math.random() * 3) + 1; // Valores entre 1 y 3
        mapaLogica.matriz[fila][columna] = tipo_terreno; // Asignamos un obstáculo aleatorio
    } else{ // Si es un obstáculo, lo convertimos en libre
        mapaLogica.matriz[fila][columna] = TERRENO.LIBRE; 
    }
    actualizarInterfaz(); // Actualizamos la interfaz para reflejar los cambios 
}

document.addEventListener('DOMContentLoaded', iniciarProyecto) ; // Inicia el proyecto cuando el DOM esté cargado
