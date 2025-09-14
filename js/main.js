// Función para mostrar modal de agregar al carrito
function mostrarModalAgregar(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    const stockClass = producto.stock <= producto.stockCritico ? 'text-danger' : 'text-success';
    const stockTexto = producto.stock <= producto.stockCritico ? 'Stock Crítico' : 'Disponible';
    
    const modalHTML = `
        <div class="modal-overlay" id="modal-overlay" onclick="cerrarModalSiClickFuera(event)">
            <div class="modal-content">
                <button class="modal-close" onclick="cerrarModal()">×</button>
                
                <div class="modal-header">
                    <div>
                        <h3 style="margin: 0; font-weight: 700;">${producto.nombre}</h3>
                        <span class="badge ${getMarcaColor(producto.marca)} marca-badge mt-2">${producto.marca.toUpperCase()}</span>
                    </div>
                </div>
                
                <div class="modal-product-img">👟</div>
                
                <div class="mb-3">
                    <p class="text-muted">${producto.descripcion}</p>
                </div>
                
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="precio-nike" style="font-size: 1.5rem;">${formatearPrecio(producto.precio)}</div>
                    <span class="badge ${producto.stock <= producto.stockCritico ? 'bg-danger' : 'bg-success'} fs-6">
                        ${stockTexto} (${producto.stock})
                    </span>
                </div>
                
                <div class="talla-selector">
                    <label>Selecciona tu talla:</label>
                    <div class="talla-options">
                        <div class="talla-option selected" data-talla="38">38</div>
                        <div class="talla-option" data-talla="39">39</div>
                        <div class="talla-option" data-talla="40">40</div>
                        <div class="talla-option" data-talla="41">41</div>
                        <div class="talla-option" data-talla="42">42</div>
                        <div class="talla-option" data-talla="43">43</div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-cancel" onclick="cerrarModal()">Cancelar</button>
                    <button class="btn-confirm" onclick="confirmarAgregarCarrito(${producto.id})" 
                        ${producto.stock <= 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Event listeners para las tallas
    document.querySelectorAll('.talla-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.talla-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
}

// Confirmar agregar al carrito desde modal
function confirmarAgregarCarrito(id) {
    const tallaSeleccionada = document.querySelector('.talla-option.selected')?.dataset.talla;
    
    // Agregar al carrito con la talla seleccionada
    agregarAlCarrito(id, tallaSeleccionada);
    cerrarModal();
}

// Cerrar modal
function cerrarModal() {
    const modal = document.getElementById('modal-overlay');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Cerrar modal si se hace click fuera
function cerrarModalSiClickFuera(event) {
    if (event.target.id === 'modal-overlay') {
        cerrarModal();
    }
}

// Función para mostrar/ocultar enlaces de admin
function mostrarEnlacesAdmin() {
    const adminLinks = document.querySelectorAll('.admin-link');
    adminLinks.forEach(link => {
        link.style.display = 'block';
    });
    
    // Guardar estado en localStorage
    localStorage.setItem('esAdmin', 'true');
}

function ocultarEnlacesAdmin() {
    const adminLinks = document.querySelectorAll('.admin-link');
    adminLinks.forEach(link => {
        link.style.display = 'none';
    });
    
    // Limpiar estado
    localStorage.removeItem('esAdmin');
}

// Verificar si ya está logueado como admin
function verificarSesionAdmin() {
    const esAdmin = localStorage.getItem('esAdmin');
    if (esAdmin === 'true') {
        mostrarEnlacesAdmin();
    }
}

// Logout función
function logout() {
    ocultarEnlacesAdmin();
    alert('Sesión cerrada correctamente');
    window.location.href = 'index.html';
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito si existe el contador
    if (document.getElementById('contador')) {
        cargarCarrito();
    }
    
    // Verificar sesión admin
    verificarSesionAdmin();
});

// Agregar CSS para la animación de salida del modal
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
