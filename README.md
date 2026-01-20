# The_Huddle_Challenge_2_CodePro_4
Proyecto - “Código Heredado: El Renacer de los Objetos” - The Huddle

🧠 Cómo dividiste las responsabilidades.
Dividi el proyecto en varias clases para una mejor implementacion del principio de responsabilidad.
1. Main:
- Encargado de la conexion con el html y ejecucion ordenada del proyecto.
- Encargado de la crecion de los objetos necesarios para la ejecucion del proyecto
- Recibe todos los datos necesarios que el usuario ingresa.
- Actua de mediador entre la entrada de datos de usuario con el manejo logico del proyecto.

2. Mapa Render:
- Encargado principal del manejo visual del tablero en el html
- Encargado de la creacion dinamica de div y cell en la estructura html

3. Mapa Logica:
Encargado del manejo y creacion logico de la Clase MapaLogico
Incluye los sgtes metodos:
- Crear tablero.
- Colocar obstaculos en el tablero.
- Generacion aleatoria de obstaculos para colocacion en el tablero.
- Colocacion de coordenadas de Inicio y Fin.
- Alternar obstaculos (Permite cambiar de forma manual los obstaculos).
- Validacion de que es transitable y dentro de rango.

4. Clase Calculadora de Ruta:
Incluye los sgtes metodos.
- Calcular Ruta.
Permite la creacion del objeto para instanciar metodo para la utilizacion del algoritmo implementado.
- Limpiar Ruta.
Permite limpiar el camino antiguo para visualizar mejor el nuevo camino generado.

5. Algoritmo A*:
- Encargado principalmente del manejo logico del algoritmo que permite encontrar el camino mas optimo.
- Hereda las propiedades de una clase para reconstruir el camino en el tablero

6. Algoritmo Busqueda:
Implementa algunas funciones que pueden ser utilizadas en otros tipos de algoritmos
- Metodo Heuristica para saber la distancia estimada del punto actual al punto final.
- Metodo Reconstruir Ruta para marcar en el tablero el camino correspondiente (puede ser usado en distintos tipos de algoritmos BFS, Dijkstra o A*)

🔍 Qué aprendiste del proceso de refactorizació.
- Aprendi a dividir responsabilidades para un mejor manejo del codigo.
- A como manejar las clases y sus metodos.
- Separar codigo reutilizable para mejor aprovechamiento en futuras implementaciones.


📚 Qué decisiones tomaste y por qué.
- Usar Programacion Orientada a Objetos (POO) para un mejor reescalabilidad y reutilizacion del proyecto.

- Decidi tener una clase para que pueda manejar varias tipos de algoritmos (por el momento solo A*), asi en futuras implementaciones poder solo corregir ligeramente el codigo sin necesidad de reestructura por completo.
