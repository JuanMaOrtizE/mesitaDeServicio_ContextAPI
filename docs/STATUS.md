# Estado del proyecto

## Estado actual

- Las fases 0, 1 y 2 están completadas.
- La Fase 3 utiliza Data Router con layout compartido.
- Existen Dashboard, Tickets, detalle dinámico y página no encontrada.
- El CRUD de tickets funciona en memoria dentro de `/tickets`.
- Tailwind CSS y JSON Server todavía no están instalados.

## Trabajo completado

- Alcance, modelo general y roadmap.
- Componentes, búsqueda, filtros y CRUD local.
- **Tarea 8:** instalación de React Router.
- **Tarea 9:** Data Router, layout y primeras páginas.
- **Tarea 10:** ruta dinámica de detalle de ticket.
- **Tarea 11:** rutas y páginas placeholder de Clientes y Agentes.
- Las tareas cerradas pasan `npm run lint` y `npm run build`.

## Tarea actual

### Tarea 11 — Rutas placeholder de Clientes y Agentes (completada)

Añadir las páginas `/customers` y `/agents` al mapa de navegación, sin implementar todavía administración de datos.

#### Por qué se hace ahora

Estas áreas forman parte del alcance aprobado y deben tener una ubicación clara antes de comenzar el sistema visual. Construir solo placeholders permite cerrar la estructura de navegación sin mezclar Router con nuevos formularios o relaciones del dominio.

#### Objetivos de aprendizaje

- Ampliar una configuración central de rutas sin alterar las existentes.
- Mantener nombres coherentes entre URL, página e import.
- Diferenciar una página placeholder de una funcionalidad terminada.
- Ampliar una navegación semántica con `NavLink`.

#### Archivos que el estudiante debe modificar o crear

- `src/pages/CustomersPage.jsx`: placeholder de clientes.
- `src/pages/AgentsPage.jsx`: placeholder de agentes.
- `src/router.jsx`: importar y registrar ambas páginas.
- `src/App.jsx`: añadir ambos destinos a la navegación.

No modificar páginas o componentes de tickets.

#### Páginas placeholder

`CustomersPage` debe incluir:

- Encabezado “Clientes”.
- Párrafo indicando que la administración de clientes se incorporará posteriormente.

`AgentsPage` debe incluir:

- Encabezado “Agentes”.
- Párrafo indicando que la administración y asignación de agentes se incorporará posteriormente.

No añadir arrays, estado, formularios, botones CRUD ni datos simulados en estas páginas.

#### Configuración de rutas

Añadir como hijas del layout y antes de la ruta `*`:

- `customers`: renderiza `CustomersPage`.
- `agents`: renderiza `AgentsPage`.

Los paths serán relativos porque ya pertenecen a la ruta raíz. No crear otro router ni otro layout.

#### Navegación

Dentro del `<nav>` existente, añadir dos elementos de lista con:

- `NavLink` hacia `/customers` y texto “Clientes”.
- `NavLink` hacia `/agents` y texto “Agentes”.

Usar destinos absolutos como en Dashboard y Tickets. No utilizar `<a href>`.

#### Alcance de la Fase 3

Al aprobar esta tarea, la Fase 3 se considerará completada. La ruta `/login` se pospone hasta la fase de autenticación simulada porque todavía no existe sesión que representar.

#### Criterios de aceptación

- Existen `CustomersPage` y `AgentsPage` con nombres singulares/plurales coherentes.
- `/customers` muestra el placeholder de Clientes dentro del layout.
- `/agents` muestra el placeholder de Agentes dentro del layout.
- El layout incluye enlaces visibles a Dashboard, Tickets, Clientes y Agentes.
- Las nuevas rutas se declaran antes de `*`.
- Las rutas existentes y el CRUD de tickets continúan funcionando.
- Una ruta desconocida sigue mostrando `NotFoundPage`.
- No se añaden estado, datos simulados, formularios, login, Tailwind, Context o JSON Server.
- `npm run lint` y `npm run build` finalizan correctamente.

#### Pruebas manuales

1. Navegar a Clientes y Agentes desde el layout.
2. Confirmar que la URL cambia a `/customers` y `/agents` sin recarga completa.
3. Usar atrás y adelante.
4. Regresar a Tickets y verificar el CRUD.
5. Abrir `/customers/inexistente` y verificar la página no encontrada.

#### Errores comunes

- Crear rutas absolutas fuera del árbol raíz en vez de hijas relativas.
- Colocar las rutas nuevas después de `*`.
- Escribir nombres inconsistentes como `CustomerPage` para una lista de clientes.
- Implementar CRUD de clientes o agentes antes de definir su modelo de interfaz.
- Duplicar el layout o el router.

## Próximo paso

Preparar la Fase 4: justificar Tailwind CSS, definir el sistema visual inicial y solicitar su instalación antes de configurar estilos.

## Bloqueos

Ninguno.
