// ==========================
// Modal "Agregar al carrito" (con cleanup mejorado)
// ==========================
let modalActivo = null;
let eventListenersModal = [];

function mostrarModalAgregar(id) {
  try {
    const producto = (window.productos || []).find(p => p.id === id);
    if (!producto) {
      console.error('Producto no encontrado:', id);
      return;
    }

    // Evitar modales duplicados y limpiar anterior
    if (modalActivo) {
      cerrarModal();
    }

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
      <div class="modal-overlay" id="modal-overlay" data-producto-id="${id}">
        <div class="modal-content">
          <button class="modal-close" type="button">×</button>

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
            <button class="btn-cancel" type="button">Cancelar</button>
            <button class="btn-confirm" type="button" ${disabledAttr}>
              <i class="fas fa-cart-plus"></i> Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    `;

    // Insertar modal en el DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    modalActivo = document.getElementById('modal-overlay');

    // Configurar event listeners con cleanup tracking
    configurarEventListenersModal(parseInt(id, 10));

  } catch (error) {
    console.error('Error al mostrar modal:', error);
    mostrarError('Error al mostrar el modal del producto');
  }
}

function configurarEventListenersModal(productoId) {
  if (!modalActivo) return;

  try {
    // Limpiar listeners anteriores
    limpiarEventListenersModal();

    // Crear funciones nombradas para poder removerlas
    const handlers = {
      clickOverlay: (e) => {
        if (e.target.id === 'modal-overlay') cerrarModal();
      },
      
      clickClose: () => cerrarModal(),
      
      clickConfirm: () => confirmarAgregarCarrito(productoId),
      
      keydownEsc: (e) => {
        if (e.key === 'Escape') cerrarModal();
      }
    };

    // Selección de tallas
    const tallaOptions = modalActivo.querySelectorAll('.talla-option');
    tallaOptions.forEach(option => {
      const tallaHandler = function () {
        tallaOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
      };
      option.addEventListener('click', tallaHandler);
      eventListenersModal.push({ element: option, event: 'click', handler: tallaHandler });
    });

    // Event listeners principales
    const btnClose = modalActivo.querySelector('.modal-close');
    const btnCancel = modalActivo.querySelector('.btn-cancel');
    const btnConfirm = modalActivo.querySelector('.btn-confirm');

    if (btnClose) {
      btnClose.addEventListener('click', handlers.clickClose);
      eventListenersModal.push({ element: btnClose, event: 'click', handler: handlers.clickClose });
    }

    if (btnCancel) {
      btnCancel.addEventListener('click', handlers.clickClose);
      eventListenersModal.push({ element: btnCancel, event: 'click', handler: handlers.clickClose });
    }

    if (btnConfirm) {
      btnConfirm.addEventListener('click', handlers.clickConfirm);
      eventListenersModal.push({ element: btnConfirm, event: 'click', handler: handlers.clickConfirm });
    }

    // Click fuera del modal
    modalActivo.addEventListener('click', handlers.clickOverlay);
    eventListenersModal.push({ element: modalActivo, event: 'click', handler: handlers.clickOverlay });

    // ESC key
    document.addEventListener('keydown', handlers.keydownEsc);
    eventListenersModal.push({ element: document, event: 'keydown', handler: handlers.keydownEsc });

  } catch (error) {
    console.error('Error configurando event listeners:', error);
  }
}

function limpiarEventListenersModal() {
  eventListenersModal.forEach(({ element, event, handler }) => {
    try {
      if (element && typeof element.removeEventListener === 'function') {
        element.removeEventListener(event, handler);
      }
    } catch (error) {
      console.warn('Error removiendo event listener:', error);
    }
  });
  eventListenersModal = [];
}

// Confirmar agregar al carrito desde modal
function confirmarAgregarCarrito(id) {
  try {
    if (!modalActivo) return;

    const tallaSeleccionada = modalActivo.querySelector('.talla-option.selected')?.dataset.talla ?? null;
    
    if (typeof window.agregarAlCarrito === 'function') {
      const resultado = agregarAlCarrito(id, tallaSeleccionada);
      if (resultado) {
        cerrarModal();
      }
    } else {
      console.error('Función agregarAlCarrito no disponible');
      mostrarError('Error: función de carrito no disponible');
    }
  } catch (error) {
    console.error('Error al confirmar agregar al carrito:', error);
    mostrarError('Error al agregar producto al carrito');
  }
}

// Cerrar modal con cleanup completo
function cerrarModal() {
  try {
    if (!modalActivo) return;

    // Limpiar event listeners
    limpiarEventListenersModal();

    // Animación de salida
    modalActivo.style.animation = 'fadeOut 0.2s ease forwards';
    
    setTimeout(() => {
      if (modalActivo && modalActivo.parentNode) {
        modalActivo.parentNode.removeChild(modalActivo);
      }
      modalActivo = null;
    }, 200);

  } catch (error) {
    console.error('Error al cerrar modal:', error);
    // Fallback: forzar eliminación
    if (modalActivo) {
      try {
        modalActivo.remove();
      } catch (removeError) {
        console.error('Error al forzar eliminación de modal:', removeError);
      }
      modalActivo = null;
    }
  }
}

// Cerrar modal si se hace click fuera (legacy, mantenido por compatibilidad)
function cerrarModalSiClickFuera(event) {
  if (event.target.id === 'modal-overlay') {
    cerrarModal();
  }
}

// ==========================
// Visibilidad enlaces Admin (mejorado)
// ==========================
function mostrarEnlacesAdmin() {
  try {
    const adminLinks = document.querySelectorAll('.admin-link');
    adminLinks.forEach(link => {
      if (link && typeof link.style !== 'undefined') {
        link.style.display = 'block';
      }
    });
    
    // Verificar disponibilidad de localStorage
    if (isLocalStorageDisponible()) {
      localStorage.setItem('esAdmin', 'true');
    }
  } catch (error) {
    console.error('Error al mostrar enlaces admin:', error);
  }
}

function ocultarEnlacesAdmin() {
  try {
    const adminLinks = document.querySelectorAll('.admin-link');
    adminLinks.forEach(link => {
      if (link && typeof link.style !== 'undefined') {
        link.style.display = 'none';
      }
    });
    
    if (isLocalStorageDisponible()) {
      localStorage.removeItem('esAdmin');
    }
  } catch (error) {
    console.error('Error al ocultar enlaces admin:', error);
  }
}

function verificarSesionAdmin() {
  try {
    if (!isLocalStorageDisponible()) {
      console.warn('localStorage no disponible para verificar sesión admin');
      return;
    }

    const esAdmin = localStorage.getItem('esAdmin') === 'true';
    if (esAdmin) {
      mostrarEnlacesAdmin();
    }
  } catch (error) {
    console.error('Error al verificar sesión admin:', error);
  }
}

// Helper para verificar localStorage
function isLocalStorageDisponible() {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}

// ==========================
// Logout mejorado
// ==========================
function logout() {
  try {
    ocultarEnlacesAdmin();
    
    // Limpiar otros datos de sesión si existen
    if (isLocalStorageDisponible()) {
      // Mantener datos importantes como carrito
      const datosAMantener = ['carrito-sneakers'];
      const datosOriginales = {};
      
      datosAMantener.forEach(key => {
        try {
          const valor = localStorage.getItem(key);
          if (valor) datosOriginales[key] = valor;
        } catch (error) {
          console.warn(`Error preservando ${key}:`, error);
        }
      });

      // Limpiar localStorage relacionado con admin
      ['esAdmin', 'admin-session', 'admin-token'].forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.warn(`Error removiendo ${key}:`, error);
        }
      });

      // Restaurar datos importantes
      Object.entries(datosOriginales).forEach(([key, value]) => {
        try {
          localStorage.setItem(key, value);
        } catch (error) {
          console.warn(`Error restaurando ${key}:`, error);
        }
      });
    }

    mostrarMensaje('Sesión cerrada correctamente', 'success');
    
    // Redirigir después de un breve delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
    
  } catch (error) {
    console.error('Error en logout:', error);
    // Fallback: redirigir anyway
    window.location.href = 'index.html';
  }
}

// ==========================
// Funciones de utilidad
// ==========================

// Mostrar mensajes de error/éxito de manera consistente
function mostrarError(mensaje) {
  console.error('Error:', mensaje);
  mostrarMensaje(mensaje, 'error');
}

function mostrarExito(mensaje) {
  console.log('Éxito:', mensaje);
  mostrarMensaje(mensaje, 'success');
}

function mostrarMensaje(mensaje, tipo = 'info') {
  try {
    // Si existe una función personalizada de mensajes, usarla
    if (typeof window.mostrarNotificacion === 'function') {
      window.mostrarNotificacion(mensaje, tipo);
      return;
    }

    // Fallback a alert (mejorar en el futuro con toast/notifications)
    if (typeof alert !== 'undefined') {
      alert(mensaje);
    }
  } catch (error) {
    console.error('Error al mostrar mensaje:', error);
  }
}

// Verificar funciones críticas al inicializar
function verificarDependencias() {
  const funcionesCriticas = [
    'agregarAlCarrito',
    'cargarCarrito',
    'productos'
  ];

  const faltantes = funcionesCriticas.filter(fn => typeof window[fn] === 'undefined');
  
  if (faltantes.length > 0) {
    console.warn('Funciones/variables no disponibles:', faltantes);
  }

  return faltantes.length === 0;
}

// ==========================
// Inicialización global mejorada
// ==========================
function inicializarMain() {
  try {
    // Verificar dependencias
    verificarDependencias();

    // Contador del header si existe
    if (document.getElementById('contador') && typeof window.cargarCarrito === 'function') {
      cargarCarrito();
    }
    
    // Enlaces admin según estado
    verificarSesionAdmin();

    // Prevenir memory leaks al salir de la página
    window.addEventListener('beforeunload', () => {
      limpiarEventListenersModal();
    });

    // Manejar errores globales de JavaScript
    window.addEventListener('error', (event) => {
      console.error('Error global capturado:', event.error);
      // No mostrar al usuario errores técnicos
    });

  } catch (error) {
    console.error('Error en inicialización de main.js:', error);
  }
}

// Auto-inicialización cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarMain);
} else {
  // DOM ya está listo
  inicializarMain();
}

// ==========================
// Animación fadeOut (modal)
// ==========================
function crearEstilosModal() {
  if (document.getElementById('main-js-styles')) return;

  const style = document.createElement('style');
  style.id = 'main-js-styles';
  style.textContent = `
    @keyframes fadeOut { 
      from { opacity: 1; } 
      to { opacity: 0; } 
    }
    
    .modal-overlay {
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn { 
      from { opacity: 0; } 
      to { opacity: 1; } 
    }
  `;
  document.head.appendChild(style);
}

// Crear estilos al cargar
crearEstilosModal();

// ==========================
// Exposición de funciones globales (solo las necesarias)
// ==========================
window.mostrarModalAgregar = mostrarModalAgregar;
window.cerrarModal = cerrarModal;
window.cerrarModalSiClickFuera = cerrarModalSiClickFuera;
window.confirmarAgregarCarrito = confirmarAgregarCarrito;
window.mostrarEnlacesAdmin = mostrarEnlacesAdmin;
window.ocultarEnlacesAdmin = ocultarEnlacesAdmin;
window.verificarSesionAdmin = verificarSesionAdmin;
window.logout = logout;
window.mostrarError = mostrarError;
window.mostrarExito = mostrarExito;
window.mostrarMensaje = mostrarMensaje;

// DEBUG: Exponer funciones para debugging (solo en desarrollo)
if (typeof window.DEBUG !== 'undefined' && window.DEBUG) {
  window.DEBUG_MAIN = {
    modalActivo,
    eventListenersModal,
    limpiarEventListenersModal,
    verificarDependencias
  };
}
