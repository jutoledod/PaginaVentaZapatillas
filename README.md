
# SneakerStore - Proyecto de Tienda Online

## 📋 Descripción del Proyecto

SneakerStore es una tienda online de zapatillas desarrollada como proyecto educativo. El sistema incluye una tienda pública para clientes y un panel administrativo para gestionar usuarios y productos.

## 🏗️ Estructura del Proyecto

```
sneaker-store-separated/
├── css/                     # Estilos CSS
│   ├── common.css           # Estilos comunes a todas las páginas
│   ├── home.css             # Estilos específicos del inicio
│   ├── productos.css        # Estilos de la página de productos
│   ├── auth.css             # Estilos para login y registro
│   └── carrito.css          # Estilos del carrito de compras
├── js/                      # JavaScript
│   ├── data.js              # Datos de productos y regiones
│   ├── common.js            # Funciones comunes
│   ├── home.js              # JavaScript del inicio
│   ├── productos.js         # JavaScript de productos
│   ├── auth.js              # JavaScript de autenticación
│   └── carrito.js           # JavaScript del carrito
├── admin/                   # Panel administrativo
│   ├── css/
│   │   └── admin.css        # Estilos del administrador
│   ├── js/
│   │   └── admin.js         # JavaScript del administrador
│   └── dashboard.html       # Dashboard administrativo
├── index.html               # Página principal
├── productos.html           # Catálogo de productos
├── login.html               # Inicio de sesión
├── registro.html            # Registro de usuario
├── carrito.html             # Carrito de compras
├── nosotros.html            # Página "Nosotros"
├── blogs.html               # Blog de la tienda
├── contacto.html            # Formulario de contacto
└── README.md                # Documentación
```

## 🚀 Cómo Usar el Proyecto

### 1. Preparación
1. Descarga todos los archivos manteniendo la estructura de carpetas
2. Abre `index.html` en tu navegador web
3. El proyecto funciona completamente sin servidor (solo HTML, CSS, JS)

### 2. Navegación del Sitio

#### **Área Pública (Clientes)**
- **Inicio** (`index.html`): Página principal con productos destacados
- **Productos** (`productos.html`): Catálogo completo con filtros y búsqueda
- **Nosotros** (`nosotros.html`): Información de la empresa y equipo
- **Blog** (`blogs.html`): Artículos y noticias sobre zapatillas
- **Contacto** (`contacto.html`): Formulario de contacto con validaciones
- **Carrito** (`carrito.html`): Gestión de productos seleccionados

#### **Autenticación**
- **Login** (`login.html`): Inicio de sesión con validaciones
- **Registro** (`registro.html`): Creación de cuenta nueva

#### **Panel Administrativo**
- **Dashboard** (`admin/dashboard.html`): Panel de control para administradores

### 3. Usuarios de Prueba

El sistema incluye usuarios predeterminados para testing:

**Administrador:**
- Email: `admin@duoc.cl`
- Contraseña: `admin123`
- Acceso: Panel administrativo completo

**Cliente Demo:**
- Email: `cliente@gmail.com`  
- Contraseña: `demo123`
- Acceso: Funciones de cliente (carrito, compras)

### 4. Funcionalidades Implementadas

#### **🛒 Gestión de Productos**
- Catálogo de 8 productos predefinidos
- Sistema de filtros por categoría, precio y búsqueda
- Ordenamiento por nombre y precio
- Gestión de stock con alertas de inventario bajo
- Carrito de compras persistente (localStorage)

#### **👤 Sistema de Usuarios**
- Registro con validaciones completas:
  - RUN chileno con dígito verificador
  - Emails permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com
  - Contraseñas de 4-10 caracteres
  - Selección de región y comuna
- Login con validación de credenciales
- Gestión de sesiones
- Roles: Administrador, Vendedor, Cliente

#### **🛡️ Validaciones JavaScript**
- **RUN**: Validación matemática del dígito verificador
- **Email**: Dominios específicos permitidos
- **Contraseña**: Longitud entre 4-10 caracteres
- **Nombres**: Límites de caracteres (50/100)
- **Direcciones**: Máximo 300 caracteres
- **Comentarios**: Máximo 500 caracteres

#### **🌍 Regiones y Comunas**
- Sistema dinámico de región/comuna
- Regiones incluidas:
  - Arica y Parinacota
  - Tarapacá  
  - Antofagasta
  - Región Metropolitana
  - Los Lagos
- Comunas se cargan automáticamente según región seleccionada

#### **🔧 Panel Administrativo**
- Dashboard con estadísticas del sistema
- Gestión de usuarios (ver, eliminar)
- Gestión de productos (ver inventario)
- Exportación a CSV
- Backup de datos
- **Acceso restringido**: Solo administradores

#### **💾 Persistencia de Datos**
- **localStorage** para:
  - Usuarios registrados
  - Carrito de compras
  - Sesión actual
  - Datos temporales

### 5. Características Técnicas

#### **📱 Responsive Design**
- Diseño adaptativo para móviles, tablets y desktop
- Breakpoints: 480px, 768px, 992px, 1024px
- Grid CSS y Flexbox para layouts

#### **🎨 Diseño**
- Sistema de colores consistente con CSS Variables
- Tipografía Segoe UI / Inter
- Componentes reutilizables (botones, cards, formularios)
- Animaciones CSS sutiles
- Dark mode compatible

#### **⚡ Rendimiento**
- Código JavaScript optimizado
- CSS modular y específico por página
- Imágenes placeholder (no requiere descarga)
- Carga asíncrona de contenido

#### **🧪 Calidad de Código**
- Código comentado y documentado
- Funciones modulares y reutilizables
- Validación de errores
- Console logging para debugging

## 📋 Validaciones Implementadas

### **Formulario de Registro:**
- ✅ RUN: Formato y dígito verificador válido
- ✅ Nombre: Requerido, máximo 50 caracteres
- ✅ Apellidos: Requerido, máximo 100 caracteres  
- ✅ Email: Dominios específicos (@duoc.cl, @profesor.duoc.cl, @gmail.com)
- ✅ Contraseña: 4-10 caracteres
- ✅ Confirmación de contraseña
- ✅ Región y Comuna: Requeridas
- ✅ Dirección: Requerida, máximo 300 caracteres

### **Formulario de Login:**
- ✅ Email: Formato y dominios válidos
- ✅ Contraseña: Longitud válida
- ✅ Verificación de credenciales

### **Formulario de Contacto:**
- ✅ Nombre: Requerido, máximo 100 caracteres
- ✅ Email: Dominios específicos
- ✅ Comentario: Requerido, máximo 500 caracteres

### **Gestión de Productos:**
- ✅ Control de stock en tiempo real
- ✅ Validación de cantidades en carrito
- ✅ Persistencia de carrito entre sesiones

## 🔧 Configuración y Personalización

### **Modificar Productos:**
Edita el archivo `js/data.js` en la sección `productos`:
```javascript
{
    id: 9,
    codigo: "TU001",
    nombre: "Tu Zapatilla",
    descripcion: "Descripción de tu producto",
    precio: 99990,
    stock: 10,
    stockCritico: 3,
    categoria: "Tu Categoría",
    imagen: "tu-imagen.jpg"
}
```

### **Agregar Regiones:**
Edita el archivo `js/data.js` en la sección `regiones`:
```javascript
{
    id: 99,
    nombre: "Nueva Región",
    comunas: ["Comuna1", "Comuna2", "Comuna3"]
}
```

### **Cambiar Colores:**
Modifica las variables CSS en `css/common.css`:
```css
:root {
    --primary-color: #tu-color-primario;
    --secondary-color: #tu-color-secundario;
    /* ... más colores */
}
```

## 📚 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos, Grid, Flexbox, Variables CSS
- **JavaScript ES6+**: Lógica, validaciones, DOM manipulation
- **LocalStorage**: Persistencia de datos del lado cliente
- **Responsive Design**: Mobile-first approach

## 🎯 Funcionalidades por Página

| Página | Archivo | Funcionalidades Principales |
|--------|---------|------------------------------|
| Inicio | `index.html` | Productos destacados, navegación |
| Productos | `productos.html` | Filtros, búsqueda, ordenamiento |
| Login | `login.html` | Autenticación con validaciones |
| Registro | `registro.html` | Registro con validación RUN/email |
| Carrito | `carrito.html` | Gestión productos, checkout simulado |
| Contacto | `contacto.html` | Formulario con validaciones |
| Admin | `admin/dashboard.html` | Gestión usuarios/productos |

## ⚠️ Limitaciones Conocidas

1. **Sin Backend**: Los datos se almacenan en localStorage (se pierden al limpiar navegador)
2. **Imágenes**: Se usan placeholders (emojis) en lugar de imágenes reales
3. **Pagos**: El checkout es simulado, no procesa pagos reales
4. **Email**: Los formularios no envían emails reales
5. **Administrador**: Algunas funciones están en desarrollo (CRUD completo)

## 🔍 Testing y Debugging

### **Console Logging:**
Abre las DevTools del navegador (F12) para ver:
- Navegación entre páginas
- Validaciones de formularios  
- Gestión del carrito
- Estados de usuario
- Errores de JavaScript

### **LocalStorage:**
Inspecciona los datos en DevTools > Application > Local Storage

### **Usuarios de Prueba:**
Usa las credenciales predefinidas para probar diferentes roles

## 🚀 Próximas Mejoras

- [ ] CRUD completo para productos en admin
- [ ] Gestión de pedidos
- [ ] Sistema de reportes
- [ ] Integración con API de pagos
- [ ] Envío real de emails
- [ ] Base de datos persistente
- [ ] Sistema de reviews/comentarios
- [ ] Wishlist de productos

## 📞 Soporte

Si tienes preguntas sobre el código o necesitas ayuda:

1. Revisa este README completo
2. Inspecciona el código fuente (está comentado)
3. Usa las DevTools para debugging
4. Verifica la estructura de archivos

---

**Desarrollado para fines educativos - Proyecto SneakerStore 2024**
