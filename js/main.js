// ==========================
// Modal "Agregar al carrito"
// ==========================
function mostrarModalAgregar(id) {
  const producto = (window.productos || []).find(p => p.id === id);
  if (!producto) return;

  // Evitar modales duplicados
  const yaAbierto = document.getElementById('modal-overlay');
  if (yaAbierto) yaAbierto.remove();

  const stockCritico = Number.isFinite(producto.stockCritico) ? producto.stockCritico : 0;
  const stockEsCritico = (producto.stock || 0) <= stockCritico;
  const stockTexto = (producto.stock || 0) <= 0 ? 'Sin stock' : (stockEsCritico ? 'Stock Crítico' : 'Disponible');

  // Tallas dinámicas si vienen en el producto; si no, fallback estándar
  const tallas = Array.isArray(producto.tallas) && producto.tallas.length
    ? producto.tallas
    : [38, 39, 40, 41, 42, 43];

  const marcaClass = (typeof window.getMarcaColor === 'function')
    ? getMarcaColor(producto.marca)
    : 'bg-secondary';

  const precioFmt = (typeof window.formatearPrecio === 'function')
    ? formatearPrecio(producto.precio)
    : `$${(producto.precio ?? 0)}`;

  const disabledAttr = (producto.stock || 0) <= 0 ? 'disabled' : '';

  const modalHTML = `
    <div class="modal-overlay" id="modal-overlay" onclick="cerrarModalSiClickFuera(event)">
      <div class="modal-content">
        <button class="modal-close" onclick="cerrarModal()">×</button>

        <div class="modal-header">
          <div>
            <h3 style="margin:0;font-weight:700;">${producto.nombre}</h3>
            <span class="badge ${marcaClass} marca-badge mt-2">${String(producto.marca || '').toUpperCase()}</span>
          </div>
        </div>

        <div class="modal-product-img">👟</div>

        <div class="mb-3">
          <p class="text-muted">${producto.descripcion ?? ''}</p>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-3">
          <div class="precio-nike" style="font-size:1.5rem;">${precioFmt}</div>
          <span class="badge ${stockEsCritico ? 'bg-danger' : 'bg-success'} fs-6">
            ${stockTexto} (${producto.stock ?? 0})
          </span>
        </div>

        <div class="talla-selector">
          <label>Selecciona tu talla:</label>
          <div class="talla-options">
            ${tallas.map((t, i) => `
              <div class="talla-option ${i===0 ? 'selected' : ''}" data-talla="${t}">${t}</div>
            `).join('')}
          </div>
        </div>

        <div class="modal-actions">
          <button class="btn-cancel" onclick="cerrarModal()">Cancelar</button>
          <button class="btn-confirm" onclick="confirmarAgregarCarrito(${Number(producto.id)})" ${disabledAttr}>
            <i class="fas fa-cart-plus"></i> Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // Listeners de selección de talla
  document.querySelectorAll('.talla-option').forEach(option => {
    option.addEventListener('click', function () {
      document.querySelectorAll('.talla-option').forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Cerrar con ESC
  document.addEventListener('keydown', manejarEscModal);
}

function manejarEscModal(e) {
  if (e.key === 'Escape') cerrarModal();
}

// Confirmar agregar al carrito desde modal
function confirmarAgregarCarrito(id) {
  const tallaSeleccionada = document.querySelector('.talla-option.selected')?.dataset.talla ?? null;
  if (typeof window.agregarAlCarrito === 'function') {
    agregarAlCarrito(id, tallaSeleccionada);
  }
  cerrarModal();
}

// Cerrar modal
function cerrarModal() {
  const modal = document.getElementById('modal-overlay');
  if (modal) {
    modal.style.animation = 'fadeOut 0.2s ease forwards';
    setTimeout(() => modal.remove(), 200);
  }
  document.removeEventListener('keydown', manejarEscModal);
}

// Cerrar modal si se hace click fuera
function cerrarModalSiClickFuera(event) {
  if (event.target.id === 'modal-overlay') cerrarModal();
}

// ==========================
// Visibilidad enlaces Admin
// ==========================
function mostrarEnlacesAdmin() {
  document.querySelectorAll('.admin-link').forEach(link => {
    link.style.display = 'block';
  });
  localStorage.setItem('esAdmin', 'true');
}

function ocultarEnlacesAdmin() {
  document.querySelectorAll('.admin-link').forEach(link => {
    link.style.display = 'none';
  });
  localStorage.removeItem('esAdmin');
}

function verificarSesionAdmin() {
  const esAdmin = localStorage.getItem('esAdmin') === 'true';
  if (esAdmin) mostrarEnlacesAdmin();
}

// ==========================
// Logout simple (demo)
// ==========================
function logout() {
  ocultarEnlacesAdmin();
  alert('Sesión cerrada correctamente');
  window.location.href = 'index.html';
}

// ==========================
// Inicialización global
// ==========================
document.addEventListener('DOMContentLoaded', function () {
  // Contador del header si existe
  if (document.getElementById('contador') && typeof window.cargarCarrito === 'function') {
    cargarCarrito();
  }
  // Enlaces admin según estado
  verificarSesionAdmin();
});

// ==========================
// Animación fadeOut (modal)
// ==========================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
`;
document.head.appendChild(style);

// Exponer funciones globales si se requiere
window.mostrarModalAgregar = mostrarModalAgregar;
window.cerrarModal = cerrarModal;
window.cerrarModalSiClickFuera = cerrarModalSiClickFuera;
window.confirmarAgregarCarrito = confirmarAgregarCarrito;
window.mostrarEnlacesAdmin = mostrarEnlacesAdmin;
window.ocultarEnlacesAdmin = ocultarEnlacesAdmin;
window.verificarSesionAdmin = verificarSesionAdmin;
window.logout = logout;
