# Estado del proyecto

## Estado actual

- Las fases 0, 1 y 2 están completadas.
- React Router DOM `7.18.1` está instalado.
- Se utilizará el modo Data Router introducido en React Router 6.4.
- El CRUD de tickets funciona con estado local.
- Tailwind CSS y JSON Server todavía no están instalados.

## Trabajo completado

- Alcance, modelo general y roadmap.
- Componentes, búsqueda, filtros y CRUD local.
- **Tarea 8:** instalación verificada de React Router.
- **Tarea 9:** estructura base con Data Router, layout y páginas iniciales.
- Las tareas cerradas pasan `npm run lint` y `npm run build`.

## Tarea actual

### Tarea 9 — Estructura base con Data Router (completada)

Configurar `createBrowserRouter` y `RouterProvider`, crear un layout compartido y separar la funcionalidad actual en una página de tickets.

#### Decisión técnica

No se utilizarán `BrowserRouter`, `Routes` ni `Route`. El árbol de rutas se declarará como objetos mediante `createBrowserRouter`.

Tampoco se añadirán todavía `loader`, `action`, `useLoaderData` o formularios de React Router. Esas herramientas se incorporarán cuando JSON Server aporte operaciones remotas reales.

#### Objetivos de aprendizaje

- Distinguir configuración del router, proveedor, layout y páginas.
- Comprender rutas hijas y contenido compartido mediante `Outlet`.
- Navegar con `NavLink` y `Link` sin recargar el documento.
- Mantener una única instancia del router fuera del árbol de componentes.

#### Archivos que el estudiante debe modificar o crear

- `src/main.jsx`: renderizar únicamente `RouterProvider` dentro de `StrictMode`.
- `src/router.jsx`: crear y exportar la instancia de `createBrowserRouter`.
- `src/App.jsx`: convertirse en el layout compartido.
- `src/pages/TicketsPage.jsx`: recibir todo el código funcional actual de tickets.
- `src/pages/DashboardPage.jsx`: placeholder del dashboard.
- `src/pages/NotFoundPage.jsx`: página para URLs desconocidas.

#### Paso 1 — Página de tickets

Mover desde `App.jsx` hacia `TicketsPage.jsx`:

- Datos iniciales y catálogos temporales.
- Estados de tickets, búsqueda, filtro y edición.
- Manejadores de creación, edición, eliminación y estado.
- Valores derivados y JSX de la funcionalidad actual.

Renombrar el componente a `TicketsPage`, ajustar imports hacia `../components/` y no alterar el comportamiento del CRUD durante el traslado.

#### Paso 2 — Layout en `App`

Después de mover el dominio, `App.jsx` debe contener exclusivamente:

- Encabezado con “Mesa de servicio”.
- Navegación semántica con `NavLink` a `/dashboard` y `/tickets`.
- Un `<main>` con `Outlet`.

No añadir estilos complejos; Tailwind corresponde a la siguiente fase.

#### Paso 3 — Configuración en `router.jsx`

Crear una única instancia con `createBrowserRouter` fuera de cualquier componente.

La configuración tendrá una ruta raíz:

- `path: "/"`.
- `element`: `App` como layout.
- `children`: rutas hijas relativas.

Rutas hijas iniciales:

- Índice: `Navigate` hacia `tickets` con `replace`.
- `dashboard`: `DashboardPage`.
- `tickets`: `TicketsPage`.
- `*`: `NotFoundPage`.

No añadir todavía login, clientes, agentes o detalle de ticket.

#### Paso 4 — Proveedor en `main.jsx`

- Importar `RouterProvider` y la instancia `router`.
- Mantener `StrictMode` y `createRoot`.
- Renderizar `<RouterProvider router={router} />`.
- Eliminar el import y render directo de `App`.
- No importar ni renderizar `BrowserRouter`.

#### Paso 5 — Páginas auxiliares

- `DashboardPage`: encabezado “Dashboard” y texto indicando que las métricas llegarán después.
- `NotFoundPage`: encabezado “Página no encontrada” y `Link` hacia `/tickets`.
- No usar `<a href>` para navegación interna.

#### Limitación temporal

Al salir de `/tickets`, `TicketsPage` se desmontará y su estado en memoria se reiniciará al regresar. Se acepta temporalmente porque JSON Server será responsable de la persistencia. No añadir Context, `localStorage` ni estado global para ocultar esta limitación.

#### Criterios de aceptación

- Existe una sola instancia de `createBrowserRouter` en `router.jsx`.
- `main.jsx` renderiza un único `RouterProvider`.
- No existen `BrowserRouter`, `Routes` o `Route` en el proyecto.
- `App.jsx` funciona como layout y no contiene lógica de tickets.
- El CRUD conserva su comportamiento dentro de `/tickets`.
- `/` redirige a `/tickets` usando `replace`.
- `/dashboard`, `/tickets` y una URL desconocida muestran la página correcta.
- El layout permanece visible entre rutas hijas.
- La navegación usa `NavLink` o `Link`.
- No se añaden loaders, actions, rutas futuras, Context API, Tailwind o JSON Server.
- `npm run lint` y `npm run build` finalizan correctamente.

#### Pruebas manuales

1. Abrir `/` y verificar la redirección a `/tickets`.
2. Navegar entre Dashboard y Tickets sin recarga completa.
3. Confirmar que el CRUD funciona dentro de Tickets.
4. Abrir una ruta inexistente y regresar con el enlace.
5. Probar atrás y adelante del navegador.
6. Recargar directamente `/dashboard` y `/tickets` durante desarrollo.

#### Errores comunes

- Crear el router dentro de un componente y recrearlo en cada render.
- Combinar `RouterProvider` con `BrowserRouter`.
- Renderizar `App` directamente además de usarlo como `element` raíz.
- Declarar rutas hijas como `tickets/tickets`.
- Olvidar `Outlet` y obtener páginas vacías.
- Dejar lógica duplicada en `App` y `TicketsPage`.
- Introducir loaders o actions sin una fuente de datos remota.

## Próximo paso

Definir la ampliación progresiva del mapa de páginas de la Fase 3. No añadir rutas nuevas hasta recibir sus criterios de aceptación.

## Bloqueos

Ninguno.
