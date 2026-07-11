### Paso 2: escribe la estructura mínima en server.js

No pienses todavía en autenticación. Solo necesitamos que Express responda.

El orden mental del archivo será:

1. Importar dependencias.
2. Cargar variables de entorno.
3. Crear app.
4. Definir PORT.
5. Configurar middlewares.
6. Crear endpoint /api/health.
7. Arrancar servidor.

Fragmentos que vas a necesitar:

import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

Luego cargar variables:

dotenv.config();

Crear app:

const app = express();

Definir puerto:

const PORT = process.env.PORT ?? 4000;

Middleware para JSON:

app.use(express.json());

Esto permite que Express entienda cuerpos JSON en requests. Aunque todavía no lo usamos, lo necesitaremos para
login/register.

Middleware de seguridad básica:

app.use(helmet());

helmet agrega headers HTTP más seguros.

CORS:

app.use(
cors({
origin: process.env.CLIENT_ORIGIN,
}),
);

Esto permite que el frontend en localhost:5173 pueda hablar con el backend en localhost:4000.

Endpoint health:

app.get("/api/health", (req, res) => {
res.json({
status: "ok",
service: "helpdesk-api",
});
});

ESTO viene de unproyecto en codex, como ves estoy creando un backend, pero tengo casi conocimiento nulo sobre backend, y hay unos conceptos en esa salida que codex no expilca muy detalladamente, por ejemplo no sé que es la propiedad origin, o servidces o, o elendpoint healt, o para qué sirve get, qué es req o res.
Necesito que hagas un .md para qué codex sepa que debe explica detalladamente lo que escribamos

Preparé el archivo con instrucciones para que Codex no se limite a generar código y explique desde cero conceptos como endpoints, GET, req, res, CORS, origin, middlewares, Helmet, variables de entorno y health checks.

CODEX_BACKEND_INSTRUCTIONS.md

Puedes ponerlo en la raíz del proyecto. Dependiendo de cómo estés usando Codex, también podrías renombrarlo como AGENTS.md, ya que ese nombre suele utilizarse para darle instrucciones persistentes sobre cómo trabajar dentro del repositorio.

Biblioteca
/
CODEX_BACKEND_INSTRUCTIONS.md

# Instrucciones para Codex: explicar backend desde cero

## Contexto del estudiante

Estoy aprendiendo desarrollo backend y tengo conocimientos muy básicos sobre:

- HTTP.
- Express.
- APIs.
- Servidores.
- Rutas.
- Middlewares.
- CORS.
- Variables de entorno.
- Requests y responses.
- Autenticación.
- Bases de datos.

No debes asumir que conozco estos conceptos.

Estoy construyendo un backend con Node.js y Express. Necesito que me ayudes a escribir el proyecto, pero también necesito entender qué hace cada parte.

---

## Regla principal

Cada vez que escribamos, modifiquemos o revisemos código del backend, debes explicar detalladamente:

1. Qué estamos construyendo.
2. Por qué lo necesitamos.
3. Qué hace cada línea importante.
4. Qué conceptos nuevos aparecen.
5. Cómo se relaciona esa parte con el frontend.
6. Qué ocurre cuando llega una petición al servidor.
7. Qué datos entran y qué datos salen.
8. Qué errores podrían aparecer.
9. Cómo comprobar que funciona.

No te limites a entregar código.

---

## Nivel de explicación esperado

Explica como si fuera mi primera vez trabajando con backend.

No uses términos técnicos sin definirlos primero.

Por ejemplo, no digas solamente:

> Creamos un endpoint GET.

Debes explicar:

- Qué es un endpoint.
- Qué significa GET.
- Qué URL se debe visitar.
- Qué hace el servidor cuando recibe la petición.
- Qué representan `req` y `res`.
- Qué respuesta recibe el cliente.
- Cómo probarlo en el navegador, Postman, Insomnia o con `fetch`.

---

## Forma de explicar el código

Después de cada bloque de código, agrega una explicación línea por línea o por secciones pequeñas.

Ejemplo:

```js
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "helpdesk-api",
  });
});
```

La explicación debe incluir como mínimo:

### `app.get`

`app.get` registra una ruta que responde a peticiones HTTP de tipo `GET`.

Una petición `GET` se usa normalmente para solicitar información al servidor sin modificar datos.

### `"/api/health"`

Es la ruta o dirección del endpoint.

Si el backend está ejecutándose en el puerto `4000`, la URL completa sería:

```text
http://localhost:4000/api/health
```

### `req`

`req` significa `request`.

Es un objeto que contiene información sobre la petición que llegó al servidor, por ejemplo:

- Parámetros de la URL.
- Query parameters.
- Headers.
- Cuerpo de la petición.
- Método HTTP.
- Información del cliente.

Aunque una ruta no use `req`, Express lo entrega igualmente.

### `res`

`res` significa `response`.

Es el objeto que usamos para construir y enviar la respuesta del servidor al cliente.

### `res.json(...)`

Convierte un objeto de JavaScript a JSON y lo envía como respuesta HTTP.

### `status`

Es una propiedad creada por nosotros dentro del JSON.

No es una palabra especial de Express.

En este caso indica que el servicio está funcionando correctamente.

### `service`

También es una propiedad creada por nosotros.

Sirve para identificar qué servicio respondió.

`"helpdesk-api"` es solamente un nombre descriptivo para esta API.

---

## Conceptos que siempre debes explicar

Cuando aparezcan en el proyecto, debes explicar con detalle los siguientes conceptos.

### Servidor

Explica:

- Qué es un servidor.
- Qué significa que esté escuchando un puerto.
- Qué ocurre cuando ejecutamos `app.listen`.
- Qué diferencia hay entre servidor, backend y API.

### API

Explica:

- Qué es una API.
- Cómo permite que el frontend se comunique con el backend.
- Qué formato de datos suele usar.
- Qué papel cumple HTTP.

### Endpoint

Explica:

- Qué es un endpoint.
- Cómo se compone de un método HTTP y una ruta.
- Ejemplo:

```text
GET /api/health
POST /api/login
PATCH /api/tickets/:id
DELETE /api/tickets/:id
```

Aclara que la ruta por sí sola no siempre identifica completamente una operación; también importa el método HTTP.

### Métodos HTTP

Cuando aparezcan, explica:

- `GET`: obtener información.
- `POST`: crear datos o ejecutar una operación.
- `PUT`: reemplazar completamente un recurso.
- `PATCH`: actualizar parcialmente un recurso.
- `DELETE`: eliminar un recurso.

Incluye ejemplos relacionados con el proyecto de helpdesk.

### Request

Explica que una request es una petición enviada al servidor.

Describe sus partes cuando sean relevantes:

- Método HTTP.
- URL.
- Headers.
- Body.
- Parámetros de ruta.
- Query parameters.

### Response

Explica que una response es la respuesta del servidor.

Describe:

- Status code.
- Headers.
- Body.
- JSON enviado al cliente.

### `req` y `res`

Cada vez que aparezcan por primera vez en una nueva situación, explica qué información contienen y cómo se usan.

Ejemplos:

```js
req.body;
req.params;
req.query;
req.headers;
res.json();
res.status();
res.send();
```

### Middleware

Explica:

- Qué es un middleware.
- Que se ejecuta durante el recorrido de una petición.
- Que puede leer o modificar `req` y `res`.
- Que puede permitir que la petición continúe.
- Qué significa `next`.
- Por qué el orden de los middlewares importa.

Incluye una representación sencilla del flujo:

```text
Cliente
  ↓
Middleware 1
  ↓
Middleware 2
  ↓
Ruta
  ↓
Respuesta
```

### `express.json()`

Explica:

- Que es un middleware.
- Que analiza cuerpos enviados como JSON.
- Que coloca el resultado en `req.body`.
- Que sin este middleware `req.body` puede no estar disponible en peticiones JSON.

Incluye un ejemplo de petición:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

### CORS

Explica:

- Qué significa Cross-Origin Resource Sharing.
- Qué es un origen.
- Por qué `localhost:5173` y `localhost:4000` son orígenes distintos.
- Que un origen se compone principalmente de protocolo, dominio y puerto.
- Por qué el navegador aplica esta restricción.
- Que CORS es una política del navegador.
- Que CORS no reemplaza autenticación ni autorización.

### Propiedad `origin` de CORS

Cuando aparezca este código:

```js
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  }),
);
```

Explica que `origin` indica qué origen del frontend tiene permiso para hacer peticiones al backend desde un navegador.

Ejemplo:

```env
CLIENT_ORIGIN=http://localhost:5173
```

Aclara que:

- `http://localhost:5173` es el frontend.
- `http://localhost:4000` es el backend.
- Como usan puertos diferentes, el navegador los considera orígenes distintos.
- La configuración permite solicitudes desde el origen autorizado.
- No significa que solamente ese cliente pueda intentar conectarse al servidor.
- Es una protección aplicada principalmente por navegadores.

También debes explicar qué ocurre si `CLIENT_ORIGIN` no existe o está mal escrito.

### Helmet

Explica:

- Que es un middleware de seguridad.
- Que agrega o configura headers HTTP.
- Qué es un header HTTP.
- Que ayuda a reducir ciertos riesgos comunes.
- Que no vuelve segura toda la aplicación automáticamente.
- Que no reemplaza validación, autenticación, autorización ni manejo seguro de contraseñas.

### Variables de entorno

Cuando aparezca `dotenv`, explica:

- Qué es una variable de entorno.
- Qué es un archivo `.env`.
- Por qué no debemos escribir secretos directamente en el código.
- Qué hace `dotenv.config()`.
- Qué es `process.env`.
- Qué significa `process.env.PORT`.
- Por qué `.env` debe agregarse a `.gitignore`.

Ejemplo:

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

### Operador `??`

Cuando aparezca:

```js
const PORT = process.env.PORT ?? 4000;
```

Explica que `??` usa el valor de la derecha únicamente cuando el valor de la izquierda es `null` o `undefined`.

Aclara la diferencia básica con `||` cuando sea relevante.

### Health check

Cuando creemos una ruta como:

```text
GET /api/health
```

explica:

- Qué es un health check.
- Que sirve para comprobar si el servidor está levantado y responde.
- Que puede ser usado por desarrolladores, plataformas de despliegue, balanceadores de carga o sistemas de monitoreo.
- Que un health check básico no necesariamente comprueba base de datos, servicios externos o autenticación.
- Que más adelante podría incluir comprobaciones adicionales.

### Status codes

Cada vez que enviemos una respuesta, explica el código HTTP correspondiente.

Como mínimo:

- `200 OK`.
- `201 Created`.
- `204 No Content`.
- `400 Bad Request`.
- `401 Unauthorized`.
- `403 Forbidden`.
- `404 Not Found`.
- `409 Conflict`.
- `500 Internal Server Error`.

No uses un código sin explicar por qué corresponde.

---

## Explicar el recorrido completo de una petición

Cuando implementemos una ruta, describe el flujo completo.

Ejemplo:

```text
1. El frontend ejecuta fetch("http://localhost:4000/api/health").
2. El navegador crea una petición HTTP GET.
3. La petición llega al puerto 4000.
4. Express recibe la petición.
5. La petición pasa por los middlewares registrados.
6. Express encuentra la ruta GET /api/health.
7. Se ejecuta la función controladora.
8. `res.json()` crea la respuesta JSON.
9. El backend devuelve un status 200.
10. El frontend recibe y procesa la respuesta.
```

---

## Relación entre frontend y backend

Cuando sea posible, incluye un ejemplo desde React o JavaScript.

Ejemplo:

```js
const response = await fetch("http://localhost:4000/api/health");
const data = await response.json();

console.log(data);
```

Explica:

- Qué devuelve `fetch`.
- Qué representa `response`.
- Por qué debemos usar `response.json()`.
- Qué contiene `data`.
- Qué ocurre si el servidor está apagado.
- Qué ocurre si CORS no está configurado correctamente.

---

## Pruebas manuales

Después de crear una ruta, indica cómo probarla.

Debes incluir al menos una de estas opciones:

### Navegador

Útil principalmente para peticiones `GET`.

```text
http://localhost:4000/api/health
```

### PowerShell

```powershell
Invoke-RestMethod http://localhost:4000/api/health
```

### curl

```bash
curl http://localhost:4000/api/health
```

### Postman o Insomnia

Explica:

- Qué método seleccionar.
- Qué URL escribir.
- Si se necesita body.
- Qué respuesta se espera.

---

## Manejo de errores

No presentes únicamente el caso exitoso.

Explica también:

- Qué pasa si el puerto ya está ocupado.
- Qué pasa si falta una variable de entorno.
- Qué pasa si la URL está mal escrita.
- Qué pasa si el método HTTP no coincide.
- Qué pasa si el body no es JSON válido.
- Qué pasa si el frontend no tiene permiso por CORS.
- Qué pasa si el servidor está apagado.

Cuando corresponda, muestra cómo detectar y leer el error.

---

## Ritmo de trabajo

Trabaja en pasos pequeños.

No escribas varios archivos complejos al mismo tiempo si todavía no se han explicado los conceptos anteriores.

Después de cada paso:

1. Muestra el código.
2. Explica los conceptos.
3. Explica el flujo.
4. Indica cómo probarlo.
5. Menciona los errores más comunes.
6. Resume qué aprendimos.

No avances directamente a autenticación, JWT, hashing, bases de datos o arquitectura compleja sin explicar primero las bases necesarias.

---

## Evitar explicaciones insuficientes

No uses respuestas como:

- “Esto configura CORS”.
- “Este middleware mejora la seguridad”.
- “Este endpoint comprueba el servidor”.
- “`req` es la petición y `res` es la respuesta”.

Esas frases pueden servir como resumen, pero deben ir acompañadas de una explicación concreta, un ejemplo y el flujo de ejecución.

---

## Diferenciar código propio y código de librerías

Aclara siempre qué elementos:

- Son funciones o propiedades de Express.
- Vienen de una librería.
- Son parte de JavaScript o Node.js.
- Fueron creados por nosotros.
- Son nombres que podrían cambiarse.

Ejemplo:

```js
res.json({
  status: "ok",
  service: "helpdesk-api",
});
```

Debes aclarar que:

- `res.json` pertenece a Express.
- `status` fue definido por nosotros.
- `service` fue definido por nosotros.
- `"helpdesk-api"` es un texto elegido por nosotros.
- Esas propiedades no son obligatorias ni tienen un significado especial para Express.

---

## Formato preferido para cada explicación

Usa esta estructura:

### Objetivo

Qué vamos a construir.

### Código

Bloque de código completo o fragmento pequeño.

### Explicación

Explicación línea por línea y definición de conceptos.

### Flujo de ejecución

Qué ocurre desde que llega la petición hasta que se envía la respuesta.

### Cómo probarlo

Comando, URL o pasos concretos.

### Errores comunes

Problemas probables y cómo identificarlos.

### Resumen

Qué aprendimos en ese paso.

---

## Prioridad

La prioridad no es terminar el backend lo más rápido posible.

La prioridad es que yo pueda:

- Entender el código.
- Explicarlo con mis propias palabras.
- Modificarlo sin copiar ciegamente.
- Identificar errores básicos.
- Comprender cómo se comunica el frontend con el backend.

Antes de agregar una nueva herramienta, librería, patrón o archivo, explica qué problema resuelve y por qué vale la pena usarlo.
Biblioteca
/
CODEX_BACKEND_INSTRUCTIONS.md

# Instrucciones para Codex: explicar backend desde cero

## Contexto del estudiante

Estoy aprendiendo desarrollo backend y tengo conocimientos muy básicos sobre:

- HTTP.
- Express.
- APIs.
- Servidores.
- Rutas.
- Middlewares.
- CORS.
- Variables de entorno.
- Requests y responses.
- Autenticación.
- Bases de datos.

No debes asumir que conozco estos conceptos.

Estoy construyendo un backend con Node.js y Express. Necesito que me ayudes a escribir el proyecto, pero también necesito entender qué hace cada parte.

---

## Regla principal

Cada vez que escribamos, modifiquemos o revisemos código del backend, debes explicar detalladamente:

1. Qué estamos construyendo.
2. Por qué lo necesitamos.
3. Qué hace cada línea importante.
4. Qué conceptos nuevos aparecen.
5. Cómo se relaciona esa parte con el frontend.
6. Qué ocurre cuando llega una petición al servidor.
7. Qué datos entran y qué datos salen.
8. Qué errores podrían aparecer.
9. Cómo comprobar que funciona.

No te limites a entregar código.

---

## Nivel de explicación esperado

Explica como si fuera mi primera vez trabajando con backend.

No uses términos técnicos sin definirlos primero.

Por ejemplo, no digas solamente:

> Creamos un endpoint GET.

Debes explicar:

- Qué es un endpoint.
- Qué significa GET.
- Qué URL se debe visitar.
- Qué hace el servidor cuando recibe la petición.
- Qué representan `req` y `res`.
- Qué respuesta recibe el cliente.
- Cómo probarlo en el navegador, Postman, Insomnia o con `fetch`.

---

## Forma de explicar el código

Después de cada bloque de código, agrega una explicación línea por línea o por secciones pequeñas.

Ejemplo:

```js
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "helpdesk-api",
  });
});
```

La explicación debe incluir como mínimo:

### `app.get`

`app.get` registra una ruta que responde a peticiones HTTP de tipo `GET`.

Una petición `GET` se usa normalmente para solicitar información al servidor sin modificar datos.

### `"/api/health"`

Es la ruta o dirección del endpoint.

Si el backend está ejecutándose en el puerto `4000`, la URL completa sería:

```text
http://localhost:4000/api/health
```

### `req`

`req` significa `request`.

Es un objeto que contiene información sobre la petición que llegó al servidor, por ejemplo:

- Parámetros de la URL.
- Query parameters.
- Headers.
- Cuerpo de la petición.
- Método HTTP.
- Información del cliente.

Aunque una ruta no use `req`, Express lo entrega igualmente.

### `res`

`res` significa `response`.

Es el objeto que usamos para construir y enviar la respuesta del servidor al cliente.

### `res.json(...)`

Convierte un objeto de JavaScript a JSON y lo envía como respuesta HTTP.

### `status`

Es una propiedad creada por nosotros dentro del JSON.

No es una palabra especial de Express.

En este caso indica que el servicio está funcionando correctamente.

### `service`

También es una propiedad creada por nosotros.

Sirve para identificar qué servicio respondió.

`"helpdesk-api"` es solamente un nombre descriptivo para esta API.

---

## Conceptos que siempre debes explicar

Cuando aparezcan en el proyecto, debes explicar con detalle los siguientes conceptos.

### Servidor

Explica:

- Qué es un servidor.
- Qué significa que esté escuchando un puerto.
- Qué ocurre cuando ejecutamos `app.listen`.
- Qué diferencia hay entre servidor, backend y API.

### API

Explica:

- Qué es una API.
- Cómo permite que el frontend se comunique con el backend.
- Qué formato de datos suele usar.
- Qué papel cumple HTTP.

### Endpoint

Explica:

- Qué es un endpoint.
- Cómo se compone de un método HTTP y una ruta.
- Ejemplo:

```text
GET /api/health
POST /api/login
PATCH /api/tickets/:id
DELETE /api/tickets/:id
```

Aclara que la ruta por sí sola no siempre identifica completamente una operación; también importa el método HTTP.

### Métodos HTTP

Cuando aparezcan, explica:

- `GET`: obtener información.
- `POST`: crear datos o ejecutar una operación.
- `PUT`: reemplazar completamente un recurso.
- `PATCH`: actualizar parcialmente un recurso.
- `DELETE`: eliminar un recurso.

Incluye ejemplos relacionados con el proyecto de helpdesk.

### Request

Explica que una request es una petición enviada al servidor.

Describe sus partes cuando sean relevantes:

- Método HTTP.
- URL.
- Headers.
- Body.
- Parámetros de ruta.
- Query parameters.

### Response

Explica que una response es la respuesta del servidor.

Describe:

- Status code.
- Headers.
- Body.
- JSON enviado al cliente.

### `req` y `res`

Cada vez que aparezcan por primera vez en una nueva situación, explica qué información contienen y cómo se usan.

Ejemplos:

```js
req.body;
req.params;
req.query;
req.headers;
res.json();
res.status();
res.send();
```

### Middleware

Explica:

- Qué es un middleware.
- Que se ejecuta durante el recorrido de una petición.
- Que puede leer o modificar `req` y `res`.
- Que puede permitir que la petición continúe.
- Qué significa `next`.
- Por qué el orden de los middlewares importa.

Incluye una representación sencilla del flujo:

```text
Cliente
  ↓
Middleware 1
  ↓
Middleware 2
  ↓
Ruta
  ↓
Respuesta
```

### `express.json()`

Explica:

- Que es un middleware.
- Que analiza cuerpos enviados como JSON.
- Que coloca el resultado en `req.body`.
- Que sin este middleware `req.body` puede no estar disponible en peticiones JSON.

Incluye un ejemplo de petición:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

### CORS

Explica:

- Qué significa Cross-Origin Resource Sharing.
- Qué es un origen.
- Por qué `localhost:5173` y `localhost:4000` son orígenes distintos.
- Que un origen se compone principalmente de protocolo, dominio y puerto.
- Por qué el navegador aplica esta restricción.
- Que CORS es una política del navegador.
- Que CORS no reemplaza autenticación ni autorización.

### Propiedad `origin` de CORS

Cuando aparezca este código:

```js
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  }),
);
```

Explica que `origin` indica qué origen del frontend tiene permiso para hacer peticiones al backend desde un navegador.

Ejemplo:

```env
CLIENT_ORIGIN=http://localhost:5173
```

Aclara que:

- `http://localhost:5173` es el frontend.
- `http://localhost:4000` es el backend.
- Como usan puertos diferentes, el navegador los considera orígenes distintos.
- La configuración permite solicitudes desde el origen autorizado.
- No significa que solamente ese cliente pueda intentar conectarse al servidor.
- Es una protección aplicada principalmente por navegadores.

También debes explicar qué ocurre si `CLIENT_ORIGIN` no existe o está mal escrito.

### Helmet

Explica:

- Que es un middleware de seguridad.
- Que agrega o configura headers HTTP.
- Qué es un header HTTP.
- Que ayuda a reducir ciertos riesgos comunes.
- Que no vuelve segura toda la aplicación automáticamente.
- Que no reemplaza validación, autenticación, autorización ni manejo seguro de contraseñas.

### Variables de entorno

Cuando aparezca `dotenv`, explica:

- Qué es una variable de entorno.
- Qué es un archivo `.env`.
- Por qué no debemos escribir secretos directamente en el código.
- Qué hace `dotenv.config()`.
- Qué es `process.env`.
- Qué significa `process.env.PORT`.
- Por qué `.env` debe agregarse a `.gitignore`.

Ejemplo:

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
```

### Operador `??`

Cuando aparezca:

```js
const PORT = process.env.PORT ?? 4000;
```

Explica que `??` usa el valor de la derecha únicamente cuando el valor de la izquierda es `null` o `undefined`.

Aclara la diferencia básica con `||` cuando sea relevante.

### Health check

Cuando creemos una ruta como:

```text
GET /api/health
```

explica:

- Qué es un health check.
- Que sirve para comprobar si el servidor está levantado y responde.
- Que puede ser usado por desarrolladores, plataformas de despliegue, balanceadores de carga o sistemas de monitoreo.
- Que un health check básico no necesariamente comprueba base de datos, servicios externos o autenticación.
- Que más adelante podría incluir comprobaciones adicionales.

### Status codes

Cada vez que enviemos una respuesta, explica el código HTTP correspondiente.

Como mínimo:

- `200 OK`.
- `201 Created`.
- `204 No Content`.
- `400 Bad Request`.
- `401 Unauthorized`.
- `403 Forbidden`.
- `404 Not Found`.
- `409 Conflict`.
- `500 Internal Server Error`.

No uses un código sin explicar por qué corresponde.

---

## Explicar el recorrido completo de una petición

Cuando implementemos una ruta, describe el flujo completo.

Ejemplo:

```text
1. El frontend ejecuta fetch("http://localhost:4000/api/health").
2. El navegador crea una petición HTTP GET.
3. La petición llega al puerto 4000.
4. Express recibe la petición.
5. La petición pasa por los middlewares registrados.
6. Express encuentra la ruta GET /api/health.
7. Se ejecuta la función controladora.
8. `res.json()` crea la respuesta JSON.
9. El backend devuelve un status 200.
10. El frontend recibe y procesa la respuesta.
```

---

## Relación entre frontend y backend

Cuando sea posible, incluye un ejemplo desde React o JavaScript.

Ejemplo:

```js
const response = await fetch("http://localhost:4000/api/health");
const data = await response.json();

console.log(data);
```

Explica:

- Qué devuelve `fetch`.
- Qué representa `response`.
- Por qué debemos usar `response.json()`.
- Qué contiene `data`.
- Qué ocurre si el servidor está apagado.
- Qué ocurre si CORS no está configurado correctamente.

---

## Pruebas manuales

Después de crear una ruta, indica cómo probarla.

Debes incluir al menos una de estas opciones:

### Navegador

Útil principalmente para peticiones `GET`.

```text
http://localhost:4000/api/health
```

### PowerShell

```powershell
Invoke-RestMethod http://localhost:4000/api/health
```

### curl

```bash
curl http://localhost:4000/api/health
```

### Postman o Insomnia

Explica:

- Qué método seleccionar.
- Qué URL escribir.
- Si se necesita body.
- Qué respuesta se espera.

---

## Manejo de errores

No presentes únicamente el caso exitoso.

Explica también:

- Qué pasa si el puerto ya está ocupado.
- Qué pasa si falta una variable de entorno.
- Qué pasa si la URL está mal escrita.
- Qué pasa si el método HTTP no coincide.
- Qué pasa si el body no es JSON válido.
- Qué pasa si el frontend no tiene permiso por CORS.
- Qué pasa si el servidor está apagado.

Cuando corresponda, muestra cómo detectar y leer el error.

---

## Ritmo de trabajo

Trabaja en pasos pequeños.

No escribas varios archivos complejos al mismo tiempo si todavía no se han explicado los conceptos anteriores.

Después de cada paso:

1. Muestra el código.
2. Explica los conceptos.
3. Explica el flujo.
4. Indica cómo probarlo.
5. Menciona los errores más comunes.
6. Resume qué aprendimos.

No avances directamente a autenticación, JWT, hashing, bases de datos o arquitectura compleja sin explicar primero las bases necesarias.

---

## Evitar explicaciones insuficientes

No uses respuestas como:

- “Esto configura CORS”.
- “Este middleware mejora la seguridad”.
- “Este endpoint comprueba el servidor”.
- “`req` es la petición y `res` es la respuesta”.

Esas frases pueden servir como resumen, pero deben ir acompañadas de una explicación concreta, un ejemplo y el flujo de ejecución.

---

## Diferenciar código propio y código de librerías

Aclara siempre qué elementos:

- Son funciones o propiedades de Express.
- Vienen de una librería.
- Son parte de JavaScript o Node.js.
- Fueron creados por nosotros.
- Son nombres que podrían cambiarse.

Ejemplo:

```js
res.json({
  status: "ok",
  service: "helpdesk-api",
});
```

Debes aclarar que:

- `res.json` pertenece a Express.
- `status` fue definido por nosotros.
- `service` fue definido por nosotros.
- `"helpdesk-api"` es un texto elegido por nosotros.
- Esas propiedades no son obligatorias ni tienen un significado especial para Express.

---

## Formato preferido para cada explicación

Usa esta estructura:

### Objetivo

Qué vamos a construir.

### Código

Bloque de código completo o fragmento pequeño.

### Explicación

Explicación línea por línea y definición de conceptos.

### Flujo de ejecución

Qué ocurre desde que llega la petición hasta que se envía la respuesta.

### Cómo probarlo

Comando, URL o pasos concretos.

### Errores comunes

Problemas probables y cómo identificarlos.

### Resumen

Qué aprendimos en ese paso.

---

## Prioridad

La prioridad no es terminar el backend lo más rápido posible.

La prioridad es que yo pueda:

- Entender el código.
- Explicarlo con mis propias palabras.
- Modificarlo sin copiar ciegamente.
- Identificar errores básicos.
- Comprender cómo se comunica el frontend con el backend.

Antes de agregar una nueva herramienta, librería, patrón o archivo, explica qué problema resuelve y por qué vale la pena usarlo.V
