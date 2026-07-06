# Estado del proyecto

## Estado actual

- Las fases 0, 1, 2 y 3 están completadas.
- Tailwind CSS `4.3.2` está instalado, configurado y verificado.
- La Fase 4 de sistema visual está en curso.
- La aplicación aún no tiene layout ni componentes estilizados de forma consistente.

## Trabajo completado

- Alcance, modelo, CRUD local y navegación.
- **Tarea 12:** instalación de Tailwind.
- **Tarea 13:** configuración del plugin y prueba de utilidades.
- **Tarea 14:** layout base y navegación responsive.
- Las tareas cerradas pasan `npm run lint` y `npm run build`.

## Tarea actual

### Tarea 14 — Layout base y navegación responsive (completada)

Aplicar un sistema visual básico al layout compartido usando únicamente clases de Tailwind en `App.jsx`.

#### Objetivos de aprendizaje

- Componer utilidades de layout, espaciado, color y tipografía.
- Aplicar diseño mobile-first mediante prefijos responsive.
- Utilizar `isActive` de `NavLink` para representar la ruta actual.
- Mantener navegación accesible sin introducir estado innecesario.

#### Archivo que el estudiante debe modificar

- `src/App.jsx`.

No modificar páginas, formularios, tickets, `index.css` ni configuración de Tailwind en esta tarea.

#### Estructura visual acordada

El layout tendrá:

- Contenedor raíz con altura mínima de pantalla, fondo gris muy claro y texto oscuro.
- Encabezado blanco con borde inferior.
- Contenedor interior centrado con ancho máximo.
- Nombre de la aplicación y navegación apilados en móvil.
- Nombre y navegación en una sola fila desde `md`.
- Navegación que puede envolver enlaces en varias líneas, sin menú hamburguesa.
- Área principal centrada con padding responsive.

#### Organización semántica

Reorganizar el JSX conceptualmente así:

```text
div raíz
├── header
│   └── contenedor interior
│       ├── h1
│       └── nav
│           └── ul / li / NavLink
└── main
    └── Outlet
```

Mantener `header`, `nav`, `ul`, `li` y `main`. Añadir `aria-label="Navegación principal"` al `nav`.

#### Clases del contenedor y encabezado

Contenedor raíz:

```text
min-h-screen bg-slate-50 text-slate-900
```

Encabezado:

```text
border-b border-slate-200 bg-white
```

Contenedor interior del encabezado:

```text
mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4
sm:px-6
md:flex-row md:items-center md:justify-between
lg:px-8
```

Título:

```text
text-xl font-bold tracking-tight text-slate-900
```

#### Navegación

Lista de navegación:

```text
flex flex-wrap gap-2
```

Cada `NavLink` usará una función en `className` que recibe `isActive`.

Clases comunes:

```text
rounded-md px-3 py-2 text-sm font-medium transition-colors
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
```

Ruta activa:

```text
bg-blue-600 text-white
```

Ruta inactiva:

```text
text-slate-600 hover:bg-slate-100 hover:text-slate-900
```

No crear un estado `activeLink`; React Router ya proporciona `isActive`.

#### Área principal

Aplicar al `main`:

```text
mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8
```

`Outlet` permanece sin envoltorios adicionales.

#### Comportamiento responsive

- En móvil, título y navegación aparecen uno debajo del otro.
- Los enlaces pueden pasar a una segunda línea sin desbordamiento horizontal.
- Desde `md`, encabezado y navegación se alinean horizontalmente.
- El contenido mantiene márgenes laterales pequeños en móvil y mayores en pantallas amplias.

#### Criterios de aceptación

- Solo `App.jsx` recibe cambios de implementación.
- El layout ocupa al menos toda la altura visible.
- Encabezado y contenido comparten el mismo ancho máximo.
- El enlace de la ruta actual se distingue visualmente.
- Todos los enlaces conservan foco visible.
- La navegación funciona sin recargas ni estado adicional.
- A 320 px no existe desbordamiento horizontal causado por el layout.
- Dashboard, Tickets, Clientes, Agentes, detalle y Not Found siguen dentro del layout.
- No se crea menú hamburguesa, CSS personalizado ni componentes visuales nuevos.
- `npm run lint` y `npm run build` finalizan correctamente.

#### Pruebas manuales

1. Navegar por las cuatro opciones y comprobar el enlace activo.
2. Probar navegación mediante teclado y observar el foco.
3. Revisar anchos aproximados de 320 px, 768 px y escritorio.
4. Confirmar que los enlaces se envuelven y no se cortan.
5. Abrir detalle y Not Found para confirmar que conservan el layout.

#### Errores comunes

- Crear estado local para controlar el enlace activo.
- Repetir todas las clases cuatro veces sin separar claramente clases comunes y condicionales.
- Ocultar navegación en móvil sin ofrecer alternativa.
- Eliminar elementos semánticos para usar solo `div`.
- Aplicar estilos de páginas o formularios durante esta tarea.

## Próximo paso

Definir el estilo responsive de búsqueda, filtros y formulario antes de diseñar la lista de tickets.

## Bloqueos

Ninguno.
