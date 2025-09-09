// Base de datos de productos
const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    category: "lifestyle",
    price: 150,
    originalPrice: 180,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "La Nike Air Max 270 combina un diseño futurista con la máxima comodidad. Perfecta para el uso diario.",
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    colors: ["#000000", "#ffffff", "#ff6900", "#0066cc"],
    badge: "Nuevo",
    featured: true
  },
  {
    id: 2,
    name: "Nike Air Jordan 1 Retro High",
    category: "basketball",
    price: 170,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Un clásico atemporal. Las Air Jordan 1 definen el estilo streetwear desde 1985.",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "11", "12"],
    colors: ["#dc143c", "#000000", "#ffffff"],
    badge: "Clásico",
    featured: true
  },
  {
    id: 3,
    name: "Nike React Infinity Run",
    category: "running",
    price: 160,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Diseñadas para ayudarte a correr más kilómetros con menos lesiones.",
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    colors: ["#000000", "#ff6900", "#0066cc", "#22c55e"],
    badge: null,
    featured: false
  },
  {
    id: 4,
    name: "Nike Dunk Low",
    category: "lifestyle",
    price: 100,
    originalPrice: 120,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "El icónico diseño de baloncesto universitario ahora en las calles.",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    colors: ["#ffffff", "#000000", "#dc143c", "#0066cc"],
    badge: "Oferta",
    featured: false
  },
  {
    id: 5,
    name: "Nike Mercurial Vapor 14",
    category: "football",
    price: 250,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Velocidad pura en cada jugada. Para los jugadores más explosivos.",
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    colors: ["#ff6900", "#000000", "#ffffff", "#22c55e"],
    badge: "Pro",
    featured: true
  },
  {
    id: 6,
    name: "Nike Metcon 7",
    category: "training",
    price: 130,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "La estabilidad y durabilidad que necesitas para tus entrenamientos más intensos.",
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
    colors: ["#000000", "#dc143c", "#0066cc"],
    badge: null,
    featured: false
  },
  {
    id: 7,
    name: "Nike Air Force 1 '07",
    category: "lifestyle",
    price: 90,
    originalPrice: 110,
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "El original que sigue siendo icónico. Un clásico que nunca pasa de moda.",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
    colors: ["#ffffff", "#000000", "#dc143c"],
    badge: "Bestseller",
    featured: true
  },
  {
    id: 8,
    name: "Nike ZoomX Vaporfly",
    category: "running",
    price: 280,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "La tecnología de running más avanzada para runners elite.",
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    colors: ["#ff6900", "#000000", "#22c55e"],
    badge: "Elite",
    featured: false
  },
  {
    id: 9,
    name: "Nike Blazer Mid '77",
    category: "lifestyle",
    price: 100,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "El estilo vintage de baloncesto que conquista las calles modernas.",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "11"],
    colors: ["#ffffff", "#000000", "#dc143c", "#0066cc"],
    badge: null,
    featured: false
  },
  {
    id: 10,
    name: "Nike Kyrie 8",
    category: "basketball",
    price: 140,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1552066344-2464c1135c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "Control total en cada movimiento. Diseñadas para el juego más creativo.",
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
    colors: ["#000000", "#ff6900", "#dc143c", "#0066cc"],
    badge: "Signature",
    featured: false
  },
  {
    id: 11,
    name: "Nike Pegasus 39",
    category: "running",
    price: 130,
    originalPrice: 150,
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "El caballo de batalla confiable para cada corredor, cada día.",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    colors: ["#000000", "#0066cc", "#22c55e", "#ff6900"],
    badge: "Popular",
    featured: false
  },
  {
    id: 12,
    name: "Nike SB Dunk Low Pro",
    category: "lifestyle",
    price: 95,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    description: "El ADN del skateboarding con el estilo urbano más auténtico.",
    sizes: ["7", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    colors: ["#000000", "#ffffff", "#dc143c"],
    badge: "SB",
    featured: false
  }
];

// Estado de la aplicación
let filteredProducts = [...products];
let displayedProducts = [];
let currentPage = 1;
const productsPerPage = 8;
let cart = [];

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const sizeFilter = document.getElementById('sizeFilter');
const clearFilters = document.getElementById('clearFilters');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const resultsCount = document.getElementById('resultsCount');
const cartCount = document.getElementById('cartCount');
const cartBtn = document.getElementById('cartBtn');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

// Modal elements
const productModal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const sizeOptions = document.getElementById('sizeOptions');
const colorOptions = document.getElementById('colorOptions');
const addToCartBtn = document.getElementById('addToCartBtn');
const wishlistBtn = document.getElementById('wishlistBtn');

let selectedProduct = null;
let selectedSize = null;
let selectedColor = null;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  loadProducts();
  setupEventListeners();
  updateCartCount();
}

// Event Listeners
function setupEventListeners() {
  // Búsqueda
  searchInput.addEventListener('input', debounce(handleSearch, 300));
  
  // Filtros
  categoryFilter.addEventListener('change', applyFilters);
  priceFilter.addEventListener('change', applyFilters);
  sizeFilter.addEventListener('change', applyFilters);
  clearFilters.addEventListener('click', clearAllFilters);
  
  // Cargar más productos
  loadMoreBtn.addEventListener('click', loadMoreProducts);
  
  // Menu móvil
  menuToggle.addEventListener('click', toggleMobileMenu);
  
  // Modal
  modalClose.addEventListener('click', closeModal);
  productModal.addEventListener('click', function(e) {
    if (e.target === productModal) {
      closeModal();
    }
  });
  
  // Carrito
  addToCartBtn.addEventListener('click', addToCart);
  cartBtn.addEventListener('click', showCart);
  
  // Wishlist
  wishlistBtn.addEventListener('click', toggleWishlist);
  
  // Cerrar modal con ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && productModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Funciones de productos
function loadProducts() {
  filteredProducts = [...products];
  displayedProducts = filteredProducts.slice(0, productsPerPage);
  renderProducts();
  updateResultsCount();
  toggleLoadMoreButton();
}

function renderProducts() {
  if (displayedProducts.length === 0) {
    productsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
        <h3>No se encontraron productos</h3>
        <p>Intenta ajustar los filtros de búsqueda</p>
      </div>
    `;
    return;
  }

  productsGrid.innerHTML = displayedProducts.map(product => `
    <div class="product-card fade-in" data-product-id="${product.id}" onclick="openProductModal(${product.id})">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${getCategoryName(product.category)}</p>
        <div class="product-price">
          $${product.price}
          ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function getCategoryName(category) {
  const categoryNames = {
    'running': 'Running',
    'basketball': 'Basketball',
    'lifestyle': 'Lifestyle',
    'football': 'Football',
    'training': 'Training'
  };
  return categoryNames[category] || category;
}

// Búsqueda
function handleSearch() {
  const query = searchInput.value.toLowerCase().trim();
  if (query) {
    filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      getCategoryName(product.category).toLowerCase().includes(query)
    );
  } else {
    applyFilters();
    return;
  }
  
  resetPagination();
  renderProducts();
  updateResultsCount();
  toggleLoadMoreButton();
}

// Filtros
function applyFilters() {
  filteredProducts = products.filter(product => {
    const categoryMatch = !categoryFilter.value || product.category === categoryFilter.value;
    const priceMatch = checkPriceFilter(product.price);
    const sizeMatch = !sizeFilter.value || product.sizes.includes(sizeFilter.value);
    const searchMatch = !searchInput.value || 
      product.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      product.category.toLowerCase().includes(searchInput.value.toLowerCase());
    
    return categoryMatch && priceMatch && sizeMatch && searchMatch;
  });
  
  resetPagination();
  renderProducts();
  updateResultsCount();
  toggleLoadMoreButton();
}

function checkPriceFilter(price) {
  const priceValue = priceFilter.value;
  if (!priceValue) return true;
  
  switch (priceValue) {
    case '0-100':
      return price >= 0 && price <= 100;
    case '100-150':
      return price > 100 && price <= 150;
    case '150-200':
      return price > 150 && price <= 200;
    case '200+':
      return price > 200;
    default:
      return true;
  }
}

function clearAllFilters() {
  searchInput.value = '';
  categoryFilter.value = '';
  priceFilter.value = '';
  sizeFilter.value = '';
  
  filteredProducts = [...products];
  resetPagination();
  renderProducts();
  updateResultsCount();
  toggleLoadMoreButton();
}

// Paginación
function loadMoreProducts() {
  const startIndex = displayedProducts.length;
  const endIndex = startIndex + productsPerPage;
  const newProducts = filteredProducts.slice(startIndex, endIndex);
  
  displayedProducts = [...displayedProducts, ...newProducts];
  renderProducts();
  toggleLoadMoreButton();
}

function resetPagination() {
  currentPage = 1;
  displayedProducts = filteredProducts.slice(0, productsPerPage);
}

function toggleLoadMoreButton() {
  const hasMoreProducts = displayedProducts.length < filteredProducts.length;
  loadMoreBtn.style.display = hasMoreProducts ? 'block' : 'none';
}

function updateResultsCount() {
  const total = filteredProducts.length;
  const showing = Math.min(displayedProducts.length, total);
  resultsCount.textContent = `Mostrando ${showing} de ${total} productos`;
}

// Modal de producto
function openProductModal(productId) {
  selectedProduct = products.find(p => p.id === productId);
  if (!selectedProduct) return;
  
  modalImage.src = selectedProduct.image;
  modalImage.alt = selectedProduct.name;
  modalTitle.textContent = selectedProduct.name;
  modalPrice.textContent = `$${selectedProduct.price}`;
  modalDescription.textContent = selectedProduct.description;
  
  // Renderizar tallas
  sizeOptions.innerHTML = selectedProduct.sizes.map(size => `
    <div class="size-option" data-size="${size}" onclick="selectSize('${size}')">
      ${size}
    </div>
  `).join('');
  
  // Renderizar colores
  colorOptions.innerHTML = selectedProduct.colors.map(color => `
    <div class="color-option" 
         style="background-color: ${color}" 
         data-color="${color}" 
         onclick="selectColor('${color}')">
    </div>
  `).join('');
  
  // Reset selections
  selectedSize = null;
  selectedColor = null;
  
  productModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  productModal.classList.remove('active');
  document.body.style.overflow = 'auto';
  selectedProduct = null;
  selectedSize = null;
  selectedColor = null;
}

function selectSize(size) {
  selectedSize = size;
  document.querySelectorAll('.size-option').forEach(option => {
    option.classList.remove('selected');
  });
  document.querySelector(`[data-size="${size}"]`).classList.add('selected');
}

function selectColor(color) {
  selectedColor = color;
  document.querySelectorAll('.color-option').forEach(option => {
    option.classList.remove('selected');
  });
  document.querySelector(`[data-color="${color}"]`).classList.add('selected');
}

// Carrito de compras
function addToCart() {
  if (!selectedProduct) return;
  
  if (!selectedSize) {
    alert('Por favor selecciona una talla');
    return;
  }
  
  const cartItem = {
    id: Date.now(),
    productId: selectedProduct.id,
    name: selectedProduct.name,
    price: selectedProduct.price,
    size: selectedSize,
    color: selectedColor || selectedProduct.colors[0],
    image: selectedProduct.image,
    quantity: 1
  };
  
  cart.push(cartItem);
  updateCartCount();
  closeModal();
  
  showNotification('Producto agregado al carrito', 'success');
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function showCart() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  const cartHTML = `
    <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 3000; display: flex; align-items: center; justify-content: center;">
      <div style="background: white; padding: 2rem; border-radius: 16px; max-width: 500px; max-height: 80vh; overflow-y: auto;">
        <h3 style="margin-bottom: 1rem;">Carrito de Compras</h3>
        ${cart.map(item => `
          <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid #eee;">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
            <div style="flex: 1;">
              <h4 style="margin: 0; font-size: 0.9rem;">${item.name}</h4>
              <p style="margin: 0; font-size: 0.8rem; color: #666;">Talla: ${item.size}</p>
              <p style="margin: 0; font-weight: bold;">$${item.price}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: #ff4444; color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer;">×</button>
          </div>
        `).join('')}
        <div style="margin-top: 1rem; text-align: right;">
          <h3>Total: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</h3>
          <button onclick="closeCart()" style="background: #111; color: white; padding: 1rem 2rem; border: none; border-radius: 8px; cursor: pointer; margin-right: 1rem;">Cerrar</button>
          <button onclick="checkout()" style="background: #ff6900; color: white; padding: 1rem 2rem; border: none; border-radius: 8px; cursor: pointer;">Checkout</button>
        </div>
      </div>
    </div>
  `;
  
  const cartModal = document.createElement('div');
  cartModal.innerHTML = cartHTML;
  cartModal.id = 'cartModal';
  document.body.appendChild(cartModal);
  document.body.style.overflow = 'hidden';
}

function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCartCount();
  closeCart();
  if (cart.length > 0) {
    showCart();
  }
}

function closeCart() {
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.remove();
    document.body.style.overflow = 'auto';
  }
}

function checkout() {
  alert('¡Gracias por tu compra! Serás redirigido al checkout.');
  closeCart();
  cart = [];
  updateCartCount();
}

// Wishlist
function toggleWishlist() {
  if (!selectedProduct) return;
  
  const isWishlisted = wishlistBtn.style.color === 'rgb(255, 105, 0)';
  wishlistBtn.style.color = isWishlisted ? '' : '#ff6900';
  
  const message = isWishlisted ? 'Removido de favoritos' : 'Agregado a favoritos';
  showNotification(message, 'info');
}

// Menu móvil
function toggleMobileMenu() {
  navMenu.classList.toggle('active');
}

// Utilidades
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#0066cc'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 4000;
    animation: slideIn 0.3s ease-out;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Agregar CSS para animaciones de notificación
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Lazy loading para imágenes (optimización adicional)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  // Se aplicará cuando se rendericen nuevas imágenes
  function observeImages() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
}