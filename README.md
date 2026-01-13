The_Huddle_Challenge_2_CodePro_4
Proyecto - “Código Heredado: El Renacer de los Objetos” - The Huddle

🧠 Que hice?

Desarrollé una calculadora de ruta sobre un Tablero 2D en un entorno Web. Utiliza Javascrip para la parte Logica del tablero y HTML para captura de datos y CSS para el diseño. El programa pide al usuario definir:

- Dimension del Tablero (Fila y Columnas).
- La coordenada de Inicio (inicio_x, inicio_y).
- La coordenada de Fin (fin_x, fin_y).
- Una vez definido la dimension y dificultad, el mapa genera obstaculos estaticos (Edificio, Agua, Bloqueo) de forma aleatoria y la cantidad varia segun la dificultas (facil = menos obstaculos - extremo = mas obstaculos).

Luego se ingresa las coordenadas de inicio y fin y se integran al mapa para luego con una funcion buscar el camino mas corto entre las coordenadas dentro del mapa, evitando los obstaculos y visualizando en tiempo real.

El programa permite interactuar con el tablero, clickeando una celda y cambiar los obstaculos por caminos libres o viceversa (Se agrega un tipo de obstaculo de forma aleatoria). Si se coloca un obstaculo en el camino señalado, el algoritmo se actualiza y busca otros caminos disponibles (Si no hay camino, se imprime mensaje que no existe camino disponible).

🔍 Que algoritmo utilice?

Utilice el algoritmo A* porque:

- Me permite encontrar el camino mas optimo teniendo los puntos de origen y fin, utiliza una formula heuristica para priorizar caminos prometedores.
- Me permmite asignar costo a un obstaculo (en este caso agua con un costo de 5) para que pueda atravesar en el caso que no encuentre un camino libre.
- Es mas inteligente, porque tiene brujula que me dice donde esta la salida y cada paso tiene un peso que va diciendo si esta en el camino correcto a la salida
- El programa llama al algoritmo para calcular el camino optimo y luego utiliza una tecnica llamada backtraking (recorre de fin a inicio) para recuperar el camino y marcar en el tablero con (*).

📚 Que aprendi?

- Aprendi javascript principalmente y un poco a html.
- Aprendi a como conectar html y javascript
- A como capturar los datos ingresados en html y pasar a javascript.
- A usar clases en javascript para mejor modularidad.
- A como utilizar export e import en javascript para utilizar funciones de otros archivos.
- A separar responsabilidades de funciones y ser mas concreto con la funcionalidad.
