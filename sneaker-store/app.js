// Datos de la aplicación
const appData = {
  productos: [
    {
      id: 1,
      codigo: "NK001",
      nombre: "Nike Air Max 270",
      descripcion: "Zapatillas deportivas con tecnología Air Max para máximo confort y estilo urbano.",
      precio: 89990,
      stock: 15,
      stockCritico: 5,
      categoria: "Deportivas",
      imagen: "nike-air-max-270.jpg"
    },
    {
      id: 2,
      codigo: "AD001", 
      nombre: "Adidas Ultraboost 22",
      descripcion: "Zapatillas de running con tecnología Boost para mayor retorno de energía.",
      precio: 129990,
      stock: 8,
      stockCritico: 5,
      categoria: "Running",
      imagen: "adidas-ultraboost.jpg"
    },
    {
      id: 3,
      codigo: "CJ001",
      nombre: "Converse Chuck Taylor",
      descripcion: "Clásicas zapatillas de lona, perfectas para uso casual y estilo atemporal.",
      precio: 45990,
      stock: 25,
      stockCritico: 10,
      categoria: "Casual", 
      imagen: "converse-chuck-taylor.jpg"
    },
    {
      id: 4,
      codigo: "VN001",
      nombre: "Vans Old Skool",
      descripcion: "Zapatillas icónicas de skate con suela de goma resistente y diseño clásico.",
      precio: 59990,
      stock: 12,
      stockCritico: 5,
      categoria: "Skate",
      imagen: "vans-old-skool.jpg"
    },
    {
      id: 5,
      codigo: "PU001",
      nombre: "Puma RS-X",
      descripcion: "Zapatillas retro-futuristas con diseño llamativo y máximo confort.",
      precio: 79990,
      stock: 6,
      stockCritico: 5,
      categoria: "Lifestyle",
      imagen: "puma-rsx.jpg"
    },
    {
      id: 6,
      codigo: "NB001",
      nombre: "New Balance 574",
      descripcion: "Zapatillas versátiles con equilibrio perfecto entre estilo y comodidad.",
      precio: 69990,
      stock: 18,
      stockCritico: 8,
      categoria: "Casual",
      imagen: "new-balance-574.jpg"
    },
    {
      id: 7,
      codigo: "JD001",
      nombre: "Jordan 1 Retro High",
      descripcion: "Zapatillas de básquetbol legendarias con diseño icónico y premium.",
      precio: 149990,
      stock: 4,
      stockCritico: 3,
      categoria: "Basketball",
      imagen: "jordan-1-retro.jpg"
    },
    {
      id: 8,
      codigo: "RB001",
      nombre: "Reebok Classic",
      descripcion: "Zapatillas retro con estilo clásico y comodidad excepcional.",
      precio: 55990,
      stock: 20,
      stockCritico: 8,
      categoria: "Retro",
      imagen: "reebok-classic.jpg"
    }
  ],
  regiones: [
    {
      id: 1,
      nombre: "Región de Arica y Parinacota",
      comunas: ["Arica", "Camarones", "Putre", "General Lagos"]
    },
    {
      id: 2,
      nombre: "Región de Tarapacá", 
      comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]
    },
    {
      id: 3,
      nombre: "Región de Antofagasta",
      comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]
    },
    {
      id: 13,
      nombre: "Región Metropolitana de Santiago",
      comunas: ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura"]
    },
    {
      id: 10,
      nombre: "Región de Los Lagos",
      comunas: ["Puerto Montt", "Castro", "Ancud", "Osorno", "Puerto Varas", "Frutillar", "Llanquihue", "Fresia", "Los Muermos", "Maullín", "Calbuco", "Cochamó", "Puqueldón", "Quinchao", "Curaco de Vélez", "Dalcahue", "Queilén", "Quellón", "Quemchi", "Chonchi"]
    }
  ],
  blogs: [
    {
      id: 1,
      titulo: "Las Tendencias de Zapatillas 2025",
      descripcionCorta: "Descubre cuáles serán las zapatillas más populares este año.",
      descripcionLarga: "El mundo de las zapatillas está en constante evolución. En 2025, veremos un retorno a los diseños clásicos combinados con tecnología moderna. Las zapatillas chunky siguen siendo populares, pero con materiales más sustentables. Las colaboraciones entre marcas y diseñadores continúan marcando tendencia, especialmente en el segmento lifestyle. La personalización también toma protagonismo, permitiendo a los usuarios crear diseños únicos.",
      imagen: "blog-tendencias-2025.jpg"
    },
    {
      id: 2,
      titulo: "Cómo Cuidar tus Zapatillas Premium",
      descripcionCorta: "Consejos profesionales para mantener tus zapatillas como nuevas.",
      descripcionLarga: "Invertir en zapatillas premium requiere cuidados especiales. Primero, usa protectores antes del primer uso. Para la limpieza diaria, utiliza un cepillo suave y productos específicos según el material. Las zapatillas de cuero necesitan acondicionador, mientras que las de mesh requieren secado natural. Rota tu calzado para evitar desgaste excesivo. Guárdalas en lugares secos con hormas para mantener su forma original.",
      imagen: "blog-cuidado-zapatillas.jpg"
    }
  ]
};

// Estado de la aplicación
let currentUser = null;
let cart = [];
let currentEditingUser = null;
let currentEditingProduct = null;

// Funciones de navegación - Definidas globalmente
function showSection(sectionId) {
  console.log('Showing section:', sectionId);
  
  // Ocultar todas las secciones
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Mostrar la sección seleccionada
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
    console.log('Section shown:', sectionId);
  } else {
    console.error('Section not found:', sectionId);
  }

  // Cargar contenido específico de la sección
  if (sectionId === 'admin') {
    loadAdminData();
  } else if (sectionId === 'carrito') {
    displayCart();
  }
}

function showAdminSection(sectionId) {
  const sections = document.querySelectorAll('.admin-section');
  sections.forEach(section => section.classList.remove('active'));
  
  const navItems = document.querySelectorAll('.admin-nav-item');
  navItems.forEach(item => item.classList.remove('active'));
  
  const targetSection = document.getElementById(`admin-${sectionId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }
  
  // Encontrar y activar el botón correspondiente
  const targetButton = Array.from(navItems).find(item => {
    const text = item.textContent.toLowerCase();
    return text.includes(sectionId.toLowerCase()) || 
           (sectionId === 'dashboard' && text.includes('dashboard'));
  });
  
  if (targetButton) {
    targetButton.classList.add('active');
  }
  
  if (sectionId === 'users') {
    loadUsersTable();
  } else if (sectionId === 'products') {
    loadProductsTable();
  }
}

// Validaciones
function validateRUN(run) {
  const cleanRun = run.replace(/[.-]/g, '');
  
  if (cleanRun.length < 7 || cleanRun.length > 9) {
    return false;
  }
  
  if (!/^\d+$/.test(cleanRun)) {
    return false;
  }
  
  // Validación matemática del RUN
  const runDigits = cleanRun.slice(0, -1);
  const dv = cleanRun.slice(-1);
  
  let sum = 0;
  let multiplier = 2;
  
  for (let i = runDigits.length - 1; i >= 0; i--) {
    sum += parseInt(runDigits[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const remainder = sum % 11;
  const calculatedDV = remainder === 0 ? '0' : remainder === 1 ? 'K' : (11 - remainder).toString();
  
  return dv.toUpperCase() === calculatedDV.toUpperCase();
}

function validateEmail(email) {
  const allowedDomains = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  return allowedDomains.some(domain => email.endsWith(domain));
}

function validatePassword(password) {
  return password.length >= 4 && password.length <= 10;
}

function validateName(name, maxLength) {
  return name.length > 0 && name.length <= maxLength;
}

// Gestión de productos
function displayFeaturedProducts() {
  const container = document.getElementById('featuredProductsGrid');
  if (!container) return;
  
  const featuredProducts = appData.productos.slice(0, 6);
  container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

function displayAllProducts() {
  const container = document.getElementById('productsGrid');
  if (!container) return;
  
  container.innerHTML = appData.productos.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
  const stockStatus = getStockStatus(product);
  return `
    <div class="product-card" onclick="showProductDetail(${product.id})">
      <div class="product-image">${product.nombre}</div>
      <div class="product-info">
        <h4>${product.nombre}</h4>
        <p>${product.descripcion}</p>
        <div class="product-price">$${product.precio.toLocaleString('es-CL')}</div>
        <div class="stock-info">
          <span class="stock-status ${stockStatus.class}">${stockStatus.text}</span>
        </div>
        <div class="product-actions">
          <button class="btn btn--primary btn--sm" onclick="addToCart(${product.id}, event)">Agregar al Carrito</button>
          <button class="btn btn--outline btn--sm" onclick="showProductDetail(${product.id})">Ver Detalles</button>
        </div>
      </div>
    </div>
  `;
}

function getStockStatus(product) {
  if (product.stock > product.stockCritico) {
    return { class: 'high', text: `En stock (${product.stock})` };
  } else if (product.stock > 0) {
    return { class: 'low', text: `Poco stock (${product.stock})` };
  } else {
    return { class: 'low', text: 'Agotado' };
  }
}

function showProductDetail(productId) {
  const product = appData.productos.find(p => p.id === productId);
  if (!product) return;
  
  const container = document.getElementById('productDetailContent');
  const stockStatus = getStockStatus(product);
  
  container.innerHTML = `
    <div class="product-detail-image">${product.nombre}</div>
    <div class="product-detail-info">
      <button class="btn btn--outline btn--sm mb-16" onclick="showSection('productos')">← Volver a Productos</button>
      <h2>${product.nombre}</h2>
      <p><strong>Código:</strong> ${product.codigo}</p>
      <p><strong>Categoría:</strong> ${product.categoria}</p>
      <div class="product-detail-price">$${product.precio.toLocaleString('es-CL')}</div>
      <div class="stock-info">
        <span class="stock-status ${stockStatus.class}">${stockStatus.text}</span>
      </div>
      <div class="product-detail-description">
        <p>${product.descripcion}</p>
      </div>
      <button class="btn btn--primary btn--lg" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
        ${product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
      </button>
    </div>
  `;
  
  showSection('producto-detalle');
}

function filterProducts() {
  const categoryFilter = document.getElementById('categoryFilter');
  if (!categoryFilter) return;
  
  const container = document.getElementById('productsGrid');
  if (!container) return;
  
  let filteredProducts = appData.productos;
  if (categoryFilter.value) {
    filteredProducts = appData.productos.filter(p => p.categoria === categoryFilter.value);
  }
  
  container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
}

function loadCategoriesFilter() {
  const select = document.getElementById('categoryFilter');
  if (!select) return;
  
  const categories = [...new Set(appData.productos.map(p => p.categoria))];
  
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

// Gestión del carrito
function addToCart(productId, event) {
  if (event) {
    event.stopPropagation();
  }
  
  const product = appData.productos.find(p => p.id === productId);
  if (!product || product.stock === 0) {
    alert('Producto no disponible');
    return;
  }
  
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    if (existingItem.quantity < product.stock) {
      existingItem.quantity++;
    } else {
      alert('No hay más stock disponible');
      return;
    }
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  saveCart();
  updateCartCount();
  alert('Producto agregado al carrito');
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  displayCart();
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;
  
  const product = appData.productos.find(p => p.id === productId);
  const newQuantity = item.quantity + change;
  
  if (newQuantity <= 0) {
    removeFromCart(productId);
  } else if (newQuantity <= product.stock) {
    item.quantity = newQuantity;
    saveCart();
    updateCartCount();
    displayCart();
  } else {
    alert('No hay más stock disponible');
  }
}

function displayCart() {
  const itemsContainer = document.getElementById('cartItems');
  const summaryContainer = document.getElementById('cartSummary');
  
  if (!itemsContainer || !summaryContainer) return;
  
  if (cart.length === 0) {
    itemsContainer.innerHTML = '<div class="empty-cart"><h3>Tu carrito está vacío</h3><p>Agrega algunos productos para comenzar</p></div>';
    summaryContainer.innerHTML = '';
    return;
  }
  
  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">${item.nombre}</div>
      <div class="cart-item-info">
        <h4>${item.nombre}</h4>
        <p>$${item.precio.toLocaleString('es-CL')} c/u</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-actions">
        <p class="fw-bold">$${(item.precio * item.quantity).toLocaleString('es-CL')}</p>
        <button class="btn btn--danger btn--sm" onclick="removeFromCart(${item.id})">Eliminar</button>
      </div>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
  
  summaryContainer.innerHTML = `
    <h3>Resumen del Pedido</h3>
    <div class="cart-summary-items">
      ${cart.map(item => `
        <div class="flex justify-between">
          <span>${item.nombre} (${item.quantity})</span>
          <span>$${(item.precio * item.quantity).toLocaleString('es-CL')}</span>
        </div>
      `).join('')}
    </div>
    <div class="cart-total">Total: $${total.toLocaleString('es-CL')}</div>
    <button class="btn btn--primary btn--full-width">Proceder al Pago</button>
    <button class="btn btn--outline btn--full-width mt-8" onclick="clearCart()">Vaciar Carrito</button>
  `;
}

function clearCart() {
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    cart = [];
    saveCart();
    updateCartCount();
    displayCart();
  }
}

function updateCartCount() {
  const countElement = document.getElementById('cartCount');
  if (countElement) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.textContent = count;
  }
}

function saveCart() {
  try {
    window.cartData = cart;
  } catch (e) {
    console.log('No se puede guardar el carrito');
  }
}

function loadCart() {
  try {
    cart = window.cartData || [];
  } catch (e) {
    cart = [];
  }
}

// Autenticación de usuarios
function register() {
  const userData = {
    run: document.getElementById('registerRun').value,
    firstName: document.getElementById('registerFirstName').value,
    lastName: document.getElementById('registerLastName').value,
    email: document.getElementById('registerEmail').value,
    password: document.getElementById('registerPassword').value,
    region: document.getElementById('registerRegion').value,
    comuna: document.getElementById('registerComuna').value,
    address: document.getElementById('registerAddress').value,
    role: 'Cliente'
  };
  
  // Validaciones
  if (!validateRegisterForm(userData)) {
    return false;
  }
  
  // Verificar si el usuario ya existe
  const existingUsers = getUsers();
  if (existingUsers.find(user => user.email === userData.email || user.run === userData.run)) {
    alert('Ya existe un usuario con este email o RUN');
    return false;
  }
  
  // Guardar usuario
  userData.id = Date.now();
  existingUsers.push(userData);
  saveUsers(existingUsers);
  
  alert('Usuario registrado exitosamente');
  showSection('login');
  return true;
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  // Validar email
  if (!validateEmail(email)) {
    showError('loginEmailError', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
    return false;
  }
  
  const users = getUsers();
  
  // Usuario administrador por defecto
  if (email === 'admin@duoc.cl' && password === 'admin123') {
    currentUser = {
      id: 0,
      email: 'admin@duoc.cl',
      firstName: 'Administrador',
      lastName: 'Sistema',
      role: 'Administrador'
    };
    saveCurrentUser();
    updateUIForUser();
    alert('Bienvenido Administrador');
    showSection('home');
    return true;
  }
  
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    saveCurrentUser();
    updateUIForUser();
    alert(`Bienvenido ${user.firstName}`);
    showSection('home');
    return true;
  } else {
    showError('loginPasswordError', 'Credenciales incorrectas');
    return false;
  }
}

function logout() {
  currentUser = null;
  window.currentUserData = null;
  updateUIForUser();
  showSection('home');
  alert('Sesión cerrada');
}

function validateRegisterForm(userData) {
  let isValid = true;
  
  // Validar RUN
  if (!validateRUN(userData.run)) {
    showError('registerRunError', 'RUN inválido. Debe tener 7-9 dígitos sin puntos ni guión');
    isValid = false;
  } else {
    clearError('registerRunError');
  }
  
  // Validar nombre
  if (!validateName(userData.firstName, 50)) {
    showError('registerFirstNameError', 'Nombre requerido (máximo 50 caracteres)');
    isValid = false;
  } else {
    clearError('registerFirstNameError');
  }
  
  // Validar apellidos
  if (!validateName(userData.lastName, 100)) {
    showError('registerLastNameError', 'Apellidos requeridos (máximo 100 caracteres)');
    isValid = false;
  } else {
    clearError('registerLastNameError');
  }
  
  // Validar email
  if (!validateEmail(userData.email)) {
    showError('registerEmailError', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
    isValid = false;
  } else {
    clearError('registerEmailError');
  }
  
  // Validar contraseña
  if (!validatePassword(userData.password)) {
    showError('registerPasswordError', 'La contraseña debe tener entre 4 y 10 caracteres');
    isValid = false;
  } else {
    clearError('registerPasswordError');
  }
  
  // Validar región y comuna
  if (!userData.region) {
    showError('registerRegionError', 'Selecciona una región');
    isValid = false;
  } else {
    clearError('registerRegionError');
  }
  
  if (!userData.comuna) {
    showError('registerComunaError', 'Selecciona una comuna');
    isValid = false;
  } else {
    clearError('registerComunaError');
  }
  
  // Validar dirección
  if (!validateName(userData.address, 300)) {
    showError('registerAddressError', 'Dirección requerida (máximo 300 caracteres)');
    isValid = false;
  } else {
    clearError('registerAddressError');
  }
  
  return isValid;
}

function updateUIForUser() {
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const adminBtn = document.getElementById('adminBtn');
  
  if (currentUser) {
    loginBtn.classList.add('hidden');
    registerBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
    
    if (currentUser.role === 'Administrador') {
      adminBtn.classList.remove('hidden');
    } else {
      adminBtn.classList.add('hidden');
    }
  } else {
    loginBtn.classList.remove('hidden');
    registerBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
    adminBtn.classList.add('hidden');
  }
}

// Gestión de regiones y comunas
function loadRegions() {
  const select = document.getElementById('registerRegion');
  if (!select) return;
  
  appData.regiones.forEach(region => {
    const option = document.createElement('option');
    option.value = region.id;
    option.textContent = region.nombre;
    select.appendChild(option);
  });
}

function loadComunas() {
  const regionSelect = document.getElementById('registerRegion');
  const comunaSelect = document.getElementById('registerComuna');
  
  if (!regionSelect || !comunaSelect) return;
  
  comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';
  
  const selectedRegionId = parseInt(regionSelect.value);
  const region = appData.regiones.find(r => r.id === selectedRegionId);
  
  if (region) {
    region.comunas.forEach(comuna => {
      const option = document.createElement('option');
      option.value = comuna;
      option.textContent = comuna;
      comunaSelect.appendChild(option);
    });
  }
}

// Blogs
function displayBlogs() {
  const container = document.getElementById('blogsGrid');
  if (!container) return;
  
  container.innerHTML = appData.blogs.map(blog => `
    <div class="blog-card card" onclick="showBlogDetail(${blog.id})">
      <div class="blog-image">${blog.titulo}</div>
      <div class="card__body">
        <h4>${blog.titulo}</h4>
        <p>${blog.descripcionCorta}</p>
      </div>
    </div>
  `).join('');
}

function showBlogDetail(blogId) {
  const blog = appData.blogs.find(b => b.id === blogId);
  if (!blog) return;
  
  const container = document.getElementById('blogDetailContent');
  container.innerHTML = `
    <button class="btn btn--outline btn--sm mb-16" onclick="showSection('blogs')">← Volver a Blogs</button>
    <div class="blog-detail-image">${blog.titulo}</div>
    <h2>${blog.titulo}</h2>
    <p>${blog.descripcionLarga}</p>
  `;
  
  showSection('blog-detalle');
}

// Panel Administrativo
function loadAdminData() {
  const users = getUsers();
  const totalUsersElement = document.getElementById('totalUsers');
  const totalProductsElement = document.getElementById('totalProducts');
  
  if (totalUsersElement) totalUsersElement.textContent = users.length;
  if (totalProductsElement) totalProductsElement.textContent = appData.productos.length;
}

function loadUsersTable() {
  const container = document.getElementById('usersTable');
  if (!container) return;
  
  const users = getUsers();
  
  container.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>RUN</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr>
            <td>${user.run}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td class="table-actions">
              <button class="btn btn--outline btn--sm" onclick="editUser(${user.id})">Editar</button>
              <button class="btn btn--danger btn--sm" onclick="deleteUser(${user.id})">Eliminar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function loadProductsTable() {
  const container = document.getElementById('productsTable');
  if (!container) return;
  
  container.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${appData.productos.map(product => `
          <tr>
            <td>${product.codigo}</td>
            <td>${product.nombre}</td>
            <td>$${product.precio.toLocaleString('es-CL')}</td>
            <td>${product.stock}</td>
            <td>${product.categoria}</td>
            <td class="table-actions">
              <button class="btn btn--outline btn--sm" onclick="editProduct(${product.id})">Editar</button>
              <button class="btn btn--danger btn--sm" onclick="deleteProduct(${product.id})">Eliminar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Modales
function showUserForm(userId = null) {
  const modal = document.getElementById('userModal');
  const title = document.getElementById('userModalTitle');
  
  if (userId) {
    const user = getUsers().find(u => u.id === userId);
    title.textContent = 'Editar Usuario';
    document.getElementById('modalUserRun').value = user.run;
    document.getElementById('modalUserName').value = `${user.firstName} ${user.lastName}`;
    document.getElementById('modalUserEmail').value = user.email;
    document.getElementById('modalUserRole').value = user.role;
    currentEditingUser = userId;
  } else {
    title.textContent = 'Nuevo Usuario';
    document.getElementById('userModalForm').reset();
    currentEditingUser = null;
  }
  
  modal.classList.remove('hidden');
}

function closeUserModal() {
  document.getElementById('userModal').classList.add('hidden');
  currentEditingUser = null;
}

function showProductForm(productId = null) {
  const modal = document.getElementById('productModal');
  const title = document.getElementById('productModalTitle');
  
  if (productId) {
    const product = appData.productos.find(p => p.id === productId);
    title.textContent = 'Editar Producto';
    document.getElementById('modalProductCode').value = product.codigo;
    document.getElementById('modalProductName').value = product.nombre;
    document.getElementById('modalProductDescription').value = product.descripcion;
    document.getElementById('modalProductPrice').value = product.precio;
    document.getElementById('modalProductStock').value = product.stock;
    document.getElementById('modalProductCategory').value = product.categoria;
    currentEditingProduct = productId;
  } else {
    title.textContent = 'Nuevo Producto';
    document.getElementById('productModalForm').reset();
    currentEditingProduct = null;
  }
  
  modal.classList.remove('hidden');
}

function closeProductModal() {
  document.getElementById('productModal').classList.add('hidden');
  currentEditingProduct = null;
}

function editUser(userId) {
  showUserForm(userId);
}

function editProduct(productId) {
  showProductForm(productId);
}

function deleteUser(userId) {
  if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
    let users = getUsers();
    users = users.filter(u => u.id !== userId);
    saveUsers(users);
    loadUsersTable();
    loadAdminData();
  }
}

function deleteProduct(productId) {
  if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    const index = appData.productos.findIndex(p => p.id === productId);
    if (index > -1) {
      appData.productos.splice(index, 1);
      loadProductsTable();
      loadAdminData();
      displayAllProducts();
      displayFeaturedProducts();
    }
  }
}

// Utilidades
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
  }
}

function clearError(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = '';
  }
}

function getUsers() {
  return window.usersData || [];
}

function saveUsers(users) {
  window.usersData = users;
}

function saveCurrentUser() {
  window.currentUserData = currentUser;
}

function loadCurrentUser() {
  currentUser = window.currentUserData || null;
}

// Event Listeners
function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Formulario de registro
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      register();
    });
  }
  
  // Formulario de login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      login();
    });
  }
  
  // Formulario de contacto
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;
      
      let isValid = true;
      
      if (!validateName(name, 50)) {
        showError('contactNameError', 'Nombre requerido (máximo 50 caracteres)');
        isValid = false;
      } else {
        clearError('contactNameError');
      }
      
      if (!validateEmail(email)) {
        showError('contactEmailError', 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
        isValid = false;
      } else {
        clearError('contactEmailError');
      }
      
      if (message.length === 0 || message.length > 500) {
        showError('contactMessageError', 'Mensaje requerido (máximo 500 caracteres)');
        isValid = false;
      } else {
        clearError('contactMessageError');
      }
      
      if (isValid) {
        alert('Mensaje enviado correctamente');
        this.reset();
      }
    });
  }
  
  // Modal de usuario
  const userModalForm = document.getElementById('userModalForm');
  if (userModalForm) {
    userModalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        run: document.getElementById('modalUserRun').value,
        name: document.getElementById('modalUserName').value,
        email: document.getElementById('modalUserEmail').value,
        role: document.getElementById('modalUserRole').value
      };
      
      const users = getUsers();
      
      if (currentEditingUser) {
        const userIndex = users.findIndex(u => u.id === currentEditingUser);
        if (userIndex > -1) {
          const nameParts = formData.name.split(' ');
          users[userIndex] = { 
            ...users[userIndex], 
            run: formData.run,
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: formData.email,
            role: formData.role
          };
        }
      } else {
        const nameParts = formData.name.split(' ');
        const newUser = {
          id: Date.now(),
          run: formData.run,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          email: formData.email,
          role: formData.role,
          password: 'temp123'
        };
        users.push(newUser);
      }
      
      saveUsers(users);
      closeUserModal();
      loadUsersTable();
      loadAdminData();
    });
  }
  
  // Modal de producto
  const productModalForm = document.getElementById('productModalForm');
  if (productModalForm) {
    productModalForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = {
        codigo: document.getElementById('modalProductCode').value,
        nombre: document.getElementById('modalProductName').value,
        descripcion: document.getElementById('modalProductDescription').value,
        precio: parseInt(document.getElementById('modalProductPrice').value),
        stock: parseInt(document.getElementById('modalProductStock').value),
        categoria: document.getElementById('modalProductCategory').value
      };
      
      if (currentEditingProduct) {
        const productIndex = appData.productos.findIndex(p => p.id === currentEditingProduct);
        if (productIndex > -1) {
          appData.productos[productIndex] = { ...appData.productos[productIndex], ...formData };
        }
      } else {
        const newProduct = {
          id: Date.now(),
          ...formData,
          stockCritico: 5,
          imagen: 'default.jpg'
        };
        appData.productos.push(newProduct);
      }
      
      closeProductModal();
      loadProductsTable();
      loadAdminData();
      displayAllProducts();
      displayFeaturedProducts();
      loadCategoriesFilter();
    });
  }
  
  // Menu móvil
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const nav = document.getElementById('nav');
      if (nav) {
        nav.classList.toggle('active');
      }
    });
  }
  
  // Newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('¡Gracias por suscribirte a nuestro newsletter!');
      this.reset();
    });
  }
  
  console.log('Event listeners set up');
}

// Inicialización
function initializeApp() {
  console.log('Initializing app...');
  loadCart();
  loadCurrentUser();
  loadRegions();
  loadCategoriesFilter();
  displayFeaturedProducts();
  displayAllProducts();
  displayBlogs();
  updateUIForUser();
  updateCartCount();
  setupEventListeners();
  
  // Hacer las funciones disponibles globalmente
  window.showSection = showSection;
  window.showAdminSection = showAdminSection;
  window.showProductDetail = showProductDetail;
  window.showBlogDetail = showBlogDetail;
  window.addToCart = addToCart;
  window.removeFromCart = removeFromCart;
  window.updateQuantity = updateQuantity;
  window.clearCart = clearCart;
  window.filterProducts = filterProducts;
  window.loadComunas = loadComunas;
  window.register = register;
  window.login = login;
  window.logout = logout;
  window.showUserForm = showUserForm;
  window.closeUserModal = closeUserModal;
  window.showProductForm = showProductForm;
  window.closeProductModal = closeProductModal;
  window.editUser = editUser;
  window.editProduct = editProduct;
  window.deleteUser = deleteUser;
  window.deleteProduct = deleteProduct;
  
  console.log('App initialized');
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);