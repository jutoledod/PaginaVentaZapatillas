// Funciones generales - Como en tus clases

// Inicializar carrito en todas las páginas
document.addEventListener('DOMContentLoaded', function() {
    // Solo ejecutar si existe el contador
    if (document.getElementById('contador')) {
        cargarCarrito();
    }
});

// Función para mostrar notificaciones simples
function mostrarNotificacion(mensaje) {
    alert(mensaje); // Versión simple para la clase
}

// Función para validar formularios generales
function validarCamposVacios(campos) {
    let valido = true;
    
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (!elemento.value.trim()) {
            mostrarError(campo, 'Este campo es requerido');
            valido = false;
        } else {
            limpiarError(campo);
        }
    });
    
    return valido;
}
