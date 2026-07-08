# Estado del proyecto

## Estado actual

- Las fases 0, 1, 2, 3 y 4 están completadas.
- Tailwind CSS `4.3.2` está instalado, configurado y usado en el layout, formularios, lista de tickets y páginas secundarias.
- React Router está configurado con Data Router.
- La aplicación mantiene datos locales en memoria mediante `useState`.
- JSON Server `1.0.0-beta.15` está instalado como dependencia de desarrollo.
- `db.json` está creado con las colecciones iniciales de la API simulada.
- El script `npm run server` está configurado para ejecutar `json-server db.json`.
- El diseño inicial de datos para JSON Server está documentado en `docs/API_DATA_DESIGN.md`.
- La pantalla de tickets carga la lista inicial desde `http://localhost:3000/tickets` mediante `fetch`.
- La lectura de tickets está extraída a `src/services/ticketsApi.js` mediante `getTickets`.
- La creación de tickets está conectada a JSON Server mediante `POST /tickets`.
- La edición, eliminación y cambio de estado siguen siendo locales en memoria.
- Vite ignora cambios en `db.json` para evitar recargas cuando JSON Server persiste datos.
- Context API y `useReducer` aún no se han incorporado.

## Trabajo completado

- **Fase 0:** planificación, alcance, modelo de datos inicial y documentación base.
- **Fase 1:** componentes iniciales y datos estáticos.
- **Fase 2:** estado local con `useState`, búsqueda, filtros, creación, edición y eliminación local de tickets.
- **Fase 3:** navegación con React Router usando `createBrowserRouter` y `RouterProvider`.
- **Fase 4:** sistema visual con Tailwind CSS.

## Últimas tareas cerradas

- Layout base y navegación responsive.
- Estilos de búsqueda y filtro de tickets.
- Estilos del formulario de tickets.
- Validación visual del error del formulario.
- Estilos de botones del formulario.
- Lista de tickets en formato de cards responsive.
- Cards de tickets con:
  - título y descripción protegidos contra contenido largo;
  - descripción larga con `Ver más` / `Ver menos`;
  - prioridad visible en la cabecera;
  - prioridades traducidas visualmente a español;
  - colores suaves por prioridad;
  - botones de editar y eliminar estilizados.
- Páginas secundarias con estructura visual base:
  - Dashboard;
  - Clientes;
  - Agentes;
  - Detalle de ticket;
  - Not Found.

## Validación

- `npm run lint` finaliza correctamente.
- `npm run build` finaliza correctamente.

## Decisiones registradas

- Las prioridades se mantienen internamente como `low`, `medium` y `high`.
- La UI muestra las prioridades como `Baja`, `Media` y `Alta`.
- Los colores de prioridad son solo presentación visual; no cambian el modelo de datos.
- La descripción larga de una card se limita visualmente y puede expandirse con estado local en `TicketItem`.
- La lista de tickets usa cards en grid responsive y `items-start` para evitar que una card corta se estire por la altura de otra.
- Se acepta cerrar la tarea de páginas secundarias aunque algunos textos puedan refinarse posteriormente.

## Tarea actual

Ninguna tarea activa. La creación persistente de tickets con JSON Server queda cerrada.

## Próximo paso

Continuar la **Fase 5 — Persistencia con JSON Server**.

La siguiente tarea debe ser migrar el cambio de estado de tickets a JSON Server:

- agregar una función para actualizar parcialmente un ticket mediante `PATCH /tickets/:id`;
- usarla en `handleTicketStatusChange`;
- actualizar el estado local con la respuesta del servidor;
- mantener edición completa y eliminación todavía locales.

## Bloqueos

Ninguno.
