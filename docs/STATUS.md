# Estado del proyecto

## Estado actual

- Los tickets se mantienen en estado local de `App`.
- Existen búsqueda, filtro, creación, edición y cambio de estado en memoria.
- `TicketForm` se reutiliza en modos creación y edición.
- React Router, Tailwind CSS y JSON Server aún no están instalados ni configurados.
- No existen contextos, reducers, rutas ni servicios HTTP.

## Trabajo completado

- **Tarea 1:** lista estática, props, claves y estado vacío.
- **Tarea 2:** búsqueda por título y descripción.
- **Tarea 3:** filtro por estado combinado con la búsqueda.
- **Tarea 4:** actualización del estado de un ticket.
- **Tarea 5:** creación de tickets mediante formulario controlado.
- **Tarea 6:** edición inmutable reutilizando el formulario.
- **Tarea 7:** eliminación confirmada e inmutable de tickets.
- Las tareas cerradas pasan `npm run lint` y `npm run build`.

## Tarea actual

### Tarea 7 — Eliminar tickets en memoria (completada)

Permitir eliminar un ticket después de una confirmación, actualizando la colección de forma inmutable y manteniendo coherente el modo de edición.

#### Objetivos de aprendizaje

- Eliminar elementos de un array mediante `filter` sin mutarlo.
- Separar la intención del usuario, la confirmación y la actualización del estado.
- Coordinar dos estados relacionados: colección de tickets y ticket en edición.
- Diferenciar una colección realmente vacía de una lista sin coincidencias.

#### Archivos que el estudiante debe modificar

- `src/App.jsx`: confirmar, eliminar, cancelar una edición afectada y calcular el mensaje vacío actual.
- `src/components/TicketList.jsx`: reenviar la acción de eliminación.
- `src/components/TicketItem.jsx`: ofrecer un botón accesible para eliminar.

`TicketForm` no necesita cambios.

#### Flujo de la acción

- `TicketItem` recibe `onDelete` y llama a `onDelete(ticket.id)`.
- `TicketList` recibe `onDeleteTicket` y lo entrega a cada elemento como `onDelete`.
- `App` entrega `handleDeleteTicket` a la lista.
- El botón será `type="button"` y su nombre accesible incluirá el título del ticket.

#### Confirmación

`handleDeleteTicket(ticketId)` debe:

1. Buscar el ticket para obtener su título.
2. Si no existe, terminar sin modificar estado.
3. Solicitar confirmación con `window.confirm`, mencionando el título.
4. Si el usuario cancela, terminar sin modificar estado.
5. Si confirma, eliminar el ticket y resolver cualquier edición activa relacionada.

`window.confirm` es una solución temporal adecuada para esta etapa. No crear un modal ni instalar una librería.

#### Eliminación inmutable

- Usar la forma funcional de `setTickets`.
- Crear una colección nueva con `filter`, conservando los tickets cuyo `id` sea diferente.
- No usar `splice`, `pop`, asignaciones directas ni mutar `initialTickets`.

#### Relación con la edición

- Si se elimina el ticket cuyo identificador coincide con `editingTicketId`, establecer la selección en `null` después de confirmar.
- Si se elimina otro ticket, conservar la edición actual.
- Cancelar la confirmación no debe salir del modo edición.

#### Mensaje vacío

El mensaje actual se calcula fuera de `App` usando `initialTickets`, por lo que quedaría incorrecto al eliminar todos los tickets.

- Mover su cálculo dentro de `App`, después de declarar `tickets`.
- Si `tickets.length === 0`, mostrar “No hay tickets registrados.”
- Si existen tickets pero búsqueda/filtro no producen resultados, mostrar “No hay tickets que coincidan con los criterios seleccionados.”

Este mensaje sigue siendo estado derivado; no debe guardarse con `useState`.

#### Comportamiento con búsqueda y filtros

- Eliminar no reinicia `searchTerm` ni `statusFilter`.
- Si el ticket eliminado era el único resultado visible, mostrar el mensaje correspondiente.
- Si aún existen tickets pero ninguno coincide con los filtros, mostrar el mensaje de criterios.
- Si se elimina el último ticket de la colección, mostrar el mensaje de colección vacía.

#### Criterios de aceptación

- Cada ticket tiene un botón Eliminar de tipo `button` y con nombre accesible específico.
- El evento sigue `TicketItem → TicketList → App` mediante props.
- La confirmación menciona el ticket seleccionado.
- Cancelar no modifica tickets ni la selección de edición.
- Confirmar elimina únicamente el ticket seleccionado usando `filter` y la forma funcional del setter.
- Eliminar el ticket editado devuelve el formulario al modo creación.
- Eliminar otro ticket conserva el formulario de edición actual.
- El mensaje vacío depende de `tickets`, no de `initialTickets` ni de otro estado.
- Crear, editar, buscar, filtrar y cambiar estados continúan funcionando.
- No se añaden modal personalizado, Router, Tailwind, JSON Server, Context API o `useReducer`.
- `npm run lint` y `npm run build` finalizan correctamente.

#### Pruebas manuales

1. Cancelar una eliminación y comprobar que nada cambia.
2. Confirmar una eliminación y comprobar que desaparece solo ese ticket.
3. Editar un ticket, intentar eliminarlo y cancelar: el formulario debe permanecer en edición.
4. Editar un ticket y confirmar su eliminación: el formulario debe regresar a creación.
5. Editar un ticket y eliminar otro: la edición debe conservarse.
6. Eliminar todos los tickets: debe aparecer “No hay tickets registrados.”
7. Aplicar un filtro sin coincidencias mientras aún existen tickets: debe aparecer el mensaje de criterios.

#### Errores comunes

- Ejecutar `filter` antes de que el usuario confirme.
- Usar `splice` o modificar el array anterior.
- Limpiar siempre `editingTicketId`, aunque se elimine otro ticket.
- Limpiar la edición antes de saber si el usuario confirmó.
- Calcular el mensaje usando la colección inicial.
- Usar el índice del array para identificar el ticket.
- Colocar la lógica de eliminación dentro de `TicketItem`.

## Próximo paso

Preparar la Fase 3 de navegación: justificar React Router y definir el primer mapa de rutas antes de instalarlo o configurarlo.

## Bloqueos

Ninguno.
