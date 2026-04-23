# 💨 VapeZone — Tienda de Vapes Desechables

Tienda de ecommerce para vapes desechables con integración directa a WhatsApp.  
Lista para subir a **GitHub Pages** sin necesidad de servidor ni base de datos.

---

## 🚀 Instalación en GitHub Pages

### Paso 1 — Configura tu número de WhatsApp

Abre el archivo `js/products.js` y busca esta línea:

```js
whatsappNumber: "593XXXXXXXXX",
```

Cámbiala por tu número con código de país, sin el símbolo `+` ni espacios.  
Ejemplo para Ecuador: `"593987654321"`

### Paso 2 — Crea un repositorio en GitHub

1. Ve a [github.com](https://github.com) → "New repository"
2. Nombre sugerido: `vapezone` o el que prefieras
3. Déjalo como **Public** (necesario para GitHub Pages gratis)
4. Haz clic en **Create repository**

### Paso 3 — Sube los archivos

Puedes hacerlo de dos formas:

**Opción A — Arrastrando archivos (más fácil):**
1. En tu repositorio, haz clic en "Add file" → "Upload files"
2. Arrastra TODA la carpeta `vapeshop/` y suéltala
3. Haz clic en "Commit changes"

**Opción B — Con Git (recomendado):**
```bash
cd vapeshop
git init
git add .
git commit -m "🚀 Primera versión de VapeZone"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### Paso 4 — Activa GitHub Pages

1. En tu repositorio, ve a **Settings** → **Pages**
2. En "Source", selecciona **main** branch y carpeta **/ (root)**
3. Haz clic en **Save**
4. En 1-2 minutos tu tienda estará en: `https://TU_USUARIO.github.io/TU_REPO/`

---

## 🛍️ Agregar y editar productos

Abre `js/products.js` y edita el array `PRODUCTS`.  
Cada producto tiene esta estructura:

```js
{
  id: 1,                          // Número único (no repitas)
  name: "MANGO ICE",              // Nombre del producto
  category: "Frutal",             // Categoría
  price: 12.99,                   // Precio en números
  stock: 30,                      // Unidades disponibles (0 = sin stock)
  desc: "Mango tropical...",      // Descripción corta
  details: ["5000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
  emoji: "🥭",                    // Emoji si no tienes imagen
  image: "",                      // Ruta de imagen o "" para usar emoji
  badge: "new",                   // "new" | "hot" | ""
  active: true,                   // true = visible | false = oculto
},
```

Después de editar, sube el archivo actualizado a GitHub con `git push`.

---

## 🖼️ Agregar imágenes a los productos

1. Guarda tus imágenes en la carpeta `images/`
   - Formato: JPG, PNG o WEBP
   - Tamaño recomendado: 600×400px
   
2. En `js/products.js`, actualiza el campo `image`:
   ```js
   image: "images/mango.jpg",
   ```

3. Sube los cambios a GitHub

---

## 🔐 Panel de Administración

Accede al panel en: `https://TU_USUARIO.github.io/TU_REPO/admin/`

**Contraseña por defecto:** `admin123`

Para cambiar la contraseña, abre `admin/index.html` y busca:
```js
const ADMIN_PASSWORD = "admin123";
```

> ⚠️ **Nota:** El panel admin guarda cambios en el navegador (localStorage).  
> Para publicar cambios definitivos, edita `js/products.js` directamente y sube con git.

---

## 📱 Cómo funciona el flujo de compra

1. El cliente navega y agrega productos al carrito 🛒
2. Al hacer clic en **"Pedir por WhatsApp"**, se abre WhatsApp con:
   - Lista de productos pedidos
   - Cantidades
   - Total a pagar
3. Tú recibes el mensaje y coordinas el pago y la entrega

---

## 📁 Estructura del proyecto

```
vapeshop/
├── index.html          ← Tienda principal
├── css/
│   └── style.css       ← Estilos de la tienda
├── js/
│   ├── products.js     ← ⭐ AQUÍ configuras productos y WhatsApp
│   └── app.js          ← Lógica del carrito y la tienda
├── admin/
│   └── index.html      ← Panel de administración
├── images/             ← Carpeta para imágenes de productos
└── README.md           ← Este archivo
```

---

## 🎨 Personalización

### Cambiar colores
Abre `css/style.css` y modifica las variables al inicio:
```css
:root {
  --primary: #00f5a0;   /* Color principal (verde neón) */
  --accent: #ff006e;    /* Color de acento (rosa) */
  --dark: #040a0f;      /* Fondo oscuro */
}
```

### Cambiar nombre de la tienda
Busca `VapeZone` en `index.html` y reemplázalo por el nombre de tu tienda.

### Cambiar moneda
En `js/products.js`, busca:
```js
currency: "$",
currencyCode: "USD",
```

---

## ⚠️ Aviso Legal

Esta tienda incluye un aviso de "Producto para mayores de 18 años".  
Asegúrate de cumplir con las leyes locales sobre venta de productos de vapeo en tu país.

---

Hecho con ❤️ para VapeZone
