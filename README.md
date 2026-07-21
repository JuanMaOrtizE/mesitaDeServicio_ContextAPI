# Mesa de Servicio — Help Desk Full-Stack

Aplicación Help Desk construida como proyecto de portfolio para demostrar una base práctica en React y Express.

El objetivo del proyecto no fue crear una aplicación empresarial completa, sino desarrollar una app full-stack funcional con autenticación, roles, tickets, clientes, agentes, categorías, comentarios y reglas de negocio básicas.

Durante el desarrollo utilicé Codex como apoyo de aprendizaje y guía técnica: planificación de tareas, revisión de decisiones, detección de errores comunes y acompañamiento para mantener una estructura progresiva. El código y las decisiones fueron trabajados paso a paso, evitando delegar el proyecto completo a la herramienta.

## Funcionalidades principales

- Autenticación con JWT en cookie `httpOnly`.
- Login, logout, sesión actual y recuperación de contraseña en flujo local.
- Roles `admin` y `agent`.
- Rutas protegidas en frontend y backend.
- Gestión de tickets.
- Asignación de agentes a tickets.
- Bloqueo de asignación a agentes inactivos.
- Clientes, agentes y categorías desde PostgreSQL.
- Comentarios por ticket.
- Dashboard con métricas básicas.
- Manejo de errores, carga y estados vacíos.

## Tecnologías

### Frontend

- React
- React Router
- Context API
- `useState`
- `useReducer`
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express
- Prisma
- PostgreSQL
- Zod
- bcrypt
- JSON Web Token
- Cookies `httpOnly`

## Qué demuestra este proyecto

### React

- Componentes reutilizables.
- Props y composición.
- Renderizado condicional.
- Listas y claves estables.
- Formularios controlados.
- Estado local con `useState`.
- Estado global con Context API.
- Uso puntual de `useReducer`.
- Rutas protegidas.
- Consumo de API.
- Manejo de errores y estados de carga.

### Express

- API REST.
- Rutas separadas.
- Middlewares.
- Autenticación y autorización.
- Validación de datos con Zod.
- Cookies seguras para sesión.
- Conexión a PostgreSQL con Prisma.
- Relaciones entre entidades.
- Reglas de negocio en backend.

## Cómo correr el proyecto

El proyecto tiene frontend y backend separados. Necesitas tener PostgreSQL disponible y configurar las variables de entorno del backend.

### 1. Configurar backend

Crea un archivo `.env` dentro de `backend/` con estos valores:

```env
DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/mesita_servicio"
JWT_SECRET="un_secreto_seguro_para_desarrollo"
CLIENT_ORIGIN="http://localhost:5173"
PORT=4000
```

Luego ejecuta:

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

El backend queda disponible en:

```txt
http://localhost:4000
```

### 2. Configurar frontend

En otra terminal, desde la raíz del proyecto:

```bash
npm install
npm run dev
```

El frontend queda disponible normalmente en:

```txt
http://localhost:5173
```

## Scripts útiles

Frontend:

```bash
npm run dev
npm run lint
npm run build
```

Backend:

```bash
cd backend
npm run dev
npm start
```
