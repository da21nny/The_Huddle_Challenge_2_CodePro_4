# 🏁 Checklist de Progreso: The Huddle

> **Instrucciones:** Cambia `[ ]` por `[x]` para marcar las tareas completadas.

## 🧱 Fase 1: El Corazón del Sistema (Lógica JS)
- [x] **Clase HuddleMap**: Definir la clase con constructor de filas y columnas.
- [x] **Generación de Matriz**: Crear el array bidimensional lleno de `0`.
- [x] **Constantes de Terreno**: Definir 0 (libre), 1 (edificio), 2 (agua), 3 (bloqueo).
- [x] **Método setTerrain**: Función para cambiar el valor de una celda específica.
- [x] **Validador de Límites**: Función `isValid(x, y)` para evitar errores de coordenadas.
- [x] **Visualizador de Consola**: Método `display()` que use `.`, `X`, `W` y `B`.

## 🎨 Fase 2: Interfaz Visual (HTML/CSS)
- [X] **Contenedor HTML**: Crear un div `#grid-container` en el index.html.
- [X] **CSS Grid**: Configurar el grid para que las celdas sean cuadradas y alineadas.
- [X] **Estilos por Tipo**: Crear clases CSS para cada terreno (ej. `.wall { background: #333 }`).
- [X] **Función renderMap**: Lógica en JS que borre el contenedor y cree nuevos `div` por cada celda.
- [ ] **Panel de Control**: Añadir botones para "Calcular" y "Reiniciar Mapa".

## 🧠 Fase 3: Inteligencia (Algoritmo BFS)
- [ ] **Definir Inicio y Fin**: Variables para almacenar `[row, col]` de salida y llegada.
- [ ] **Obtener Vecinos**: Función que devuelva solo las celdas adyacentes transitables.
- [ ] **Estructura de Cola (Queue)**: Configurar el array para el flujo de exploración del BFS.
- [ ] **Bucle de Búsqueda**: Implementar el algoritmo que recorre el mapa hasta hallar el destino.
- [ ] **Mapa de Padres**: Objeto para registrar de qué celda vino cada paso (reconstrucción de ruta).



## 🚀 Fase 4: Interactividad y Resultados
- [ ] **Modo Edición (Click)**: Permitir que al hacer clic en una celda visual cambie su valor en la matriz.
- [ ] **Cálculo Dinámico**: Ejecutar el algoritmo al presionar el botón o al cambiar el mapa.
- [ ] **Dibujar Ruta**: Función que recorra el camino hallado y pinte las celdas con `*` o un color especial.
- [ ] **Alerta de Sin Salida**: Mostrar un mensaje en el HTML si el destino es inalcanzable.

## 📄 Fase 5: Entrega y Bonus
- [ ] **Comentarios de Código**: Explicar brevemente qué hace cada función principal.
- [ ] **Escalabilidad**: Probar que el mapa funcione si se cambia a 20x20 o 5x5.
- [ ] **README.md**: Escribir la explicación del algoritmo BFS y lecciones aprendidas.
- [ ] **Bonus (Opcional)**: Implementar costos de movimiento o tráfico temporal.