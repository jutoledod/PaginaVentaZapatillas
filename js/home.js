
/**
 * JavaScript específico para la página principal (index.html)
 * Maneja la carga y visualización de productos destacados
 */

// Función para obtener el estado del stock
function getStockStatus(product) {
    if (product.stock <= 0) {
        return { clase: 'out-of-stock', texto: 'Agotado' };
    } else if (product.stock <= product.stockCritico) {
        return { clase: 'low-stock', texto: 'Stock Bajo' };
    } else {
        return { clase: 'in-stock', texto: 'Disponible' };
    }
}

// Función para crear una tarjeta de producto
function createProductCard(product) {
    const stockStatus = getStockStatus(product);

    return `
        <div class="product-card card" onclick="navigation.goToProductDetail(${product.id})">
            <div class="product-image">
                <!-- Placeholder para imagen del producto -->
            </div>
            <div class="product-info">
                <div class="stock-status ${stockStatus.clase}">
                    ${stockStatus.texto}
                </div>
                <h4>${product.nombre}</h4>
                <p><strong>Código:</strong> ${product.codigo}</p>
                <p><strong>Categoría:</strong> ${product.categoria}</p>
                <p>${product.descripcion}</p>
                <div class="product-price">
                    ${ui.formatPrice(product.precio)}
                </div>
                <div class="product-actions">
                    <button class="btn btn-outline" onclick="event.stopPropagation(); navigation.goToProductDetail(${product.id})">
                        Ver Detalles
                    </button>
                    <button class="btn btn-primary" 
                            onclick="event.stopPropagation(); addToCart(${product.id})"
                            ${product.stock <= 0 ? 'disabled' : ''}>
                        ${product.stock <= 0 ? 'Agotado' : 'Agregar'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Función para mostrar productos destacados
function displayFeaturedProducts() {
    const container = document.getElementById('featured-products-grid');

    if (!container) {
        console.error('Container de productos destacados no encontrado');
        return;
    }

    // Mostrar los primeros 6 productos como destacados
    const featuredProducts = appData.productos.slice(0, 6);

    if (featuredProducts.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center p-lg">
                <p class="text-muted">No hay productos disponibles en este momento.</p>
            </div>
        `;
        return;
    }

    // Generar HTML para todos los productos destacados
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');

    console.log(`Se cargaron ${featuredProducts.length} productos destacados`);
}

// Función para agregar producto al carrito
function addToCart(productId) {
    // Buscar el producto en los datos
    const product = appData.productos.find(p => p.id === productId);

    if (!product) {
        console.error('Producto no encontrado:', productId);
        return;
    }

    // Verificar stock
    if (product.stock <= 0) {
        alert('Este producto está agotado');
        return;
    }

    // Agregar al carrito usando la función del common.js
    cart.addItem(product, 1);

    console.log('Producto agregado al carrito:', product.nombre);
}

// Función para manejar el click en productos (navegación)
function handleProductClick(productId) {
    navigation.goToProductDetail(productId);
}

// Función de inicialización de la página
function initHomePage() {
    console.log('Inicializando página principal...');

    // Cargar productos destacados
    displayFeaturedProducts();

    // Actualizar información del usuario si está logueado
    const currentUser = userSession.getCurrentUser();
    if (currentUser) {
        console.log('Usuario logueado:', currentUser.firstName);

        // Mostrar enlace admin si es administrador
        if (currentUser.role === 'Administrador') {
            addAdminLink();
        }
    }

    console.log('Página principal inicializada correctamente');
}

// Función para agregar enlace de administración
function addAdminLink() {
    const nav = document.querySelector('.nav');
    if (nav && !document.getElementById('admin-link')) {
        const adminButton = document.createElement('button');
        adminButton.id = 'admin-link';
        adminButton.className = 'nav-item';
        adminButton.textContent = 'Admin';
        adminButton.style.color = '#ff0000'; // Un color rojo cualquiera

        adminButton.onclick = () => navigation.goTo('/dashboard.html');

        nav.appendChild(adminButton);
    }
}

// Eventos que se ejecutan cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurarse de que todos los scripts estén cargados
    setTimeout(initHomePage, 100);
});

// También ejecutar si la página ya está cargada
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomePage);
} else {
    initHomePage();
}

/**
 * Funciones adicionales para mejorar la experiencia del usuario
 */

// Función para filtrar productos destacados por categoría (opcional)
function filterFeaturedProducts(category = null) {
    let productsToShow;

    if (category) {
        productsToShow = appData.productos.filter(p => p.categoria === category).slice(0, 6);
    } else {
        productsToShow = appData.productos.slice(0, 6);
    }

    const container = document.getElementById('featured-products-grid');
    container.innerHTML = productsToShow.map(product => createProductCard(product)).join('');

    console.log(`Filtrados productos por categoría: ${category || 'todas'}`);
}

// Función para animar la entrada de las tarjetas
function animateProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Llamar a la animación después de cargar los productos (opcional)
// Descomenta la siguiente línea si quieres animaciones
// setTimeout(animateProductCards, 500);
