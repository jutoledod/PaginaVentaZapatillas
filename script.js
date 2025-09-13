// Variables globales - Como en tus clases
let carrito = [];
let paginaActual = 'inicio';

// Array de zapatillas - Simplificado
const zapatillas = [
    {
        id: 1,
        nombre: 'Nike Air Max 270',
        precio: 89990,
        stock: 10,
        imagen: '👟',
        destacado: true
    },
    {
        id: 2,
        nombre: 'Adidas Ultraboost',
        precio: 119990,
        stock: 8,
        imagen: '👟',
        destacado: true
    },
    {
        id: 3,
        nombre: 'Puma RS-X',
        precio: 69990,
        stock: 15,
        imagen: '👟',
        destacado: false
    },
    {
        id: 4,
        nombre: 'New Balance 574',
        precio: 79990,
        stock: 12,
        imagen: '👟',
        destacado: true
    }
];

// Regiones - Como en tus clases
const regiones = {
    'metropolitana': ['Santiago', 'Maipú', 'Las Condes', 'Providencia'],
    'valparaiso': ['Valparaíso', 'Viña del Mar', 'Quilpué'],
    'biobio': ['Concepción', 'Talcahuano', 'Chillán']
};

// FUNCIÓN PRINCIPAL - Solo carga UNA página a la vez
function cargarPagina(pagina) {
    // Actualizar navegación
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Obtener contenedor principal
    const contenedor = document.getElementById('contenido-principal');
    
    // Limpiar contenido anterior
    contenedor.innerHTML = '';
    
    // Cargar solo la página solicitada
    switch(pagina) {
        case 'inicio':
            contenedor.innerHTML = obtenerHTML_Inicio();
            inicializarInicio();
            break;
        case 'productos':
            contenedor.innerHTML = obtenerHTML_Productos();
            inicializarProductos();
            break;
        case 'registro':
            contenedor.innerHTML = obtenerHTML_Registro();
            inicializarRegistro();
            break;
        case 'login':
            contenedor.innerHTML = obtenerHTML_Login();
            inicializarLogin();
            break;
        case 'contacto':
            contenedor.innerHTML = obtenerHTML_Contacto();
            inicializarContacto();
            break;
        case 'carrito':
            contenedor.innerHTML = obtenerHTML_Carrito();
            inicializarCarrito();
            break;
    }
    
    paginaActual = pagina;
}

// HTML TEMPLATES - Cada página por separado
function obtenerHTML_Inicio() {
    return `
        <div class="hero-nike">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="hero-content">
                            <h1>Just Do It</h1>
                            <p>Encuentra las zapatillas perfectas para tu estilo</p>
                            <button class="btn-nike" onclick="cargarPagina('productos')">
                                Explorar Zapatillas
                            </button>
                        </div>
                    </div>
                    <div class="col-lg-6 text-center">
                        <div style="font-size: 10rem;">👟</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container py-5">
            <h2 class="text-center mb-5" style="font-weight: 700;">DESTACADOS</h2>
            <div class="row" id="destacados-container">
                <!-- Se carga con JavaScript -->
            </div>
        </div>
    `;
}

function obtenerHTML_Productos() {
    return `
        <div class="container py-5">
            <h1 class="text-center mb-5" style="font-weight: 700;">TODAS LAS ZAPATILLAS</h1>
            <div class="row" id="productos-container">
                <!-- Se carga con JavaScript -->
            </div>
        </div>
    `;
}

function obtenerHTML_Registro() {
    return `
        <div class="container py-5">
            <div class="form-nike">
                <h2>Crear Cuenta</h2>
                <form id="formRegistro">
                    <div class="mb-3">
                        <input type="text" class="form-control form-control-nike" id="run" placeholder="RUN (ej: 12345678K)" required>
                        <div class="error-nike" id="error-run"></div>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control form-control-nike" id="nombre" placeholder="Nombre" maxlength="50" required>
                        <div class="error-nike" id="error-nombre"></div>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control form-control-nike" id="apellidos" placeholder="Apellidos" maxlength="100" required>
                        <div class="error-nike" id="error-apellidos"></div>
                    </div>
                    <div class="mb-3">
                        <input type="email" class="form-control form-control-nike" id="correo" placeholder="Correo electrónico" maxlength="100" required>
                        <div class="error-nike" id="error-correo"></div>
                    </div>
                    <div class="mb-3">
                        <select class="form-control form-control-nike" id="region" required>
                            <option value="">Seleccionar región</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <select class="form-control form-control-nike" id="comuna" required>
                            <option value="">Seleccionar comuna</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control form-control-nike" id="direccion" placeholder="Dirección" maxlength="300" required>
                        <div class="error-nike" id="error-direccion"></div>
                    </div>
                    <button type="submit" class="btn-nike w-100">REGISTRARSE</button>
                </form>
                <div class="alert alert-success mt-3 d-none" id="exitoRegistro">
                    ¡Cuenta creada exitosamente!
                </div>
            </div>
        </div>
    `;
}

function obtenerHTML_Login() {
    return `
        <div class="container py-5">
            <div class="form-nike">
                <h2>Iniciar Sesión</h2>
                <form id="formLogin">
                    <div class="mb-3">
                        <input type="email" class="form-control form-control-nike" id="correoLogin" placeholder="Correo electrónico" required>
                        <div class="error-nike" id="error-correoLogin"></div>
                    </div>
                    <div class="mb-3">
                        <input type="password" class="form-control form-control-nike" id="password" placeholder="Contraseña" required>
                        <div class="error-nike" id="error-password"></div>
                    </div>
                    <button type="submit" class="btn-nike w-100">INICIAR SESIÓN</button>
                </form>
                <p class="text-center mt-3">
                    ¿No tienes cuenta? <a href="#" onclick="cargarPagina('registro')" style="color: #111;">Regístrate</a>
                </p>
            </div>
        </div>
    `;
}

function obtenerHTML_Contacto() {
    return `
        <div class="container py-5">
            <div class="form-nike">
                <h2>Contáctanos</h2>
                <form id="formContacto">
                    <div class="mb-3">
                        <input type="text" class="form-control form-control-nike" id="nombreContacto" placeholder="Tu nombre" maxlength="100" required>
                        <div class="error-nike" id="error-nombreContacto"></div>
                    </div>
                    <div class="mb-3">
                        <input type="email" class="form-control form-control-nike" id="correoContacto" placeholder="Tu correo" maxlength="100" required>
                        <div class="error-nike" id="error-correoContacto"></div>
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control form-control-nike" id="comentario" placeholder="Tu mensaje" maxlength="500" rows="4" required></textarea>
                        <div class="error-nike" id="error-comentario"></div>
                    </div>
                    <button type="submit" class="btn-nike w-100">ENVIAR MENSAJE</button>
                </form>
                <div class="alert alert-success mt-3 d-none" id="exitoContacto">
                    ¡Mensaje enviado correctamente!
                </div>
            </div>
        </div>
    `;
}

function obtenerHTML_Carrito() {
    return `
        <div class="container py-5">
            <h1 class="text-center mb-5" style="font-weight: 700;">MI CARRITO</h1>
            <div id="contenido-carrito">
                <!-- Se carga con JavaScript -->
            </div>
        </div>
    `;
}

// FUNCIONES DE INICIALIZACIÓN - Se ejecutan solo cuando se carga cada página
function inicializarInicio() {
    mostrarDestacados();
}

function inicializarProductos() {
    mostrarTodosLosProductos();
}

function inicializarRegistro() {
    cargarRegiones();
    configurarFormularioRegistro();
}

function inicializarLogin() {
    configurarFormularioLogin();
}

function inicializarContacto() {
    configurarFormularioContacto();
}

function inicializarCarrito() {
    mostrarCarrito();
}

// FUNCIONES DE PRODUCTOS - Como en tus clases
function formatearPrecio(precio) {
    return '$' + precio.toLocaleString('es-CL');
}

function mostrarDestacados() {
    const contenedor = document.getElementById('destacados-container');
    const destacadas = zapatillas.filter(z => z.destacado);
    
    contenedor.innerHTML = '';
    destacadas.forEach(zapatilla => {
        contenedor.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="zapatilla-card">
                    <div class="zapatilla-imagen">${zapatilla.imagen}</div>
                    <div class="p-3">
                        <h5 style="font-weight: 600;">${zapatilla.nombre}</h5>
                        <div class="precio-nike">${formatearPrecio(zapatilla.precio)}</div>
                        <button class="btn-nike w-100 mt-2" onclick="agregarAlCarrito(${zapatilla.id})">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

function mostrarTodosLosProductos() {
    const contenedor = document.getElementById('productos-container');
    contenedor.innerHTML = '';
    
    zapatillas.forEach(zapatilla => {
        contenedor.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="zapatilla-card">
                    <div class="zapatilla-imagen">${zapatilla.imagen}</div>
                    <div class="p-3">
                        <h5 style="font-weight: 600;">${zapatilla.nombre}</h5>
                        <p class="text-muted">Stock: ${zapatilla.stock}</p>
                        <div class="precio-nike">${formatearPrecio(zapatilla.precio)}</div>
                        <button class="btn-nike w-100 mt-2" onclick="agregarAlCarrito(${zapatilla.id})">
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// FUNCIONES DEL CARRITO - Como en tus clases
function agregarAlCarrito(id) {
    const zapatilla = zapatillas.find(z => z.id === id);
    
    if (zapatilla && zapatilla.stock > 0) {
        const productoEnCarrito = carrito.find(item => item.id === id);
        
        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({
                id: zapatilla.id,
                nombre: zapatilla.nombre,
                precio: zapatilla.precio,
                cantidad: 1
            });
        }
        
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContador();
        alert('¡Producto agregado!');
    }
}

function actualizarContador() {
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('contador').textContent = total;
}

function mostrarCarrito() {
    const contenedor = document.getElementById('contenido-carrito');
    
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center">
                <h3>Tu carrito está vacío</h3>
                <button class="btn-nike mt-3" onclick="cargarPagina('productos')">
                    Ver Zapatillas
                </button>
            </div>
        `;
        return;
    }
    
    let html = '';
    let total = 0;
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        html += `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <h5>${item.nombre}</h5>
                            <p class="text-muted">${formatearPrecio(item.precio)} c/u</p>
                        </div>
                        <div class="col-md-3">
                            <span>Cantidad: ${item.cantidad}</span>
                        </div>
                        <div class="col-md-3 text-end">
                            <strong>${formatearPrecio(subtotal)}</strong>
                            <br>
                            <button class="btn btn-sm btn-outline-danger mt-1" onclick="eliminarDelCarrito(${item.id})">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
        <div class="card bg-dark text-white">
            <div class="card-body text-center">
                <h3>Total: ${formatearPrecio(total)}</h3>
                <button class="btn btn-warning btn-lg mt-3" onclick="finalizarCompra()">
                    COMPRAR AHORA
                </button>
            </div>
        </div>
    `;
    
    contenedor.innerHTML = html;
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    mostrarCarrito();
}

function finalizarCompra() {
    alert('¡Compra realizada! Gracias por elegir SneakerStore');
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarContador();
    mostrarCarrito();
}

// VALIDACIONES - Como en tus clases
function validarRUN(run) {
    return run.length >= 8 && run.length <= 10;
}

function validarEmail(email) {
    const dominios = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominios.some(dominio => email.includes(dominio));
}

function mostrarError(campo, mensaje) {
    document.getElementById(`error-${campo}`).textContent = mensaje;
    document.getElementById(`error-${campo}`).style.display = 'block';
}

function limpiarError(campo) {
    document.getElementById(`error-${campo}`).style.display = 'none';
}

// FORMULARIOS - Como en tus clases
function cargarRegiones() {
    const selectRegion = document.getElementById('region');
    Object.keys(regiones).forEach(region => {
        selectRegion.innerHTML += `<option value="${region}">${region}</option>`;
    });
    
    selectRegion.addEventListener('change', function() {
        const selectComuna = document.getElementById('comuna');
        selectComuna.innerHTML = '<option value="">Seleccionar comuna</option>';
        
        if (regiones[this.value]) {
            regiones[this.value].forEach(comuna => {
                selectComuna.innerHTML += `<option value="${comuna}">${comuna}</option>`;
            });
        }
    });
}

function configurarFormularioRegistro() {
    document.getElementById('formRegistro').addEventListener('submit', function(e) {
        e.preventDefault();
        
        let valido = true;
        
        const run = document.getElementById('run').value;
        if (!run || !validarRUN(run)) {
            mostrarError('run', 'RUN inválido');
            valido = false;
        } else {
            limpiarError('run');
        }
        
        const correo = document.getElementById('correo').value;
        if (!correo || !validarEmail(correo)) {
            mostrarError('correo', 'Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
            valido = false;
        } else {
            limpiarError('correo');
        }
        
        if (valido) {
            document.getElementById('exitoRegistro').classList.remove('d-none');
            this.reset();
        }
    });
}

function configurarFormularioLogin() {
    document.getElementById('formLogin').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const correo = document.getElementById('correoLogin').value;
        const password = document.getElementById('password').value;
        
        if (validarEmail(correo) && password.length >= 4 && password.length <= 10) {
            alert('¡Bienvenido!');
            cargarPagina('inicio');
        } else {
            alert('Credenciales inválidas');
        }
    });
}

function configurarFormularioContacto() {
    document.getElementById('formContacto').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombreContacto').value;
        const correo = document.getElementById('correoContacto').value;
        const comentario = document.getElementById('comentario').value;
        
        if (nombre && validarEmail(correo) && comentario) {
            document.getElementById('exitoContacto').classList.remove('d-none');
            this.reset();
        }
    });
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito guardado
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContador();
    }
    
    // Cargar página inicial
    cargarPagina('inicio');
});
