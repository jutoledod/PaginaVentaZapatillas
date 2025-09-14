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

// --- Sanitización de entrada ---
function sanitizarTexto(texto) {
  if (!texto) return '';
  return String(texto)
    .replace(/[<>]/g, '') // Eliminar < y >
    .replace(/javascript:/gi, '') // Eliminar javascript:
    .replace(/on\w+=/gi, '') // Eliminar eventos onclick, onload, etc.
    .trim();
}

// --- Helpers UI de error ---
function mostrarError(campo, mensaje) {
  const errorDiv = document.getElementById(`error-${campo}`);
  if (errorDiv) {
    errorDiv.textContent = sanitizarTexto(mensaje) || 'Campo inválido';
    errorDiv.style.display = 'block';
  }
}

function limpiarError(campo) {
  const errorDiv = document.getElementById(`error-${campo}`);
  if (errorDiv) errorDiv.style.display = 'none';
}

// --- Validación de contraseña segura ---
function validarPasswordAdmin(password, email) {
  if (!password || !email) return false;
  
  // Verificar que sea un correo institucional
  if (!email.endsWith('@duoc.cl') && !email.endsWith('@profesor.duoc.cl')) {
    return false;
  }
  
  // Validación de contraseña más robusta (ejemplo)
  // En un proyecto real, esto se haría en el backend
  const passwordRequirements = {
    minLength: 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  return password.length >= passwordRequirements.minLength &&
         passwordRequirements.hasUpperCase &&
         passwordRequirements.hasLowerCase &&
         passwordRequirements.hasNumbers;
}

// ==============================
// Login (con validación mejorada)
// ==============================
function inicializarFormularioLogin() {
  const form = document.getElementById('formLogin');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const correo = sanitizarTexto(document.getElementById('correoLogin')?.value?.trim());
    const password = document.getElementById('password')?.value ?? '';
    const esAdmin = document.getElementById('loginAdmin')?.checked ?? false;

    let valido = true;

    if (!validarEmail(correo)) {
      mostrarError('correoLogin', 'Correo inválido o dominio no permitido');
      valido = false;
    } else {
      limpiarError('correoLogin');
    }

    if (!password || password.length < 4 || password.length > 50) {
      mostrarError('password', 'Contraseña debe tener entre 4 y 50 caracteres');
      valido = false;
    } else {
      limpiarError('password');
    }

    if (esAdmin) {
      if (!validarPasswordAdmin(password, correo)) {
        mostrarError('password', 'Credenciales de administrador incorrectas');
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
// Registro de usuario (con sanitización mejorada)
// =====================================
function inicializarFormularioRegistro() {
  const form = document.getElementById('formRegistro');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const run = sanitizarTexto(document.getElementById('run')?.value?.trim());
    const nombre = sanitizarTexto(document.getElementById('nombre')?.value?.trim());
    const apellidos = sanitizarTexto(document.getElementById('apellidos')?.value?.trim());
    const correo = sanitizarTexto(document.getElementById('correo')?.value?.trim());
    const region = document.getElementById('region')?.value;
    const comuna = document.getElementById('comuna')?.value;
    const direccion = sanitizarTexto(document.getElementById('direccion')?.value?.trim());

    let ok = true;

    if (!validarRUN(run)) {
      mostrarError('run', 'RUN inválido');
      ok = false;
    } else limpiarError('run');

    if (!nombre || nombre.length < 2 || nombre.length > 50) {
      mostrarError('nombre', 'Nombre debe tener entre 2 y 50 caracteres');
      ok = false;
    } else limpiarError('nombre');

    if (!apellidos || apellidos.length < 2 || apellidos.length > 100) {
      mostrarError('apellidos', 'Apellidos deben tener entre 2 y 100 caracteres');
      ok = false;
    } else limpiarError('apellidos');

    if (!validarEmail(correo)) {
      mostrarError('correo', 'Correo inválido o dominio no permitido');
      ok = false;
    } else limpiarError('correo');

    if (!region) {
      ok = false;
      alert('Selecciona una región');
    }

    if (!comuna) {
      ok = false;
      alert('Selecciona una comuna');
    }

    if (!direccion || direccion.length < 5 || direccion.length > 300) {
      mostrarError('direccion', 'Dirección debe tener entre 5 y 300 caracteres');
      ok = false;
    } else limpiarError('direccion');

    if (!ok) return;

    // Persistencia demo de usuarios con manejo de errores mejorado
    const KEY = 'usuarios-sneakers';
    let usuarios = [];
    
    try {
      const raw = localStorage.getItem(KEY);
      usuarios = raw ? JSON.parse(raw) : [];
      
      // Validar estructura de datos existentes
      if (!Array.isArray(usuarios)) {
        usuarios = [];
      }
    } catch (error) {
      console.warn('Error al cargar usuarios del localStorage:', error);
      usuarios = [];
    }

    // Evitar correo duplicado (demo)
    if (usuarios.some(u => (u.correo || '').toLowerCase() === correo.toLowerCase())) {
      mostrarError('correo', 'Este correo ya está registrado');
      return;
    }

    // Evitar RUN duplicado
    if (usuarios.some(u => (u.run || '').replace(/\./g, '').replace(/-/g, '').toUpperCase() === 
                               run.replace(/\./g, '').replace(/-/g, '').toUpperCase())) {
      mostrarError('run', 'Este RUN ya está registrado');
      return;
    }

    try {
      usuarios.push({
        run,
        nombre,
        apellidos,
        correo,
        region,
        comuna,
        direccion,
        creadoEn: Date.now(),
        activo: true
      });

      localStorage.setItem(KEY, JSON.stringify(usuarios));

      const exito = document.getElementById('exitoRegistro');
      if (exito) {
        exito.classList.remove('d-none');
      } else {
        alert('¡Cuenta creada exitosamente!');
      }

      // Limpiar formulario
      form.reset();

      // Redirige después de 1.2s (demo)
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);

    } catch (error) {
      console.error('Error al guardar usuario:', error);
      alert('Error al crear la cuenta. Por favor, intenta nuevamente.');
    }
  });

  // Si la región cambia externamente, aseguramos recargar comunas
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
window.sanitizarTexto = sanitizarTexto;
window.mostrarError = mostrarError;
window.limpiarError = limpiarError;
window.validarPasswordAdmin = validarPasswordAdmin;
window.inicializarFormularioLogin = inicializarFormularioLogin;
window.inicializarFormularioRegistro = inicializarFormularioRegistro;
