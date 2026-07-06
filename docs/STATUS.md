# Estado del proyecto

## Estado actual

- Las fases 0, 1, 2 y 3 están completadas.
- La aplicación tiene CRUD local y navegación mediante Data Router.
- Tailwind CSS `4.3.2` está instalado pero todavía no está configurado.
- JSON Server todavía no está instalado.
- La interfaz conserva estilos mínimos y no tiene un sistema visual definido.

## Trabajo completado

- Alcance, modelo general y roadmap.
- Componentes, búsqueda, filtros y CRUD local.
- Data Router, layout, detalle dinámico y páginas principales.
- Las tareas cerradas pasan `npm run lint` y `npm run build`.

## Fase actual

### Fase 4 — Sistema visual con Tailwind CSS

#### Por qué se incorpora ahora

La estructura, el comportamiento y la navegación ya funcionan. Incorporar Tailwind ahora permite trabajar presentación y responsive sin mezclar problemas visuales con lógica o rutas todavía inestables.

Tailwind aportará:

- Utilidades consistentes de espaciado, tipografía, color y responsive.
- Diseño directamente asociado a cada componente.
- Generación de CSS basada en las clases usadas por el proyecto.
- Un sistema visual suficiente para portfolio sin crear una biblioteca de componentes compleja.

#### Alternativa sin dependencia

Podríamos continuar con CSS tradicional en `App.css` e `index.css`. Es una alternativa válida y no requiere dependencias, pero el alcance aprobado exige practicar Tailwind. Mantendremos CSS global únicamente para reglas base que no tenga sentido repetir.

#### Integración elegida

Se utilizará la integración oficial actual para Vite:

- Paquete `tailwindcss`.
- Plugin `@tailwindcss/vite`.
- Plugin registrado posteriormente en `vite.config.js`.
- Import global posterior mediante `@import "tailwindcss";`.

No crear `tailwind.config.js`, `postcss.config.js` ni ejecutar `npx tailwindcss init`, porque ese procedimiento corresponde a configuraciones anteriores y no es necesario para la integración elegida.

## Tarea actual

### Tarea 12 — Instalar Tailwind para Vite (completada)

El estudiante debe ejecutar desde la raíz:

```text
npm install tailwindcss @tailwindcss/vite
```

Esta tarea es exclusivamente de instalación.

#### Criterios de aceptación

- `tailwindcss` aparece en `package.json`.
- `@tailwindcss/vite` aparece en `package.json`.
- `package-lock.json` registra ambos paquetes.
- No se modifica todavía `vite.config.js`, CSS ni componentes.
- No se crean archivos de configuración adicionales.
- `npm run lint` y `npm run build` continúan funcionando.

## Alcance visual posterior

Después de verificar la instalación se trabajará progresivamente:

1. Configuración del plugin y estilos base.
2. Layout y navegación responsive.
3. Controles de búsqueda, filtros y formularios.
4. Lista y tarjetas de tickets.
5. Páginas placeholder, estados vacíos y revisión responsive.

No se intentará diseñar toda la aplicación en una sola tarea.

## Próximo paso

Definir la configuración mínima del plugin de Vite y una prueba controlada de utilidades antes de diseñar el layout.

## Bloqueos

Ninguno.
