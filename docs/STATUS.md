# Estado del proyecto

## Estado actual

- Proyecto inicializado con la plantilla React + JavaScript de Vite.
- React funciona dentro de `StrictMode`.
- La demostración de Vite fue reemplazada por una lista estática de tickets.
- La primera vista del Help Desk está dividida en componentes de presentación.
- React Router, Tailwind CSS y JSON Server todavía no están instalados ni configurados.
- No existen contextos, reducers, rutas ni servicios HTTP.
- Alcance, modelo de datos y roadmap aprobados.

## Trabajo completado

- Inspección inicial del repositorio.
- Definición del alcance incluido y excluido.
- Definición inicial de entidades y relaciones.
- Planificación de las fases de aprendizaje y desarrollo.
- Lista estática de tres tickets con datos acordes al modelo inicial.
- Componentes `TicketList` y `TicketItem` comunicados mediante props.
- Estado vacío de la lista y claves estables durante el renderizado.

## Tarea actual

### Tarea 1 — Lista estática de tickets (completada)

Reemplazar la demostración de Vite por una vista que muestre entre tres y cinco tickets estáticos mediante componentes reutilizables.

#### Objetivo de aprendizaje

Comprender el flujo básico `datos → props → componentes → interfaz` antes de introducir estado, navegación o peticiones HTTP.

#### Archivos que el estudiante debe modificar o crear

- `src/App.jsx`: conservar temporalmente la colección estática y componer la pantalla.
- `src/components/TicketList.jsx`: recibir y renderizar la colección; mostrar el estado vacío.
- `src/components/TicketItem.jsx`: presentar los datos de un ticket individual.
- `src/App.css` y `src/index.css`: retirar estilos de demostración y dejar solo los estilos básicos necesarios.

Los recursos de Vite que queden sin uso podrán eliminarse, pero no es obligatorio hacerlo en esta tarea.

#### Datos mínimos de cada ticket

- `id`
- `title`
- `description`
- `status`
- `priority`
- `customerId`
- `agentId`
- `categoryId`
- `createdAt`
- `updatedAt`

Para esta tarea también pueden existir colecciones estáticas mínimas de clientes, agentes y categorías si se necesitan nombres visibles. No deben duplicarse objetos completos dentro de cada ticket.

#### Criterios de aceptación

- La demostración y el contador de Vite dejan de aparecer.
- Se renderizan entre tres y cinco tickets usando `map`.
- Cada elemento utiliza `ticket.id` como `key`.
- `App` no contiene todo el marcado de cada ticket.
- `TicketList` y `TicketItem` reciben información mediante props.
- Existe un mensaje claro cuando la lista está vacía.
- No se usa `useState` porque aún no hay interacción.
- No se instalan dependencias ni se agregan Router, Tailwind o JSON Server.
- `npm run lint` y `npm run build` finalizan correctamente.

#### Errores comunes

- Usar el índice del array como `key`.
- Mutar los datos recibidos mediante props.
- Duplicar manualmente el marcado de cada ticket.
- Guardar objetos completos de cliente, agente o categoría dentro del ticket.
- Crear abstracciones genéricas antes de necesitarlas.
- Mezclar esta tarea con formularios, filtros, rutas o peticiones HTTP.

## Próximo paso

Definir la primera tarea de estado local con `useState`. No debe comenzarse hasta recibir sus instrucciones y criterios de aceptación.

## Bloqueos

Ninguno.
