# The_Huddle_Challenge_1_CodePro_4
Proyecto - “THE HUDDLE — Calculadora de Rutas para los Elegidos” - Challenge 1 - The Huddle

🧠 Que hice?

Desarrollé una calculadora de ruta sobre un Tablero 2D en un entorno Web. Utiliza Javascrip para
la parte Logica del tablero y HTML para captura de datos y CSS para el diseño.
El programa pide al usuario definir:

- Dimension del Tablero (Fila y Columnas).
- La coordenada de Inicio (inicio_x, inicio_y).
- La coordenada de Fin (fin_x, fin_y).
- Definir la dificultad del mapa (Facil a Extremo). Asigna la cantidad de obstaculos que tendra el mapa.

Una vez definido la dimension y dificultad, el mapa genera obstaculos estaticos (Edificio, Agua, Bloqueo) de forma aleatoria y la cantidad
varia segun la dificultas (facil = menos obstaculos - extremo = mas obstaculos).

Luego se ingresa las coordenadas de inicio y fin y se integran al mapa para luego con una funcion buscar el
camino mas corto entre las coordenadas dentro del mapa, evitando los obstaculos y visualizando en tiempo real.

El programa permite interactuar con el tablero, clickeando una celda y cambiar los obstaculos por caminos libres o viceversa (Se agrega un tipo de obstaculo de forma aleatoria).
Si se coloca un obstaculo en el camino señalado, el algoritmo se actualiza y busca otros caminos disponibles (Si no hay camino, se imprime mensaje que no existe camino disponible).


🔍 Que algoritmo utilice?

Utilice el algoritmo BFS(Breadth-First Search) porque:

- Permite explorar el tablero por niveles, garantizandome que encontrara el camino mas corto.
- Garantiza que halla el mejor camino si el tablero es grande y tenga muchos obstaculos.
- Facil implementacion y manejo de Cola (Deque) y set de visitados para optimizar recorridos.

El programa llama al algoritmo bfs para calcular el camino mas corto y devuelve una lista del camino mas corto, luego utiliza una tecnica similar a backtraking pero lo hace de forma iterativa (hacia atras) para recuperar el camino y marcar en el tablero con (*).


📚 Que aprendi?

- Aprendi javascript principalmente y un poco a html.
- Aprendi a como conectar html y javascript
- A como capturar los datos ingresados en html y pasar a javascript.
- A usar clases en javascript para mejor modularidad.
- A como utilizar export e import en javascript para utilizar funciones de otros archivos.
- A separar responsabilidades de funciones y ser mas concreto con la funcionalidad.

