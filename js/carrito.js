// ==============================
// CARRITO (con soporte de tallas y manejo robusto de errores)
// ==============================

// Helper para acceder al catálogo sin depender de window.productos
function obtenerCatalogo() {
  try {
    // Si existe la variable global 'productos' (declarada con const/let)
    if (typeof productos !== 'undefined' && Array.isArray(productos)) {
      return productos;
    }
  } catch (error) {
    console.warn('Error accediendo a productos:', error);
  }
  
  // Fallback por si estuviera colgado en window
  try {
    return Array.isArray(window.productos) ? window.productos : [];
  } catch (error) {
    console.warn('Error accediendo a window.productos:', error);
    return [];
  }
}

// Helper para verificar disponibilidad de localStorage
function isLocalStorageAvailable() {
  try {
    const test = 'localStorage-test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.warn('localStorage no disponible:', error);
    return false;
  }
}

// Variable global del carrito
// Estructura: { id, nombre, precio, marca, talla (opcional), cantidad }
let carrito = [];

// Cargar carrito desde localStorage con manejo de errores robusto
function cargarCarrito() {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage no disponible, usando carrito en memoria');
    carrito = [];
    actualizarContador();
    return;
  }

  try {
    const carritoGuardado = localStorage.getItem('carrito-sneakers');
    
    if (!carritoGuardado) {
      carrito = [];
    } else {
      const carritoParseado = JSON.parse(carritoGuardado);
      
      // Validar estructura del carrito
      if (Array.isArray(carritoParseado)) {
        carrito = carritoParseado.filter(item => {
          // Validar que cada item tenga propiedades mínimas requeridas
          return item && 
                 typeof item.id !== 'undefined' && 
                 typeof item.nombre === 'string' && 
                 typeof item.precio === 'number' && 
                 typeof item.cantidad === 'number' && 
                 item.cantidad > 0;
        });
      } else {
        console.warn('Estructura de carrito inválida, reiniciando');
        carrito = [];
      }
    }
  } catch (error) {
    console.error('Error al cargar carrito desde localStorage:', error);
    carrito = [];
  }
  
  actualizarContador();
}

// Guardar carrito en localStorage con manejo de errores
function guardarCarrito() {
  if (!isLocalStorageAvailable()) {
    console.warn('No se puede guardar carrito, localStorage no disponible');
    return false;
  }

  try {
    // Validar carrito antes de guardar
    const carritoValido = carrito.filter(item => 
      item && 
      typeof item.id !== 'undefined' && 
      typeof item.cantidad === 'number' && 
      item.cantidad > 0
    );
    
    localStorage.setItem('carrito-sneakers', JSON.stringify(carritoValido));
    return true;
  } catch (error) {
    console.error('Error al guardar carrito en localStorage:', error);
    
    // Si es error de quota, intentar limpiar carritos antiguos
    if (error.name === 'QuotaExceededError') {
      try {
        // Limpiar datos antiguos y reintentar
        localStorage.removeItem('carrito-sneakers-backup');
        localStorage.setItem('carrito-sneakers', JSON.stringify(carrito));
        return true;
      } catch (retryError) {
        console.error('Error al reintentar guardar carrito:', retryError);
      }
    }
    return false;
  }
}

// Buscar item por id + talla (talla puede ser null/undefined)
function encontrarItem(id, talla) {
  if (!Array.isArray(carrito)) {
    console.warn('Carrito no es array válido');
    return null;
  }

  return carrito.find(item => {
    try {
      return Number(item.id) === Number(id) &&
             String(item.talla ?? '') === String(talla ?? '');
    } catch (error) {
      console.warn('Error comparando items del carrito:', error);
      return false;
    }
  });
}

// Validar producto antes de agregar
function validarProducto(producto) {
  return producto && 
         typeof producto.id !== 'undefined' &&
         typeof producto.nombre === 'string' &&
         typeof producto.precio === 'number' &&
         producto.precio >= 0 &&
         typeof producto.stock === 'number';
}

// Agregar producto al carrito (con talla opcional y validación robusta)
function agregarAlCarrito(id, talla = null) {
  try {
    const catalogo = obtenerCatalogo();
    const producto = catalogo.find(p => Number(p.id) === Number(id));

    if (!validarProducto(producto)) {
      mostrarError('Producto no encontrado o inválido');
      return false;
    }

    if ((producto.stock || 0) <= 0) {
      mostrarError('Producto sin stock disponible');
      return false;
    }

    // Inicializar carrito si no es array
    if (!Array.isArray(carrito)) {
      carrito = [];
    }

    // Item por variante (id + talla)
    const existente = encontrarItem(id, talla);

    // Cantidad total en carrito de este producto (suma todas las tallas)
    const cantidadTotalProducto = carrito
      .filter(i => {
        try {
          return Number(i.id) === Number(id);
        } catch {
          return false;
        }
      })
      .reduce((acc, item) => acc + (item.cantidad || 0), 0);

    if (cantidadTotalProducto >= (producto.stock || 0)) {
      mostrarError('No hay suficiente stock disponible');
      return false;
    }

    if (existente) {
      existente.cantidad = (existente.cantidad || 0) + 1;
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        marca: producto.marca || '',
        talla: talla,
        cantidad: 1,
        agregadoEn: Date.now() // Para debugging
      });
    }

    const guardado = guardarCarrito();
    if (!guardado) {
      console.warn('No se pudo guardar el carrito');
    }

    actualizarContador();
    mostrarExito(`¡Producto agregado al carrito!${talla ? ` (Talla ${talla})` : ''}`);
    return true;

  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    mostrarError('Error al agregar producto al carrito');
    return false;
  }
}

// Aumentar cantidad de una variante
function aumentarCantidad(id, talla = null) {
  try {
    const catalogo = obtenerCatalogo();
    const producto = catalogo.find(p => Number(p.id) === Number(id));
    const item = encontrarItem(id, talla);
    
    if (!item || !validarProducto(producto)) {
      mostrarError('Producto no encontrado');
      return false;
    }

    // Cantidad total ya en carrito del producto (todas tallas)
    const cantidadTotalProducto = carrito
      .filter(i => {
        try {
          return Number(i.id) === Number(id);
        } catch {
          return false;
        }
      })
      .reduce((acc, it) => acc + (it.cantidad || 0), 0);

    if (cantidadTotalProducto >= (producto.stock || 0)) {
      mostrarError('No hay más stock disponible');
      return false;
    }

    item.cantidad = (item.cantidad || 0) + 1;
    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
    return true;

  } catch (error) {
    console.error('Error al aumentar cantidad:', error);
    mostrarError('Error al actualizar cantidad');
    return false;
  }
}

// Disminuir cantidad de una variante
function disminuirCantidad(id, talla = null) {
  try {
    const item = encontrarItem(id, talla);
    if (!item) {
      return false;
    }

    if ((item.cantidad || 0) > 1) {
      item.cantidad = (item.cantidad || 1) - 1;
      guardarCarrito();
      actualizarContador();
      mostrarCarrito();
    } else {
      // Si la cantidad es 1 o menor, eliminar del carrito
      eliminarDelCarrito(id, talla);
    }
    return true;

  } catch (error) {
    console.error('Error al disminuir cantidad:', error);
    mostrarError('Error al actualizar cantidad');
    return false;
  }
}

// Eliminar una variante del carrito
function eliminarDelCarrito(id, talla = null) {
  try {
    if (!Array.isArray(carrito)) {
      carrito = [];
      return true;
    }

    const cantidadAnterior = carrito.length;
    
    carrito = carrito.filter(item => {
      try {
        return !(
          Number(item.id) === Number(id) &&
          String(item.talla ?? '') === String(talla ?? '')
        );
      } catch {
        return false; // Remover items corruptos
      }
    });

    if (carrito.length < cantidadAnterior) {
      guardarCarrito();
      actualizarContador();
      mostrarCarrito();
      mostrarExito('Producto eliminado del carrito');
    }
    
    return true;

  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    mostrarError('Error al eliminar producto');
    return false;
  }
}

// Actualizar contador del carrito (suma total de cantidades)
function actualizarContador() {
  try {
    const contador = document.getElementById('contador');
    if (contador) {
      const total = Array.isArray(carrito) 
        ? carrito.reduce((sum, item) => {
            try {
              return sum + (Number(item.cantidad) || 0);
            } catch {
              return sum;
            }
          }, 0)
        : 0;
      
      contador.textContent = total;
    }
  } catch (error) {
    console.error('Error al actualizar contador:', error);
  }
}

// Helper para mostrar errores de manera consistente
function mostrarError(mensaje) {
  console.error('Carrito Error:', mensaje);
  // Puedes personalizar esto para mostrar errores en la UI
  if (typeof alert !== 'undefined') {
    alert(mensaje);
  }
}

// Helper para mostrar mensajes de éxito
function mostrarExito(mensaje) {
  console.log('Carrito Éxito:', mensaje);
  if (typeof alert !== 'undefined') {
    alert(mensaje);
  }
}

// Render del carrito (con tallas y manejo de errores)
function mostrarCarrito() {
  const contenedor = document.getElementById('contenido-carrito');
  if (!contenedor) return;

  try {
    if (!Array.isArray(carrito) || carrito.length === 0) {
      contenedor.innerHTML = `
        <div class="text-center">
          <h3>Tu carrito está vacío</h3>
          <a href="productos.html" class="btn-nike mt-3">Ver Zapatillas</a>
        </div>
      `;
      return;
    }

    let html = '';
    let total = 0;
    let hayErrores = false;

    // Filtrar items válidos
    const carritoValido = carrito.filter(item => {
      try {
        return item && 
               typeof item.id !== 'undefined' &&
               typeof item.nombre === 'string' &&
               typeof item.precio === 'number' &&
               typeof item.cantidad === 'number' &&
               item.cantidad > 0;
      } catch {
        hayErrores = true;
        return false;
      }
    });

    if (hayErrores) {
      console.warn('Se encontraron items corruptos en el carrito, limpiando...');
      carrito = carritoValido;
      guardarCarrito();
    }

    carritoValido.forEach(item => {
      try {
        const subtotal = (item.precio || 0) * (item.cantidad || 0);
        total += subtotal;

        const tallaTexto = item.talla ? ` · Talla <strong>${item.talla}</strong>` : '';

        const usaFormatear = (typeof formatearPrecio === 'function');
        const usaMarca = (typeof getMarcaColor === 'function');

        html += `
          <div class="carrito-item">
            <div class="row align-items-center">
              <div class="col-md-5">
                <h5>${item.nombre}</h5>
                <p class="text-muted">
                  <span class="badge ${usaMarca ? getMarcaColor(item.marca) : 'bg-secondary'} me-2">
                    ${String(item.marca || '').toUpperCase()}
                  </span>
                  ${usaFormatear ? formatearPrecio(item.precio) : `$${item.precio}`} c/u${tallaTexto}
                </p>
              </div>
              <div class="col-md-3">
                <div class="cantidad-controls">
                  <button class="cantidad-btn" onclick="disminuirCantidad(${item.id}, ${item.talla ? `'${item.talla}'` : null})" ${item.cantidad <= 1 ? 'title="Eliminar producto"' : ''}>
                    <i class="fas fa-minus"></i>
                  </button>
                  <span class="mx-3 fw-bold fs-5">${item.cantidad}</span>
                  <button class="cantidad-btn" onclick="aumentarCantidad(${item.id}, ${item.talla ? `'${item.talla}'` : null})">
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              <div class="col-md-3 text-center">
                <strong class="fs-5">
                  ${usaFormatear ? formatearPrecio(subtotal) : `$${subtotal}`}
                </strong>
              </div>
              <div class="col-md-1">
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${item.id}, ${item.talla ? `'${item.talla}'` : null})" title="Eliminar producto">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      } catch (error) {
        console.error('Error al renderizar item del carrito:', error);
      }
    });

    const usaFormatear = (typeof formatearPrecio === 'function');
    html += `
      <div class="card bg-dark text-white mt-4">
        <div class="card-body text-center">
          <h3>Total: ${usaFormatear ? formatearPrecio(total) : `$${total}`}</h3>
          <button class="btn btn-warning btn-lg mt-3" onclick="finalizarCompra()">
            <i class="fas fa-credit-card"></i> FINALIZAR COMPRA
          </button>
        </div>
      </div>
    `;

    contenedor.innerHTML = html;

  } catch (error) {
    console.error('Error al mostrar carrito:', error);
    contenedor.innerHTML = `
      <div class="alert alert-danger text-center">
        <h4>Error al cargar carrito</h4>
        <p>Hubo un problema al mostrar tu carrito. <a href="#" onclick="limpiarCarrito()">Limpiar carrito</a></p>
      </div>
    `;
  }
}

// Limpiar carrito completamente (función de emergencia)
function limpiarCarrito() {
  try {
    carrito = [];
    if (isLocalStorageAvailable()) {
      localStorage.removeItem('carrito-sneakers');
    }
    actualizarContador();
    mostrarCarrito();
    mostrarExito('Carrito limpiado correctamente');
  } catch (error) {
    console.error('Error al limpiar carrito:', error);
  }
}

// Finalizar compra (demo mejorado)
function finalizarCompra() {
  try {
    if (!Array.isArray(carrito) || carrito.length === 0) {
      mostrarError('El carrito está vacío');
      return;
    }

    const total = carrito.reduce((sum, item) => {
      try {
        return sum + ((item.precio || 0) * (item.cantidad || 0));
      } catch {
        return sum;
      }
    }, 0);

    if (total <= 0) {
      mostrarError('Total inválido');
      return;
    }

    const usaFormatear = (typeof formatearPrecio === 'function');
    const mensajeTotal = usaFormatear ? formatearPrecio(total) : `$${total}`;
    
    const confirmacion = confirm(`¿Confirmas la compra por ${mensajeTotal}?`);
    if (!confirmacion) return;

    mostrarExito(`¡Compra realizada por ${mensajeTotal}! Gracias por elegir SneakerStore`);

    // Limpiar carrito después de compra exitosa
    limpiarCarrito();

  } catch (error) {
    console.error('Error al finalizar compra:', error);
    mostrarError('Error al procesar la compra');
  }
}

// Inicialización mejorada
document.addEventListener('DOMContentLoaded', function () {
  try {
    if (!Array.isArray(carrito) || carrito.length === 0) {
      cargarCarrito();
    }
  } catch (error) {
    console.error('Error en inicialización del carrito:', error);
    carrito = [];
    actualizarContador();
  }
});

// Exponer funciones globales necesarias
window.carrito = carrito;
window.cargarCarrito = cargarCarrito;
window.agregarAlCarrito = agregarAlCarrito;
window.aumentarCantidad = aumentarCantidad;
window.disminuirCantidad = disminuirCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;
window.mostrarCarrito = mostrarCarrito;
window.finalizarCompra = finalizarCompra;
window.limpiarCarrito = limpiarCarrito;
