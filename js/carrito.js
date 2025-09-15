
/**
 * JavaScript específico para la página del carrito de compras
 * Maneja la visualización, edición y gestión del carrito
 */

// Variables globales para el carrito
let cartItems = [];

/**
 * Inicialización de la página del carrito
 */
function initCartPage() {
    console.log('Inicializando página del carrito...');

    // Cargar items del carrito
    loadCartItems();

    // Mostrar carrito
    displayCart();

    // Configurar eventos
    setupCartEvents();

    console.log(`Carrito inicializado con ${cartItems.length} productos`);
}

/**
 * Cargar items del carrito desde localStorage
 */
function loadCartItems() {
    cartItems = cart.getCart();
    console.log('Items del carrito cargados:', cartItems);
}

/**
 * Mostrar contenido del carrito
 */
function displayCart() {
    const itemsContainer = document.getElementById('cart-items');
    const emptyCartContainer = document.getElementById('empty-cart');
    const cartSummaryContainer = document.getElementById('cart-summary');

    if (cartItems.length === 0) {
        // Mostrar carrito vacío
        if (itemsContainer) itemsContainer.style.display = 'none';
        if (cartSummaryContainer) cartSummaryContainer.style.display = 'none';
        if (emptyCartContainer) emptyCartContainer.style.display = 'block';
    } else {
        // Mostrar items del carrito
        if (itemsContainer) itemsContainer.style.display = 'block';
        if (cartSummaryContainer) cartSummaryContainer.style.display = 'block';
        if (emptyCartContainer) emptyCartContainer.style.display = 'none';

        displayCartItems();
        displayCartSummary();
    }

    updateCartCount();
}

/**
 * Mostrar items individuales del carrito
 */
function displayCartItems() {
    const container = document.getElementById('cart-items-list');
    if (!container) return;

    container.innerHTML = cartItems.map(item => createCartItemHTML(item)).join('');

    // Agregar animación de entrada
    const items = container.querySelectorAll('.cart-item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';

        setTimeout(() => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Crear HTML para un item del carrito
 */
function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">
                <!-- Placeholder para imagen -->
            </div>

            <div class="cart-item-info">
                <h4>${item.nombre}</h4>
                <p>Precio unitario: ${ui.formatPrice(item.precio)}</p>
            </div>

            <div class="cart-item-price">
                ${ui.formatPrice(item.precio)}
            </div>

            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity <= 1 ? 'disabled' : ''}>
                    −
                </button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                    +
                </button>
            </div>

            <div class="cart-item-total">
                ${ui.formatPrice(item.precio * item.quantity)}
            </div>

            <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="Remover producto">
                ×
            </button>
        </div>
    `;
}

/**
 * Mostrar resumen del carrito
 */
function displayCartSummary() {
    const container = document.getElementById('cart-summary-content');
    if (!container) return;

    const subtotal = cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
    const shipping = subtotal > 50000 ? 0 : 5000; // Envío gratis sobre $50.000
    const tax = Math.round(subtotal * 0.19); // IVA 19%
    const total = subtotal + shipping + tax;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    container.innerHTML = `
        <h3>Resumen de Compra</h3>

        <div class="summary-line">
            <span class="summary-label">Productos (${totalItems})</span>
            <span class="summary-value">${ui.formatPrice(subtotal)}</span>
        </div>

        <div class="summary-line">
            <span class="summary-label">Envío</span>
            <span class="summary-value">${shipping === 0 ? 'Gratis' : ui.formatPrice(shipping)}</span>
        </div>

        <div class="summary-line">
            <span class="summary-label">IVA (19%)</span>
            <span class="summary-value">${ui.formatPrice(tax)}</span>
        </div>

        <div class="summary-line total">
            <span class="summary-label">Total</span>
            <span class="summary-value">${ui.formatPrice(total)}</span>
        </div>

        <div class="cart-actions">
            <button class="btn btn-secondary" onclick="navigation.goTo('productos.html')">
                Seguir Comprando
            </button>
            <button class="btn btn-primary" onclick="proceedToCheckout()">
                Proceder al Pago
            </button>
        </div>

        ${shipping > 0 ? `
            <div class="shipping-notice" style="
                background-color: rgba(23, 162, 184, 0.1);
                border: 1px solid #17a2b8;
                color: #0c5460;
                padding: var(--spacing-md);
                border-radius: var(--border-radius);
                margin-top: var(--spacing-md);
                text-align: center;
                font-size: 0.875rem;
            ">
                💡 Agrega ${ui.formatPrice(50000 - subtotal)} más para obtener envío gratis
            </div>
        ` : ''}
    `;
}

/**
 * Actualizar cantidad de un producto
 */
function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    // Actualizar en el array local
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;

        // Guardar en localStorage
        cart.saveCart(cartItems);

        // Actualizar visualización
        displayCart();

        console.log(`Cantidad actualizada para producto ${productId}: ${newQuantity}`);
    }
}

/**
 * Remover producto del carrito
 */
function removeFromCart(productId) {
    const itemElement = document.querySelector(`[data-product-id="${productId}"]`);

    if (itemElement) {
        // Animar salida
        itemElement.classList.add('removing');

        setTimeout(() => {
            // Remover del array
            cartItems = cartItems.filter(item => item.id !== productId);

            // Guardar en localStorage
            cart.saveCart(cartItems);

            // Actualizar visualización
            displayCart();

            console.log(`Producto ${productId} removido del carrito`);
        }, 300);
    }
}

/**
 * Vaciar todo el carrito
 */
function clearCart() {
    if (cartItems.length === 0) return;

    const confirmed = confirm('¿Estás seguro de que quieres vaciar tu carrito? Esta acción no se puede deshacer.');

    if (confirmed) {
        cartItems = [];
        cart.clear();
        displayCart();

        // Mostrar mensaje de confirmación
        showCartMessage('Carrito vaciado correctamente', 'success');

        console.log('Carrito vaciado');
    }
}

/**
 * Proceder al checkout (simulado)
 */
function proceedToCheckout() {
    if (!userSession.isLoggedIn()) {
        alert('Debes iniciar sesión para continuar con la compra');
        navigation.goTo('login.html');
        return;
    }

    if (cartItems.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    // Simulación de proceso de checkout
    const confirmed = confirm('¿Confirmas tu pedido? (Esta es una simulación)');

    if (confirmed) {
        // Simular loading
        const summaryContainer = document.getElementById('cart-summary-content');
        if (summaryContainer) {
            summaryContainer.classList.add('loading-summary');
        }

        setTimeout(() => {
            // Limpiar carrito
            cartItems = [];
            cart.clear();

            // Mostrar mensaje de éxito
            showCheckoutSuccess();

            // Remover loading
            if (summaryContainer) {
                summaryContainer.classList.remove('loading-summary');
            }

            console.log('Checkout completado');
        }, 2000);
    }
}

/**
 * Mostrar éxito del checkout
 */
function showCheckoutSuccess() {
    const container = document.querySelector('.cart-container');
    if (container) {
        container.innerHTML = `
            <div class="checkout-success" style="
                text-align: center;
                padding: var(--spacing-xl);
                background: white;
                border-radius: var(--border-radius-lg);
                box-shadow: var(--shadow-md);
                max-width: 600px;
                margin: 0 auto;
            ">
                <div style="font-size: 4rem; margin-bottom: var(--spacing-lg); color: var(--secondary-color);">
                    ✅
                </div>
                <h1 style="color: var(--secondary-color); margin-bottom: var(--spacing-md);">
                    ¡Pedido Realizado!
                </h1>
                <p style="font-size: 1.125rem; color: var(--text-muted); margin-bottom: var(--spacing-xl);">
                    Tu pedido ha sido procesado exitosamente. Recibirás un email de confirmación en breve.
                </p>
                <div style="display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-primary" onclick="navigation.goTo('productos.html')">
                        Seguir Comprando
                    </button>
                    <button class="btn btn-outline" onclick="navigation.goTo('index.html')">
                        Volver al Inicio
                    </button>
                </div>
            </div>
        `;
    }
}

/**
 * Mostrar mensaje en el carrito
 */
function showCartMessage(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `auth-alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1000;
        min-width: 300px;
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

/**
 * Configurar eventos del carrito
 */
function setupCartEvents() {
    // Botón limpiar carrito
    const clearButton = document.getElementById('clear-cart');
    if (clearButton) {
        clearButton.addEventListener('click', clearCart);
    }

    // Actualizar contador en el header
    updateCartCount();
}

/**
 * Actualizar contador del carrito
 */
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const count = cartItems.reduce((total, item) => total + item.quantity, 0);
        countElement.textContent = count > 0 ? `(${count})` : '(0)';
    }
}

/**
 * Función auxiliar para agregar producto desde otras páginas
 */
function addProductToCart(productId, quantity = 1) {
    const product = appData.productos.find(p => p.id === productId);
    if (product) {
        cart.addItem(product, quantity);
        loadCartItems();
        displayCart();
    }
}

// Eventos de inicialización
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCartPage, 100);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCartPage);
} else {
    initCartPage();
}

/**
 * Funciones adicionales para mejorar la experiencia
 */

// Función para guardar carrito para más tarde
function saveCartForLater() {
    if (cartItems.length === 0) return;

    localStorage.setItem('savedCart', JSON.stringify(cartItems));
    showCartMessage('Carrito guardado para más tarde', 'success');
}

// Función para restaurar carrito guardado
function restoreSavedCart() {
    const saved = localStorage.getItem('savedCart');
    if (saved) {
        cartItems = JSON.parse(saved);
        cart.saveCart(cartItems);
        displayCart();
        localStorage.removeItem('savedCart');
        showCartMessage('Carrito restaurado', 'success');
    }
}

// Función para compartir carrito (experimental)
function shareCart() {
    if (cartItems.length === 0) return;

    const cartData = {
        items: cartItems.map(item => ({
            id: item.id,
            nombre: item.nombre,
            precio: item.precio,
            quantity: item.quantity
        })),
        total: cart.getTotal()
    };

    const shareText = `Mira mi carrito en SneakerStore: ${cartItems.length} productos por ${ui.formatPrice(cartData.total)}`;

    if (navigator.share) {
        navigator.share({
            title: 'Mi Carrito - SneakerStore',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copiar al clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showCartMessage('Enlace copiado al portapapeles', 'success');
        });
    }
}
