# Estado del proyecto

## Estado actual

- Las fases 0, 1 y 2 están completadas.
- La Fase 3 usa Data Router mediante `createBrowserRouter` y `RouterProvider`.
- Existen layout compartido, Dashboard, Tickets y página no encontrada.
- El CRUD de tickets continúa funcionando en memoria dentro de `/tickets`.
- Tailwind CSS y JSON Server todavía no están instalados.

## Trabajo completado

- Alcance, modelo general y roadmap.
- Componentes, búsqueda, filtros y CRUD local.
- **Tarea 8:** instalación de React Router.
- **Tarea 9:** Data Router, layout y primeras páginas.
- **Tarea 10:** ruta dinámica y página provisional de detalle de ticket.
- Las tareas cerradas pasan `npm run lint` y `npm run build`.

## Tarea actual

### Tarea 10 — Ruta dinámica de detalle de ticket (completada)

Añadir una URL `/tickets/:ticketId` y navegar hacia ella desde cada ticket para aprender parámetros dinámicos.

#### Alcance de esta etapa

La página de detalle mostrará el identificador recibido en la URL y explicará que los datos completos se incorporarán posteriormente.

No debe buscar el ticket en una copia de `initialTickets`, usar Context ni recibir datos mediante estado de navegación. La carga real se implementará con JSON Server y un `loader` en una fase posterior, permitiendo también recargar o compartir la URL directamente.

#### Objetivos de aprendizaje

- Declarar segmentos dinámicos con `:ticketId`.
- Leer parámetros mediante `useParams`.
- Construir enlaces dinámicos con `Link`.
- Comprender que los parámetros de URL llegan como cadenas.

#### Archivos que el estudiante debe modificar o crear

- `src/router.jsx`: registrar la ruta dinámica.
- `src/components/TicketItem.jsx`: añadir un enlace hacia el detalle.
- `src/pages/TicketDetailPage.jsx`: leer y mostrar el parámetro.

No modificar `TicketsPage` ni los manejadores CRUD.

#### Paso 1 — Página de detalle

Crear `TicketDetailPage` e importar `useParams` y `Link`.

La página debe:

- Obtener `ticketId` con `useParams`.
- Mostrar un encabezado “Detalle del ticket”.
- Mostrar el identificador recibido, por ejemplo “Ticket #2”.
- Explicar que el contenido completo llegará al conectar la API simulada.
- Incluir un `Link` absoluto para regresar a `/tickets`.

No convertir el parámetro a número todavía porque solo se presenta como texto.

#### Paso 2 — Ruta dinámica

Importar `TicketDetailPage` en `router.jsx` y añadir como hija del layout:

- `path`: `tickets/:ticketId`.
- `element`: `TicketDetailPage`.

Debe quedar al mismo nivel que `tickets`, `dashboard` y `*`. No crear un segundo segmento `tickets` dentro de una ruta padre que ya lo contenga.

#### Paso 3 — Enlace desde cada ticket

En `TicketItem`, importar `Link` y añadir un enlace visible “Ver detalle”.

El destino se construirá usando `ticket.id`:

```text
/tickets/[id del ticket]
```

Usar `Link`, no un botón con `navigate` ni `<a href>`, porque esta es navegación interna declarativa.

#### Comportamiento temporal del estado

Al entrar al detalle, `TicketsPage` se desmonta. Al regresar, el CRUD local se reinicia. Esta limitación sigue aceptada hasta JSON Server; no intentar resolverla en esta tarea.

#### Criterios de aceptación

- Cada ticket muestra un enlace accesible “Ver detalle”.
- El enlace del ticket 2 navega a `/tickets/2`.
- La ruta usa exactamente el parámetro `:ticketId`.
- `TicketDetailPage` obtiene el mismo nombre `ticketId` mediante `useParams`.
- La página muestra el identificador y un enlace de regreso absoluto.
- El layout permanece visible en la página de detalle.
- Abrir directamente `/tickets/2` funciona durante desarrollo.
- No se duplican datos ni se añaden loaders, Context, Tailwind o JSON Server.
- El CRUD de `/tickets` conserva su comportamiento.
- `npm run lint` y `npm run build` finalizan correctamente.

#### Pruebas manuales

1. Abrir `/tickets` y pulsar “Ver detalle” en los tres tickets.
2. Confirmar que cada URL contiene el identificador correcto.
3. Usar el enlace de regreso a Tickets.
4. Abrir directamente `/tickets/999` y confirmar que muestra “Ticket #999”.
5. Comprobar atrás y adelante del navegador.

#### Errores comunes

- Escribir `tickets/tickets/:ticketId`.
- Usar nombres distintos entre `:ticketId` y `useParams`.
- Usar `id` como posición del array.
- Copiar `initialTickets` dentro de la página de detalle.
- Pasar el ticket mediante `Link state`, lo que fallaría al recargar directamente.
- Usar `<a href>` y recargar la aplicación.

## Próximo paso

Definir las páginas placeholder y rutas de Clientes y Agentes. No comenzar su implementación hasta recibir criterios de aceptación.

## Bloqueos

Ninguno.
