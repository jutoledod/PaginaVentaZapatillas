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

// Inicializar formulario de registro - Como en tus clases
function inicializarFormularioRegistro() {
    document.getElementById('formRegistro').addEventListener('submit', function(e) {
        e.preventDefault();
        
        let valido = true;
        
        // Validar RUN
        const run = document.getElementById('run').value.trim();
        if (!run) {
            mostrarError('run', 'El RUN es requerido');
            valido = false;
        } else if (!validarRUN(run)) {
            mostrarError('run', 'RUN inválido');
            valido = false;
        } else {
            limpiarError('run');
        }
        
        // Validar nombre
        const nombre = document.getElementById('nombre').value.trim();
        if (!nombre) {
            mostrarError('nombre', 'El nombre es requerido');
            valido = false;
        } else if (nombre.length > 50) {
            mostrarError('nombre', 'Máximo 50 caracteres');
            valido = false;
        } else {
            limpiarError('nombre');
        }
        
        // Validar apellidos
        const apellidos = document.getElementById('apellidos').value.trim();
        if (!apellidos) {
            mostrarError('apellidos', 'Los apellidos son requeridos');
            valido = false;
        } else if (apellidos.length > 100) {
            mostrarError('apellidos', 'Máximo 100 caracteres');
            valido = false;
        } else {
            limpiarError('apellidos');
        }
        
        // Validar correo
        const correo = document.getElementById('correo').value.trim();
        if (!correo) {
            mostrarError('correo', 'El correo es requerido');
            valido = false;
        } else if (!validarEmail(correo)) {
            mostrarError('correo', 'Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
            valido = false;
        } else {
            limpiarError('correo');
        }
        
        // Validar dirección
        const direccion = document.getElementById('direccion').value.trim();
        if (!direccion) {
            mostrarError('direccion', 'La dirección es requerida');
            valido = false;
        } else if (direccion.length > 300) {
            mostrarError('direccion', 'Máximo 300 caracteres');
            valido = false;
        } else {
            limpiarError('direccion');
        }
        
        if (valido) {
            document.getElementById('exitoRegistro').classList.remove('d-none');
            this.reset();
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        }
    });
}

// Inicializar formulario de login
function inicializarFormularioLogin() {
    document.getElementById('formLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const correo = document.getElementById('correoLogin').value.trim();
        const password = document.getElementById('password').value;
        
        let valido = true;
        
        // Validar correo
        if (!correo || !validarEmail(correo)) {
            mostrarError('correoLogin', 'Correo inválido');
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
        
        if (valido) {
            alert('¡Bienvenido a SneakerStore!');
            window.location.href = 'index.html';
        }
    });
}

// Inicializar formulario de contacto
function inicializarFormularioContacto() {
    document.getElementById('formContacto').addEventListener('submit', function(e) {
        e.preventDefault();
        
        let valido = true;
        
        const nombre = document.getElementById('nombreContacto').value.trim();
        const correo = document.getElementById('correoContacto').value.trim();
        const comentario = document.getElementById('comentario').value.trim();
        
        // Validar nombre
        if (!nombre) {
            mostrarError('nombreContacto', 'El nombre es requerido');
            valido = false;
        } else if (nombre.length > 100) {
            mostrarError('nombreContacto', 'Máximo 100 caracteres');
            valido = false;
        } else {
            limpiarError('nombreContacto');
        }
        
        // Validar correo
        if (!correo || !validarEmail(correo)) {
            mostrarError('correoContacto', 'Correo inválido');
            valido = false;
        } else {
            limpiarError('correoContacto');
        }
        
        // Validar comentario
        if (!comentario) {
            mostrarError('comentario', 'El comentario es requerido');
            valido = false;
        } else if (comentario.length > 500) {
            mostrarError('comentario', 'Máximo 500 caracteres');
            valido = false;
        } else {
            limpiarError('comentario');
        }
        
        if (valido) {
            document.getElementById('exitoContacto').classList.remove('d-none');
            this.reset();
        }
    });
}
