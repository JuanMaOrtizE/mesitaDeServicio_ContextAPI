# Estado del proyecto

## Estado actual

- Proyecto inicializado con React y JavaScript mediante Vite.
- La demostración de Vite fue reemplazada por una lista estática de tickets.
- La vista está dividida en `TicketSearch`, `TicketList` y `TicketItem`.
- La búsqueda local por título y descripción funciona mediante `useState`.
- React Router, Tailwind CSS y JSON Server todavía no están instalados ni configurados.
- No existen contextos, reducers, rutas ni servicios HTTP.

## Trabajo completado

- Definición del alcance, modelo general de datos y roadmap.
- **Tarea 1:** lista estática de tickets, props, claves estables y estado vacío.
- **Tarea 2:** input controlado y búsqueda local derivada por título y descripción.
- **Tarea 3:** filtro controlado por estado combinado con la búsqueda existente.
- **Tarea 4:** actualización inmutable del estado de tickets desde cada elemento.
- Normalización de la búsqueda sin distinguir mayúsculas, minúsculas ni espacios exteriores.
- Mensajes diferenciados para colección vacía y criterios sin coincidencias.
- Validación satisfactoria mediante `npm run lint` y `npm run build`.

## Tarea actual

### Tarea 4 — Actualizar el estado de un ticket en memoria (completada)

Permitir cambiar el estado de cada ticket desde su tarjeta y conservar el cambio en el estado local de React.

#### Objetivo de aprendizaje

- Convertir una colección inicial en estado local.
- Actualizar arrays y objetos sin mutarlos.
- Elevar un evento desde un componente hijo hasta el propietario del estado.
- Comprender cómo una actualización afecta los resultados filtrados.

#### Archivos que el estudiante debe modificar o crear

- `src/App.jsx`: convertir la colección en estado y definir la función que actualiza un ticket.
- `src/components/TicketList.jsx`: recibir la función y entregarla a cada `TicketItem`.
- `src/components/TicketItem.jsx`: sustituir el texto de estado por un selector controlado.

#### Interfaz esperada

`TicketList` recibirá, además de sus props actuales:

- `onTicketStatusChange`: función que recibe el identificador del ticket y el nuevo estado.

`TicketItem` recibirá:

- `ticket`: ticket que debe representar.
- `onStatusChange`: función que comunica `ticket.id` y el nuevo estado.

El selector de cada ticket tendrá estas opciones:

- `open`: Abierto.
- `in-progress`: En progreso.
- `resolved`: Resuelto.

#### Comportamiento esperado

- La constante exterior se renombrará conceptualmente como `initialTickets`.
- `App` inicializará `tickets` mediante `useState(initialTickets)`.
- La actualización usará la forma funcional de `setTickets` y `map` para crear un array nuevo.
- Solo el ticket cuyo `id` coincida recibirá un nuevo objeto con el estado actualizado.
- Los demás tickets conservarán sus datos.
- La búsqueda y el filtro global seguirán funcionando sobre el estado actual de `tickets`.
- Si un ticket deja de cumplir el filtro global después del cambio, desaparecerá de la lista; este comportamiento es correcto.

#### Criterios de aceptación

- `tickets` es estado local de `App` y se inicializa con la colección existente.
- No se mantiene una copia adicional de la colección en estado.
- La actualización se realiza con `setTickets(previousTickets => ...)`.
- No se asigna directamente `ticket.status` ni se usan métodos mutables.
- El selector de cada ticket está controlado por `ticket.status`.
- Cada selector tiene un `label` asociado mediante un `id` único basado en `ticket.id`.
- Los valores internos siguen siendo `open`, `in-progress` y `resolved`.
- El evento sigue el flujo `TicketItem → TicketList → App` mediante props.
- Cambiar un ticket no modifica los demás.
- Búsqueda, filtro global y mensajes vacíos siguen funcionando.
- No se instalan dependencias ni se añaden Router, Tailwind, JSON Server, Context API o `useReducer`.
- `npm run lint` y `npm run build` finalizan correctamente.

#### Errores comunes

- Modificar `ticket.status` directamente.
- Usar `splice`, asignaciones directas o reutilizar el mismo array.
- Actualizar tickets por la posición del array en vez de por `id`.
- Colocar el estado de cada ticket dentro de `TicketItem`.
- Hacer que `TicketList` sea propietario de la colección.
- Usar el filtro global `all` como estado válido de un ticket.
- Perder la búsqueda o el filtro al actualizar la colección.

## Próximo paso

Definir el formulario controlado para crear tickets en memoria. No comenzar su implementación hasta recibir objetivo, alcance y criterios de aceptación.

## Bloqueos

Ninguno.
