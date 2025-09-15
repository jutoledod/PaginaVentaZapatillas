
/**
 * JavaScript específico para el panel administrativo
 * Maneja dashboard, usuarios, productos y navegación admin
 */

// Variables globales del admin
let currentAdminSection = 'dashboard';
let adminUsers = [];
let adminProducts = [];

/**
 * Inicialización del panel de administración
 */
function initAdminPanel() {
    console.log('Inicializando panel de administración...');

    // Verificar si el usuario es administrador
    if (!userSession.isLoggedIn() || !userSession.isAdmin()) {
        alert('Acceso denegado. Solo los administradores pueden acceder a esta sección.');
        navigation.goTo('../login.html');
        return;
    }

    // Cargar datos
    loadAdminData();

    // Configurar navegación
    setupAdminNavigation();

    // Mostrar sección por defecto
    showAdminSection('dashboard');

    console.log('Panel de administración inicializado');
}

/**
 * Cargar datos para el administrador
 */
function loadAdminData() {
    // Cargar usuarios
    adminUsers = getUsers();

    // Cargar productos
    adminProducts = [...appData.productos];

    console.log(`Datos cargados: ${adminUsers.length} usuarios, ${adminProducts.length} productos`);
}

/**
 * Configurar navegación del admin
 */
function setupAdminNavigation() {
    const navItems = document.querySelectorAll('.admin-nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            if (section) {
                showAdminSection(section);
            }
        });
    });
}

/**
 * Mostrar sección específica del admin
 */
function showAdminSection(sectionId) {
    console.log('Mostrando sección admin:', sectionId);

    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => section.classList.remove('active'));

    // Mostrar sección seleccionada
    const targetSection = document.getElementById(`admin-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Activar botón de navegación
    const navItems = document.querySelectorAll('.admin-nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }

    // Cargar contenido específico de la sección
    switch (sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'users':
            loadUsersSection();
            break;
        case 'products':
            loadProductsSection();
            break;
        default:
            console.warn('Sección desconocida:', sectionId);
    }

    currentAdminSection = sectionId;
}

/**
 * Cargar datos del dashboard
 */
function loadDashboard() {
    console.log('Cargando dashboard...');

    // Estadísticas generales
    const stats = calculateStats();
    updateDashboardStats(stats);

    // Cargar actividad reciente (simulada)
    loadRecentActivity();
}

/**
 * Calcular estadísticas del sistema
 */
function calculateStats() {
    const totalUsers = adminUsers.length;
    const totalProducts = adminProducts.length;
    const totalStock = adminProducts.reduce((sum, product) => sum + product.stock, 0);
    const lowStockProducts = adminProducts.filter(p => p.stock <= p.stockCritico).length;

    return {
        totalUsers,
        totalProducts,
        totalStock,
        lowStockProducts,
        // Simular algunos valores adicionales
        totalOrders: 45,
        monthlyRevenue: 2450000
    };
}

/**
 * Actualizar estadísticas en el dashboard
 */
function updateDashboardStats(stats) {
    const elements = {
        'total-users': stats.totalUsers,
        'total-products': stats.totalProducts,
        'total-stock': stats.totalStock,
        'low-stock': stats.lowStockProducts,
        'total-orders': stats.totalOrders,
        'monthly-revenue': `$${stats.monthlyRevenue.toLocaleString('es-CL')}`
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
}

/**
 * Cargar actividad reciente (simulada)
 */
function loadRecentActivity() {
    const activityContainer = document.getElementById('recent-activity');
    if (!activityContainer) return;

    const activities = [
        { type: 'user', action: 'Nuevo usuario registrado', user: 'cliente@gmail.com', time: 'Hace 2 horas' },
        { type: 'product', action: 'Stock actualizado', product: 'Nike Air Max 270', time: 'Hace 4 horas' },
        { type: 'order', action: 'Nuevo pedido', order: '#1234', time: 'Hace 6 horas' }
    ];

    activityContainer.innerHTML = activities.map(activity => `
        <div class="activity-item" style="
            display: flex;
            align-items: center;
            padding: var(--spacing-md);
            border: 1px solid #e9ecef;
            border-radius: var(--border-radius);
            margin-bottom: var(--spacing-sm);
        ">
            <div class="activity-icon" style="
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: var(--spacing-md);
                font-size: 0.875rem;
            ">
                ${activity.type === 'user' ? '👤' : activity.type === 'product' ? '📦' : '🛒'}
            </div>
            <div style="flex: 1;">
                <div style="font-weight: 500; font-size: 0.875rem;">${activity.action}</div>
                <div style="color: var(--text-muted); font-size: 0.75rem;">
                    ${activity.user || activity.product || activity.order} • ${activity.time}
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Cargar sección de usuarios
 */
function loadUsersSection() {
    console.log('Cargando sección de usuarios...');

    const usersTableBody = document.getElementById('users-table-body');
    if (!usersTableBody) return;

    usersTableBody.innerHTML = adminUsers.map(user => `
        <tr>
            <td>${user.run}</td>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>
                <span class="status-badge ${user.role === 'Administrador' ? 'status-active' : 'status-inactive'}">
                    ${user.role}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-outline" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Eliminar</button>
                </div>
            </td>
        </tr>
    `).join('');

    updateUsersCount();
}

/**
 * Actualizar contador de usuarios
 */
function updateUsersCount() {
    const countElement = document.getElementById('users-count');
    if (countElement) {
        countElement.textContent = adminUsers.length;
    }
}

/**
 * Cargar sección de productos
 */
function loadProductsSection() {
    console.log('Cargando sección de productos...');

    const productsTableBody = document.getElementById('products-table-body');
    if (!productsTableBody) return;

    productsTableBody.innerHTML = adminProducts.map(product => {
        const stockStatus = product.stock <= 0 ? 'status-inactive' : 
                           product.stock <= product.stockCritico ? 'status-pending' : 'status-active';
        const stockText = product.stock <= 0 ? 'Agotado' : 
                         product.stock <= product.stockCritico ? 'Stock Bajo' : 'Disponible';

        return `
            <tr>
                <td>${product.codigo}</td>
                <td>${product.nombre}</td>
                <td>$${product.precio.toLocaleString('es-CL')}</td>
                <td>${product.stock}</td>
                <td>${product.categoria}</td>
                <td>
                    <span class="status-badge ${stockStatus}">
                        ${stockText}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn btn-outline" onclick="editProduct(${product.id})">Editar</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Eliminar</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    updateProductsCount();
}

/**
 * Actualizar contador de productos
 */
function updateProductsCount() {
    const countElement = document.getElementById('products-count');
    if (countElement) {
        countElement.textContent = adminProducts.length;
    }
}

/**
 * Funciones CRUD para usuarios
 */
function editUser(userId) {
    const user = adminUsers.find(u => u.id === userId);
    if (!user) return;

    alert(`Editando usuario: ${user.firstName} ${user.lastName}\n(Funcionalidad en desarrollo)`);
}

function deleteUser(userId) {
    const user = adminUsers.find(u => u.id === userId);
    if (!user) return;

    if (user.role === 'Administrador') {
        alert('No se puede eliminar un administrador');
        return;
    }

    const confirmed = confirm(`¿Estás seguro de que quieres eliminar al usuario ${user.firstName} ${user.lastName}?`);

    if (confirmed) {
        // Eliminar del array local
        adminUsers = adminUsers.filter(u => u.id !== userId);

        // Actualizar localStorage
        const allUsers = getUsers().filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(allUsers));

        // Recargar tabla
        loadUsersSection();

        // Mostrar mensaje de éxito
        showAdminMessage('Usuario eliminado correctamente', 'success');

        console.log(`Usuario ${userId} eliminado`);
    }
}

function addUser() {
    alert('Funcionalidad de agregar usuario en desarrollo\nPuedes usar el formulario de registro público');
}

/**
 * Funciones CRUD para productos
 */
function editProduct(productId) {
    const product = adminProducts.find(p => p.id === productId);
    if (!product) return;

    alert(`Editando producto: ${product.nombre}\n(Funcionalidad en desarrollo)`);
}

function deleteProduct(productId) {
    const product = adminProducts.find(p => p.id === productId);
    if (!product) return;

    const confirmed = confirm(`¿Estás seguro de que quieres eliminar el producto ${product.nombre}?`);

    if (confirmed) {
        // En un sistema real, aquí eliminaríamos de la base de datos
        alert('Producto eliminado (simulado)\nEn un sistema real se eliminaría de la base de datos');

        console.log(`Producto ${productId} marcado para eliminación`);
    }
}

function addProduct() {
    alert('Funcionalidad de agregar producto en desarrollo');
}

/**
 * Mostrar mensajes en el panel admin
 */
function showAdminMessage(message, type = 'info') {
    // Crear elemento de mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `admin-alert ${type}`;
    messageDiv.innerHTML = `<strong>${type === 'success' ? '✅' : type === 'danger' ? '❌' : 'ℹ️'}</strong> ${message}`;

    // Insertar al inicio del contenido principal
    const adminMain = document.querySelector('.admin-main');
    if (adminMain) {
        adminMain.insertBefore(messageDiv, adminMain.firstChild);

        // Remover después de 5 segundos
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

/**
 * Funciones de utilidad para el admin
 */

// Exportar datos a CSV
function exportUsersToCSV() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "RUN,Nombre,Apellidos,Email,Rol\n"
        + adminUsers.map(u => 
            `${u.run},"${u.firstName}","${u.lastName}",${u.email},${u.role}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "usuarios_sneakerstore.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showAdminMessage('Lista de usuarios exportada correctamente', 'success');
}

function exportProductsToCSV() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Código,Nombre,Precio,Stock,Categoría\n"
        + adminProducts.map(p => 
            `${p.codigo},"${p.nombre}",${p.precio},${p.stock},${p.categoria}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "productos_sneakerstore.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showAdminMessage('Lista de productos exportada correctamente', 'success');
}

// Backup de datos
function backupData() {
    const backupData = {
        users: adminUsers,
        products: adminProducts,
        timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(backupData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `sneakerstore_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
    showAdminMessage('Backup creado correctamente', 'success');
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en una página de admin
    if (window.location.pathname.includes('/admin/')) {
        setTimeout(initAdminPanel, 100);
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPanel);
} else if (window.location.pathname.includes('/admin/')) {
    initAdminPanel();
}

// Función global para navegación desde otras páginas
window.showAdminSection = showAdminSection;
