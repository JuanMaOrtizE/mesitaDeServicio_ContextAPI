# Estado del proyecto

## Estado actual

- Los tickets se mantienen en estado local de `App`.
- Existen búsqueda, filtro por estado, creación y cambio de estado en memoria.
- El formulario controlado valida y normaliza los datos antes de crear tickets.
- React Router, Tailwind CSS y JSON Server aún no están instalados ni configurados.
- No existen contextos, reducers, rutas ni servicios HTTP.

## Trabajo completado

- **Tarea 1:** lista estática, props, claves y estado vacío.
- **Tarea 2:** búsqueda controlada por título y descripción.
- **Tarea 3:** filtro por estado combinado con la búsqueda.
- **Tarea 4:** actualización inmutable del estado de un ticket.
- **Tarea 5:** formulario controlado para crear tickets en memoria.
- **Tarea 6:** edición inmutable de tickets reutilizando el formulario.
- Las tareas cerradas pasan `npm run lint` y `npm run build`.

## Tarea actual

### Tarea 6 — Editar tickets en memoria (completada)

Reutilizar `TicketForm` para editar los campos permitidos de un ticket existente sin duplicar el formulario ni mutar la colección.

#### Objetivos de aprendizaje

- Representar una selección mediante un identificador y derivar el objeto correspondiente.
- Reutilizar un formulario en modos creación y edición.
- Actualizar parcialmente un objeto dentro de un array inmutable.
- Cancelar una operación sin modificar datos.

#### Archivos que el estudiante debe modificar

- `src/App.jsx`: mantener la selección, derivar el ticket y actualizar la colección.
- `src/components/TicketList.jsx`: reenviar la acción de edición.
- `src/components/TicketItem.jsx`: ofrecer el botón para comenzar a editar.
- `src/components/TicketForm.jsx`: aceptar valores iniciales y adaptar textos/acciones según el modo.

No crear un segundo formulario de edición.

#### Selección en `App`

- Añadir `editingTicketId`, inicialmente `null`.
- Derivar `editingTicket` con `find` sobre `tickets`; no guardar una copia completa del ticket en otro estado.
- `handleStartEdit(ticketId)` establece el identificador.
- `handleCancelEdit()` vuelve a `null`.

#### Flujo de la acción

- `TicketItem` recibe `onEdit` y llama a `onEdit(ticket.id)` desde un botón.
- `TicketList` recibe `onEditTicket` y lo entrega a cada elemento como `onEdit`.
- `App` entrega `handleStartEdit` a la lista.
- El botón será `type="button"` y tendrá un texto accesible que identifique el ticket.

#### Interfaz reutilizada de `TicketForm`

Refactorizar el formulario para recibir:

- `customers` y `categories`.
- `initialTicket`: ticket seleccionado o `null` en creación.
- `onSubmitTicket`: callback que recibe el mismo borrador validado de la Tarea 5.
- `onCancel`: callback disponible durante edición.

Comportamiento:

- Sin `initialTicket`, inicializar campos vacíos, prioridad `medium` y primeros cliente/categoría.
- Con `initialTicket`, inicializar título, descripción, prioridad y relaciones desde ese ticket; convertir sus identificadores a cadenas para los `select`.
- Mostrar “Crear ticket” en modo creación y “Guardar cambios” en edición.
- Mostrar un botón “Cancelar edición” únicamente en modo edición; debe ser `type="button"`.
- Mantener la validación, normalización y conversión numérica existentes.

#### Reinicio controlado del formulario

No introducir `useEffect` para copiar props al estado.

`App` asignará a `TicketForm` una `key` basada en `editingTicket?.id ?? "new"`. Así React reiniciará el estado local al cambiar de ticket o volver al modo creación.

#### Creación y actualización en `App`

- Conservar `handleCreateTicket` para creación.
- Entregar a `onSubmitTicket` la función de creación o actualización según exista `editingTicket`.
- `handleUpdateTicket(draft)` usará la forma funcional de `setTickets` y `map`.
- Solo el ticket con `editingTicketId` recibirá los campos del borrador y un nuevo `updatedAt` generado con `new Date().toISOString()`.
- Conservar sin cambios `id`, `status`, `agentId` y `createdAt`.
- Tras actualizar correctamente, establecer `editingTicketId` en `null`.
- Cancelar no debe llamar a `setTickets`.

#### Comportamiento con búsqueda y filtros

- Iniciar o cancelar edición no reinicia búsqueda ni filtro.
- Si la edición cambia título o descripción y el ticket deja de coincidir, puede desaparecer de la lista tras guardar; es correcto.
- El formulario debe regresar al modo creación después de guardar o cancelar.

#### Criterios de aceptación

- Cada ticket ofrece una acción accesible para editarlo.
- El evento sigue `TicketItem → TicketList → App` mediante props.
- `editingTicketId` es la única selección almacenada y `editingTicket` es derivado.
- El formulario se reutiliza y carga los cinco campos editables del ticket.
- La `key` del formulario cambia entre modo creación y cada ticket editado.
- Guardar aplica `trim()`, conserva identificadores numéricos y actualiza solo el ticket seleccionado.
- Los campos técnicos no editables se conservan, excepto `updatedAt`.
- Cancelar no modifica ningún ticket.
- Después de guardar o cancelar, aparece el formulario de creación vacío.
- La creación existente sigue funcionando.
- Búsqueda, filtro y cambio de estado siguen funcionando.
- No se añaden eliminación, Router, Tailwind, JSON Server, Context API o `useReducer`.
- `npm run lint` y `npm run build` finalizan correctamente.

#### Errores comunes

- Guardar el objeto completo seleccionado como una segunda fuente de verdad.
- Crear `TicketEditForm` duplicando el formulario actual.
- Mutar el ticket con `Object.assign` o asignaciones directas.
- Sobrescribir `id`, estado, agente o fecha de creación con valores del formulario.
- Usar `useEffect` solo para copiar `initialTicket` a `formData`.
- Olvidar `type="button"` en editar o cancelar.
- Hacer que cancelar envíe el formulario.

## Próximo paso

Definir la eliminación de tickets en memoria. No comenzar su implementación hasta recibir objetivo, alcance y criterios de aceptación.

## Bloqueos

Ninguno.
