// Array de zapatillas - 
const productos = [
    {
        id: 1,
        codigo: 'NIKE001',
        nombre: 'Nike Air Max 270',
        descripcion: 'Zapatillas urbanas con tecnología Air Max para máximo confort. Perfectas para uso diario con un diseño moderno y llamativo.',
        precio: 89990,
        stock: 15,
        stockCritico: 5,
        categoria: 'casual',
        marca: 'nike',
        destacado: true
    },
    {
        id: 2,
        codigo: 'ADIDAS001',
        nombre: 'Adidas Ultraboost 22',
        descripcion: 'Zapatillas de running con amortiguación Boost. Diseñadas para corredores que buscan máximo rendimiento.',
        precio: 119990,
        stock: 12,
        stockCritico: 3,
        categoria: 'running',
        marca: 'adidas',
        destacado: true
    },
    {
        id: 3,
        codigo: 'PUMA001',
        nombre: 'Puma RS-X',
        descripcion: 'Zapatillas retro con diseño llamativo y comodidad excepcional. Inspiradas en los años 80.',
        precio: 69990,
        stock: 20,
        stockCritico: 5,
        categoria: 'casual',
        marca: 'puma',
        destacado: false
    },
    {
        id: 4,
        codigo: 'NIKE002',
        nombre: 'Nike LeBron 20',
        descripcion: 'Zapatillas de basketball profesional. Diseñadas para jugadores que necesitan máximo soporte.',
        precio: 159990,
        stock: 8,
        stockCritico: 2,
        categoria: 'basketball',
        marca: 'nike',
        destacado: true
    },
    {
        id: 5,
        codigo: 'NB001',
        nombre: 'New Balance 574',
        descripcion: 'Clásicas zapatillas lifestyle con estilo retro. Un ícono atemporal que combina comodidad.',
        precio: 79990,
        stock: 18,
        stockCritico: 4,
        categoria: 'casual',
        marca: 'newbalance',
        destacado: true
    }
];

// Función para formatear precio - 
function formatearPrecio(precio) {
    return '$' + precio.toLocaleString('es-CL');
}

// Función para obtener color de marca
function getMarcaColor(marca) {
    const colores = {
        'nike': 'bg-danger',
        'adidas': 'bg-primary',
        'puma': 'bg-warning text-dark',
        'newbalance': 'bg-success'
    };
    return colores[marca] || 'bg-secondary';
}

// Mostrar productos destacados - Con modal
function mostrarDestacados() {
    const contenedor = document.getElementById('destacados-container');
    if (!contenedor) return;
    
    const destacadas = productos.filter(p => p.destacado);
    contenedor.innerHTML = '';
    
    destacadas.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-md-3 mb-4">
                <div class="zapatilla-card" onclick="window.location.href='detalle-producto.html?id=${producto.id}'">
                    <div class="zapatilla-imagen">👟</div>
                    <div class="p-3">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 style="font-weight: 600; color: #111;">${producto.nombre}</h5>
                            <span class="badge ${getMarcaColor(producto.marca)} marca-badge">${producto.marca.toUpperCase()}</span>
                        </div>
                        <p class="text-muted small">${producto.descripcion.substring(0, 80)}...</p>
                        <div class="precio-nike">${formatearPrecio(producto.precio)}</div>
                    </div>
                </div>
                <div class="p-3 pt-0">
                    <button class="btn-nike w-100" onclick="event.stopPropagation(); mostrarModalAgregar(${producto.id})">
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
    });
}

// Mostrar todos los productos
function mostrarTodosLosProductos() {
    mostrarProductos(productos);
}

// Función general para mostrar productos - Con modal
function mostrarProductos(productosArray) {
    const contenedor = document.getElementById('productos-container');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    productosArray.forEach(producto => {
        const stockClass = producto.stock <= producto.stockCritico ? 'bg-danger' : 'bg-success';
        const stockTexto = producto.stock <= producto.stockCritico ? 'Stock Crítico' : 'Disponible';
        
        contenedor.innerHTML += `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="zapatilla-card" onclick="window.location.href='detalle-producto.html?id=${producto.id}'">
                    <div class="zapatilla-imagen">👟</div>
                    <div class="p-3">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 style="font-weight: 600; color: #111;">${producto.nombre}</h5>
                            <span class="badge ${getMarcaColor(producto.marca)} marca-badge">${producto.marca.toUpperCase()}</span>
                        </div>
                        <p class="text-muted small">${producto.descripcion.substring(0, 80)}...</p>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <div class="precio-nike">${formatearPrecio(producto.precio)}</div>
                            <span class="badge ${stockClass}">${stockTexto}</span>
                        </div>
                    </div>
                </div>
                <div class="p-3 pt-0">
                    <button class="btn-nike w-100" onclick="event.stopPropagation(); mostrarModalAgregar(${producto.id})">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
    });
}
