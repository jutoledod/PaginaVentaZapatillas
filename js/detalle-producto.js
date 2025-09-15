
/**
 * JavaScript específico para la página de detalle de producto
 * Maneja visualización, cantidad, carrito y productos relacionados
 */

// Variables globales
let currentProduct = null;
let currentQuantity = 1;

/**
 * Inicialización de la página de detalle de producto
 */
function initProductDetail() {
    console.log('Inicializando página de detalle de producto...');

    // Obtener ID del producto desde URL
    const productId = getProductIdFromURL();

    if (!productId) {
        console.error('No se encontró ID de producto en la URL');
        showProductNotFound();
        return;
    }

    // Cargar producto
    loadProductDetail(productId);

    // Configurar eventos
    setupProductEvents();

    // Cargar productos relacionados
    loadRelatedProducts();

    console.log('Detalle de producto inicializado');
}

/**
 * Obtener ID del producto desde la URL
 */
function getProductIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    return id ? parseInt(id) : null;
}

/**
 * Cargar detalle del producto
 */
function loadProductDetail(productId) {
    console.log('Cargando detalle del producto ID:', productId);

    // Buscar producto en los datos
    currentProduct = appData.productos.find(p => p.id === productId);

    if (!currentProduct) {
        console.error('Producto no encontrado:', productId);
        showProductNotFound();
        return;
    }

    // Renderizar producto
    renderProductDetail();

    console.log('Producto cargado:', currentProduct.nombre);
}

/**
 * Renderizar el detalle del producto
 */
function renderProductDetail() {
    if (!currentProduct) return;

    // Actualizar título de la página
    document.title = `${currentProduct.nombre} - SneakerStore`;

    // Renderizar información principal
    renderProductInfo();

    // Renderizar sección de stock
    renderStockSection();

    // Renderizar breadcrumb
    renderBreadcrumb();

    // Configurar controles de cantidad
    updateQuantityControls();

    // Actualizar botón de agregar al carrito
    updateAddToCartButton();
}

/**
 * Renderizar información del producto
 */
function renderProductInfo() {
    // Imagen principal
    const imageElement = document.getElementById('product-image');
    if (imageElement) {
        imageElement.src = `img/productos/${currentProduct.imagen}`;
        imageElement.alt = currentProduct.nombre;
    }

    // Categoría
    const categoryElement = document.getElementById('product-category');
    if (categoryElement) {
        categoryElement.textContent = currentProduct.categoria;
    }

    // Título
    const titleElement = document.getElementById('product-title');
    if (titleElement) {
        titleElement.textContent = currentProduct.nombre;
    }

    // Código
    const codeElement = document.getElementById('product-code');
    if (codeElement) {
        codeElement.innerHTML = `<strong>Código:</strong> ${currentProduct.codigo}`;
    }

    // Precio
    const priceElement = document.getElementById('product-price');
    if (priceElement) {
        priceElement.innerHTML = `
            <span class="price-currency">$</span>
            ${currentProduct.precio.toLocaleString('es-CL')}
        `;
    }

    // Descripción
    const descriptionElement = document.getElementById('product-description-text');
    if (descriptionElement) {
        descriptionElement.textContent = currentProduct.descripcion;
    }

    // Badge en la imagen
    const imageBadge = document.querySelector('.image-badge');
    if (imageBadge) {
        const stockStatus = getProductStockStatus(currentProduct);
        imageBadge.textContent = stockStatus.text;
        imageBadge.className = `image-badge ${stockStatus.class}`;

        if (stockStatus.class === 'out') {
            imageBadge.textContent = 'Agotado';
        } else if (stockStatus.class === 'low') {
            imageBadge.textContent = 'Stock Bajo';
        } else {
            imageBadge.textContent = 'Disponible';
        }
    }
}

/**
 * Renderizar sección de stock
 */
function renderStockSection() {
    const stockIndicator = document.getElementById('stock-indicator');
    const stockText = document.getElementById('stock-text');
    const stockCount = document.getElementById('stock-count');

    if (!stockIndicator || !stockText || !stockCount) return;

    const stockStatus = getProductStockStatus(currentProduct);

    // Actualizar indicador visual
    const stockDot = stockIndicator.querySelector('.stock-dot');
    if (stockDot) {
        stockDot.className = `stock-dot ${stockStatus.class}`;
    }

    // Actualizar texto
    stockText.textContent = stockStatus.text;
    stockCount.textContent = `${currentProduct.stock} unidades disponibles`;

    // Aplicar clase al contenedor principal si está agotado
    const productContainer = document.querySelector('.product-detail-container');
    if (productContainer) {
        if (currentProduct.stock === 0) {
            productContainer.classList.add('product-out-of-stock');
        } else if (currentProduct.stock <= currentProduct.stockCritico) {
            productContainer.classList.add('product-low-stock');
        } else {
            productContainer.classList.remove('product-out-of-stock', 'product-low-stock');
        }
    }
}

/**
 * Renderizar breadcrumb
 */
function renderBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (!breadcrumb || !currentProduct) return;

    breadcrumb.innerHTML = `
        <a href="index.html">Inicio</a>
        <span class="separator">></span>
        <a href="productos.html">Productos</a>
        <span class="separator">></span>
        <a href="productos.html?categoria=${encodeURIComponent(currentProduct.categoria)}">${currentProduct.categoria}</a>
        <span class="separator">></span>
        <span>${currentProduct.nombre}</span>
    `;
}

/**
 * Obtener estado del stock del producto
 */
function getProductStockStatus(product) {
    if (product.stock === 0) {
        return { class: 'out', text: 'Agotado' };
    } else if (product.stock <= product.stockCritico) {
        return { class: 'low', text: 'Stock Bajo' };
    } else if (product.stock <= (product.stockCritico * 2)) {
        return { class: 'medium', text: 'Stock Limitado' };
    } else {
        return { class: 'high', text: 'Disponible' };
    }
}

/**
 * Configurar eventos de la página
 */
function setupProductEvents() {
    // Botón de aumentar cantidad
    const increaseBtn = document.getElementById('increase-quantity');
    if (increaseBtn) {
        increaseBtn.addEventListener('click', increaseQuantity);
    }

    // Botón de disminuir cantidad
    const decreaseBtn = document.getElementById('decrease-quantity');
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', decreaseQuantity);
    }

    // Input de cantidad
    const quantityInput = document.getElementById('quantity-input');
    if (quantityInput) {
        quantityInput.addEventListener('change', handleQuantityChange);
        quantityInput.addEventListener('blur', validateQuantity);
    }

    // Botón agregar al carrito
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', handleAddToCart);
    }

    // Botón continuar comprando
    const continueShoppingBtn = document.getElementById('continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            navigation.goTo('productos.html');
        });
    }

    // Botón ver carrito
    const viewCartBtn = document.getElementById('view-cart');
    if (viewCartBtn) {
        viewCartBtn.addEventListener('click', () => {
            navigation.goTo('carrito.html');
        });
    }
}

/**
 * Aumentar cantidad
 */
function increaseQuantity() {
    if (!currentProduct) return;

    if (currentQuantity < currentProduct.stock) {
        currentQuantity++;
        updateQuantityDisplay();
        updateAddToCartButton();
    }
}

/**
 * Disminuir cantidad
 */
function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        updateQuantityDisplay();
        updateAddToCartButton();
    }
}

/**
 * Manejar cambio de cantidad manual
 */
function handleQuantityChange(event) {
    const newQuantity = parseInt(event.target.value);

    if (isNaN(newQuantity) || newQuantity < 1) {
        currentQuantity = 1;
    } else if (newQuantity > currentProduct.stock) {
        currentQuantity = currentProduct.stock;
        showQuantityLimitAlert();
    } else {
        currentQuantity = newQuantity;
    }

    updateQuantityDisplay();
    updateAddToCartButton();
}

/**
 * Validar cantidad al perder el foco
 */
function validateQuantity(event) {
    if (event.target.value === '' || parseInt(event.target.value) < 1) {
        currentQuantity = 1;
        updateQuantityDisplay();
    }
}

/**
 * Actualizar visualización de cantidad
 */
function updateQuantityDisplay() {
    const quantityInput = document.getElementById('quantity-input');
    if (quantityInput) {
        quantityInput.value = currentQuantity;
    }
}

/**
 * Actualizar controles de cantidad
 */
function updateQuantityControls() {
    if (!currentProduct) return;

    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const quantityInput = document.getElementById('quantity-input');

    if (decreaseBtn) {
        decreaseBtn.disabled = currentQuantity <= 1;
    }

    if (increaseBtn) {
        increaseBtn.disabled = currentQuantity >= currentProduct.stock || currentProduct.stock === 0;
    }

    if (quantityInput) {
        quantityInput.max = currentProduct.stock;
        quantityInput.disabled = currentProduct.stock === 0;
    }
}

/**
 * Actualizar botón de agregar al carrito
 */
function updateAddToCartButton() {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (!addToCartBtn || !currentProduct) return;

    updateQuantityControls();

    if (currentProduct.stock === 0) {
        addToCartBtn.disabled = true;
        addToCartBtn.innerHTML = '<span>Producto Agotado</span>';
        addToCartBtn.classList.add('disabled');
    } else {
        addToCartBtn.disabled = false;
        addToCartBtn.innerHTML = `
            <span>🛒</span>
            <span>Agregar al Carrito (${currentQuantity})</span>
        `;
        addToCartBtn.classList.remove('disabled');
    }
}

/**
 * Manejar agregar al carrito
 */
function handleAddToCart() {
    if (!currentProduct || currentProduct.stock === 0) {
        return;
    }

    const addToCartBtn = document.getElementById('add-to-cart-btn');

    // Mostrar estado de carga
    if (addToCartBtn) {
        addToCartBtn.classList.add('adding');
        addToCartBtn.innerHTML = '<span>Agregando...</span>';
    }

    // Simular delay de red
    setTimeout(() => {
        // Agregar al carrito usando la función global
        const success = addProductToCart(currentProduct.id, currentQuantity);

        if (success) {
            showAddToCartSuccess();
            // Resetear cantidad
            currentQuantity = 1;
            updateQuantityDisplay();
        } else {
            showAddToCartError();
        }

        // Restaurar botón
        if (addToCartBtn) {
            addToCartBtn.classList.remove('adding');
        }

        updateAddToCartButton();

    }, 800);
}

/**
 * Mostrar mensaje de éxito al agregar al carrito
 */
function showAddToCartSuccess() {
    // Crear y mostrar alerta de éxito
    const alertContainer = document.getElementById('product-alerts');
    if (alertContainer) {
        const alert = document.createElement('div');
        alert.className = 'product-alert success';
        alert.innerHTML = `
            <span>✅</span>
            <span>¡Producto agregado al carrito correctamente!</span>
        `;

        alertContainer.appendChild(alert);

        // Remover después de 4 segundos
        setTimeout(() => {
            alert.remove();
        }, 4000);
    }

    console.log(`Producto agregado: ${currentProduct.nombre} x${currentQuantity}`);
}

/**
 * Mostrar mensaje de error al agregar al carrito
 */
function showAddToCartError() {
    const alertContainer = document.getElementById('product-alerts');
    if (alertContainer) {
        const alert = document.createElement('div');
        alert.className = 'product-alert danger';
        alert.innerHTML = `
            <span>❌</span>
            <span>Error al agregar el producto. Stock insuficiente.</span>
        `;

        alertContainer.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 4000);
    }
}

/**
 * Mostrar alerta de límite de cantidad
 */
function showQuantityLimitAlert() {
    const alertContainer = document.getElementById('product-alerts');
    if (alertContainer) {
        const alert = document.createElement('div');
        alert.className = 'product-alert warning';
        alert.innerHTML = `
            <span>⚠️</span>
            <span>Cantidad máxima disponible: ${currentProduct.stock} unidades</span>
        `;

        alertContainer.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
}

/**
 * Cargar productos relacionados
 */
function loadRelatedProducts() {
    if (!currentProduct) return;

    console.log('Cargando productos relacionados...');

    const relatedContainer = document.getElementById('related-products-grid');
    if (!relatedContainer) return;

    // Filtrar productos de la misma categoría (excluyendo el actual)
    let relatedProducts = appData.productos.filter(p => 
        p.categoria === currentProduct.categoria && p.id !== currentProduct.id
    );

    // Si no hay suficientes de la misma categoría, agregar otros productos
    if (relatedProducts.length < 3) {
        const otherProducts = appData.productos.filter(p => 
            p.categoria !== currentProduct.categoria && p.id !== currentProduct.id
        );
        relatedProducts = [...relatedProducts, ...otherProducts];
    }

    // Tomar solo los primeros 4 productos
    relatedProducts = relatedProducts.slice(0, 4);

    // Renderizar productos relacionados
    relatedContainer.innerHTML = relatedProducts.map(product => `
        <div class="related-product-card" onclick="navigation.goToProductDetail(${product.id})">
            <div class="related-product-image">👟</div>
            <div class="related-product-name">${product.nombre}</div>
            <div class="related-product-price">${ui.formatPrice(product.precio)}</div>
        </div>
    `).join('');

    console.log(`${relatedProducts.length} productos relacionados cargados`);
}

/**
 * Mostrar página de producto no encontrado
 */
function showProductNotFound() {
    const container = document.querySelector('.product-detail-container .container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: var(--spacing-xl); color: var(--text-muted);">
                <h1 style="font-size: 3rem; margin-bottom: var(--spacing-lg);">😞</h1>
                <h2>Producto No Encontrado</h2>
                <p>El producto que buscas no existe o ya no está disponible.</p>
                <div style="margin-top: var(--spacing-lg);">
                    <button class="btn btn-primary" onclick="navigation.goTo('productos.html')">
                        Ver Todos los Productos
                    </button>
                    <button class="btn btn-outline" onclick="navigation.goTo('index.html')" style="margin-left: var(--spacing-md);">
                        Ir al Inicio
                    </button>
                </div>
            </div>
        `;
    }
}

// Función global para navegación desde productos relacionados
window.goToProductDetail = function(productId) {
    navigation.goToProductDetail(productId);
};

// Inicialización automática
document.addEventListener('DOMContentLoaded', function() {
    // Solo inicializar si estamos en la página de detalle de producto
    if (window.location.pathname.includes('detalle-producto.html')) {
        // Esperar un momento para que se carguen las dependencias
        setTimeout(initProductDetail, 100);
    }
});

// También inicializar si el DOM ya está cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        if (window.location.pathname.includes('detalle-producto.html')) {
            setTimeout(initProductDetail, 100);
        }
    });
} else if (window.location.pathname.includes('detalle-producto.html')) {
    initProductDetail();
}
