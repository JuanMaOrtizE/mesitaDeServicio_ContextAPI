# Mesa de Servicio — definición del proyecto

## Objetivo

Construir una aplicación Help Desk para portfolio junior que demuestre fundamentos de React mediante una interfaz similar, a pequeña escala, a una herramienta real de soporte.

## Alcance aprobado

La primera versión permitirá:

- Iniciar sesión de forma simulada como administrador o agente.
- Consultar un dashboard con métricas básicas derivadas de los tickets.
- Listar, crear, consultar, editar y eliminar tickets.
- Administrar clientes y agentes con formularios sencillos.
- Asignar un agente a un ticket.
- Clasificar tickets por estado, prioridad y categoría.
- Añadir y consultar comentarios cronológicos en un ticket.
- Buscar tickets por texto y filtrarlos por estado, prioridad, categoría y agente.
- Persistir la información mediante JSON Server.
- Mostrar estados de carga, error, lista vacía y validaciones básicas.
- Ofrecer una interfaz responsive básica con Tailwind CSS.

## Fuera del alcance

- Backend real, base de datos o permisos seguros del servidor.
- Registro público, recuperación de contraseña o autenticación con JWT.
- Archivos adjuntos, correo, chat en tiempo real y notificaciones.
- SLA, escalamiento automático y auditoría completa de cambios.
- Paginación del servidor y analítica avanzada.
- Redux, Zustand, TanStack Query, TypeScript o arquitecturas empresariales.

## Usuarios y permisos previstos

- **Administrador:** puede gestionar tickets, clientes y agentes, y consultar todas las métricas.
- **Agente:** puede consultar tickets y trabajar con los tickets que tenga asignados.

La autenticación y los permisos serán simulados en el cliente. No representan seguridad real.

## Modelo de datos para JSON Server

Los identificadores serán valores simples y las relaciones se guardarán mediante campos terminados en `Id`. Las colecciones previstas son `users`, `customers`, `agents`, `categories`, `tickets` y `comments`.

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
- No realizar peticiones HTTP directamente desde cada componente visual. Cuando llegue JSON Server se crearán funciones de acceso a datos separadas.
- No guardar en estado valores que puedan calcularse, como tickets filtrados o métricas.
- Introducir Context API y `useReducer` únicamente cuando exista un problema real de estado compartido o transiciones complejas.

