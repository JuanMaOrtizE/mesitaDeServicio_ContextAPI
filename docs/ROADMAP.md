# Roadmap

## Fase 0 — Planificación (completada)

- Definir alcance, modelo de datos, relaciones y orden de desarrollo.
- Mantener documentación suficiente para continuar en sesiones futuras.

**Resultado:** alcance y arquitectura inicial acordados.

## Fase 1 — Componentes y datos estáticos (completada)

- Sustituir la demostración de Vite por una lista estática de tickets.
- Separar la pantalla en componentes pequeños.
- Practicar JSX, props, composición, renderizado condicional, `map` y claves estables.

**Resultado:** primera vista funcional sin estado ni dependencias nuevas.

## Fase 2 — Estado local con `useState` (completada)

- Añadir búsqueda y filtros locales.
- Crear formularios controlados.
- Crear y editar tickets temporalmente en memoria.
- Practicar eventos, inmutabilidad y estado derivado.

**Resultado:** flujo interactivo completo antes de incorporar infraestructura.

## Fase 3 — Navegación con React Router (completada)

- Justificar e instalar React Router.
- Crear layout y rutas para login, dashboard, tickets, detalle, clientes y agentes.
- Añadir navegación y una página para rutas inexistentes.

**Resultado:** aplicación organizada en páginas navegables.

## Fase 4 — Sistema visual con Tailwind CSS (completada)

- Justificar e instalar Tailwind CSS.
- Definir estilos base, layout, tablas, formularios y estados visuales.
- Adaptar las vistas a tamaños de pantalla básicos.

**Resultado:** interfaz coherente y responsive sin cambiar la lógica existente.

## Fase 5 — Persistencia con JSON Server (completada)

- Justificar e instalar JSON Server.
- Crear las colecciones y datos iniciales según el modelo acordado.
- Crear funciones pequeñas de acceso a datos mediante `fetch`.
- Sustituir los arrays locales por operaciones HTTP.
- Manejar carga, error y ausencia de resultados.

**Resultado:** datos persistentes en una API simulada.

## Fase 6 — Backend Express Auth (completada)

- Crear documentación y estructura base del backend.
- Crear servidor Express local.
- Configurar PostgreSQL local y Prisma.
- Preparar utilidades base de autenticación con `bcrypt`, JWT y Zod.
- Implementar registro, login, logout, sesión actual y recuperación de contraseña.
- Usar JWT en cookie `httpOnly`.

**Resultado:** autenticación real disponible desde una API Express local.

## Fase 7 — Integración frontend con AuthContext (completada)

- Crear servicios frontend para autenticación.
- Compartir el usuario activo mediante Context API.
- Crear páginas de login, recuperación, restablecimiento de contraseña y registro.
- Consultar la sesión actual desde el backend.

**Resultado:** frontend conectado a la autenticación real del backend.

## Fase 8 — Roles y rutas protegidas (siguiente)

- Proteger rutas del frontend según sesión.
- Adaptar navegación según rol.
- Usar `admin` y `agent` para restricciones iniciales.
- Reemplazar autor demo de comentarios por el usuario autenticado.

**Resultado:** experiencia autenticada y diferenciada por rol.

## Fase 9 — Migración gradual del dominio a Express

- Migrar tickets, clientes, agentes, categorías y comentarios desde JSON Server a Express + PostgreSQL.
- Reemplazar servicios frontend para apuntar al backend Express.
- Retirar JSON Server cuando el dominio esté cubierto.

**Resultado:** aplicación full-stack sin dependencia de JSON Server.

## Fase 10 — Flujos complejos con `useReducer`

- Identificar un flujo con varias transiciones relacionadas.
- Aplicar `useReducer` al formulario completo de tickets, a la sesión o a otro flujo que lo justifique.
- Definir acciones explícitas y mantener el reducer como función pura.

**Resultado:** uso justificado de reducer, no una sustitución general de `useState`.

## Fase 11 — Dominio completo

- Completar clientes, agentes, asignaciones y categorías.
- Incorporar comentarios cronológicos.
- Combinar búsqueda y filtros.
- Aplicar las restricciones de rol acordadas.

**Resultado:** flujo principal del Help Desk completo.

## Fase 12 — Deploy futuro y cierre de portfolio

- Calcular métricas a partir de los tickets existentes.
- Completar estados vacíos, carga y error.
- Revisar accesibilidad, responsive y consistencia visual.
- Actualizar README y preparar datos demostrativos.
- Planificar deploy de frontend, backend y PostgreSQL gestionado.

**Resultado:** versión final presentable en portfolio.

## Regla de avance

Cada tarea se revisará antes de comenzar la siguiente. Una fase solo se cerrará cuando sus criterios de aceptación se cumplan y `lint` y `build` finalicen correctamente.
