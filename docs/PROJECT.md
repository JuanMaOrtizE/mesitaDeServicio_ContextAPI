# Mesa de Servicio — definición del proyecto

## Objetivo

Construir una aplicación Help Desk para portfolio que comenzó como proyecto React junior y evolucionará de forma guiada hacia una aplicación full-stack local.

La primera parte demuestra fundamentos de React. La siguiente etapa incorporará backend real con Express.js para autenticación, manteniendo una progresión de aprendizaje clara.

## Alcance aprobado

La primera versión permitirá:

- Iniciar sesión con autenticación real mediante backend Express.
- Registrar usuarios.
- Recuperar contraseña mediante token de desarrollo.
- Consultar un dashboard con métricas básicas derivadas de los tickets.
- Listar, crear, consultar, editar y eliminar tickets.
- Administrar clientes y agentes con formularios sencillos.
- Asignar un agente a un ticket.
- Clasificar tickets por estado, prioridad y categoría.
- Añadir y consultar comentarios cronológicos en un ticket.
- Buscar tickets por texto y filtrarlos por estado, prioridad, categoría y agente.
- Persistir inicialmente la información del Help Desk mediante JSON Server.
- Incorporar PostgreSQL para autenticación real.
- Mostrar estados de carga, error, lista vacía y validaciones básicas.
- Ofrecer una interfaz responsive básica con Tailwind CSS.

## Fuera del alcance

- Migración completa del dominio Help Desk a Express en la primera etapa del backend.
- Email real para recuperación de contraseña en la primera etapa.
- Archivos adjuntos, correo, chat en tiempo real y notificaciones.
- SLA, escalamiento automático y auditoría completa de cambios.
- Paginación del servidor y analítica avanzada.
- Redux, Zustand, TanStack Query, TypeScript o arquitecturas empresariales.

## Evolución full-stack

El proyecto incorporará un backend Express dentro de `backend/`.

Decisiones principales:

- Express.js para la API.
- PostgreSQL local para desarrollo.
- Prisma para acceso a datos y migraciones.
- JWT en cookie `httpOnly`.
- Contraseñas hasheadas con `bcrypt`.
- Recuperación de contraseña con token visible en desarrollo.

Durante la transición:

- Express manejará autenticación.
- JSON Server seguirá manejando tickets, clientes, agentes, categorías y comentarios.

El deploy queda fuera de la etapa actual y se planificará más adelante.

## Usuarios y permisos previstos

- **Administrador:** puede gestionar tickets, clientes y agentes, y consultar todas las métricas.
- **Agente:** puede consultar tickets y trabajar con los tickets que tenga asignados.

La autenticación dejará de ser simulada y pasará a estar respaldada por Express y PostgreSQL.

Los permisos por rol se incorporarán gradualmente. Primero se implementará la sesión real; después se aplicarán restricciones de interfaz y, cuando el dominio migre al backend, restricciones de servidor.

## Modelo de datos para JSON Server

Los identificadores serán valores simples y las relaciones se guardarán mediante campos terminados en `Id`. Las colecciones previstas son `users`, `customers`, `agents`, `categories`, `tickets` y `comments`.

Durante la transición a backend real, `users` dejará de depender de JSON Server y pasará a PostgreSQL. El resto del dominio permanecerá temporalmente en JSON Server.

### User

- `id`
- `name`
- `email`
- `role`: `admin` o `agent`
- `agentId`: referencia opcional al agente asociado

### Customer

- `id`
- `name`
- `email`
- `company`
- `phone`

### Agent

- `id`
- `name`
- `email`
- `isActive`

### Category

- `id`
- `name`
- `description`

### Ticket

- `id`
- `title`
- `description`
- `status`: `open`, `in-progress` o `resolved`
- `priority`: `low`, `medium` o `high`
- `customerId`
- `agentId`: puede ser `null` mientras no esté asignado
- `categoryId`
- `createdAt`
- `updatedAt`

### Comment

- `id`
- `ticketId`
- `authorId`
- `authorName`
- `body`
- `createdAt`

`authorId` identifica al usuario simulado. `authorName` conserva un nombre visible sin exigir relaciones complejas para esta versión.

## Relaciones previstas

- Un cliente puede tener muchos tickets; cada ticket pertenece a un cliente mediante `customerId`.
- Un agente puede tener muchos tickets; un ticket puede estar sin asignar o tener un agente mediante `agentId`.
- Una categoría puede clasificar muchos tickets; cada ticket tiene una categoría mediante `categoryId`.
- Un ticket puede tener muchos comentarios; cada comentario pertenece a un ticket mediante `ticketId`.
- Un usuario con rol de agente puede estar asociado a un registro de agente mediante `agentId`.
- Eliminar una entidad relacionada requerirá una comprobación previa en la interfaz; no se implementarán eliminaciones en cascada automáticas.

## Decisiones para evitar retrabajo

- Mantener una forma estable del objeto `ticket` desde los primeros datos estáticos.
- Usar identificadores para las relaciones, no objetos completos anidados dentro del ticket.
- Usar valores internos estables en inglés para estados y prioridades, aunque la interfaz muestre etiquetas en español.
- Mantener los componentes de presentación independientes del origen de los datos: recibirán datos y acciones mediante props.
- No realizar peticiones HTTP directamente desde cada componente visual. Las funciones de acceso a datos deben quedar separadas por recurso o dominio.
- No guardar en estado valores que puedan calcularse, como tickets filtrados o métricas.
- Introducir Context API y `useReducer` únicamente cuando exista un problema real de estado compartido o transiciones complejas.
- Mantener el backend separado del frontend para facilitar una migración futura y un deploy posterior.
