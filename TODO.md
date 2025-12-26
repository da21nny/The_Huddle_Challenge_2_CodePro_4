# 🧭 Hoja de Ruta: Proyecto "The Huddle"

Este documento sirve para gestionar el avance diario del reto de programación. Cada tarea debe completarse antes de pasar al siguiente día.

## 📅 Lunes 22 Dic: Cimientos y Datos
- [x] [cite_start]**Estructura Base**: Crear el archivo `script.js` con la clase `HuddleMap`[cite: 16].
- [x] [cite_start]**Matriz de Datos**: Generar el array bidimensional (N x M) para el mapa[cite: 5, 9].
- [x] [cite_start]**Tipos de Terreno**: Definir valores numéricos para 0 (camino), 1 (edificio), 2 (agua) y 3 (bloqueo)[cite: 9].
- [x] [cite_start]**Prueba de Consola**: Implementar el método `display()` para ver el mapa con símbolos (`.`, `X`, etc.)[cite: 12].

## 📅 Martes 23 Dic: Interfaz Visual (DOM)
- [x] **Estructura HTML**: Crear el contenedor principal para la cuadrícula en `index.html`.
- [x] **Estilos CSS**: Definir el sistema de Grid para que las celdas se alineen correctamente.
- [x] **Renderizado Dinámico**: Crear la función `renderMap()` que transforme la matriz de JS en divs visibles.
- [x] **Código de Colores**: Asignar colores específicos a cada tipo de terreno para identificación visual rápida.

## 📅 Miércoles 24 Dic: Interactividad y Validación
- [x] [cite_start]**Entradas de Usuario**: Añadir inputs o selectores para las coordenadas de Inicio y Fin[cite: 10].
- [x] [cite_start]**Validación de Límites**: Programar la lógica que impida colocar puntos fuera del mapa[cite: 11].
- [x] [cite_start]**Control de Obstáculos**: Impedir que el usuario elija un edificio (X) como punto de inicio o destino[cite: 11].
- [x] **Modo Edición**: Permitir que al hacer clic en una celda, esta cambie de tipo de terreno.

## 📅 Jueves 25 Dic: El Cerebro (Algoritmo BFS)
- [x] **Lógica de Vecinos**: Crear función para obtener celdas adyacentes (N, S, E, O) que sean transitables.
- [x] [cite_start]**Implementación BFS**: Programar la búsqueda en anchura para encontrar la ruta más corta[cite: 6, 14].
- [x] **Rastreo de Padres**: Guardar la procedencia de cada celda para poder reconstruir el camino al final.

## 📅 Viernes 26 Dic: Visualización de Ruta
- [x] [cite_start]**Trazado de Camino**: Marcar las celdas de la ruta óptima con el símbolo `*` en la matriz[cite: 12].
- [x] [cite_start]**Refresco en Pantalla**: Hacer que el mapa visual se actualice automáticamente al hallar la ruta[cite: 13].
- [x] **Recálculo**: Asegurar que si el mapa cambia, la ruta se borre o se actualice.

## 📅 Sábado 27 Dic: Robustez y Bonus
- [ ] [cite_start]**Manejo de Errores**: Mostrar un mensaje claro si no existe un camino posible (mapa bloqueado)[cite: 4].
- [ ] [cite_start]**Bonus (Opcional)**: Añadir costos adicionales al terreno "Agua" o simular tráfico temporal[cite: 20, 22].

## 📅 Domingo 28 Dic: Documentación y Pulido
- [ ] [cite_start]**Limpieza de Código**: Revisar que el código sea claro, lógico y escalable[cite: 15, 19].
- [ ] [cite_start]**README Final**: Explicar qué algoritmo se usó y los aprendizajes obtenidos[cite: 17, 18].
- [ ] [cite_start]**Pruebas Finales**: Ejecutar el código con diferentes tamaños de mapa para asegurar estabilidad[cite: 19].