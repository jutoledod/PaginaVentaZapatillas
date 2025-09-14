// ==============================
// Validaciones y Formularios
// ==============================

// --- RUN chileno (RUT) ---
// Acepta formatos con/ sin puntos y guión. Verifica dígito verificador (módulo 11).
function validarRUN(run) {
  if (!run) return false;
  const limpio = String(run).replace(/\./g, '').replace(/-/g, '').toUpperCase();
  if (limpio.length < 7 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  if (!/^\d+$/.test(cuerpo)) return false;

  const dvCalculado = calcularDV(cuerpo);
  return dv === dvCalculado;
}

function calcularDV(cuerpo) {
  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  if (resto === 11) return '0';
  if (resto === 10) return 'K';
  return String(resto);
}

// --- Email ---
// Mantiene dominios permitidos de la maqueta (puedes ampliar si quieres).
function validarEmail(email) {
  if (!email) return false;
  const dominios = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
  const e = String(email).toLowerCase();
  const formatoOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  return formatoOk && dominios.some(d => e.endsWith(d));
}

// --- Helpers UI de error ---
function mostrarError(campo, mensaje) {
  const errorDiv = document.getElementById(`error-${campo}`);
  if (errorDiv) {
    errorDiv.textContent = mensaje || 'Campo inválido';
    errorDiv.style.display = 'block';
  }
}

function limpiarError(campo) {
  const errorDiv = document.getElementById(`error-${campo}`);
  if (errorDiv) errorDiv.style.display = 'none';
}

// ==============================
// Login (con opción admin demo)
// ==============================
function inicializarFormularioLogin() {
  const form = document.getElementById('formLogin');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const correo = document.getElementById('correoLogin')?.value?.trim();
    const password = document.getElementById('password')?.value ?? '';
    const esAdmin = document.getElementById('loginAdmin')?.checked ?? false;

    let valido = true;

    if (!validarEmail(correo)) {
      mostrarError('correoLogin', 'Correo inválido o dominio no permitido');
      valido = false;
    } else {
      limpiarError('correoLogin');
    }

    if (!password || password.length < 4 || password.length > 10) {
      mostrarError('password', 'Contraseña debe tener entre 4 y 10 caracteres');
      valido = false;
    } else {
      limpiarError('password');
    }

    if (esAdmin) {
      if (!correo.endsWith('@duoc.cl') && !correo.endsWith('@profesor.duoc.cl')) {
        mostrarError('correoLogin', 'Solo correos institucionales pueden ser administradores');
        valido = false;
      } else if (password !== 'admin123') {
        mostrarError('password', 'Contraseña de administrador incorrecta');
        valido = false;
      }
    }

    if (!valido) return;

    if (esAdmin) {
      // Demo: marca flag admin y redirige a panel
      if (typeof window.mostrarEnlacesAdmin === 'function') window.mostrarEnlacesAdmin();
      alert('¡Bienvenido Administrador!');
      window.location.href = 'admin/home.html';
    } else {
      // Demo: sesión usuario simple
      alert('¡Bienvenido a SneakerStore!');
      window.location.href = 'index.html';
    }
  });
}

// =====================================
// Registro de usuario (demo en LocalStorage)
// =====================================
function inicializarFormularioRegistro() {
  const form = document.getElementById('formRegistro');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const run = document.getElementById('run')?.value?.trim();
    const nombre = document.getElementById('nombre')?.value?.trim();
    const apellidos = document.getElementById('apellidos')?.value?.trim();
    const correo = document.getElementById('correo')?.value?.trim();
    const region = document.getElementById('region')?.value;
    const comuna = document.getElementById('comuna')?.value;
    const direccion = document.getElementById('direccion')?.value?.trim();

    let ok = true;

    if (!validarRUN(run)) {
      mostrarError('run', 'RUN inválido');
      ok = false;
    } else limpiarError('run');

    if (!nombre || nombre.length < 2) {
      mostrarError('nombre', 'Nombre es obligatorio (mín. 2 caracteres)');
      ok = false;
    } else limpiarError('nombre');

    if (!apellidos || apellidos.length < 2) {
      mostrarError('apellidos', 'Apellidos son obligatorios (mín. 2 caracteres)');
      ok = false;
    } else limpiarError('apellidos');

    if (!validarEmail(correo)) {
      mostrarError('correo', 'Correo inválido o dominio no permitido');
      ok = false;
    } else limpiarError('correo');

    if (!region) {
      // sin div de error dedicado, usamos alerta simple visual (opcional crear error-region)
      ok = false;
      alert('Selecciona una región');
    }

    if (!comuna) {
      ok = false;
      alert('Selecciona una comuna');
    }

    if (!direccion || direccion.length < 5) {
      mostrarError('direccion', 'Dirección demasiado corta');
      ok = false;
    } else limpiarError('direccion');

    if (!ok) return;

    // Persistencia demo de usuarios (NO guardar contraseñas reales)
    const KEY = 'usuarios-sneakers';
    let usuarios = [];
    try {
      const raw = localStorage.getItem(KEY);
      usuarios = raw ? JSON.parse(raw) : [];
    } catch {
      usuarios = [];
    }

    // Evitar correo duplicado (demo)
    if (usuarios.some(u => (u.correo || '').toLowerCase() === correo.toLowerCase())) {
      mostrarError('correo', 'Este correo ya está registrado');
      return;
    }

    usuarios.push({
      run,
      nombre,
      apellidos,
      correo,
      region,
      comuna,
      direccion,
      creadoEn: Date.now()
    });

    localStorage.setItem(KEY, JSON.stringify(usuarios));

    const exito = document.getElementById('exitoRegistro');
    if (exito) {
      exito.classList.remove('d-none');
    } else {
      alert('¡Cuenta creada exitosamente!');
    }

    // Redirige después de 1.2s (demo)
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1200);
  });

  // Si la región cambia externamente, aseguramos recargar comunas (por si no viniera desde regiones.js)
  const regionSel = document.getElementById('region');
  if (regionSel && typeof window.cargarComunas === 'function') {
    regionSel.addEventListener('change', e => {
      const val = e.target.value;
      cargarComunas(val);
    });
  }
}

// Export/Global (si no usas módulos)
window.validarRUN = validarRUN;
window.validarEmail = validarEmail;
window.mostrarError = mostrarError;
window.limpiarError = limpiarError;
window.inicializarFormularioLogin = inicializarFormularioLogin;
window.inicializarFormularioRegistro = inicializarFormularioRegistro;
