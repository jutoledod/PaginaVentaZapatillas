
/**
 * JavaScript específico para páginas de autenticación
 * Maneja login, registro y validaciones de formularios
 */

// Variables para gestión de usuarios
let users = [];

/**
 * Cargar usuarios del localStorage
 */
function loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    } else {
        // Crear usuarios por defecto si no existen
        users = [
            {
                id: 1,
                run: '12345678-9',
                firstName: 'Admin',
                lastName: 'Usuario',
                email: 'admin@duoc.cl',
                password: 'admin123',
                phone: '+56912345678',
                region: 'Región Metropolitana de Santiago',
                comuna: 'Santiago',
                address: 'Calle Principal 123',
                birthDate: '1990-01-01',
                role: 'Administrador'
            },
            {
                id: 2,
                run: '98765432-1',
                firstName: 'Cliente',
                lastName: 'Demo',
                email: 'cliente@gmail.com',
                password: 'demo123',
                phone: '',
                region: 'Región de Los Lagos',
                comuna: 'Puerto Montt',
                address: 'Avenida Demo 456',
                birthDate: '1995-05-15',
                role: 'Cliente'
            }
        ];
        saveUsers();
    }
    console.log(`${users.length} usuarios cargados`);
}

/**
 * Guardar usuarios en localStorage
 */
function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

/**
 * Obtener siguiente ID disponible para usuario
 */
function getNextUserId() {
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

/**
 * Validaciones específicas para formularios de auth
 */
const authValidation = {
    // Validar formulario de login
    validateLoginForm: function(formData) {
        const errors = {};

        // Validar email
        const emailValidation = validation.email(formData.email);
        if (!emailValidation.valid) {
            errors.email = emailValidation.message;
        }

        // Validar contraseña
        const passwordValidation = validation.password(formData.password);
        if (!passwordValidation.valid) {
            errors.password = passwordValidation.message;
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    },

    // Validar formulario de registro
    validateRegisterForm: function(formData) {
        const errors = {};

        // Validar RUN
        const runValidation = validation.run(formData.run);
        if (!runValidation.valid) {
            errors.run = runValidation.message;
        } else {
            // Verificar que el RUN no esté duplicado
            const existingUser = users.find(u => u.run === formData.run);
            if (existingUser) {
                errors.run = 'Este RUN ya está registrado';
            }
        }

        // Validar nombre
        const firstNameValidation = validation.name(formData.firstName, 50);
        if (!firstNameValidation.valid) {
            errors.firstName = firstNameValidation.message;
        }

        // Validar apellidos
        const lastNameValidation = validation.name(formData.lastName, 100);
        if (!lastNameValidation.valid) {
            errors.lastName = lastNameValidation.message;
        }

        // Validar email
        const emailValidation = validation.email(formData.email);
        if (!emailValidation.valid) {
            errors.email = emailValidation.message;
        } else {
            // Verificar que el email no esté duplicado
            const existingUser = users.find(u => u.email === formData.email);
            if (existingUser) {
                errors.email = 'Este email ya está registrado';
            }
        }

        // Validar contraseña
        const passwordValidation = validation.password(formData.password);
        if (!passwordValidation.valid) {
            errors.password = passwordValidation.message;
        }

        // Validar confirmación de contraseña
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        // Validar región
        if (!formData.region) {
            errors.region = 'Región es requerida';
        }

        // Validar comuna
        if (!formData.comuna) {
            errors.comuna = 'Comuna es requerida';
        }

        // Validar dirección
        if (!formData.address) {
            errors.address = 'Dirección es requerida';
        } else if (formData.address.length > 300) {
            errors.address = 'Dirección no puede exceder 300 caracteres';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
};

/**
 * Funciones para manejo de login
 */
const loginManager = {
    // Procesar login
    processLogin: function(email, password) {
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            userSession.setCurrentUser(user);
            console.log('Login exitoso:', user.firstName);
            return { success: true, user: user };
        } else {
            console.log('Login fallido para:', email);
            return { success: false, message: 'Email o contraseña incorrectos' };
        }
    },

    // Manejar envío del formulario de login
    handleLoginSubmit: function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = {
            email: formData.get('email').trim(),
            password: formData.get('password')
        };

        console.log('Procesando login...');

        // Limpiar errores previos
        ui.clearFormErrors(form);

        // Validar formulario
        const validation = authValidation.validateLoginForm(data);

        if (!validation.isValid) {
            // Mostrar errores
            Object.keys(validation.errors).forEach(field => {
                ui.showError(field, validation.errors[field]);
            });
            return;
        }

        // Mostrar loading
        form.classList.add('loading-form');

        // Simular delay de login
        setTimeout(() => {
            const result = this.processLogin(data.email, data.password);

            form.classList.remove('loading-form');

            if (result.success) {
                this.showLoginSuccess(result.user);
                // Redirigir después de un momento
                setTimeout(() => {
                    navigation.goTo('index.html');
                }, 1500);
            } else {
                this.showLoginError(result.message);
            }
        }, 1000);
    },

    // Mostrar éxito de login
    showLoginSuccess: function(user) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'auth-alert alert-success';
        alertDiv.innerHTML = `
            <strong>¡Bienvenido ${user.firstName}!</strong> 
            Redirigiendo a la página principal...
        `;

        const form = document.getElementById('login-form');
        form.parentNode.insertBefore(alertDiv, form);

        setTimeout(() => {
            alertDiv.remove();
        }, 2000);
    },

    // Mostrar error de login
    showLoginError: function(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'auth-alert alert-danger';
        alertDiv.innerHTML = `<strong>Error:</strong> ${message}`;

        const form = document.getElementById('login-form');
        form.parentNode.insertBefore(alertDiv, form);

        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
};

/**
 * Funciones para manejo de registro
 */
const registerManager = {
    // Procesar registro
    processRegister: function(userData) {
        const newUser = {
            id: getNextUserId(),
            run: userData.run,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            phone: userData.phone || '',
            region: userData.region,
            comuna: userData.comuna,
            address: userData.address,
            birthDate: userData.birthDate || '',
            role: 'Cliente' // Por defecto todos son clientes
        };

        users.push(newUser);
        saveUsers();

        console.log('Usuario registrado:', newUser.firstName);
        return { success: true, user: newUser };
    },

    // Manejar envío del formulario de registro
    handleRegisterSubmit: function(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const data = {
            run: formData.get('run').trim(),
            firstName: formData.get('firstName').trim(),
            lastName: formData.get('lastName').trim(),
            email: formData.get('email').trim(),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            phone: formData.get('phone').trim(),
            region: formData.get('region'),
            comuna: formData.get('comuna'),
            address: formData.get('address').trim(),
            birthDate: formData.get('birthDate')
        };

        console.log('Procesando registro...');

        // Limpiar errores previos
        ui.clearFormErrors(form);

        // Validar formulario
        const validation = authValidation.validateRegisterForm(data);

        if (!validation.isValid) {
            // Mostrar errores
            Object.keys(validation.errors).forEach(field => {
                ui.showError(field, validation.errors[field]);
            });
            return;
        }

        // Mostrar loading
        form.classList.add('loading-form');

        // Simular delay de registro
        setTimeout(() => {
            const result = this.processRegister(data);

            form.classList.remove('loading-form');

            if (result.success) {
                this.showRegisterSuccess();
                // Redirigir al login después de un momento
                setTimeout(() => {
                    navigation.goTo('login.html');
                }, 2000);
            } else {
                this.showRegisterError('Error al crear la cuenta');
            }
        }, 1500);
    },

    // Mostrar éxito de registro
    showRegisterSuccess: function() {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'auth-alert alert-success';
        alertDiv.innerHTML = `
            <strong>¡Cuenta creada exitosamente!</strong> 
            Redirigiendo al formulario de inicio de sesión...
        `;

        const form = document.getElementById('register-form');
        form.parentNode.insertBefore(alertDiv, form);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    },

    // Mostrar error de registro
    showRegisterError: function(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'auth-alert alert-danger';
        alertDiv.innerHTML = `<strong>Error:</strong> ${message}`;

        const form = document.getElementById('register-form');
        form.parentNode.insertBefore(alertDiv, form);

        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
};

/**
 * Funciones para manejo de región/comuna
 */
const locationManager = {
    // Cargar regiones en el select
    loadRegions: function() {
        const regionSelect = document.getElementById('region');
        if (regionSelect) {
            regionSelect.innerHTML = '<option value="">-- Seleccione la región --</option>';

            appData.regiones.forEach(region => {
                const option = document.createElement('option');
                option.value = region.nombre;
                option.textContent = region.nombre;
                regionSelect.appendChild(option);
            });
        }
    },

    // Cargar comunas según la región seleccionada
    loadComunas: function(regionName) {
        const comunaSelect = document.getElementById('comuna');
        if (!comunaSelect) return;

        comunaSelect.innerHTML = '<option value="">-- Seleccione la comuna --</option>';

        if (regionName) {
            const region = appData.regiones.find(r => r.nombre === regionName);
            if (region) {
                region.comunas.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
            }
        }
    },

    // Configurar eventos de región/comuna
    setupLocationEvents: function() {
        const regionSelect = document.getElementById('region');
        if (regionSelect) {
            regionSelect.addEventListener('change', (e) => {
                this.loadComunas(e.target.value);
                // Limpiar error de comuna si existía
                ui.clearError('comuna');
            });
        }
    }
};

/**
 * Inicialización de páginas de autenticación
 */
function initAuthPage() {
    console.log('Inicializando página de autenticación...');

    // Cargar usuarios
    loadUsers();

    // Configurar formulario de login si existe
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginManager.handleLoginSubmit.bind(loginManager));
    }

    // Configurar formulario de registro si existe
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', registerManager.handleRegisterSubmit.bind(registerManager));

        // Cargar regiones y configurar eventos
        locationManager.loadRegions();
        locationManager.setupLocationEvents();
    }

    // Redirigir si ya está logueado
    if (userSession.isLoggedIn()) {
        console.log('Usuario ya autenticado, redirigiendo...');
        setTimeout(() => navigation.goTo('index.html'), 1000);
    }

    console.log('Página de autenticación inicializada');
}

// Eventos de inicialización
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initAuthPage, 100);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthPage);
} else {
    initAuthPage();
}

// Función auxiliar para obtener usuarios (usada por otras páginas)
function getUsers() {
    loadUsers();
    return users;
}
