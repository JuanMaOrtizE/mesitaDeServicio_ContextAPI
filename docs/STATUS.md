# Estado del proyecto

## Estado actual

- Proyecto inicializado con React y JavaScript mediante Vite.
- La demostración de Vite fue reemplazada por una lista estática de tickets.
- La vista está dividida en `TicketSearch`, `TicketList` y `TicketItem`.
- La búsqueda local por título y descripción funciona mediante `useState`.
- React Router, Tailwind CSS y JSON Server todavía no están instalados ni configurados.
- No existen contextos, reducers, rutas ni servicios HTTP.

## Trabajo completado

- Definición del alcance, modelo general de datos y roadmap.
- **Tarea 1:** lista estática de tickets, props, claves estables y estado vacío.
- **Tarea 2:** input controlado y búsqueda local derivada por título y descripción.
- **Tarea 3:** filtro controlado por estado combinado con la búsqueda existente.
- Normalización de la búsqueda sin distinguir mayúsculas, minúsculas ni espacios exteriores.
- Mensajes diferenciados para colección vacía y criterios sin coincidencias.
- Validación satisfactoria mediante `npm run lint` y `npm run build`.

## Tarea actual

### Tarea 3 — Filtro local por estado (completada)

Añadir un selector controlado que filtre los tickets por estado y funcione al mismo tiempo que la búsqueda existente.

#### Objetivo de aprendizaje

- Manejar más de un estado local con responsabilidades distintas.
- Combinar criterios usando estado derivado.
- Construir un `select` controlado y accesible.

#### Archivos que el estudiante debe modificar o crear

- `src/App.jsx`: mantener el estado seleccionado y calcular la lista visible usando búsqueda y estado.
- `src/components/TicketStatusFilter.jsx`: mostrar el selector y comunicar el nuevo valor mediante props.
- `src/components/TicketList.jsx`: no requiere cambios salvo que sea necesario adaptar el mensaje vacío.

#### Interfaz esperada

`TicketStatusFilter` recibirá:

- `statusFilter`: valor seleccionado.
- `onStatusFilterChange`: función que recibe el nuevo valor.

El selector tendrá estas opciones:

- `all`: Todos los estados.
- `open`: Abierto.
- `in-progress`: En progreso.
- `resolved`: Resuelto.

#### Comportamiento esperado

- El valor inicial será `all` y mostrará todos los tickets.
- Elegir un estado mostrará únicamente los tickets con ese valor exacto.
- La búsqueda y el estado se combinarán con una condición lógica AND.
- Cambiar un filtro no borrará ni modificará el otro.
- Si no hay coincidencias, se mostrará un mensaje aplicable a búsqueda y filtros.

#### Criterios de aceptación

- El selector está asociado a un `label` mediante `htmlFor` e `id`.
- Es un componente controlado mediante `value` y `onChange`.
- `App` mantiene un único estado nuevo llamado conceptualmente `statusFilter`, con valor inicial `all`.
- `TicketStatusFilter` no recibe la colección ni realiza el filtrado.
- La lista visible se calcula durante el renderizado; no se guarda en otro `useState`.
- El filtro usa los valores internos acordados: `open`, `in-progress` y `resolved`.
- Buscar texto y seleccionar estado al mismo tiempo produce la intersección correcta.
- Volver a `all` conserva la búsqueda activa y elimina solamente el filtro de estado.
- Una combinación sin resultados muestra un mensaje claro.
- No se instalan dependencias ni se añaden Router, Tailwind, JSON Server, Context API o `useReducer`.
- `npm run lint` y `npm run build` finalizan correctamente.

#### Errores comunes

- Guardar la lista filtrada en estado.
- Filtrar dentro de `TicketStatusFilter` o `TicketList`.
- Usar textos visibles en español como valores internos.
- Aplicar búsqueda y estado como alternativas OR en lugar de exigir ambos criterios.
- Reiniciar `searchTerm` al cambiar el estado.
- Duplicar el array original o modificarlo.

## Próximo paso

Definir la siguiente tarea de la fase de estado local. No comenzar formularios ni otras funcionalidades hasta recibir sus instrucciones y criterios de aceptación.

## Bloqueos

Ninguno.
