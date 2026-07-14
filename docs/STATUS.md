# Estado del proyecto

## Estado actual

- Las fases 0, 1, 2, 3, 4, 5 y 6 están completadas.
- Tailwind CSS `4.3.2` está instalado, configurado y usado en el layout, formularios, lista de tickets y páginas secundarias.
- React Router está configurado con Data Router.
- La aplicación mantiene datos locales en memoria mediante `useState`.
- JSON Server `1.0.0-beta.15` está instalado como dependencia de desarrollo.
- `db.json` está creado con las colecciones iniciales de la API simulada.
- El script `npm run server` está configurado para ejecutar `json-server db.json`.
- El diseño inicial de datos para JSON Server está documentado en `docs/API_DATA_DESIGN.md`.
- La pantalla de tickets carga la lista inicial desde `http://localhost:3000/tickets` mediante `fetch`.
- La lectura de tickets está extraída a `src/services/ticketsApi.js` mediante `getTickets`.
- Clientes y categorías se cargan desde JSON Server mediante `GET /customers` y `GET /categories`.
- Agentes se cargan desde JSON Server mediante `GET /agents`.
- Las funciones de API están separadas por recurso en `ticketsApi.js`, `customersApi.js` y `categoriesApi.js`.
- Las cards de tickets muestran el cliente y la categoría relacionados a partir de `customerId` y `categoryId`.
- Las cards de tickets muestran el agente asignado a partir de `agentId`, usando `Sin asignar` cuando no existe asignación.
- La creación de tickets está conectada a JSON Server mediante `POST /tickets`.
- El cambio de estado de tickets está conectado a JSON Server mediante `PATCH /tickets/:id`.
- La edición completa de tickets está conectada a JSON Server mediante `PATCH /tickets/:id`.
- La eliminación de tickets está conectada a JSON Server mediante `DELETE /tickets/:id`.
- La asignación de agentes está conectada a JSON Server mediante `PATCH /tickets/:id`.
- La pantalla de detalle de ticket carga un ticket real desde JSON Server mediante `GET /tickets/:id`.
- La pantalla de detalle muestra cliente, categoría y agente resolviendo relaciones desde JSON Server.
- La pantalla de detalle muestra comentarios del ticket mediante lectura desde JSON Server.
- La pantalla de detalle permite crear comentarios nuevos y persistirlos en JSON Server mediante `POST /comments`.
- La pantalla de detalle tiene presentación visual organizada para datos principales, relaciones, comentarios, formulario, carga, error y enlace de regreso.
- Vite ignora cambios en `db.json` para evitar recargas cuando JSON Server persiste datos.
- Backend Express Auth está completado localmente.
- La integración frontend de autenticación inició con servicios API.
- Context API y `useReducer` aún no se han incorporado al frontend.

## Trabajo completado

- **Fase 0:** planificación, alcance, modelo de datos inicial y documentación base.
- **Fase 1:** componentes iniciales y datos estáticos.
- **Fase 2:** estado local con `useState`, búsqueda, filtros, creación, edición y eliminación local de tickets.
- **Fase 3:** navegación con React Router usando `createBrowserRouter` y `RouterProvider`.
- **Fase 4:** sistema visual con Tailwind CSS.
- **Fase 5:** persistencia con JSON Server, servicios de API, CRUD de tickets, relaciones y comentarios.
- **Fase 6:** backend Express Auth completado localmente.

## Últimas tareas cerradas

- Layout base y navegación responsive.
- Estilos de búsqueda y filtro de tickets.
- Estilos del formulario de tickets.
- Validación visual del error del formulario.
- Estilos de botones del formulario.
- Lista de tickets en formato de cards responsive.
- Cards de tickets con:
  - título y descripción protegidos contra contenido largo;
  - descripción larga con `Ver más` / `Ver menos`;
  - prioridad visible en la cabecera;
  - prioridades traducidas visualmente a español;
  - colores suaves por prioridad;
  - botones de editar y eliminar estilizados.
- Páginas secundarias con estructura visual base:
  - Dashboard;
  - Clientes;
  - Agentes;
  - Detalle de ticket;
  - Not Found.
- Visualización de relaciones básicas en tickets:
  - cliente asociado;
  - categoría asociada;
  - agente asignado;
  - fallbacks cuando una relación no existe.
- Asignación de agentes desde las cards de tickets:
  - selector de agente por ticket;
  - opción `Sin asignar`;
  - persistencia de `agentId` en JSON Server;
  - actualización local con el ticket devuelto por la API.
- Pantalla de detalle de ticket con datos reales:
  - lectura de `ticketId` desde la URL;
  - carga del ticket individual desde JSON Server;
  - estados de carga y error;
  - visualización de título, descripción, estado, prioridad y fechas.
- Relaciones visibles en el detalle de ticket:
  - cliente asociado;
  - categoría asociada;
  - agente asignado o `Sin asignar`;
  - protección contra `ticket` nulo durante la carga inicial.
- Comentarios visibles en el detalle de ticket:
  - servicio `commentsApi.js`;
  - lectura de comentarios;
  - filtrado por `ticketId`;
  - mensaje vacío cuando un ticket no tiene comentarios.
- Creación de comentarios en el detalle de ticket:
  - formulario simple controlado;
  - validación para evitar comentarios vacíos;
  - autor demo fijo;
  - persistencia en `db.json`;
  - actualización local de la lista sin recargar.
- Estilos de la pantalla de detalle:
  - bloque principal del ticket organizado;
  - metadatos agrupados;
  - comentarios en entradas visuales separadas;
  - formulario de nuevo comentario estilizado;
  - estados de carga/error y enlace de regreso consistentes.
- Backend Express mínimo:
  - carpeta `backend/`;
  - `package.json` propio;
  - dependencias base (`express`, `cors`, `helmet`, `dotenv`);
  - script de desarrollo con `nodemon`;
  - endpoint `GET /api/health`;
  - configuración ESLint separada para Node.
- Estructura inicial del backend:
  - `src/app.js` para configurar Express, middlewares y rutas;
  - `src/server.js` para arrancar el servidor;
  - `src/routes/healthRoutes.js` para el health check.
- Prisma y PostgreSQL:
  - `@prisma/client` y `prisma` instalados en `backend/`;
  - `@prisma/adapter-pg` y `pg` instalados para conectar Prisma 7 con PostgreSQL;
  - `prisma.config.ts` creado por Prisma 7;
  - `schema.prisma` configurado para PostgreSQL;
  - modelo `User` creado;
  - migración inicial `init_auth` aplicada en PostgreSQL.
- Cliente Prisma:
  - `src/lib/prisma.js` carga `DATABASE_URL`;
  - crea `PrismaPg`;
  - instancia `PrismaClient` con adapter;
  - permite consultar PostgreSQL desde rutas Express.
- Utilidades base de autenticación:
  - `bcrypt`, `jsonwebtoken`, `cookie-parser`, `express-rate-limit` y `zod` instalados en `backend/`;
  - `cookie-parser` configurado como middleware global de Express;
  - `src/utils/password.js` creado para hashear y verificar contraseñas;
  - `src/utils/jwt.js` creado para firmar y verificar JWT;
  - `src/validations/authSchemas.js` creado con validaciones para registro y login.
- Endpoint de registro:
  - `src/routes/authRoutes.js` creado;
  - `POST /api/auth/register` implementado;
  - validación de entrada con `registerSchema`;
  - verificación de email duplicado con respuesta `409`;
  - contraseña hasheada antes de guardar;
  - usuario creado con Prisma en PostgreSQL;
  - respuesta pública sin `passwordHash`;
  - errores de Zod respondidos como JSON con status `400`.
- Endpoint de login:
  - `POST /api/auth/login` implementado;
  - validación de entrada con `loginSchema`;
  - búsqueda de usuario por email;
  - comparación de contraseña con `verifyPassword`;
  - credenciales inválidas respondidas con `401`;
  - JWT creado con `signAuthToken`;
  - cookie `authToken` enviada como `httpOnly`;
  - respuesta pública sin `passwordHash`;
  - errores de Zod respondidos como JSON con status `400`.
- Sesión actual:
  - `authMiddleware` creado para proteger rutas;
  - lectura de cookie `authToken` mediante `cookie-parser`;
  - verificación del JWT con `verifyAuthToken`;
  - búsqueda del usuario autenticado en PostgreSQL;
  - usuario público agregado a `req.user`;
  - `GET /api/auth/me` implementado;
  - respuestas `401` para cookie ausente, token inválido o usuario inexistente.
- Logout:
  - `POST /api/auth/logout` implementado;
  - cookie `authToken` eliminada con `res.clearCookie`;
  - respuesta JSON de cierre de sesión exitoso;
  - `/api/auth/me` responde `401` después de cerrar sesión.
- Rate limiting de autenticación:
  - `src/middleware/authRateLimiter.js` creado;
  - `express-rate-limit` configurado para autenticación;
  - `POST /api/auth/login` protegido con `authRateLimiter`;
  - límite configurado en 5 intentos cada 15 minutos por IP;
  - exceso de intentos responde `429 Too Many Requests`.
- Preparación de recuperación de contraseña:
  - modelo `User` extendido con `passwordResetToken`;
  - modelo `User` extendido con `passwordResetExpiresAt`;
  - migración `add_password_reset_fields` creada y aplicada;
  - `forgotPasswordSchema` agregado;
  - `resetPasswordSchema` agregado.
- Solicitud de recuperación de contraseña:
  - `POST /api/auth/forgot-password` implementado;
  - validación de entrada con `forgotPasswordSchema`;
  - búsqueda de usuario por email;
  - generación de token con `node:crypto`;
  - guardado de `passwordResetToken` y `passwordResetExpiresAt`;
  - respuesta genérica para no revelar si el email existe;
  - `resetToken` devuelto solo fuera de producción para pruebas locales.
- Restablecimiento de contraseña:
  - `POST /api/auth/reset-password` implementado;
  - validación de entrada con `resetPasswordSchema`;
  - búsqueda de usuario por `passwordResetToken`;
  - validación de expiración con `passwordResetExpiresAt`;
  - nueva contraseña hasheada con `hashPassword`;
  - `passwordHash` actualizado;
  - `passwordResetToken` y `passwordResetExpiresAt` limpiados después del uso;
  - token de recuperación no reutilizable.
- Refactor de usuario público:
  - `src/utils/publicUser.js` creado;
  - función `toPublicUser` centraliza los campos públicos del usuario;
  - `register`, `login` y `authMiddleware` usan `toPublicUser`;
  - se elimina duplicación de construcción de usuario público;
  - se reduce el riesgo de exponer `passwordHash` o campos de recuperación.
- Revisión final de Fase 6:
  - endpoints de autenticación revisados;
  - middleware de autenticación revisado;
  - utilidades de seguridad revisadas;
  - documentación actualizada para pasar a integración frontend.
- Servicios frontend de autenticación:
  - `src/services/authApi.js` creado;
  - `registerUser`, `loginUser`, `logoutUser`, `getCurrentUser`, `forgotPassword` y `resetPassword` definidos;
  - las peticiones usan `credentials: "include"` para trabajar con cookie `httpOnly`;
  - errores del backend se convierten en errores de JavaScript mediante `throw new Error`.
- Validación temporal de autenticación en frontend:
  - `src/pages/AuthTestPage.jsx` creado;
  - ruta temporal `/auth-test` agregada;
  - `loginUser`, `getCurrentUser` y `logoutUser` probados desde React;
  - cookie `authToken` validada desde navegador;
  - comunicación frontend `5173` → backend `4000` confirmada con cookies.

## Validación

- `npm run lint` finaliza correctamente.
- `npm run build` finaliza correctamente.
- `npm run dev` del backend arranca correctamente después de agregar las utilidades base de autenticación.
- `GET /api/health` sigue respondiendo correctamente.
- `POST /api/auth/register` fue probado con registro válido, email duplicado y datos inválidos.
- `POST /api/auth/login` fue probado con credenciales válidas, email inexistente, contraseña incorrecta y datos inválidos.
- `GET /api/auth/me` fue probado con cookie válida y sin cookie.
- `POST /api/auth/logout` fue probado dentro del flujo login → me → logout → me.
- `POST /api/auth/login` fue probado con rate limit hasta recibir `429`.
- Backend probado después de la migración de recuperación de contraseña.
- `POST /api/auth/forgot-password` fue probado con email existente, email inexistente y email inválido.
- `POST /api/auth/reset-password` fue probado con token válido, contraseña anterior, contraseña nueva y reutilización de token.
- `register`, `login` y `/me` fueron probados después del refactor de usuario público.
- Revisión final de Fase 6 completada con `npm run lint` y `npm run build` exitosos.
- `authApi.js` revisado estructuralmente; pendiente prueba desde UI temporal o integración controlada.
- Flujo temporal de auth validado desde frontend: login → current user → logout → current user.

## Decisiones registradas

- Las prioridades se mantienen internamente como `low`, `medium` y `high`.
- La UI muestra las prioridades como `Baja`, `Media` y `Alta`.
- Los colores de prioridad son solo presentación visual; no cambian el modelo de datos.
- La descripción larga de una card se limita visualmente y puede expandirse con estado local en `TicketItem`.
- La lista de tickets usa cards en grid responsive y `items-start` para evitar que una card corta se estire por la altura de otra.
- Se acepta cerrar la tarea de páginas secundarias aunque algunos textos puedan refinarse posteriormente.
- Se decidió separar servicios de API por recurso para mantener responsabilidades claras sin introducir una capa de arquitectura más compleja.
- Se decidió normalizar identificadores y relaciones como `string`, alineado con el comportamiento observado de JSON Server `1.0.0-beta.15`.
- Los tickets siguen guardando solo IDs de relaciones; la UI resuelve los nombres visibles cruzando `tickets`, `customers`, `categories` y `agents` en memoria.
- En la UI, el selector de agente usa `""` para representar `Sin asignar`, pero antes de persistir se convierte a `null` para mantener limpio el modelo de datos.
- La pantalla de detalle comienza cargando solo el ticket individual; las relaciones y comentarios se incorporan en tareas posteriores para mantener la progresión incremental.
- La pantalla de detalle resuelve relaciones en memoria usando las listas de clientes, categorías y agentes ya expuestas por sus servicios.
- Debido al comportamiento de `json-server@1.0.0-beta.15`, los comentarios se leen desde `/comments` y se filtran en el servicio con comparación string contra string.
- La creación de comentarios usa temporalmente `authorId: "1"` y `authorName: "Admin Demo"` hasta incorporar autenticación simulada y roles.
- La mejora visual del detalle no cambió la lógica existente; solo organizó presentación y estados visuales.
- La Fase 5 queda cerrada con servicios separados por recurso y persistencia funcional en tickets, relaciones y comentarios.
- El proyecto cambia de alcance hacia una evolución full-stack local con Express, PostgreSQL, Prisma y autenticación real.
- El deploy se considerará más adelante; por ahora el trabajo seguirá en entorno local.
- Backend Express mínimo creado en `backend/` con endpoint `GET /api/health`.
- ESLint distingue entre frontend navegador y backend Node.js.
- Prisma instalado y conectado a PostgreSQL local.
- Migración inicial `init_auth` creada con modelo `User`.
- Cliente Prisma reutilizable creado en `backend/src/lib/prisma.js`.
- Ruta temporal `GET /api/users` creada para validar Express + Prisma + PostgreSQL.
- El backend Express usa puerto `4000`; Vite sigue en `5173` y JSON Server en `3000`.
- El backend ya tiene Prisma conectado a PostgreSQL, pero todavía no tiene endpoints de autenticación.
- Las rutas del backend empiezan a organizarse con `Router` de Express para evitar concentrar todo en `server.js`.
- Con Prisma 7, la URL de conexión se lee desde `prisma.config.ts` usando `process.env["DATABASE_URL"]`.
- Con Prisma 7 y el generador actual, `PrismaClient` se instancia con `@prisma/adapter-pg`.
- `GET /api/users` es una ruta temporal de aprendizaje para validar conexión; no representa todavía una API pública final.
- Las contraseñas se manejarán con `bcrypt`; nunca se guardará la contraseña real en PostgreSQL.
- El JWT contendrá datos mínimos (`userId` y `role`) y no incluirá `passwordHash` ni datos sensibles.
- El backend usará `JWT_SECRET` desde `.env`; los valores reales no deben documentarse ni subirse al repositorio.
- Las validaciones de entrada se centralizan con Zod antes de crear los endpoints reales de autenticación.
- `GET /api/users` no debe exponer `passwordHash`, incluso si sigue siendo una ruta temporal de aprendizaje.
- Los endpoints de autenticación deben responder JSON controlado en errores de validación, no HTML ni errores genéricos sin manejar.
- El login envía el JWT en cookie `httpOnly` llamada `authToken`.
- Las credenciales inválidas en login deben responder el mismo mensaje genérico para email inexistente y contraseña incorrecta.
- Las rutas protegidas deben usar `authMiddleware` para centralizar lectura de cookie, verificación de JWT y carga del usuario.
- Las respuestas `401` no deben exponer detalles internos del error ni el token recibido.
- Logout se mantiene idempotente: puede responder correctamente aunque no exista una sesión activa.
- El rate limit se aplica inicialmente solo a login para reducir intentos repetidos de autenticación sin afectar rutas no sensibles.
- La recuperación de contraseña se implementará primero como flujo de desarrollo sin email real.
- Los campos de recuperación de contraseña son opcionales porque solo se llenan durante una solicitud activa de recuperación.
- El token de recuperación se devuelve solo cuando `NODE_ENV !== "production"`; en producción debería enviarse por email y no exponerse en la respuesta HTTP.
- La respuesta de `forgot-password` debe ser genérica para evitar enumeración de usuarios.
- Después de restablecer contraseña, los campos de recuperación deben limpiarse para impedir reutilización del token.
- Las respuestas con usuario deben pasar por `toPublicUser` para mantener una única definición de campos públicos.
- La Fase 6 queda cerrada como backend auth local; el envío real de email y el deploy quedan para fases futuras.
- La siguiente integración usará cookies `httpOnly`, por lo que las peticiones del frontend al backend deberán incluir credenciales.
- Los servicios frontend de autenticación no deben usar `/users` fake de JSON Server; deben consumir `/api/auth` del backend Express.
- `AuthTestPage` es temporal y debe eliminarse cuando `AuthContext` y las páginas reales de auth estén funcionando.

## Tarea actual

Ninguna tarea activa. Validación temporal de auth frontend cerrada.

## Próximo paso

Continuar la **Fase 7 — Integración frontend con AuthContext**.

La siguiente tarea recomendada es crear `AuthContext`:

- crear un contexto para compartir `user`, `loading` y acciones de auth;
- cargar la sesión inicial con `getCurrentUser`;
- exponer `login`, `logout` y `refreshUser`;
- envolver la app con el provider;
- no proteger rutas todavía hasta validar el contexto.

## Bloqueos

Ninguno.
