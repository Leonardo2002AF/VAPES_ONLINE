// ============================================================
//  VAPEZONE — CONFIGURACIÓN DE PRODUCTOS Y TIENDA
//  Edita este archivo para gestionar tu catálogo
// ============================================================

// ─── CONFIGURACIÓN GENERAL ───────────────────────────────────
const STORE_CONFIG = {
  name: "VapeZone",
  whatsappNumber: "593958851179", // ← CAMBIA ESTO: código de país + número (sin +, sin espacios)
  currency: "$",
  currencyCode: "USD",
  greeting: "¡Hola! Quiero hacer un pedido en VapeZone 🛒💨",
};

// ─── PRODUCTOS ───────────────────────────────────────────────
// Para agregar un producto, copia un bloque { ... } y modifícalo.
// Para desactivar un producto: cambia "active: true" por "active: false"
// Campos:
//   id       → número único (no repitas IDs)
//   name     → nombre del producto
//   category → categoría (debe coincidir con las categorías en CATEGORIES)
//   price    → precio en números (sin símbolo)
//   stock    → unidades disponibles (0 = sin stock)
//   desc     → descripción corta
//   details  → lista de características (máx 4)
//   emoji    → emoji decorativo (si no tienes imagen)
//   image    → ruta de imagen (ej: "images/vape1.jpg") — deja "" para usar emoji
//   badge    → "new" | "hot" | "" (etiqueta en la tarjeta)
//   active   → true | false

const PRODUCTS = [
  {
    id: 1,
    name: "LUSH ICE",
    category: "Frutal",
    price: 12.99,
    stock: 25,
    desc: "Sandía fresca con toque de hielo mentolado. El favorito de todos.",
    details: ["5000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🍉",
    image: "",
    badge: "hot",
    active: true,
  },
  {
    id: 2,
    name: "MANGO ICE",
    category: "Frutal",
    price: 12.99,
    stock: 30,
    desc: "Mango tropical con hielo mentolado. Refrescante y delicioso.",
    details: ["5000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🥭",
    image: "",
    badge: "new",
    active: true,
  },
  {
    id: 3,
    name: "BLUEBERRY ICE",
    category: "Frutal",
    price: 12.99,
    stock: 20,
    desc: "Arándano dulce con un toque de hielo. Perfecto para cualquier momento.",
    details: ["5000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🫐",
    image: "",
    badge: "",
    active: true,
  },
  {
    id: 4,
    name: "MINT COOL",
    category: "Mentol",
    price: 11.99,
    stock: 15,
    desc: "Menta pura y refrescante. Para los amantes del frío.",
    details: ["5000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🌿",
    image: "",
    badge: "",
    active: true,
  },
  {
    id: 5,
    name: "STRAWBERRY BANANA",
    category: "Frutal",
    price: 13.99,
    stock: 18,
    desc: "La combinación clásica: fresa y banana en cada puff.",
    details: ["6000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🍓",
    image: "",
    badge: "hot",
    active: true,
  },
  {
    id: 6,
    name: "PASSION FRUIT",
    category: "Exótico",
    price: 13.99,
    stock: 10,
    desc: "Maracuyá exótico con toque tropical. Una experiencia única.",
    details: ["6000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🌺",
    image: "",
    badge: "new",
    active: true,
  },
  {
    id: 7,
    name: "COLA ICE",
    category: "Dulce",
    price: 12.99,
    stock: 12,
    desc: "El sabor de tu refresco favorito en formato vape. Inconfundible.",
    details: ["5000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🥤",
    image: "",
    badge: "",
    active: true,
  },
  {
    id: 8,
    name: "GRAPE SODA",
    category: "Dulce",
    price: 12.99,
    stock: 8,
    desc: "Uva dulce con efervescencia. Como tomar una gaseosa premium.",
    details: ["5000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🍇",
    image: "",
    badge: "",
    active: true,
  },
  {
    id: 9,
    name: "PEACH GUMMY",
    category: "Dulce",
    price: 14.99,
    stock: 0,
    desc: "Melocotón gummy bear. Un dulce irresistible en cada calada.",
    details: ["7000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🍑",
    image: "",
    badge: "",
    active: true,
  },
  {
    id: 10,
    name: "PINK LEMONADE",
    category: "Frutal",
    price: 13.99,
    stock: 22,
    desc: "Limonada rosada con fresa. El sabor del verano.",
    details: ["6000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🍋",
    image: "",
    badge: "hot",
    active: true,
  },
  {
    id: 11,
    name: "TOBACCO GOLD",
    category: "Tabaco",
    price: 11.99,
    stock: 7,
    desc: "Tabaco suave dorado. Para los que buscan un sabor clásico.",
    details: ["5000 puffs", "3% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "🚬",
    image: "",
    badge: "",
    active: true,
  },
  {
    id: 12,
    name: "ENERGY DRINK",
    category: "Exótico",
    price: 14.99,
    stock: 14,
    desc: "El sabor de tu bebida energética favorita. Despierta tus sentidos.",
    details: ["7000 puffs", "5% Nicotina", "Sin carga", "Listo para usar"],
    emoji: "⚡",
    image: "",
    badge: "new",
    active: true,
  },
];

// ─── CATEGORÍAS ──────────────────────────────────────────────
// Estas se generan automáticamente desde los productos,
// pero puedes personalizar el orden aquí.
const CATEGORIES = ["Frutal", "Mentol", "Dulce", "Exótico", "Tabaco"];
