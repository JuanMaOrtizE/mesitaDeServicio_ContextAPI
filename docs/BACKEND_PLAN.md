# Plan del backend Express

## Objetivo

Agregar un backend real con Express.js para manejar autenticación segura y preparar el proyecto para una evolución full-stack.

El backend se desarrollará localmente primero. El deploy queda para una fase futura, cuando el backend y la migración de datos estén suficientemente estables.

## Alcance inicial del backend

La primera etapa del backend manejará únicamente autenticación:

- registro de usuarios;
- login con contraseña real;
- logout;
- sesión actual;
- JWT enviado en cookie `httpOnly`;
- recuperación de contraseña con token de desarrollo.

El dominio Help Desk seguirá temporalmente en JSON Server:

- tickets;
- clientes;
- agentes;
- categorías;
- comentarios.

## Arquitectura local prevista

```txt
Frontend React/Vite
  http://localhost:5173
        ↓
Backend Express
  http://localhost:4000
        ↓
PostgreSQL local
```

JSON Server seguirá disponible temporalmente:

```txt
JSON Server
  http://localhost:3000
        ↓
db.json
```

## Decisiones técnicas

- El backend vivirá en `backend/`.
- El backend será una app Node separada del frontend Vite.
- Se usará Express.js.
- Se usará PostgreSQL local durante desarrollo.
- Se usará Prisma como capa de acceso a datos y migraciones.
- Se usará JavaScript, no TypeScript.
- Las contraseñas se guardarán hasheadas con `bcrypt`.
- El JWT se enviará en cookie `httpOnly`, no en `localStorage`.
- Se usará recuperación de contraseña con token de desarrollo, sin email real por ahora.
- Los secretos vivirán en variables de entorno del backend.

## Dependencias previstas

Dependencias principales:

- `express`
- `cors`
- `cookie-parser`
- `helmet`
- `express-rate-limit`
- `jsonwebtoken`
- `bcrypt`
- `dotenv`
- `@prisma/client`
- `zod`

Dependencias de desarrollo:

- `prisma`
- `nodemon`

No deben instalarse hasta iniciar la tarea técnica correspondiente.

## Variables de entorno previstas

El backend usará un archivo `.env` local dentro de `backend/`.

Variables previstas:

- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `CLIENT_ORIGIN`
- `NODE_ENV`

Los valores reales no deben documentarse ni subirse al repositorio.

## Relación con el frontend actual

El frontend no se modificará durante la documentación inicial.

Más adelante, el frontend tendrá:

- servicios de autenticación;
- `AuthContext`;
- páginas de login y registro;
- rutas protegidas;
- consumo de sesión actual mediante `/api/auth/me`.

## Relación con JSON Server

JSON Server no se eliminará al iniciar el backend.

Durante la transición:

- Express manejará autenticación.
- JSON Server manejará datos del Help Desk.

Después, en una fase posterior, se podrá migrar gradualmente el dominio Help Desk a Express + PostgreSQL.

## Deploy

El deploy no se realizará en esta fase.

El diseño debe permitir un deploy futuro con una arquitectura similar a:

```txt
Frontend: Vercel
Backend: Render, Railway, Fly.io o similar
Base de datos: Neon, Supabase, Railway o PostgreSQL gestionado
```

Para facilitar ese deploy futuro, el código deberá evitar URLs fijas y usar variables de entorno.

## Estado actual del backend

La Fase 6 de backend auth está completada localmente.

Endpoints disponibles:

- `GET /api/health`;
- `POST /api/auth/register`;
- `POST /api/auth/login`;
- `GET /api/auth/me`;
- `POST /api/auth/logout`;
- `POST /api/auth/forgot-password`;
- `POST /api/auth/reset-password`.

El siguiente paso del proyecto es integrar el frontend con estos endpoints mediante servicios de autenticación y posteriormente `AuthContext`.
