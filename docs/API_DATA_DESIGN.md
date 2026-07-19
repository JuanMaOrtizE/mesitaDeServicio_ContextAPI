# Diseño inicial de datos para JSON Server

> Estado: documento histórico.
>
> JSON Server fue usado durante la Fase 5 para aprender persistencia simulada. El flujo activo del proyecto ya no usa `db.json` ni `json-server`; los datos actuales viven en Express/PostgreSQL mediante Prisma. Este documento se conserva solo como referencia del modelo inicial.

## Objetivo

Este documento define la estructura de datos que fue usada por `db.json` con JSON Server durante la fase inicial de persistencia simulada.

La estructura descrita aquí sirve como referencia histórica del modelo persistido y de las relaciones entre colecciones antes de la migración a Express/PostgreSQL.

## Reglas del modelo

- Las relaciones se guardan mediante identificadores terminados en `Id`.
- Los identificadores se manejan como `string`, alineado con el comportamiento observado de `json-server@1.0.0-beta.15`.
- Los tickets no guardan clientes, agentes ni categorías como objetos anidados.
- Los valores internos de estado y prioridad se mantienen en inglés.
- La interfaz puede mostrar etiquetas en español, pero no debe cambiar los valores internos.
- `agentId` puede ser `null` cuando un ticket todavía no está asignado.

## Colecciones previstas

La API simulada tendrá estas colecciones:

- `users`
- `customers`
- `agents`
- `categories`
- `tickets`
- `comments`

## Nota sobre los ejemplos

Los ejemplos originales de este documento usaban IDs numéricos. La implementación actual usa IDs como `string` en `db.json`, por ejemplo `"id": "2"` y `"ticketId": "2"`.

Si se agregan o ajustan datos manualmente, se debe mantener esa convención para evitar conversiones innecesarias en React, React Router y formularios.

## Datos iniciales propuestos

### users

```json
[
  {
    "id": 1,
    "name": "Admin Demo",
    "email": "admin@helpdesk.demo",
    "role": "admin",
    "agentId": null
  },
  {
    "id": 2,
    "name": "Sofía Martínez",
    "email": "sofia@helpdesk.demo",
    "role": "agent",
    "agentId": 1
  }
]
```

### customers

```json
[
  {
    "id": 1,
    "name": "Laura Gómez",
    "email": "laura.gomez@example.com",
    "company": "Comercial Andina",
    "phone": "+57 300 111 2233"
  },
  {
    "id": 2,
    "name": "Carlos Pérez",
    "email": "carlos.perez@example.com",
    "company": "Pagos del Norte",
    "phone": "+57 301 222 3344"
  },
  {
    "id": 3,
    "name": "Ana Torres",
    "email": "ana.torres@example.com",
    "company": "Logística Central",
    "phone": "+57 302 333 4455"
  }
]
```

### agents

```json
[
  {
    "id": 1,
    "name": "Sofía Martínez",
    "email": "sofia@helpdesk.demo",
    "isActive": true
  },
  {
    "id": 2,
    "name": "Mateo Rodríguez",
    "email": "mateo@helpdesk.demo",
    "isActive": true
  }
]
```

### categories

```json
[
  {
    "id": 1,
    "name": "Acceso",
    "description": "Problemas relacionados con inicio de sesión, credenciales y permisos."
  },
  {
    "id": 2,
    "name": "Pagos",
    "description": "Incidencias relacionadas con pagos, facturación o transacciones."
  },
  {
    "id": 3,
    "name": "Entregas",
    "description": "Consultas o problemas relacionados con envíos y entregas."
  }
]
```

### tickets

```json
[
  {
    "id": 1,
    "title": "No puedo iniciar sesión",
    "description": "El cliente recibe un error al ingresar.",
    "status": "open",
    "priority": "high",
    "customerId": 1,
    "agentId": null,
    "categoryId": 1,
    "createdAt": "2026-06-30T09:00:00.000Z",
    "updatedAt": "2026-06-30T09:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Error en la página de pagos",
    "description": "El cliente no puede completar el pago.",
    "status": "in-progress",
    "priority": "medium",
    "customerId": 2,
    "agentId": 1,
    "categoryId": 2,
    "createdAt": "2026-06-29T14:30:00.000Z",
    "updatedAt": "2026-06-30T10:15:00.000Z"
  },
  {
    "id": 3,
    "title": "Problema con la entrega",
    "description": "El cliente no ha recibido su pedido.",
    "status": "resolved",
    "priority": "low",
    "customerId": 3,
    "agentId": 2,
    "categoryId": 3,
    "createdAt": "2026-06-28T11:20:00.000Z",
    "updatedAt": "2026-06-29T16:45:00.000Z"
  }
]
```

### comments

```json
[
  {
    "id": 1,
    "ticketId": 1,
    "authorId": 1,
    "authorName": "Admin Demo",
    "body": "Se registra el incidente de acceso para revisión inicial.",
    "createdAt": "2026-06-30T09:05:00.000Z"
  },
  {
    "id": 2,
    "ticketId": 2,
    "authorId": 2,
    "authorName": "Sofía Martínez",
    "body": "Se reproduce el error en el flujo de pagos y queda en revisión.",
    "createdAt": "2026-06-30T10:20:00.000Z"
  },
  {
    "id": 3,
    "ticketId": 3,
    "authorId": 2,
    "authorName": "Sofía Martínez",
    "body": "Se confirma con logística que la entrega fue completada.",
    "createdAt": "2026-06-29T16:40:00.000Z"
  }
]
```

## Validación de relaciones

- `tickets[0].customerId` apunta a `customers[0]`.
- `tickets[1].customerId` apunta a `customers[1]`.
- `tickets[2].customerId` apunta a `customers[2]`.
- `tickets[0].agentId` es `null`, por lo que representa un ticket sin asignar.
- `tickets[1].agentId` apunta a `agents[0]`.
- `tickets[2].agentId` apunta a `agents[1]`.
- Cada `ticket.categoryId` apunta a una categoría existente.
- Cada `comment.ticketId` apunta a un ticket existente.
- Cada `comment.authorId` apunta a un usuario existente.
- `users[1].agentId` apunta al agente asociado `agents[0]`.

## Decisiones para la implementación posterior

- `db.json` deberá usar estas colecciones como propiedades de primer nivel.
- Los datos actuales de `TicketsPage.jsx` se migrarán a la colección `tickets`.
- Los arrays locales `customers` y `categories` se migrarán a sus colecciones correspondientes.
- Se agregará la colección `agents`, que actualmente no existe como array local.
- Se agregará la colección `comments`, aunque la UI de comentarios se implementará más adelante.
- Las funciones de acceso a datos se crearán separadas de los componentes visuales.
