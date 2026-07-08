# Roadmap

## Fase 0 — Planificación (completada)

- Definir alcance, modelo de datos, relaciones y orden de desarrollo.
- Mantener documentación suficiente para continuar en sesiones futuras.

**Resultado:** alcance y arquitectura inicial acordados.

## Fase 1 — Componentes y datos estáticos (completada)

- Sustituir la demostración de Vite por una lista estática de tickets.
- Separar la pantalla en componentes pequeños.
- Practicar JSX, props, composición, renderizado condicional, `map` y claves estables.

**Resultado:** primera vista funcional sin estado ni dependencias nuevas.

## Fase 2 — Estado local con `useState` (completada)

- Añadir búsqueda y filtros locales.
- Crear formularios controlados.
- Crear y editar tickets temporalmente en memoria.
- Practicar eventos, inmutabilidad y estado derivado.

**Resultado:** flujo interactivo completo antes de incorporar infraestructura.

## Fase 3 — Navegación con React Router (completada)

- Justificar e instalar React Router.
- Crear layout y rutas para login, dashboard, tickets, detalle, clientes y agentes.
- Añadir navegación y una página para rutas inexistentes.

**Resultado:** aplicación organizada en páginas navegables.

## Fase 4 — Sistema visual con Tailwind CSS (completada)

- Justificar e instalar Tailwind CSS.
- Definir estilos base, layout, tablas, formularios y estados visuales.
- Adaptar las vistas a tamaños de pantalla básicos.

**Resultado:** interfaz coherente y responsive sin cambiar la lógica existente.

## Fase 5 — Persistencia con JSON Server (siguiente)

- Justificar e instalar JSON Server.
- Crear las colecciones y datos iniciales según el modelo acordado.
- Crear funciones pequeñas de acceso a datos mediante `fetch`.
- Sustituir los arrays locales por operaciones HTTP.
- Manejar carga, error y ausencia de resultados.

**Resultado:** datos persistentes en una API simulada.

## Fase 6 — Sesión compartida con Context API

- Implementar autenticación simulada.
- Compartir el usuario activo y las operaciones de sesión.
- Proteger rutas y adaptar acciones visibles según el rol.

**Resultado:** sesión accesible en las partes de la aplicación que la necesitan.

## Fase 7 — Flujos complejos con `useReducer`

- Identificar un flujo con varias transiciones relacionadas.
- Aplicar `useReducer` al formulario completo de tickets o a la sesión, según la complejidad observada.
- Definir acciones explícitas y mantener el reducer como función pura.

**Resultado:** uso justificado de reducer, no una sustitución general de `useState`.

## Fase 8 — Dominio completo

- Completar clientes, agentes, asignaciones y categorías.
- Incorporar comentarios cronológicos.
- Combinar búsqueda y filtros.
- Aplicar las restricciones de rol acordadas.

**Resultado:** flujo principal del Help Desk completo.

## Fase 9 — Dashboard y cierre de portfolio

- Calcular métricas a partir de los tickets existentes.
- Completar estados vacíos, carga y error.
- Revisar accesibilidad, responsive y consistencia visual.
- Actualizar README y preparar datos demostrativos.

**Resultado:** versión final presentable en portfolio.

## Regla de avance

Cada tarea se revisará antes de comenzar la siguiente. Una fase solo se cerrará cuando sus criterios de aceptación se cumplan y `lint` y `build` finalicen correctamente.
