// Validaciones - Como en tus clases 7-8

// Validar RUN chileno - Como en tus clases
function validarRUN(run) {
    // Limpiar RUN
    run = run.replace(/\./g, '').replace('-', '').toUpperCase();
    
    // Verificar longitud
    if (run.length < 7 || run.length > 9) {
        return false;
    }
    
    // Validación básica simplificada para la clase
    return true;
}

// Validar email con dominios permitidos - Como en tus clases
function validarEmail(email) {
    const dominios = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominios.some(dominio => email.toLowerCase().includes(dominio));
}

// Mostrar mensaje de error - Como en tus clases
function mostrarError(campo, mensaje) {
    const errorDiv = document.getElementById(`error-${campo}`);
    if (errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
    }
}

// Limpiar mensaje de error
function limpiarError(campo) {
    const errorDiv = document.getElementById(`error-${campo}`);
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Inicializar formulario de login - CON OPCIÓN ADMIN
function inicializarFormularioLogin() {
    document.getElementById('formLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const correo = document.getElementById('correoLogin').value.trim();
        const password = document.getElementById('password').value;
        const esAdmin = document.getElementById('loginAdmin').checked;
        
        let valido = true;
        
        // Validar correo
        if (!correo || !validarEmail(correo)) {
            mostrarError('correoLogin', 'Correo inválido o dominio no permitido');
            valido = false;
        } else {
            limpiarError('correoLogin');
        }
        
        // Validar contraseña
        if (!password || password.length < 4 || password.length > 10) {
            mostrarError('password', 'Contraseña debe tener entre 4 y 10 caracteres');
            valido = false;
        } else {
            limpiarError('password');
        }
        
        // Validar credenciales admin si está marcado
        if (esAdmin) {
            if (!correo.includes('@duoc.cl') && !correo.includes('@profesor.duoc.cl')) {
                mostrarError('correoLogin', 'Solo correos institucionales pueden ser administradores');
                valido = false;
            } else if (password !== 'admin123') {
                mostrarError('password', 'Contraseña de administrador incorrecta');
                valido = false;
            }
        }
        
        if (valido) {
            if (esAdmin) {
                // Login como administrador
                mostrarEnlacesAdmin();
                alert('¡Bienvenido Administrador!');
                window.location.href = 'admin/home.html';
            } else {
                // Login como usuario normal
                alert('¡Bienvenido a SneakerStore!');
                window.location.href = 'index.html';
            }
        }
    });
}

// Las demás funciones de validación van igual...
