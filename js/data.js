
/**
 * Datos de la aplicación SneakerStore
 * Contiene productos, regiones, blogs y funciones de utilidad
 */

// Datos de productos de la tienda
const appData = {
    productos: [
        {
            id: 1,
            codigo: "NK001",
            nombre: "Nike Air Max 270",
            descripcion: "Zapatillas deportivas con tecnología Air Max para máximo confort y estilo urbano.",
            precio: 89990,
            stock: 15,
            stockCritico: 5,
            categoria: "Deportivas",
            imagen: "nike-air-max-270.jpg"
        },
        {
            id: 2,
            codigo: "AD001",
            nombre: "Adidas Ultraboost 22",
            descripcion: "Zapatillas de running con tecnología Boost para mayor retorno de energía.",
            precio: 129990,
            stock: 8,
            stockCritico: 5,
            categoria: "Running",
            imagen: "adidas-ultraboost.jpg"
        },
        {
            id: 3,
            codigo: "CJ001",
            nombre: "Converse Chuck Taylor",
            descripcion: "Clásicas zapatillas de lona, perfectas para uso casual y estilo atemporal.",
            precio: 45990,
            stock: 25,
            stockCritico: 10,
            categoria: "Casual",
            imagen: "converse-chuck-taylor.jpg"
        },
        {
            id: 4,
            codigo: "VN001",
            nombre: "Vans Old Skool",
            descripcion: "Zapatillas icónicas de skate con suela de goma resistente y diseño clásico.",
            precio: 59990,
            stock: 12,
            stockCritico: 5,
            categoria: "Skate",
            imagen: "vans-old-skool.jpg"
        },
        {
            id: 5,
            codigo: "PU001",
            nombre: "Puma RS-X",
            descripcion: "Zapatillas retro-futuristas con diseño llamativo y máximo confort.",
            precio: 79990,
            stock: 6,
            stockCritico: 5,
            categoria: "Lifestyle",
            imagen: "puma-rsx.jpg"
        },
        {
            id: 6,
            codigo: "NB001",
            nombre: "New Balance 574",
            descripcion: "Zapatillas versátiles con equilibrio perfecto entre estilo y comodidad.",
            precio: 69990,
            stock: 18,
            stockCritico: 8,
            categoria: "Casual",
            imagen: "new-balance-574.jpg"
        }
    ],

    // Regiones de Chile
    regiones: [
        {
            id: 1,
            nombre: "Región de Arica y Parinacota",
            comunas: ["Arica", "Camarones", "Putre", "General Lagos"]
        },
        {
            id: 13,
            nombre: "Región Metropolitana de Santiago",
            comunas: ["Santiago", "Las Condes", "Providencia", "Vitacura", "Ñuñoa", "Maipú"]
        },
        {
            id: 10,
            nombre: "Región de Los Lagos",
            comunas: ["Puerto Montt", "Castro", "Ancud", "Osorno", "Puerto Varas", "Frutillar"]
        }
    ],

    // Artículos del blog
    blogs: [
        {
            id: 1,
            titulo: "Las Tendencias de Zapatillas 2025",
            descripcionCorta: "Descubre cuáles serán las zapatillas más populares este año.",
            descripcionLarga: "El mundo de las zapatillas está en constante evolución. En 2025, veremos un retorno a los diseños clásicos combinados con tecnología moderna. Las zapatillas chunky siguen siendo populares, pero con materiales más sustentables.",
            imagen: "blog-tendencias-2025.jpg"
        },
        {
            id: 2,
            titulo: "Cómo Cuidar tus Zapatillas Premium",
            descripcionCorta: "Consejos profesionales para mantener tus zapatillas como nuevas.",
            descripcionLarga: "Invertir en zapatillas premium requiere cuidados especiales. Primero, usa protectores antes del primer uso. Para la limpieza diaria, utiliza un cepillo suave y productos específicos según el material.",
            imagen: "blog-cuidado-zapatillas.jpg"
        }
    ]
};

// Funciones de utilidad global
const utils = {
    // Formatear precio en pesos chilenos
    formatPrice: function(precio) {
        return `$${precio.toLocaleString('es-CL')}`;
    },

    // Obtener estado del stock
    getStockStatus: function(producto) {
        if (producto.stock <= 0) {
            return { clase: 'out-of-stock', texto: 'Agotado' };
        } else if (producto.stock <= producto.stockCritico) {
            return { clase: 'low-stock', texto: 'Stock Bajo' };
        } else {
            return { clase: 'in-stock', texto: 'Disponible' };
        }
    },

    // Validar RUN chileno
    validateRUN: function(run) {
        const cleanRun = run.replace(/[.-]/g, '');
        if (cleanRun.length < 7 || cleanRun.length > 9) return false;
        if (!/^\d+[0-9kK]$/.test(cleanRun)) return false;

        const runDigits = cleanRun.slice(0, -1);
        const dv = cleanRun.slice(-1).toUpperCase();
        let sum = 0;
        let multiplier = 2;

        for (let i = runDigits.length - 1; i >= 0; i--) {
            sum += parseInt(runDigits[i]) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }

        const remainder = sum % 11;
        const calculatedDV = remainder === 0 ? '0' : remainder === 1 ? 'K' : (11 - remainder).toString();

        return dv === calculatedDV;
    },

    // Validar email
    validateEmail: function(email) {
        const allowedDomains = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        return allowedDomains.some(domain => email.endsWith(domain));
    }
};
