// Variable global del carrito - Como en tus clases
let carrito = [];

// Cargar carrito desde localStorage - Como en tus clases
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito-sneakers');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
    actualizarContador();
}

// Guardar carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito-sneakers', JSON.stringify(carrito));
}

// Agregar producto al carrito - Como en tus clases
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    
    if (producto && producto.stock > 0) {
        const productoEnCarrito = carrito.find(item => item.id === id);
        
        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad >= producto.stock) {
                alert('No hay suficiente stock disponible');
                return;
            }
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                marca: producto.marca,
                cantidad: 1
            });
        }
        
        guardarCarrito();
        actualizarContador();
        alert('¡Producto agregado al carrito!');
    } else {
        alert('Producto sin stock disponible');
    }
}

// NUEVA FUNCIÓN: Aumentar cantidad
function aumentarCantidad(id) {
    const producto = productos.find(p => p.id === id);
    const productoEnCarrito = carrito.find(item => item.id === id);
    
    if (productoEnCarrito && productoEnCarrito.cantidad < producto.stock) {
        productoEnCarrito.cantidad++;
        guardarCarrito();
        actualizarContador();
        mostrarCarrito();
    } else {
        alert('No hay más stock disponible');
    }
}

// NUEVA FUNCIÓN: Disminuir cantidad
function disminuirCantidad(id) {
    const productoEnCarrito = carrito.find(item => item.id === id);
    
    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad--;
            guardarCarrito();
            actualizarContador();
            mostrarCarrito();
        } else {
            // Si la cantidad es 1, eliminar del carrito
            eliminarDelCarrito(id);
        }
    }
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
}

// Actualizar contador del carrito
function actualizarContador() {
    const contador = document.getElementById('contador');
    if (contador) {
        const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        contador.textContent = total;
    }
}

// CARRITO MEJORADO: Con controles de cantidad
function mostrarCarrito() {
    const contenedor = document.getElementById('contenido-carrito');
    if (!contenedor) return;
    
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center">
                <h3>Tu carrito está vacío</h3>
                <a href="productos.html" class="btn-nike mt-3">
                    Ver Zapatillas
                </a>
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
            <div class="carrito-item">
                <div class="row align-items-center">
                    <div class="col-md-5">
                        <h5>${item.nombre}</h5>
                        <p class="text-muted">
                            <span class="badge ${getMarcaColor(item.marca)} me-2">${item.marca.toUpperCase()}</span>
                            ${formatearPrecio(item.precio)} c/u
                        </p>
                    </div>
                    <div class="col-md-3">
                        <div class="cantidad-controls">
                            <button class="cantidad-btn" onclick="disminuirCantidad(${item.id})" 
                                ${item.cantidad <= 1 ? 'title="Eliminar producto"' : ''}>
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="mx-3 fw-bold fs-5">${item.cantidad}</span>
                            <button class="cantidad-btn" onclick="aumentarCantidad(${item.id})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-3 text-center">
                        <strong class="fs-5">${formatearPrecio(subtotal)}</strong>
                    </div>
                    <div class="col-md-1">
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${item.id})" title="Eliminar producto">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `
        <div class="card bg-dark text-white mt-4">
            <div class="card-body text-center">
                <h3>Total: ${formatearPrecio(total)}</h3>
                <button class="btn btn-warning btn-lg mt-3" onclick="finalizarCompra()">
                    <i class="fas fa-credit-card"></i> FINALIZAR COMPRA
                </button>
            </div>
        </div>
    `;
    
    contenedor.innerHTML = html;
}

// Finalizar compra
function finalizarCompra() {
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    alert(`¡Compra realizada por ${formatearPrecio(total)}! Gracias por elegir SneakerStore`);
    
    carrito = [];
    localStorage.removeItem('carrito-sneakers');
    actualizarContador();
    mostrarCarrito();
}
