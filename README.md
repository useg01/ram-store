# RacktraceRAM — Tienda online de memorias RAM

Proyecto final del curso **JavaScript Avanzado (AP3)**. Tienda online de
memorias RAM (DDR4/DDR5) desarrollada con React, React Router DOM, Tailwind
CSS y JSON Server como API simulada.

## Tecnologías utilizadas

- React 19 (componentes funcionales + Hooks)
- React Router DOM 7
- Tailwind CSS 4
- JSON Server (base de datos simulada)
- Fetch API
- Vite

## Estructura del proyecto

```
src/
├── assets/          # Imágenes y recursos estáticos
├── components/      # Navbar, Footer, ProductCard, Button, Loader, etc.
├── pages/           # Home, About, Catalog, ProductDetail, Contact, NotFound
├── services/        # api.js, productService.js, contactService.js
├── App.jsx          # Definición de rutas
├── main.jsx         # Punto de entrada
└── index.css        # Tema y tokens de diseño (Tailwind v4)
db.json              # Base de datos simulada para JSON Server
```

## Páginas

| Ruta            | Página                                      |
|-----------------|----------------------------------------------|
| `/`             | Inicio (hero + productos destacados)          |
| `/nosotros`     | Presentación / información general            |
| `/catalogo`     | Catálogo de memorias RAM (página principal)   |
| `/catalogo/:id` | Ficha técnica de un producto                  |
| `/contacto`     | Formulario de contacto                        |
| `*`             | Página 404 personalizada                      |

## Instalación y ejecución local

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Levantar la API simulada (JSON Server, puerto 3001):

   ```bash
   npm run server
   ```

3. En otra terminal, levantar la app de React (puerto 5173):

   ```bash
   npm run dev
   ```

4. Abrir `http://localhost:5173` en el navegador.

> La app consume la API en `http://localhost:3001` (ver `src/services/api.js`).
> Si se despliega `db.json` en otro servicio (Render, Railway, etc.), actualizar
> la constante `API_URL` en ese archivo con la URL pública correspondiente.

## Build de producción

```bash
npm run build
npm run preview
```

## Despliegue

- **Frontend (React):** Vercel / Netlify — subir la carpeta generada por
  `npm run build` (`dist/`) o conectar el repositorio de GitHub.
- **API simulada (JSON Server):** Render / Railway, ejecutando
  `json-server --watch db.json --port $PORT`.

Enlace del proyecto desplegado: _(agregar aquí)_
Repositorio de GitHub: _(agregar aquí)_

## Autoría

Proyecto desarrollado como entregable del curso JavaScript Avanzado, unidad
AP3, sobre la temática **Tienda online de memorias RAM**.
