// ============================================================
//  VAPEZONE — LÓGICA PRINCIPAL DE LA TIENDA
// ============================================================

// ─── ESTADO DEL CARRITO ──────────────────────────────────────
let cart = [];
let modalProductId = null;
let modalQty = 1;

// ─── INICIALIZACIÓN ──────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  initCursor();
  initNavbarScroll();
  renderFilters();
  renderProducts("all");
  initScrollAnimations();
  loadCartFromStorage();
});

// ─── PARTÍCULAS ──────────────────────────────────────────────
function initParticles() {
  const container = document.getElementById("particles");
  const count = 30;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = (8 + Math.random() * 12) + "s";
    p.style.animationDelay = (Math.random() * 10) + "s";
    p.style.width = p.style.height = (2 + Math.random() * 4) + "px";
    p.style.opacity = Math.random() * 0.6;
    container.appendChild(p);
  }
}

// ─── CURSOR PERSONALIZADO ────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById("cursor");
  const trail = document.getElementById("cursorTrail");

  let trailX = 0, trailY = 0;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    // Trail con delay
    setTimeout(() => {
      trailX = e.clientX;
      trailY = e.clientY;
      trail.style.left = trailX + "px";
      trail.style.top = trailY + "px";
    }, 80);
  });

  document.querySelectorAll("button, a, .product-card, .nav-cart").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
      cursor.style.background = "var(--accent)";
      trail.style.opacity = "0.8";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursor.style.background = "var(--primary)";
      trail.style.opacity = "0.4";
    });
  });
}

// ─── NAVBAR SCROLL ───────────────────────────────────────────
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

// ─── FILTROS ─────────────────────────────────────────────────
function renderFilters() {
  const filtersContainer = document.getElementById("filters");
  const categories = [...new Set(PRODUCTS.filter(p => p.active).map(p => p.category))];

  filtersContainer.innerHTML = `<button class="filter-btn active" data-filter="all">Todos</button>`;

  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.filter = cat;
    btn.textContent = cat;
    filtersContainer.appendChild(btn);
  });

  filtersContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
}

// ─── RENDER DE PRODUCTOS ─────────────────────────────────────
function renderProducts(filter) {
  const grid = document.getElementById("productsGrid");
  const products = PRODUCTS.filter(p => {
    if (!p.active) return false;
    if (filter === "all") return true;
    return p.category === filter;
  });

  grid.innerHTML = "";

  if (products.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 3rem;">
      No hay productos en esta categoría 😕
    </div>`;
    return;
  }

  products.forEach((product, i) => {
    const card = createProductCard(product);
    card.style.animationDelay = (i * 0.07) + "s";
    card.style.animation = "fadeSlideUp 0.6s ease both";
    grid.appendChild(card);
  });
}

function createProductCard(product) {
  const outOfStock = product.stock === 0;

  const card = document.createElement("div");
  card.className = `product-card ${outOfStock ? "out-of-stock" : ""}`;

  let badgeHTML = "";
  if (outOfStock) {
    badgeHTML = `<div class="product-badge out">Sin Stock</div>`;
  } else if (product.badge) {
    const badgeLabels = { new: "NUEVO", hot: "🔥 TOP" };
    badgeHTML = `<div class="product-badge ${product.badge}">${badgeLabels[product.badge] || product.badge.toUpperCase()}</div>`;
  }

  const imageContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"/>
       <div class="emoji-placeholder" style="display:none">${product.emoji}</div>`
    : `<div class="emoji-placeholder">${product.emoji}</div>`;

  card.innerHTML = `
    ${badgeHTML}
    <div class="product-image">
      ${imageContent}
      <div class="product-glow"></div>
    </div>
    <div class="product-info">
      <div class="product-category">${product.category}</div>
      <div class="product-name">${product.name}</div>
      <div class="product-desc">${product.desc}</div>
      <div class="product-footer">
        <div>
          <div class="product-price">${STORE_CONFIG.currency}${product.price.toFixed(2)}</div>
          <div class="product-stock">${outOfStock ? "Sin stock" : `${product.stock} disponibles`}</div>
        </div>
        ${!outOfStock
          ? `<button class="add-cart-btn" onclick="addToCartDirect(event, ${product.id})">+ Agregar</button>`
          : ``
        }
      </div>
    </div>
  `;

  if (!outOfStock) {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".add-cart-btn")) return;
      openModal(product.id);
    });
  }

  return card;
}

// ─── MODAL DE PRODUCTO ───────────────────────────────────────
function openModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  modalProductId = productId;
  modalQty = 1;

  const imageContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none'">`
    : product.emoji;

  const detailTags = product.details
    .map(d => `<span class="detail-tag">${d}</span>`)
    .join("");

  document.getElementById("modalContent").innerHTML = `
    <div class="modal-image">${imageContent}</div>
    <div class="modal-body">
      <div class="modal-category">${product.category}</div>
      <div class="modal-name">${product.name}</div>
      <div class="modal-desc">${product.desc}</div>
      <div class="modal-details">${detailTags}</div>
      <div class="modal-price-row">
        <div class="modal-price">${STORE_CONFIG.currency}${product.price.toFixed(2)}</div>
        <div class="modal-stock">Stock: ${product.stock} uds.</div>
      </div>
      <div class="modal-qty">
        <button class="modal-qty-btn" onclick="changeModalQty(-1)">−</button>
        <div class="modal-qty-num" id="modalQtyNum">1</div>
        <button class="modal-qty-btn" onclick="changeModalQty(1)">+</button>
        <span style="color:var(--text-muted);font-size:0.85rem">= ${STORE_CONFIG.currency}<span id="modalSubtotal">${product.price.toFixed(2)}</span></span>
      </div>
      <button class="btn-primary" style="width:100%;justify-content:center" onclick="addToCartFromModal()">
        Agregar al carrito
      </button>
    </div>
  `;

  document.getElementById("modalOverlay").classList.add("active");
  document.getElementById("productModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  document.getElementById("productModal").classList.remove("active");
  document.body.style.overflow = "";
  modalProductId = null;
  modalQty = 1;
}

function changeModalQty(delta) {
  const product = PRODUCTS.find(p => p.id === modalProductId);
  if (!product) return;
  modalQty = Math.max(1, Math.min(product.stock, modalQty + delta));
  document.getElementById("modalQtyNum").textContent = modalQty;
  document.getElementById("modalSubtotal").textContent = (product.price * modalQty).toFixed(2);
}

function addToCartFromModal() {
  if (!modalProductId) return;
  addToCart(modalProductId, modalQty);
  closeModal();
}

// ─── CARRITO ─────────────────────────────────────────────────
function addToCartDirect(e, productId) {
  e.stopPropagation();
  addToCart(productId, 1);
}

function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || product.stock === 0) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    const newQty = Math.min(existing.qty + qty, product.stock);
    existing.qty = newQty;
  } else {
    cart.push({ id: productId, qty: Math.min(qty, product.stock) });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`✦ ${product.name} agregado al carrito`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
}

function changeCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  const product = PRODUCTS.find(p => p.id === productId);
  if (!item || !product) return;

  item.qty = Math.max(0, Math.min(item.qty + delta, product.stock));
  if (item.qty === 0) {
    removeFromCart(productId);
    return;
  }

  saveCartToStorage();
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById("cartBadge");
  const itemsContainer = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartFooter = document.getElementById("cartFooter");
  const cartTotal = document.getElementById("cartTotal");

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = totalItems;

  if (cart.length === 0) {
    cartEmpty.style.display = "flex";
    cartFooter.style.display = "none";
    itemsContainer.innerHTML = "";
    itemsContainer.appendChild(cartEmpty);
    return;
  }

  cartEmpty.style.display = "none";
  cartFooter.style.display = "block";

  // Render items
  itemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;

    const subtotal = product.price * item.qty;
    total += subtotal;

    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <div class="cart-item-emoji">${product.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${product.name}</div>
        <div class="cart-item-price">${STORE_CONFIG.currency}${subtotal.toFixed(2)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeCartQty(${product.id}, -1)">−</button>
        <span class="qty-display">${item.qty}</span>
        <button class="qty-btn" onclick="changeCartQty(${product.id}, 1)">+</button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${product.id})" title="Eliminar">✕</button>
    `;
    itemsContainer.appendChild(el);
  });

  cartTotal.textContent = `${STORE_CONFIG.currency}${total.toFixed(2)}`;
}

function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  const isOpen = sidebar.classList.contains("active");

  sidebar.classList.toggle("active", !isOpen);
  overlay.classList.toggle("active", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
}

// ─── WHATSAPP ────────────────────────────────────────────────
function sendToWhatsApp() {
  if (cart.length === 0) return;

  const lines = [`${STORE_CONFIG.greeting}\n`];
  lines.push("📋 *DETALLE DEL PEDIDO:*");

  let total = 0;
  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;
    const subtotal = product.price * item.qty;
    total += subtotal;
    lines.push(`• ${product.emoji} *${product.name}* × ${item.qty} = ${STORE_CONFIG.currency}${subtotal.toFixed(2)}`);
  });

  lines.push(`\n💰 *TOTAL: ${STORE_CONFIG.currency}${total.toFixed(2)}*`);
  lines.push("\n📍 Por favor indícame tu dirección de entrega.");

  const message = encodeURIComponent(lines.join("\n"));
  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${message}`;

  window.open(url, "_blank");
}

// ─── PERSISTENCIA DEL CARRITO ────────────────────────────────
function saveCartToStorage() {
  try {
    localStorage.setItem("vapezone_cart", JSON.stringify(cart));
  } catch (e) {}
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("vapezone_cart");
    if (saved) {
      cart = JSON.parse(saved);
      updateCartUI();
    }
  } catch (e) {
    cart = [];
  }
}

// ─── TOAST ───────────────────────────────────────────────────
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ─── ANIMACIONES DE SCROLL ───────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".about-card, .stat").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ─── TECLADO ─────────────────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    const sidebar = document.getElementById("cartSidebar");
    if (sidebar.classList.contains("active")) toggleCart();
  }
});
