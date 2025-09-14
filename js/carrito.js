// ==============================
// CARRITO (con soporte de tallas)
// ==============================

// Helper para acceder al catálogo sin depender de window.productos
function obtenerCatalogo() {
  try {
    // Si existe la variable global 'productos' (declarada con const/let)
    if (typeof productos !== 'undefined' && Array.isArray(productos)) {
      return productos;
    }
  } catch (_) {}
  // Fallback por si estuviera colgado en window (poco probable con const)
  return Array.isArray(window.productos) ? window.productos : [];
}

// Variable global del carrito
// Estructura: { id, nombre, precio, marca, talla (opcional), cantidad }
let carrito = [];

// Cargar carrito desde localStorage
function cargarCarrito() {
  try {
    const carritoGuardado = localStorage.getItem('carrito-sneakers');
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  } catch {
    carrito = [];
  }
  actualizarContador();
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem('carrito-sneakers', JSON.stringify(carrito));
}

// Buscar item por id + talla (talla puede ser null/undefined)
function encontrarItem(id, talla) {
  return carrito.find(
    (item) =>
      Number(item.id) === Number(id) &&
      String(item.talla ?? '') === String(talla ?? '')
  );
}

// Agregar producto al carrito (con talla opcional)
function agregarAlCarrito(id, talla = null) {
  const catalogo = obtenerCatalogo();
  const producto = catalogo.find((p) => Number(p.id) === Number(id));

  if (!producto) {
    alert('Producto no encontrado');
    return;
  }
  if ((producto.stock || 0) <= 0) {
    alert('Producto sin stock disponible');
    return;
  }

  // Item por variante (id + talla)
  const existente = encontrarItem(id, talla);

  // Cantidad total en carrito de este producto (suma todas las tallas)
  const cantidadTotalProducto = carrito
    .filter((i) => Number(i.id) === Number(id))
    .reduce((acc, it) => acc + (it.cantidad || 0), 0);

  if (cantidadTotalProducto >= (producto.stock || 0)) {
    alert('No hay suficiente stock disponible');
    return;
  }

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      marca: producto.marca,
      talla: talla, // puede ser null si viene desde flujo sin talla
      cantidad: 1,
    });
  }

  guardarCarrito();
  actualizarContador();
  alert(`¡Producto agregado al carrito!${talla ? ` (Talla ${talla})` : ''}`);
}

// Aumentar cantidad de una variante
function aumentarCantidad(id, talla = null) {
  const catalogo = obtenerCatalogo();
  const producto = catalogo.find((p) => Number(p.id) === Number(id));
  const item = encontrarItem(id, talla);
  if (!item || !producto) return;

  // Cantidad total ya en carrito del producto (todas tallas)
  const cantidadTotalProducto = carrito
    .filter((i) => Number(i.id) === Number(id))
    .reduce((acc, it) => acc + (it.cantidad || 0), 0);

  if (cantidadTotalProducto >= (producto.stock || 0)) {
    alert('No hay más stock disponible');
    return;
  }

  item.cantidad += 1;
  guardarCarrito();
  actualizarContador();
  mostrarCarrito();
}

// Disminuir cantidad de una variante
function disminuirCantidad(id, talla = null) {
  const item = encontrarItem(id, talla);
  if (!item) return;

  if (item.cantidad > 1) {
    item.cantidad -= 1;
    guardarCarrito();
    actualizarContador();
    mostrarCarrito();
  } else {
    // Si la cantidad es 1, eliminar del carrito
    eliminarDelCarrito(id, talla);
  }
}

// Eliminar una variante del carrito
function eliminarDelCarrito(id, talla = null) {
  carrito = carrito.filter(
    (item) =>
      !(
        Number(item.id) === Number(id) &&
        String(item.talla ?? '') === String(talla ?? '')
      )
  );
  guardarCarrito();
  actualizarContador();
  mostrarCarrito();
}

// Actualizar contador del carrito (suma total de cantidades)
function actualizarContador() {
  const contador = document.getElementById('contador');
  if (contador) {
    const total = carrito.reduce((sum, item) => sum + (item.cantidad || 0), 0);
    contador.textContent = total;
  }
}

// Render del carrito (con tallas)
function mostrarCarrito() {
  const contenedor = document.getElementById('contenido-carrito');
  if (!contenedor) return;

  if (carrito.length === 0) {
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

  carrito.forEach((item) => {
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
}

// Finalizar compra (demo)
function finalizarCompra() {
  const usaFormatear = (typeof formatearPrecio === 'function');
  const total = carrito.reduce((sum, item) => sum + ((item.precio || 0) * (item.cantidad || 0)), 0);
  alert(`¡Compra realizada por ${usaFormatear ? formatearPrecio(total) : `$${total}`}! Gracias por elegir SneakerStore`);

  carrito = [];
  localStorage.removeItem('carrito-sneakers');
  actualizarContador();
  mostrarCarrito();
}

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
  if (!Array.isArray(carrito) || carrito.length === 0) {
    cargarCarrito();
  }
});
