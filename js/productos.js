
/**
 * JavaScript específico para la página de productos (productos.html)
 * Maneja filtros, búsqueda, ordenamiento y visualización de productos
 */

// Variables globales para la página de productos
let allProducts = []; // Todos los productos
let filteredProducts = []; // Productos filtrados
let currentFilters = {
    search: '',
    category: '',
    priceRange: '',
    sortBy: 'name-asc'
};

/**
 * Función de inicialización de la página de productos
 */
function initProductsPage() {
    console.log('Inicializando página de productos...');

    // Cargar productos desde los datos
    allProducts = [...appData.productos];
    filteredProducts = [...allProducts];

    // Configurar filtros
    setupFilters();

    // Mostrar productos iniciales
    displayProducts();

    // Configurar eventos de filtros
    setupFilterEvents();

    console.log(`Página de productos inicializada con ${allProducts.length} productos`);
}

/**
 * Configurar las opciones de los filtros
 */
function setupFilters() {
    // Cargar categorías únicas
    const categories = [...new Set(allProducts.map(p => p.categoria))];
    const categorySelect = document.getElementById('category-filter');

    if (categorySelect) {
        categorySelect.innerHTML = '<option value="">Todas las categorías</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }
}

/**
 * Configurar eventos de los filtros
 */
function setupFilterEvents() {
    // Evento de búsqueda (con debounce)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentFilters.search = this.value.toLowerCase();
                applyFilters();
            }, 300); // Debounce de 300ms
        });
    }

    // Evento de categoría
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            currentFilters.category = this.value;
            applyFilters();
        });
    }

    // Evento de rango de precio
    const priceRange = document.getElementById('price-range');
    if (priceRange) {
        priceRange.addEventListener('change', function() {
            currentFilters.priceRange = this.value;
            applyFilters();
        });
    }

    // Evento de ordenamiento
    const sortBy = document.getElementById('sort-by');
    if (sortBy) {
        sortBy.addEventListener('change', function() {
            currentFilters.sortBy = this.value;
            applyFilters();
        });
    }

    // Botón aplicar filtros
    const applyBtn = document.getElementById('apply-filters');
    if (applyBtn) {
        applyBtn.addEventListener('click', applyFilters);
    }

    // Botón limpiar filtros
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllFilters);
    }
}

/**
 * Aplicar todos los filtros
 */
function applyFilters() {
    console.log('Aplicando filtros:', currentFilters);

    // Mostrar indicador de carga
    showLoading(true);

    // Simular un pequeño delay para la experiencia del usuario
    setTimeout(() => {
        let filtered = [...allProducts];

        // Filtro de búsqueda
        if (currentFilters.search) {
            filtered = filtered.filter(product => 
                product.nombre.toLowerCase().includes(currentFilters.search) ||
                product.codigo.toLowerCase().includes(currentFilters.search) ||
                product.descripcion.toLowerCase().includes(currentFilters.search)
            );
        }

        // Filtro de categoría
        if (currentFilters.category) {
            filtered = filtered.filter(product => product.categoria === currentFilters.category);
        }

        // Filtro de precio
        if (currentFilters.priceRange) {
            const [minPrice, maxPrice] = currentFilters.priceRange.split('-').map(Number);
            filtered = filtered.filter(product => 
                product.precio >= minPrice && product.precio <= maxPrice
            );
        }

        // Ordenamiento
        filtered = sortProducts(filtered, currentFilters.sortBy);

        filteredProducts = filtered;
        displayProducts();
        updateResultsCount();
        showLoading(false);

        console.log(`Filtros aplicados: ${filteredProducts.length} productos encontrados`);
    }, 200);
}

/**
 * Ordenar productos según el criterio seleccionado
 */
function sortProducts(products, sortBy) {
    switch (sortBy) {
        case 'name-asc':
            return products.sort((a, b) => a.nombre.localeCompare(b.nombre));
        case 'name-desc':
            return products.sort((a, b) => b.nombre.localeCompare(a.nombre));
        case 'price-asc':
            return products.sort((a, b) => a.precio - b.precio);
        case 'price-desc':
            return products.sort((a, b) => b.precio - a.precio);
        default:
            return products;
    }
}

/**
 * Limpiar todos los filtros
 */
function clearAllFilters() {
    // Resetear valores de los filtros
    document.getElementById('search-input').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('price-range').value = '';
    document.getElementById('sort-by').value = 'name-asc';

    // Resetear filtros actuales
    currentFilters = {
        search: '',
        category: '',
        priceRange: '',
        sortBy: 'name-asc'
    };

    // Aplicar filtros (mostrará todos los productos)
    applyFilters();

    console.log('Filtros limpiados');
}

/**
 * Mostrar productos en el grid
 */
function displayProducts() {
    const container = document.getElementById('products-grid');
    const noProductsMsg = document.getElementById('no-products');

    if (!container) {
        console.error('Container de productos no encontrado');
        return;
    }

    // Si no hay productos que mostrar
    if (filteredProducts.length === 0) {
        container.innerHTML = '';
        if (noProductsMsg) {
            noProductsMsg.classList.remove('d-none');
        }
        return;
    }

    // Ocultar mensaje de "no productos"
    if (noProductsMsg) {
        noProductsMsg.classList.add('d-none');
    }

    // Generar HTML para todos los productos
    container.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');

    // Agregar animación de entrada
    setTimeout(() => {
        const cards = container.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }, 50);
}

/**
 * Crear tarjeta de producto (similar a home.js pero con más detalles)
 */
function createProductCard(product) {
    const stockStatus = getStockStatus(product);

    return `
        <div class="product-card card" onclick="navigation.goToProductDetail(${product.id})">
            <div class="product-image">
                <!-- Placeholder para imagen del producto -->
            </div>
            <div class="product-info">
                <div class="stock-status ${stockStatus.clase}">
                    ${stockStatus.texto}
                </div>
                <h4>${product.nombre}</h4>
                <div class="product-details">
                    <p><strong>Código:</strong> ${product.codigo}</p>
                    <p><strong>Categoría:</strong> ${product.categoria}</p>
                    <p><strong>Stock:</strong> ${product.stock} unidades</p>
                </div>
                <div class="product-description">
                    ${product.descripcion}
                </div>
                <div class="product-price">
                    ${ui.formatPrice(product.precio)}
                </div>
                <div class="product-actions">
                    <button class="btn btn-outline" onclick="event.stopPropagation(); navigation.goToProductDetail(${product.id})">
                        Ver Detalles
                    </button>
                    <button class="btn btn-primary" 
                            onclick="event.stopPropagation(); addToCart(${product.id})"
                            ${product.stock <= 0 ? 'disabled' : ''}>
                        ${product.stock <= 0 ? 'Agotado' : 'Agregar al Carrito'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Función para obtener el estado del stock (reutilizada de home.js)
 */
function getStockStatus(product) {
    if (product.stock <= 0) {
        return { clase: 'out-of-stock', texto: 'Agotado' };
    } else if (product.stock <= product.stockCritico) {
        return { clase: 'low-stock', texto: 'Stock Bajo' };
    } else {
        return { clase: 'in-stock', texto: 'Disponible' };
    }
}

/**
 * Agregar producto al carrito
 */
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        console.error('Producto no encontrado:', productId);
        return;
    }

    if (product.stock <= 0) {
        alert('Este producto está agotado');
        return;
    }

    cart.addItem(product, 1);
    console.log('Producto agregado al carrito:', product.nombre);
}

/**
 * Actualizar contador de resultados
 */
function updateResultsCount() {
    const countElement = document.getElementById('results-count');
    if (countElement) {
        const count = filteredProducts.length;
        const total = allProducts.length;

        if (count === total) {
            countElement.textContent = `Mostrando todos los productos (${count})`;
        } else {
            countElement.textContent = `Mostrando ${count} de ${total} productos`;
        }
    }
}

/**
 * Mostrar/ocultar indicador de carga
 */
function showLoading(show) {
    const grid = document.getElementById('products-grid');
    const applyBtn = document.getElementById('apply-filters');

    if (grid) {
        if (show) {
            grid.classList.add('loading');
        } else {
            grid.classList.remove('loading');
        }
    }

    if (applyBtn) {
        if (show) {
            applyBtn.classList.add('search-loading');
            applyBtn.disabled = true;
        } else {
            applyBtn.classList.remove('search-loading');
            applyBtn.disabled = false;
        }
    }
}

/**
 * Funciones adicionales para mejorar la experiencia
 */

// Función para buscar productos por voz (experimental)
function startVoiceSearch() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.onresult = function(event) {
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = event.results[0][0].transcript;
                currentFilters.search = searchInput.value.toLowerCase();
                applyFilters();
            }
        };
        recognition.start();
    }
}

// Función para exportar lista de productos (opcional)
function exportProductsList() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Código,Nombre,Categoría,Precio,Stock\n"
        + filteredProducts.map(p => 
            `${p.codigo},"${p.nombre}",${p.categoria},${p.precio},${p.stock}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "productos_sneakerstore.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Eventos de inicialización
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initProductsPage, 100);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductsPage);
} else {
    initProductsPage();
}
