# Estado del proyecto

## Estado actual

- Proyecto React con JavaScript inicializado mediante Vite.
- La colección de tickets se mantiene en estado local de `App`.
- Existen búsqueda, filtro global, cambio de estado y creación local de tickets.
- La interfaz está separada en componentes de búsqueda, filtro, lista e ítem.
- React Router, Tailwind CSS y JSON Server todavía no están instalados ni configurados.
- No existen contextos, reducers, rutas ni servicios HTTP.

## Trabajo completado

- Definición del alcance, modelo general de datos y roadmap.
- **Tarea 1:** lista estática, props, claves estables y estado vacío.
- **Tarea 2:** búsqueda controlada por título y descripción.
- **Tarea 3:** filtro por estado combinado con la búsqueda.
- **Tarea 4:** actualización inmutable del estado de un ticket.
- **Tarea 5:** formulario controlado para crear tickets en memoria.
- Validación satisfactoria de las tareas cerradas mediante `npm run lint` y `npm run build`.

## Tarea actual

### Tarea 5 — Crear tickets en memoria con un formulario controlado (completada)

Construir un formulario que capture los datos editables de un ticket y lo añada a la colección local sin mutarla.

#### Objetivos de aprendizaje

- Manejar varios campos controlados dentro de un objeto de estado.
- Procesar el evento `submit` y evitar la recarga del navegador.
- Validar y normalizar datos antes de crear una entidad.
- Diferenciar el estado local del formulario del estado compartido de la colección.

#### Archivos que el estudiante debe modificar o crear

- `src/App.jsx`: definir catálogos iniciales, construir el ticket completo y añadirlo a `tickets`.
- `src/components/TicketForm.jsx`: mantener los campos, validar, enviar el borrador y reiniciar el formulario.

Los componentes existentes de búsqueda, filtro y lista no necesitan cambios.

#### Catálogos temporales

Crear fuera de `App` dos colecciones pequeñas:

- `customers`: al menos tres objetos con `id` y `name`.
- `categories`: al menos tres objetos con `id` y `name`.

Estos catálogos no estarán en estado porque esta tarea no los modifica. `App` los entregará al formulario mediante props. Más adelante serán recursos de JSON Server.

#### Interfaz de `TicketForm`

El componente recibirá:

- `customers`.
- `categories`.
- `onCreateTicket`: callback que recibe un borrador válido.

El borrador enviado tendrá exclusivamente:

- `title`: texto sin espacios exteriores.
- `description`: texto sin espacios exteriores.
- `priority`: `low`, `medium` o `high`.
- `customerId`: identificador numérico.
- `categoryId`: identificador numérico.

#### Campos del formulario

- Título: `input` de texto.
- Descripción: `textarea`.
- Prioridad: `select`, inicialmente `medium`.
- Cliente: `select`, inicialmente el primer cliente.
- Categoría: `select`, inicialmente la primera categoría.
- Botón de envío: “Crear ticket”.

Todos los controles tendrán un `label` asociado mediante `htmlFor` e `id`.

#### Estado y validación del formulario

- Mantener un único objeto de estado para los cinco campos editables.
- Actualizarlo de forma inmutable usando el nombre del control o funciones específicas.
- Título y descripción son obligatorios y no aceptan únicamente espacios.
- Si falla la validación, no llamar a `onCreateTicket` y mostrar un mensaje visible.
- El mensaje de error puede mantenerse en un segundo estado local del formulario.
- Tras una creación correcta, limpiar título y descripción, restaurar prioridad a `medium` y volver a seleccionar los primeros cliente y categoría.
- Los valores provenientes de `select` llegan como cadenas; convertir `customerId` y `categoryId` a número antes de enviarlos.

#### Creación del ticket en `App`

`handleCreateTicket(draft)` construirá un objeto con:

- Los cinco campos del borrador.
- `id`: `Date.now()` como identificador temporal.
- `status`: `open`.
- `agentId`: `null`.
- `createdAt` y `updatedAt`: el mismo valor obtenido de una única llamada a `new Date().toISOString()`.

Añadir el ticket al inicio de la colección mediante la forma funcional de `setTickets`. Este identificador es solo local; JSON Server será responsable del identificador persistente en una fase posterior.

#### Comportamiento con filtros

- Crear un ticket no debe reiniciar la búsqueda ni el filtro global.
- El ticket nuevo solo aparecerá si cumple los criterios activos.
- Si el filtro activo es `resolved`, el nuevo ticket no aparecerá porque se crea como `open`; este comportamiento es correcto.

#### Criterios de aceptación

- El formulario usa `onSubmit` y `event.preventDefault()`.
- Todos los controles son accesibles y controlados mediante `value` y `onChange`.
- `TicketForm` mantiene su propio estado; `App` mantiene la colección.
- El formulario envía únicamente el borrador acordado.
- `App` asigna los campos técnicos y añade un objeto nuevo sin mutar la colección.
- Título y descripción se validan después de aplicar `trim()`.
- Los identificadores de cliente y categoría llegan a `App` como números.
- Una creación correcta reinicia el formulario.
- Una creación inválida conserva los datos y muestra un mensaje.
- El nuevo ticket puede buscarse, filtrarse y cambiar de estado usando las funcionalidades existentes.
- No se instalan dependencias ni se añaden Router, Tailwind, JSON Server, Context API o `useReducer`.
- `npm run lint` y `npm run build` finalizan correctamente.

#### Errores comunes

- Mantener una segunda colección de tickets dentro del formulario.
- Mutar el objeto del formulario o usar `tickets.push()`.
- Generar `id` o fechas dentro de `TicketForm`.
- Enviar identificadores como cadenas.
- Crear un ticket con el estado `all`.
- Reiniciar el formulario antes de validar o antes de entregar el borrador.
- Reiniciar búsqueda y filtros al crear un ticket.
- Introducir `useReducer` antes de que el formulario requiera transiciones más complejas.

## Próximo paso

Definir la edición de tickets en memoria. No comenzar su implementación hasta recibir objetivo, alcance y criterios de aceptación.

## Bloqueos

Ninguno.
