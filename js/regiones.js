// Array de regiones y comunas - Como en tus clases
const regionesComunas = {
    'metropolitana': ['Santiago', 'Maipú', 'Las Condes', 'Providencia', 'La Florida', 'Puente Alto'],
    'valparaiso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón'],
    'biobio': ['Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles', 'Coronel'],
    'araucania': ['Temuco', 'Villarrica', 'Pucón', 'Angol', 'Nueva Imperial']
};

// Cargar regiones - Como en tus clases
function cargarRegiones() {
    const selectRegion = document.getElementById('region');
    if (!selectRegion) return;
    
    // Limpiar opciones anteriores
    selectRegion.innerHTML = '<option value="">Seleccionar región</option>';
    
    // Agregar regiones
    Object.keys(regionesComunas).forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region.charAt(0).toUpperCase() + region.slice(1);
        selectRegion.appendChild(option);
    });
    
    // Event listener para cargar comunas
    selectRegion.addEventListener('change', function() {
        cargarComunas(this.value);
    });
}

// Cargar comunas según región seleccionada
function cargarComunas(region) {
    const selectComuna = document.getElementById('comuna');
    if (!selectComuna) return;
    
    // Limpiar opciones anteriores
    selectComuna.innerHTML = '<option value="">Seleccionar comuna</option>';
    
    // Agregar comunas de la región seleccionada
    if (regionesComunas[region]) {
        regionesComunas[region].forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            selectComuna.appendChild(option);
        });
    }
}
