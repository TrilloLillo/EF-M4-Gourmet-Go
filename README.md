# 🍽️ Gourmet Go

Aplicación web que permite buscar recetas dinámicamente utilizando la API pública de TheMealDB.
El proyecto evoluciona desde un prototipo estático (Sprint 1) hacia una aplicación completamente funcional con consumo de API y renderizado dinámico.

---

## 🚀 Demo

![demo](./assets/images/live_demo_gif.gif)
[Live Demo](https://trillolillo.github.io/EF-M4-Gourmet-Go/)

---

## 📌 Descripción

**Gourmet Go** es una aplicación frontend que permite a los usuarios buscar recetas a partir de un ingrediente específico.

El sistema consume datos en tiempo real desde una API externa y muestra los resultados sin recargar la página, aplicando principios modernos de desarrollo web.

---

## ✨ Features

* 🔍 Búsqueda de recetas por ingrediente
* ⚡ Consumo de API con `fetch` y `async/await`
* 🧠 Renderizado dinámico del DOM
* 🔄 Actualización de resultados sin recarga
* ❌ Manejo de búsquedas sin resultados
* 🎨 UI basada en Bootstrap

---

## 🛠️ Tecnologías

* HTML5
* CSS3
* JavaScript (ES6+)
* Bootstrap
* API: [TheMealDB](https://www.themealdb.com/)

---

## 📡 Uso de la API

### Listar ingredientes disponibles

```
https://www.themealdb.com/api/json/v1/1/list.php?i=list
```

### Buscar recetas por ingrediente

```
https://www.themealdb.com/api/json/v1/1/filter.php?i=INGREDIENTE
```

Ejemplo de respuesta:

```json
{
  "idIngredient": "47",
  "strIngredient": "Cardamom"
}
```

---

## ⚙️ Instalación

1. Clonar repositorio:

```bash
git clone https://github.com/TrilloLillo/EF-M4-Gourmet-Go.git
cd EF-M4-Gourmet-Go
```

2. Abrir el proyecto:

```bash
open index.html
```

*(o usar Live Server en VS Code)*

---

## 🧠 Funcionamiento

### Flujo principal

1. Usuario ingresa un ingrediente
2. Se intercepta el submit del formulario
3. Se realiza una petición a la API
4. Se procesan los datos
5. Se renderizan las recetas dinámicamente

---

## 📋 Historias de Usuario Implementadas

### 🔎 Búsqueda de recetas

* Captura input del usuario
* Llamada a API con `async/await`
* Prevención de recarga del formulario

### 🧩 Renderizado dinámico

* Generación de tarjetas con template literals
* Inserción dinámica en el DOM
* Limpieza de resultados previos

### ⚠️ Manejo de errores

* Mensaje cuando no hay resultados (`meals === null`)

---

## 📁 Estructura del Proyecto

```
/
├── index.html
├── styles.css
├── app.js
└── assets/
```

---

## 🧪 Buenas Prácticas Aplicadas

* Uso de `const` y `let`
* Arrow functions
* Template literals
* Destructuring
* Código asincrónico limpio con `async/await`
* Separación de lógica (JS) y estructura (HTML)

---

## 👤 Autor

Desarrollado por [TrilloLillo](https://github.com/TrilloLillo)
