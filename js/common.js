
/**
 * Funciones comunes para SneakerStore
 * Incluye funciones de navegación, validación, localStorage y utilidades
 */

// Funciones de navegación
const navigation = {
    // Navegar a una página específica
    goTo: function(page) {
        window.location.href = page;
    },

    // Navegar al detalle de un producto
    goToProductDetail: function(productId) {
        window.location.href = `detalle-producto.html?id=${productId}`;
    },

    // Navegar al detalle de un blog
    goToBlogDetail: function(blogId) {
        window.location.href = `detalle-blog.html?id=${blogId}`;
    },

    // Obtener parámetros de la URL
    getUrlParameter: function(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
};

// Gestión de usuario autenticado
const userSession = {
    // Obtener usuario actual del localStorage
    getCurrentUser: function() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    },

    // Guardar usuario en sesión
    setCurrentUser: function(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },

    // Cerrar sesión
    logout: function() {
        localStorage.removeItem('currentUser');
        navigation.goTo('index.html');
    },

    // Verificar si hay usuario logueado
    isLoggedIn: function() {
        return this.getCurrentUser() !== null;
    },

    // Verificar si el usuario es administrador
    isAdmin: function() {
        const user = this.getCurrentUser();
        return user && user.role === 'Administrador';
    }
};

// Gestión del carrito de compras
const cart = {
    // Obtener carrito del localStorage
    getCart: function() {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    },

    // Guardar carrito en localStorage
    saveCart: function(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        this.updateCartCount();
    },

    // Agregar producto al carrito
    addItem: function(product, quantity = 1) {
        const cartItems = this.getCart();
        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({
                id: product.id,
                nombre: product.nombre,
                precio: product.precio,
                imagen: product.imagen,
                quantity: quantity
            });
        }

        this.saveCart(cartItems);
        this.showAddedMessage(product.nombre);
    },

    // Remover producto del carrito
    removeItem: function(productId) {
        const cartItems = this.getCart();
        const updatedCart = cartItems.filter(item => item.id !== productId);
        this.saveCart(updatedCart);
    },

    // Actualizar cantidad de un producto
    updateQuantity: function(productId, newQuantity) {
        const cartItems = this.getCart();
        const item = cartItems.find(item => item.id === productId);

        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart(cartItems);
            }
        }
    },

    // Obtener total del carrito
    getTotal: function() {
        const cartItems = this.getCart();
        return cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
    },

    // Obtener cantidad de items en el carrito
    getItemCount: function() {
        const cartItems = this.getCart();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    },

    // Actualizar contador del carrito en el header
    updateCartCount: function() {
        const countElement = document.getElementById('cart-count');
        if (countElement) {
            const count = this.getItemCount();
            countElement.textContent = count > 0 ? `(${count})` : '(0)';
        }
    },

    // Mostrar mensaje de producto agregado
    showAddedMessage: function(productName) {
        // Crear mensaje temporal
        const message = document.createElement('div');
        message.className = 'alert alert-success';
        message.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1000;
            padding: 1rem;
            background-color: #28a745;
            color: white;
            border-radius: 0.375rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        message.textContent = `${productName} agregado al carrito`;

        document.body.appendChild(message);

        // Remover mensaje después de 3 segundos
        setTimeout(() => {
            document.body.removeChild(message);
        }, 3000);
    },

    // Vaciar carrito
    clear: function() {
        localStorage.removeItem('cart');
        this.updateCartCount();
    }
};

// Funciones de validación
const validation = {
    // Validar email con dominios permitidos
    email: function(email) {
        if (!email) return { valid: false, message: 'Email es requerido' };

        const allowedDomains = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        const isValidDomain = allowedDomains.some(domain => email.endsWith(domain));

        if (!isValidDomain) {
            return { 
                valid: false, 
                message: 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com' 
            };
        }

        if (email.length > 100) {
            return { valid: false, message: 'Email no puede exceder 100 caracteres' };
        }

        return { valid: true, message: '' };
    },

    // Validar contraseña
    password: function(password) {
        if (!password) return { valid: false, message: 'Contraseña es requerida' };

        if (password.length < 4 || password.length > 10) {
            return { valid: false, message: 'Contraseña debe tener entre 4 y 10 caracteres' };
        }

        return { valid: true, message: '' };
    },

    // Validar nombre
    name: function(name, maxLength = 50) {
        if (!name) return { valid: false, message: 'Nombre es requerido' };

        if (name.length > maxLength) {
            return { valid: false, message: `Nombre no puede exceder ${maxLength} caracteres` };
        }

        return { valid: true, message: '' };
    },

    // Validar RUN chileno
    run: function(run) {
        if (!run) return { valid: false, message: 'RUN es requerido' };

        const cleanRun = run.replace(/[.-]/g, '');

        if (cleanRun.length < 7 || cleanRun.length > 9) {
            return { valid: false, message: 'RUN debe tener entre 7 y 9 caracteres' };
        }

        if (!/^\d+[0-9kK]$/.test(cleanRun)) {
            return { valid: false, message: 'Formato de RUN inválido' };
        }

        // Validación matemática del dígito verificador
        const runDigits = cleanRun.slice(0, -1);
        const dv = cleanRun.slice(-1).toUpperCase();
        let sum = 0;
        let multiplier = 2;

        for (let i = runDigits.length - 1; i >= 0; i--) {
            sum += parseInt(runDigits[i]) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }

        const remainder = sum % 11;
        const calculatedDV = remainder === 0 ? '0' : remainder === 1 ? 'K' : (11 - remainder).toString();

        if (dv !== calculatedDV) {
            return { valid: false, message: 'RUN inválido' };
        }

        return { valid: true, message: '' };
    }
};

// Funciones de utilidad UI
const ui = {
    // Mostrar mensaje de error
    showError: function(elementId, message) {
        const element = document.getElementById(elementId);
        if (element) {
            let errorElement = element.nextElementSibling;

            if (!errorElement || !errorElement.classList.contains('error-message')) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message text-danger';
                errorElement.style.fontSize = '0.875rem';
                errorElement.style.marginTop = '0.25rem';
                element.parentNode.insertBefore(errorElement, element.nextSibling);
            }

            errorElement.textContent = message;
            element.classList.add('is-invalid');
        }
    },

    // Limpiar mensaje de error
    clearError: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            const errorElement = element.nextElementSibling;

            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.remove();
            }

            element.classList.remove('is-invalid');
        }
    },

    // Limpiar todos los errores de un formulario
    clearFormErrors: function(formElement) {
        const inputs = formElement.querySelectorAll('.form-control');
        inputs.forEach(input => {
            if (input.id) {
                this.clearError(input.id);
            }
        });
    },

    // Formatear precio en pesos chilenos
    formatPrice: function(price) {
        return `$${price.toLocaleString('es-CL')}`;
    }
};

// Funciones que se ejecutan al cargar cualquier página
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar contador del carrito
    cart.updateCartCount();

    // Configurar enlaces de navegación si existen
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('data-href');
            if (href) {
                e.preventDefault();
                navigation.goTo(href);
            }
        });
    });

    // Manejar botón de carrito si existe
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', function() {
            navigation.goTo('carrito.html');
        });
    }

    // Manejar botones de login/logout si existen
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const userInfo = document.getElementById('user-info');

    const currentUser = userSession.getCurrentUser();

    if (currentUser) {
        if (loginButton) loginButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'inline-block';
        if (userInfo) userInfo.textContent = `Hola, ${currentUser.firstName}`;
    } else {
        if (loginButton) loginButton.style.display = 'inline-block';
        if (logoutButton) logoutButton.style.display = 'none';
        if (userInfo) userInfo.textContent = '';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            userSession.logout();
        });
    }
});
