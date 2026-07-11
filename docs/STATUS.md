# Estado del proyecto

## Estado actual

- Las fases 0, 1, 2, 3, 4 y 5 están completadas.
- Tailwind CSS `4.3.2` está instalado, configurado y usado en el layout, formularios, lista de tickets y páginas secundarias.
- React Router está configurado con Data Router.
- La aplicación mantiene datos locales en memoria mediante `useState`.
- JSON Server `1.0.0-beta.15` está instalado como dependencia de desarrollo.
- `db.json` está creado con las colecciones iniciales de la API simulada.
- El script `npm run server` está configurado para ejecutar `json-server db.json`.
- El diseño inicial de datos para JSON Server está documentado en `docs/API_DATA_DESIGN.md`.
- La pantalla de tickets carga la lista inicial desde `http://localhost:3000/tickets` mediante `fetch`.
- La lectura de tickets está extraída a `src/services/ticketsApi.js` mediante `getTickets`.
- Clientes y categorías se cargan desde JSON Server mediante `GET /customers` y `GET /categories`.
- Agentes se cargan desde JSON Server mediante `GET /agents`.
- Las funciones de API están separadas por recurso en `ticketsApi.js`, `customersApi.js` y `categoriesApi.js`.
- Las cards de tickets muestran el cliente y la categoría relacionados a partir de `customerId` y `categoryId`.
- Las cards de tickets muestran el agente asignado a partir de `agentId`, usando `Sin asignar` cuando no existe asignación.
- La creación de tickets está conectada a JSON Server mediante `POST /tickets`.
- El cambio de estado de tickets está conectado a JSON Server mediante `PATCH /tickets/:id`.
- La edición completa de tickets está conectada a JSON Server mediante `PATCH /tickets/:id`.
- La eliminación de tickets está conectada a JSON Server mediante `DELETE /tickets/:id`.
- La asignación de agentes está conectada a JSON Server mediante `PATCH /tickets/:id`.
- La pantalla de detalle de ticket carga un ticket real desde JSON Server mediante `GET /tickets/:id`.
- La pantalla de detalle muestra cliente, categoría y agente resolviendo relaciones desde JSON Server.
- La pantalla de detalle muestra comentarios del ticket mediante lectura desde JSON Server.
- La pantalla de detalle permite crear comentarios nuevos y persistirlos en JSON Server mediante `POST /comments`.
- La pantalla de detalle tiene presentación visual organizada para datos principales, relaciones, comentarios, formulario, carga, error y enlace de regreso.
- Vite ignora cambios en `db.json` para evitar recargas cuando JSON Server persiste datos.
- Context API y `useReducer` aún no se han incorporado.

## Trabajo completado

- **Fase 0:** planificación, alcance, modelo de datos inicial y documentación base.
- **Fase 1:** componentes iniciales y datos estáticos.
- **Fase 2:** estado local con `useState`, búsqueda, filtros, creación, edición y eliminación local de tickets.
- **Fase 3:** navegación con React Router usando `createBrowserRouter` y `RouterProvider`.
- **Fase 4:** sistema visual con Tailwind CSS.
- **Fase 5:** persistencia con JSON Server, servicios de API, CRUD de tickets, relaciones y comentarios.

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
- Visualización de relaciones básicas en tickets:
  - cliente asociado;
  - categoría asociada;
  - agente asignado;
  - fallbacks cuando una relación no existe.
- Asignación de agentes desde las cards de tickets:
  - selector de agente por ticket;
  - opción `Sin asignar`;
  - persistencia de `agentId` en JSON Server;
  - actualización local con el ticket devuelto por la API.
- Pantalla de detalle de ticket con datos reales:
  - lectura de `ticketId` desde la URL;
  - carga del ticket individual desde JSON Server;
  - estados de carga y error;
  - visualización de título, descripción, estado, prioridad y fechas.
- Relaciones visibles en el detalle de ticket:
  - cliente asociado;
  - categoría asociada;
  - agente asignado o `Sin asignar`;
  - protección contra `ticket` nulo durante la carga inicial.
- Comentarios visibles en el detalle de ticket:
  - servicio `commentsApi.js`;
  - lectura de comentarios;
  - filtrado por `ticketId`;
  - mensaje vacío cuando un ticket no tiene comentarios.
- Creación de comentarios en el detalle de ticket:
  - formulario simple controlado;
  - validación para evitar comentarios vacíos;
  - autor demo fijo;
  - persistencia en `db.json`;
  - actualización local de la lista sin recargar.
- Estilos de la pantalla de detalle:
  - bloque principal del ticket organizado;
  - metadatos agrupados;
  - comentarios en entradas visuales separadas;
  - formulario de nuevo comentario estilizado;
  - estados de carga/error y enlace de regreso consistentes.

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
- Se decidió separar servicios de API por recurso para mantener responsabilidades claras sin introducir una capa de arquitectura más compleja.
- Se decidió normalizar identificadores y relaciones como `string`, alineado con el comportamiento observado de JSON Server `1.0.0-beta.15`.
- Los tickets siguen guardando solo IDs de relaciones; la UI resuelve los nombres visibles cruzando `tickets`, `customers`, `categories` y `agents` en memoria.
- En la UI, el selector de agente usa `""` para representar `Sin asignar`, pero antes de persistir se convierte a `null` para mantener limpio el modelo de datos.
- La pantalla de detalle comienza cargando solo el ticket individual; las relaciones y comentarios se incorporan en tareas posteriores para mantener la progresión incremental.
- La pantalla de detalle resuelve relaciones en memoria usando las listas de clientes, categorías y agentes ya expuestas por sus servicios.
- Debido al comportamiento de `json-server@1.0.0-beta.15`, los comentarios se leen desde `/comments` y se filtran en el servicio con comparación string contra string.
- La creación de comentarios usa temporalmente `authorId: "1"` y `authorName: "Admin Demo"` hasta incorporar autenticación simulada y roles.
- La mejora visual del detalle no cambió la lógica existente; solo organizó presentación y estados visuales.
- La Fase 5 queda cerrada con servicios separados por recurso y persistencia funcional en tickets, relaciones y comentarios.

## Tarea actual

Ninguna tarea activa. La Fase 5 queda cerrada.

## Próximo paso

Continuar la **Fase 6 — Sesión compartida con Context API**.

La siguiente tarea recomendada es diseñar la autenticación simulada antes de implementarla:

- definir usuario activo;
- definir roles iniciales (`admin` y `agent`);
- decidir qué datos compartirá el contexto;
- decidir qué acciones expondrá el contexto;
- preparar la implementación de `AuthContext` en una tarea posterior.

## Bloqueos

Ninguno.
