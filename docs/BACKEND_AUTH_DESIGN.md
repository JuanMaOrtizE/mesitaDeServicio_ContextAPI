# Diseño de autenticación del backend

## Objetivo

Definir el comportamiento esperado de la autenticación real que se construirá con Express, PostgreSQL, Prisma y JWT.

Esta autenticación reemplazará la idea previa de autenticación simulada, pero se integrará gradualmente para no romper el frontend actual.

## Modelo de usuario previsto

El usuario persistido en PostgreSQL tendrá como mínimo:

- `id`
- `name`
- `email`
- `passwordHash`
- `role`: `admin` o `agent`
- `agentId`: opcional
- `createdAt`
- `updatedAt`

Reglas:

- `email` debe ser único.
- `passwordHash` nunca debe devolverse al frontend.
- `role` define permisos de interfaz y, más adelante, permisos del backend.
- `agentId` permite relacionar un usuario con un agente operativo del Help Desk.

## Datos públicos del usuario

Las respuestas del backend podrán devolver:

```js
{
  id,
  name,
  email,
  role,
  agentId
}
```

Nunca deben devolver:

- `passwordHash`;
- tokens internos;
- secretos;
- hashes de recuperación de contraseña.

## JWT y cookie

El login generará un JWT firmado por el backend.

El token se enviará al navegador mediante cookie:

- `httpOnly: true`;
- `sameSite: "lax"` en desarrollo local;
- `secure: false` en desarrollo local.

En producción estas opciones podrán cambiar, especialmente si frontend y backend viven en dominios diferentes.

El frontend no leerá el JWT directamente. Para conocer la sesión actual deberá llamar a:

```txt
GET /api/auth/me
```

## Endpoints previstos

### `POST /api/auth/register`

Crea un usuario nuevo.

Entrada prevista:

```js
{
  name,
  email,
  password,
  role
}
```

Comportamiento:

- valida datos;
- rechaza email repetido;
- hashea la contraseña;
- crea el usuario;
- devuelve usuario público.

### `POST /api/auth/login`

Inicia sesión.

Entrada prevista:

```js
{
  email,
  password
}
```

Comportamiento:

- busca el usuario por email;
- compara contraseña con `bcrypt`;
- si es válida, genera JWT;
- envía cookie `httpOnly`;
- devuelve usuario público.

### `POST /api/auth/logout`

Cierra sesión.

Comportamiento:

- limpia la cookie de autenticación;
- devuelve respuesta exitosa.

### `GET /api/auth/me`

Devuelve la sesión actual.

Comportamiento:

- lee la cookie;
- valida el JWT;
- busca el usuario;
- devuelve usuario público;
- si no hay sesión válida, devuelve error de autenticación.

### `POST /api/auth/forgot-password`

Inicia recuperación de contraseña.

Entrada prevista:

```js
{
  email
}
```

Comportamiento:

- si el email existe, genera token temporal;
- guarda solo el hash del token;
- define expiración;
- en desarrollo devuelve el token visible para poder probar el flujo.

No se enviará email real en esta etapa.

### `POST /api/auth/reset-password`

Cambia la contraseña usando token temporal.

Entrada prevista:

```js
{
  token,
  password
}
```

Comportamiento:

- hashea el token recibido;
- busca token válido, no usado y no expirado;
- hashea la nueva contraseña;
- actualiza el usuario;
- marca el token como usado.

## Seguridad mínima esperada

El backend deberá aplicar:

- validación de datos con `zod`;
- hash de contraseñas con `bcrypt`;
- JWT firmado con `JWT_SECRET`;
- cookie `httpOnly`;
- CORS limitado a `CLIENT_ORIGIN`;
- headers básicos con `helmet`;
- rate limiting básico en rutas sensibles.

## Manejo de errores

Los errores deben ser claros para el frontend, pero no deben revelar detalles sensibles.

Ejemplos:

- credenciales inválidas;
- email ya registrado;
- sesión no autenticada;
- token inválido o expirado.

No se deben exponer:

- stack traces;
- detalles internos de Prisma;
- existencia de usuarios en flujos de recuperación de contraseña de forma insegura.

## Integración futura con el frontend

El frontend usará un servicio de autenticación para:

- registrar usuario;
- iniciar sesión;
- cerrar sesión;
- consultar sesión actual;
- pedir recuperación de contraseña;
- restablecer contraseña.

Después se incorporará `AuthContext` para compartir:

- `currentUser`;
- `isAuthenticated`;
- `login`;
- `logout`;
- `refreshSession`.

## Alcance no incluido en la primera implementación

No se implementará todavía:

- email real;
- refresh tokens;
- OAuth;
- verificación de correo;
- bloqueo de cuenta;
- auditoría de sesiones;
- migración completa de tickets a PostgreSQL.
