/* ================================
   DOCUMENTACION RAPIDA - FunctionalityHome.js
   - Configuracion: WhatsApp, tallas, materiales y colores por coleccion.
   - Productos: datos base, colecciones NOX/Cromo y listas de renderizado.
   - Render: crea cards, carruseles, armarios y productos relacionados.
   - Modales: abre/cierra Armario completo, categorias y detalle de producto.
   - Interaccion: hover, seleccion de color/talla, WhatsApp, menu movil y tema.
   - Rendimiento: renderiza secciones solo cuando se necesitan.
================================ */

/* ================================
   CONFIGURACION GENERAL
================================ */
const whatsappNumber = "573160551532";

const baseSizes = [
    { label: "S", enabled: true },
    { label: "M", enabled: true },
    { label: "L", enabled: true },
    { label: "XL", enabled: true }
];

// Duplica las tallas base y permite desactivar tallas puntuales.
function cloneSizes(disabledSizes = []) {
    return baseSizes.map((size) => ({
        ...size,
        enabled: !disabledSizes.includes(size.label)
    }));
}

// Crea las variantes de color y rutas de imagen para Coleccion NOX.
function createNoxColors(baseName, includeRedBlack = false) {
    const folder = "Images/Coleccion_NOX";
    const colors = {
        "Blanco Morado": {
            enabled: true,
            swatch: "linear-gradient(135deg, #f5f1e8 50%, #6d28d9 50%)",
            gallery: [`${folder}/${baseName}_BlancoMorado.png`]
        },
        "Blanco Negro": {
            enabled: true,
            swatch: "linear-gradient(135deg, #f5f1e8 50%, #111111 50%)",
            gallery: [`${folder}/${baseName}_BlancoNegro.png`]
        },
        "Negro Blanco": {
            enabled: true,
            swatch: "linear-gradient(135deg, #111111 50%, #f5f1e8 50%)",
            gallery: [`${folder}/${baseName}_NegroBlanco.png`]
        },
        "Negro Morado": {
            enabled: true,
            swatch: "linear-gradient(135deg, #111111 50%, #6d28d9 50%)",
            gallery: [`${folder}/${baseName}_NegroMorado.png`]
        }
    };

    if (includeRedBlack) {
        colors["Rojo Negro"] = {
            enabled: true,
            swatch: "linear-gradient(135deg, #dc2626 50%, #111111 50%)",
            gallery: [`${folder}/${baseName}_RojoNegro.png`]
        };
    }

    return colors;
}

// Crea las variantes de color y rutas de imagen para Coleccion Cromo.
function createCromoColors(baseName, categoryFolder = "Camisas") {
    const folder = `Images/Coleccion_NOX_Cromo/${categoryFolder}`;

    return {
        "Blanco Cromo": {
            enabled: true,
            swatch: "linear-gradient(135deg, #f5f1e8 50%, #c9c9c9 50%)",
            gallery: [`${folder}/${baseName}_BlancoCromo.png`]
        },
        "Negro Cromo": {
            enabled: true,
            swatch: "linear-gradient(135deg, #111111 50%, #c9c9c9 50%)",
            gallery: [`${folder}/${baseName}_NegroCromo.png`]
        },
        "Rojo Cromo": {
            enabled: true,
            swatch: "linear-gradient(135deg, #dc2626 50%, #c9c9c9 50%)",
            gallery: [`${folder}/${baseName}_RojoCromo.png`]
        }
    };
}

const productCopy = {
    1: {
        name: "Heart Cross",
        description: "Un simbolo afilado que nace del vacio. Una pieza limpia, oscura y elegante para quienes imponen presencia sin decir demasiado.",
        price: "$95.000"
    },
    2: {
        name: "Tribal Cross",
        description: "Trazos curvos y espinas visuales recorren la prenda como una marca nocturna. Disenada para destacar con caracter y misterio.",
        price: "$95.000"
    },
    3: {
        name: "Framing",
        description: "Una composicion oscura de energia silenciosa. Su diseno mezcla fuerza, elegancia y una identidad que no busca aprobacion.",
        price: "$85.000"
    },
    4: {
        name: "Demonic Flash",
        description: "Un diseno de presencia intensa, creado para quienes caminan entre lo minimalista y lo agresivo sin perder sofisticacion.",
        price: "$75.000"
    },
    5: {
        name: "Chain",
        description: "Una pieza marcada por el contraste y la sombra. Sutil a primera vista, pero con una esencia rebelde imposible de ignorar.",
        price: "$75.000"
    },
    6: {
        name: "Abyss Beast",
        description: "Espinas violetas atraviesan la prenda como una herida elegante. Un diseno agresivo, oscuro y dominante nacido desde el abismo.",
        price: "$75.000"
    },
    7: {
        name: "Winged Arcane",
        description: "Un sello vertical de apariencia mistica y ornamental. Una pieza creada para vestir elegancia oscura con aire ceremonial.",
        price: "$75.000"
    }
};

/* ================================
   TEXTOS EDITABLES - COLECCION CROMO
   Cambia solo descripcion y precio en esta seccion
================================ */
const cromoCopy = {
    1: {
        description: "Un simbolo afilado que nace del vacio. Una pieza limpia, oscura y elegante para quienes imponen presencia sin decir demasiado.",
        price: "$95.000"
    },
    2: {
        description: "Trazos curvos y espinas visuales recorren la prenda como una marca nocturna. Disenada para destacar con caracter y misterio.",
        price: "$95.000"
    },
    3: {
        description: "Una composicion oscura de energia silenciosa. Su diseno mezcla fuerza, elegancia y una identidad que no busca aprobacion.",
        price: "$85.000"
    },
    4: {
        description: "Un diseno de presencia intensa, creado para quienes caminan entre lo minimalista y lo agresivo sin perder sofisticacion.",
        price: "$75.000"
    },
    5: {
        description: "Una pieza marcada por el contraste y la sombra. Sutil a primera vista, pero con una esencia rebelde imposible de ignorar.",
        price: "$75.000"
    },
    6: {
        description: "Espinas cromadas atraviesan la prenda como una marca brillante y oscura. Una pieza Cromo con presencia agresiva y limpia.",
        price: "$75.000"
    },
    7: {
        description: "Un sello vertical de apariencia mistica y ornamental. Una pieza Cromo creada para vestir elegancia oscura con aire ceremonial.",
        price: "$75.000"
    }
};

const shirtMaterial = "Oversize\n80% Algodon\n16% Poliester\n4% Spandex\nGramaje 250";
const cropTopMaterial = "CropTop\n80% Algodon\n16% Poliester\n4% Spandex\nGramaje 250";

// Une nombre, descripcion, precio, material, categoria, coleccion y colores en un producto.
function createProduct({ id, designId, collection, category, colors, available = true, material = shirtMaterial, description, price }) {
    const copy = productCopy[designId];

    return {
        id,
        designId,
        name: copy.name,
        description: description || copy.description,
        material,
        price: price || copy.price,
        collection,
        category,
        available,
        sizes: cloneSizes(),
        colors
    };
}

/* ================================
   PRODUCTOS
================================ */
const products = {
    "nox-1": createProduct({ id: "nox-1", designId: 1, collection: "Coleccion NOX", category: "camisas", colors: createNoxColors("D1", true) }),
    "nox-2": createProduct({ id: "nox-2", designId: 2, collection: "Coleccion NOX", category: "camisas", colors: createNoxColors("D2") }),
    "nox-3": createProduct({ id: "nox-3", designId: 3, collection: "Coleccion NOX", category: "camisas", colors: createNoxColors("D3") }),
    "nox-4": createProduct({ id: "nox-4", designId: 4, collection: "Coleccion NOX", category: "camisas", colors: createNoxColors("D4") }),
    "nox-5": createProduct({ id: "nox-5", designId: 5, collection: "Coleccion NOX", category: "camisas", colors: createNoxColors("D5") }),
    "nox-6": createProduct({ id: "nox-6", designId: 6, collection: "Coleccion NOX", category: "camisas", colors: createNoxColors("D6"), available: false }),
    "nox-7": createProduct({ id: "nox-7", designId: 7, collection: "Coleccion NOX", category: "camisas", colors: createNoxColors("D7") }),

    "cromo-shirt-1": createProduct({ id: "cromo-shirt-1", designId: 1, collection: "Coleccion Cromo", category: "camisas", colors: createCromoColors("D1", "Camisas"), description: cromoCopy[1].description, price: cromoCopy[1].price }),
    "cromo-shirt-2": createProduct({ id: "cromo-shirt-2", designId: 2, collection: "Coleccion Cromo", category: "camisas", colors: createCromoColors("D2", "Camisas"), description: cromoCopy[2].description, price: cromoCopy[2].price }),
    "cromo-shirt-3": createProduct({ id: "cromo-shirt-3", designId: 3, collection: "Coleccion Cromo", category: "camisas", colors: createCromoColors("D3", "Camisas"), description: cromoCopy[3].description, price: cromoCopy[3].price }),
    "cromo-shirt-4": createProduct({ id: "cromo-shirt-4", designId: 4, collection: "Coleccion Cromo", category: "camisas", colors: createCromoColors("D4", "Camisas"), description: cromoCopy[4].description, price: cromoCopy[4].price }),
    "cromo-shirt-5": createProduct({ id: "cromo-shirt-5", designId: 5, collection: "Coleccion Cromo", category: "camisas", colors: createCromoColors("D5", "Camisas"), description: cromoCopy[5].description, price: cromoCopy[5].price }),
    "cromo-shirt-7": createProduct({ id: "cromo-shirt-7", designId: 7, collection: "Coleccion Cromo", category: "camisas", colors: createCromoColors("D7", "Camisas"), description: cromoCopy[7].description, price: cromoCopy[7].price }),
    "cromo-crop-6": createProduct({ id: "cromo-crop-6", designId: 6, collection: "Coleccion Cromo", category: "croptops", colors: createCromoColors("D6", "CropTops"), material: cropTopMaterial, description: cromoCopy[6].description, price: cromoCopy[6].price })
};

const noxProductIds = ["nox-1", "nox-2", "nox-3", "nox-4", "nox-5", "nox-6", "nox-7"];
const cromoShirtProductIds = ["cromo-shirt-1", "cromo-shirt-2", "cromo-shirt-3", "cromo-shirt-4", "cromo-shirt-5", "cromo-shirt-7"];
const cromoCropTopProductIds = ["cromo-crop-6"];
const cromoProductIds = [...cromoShirtProductIds, ...cromoCropTopProductIds];
const shirtProductIds = [...noxProductIds, ...cromoShirtProductIds];
const cropTopProductIds = [...cromoCropTopProductIds];
const newProductIds = [...noxProductIds];
const cromoNewProductIds = [...cromoProductIds];
const wardrobeCategoryCards = [
    {
        title: "Camisas",
        target: "camisas",
        image: getPrimaryImage(products["nox-1"]),
        hoverImage: getPrimaryImage(products["cromo-shirt-1"])
    },
    {
        title: "CropTops",
        target: "croptops",
        image: getPrimaryImage(products["cromo-crop-6"]),
        hoverImage: getBlackVariantImage(products["cromo-crop-6"])
    },
    {
        title: "Proximamente",
        target: "soon-1",
        image: "Images/Logo.png",
        disabled: true
    },
    {
        title: "Proximamente",
        target: "soon-2",
        image: "Images/Logo.png",
        disabled: true
    }
];

/* ================================
   ELEMENTOS DEL HTML
================================ */
const siteHeader = document.getElementById("siteHeader");
const navLinks = [...document.querySelectorAll(".nav-link")];
const toggleArmarioButton = document.getElementById("toggleArmario");
const armarioCompleto = document.getElementById("armarioCompleto");
const ropaCompleta = document.getElementById("ropaCompleta");
const ropaCromoCompleta = document.getElementById("ropaCromoCompleta");
const cerrarArmarioButton = document.getElementById("cerrarArmario");
const armarioBackdrop = armarioCompleto?.querySelector("[data-close-armario]");
const modal = document.getElementById("productModal");
const closeModalButton = document.getElementById("cerrarProducto");
const backdrop = modal?.querySelector("[data-close-modal]");
const modalTitle = document.getElementById("modalTitle");
const modalCollection = document.getElementById("modalCollection");
const modalDescription = document.getElementById("descripcionProducto");
const modalMaterial = document.getElementById("materialProducto");
const modalPrice = document.getElementById("precioProducto");
const mainImage = document.getElementById("imagenPrincipal");
const product360Shirt = document.getElementById("vista360Camisa");
const product360Stage = document.getElementById("vista360Stage");
const thumbnailsContainer = document.getElementById("miniaturas");
const prevImageButton = document.getElementById("modalPrevImage");
const nextImageButton = document.getElementById("modalNextImage");
const colorsContainer = document.getElementById("selectorColores");
const sizesContainer = document.getElementById("selectorTallas");
const whatsappLink = document.getElementById("linkWhatsapp");
const relatedProductsTrack = document.getElementById("relatedProductsTrack");
const relatedPrevButton = document.getElementById("relatedPrev");
const relatedNextButton = document.getElementById("relatedNext");
const scrollToRelatedButton = document.getElementById("scrollToRelated");
const newProductsTrack = document.getElementById("loNuevoTrack");
const newPrevButton = document.getElementById("loNuevoPrev");
const newNextButton = document.getElementById("loNuevoNext");
const cromoProductsTrack = document.getElementById("cromoNuevoTrack");
const cromoPrevButton = document.getElementById("cromoNuevoPrev");
const cromoNextButton = document.getElementById("cromoNuevoNext");
const wardrobeGrid = document.getElementById("wardrobeGrid");
const categoriaModal = document.getElementById("categoriaModal");
const categoriaTitulo = document.getElementById("categoriaTitulo");
const cerrarCategoriaButton = document.getElementById("cerrarCategoria");
const categoriaBackdrop = categoriaModal?.querySelector("[data-close-categoria]");
const categoriaNoxBlock = document.getElementById("categoriaNoxBlock");
const categoriaCromoBlock = document.getElementById("categoriaCromoBlock");
const categoriaNoxGrid = document.getElementById("categoriaNoxGrid");
const categoriaCromoGrid = document.getElementById("categoriaCromoGrid");
const pageLoader = document.getElementById("pageLoader");
const currentYear = document.getElementById("currentYear");
const themeToggles = [...document.querySelectorAll("[data-theme-toggle]")];
const themeToggleTexts = [...document.querySelectorAll("[data-theme-toggle-text]")];
const languageToggles = [...document.querySelectorAll("[data-language-toggle]")];
const languageToggleTexts = [...document.querySelectorAll("[data-language-toggle-text]")];
const themeColorMeta = document.getElementById("themeColorMeta");
const headerLogoLink = document.querySelector(".nav-logo");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* ================================
   ESTADO INTERNO
================================ */
let newProductsAutoScrollInterval = null;
let cromoProductsAutoScrollInterval = null;
let wardrobeImageInterval = null;
let relatedHoverScrollInterval = null;
let loaderTimeout = null;
let currentProductId = null;
let currentColorName = "";
let currentSize = "";
let currentImageIndex = 0;
let currentHeroSlide = 0;
let heroSlideInterval = null;
let productOpenedFromArmario = false;
let isPageTransitioning = false;

const heroSlides = [...document.querySelectorAll("[data-hero-slide]")];
const HERO_SLIDE_TIME = 6000;
const NEW_PRODUCTS_AUTOSCROLL_TIME = 12000;
const WARDROBE_IMAGE_TIME = 12000;
const LOADER_OPEN_DELAY = 700;
const LOADER_HIDE_DELAY = 120;
const THEME_STORAGE_KEY = "arkinThemePreference";
const LANGUAGE_STORAGE_KEY = "arkinLanguagePreference";
let currentLanguage = "es";
const THEME_COLORS = {
    dark: "#050308",
    angelic: "#fffaf1"
};
const prefersReducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

// Respeta usuarios que prefieren menos animacion.
function shouldReduceMotion() {
    return Boolean(prefersReducedMotionQuery?.matches);
}

/* ================================
   UTILIDADES
================================ */
// Valida si un producto puede mostrarse.
function isProductAvailable(productId) {
    const product = products[productId];
    return product && product.available !== false;
}

// Obtiene el primer color activo del producto.
function getFirstEnabledColor(product) {
    const availableColor = Object.entries(product.colors).find(([, color]) => color.enabled !== false);
    return availableColor ? availableColor[0] : Object.keys(product.colors)[0];
}

// Obtiene la imagen principal usada en cards y previews.
function getPrimaryImage(product) {
    const colorName = getFirstEnabledColor(product);
    const gallery = product.colors[colorName]?.gallery || [];
    return gallery[0] || "";
}

// Define fondo oscuro o claro segun el color de la prenda.
function getGarmentBackgroundClass(value = "") {
    const normalizedValue = value.toLowerCase();

    if (normalizedValue.includes("_blanco") || normalizedValue.includes("blanco ")) {
        return "garment-bg-dark";
    }

    if (normalizedValue.includes("_negro") || normalizedValue.includes("negro ")) {
        return "garment-bg-light";
    }

    return "garment-bg-dark";
}

// Reune imagenes activas de un producto para previews.
function getProductPreviewImages(product) {
    return [...new Set(
        Object.values(product.colors)
            .filter((colorData) => colorData.enabled !== false)
            .flatMap((colorData) => colorData.gallery || [])
            .filter(Boolean)
    )];
}

// Busca una variante negra para efectos hover.
function getBlackVariantImage(product) {
    const blackColor = Object.entries(product.colors).find(([colorName, colorData]) => {
        return colorData.enabled !== false && colorName.toLowerCase().startsWith("negro");
    });

    return blackColor?.[1]?.gallery?.[0] || "";
}

// Actualiza el fondo de una card cuando cambia su imagen.
function updateWardrobeBackground(card, image) {
    if (typeof getGarmentBackgroundClass !== "function") return;

    card.classList.remove("garment-bg-dark", "garment-bg-light");
    card.classList.add(getGarmentBackgroundClass(image));
}

// Calcula cuanto debe desplazarse un carrusel.
function getScrollAmount(track, cardSelector) {
    const firstCard = track?.querySelector(cardSelector);
    if (!track || !firstCard) return track?.clientWidth || 0;

    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.gap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;

    return cardWidth + gap;
}

// Reduce texto si no cabe dentro de una card.
function fitTextToCard(selector, minFontSize = 10) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
        element.style.fontSize = "";
        element.style.letterSpacing = "";

        let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
        let letterSpacing = parseFloat(window.getComputedStyle(element).letterSpacing) || 0;

        let safetyCounter = 0;

        while (element.scrollWidth > element.clientWidth && fontSize > minFontSize && safetyCounter < 40) {
            fontSize -= 0.5;
            letterSpacing = Math.max(letterSpacing - 0.2, 0);

            element.style.fontSize = `${fontSize}px`;
            element.style.letterSpacing = `${letterSpacing}px`;

            safetyCounter++;
        }
    });
}

// Aplica ajuste de texto a todas las cards visibles.
function fitAllCardTexts() {
    fitTextToCard(".product-card-name", 9);
    fitTextToCard(".related-card-name", 8);
    fitTextToCard(".new-product-name", 18);
    fitTextToCard(".wardrobe-card-title", 18);
}

// Lee el tema guardado en el navegador.
function getSavedTheme() {
    try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        return savedTheme === "angelic" ? "angelic" : "dark";
    } catch (error) {
        return "dark";
    }
}

// Aplica tema Dark o Angelic y guarda preferencia.
function setTheme(theme, savePreference = true) {
    const activeTheme = theme === "angelic" ? "angelic" : "dark";
    const isAngelic = activeTheme === "angelic";

    document.body.dataset.theme = activeTheme;
    themeColorMeta?.setAttribute("content", THEME_COLORS[activeTheme]);

    themeToggles.forEach((button) => {
        button.setAttribute("aria-pressed", String(isAngelic));
        button.setAttribute("title", isAngelic ? t("themeToDark") : t("themeToAngelic"));
    });

    themeToggleTexts.forEach((textElement) => {
        textElement.textContent = isAngelic ? t("themeTextAngelic") : t("themeTextDark");
    });

    if (!savePreference) return;

    try {
        localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
    } catch (error) {
        console.warn("No se pudo guardar la preferencia de tema:", error);
    }
}

// Cambia entre tema Dark y Angelic.
function toggleTheme() {
    const nextTheme = document.body.dataset.theme === "angelic" ? "dark" : "angelic";
    setTheme(nextTheme);
}


/* ================================
   IDIOMA ES / EN
================================ */
const productCopyEnglish = {
    1: {
        description: "A sharp symbol born from the void. A clean, dark and elegant piece for those who command presence without saying too much."
    },
    2: {
        description: "Curved traces and visual thorns move across the garment like a nocturnal mark. Designed to stand out with character and mystery."
    },
    3: {
        description: "A dark composition with silent energy. Its design blends strength, elegance and an identity that does not seek approval."
    },
    4: {
        description: "A design with intense presence, created for those who move between minimal and aggressive without losing sophistication."
    },
    5: {
        description: "A piece marked by contrast and shadow. Subtle at first sight, but with a rebellious essence impossible to ignore."
    },
    6: {
        description: "Violet thorns cross the garment like an elegant wound. An aggressive, dark and dominant design born from the abyss."
    },
    7: {
        description: "A vertical seal with a mystic and ornamental look. A piece created to wear dark elegance with a ceremonial aura."
    }
};

const cromoCopyEnglish = {
    1: {
        description: "A sharp symbol born from the void. A clean, dark and elegant Cromo piece for those who command presence without saying too much."
    },
    2: {
        description: "Curved traces and chrome energy move across the garment like a nocturnal mark. Designed to stand out with character and mystery."
    },
    3: {
        description: "A dark composition with silent energy. Its Cromo finish blends strength, elegance and an identity that does not seek approval."
    },
    4: {
        description: "A design with intense presence, created for those who move between minimal and aggressive without losing sophistication."
    },
    5: {
        description: "A piece marked by contrast, shadow and chrome shine. Subtle at first sight, but impossible to ignore."
    },
    6: {
        description: "Chrome thorns cross the garment like a bright and dark mark. A Cromo piece with aggressive and clean presence."
    },
    7: {
        description: "A vertical seal with a mystic and ornamental look. A Cromo piece created to wear dark elegance with a ceremonial aura."
    }
};

const languageText = {
    es: {
        home: "Inicio",
        new: "Lo Nuevo",
        wardrobe: "Armario",
        about: "Nosotros",
        contact: "Contactanos",
        navLabel: "Navegacion principal",
        footerNavLabel: "Navegacion del footer",
        openMenu: "Abrir menu",
        closeMenu: "Cerrar menu",
        languageAria: "Cambiar idioma a ingles",
        languageText: "ES / EN",
        newTitle: "Nuevo",
        noxCollection: "Coleccion NOX",
        cromoCollection: "Coleccion Cromo",
        fullWardrobe: "Armario completo",
        shirts: "Camisas",
        cropTops: "CropTops",
        comingSoon: "Proximamente",
        openCategory: "Abrir {title}",
        viewDetail: "Ver detalle de {product}",
        viewDetailAction: "Ver detalle",
        newLabel: "Lo Nuevo",
        colors: "Colores",
        previousImage: "Imagen anterior",
        nextImage: "Imagen siguiente",
        sizes: "Tallas",
        sizeAria: "Talla {size}",
        price: "Precio",
        view360: "Vista 360",
        description: "Descripcion",
        material: "Material",
        requestWhatsapp: "Solicitar por WhatsApp",
        related: "Mas por ver",
        relatedHint: "Ir a mas camisas",
        previousProducts: "Ver camisas anteriores",
        moreProducts: "Ver mas camisas",
        closeWardrobe: "Cerrar armario",
        closeCategory: "Cerrar categoria",
        closeProduct: "Cerrar ventana",
        productFallback: "Producto",
        materialFallback: "Material por confirmar.",
        aboutIntro: "ARKIN nace como una contrapropuesta a la cotidianidad de la industria textil en Colombia y a la necesidad de una marca oscura y elegante, donde las personas se sientan unicas, identificadas y comodas por medio de disenos y prendas de alta calidad, capaces de conectar con un publico amplio.",
        mission: "Mision",
        missionText: "Impactar y conectar a personas de diferentes estilos y generaciones mediante prendas con identidad. Buscamos crear una marca con estilo oscuro y caracter, conservando la elegancia y la limpieza mediante disenos versatiles y propios, evolucionando constantemente en calidad y vision creativa sin perder nuestra esencia.",
        vision: "Vision",
        visionText: "Convertirnos en una marca reconocida mundialmente, llevando nuestra identidad desde las calles hasta la alta costura internacional. Aspiramos a construir un universo visual y cultural que inspire autenticidad, exclusividad y arte, manteniendo siempre una esencia oscura, rebelde y atemporal.",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        tiktok: "TikTok",
        schedule: "Horario",
        allDay: "24 horas",
        location: "Ubicacion",
        seeYou: "Te esperamos",
        footerPhrase: "Exclusividad convertida en forma.",
        rights: "Todos los derechos reservados.",
        tagline: "Oscuro · Elegante · Atemporal",
        themeToDark: "Cambiar a Dark",
        themeToAngelic: "Cambiar a Angelic",
        themeTextAngelic: "Angelic / Dark",
        themeTextDark: "Dark / Angelic",
        visualLightbox: "Imagen ampliada de ARKIN",
        closeImage: "Cerrar imagen",
        expandImage: "Ampliar {alt}",
        imageExpandedAlt: "Imagen ARKIN ampliada",
        colorAria: "Color {color}",
        openProductImage: "Ampliar imagen del producto",
        closeProductImage: "Cerrar imagen del producto",
        previousProductImage: "Imagen anterior del producto",
        nextProductImage: "Imagen siguiente del producto",
        productImageCounter: "Imagen {current} de {total}",
        swipeProductImage: "Desliza para ver mas fotos",
        whatsappMessage: "Hola ARKIN, estoy interesad@ en {product} | {price} | Color: {color}{size}"
    },
    en: {
        home: "Home",
        new: "New",
        wardrobe: "Wardrobe",
        about: "About",
        contact: "Contact",
        navLabel: "Main navigation",
        footerNavLabel: "Footer navigation",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        languageAria: "Change language to Spanish",
        languageText: "EN / ES",
        newTitle: "New",
        noxCollection: "NOX Collection",
        cromoCollection: "Cromo Collection",
        fullWardrobe: "Full wardrobe",
        shirts: "Shirts",
        cropTops: "Crop Tops",
        comingSoon: "Coming soon",
        openCategory: "Open {title}",
        viewDetail: "View details for {product}",
        viewDetailAction: "View details",
        newLabel: "New Drop",
        colors: "Colors",
        previousImage: "Previous image",
        nextImage: "Next image",
        sizes: "Sizes",
        sizeAria: "Size {size}",
        price: "Price",
        view360: "360 View",
        description: "Description",
        material: "Material",
        requestWhatsapp: "Request via WhatsApp",
        related: "More to see",
        relatedHint: "Go to more products",
        previousProducts: "View previous products",
        moreProducts: "View more products",
        closeWardrobe: "Close wardrobe",
        closeCategory: "Close category",
        closeProduct: "Close window",
        productFallback: "Product",
        materialFallback: "Material to be confirmed.",
        aboutIntro: "ARKIN was born as a counterproposal to the everyday rhythm of the textile industry in Colombia and to the need for a dark and elegant brand, where people feel unique, identified and comfortable through high quality designs and garments made to connect with a broad audience.",
        mission: "Mission",
        missionText: "To impact and connect people from different styles and generations through garments with identity. We seek to build a dark and characterful brand, preserving elegance and clean design through versatile and original pieces, constantly evolving in quality and creative vision without losing our essence.",
        vision: "Vision",
        visionText: "To become a globally recognized brand, taking our identity from the streets to international high fashion. We aim to build a visual and cultural universe that inspires authenticity, exclusivity and art, while always preserving a dark, rebellious and timeless essence.",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        tiktok: "TikTok",
        schedule: "Hours",
        allDay: "24 hours",
        location: "Location",
        seeYou: "Visit us",
        footerPhrase: "Exclusivity turned into form.",
        rights: "All rights reserved.",
        tagline: "Dark · Elegant · Timeless",
        themeToDark: "Switch to Dark",
        themeToAngelic: "Switch to Angelic",
        themeTextAngelic: "Angelic / Dark",
        themeTextDark: "Dark / Angelic",
        visualLightbox: "Expanded ARKIN image",
        closeImage: "Close image",
        expandImage: "Expand {alt}",
        imageExpandedAlt: "Expanded ARKIN image",
        colorAria: "Color {color}",
        openProductImage: "Expand product image",
        closeProductImage: "Close product image",
        previousProductImage: "Previous product image",
        nextProductImage: "Next product image",
        productImageCounter: "Image {current} of {total}",
        swipeProductImage: "Swipe to see more photos",
        whatsappMessage: "Hi ARKIN, I am interested in {product} | {price} | Color: {color}{size}"
    }
};

const materialTranslations = {
    es: {
        camisas: shirtMaterial,
        croptops: cropTopMaterial
    },
    en: {
        camisas: "Oversize\n80% Cotton\n16% Polyester\n4% Spandex\n250 GSM",
        croptops: "Crop Top\n80% Cotton\n16% Polyester\n4% Spandex\n250 GSM"
    }
};

function t(key, replacements = {}) {
    const text = languageText[currentLanguage]?.[key] || languageText.es[key] || key;

    return Object.entries(replacements).reduce((value, [placeholder, replacement]) => {
        return value.replaceAll(`{${placeholder}}`, replacement);
    }, text);
}

function getSavedLanguage() {
    try {
        const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        return savedLanguage === "en" ? "en" : "es";
    } catch (error) {
        return "es";
    }
}

function getCollectionLabel(collection = "") {
    return collection.toLowerCase().includes("cromo") ? t("cromoCollection") : t("noxCollection");
}

function getProductDescription(product) {
    if (!product) return "";

    if (currentLanguage === "en") {
        const englishSource = product.collection === "Coleccion Cromo" ? cromoCopyEnglish : productCopyEnglish;
        return englishSource[product.designId]?.description || product.description || "";
    }

    return product.fullDescription || product.description || "";
}

function getProductMaterial(product) {
    if (!product) return t("materialFallback");

    if (currentLanguage === "en") {
        return materialTranslations.en[product.category] || t("materialFallback");
    }

    return product.material || t("materialFallback");
}

function getWardrobeCardTitle(card) {
    if (card.disabled) return t("comingSoon");
    if (card.target === "camisas") return t("shirts");
    if (card.target === "croptops") return t("cropTops");
    return card.title;
}

function setElementText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
        element.textContent = value;
    });
}

function setElementAttribute(selector, attribute, value) {
    document.querySelectorAll(selector).forEach((element) => {
        element.setAttribute(attribute, value);
    });
}

function updateCollectionTitles() {
    document.querySelectorAll(".collection-title").forEach((element) => {
        const currentText = element.textContent.toLowerCase();
        element.textContent = currentText.includes("cromo") ? t("cromoCollection") : t("noxCollection");
    });
}

function updateLanguageToggles() {
    const isEnglish = currentLanguage === "en";

    languageToggles.forEach((button) => {
        button.setAttribute("aria-pressed", String(isEnglish));
        button.setAttribute("aria-label", t("languageAria"));
    });

    languageToggleTexts.forEach((textElement) => {
        textElement.textContent = t("languageText");
    });
}

function updateThemeText() {
    const isAngelic = document.body.dataset.theme === "angelic";

    themeToggles.forEach((button) => {
        button.setAttribute("title", isAngelic ? t("themeToDark") : t("themeToAngelic"));
    });

    themeToggleTexts.forEach((textElement) => {
        textElement.textContent = isAngelic ? t("themeTextAngelic") : t("themeTextDark");
    });
}

function updateStaticTexts() {
    setElementAttribute(".nav", "aria-label", t("navLabel"));
    setElementAttribute(".footer-nav", "aria-label", t("footerNavLabel"));

    setElementText('.nav-link[href="#inicio"], .mobile-nav-link[href="#inicio"], .footer-nav a[href="#inicio"]', t("home"));
    setElementText('.nav-link[href="#loNuevo"], .mobile-nav-link[href="#loNuevo"], .footer-nav a[href="#loNuevo"]', t("new"));
    setElementText('.nav-link[href="#armario"], .mobile-nav-link[href="#armario"], .footer-nav a[href="#armario"]', t("wardrobe"));
    setElementText('.nav-link[href="#nosotros"], .mobile-nav-link[href="#nosotros"], .footer-nav a[href="#nosotros"]', t("about"));
    setElementText('.nav-link[href="#contacto"], .mobile-nav-link[href="#contacto"], .footer-nav a[href="#contacto"]', t("contact"));

    setElementText("#loNuevoTitle", t("newTitle"));
    setElementText("#toggleArmario", t("fullWardrobe"));
    setElementText("#armarioTitulo", t("fullWardrobe"));
    setElementText("#relatedProductsTitle", t("related"));
    setElementText("#modalTitle", modal?.classList.contains("is-open") ? (products[currentProductId]?.name || t("productFallback")) : t("productFallback"));

    updateCollectionTitles();

    if (categoriaTitulo) {
        const categoryText = categoriaTitulo.textContent.toLowerCase();
        categoriaTitulo.textContent = categoryText.includes("crop") ? t("cropTops") : t("shirts");
    }

    setElementText(".selector-block-luxury.product-size-block p", t("sizes"));
    setElementText(".product-price-block .product-section-label", t("price"));
    setElementText(".product-video-card .product-section-label", t("view360"));
    setElementText(".product-copy-section:nth-child(1) .product-section-label", t("description"));
    setElementText(".product-copy-section:nth-child(2) .product-section-label", t("material"));
    setElementText(".product-color-rail .product-section-label", t("colors"));
    setElementText("#linkWhatsapp", t("requestWhatsapp"));

    setElementText("#nosotrosTitle", t("about"));
    setElementText(".nosotros-intro", t("aboutIntro"));
    setElementText(".nosotros-value-card:nth-child(1) h3", t("mission"));
    setElementText(".nosotros-value-card:nth-child(1) p", t("missionText"));
    setElementText(".nosotros-value-card:nth-child(2) h3", t("vision"));
    setElementText(".nosotros-value-card:nth-child(2) p", t("visionText"));

    setElementText("#contactoTitle", t("contact"));
    const contactLabels = document.querySelectorAll(".contact-card .contact-label");
    if (contactLabels[0]) contactLabels[0].textContent = t("whatsapp");
    if (contactLabels[1]) contactLabels[1].textContent = t("whatsapp");
    if (contactLabels[2]) contactLabels[2].textContent = t("instagram");
    if (contactLabels[3]) contactLabels[3].textContent = t("tiktok");
    if (contactLabels[4]) contactLabels[4].textContent = t("schedule");
    setElementText(".contact-card-schedule .contact-value", t("allDay"));
    setElementText(".contact-map-overlay span", t("location"));
    setElementText(".contact-map-overlay strong", t("seeYou"));

    setElementText(".footer-brand p", t("footerPhrase"));
    setElementText(".footer-copy", `© ${currentYear?.textContent || new Date().getFullYear()} ARKIN. ${t("rights")}`);
    setElementText(".footer-tagline", t("tagline"));

    setElementAttribute("#modalPrevImage", "aria-label", t("previousImage"));
    setElementAttribute("#modalNextImage", "aria-label", t("nextImage"));
    setElementAttribute("#scrollToRelated", "aria-label", t("relatedHint"));
    setElementAttribute("#relatedPrev", "aria-label", t("previousProducts"));
    setElementAttribute("#relatedNext", "aria-label", t("moreProducts"));
    setElementAttribute("#cerrarArmario", "aria-label", t("closeWardrobe"));
    setElementAttribute("#cerrarCategoria", "aria-label", t("closeCategory"));
    setElementAttribute("#cerrarProducto", "aria-label", t("closeProduct"));

    if (navMenuToggle) {
        const isOpen = siteHeader?.classList.contains("mobile-menu-open");
        navMenuToggle.setAttribute("aria-label", isOpen ? t("closeMenu") : t("openMenu"));
    }

    updateLanguageToggles();
    updateThemeText();
    updateProductImageLightboxTexts();
}

function rerenderLanguageContent() {
    if (newProductsTrack?.children.length) renderNewProducts();
    if (cromoProductsTrack?.children.length) renderCromoNewProducts();
    if (wardrobeGrid?.children.length) renderWardrobeProducts();
    if (ropaCompleta?.children.length || ropaCromoCompleta?.children.length) renderProducts();

    if (categoriaModal?.classList.contains("is-open")) {
        const category = categoriaTitulo?.textContent.toLowerCase().includes("crop") ? "croptops" : "camisas";
        if (category === "camisas") {
            renderProductGrid(categoriaNoxGrid, noxProductIds);
            renderProductGrid(categoriaCromoGrid, cromoShirtProductIds);
        } else {
            renderProductGrid(categoriaNoxGrid, []);
            renderProductGrid(categoriaCromoGrid, cropTopProductIds);
        }
    }

    if (modal?.classList.contains("is-open")) {
        renderModal();
    }
}

function setLanguage(language, savePreference = true) {
    currentLanguage = language === "en" ? "en" : "es";
    document.documentElement.lang = currentLanguage;
    document.body.dataset.language = currentLanguage;

    updateStaticTexts();
    rerenderLanguageContent();
    updateStaticTexts();

    if (!savePreference) return;

    try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    } catch (error) {
        console.warn("No se pudo guardar la preferencia de idioma:", error);
    }
}

function toggleLanguage() {
    setLanguage(currentLanguage === "en" ? "es" : "en");
}

/* ================================
   HERO
================================ */
// Muestra una imagen del hero.
function showHeroSlide(index) {
    if (!heroSlides.length) return;

    heroSlides[currentHeroSlide].classList.remove("active");
    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add("active");
}

// Inicia rotacion automatica del hero cuando aplica.
function startHeroSlider() {
    if (heroSlides.length <= 1 || shouldReduceMotion()) return;

    clearInterval(heroSlideInterval);
    heroSlideInterval = setInterval(() => {
        showHeroSlide(currentHeroSlide + 1);
    }, HERO_SLIDE_TIME);
}

/* ================================
   RENDER DE CARDS
================================ */
// Genera el HTML de una card de producto para grids.
function createCardMarkup(productId) {
    const product = products[productId];
    const image = getPrimaryImage(product);
    const blackImage = getBlackVariantImage(product) || image;
    const backgroundClass = typeof getGarmentBackgroundClass === "function" ? getGarmentBackgroundClass(image) : "";

    return `
        <article
            class="product-card reveal ${backgroundClass}"
            data-product-id="${productId}"
            data-product-hover-image="${blackImage}"
            data-product-before-hover-image=""
            data-product-is-hovering="false"
            role="button"
            tabindex="0"
            aria-label="${t("viewDetail", { product: product.name })}"
        >
            <h3 class="product-card-name product-card-name-top">${product.name}</h3>
            <div class="product-card-media ${backgroundClass}">
                <img src="${image}" alt="${product.name}" loading="lazy" decoding="async" />
            </div>
            <div class="product-card-info">
                <span class="product-card-price">${product.price}</span>
            </div>
        </article>
    `;
}

// Genera el HTML de una card para carruseles de Lo Nuevo.
function createNewProductMarkup(productId) {
    const product = products[productId];
    if (!product) return "";

    const image = getPrimaryImage(product);
    const blackImage = getBlackVariantImage(product) || image;
    const backgroundClass = getGarmentBackgroundClass(image);

    return `
        <article
            class="new-product-card reveal ${backgroundClass}"
            data-new-product-id="${productId}"
            data-carousel-hover-image="${blackImage}"
            data-carousel-before-hover-image=""
            data-carousel-is-hovering="false"
            role="button"
            tabindex="0"
            aria-label="${t("viewDetail", { product: product.name })}"
        >
            <h3 class="new-product-name new-product-name-top">${product.name}</h3>
            <div class="new-product-media ${backgroundClass}">
                <img src="${image}" alt="${product.name}" loading="lazy" decoding="async" />
            </div>
            <div class="new-product-content">
                <span class="new-product-label">${t("newLabel")}</span>
                <p class="new-product-description">${getProductDescription(product)}</p>
                <div class="new-product-footer">
                    <span class="new-product-action">${t("viewDetailAction")}</span>
                </div>
            </div>
        </article>
    `;
}

// Genera el HTML de una card para Mas por ver.
function createRelatedCardMarkup(productId) {
    const product = products[productId];
    const image = getPrimaryImage(product);
    const blackImage = getBlackVariantImage(product) || image;
    const backgroundClass = getGarmentBackgroundClass(image);

    return `
        <article
            class="related-card ${backgroundClass}"
            data-related-product-id="${productId}"
            data-carousel-hover-image="${blackImage}"
            data-carousel-before-hover-image=""
            data-carousel-is-hovering="false"
            role="button"
            tabindex="0"
            aria-label="${t("viewDetail", { product: product.name })}"
        >
            <span class="related-card-name related-card-name-top">${product.name}</span>
            <div class="related-card-media ${backgroundClass}">
                <img src="${image}" alt="${product.name}" loading="lazy" decoding="async" />
            </div>
            <div class="related-card-info">
                <span class="related-card-price">${product.price}</span>
            </div>
        </article>
    `;
}

// Genera los recuadros principales de Armario: Camisas, CropTops y Proximamente.
function createWardrobeCategoryMarkup(card) {
    const title = getWardrobeCardTitle(card);
    const backgroundClass = getGarmentBackgroundClass(card.image || "");
    const disabledClass = card.disabled ? "is-upcoming" : "";
    const roleAttributes = card.disabled
        ? `aria-disabled="true"`
        : `role="button" tabindex="0" aria-label="${t("openCategory", { title })}"`;

    return `
        <article
            class="wardrobe-card reveal ${backgroundClass} ${disabledClass}"
            data-category-target="${card.target}"
            data-category-hover-image="${card.hoverImage || card.image}"
            data-category-before-hover-image=""
            data-category-is-hovering="false"
            ${roleAttributes}
        >
            <img class="wardrobe-image" src="${card.image}" alt="${title}" loading="lazy" decoding="async" />
            <div class="wardrobe-card-overlay">
                <span class="wardrobe-card-title">${title}</span>
            </div>
        </article>
    `;
}

// Renderiza productos dentro de un grid especifico.
function renderProductGrid(grid, productIds) {
    if (!grid) return;

    grid.innerHTML = productIds
        .filter(isProductAvailable)
        .map(createCardMarkup)
        .join("");
}

// Llena Armario completo con NOX y Cromo cuando se abre.
function renderProducts() {
    renderProductGrid(ropaCompleta, noxProductIds);
    renderProductGrid(ropaCromoCompleta, cromoProductIds);

    activateReveal();
    fitAllCardTexts();
}

// Llena el carrusel principal de Coleccion NOX.
function renderNewProducts() {
    if (!newProductsTrack) return;

    newProductsTrack.innerHTML = newProductIds
        .filter(isProductAvailable)
        .map(createNewProductMarkup)
        .join("");

    newProductsTrack.scrollTo({ left: 0, behavior: "auto" });
    activateReveal();
    fitAllCardTexts();
}

// Llena el carrusel de Coleccion Cromo.
function renderCromoNewProducts() {
    if (!cromoProductsTrack) return;

    cromoProductsTrack.innerHTML = cromoNewProductIds
        .filter(isProductAvailable)
        .map(createNewProductMarkup)
        .join("");

    cromoProductsTrack.scrollTo({ left: 0, behavior: "auto" });
    activateReveal();
    fitAllCardTexts();
}

// Llena los 4 recuadros grandes del Armario.
function renderWardrobeProducts() {
    if (!wardrobeGrid) return;

    wardrobeGrid.innerHTML = wardrobeCategoryCards
        .map(createWardrobeCategoryMarkup)
        .join("");

    activateReveal();
    fitAllCardTexts();
}

// Devuelve productos de la coleccion opuesta para Mas por ver.
function getOppositeCollectionRelatedIds(productId) {
    const product = products[productId];
    if (!product) return [];

    if (product.collection === "Coleccion NOX") {
        return cromoProductIds;
    }

    if (product.collection === "Coleccion Cromo") {
        return noxProductIds;
    }

    return Object.keys(products);
}

// Renderiza Mas por ver dentro del modal de producto.
function renderRelatedProducts() {
    if (!relatedProductsTrack || !currentProductId) return;

    relatedProductsTrack.innerHTML = getOppositeCollectionRelatedIds(currentProductId)
        .filter((productId) => productId !== String(currentProductId) && isProductAvailable(productId))
        .map(createRelatedCardMarkup)
        .join("");

    relatedProductsTrack.scrollTo({ left: 0, behavior: "auto" });
    fitAllCardTexts();
}

/* ================================
   CARRUSELES Y ROTACION
================================ */
// Mueve el carrusel NOX.
function moveNewProducts(direction) {
    if (!newProductsTrack) return;

    const maxScroll = newProductsTrack.scrollWidth - newProductsTrack.clientWidth;
    const scrollAmount = getScrollAmount(newProductsTrack, ".new-product-card");

    if (direction > 0 && newProductsTrack.scrollLeft >= maxScroll - 8) {
        newProductsTrack.scrollTo({ left: 0, behavior: "smooth" });
        return;
    }

    if (direction < 0 && newProductsTrack.scrollLeft <= 8) {
        newProductsTrack.scrollTo({ left: maxScroll, behavior: "smooth" });
        return;
    }

    newProductsTrack.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

// Inicia desplazamiento automatico del carrusel NOX.
function startNewProductsAutoScroll() {
    if (!newProductsTrack || newProductsTrack.children.length <= 2 || shouldReduceMotion()) return;

    stopNewProductsAutoScroll();
    newProductsAutoScrollInterval = setInterval(() => {
        moveNewProducts(1);
    }, NEW_PRODUCTS_AUTOSCROLL_TIME);
}

// Detiene desplazamiento automatico del carrusel NOX.
function stopNewProductsAutoScroll() {
    clearInterval(newProductsAutoScrollInterval);
    newProductsAutoScrollInterval = null;
}

// Mueve el carrusel Cromo.
function moveCromoProducts(direction) {
    if (!cromoProductsTrack) return;

    const maxScroll = cromoProductsTrack.scrollWidth - cromoProductsTrack.clientWidth;
    const scrollAmount = getScrollAmount(cromoProductsTrack, ".new-product-card");

    if (direction > 0 && cromoProductsTrack.scrollLeft >= maxScroll - 8) {
        cromoProductsTrack.scrollTo({ left: 0, behavior: "smooth" });
        return;
    }

    if (direction < 0 && cromoProductsTrack.scrollLeft <= 8) {
        cromoProductsTrack.scrollTo({ left: maxScroll, behavior: "smooth" });
        return;
    }

    cromoProductsTrack.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

// Inicia desplazamiento automatico del carrusel Cromo.
function startCromoProductsAutoScroll() {
    if (!cromoProductsTrack || cromoProductsTrack.children.length <= 2 || shouldReduceMotion()) return;

    stopCromoProductsAutoScroll();
    cromoProductsAutoScrollInterval = setInterval(() => {
        moveCromoProducts(1);
    }, NEW_PRODUCTS_AUTOSCROLL_TIME + 1800);
}

// Detiene desplazamiento automatico del carrusel Cromo.
function stopCromoProductsAutoScroll() {
    clearInterval(cromoProductsAutoScrollInterval);
    cromoProductsAutoScrollInterval = null;
}

// Cambia imagen de una card de armario al pasar el cursor.
function setWardrobeHoverImage(card, isHovering) {
    const imageElement = card.querySelector(".wardrobe-image");
    if (!imageElement) return;

    const productId = card.dataset.wardrobeProductId;
    const product = products[productId];
    const hoverImage = card.dataset.wardrobeHoverImage;

    if (!product || !hoverImage) return;

    if (isHovering) {
        card.dataset.wardrobeBeforeHoverImage = imageElement.getAttribute("src") || "";
        card.dataset.wardrobeIsHovering = "true";

        imageElement.src = hoverImage;
        imageElement.alt = `${product.name} version negra`;

        updateWardrobeBackground(card, hoverImage);
        return;
    }

    const previousImage = card.dataset.wardrobeBeforeHoverImage;

    card.dataset.wardrobeIsHovering = "false";

    if (previousImage) {
        imageElement.src = previousImage;
        imageElement.alt = product.name;
        updateWardrobeBackground(card, previousImage);
    }
}


// Cambia imagen de los recuadros Camisas/CropTops al pasar el cursor.
function setCategoryHoverImage(card, isHovering) {
    const imageElement = card.querySelector(".wardrobe-image");
    if (!imageElement) return;

    const hoverImage = card.dataset.categoryHoverImage;
    if (!hoverImage || card.classList.contains("is-upcoming")) return;

    if (isHovering) {
        card.dataset.categoryBeforeHoverImage = imageElement.getAttribute("src") || "";
        card.dataset.categoryIsHovering = "true";
        imageElement.src = hoverImage;
        updateWardrobeBackground(card, hoverImage);
        return;
    }

    const previousImage = card.dataset.categoryBeforeHoverImage;
    card.dataset.categoryIsHovering = "false";

    if (previousImage) {
        imageElement.src = previousImage;
        updateWardrobeBackground(card, previousImage);
    }
}

// Cambia imagen de producto en Armario completo al pasar el cursor.
function setFullWardrobeHoverImage(card, isHovering) {
    const imageElement = card.querySelector(".product-card-media img");
    const mediaElement = card.querySelector(".product-card-media");

    if (!imageElement) return;

    const productId = card.dataset.productId;
    const product = products[productId];
    const hoverImage = card.dataset.productHoverImage;

    if (!product || !hoverImage) return;

    if (isHovering) {
        card.dataset.productBeforeHoverImage = imageElement.getAttribute("src") || "";
        card.dataset.productIsHovering = "true";

        imageElement.src = hoverImage;
        imageElement.alt = `${product.name} version negra`;

        if (typeof getGarmentBackgroundClass === "function") {
            const backgroundClass = getGarmentBackgroundClass(hoverImage);

            card.classList.remove("garment-bg-dark", "garment-bg-light");
            card.classList.add(backgroundClass);

            mediaElement?.classList.remove("garment-bg-dark", "garment-bg-light");
            mediaElement?.classList.add(backgroundClass);
        }

        return;
    }

    const previousImage = card.dataset.productBeforeHoverImage;

    card.dataset.productIsHovering = "false";

    if (previousImage) {
        imageElement.src = previousImage;
        imageElement.alt = product.name;

        if (typeof getGarmentBackgroundClass === "function") {
            const backgroundClass = getGarmentBackgroundClass(previousImage);

            card.classList.remove("garment-bg-dark", "garment-bg-light");
            card.classList.add(backgroundClass);

            mediaElement?.classList.remove("garment-bg-dark", "garment-bg-light");
            mediaElement?.classList.add(backgroundClass);
        }
    }
}


// Cambia imagen de carrusel al pasar el cursor.
function setCarouselHoverImage(card, isHovering) {
    const imageElement = card.querySelector(".new-product-media img, .related-card-media img");
    const mediaElement = card.querySelector(".new-product-media, .related-card-media");

    if (!imageElement) return;

    const productId = card.dataset.newProductId || card.dataset.relatedProductId;
    const product = products[productId];
    const hoverImage = card.dataset.carouselHoverImage;

    if (!product || !hoverImage) return;

    if (isHovering) {
        card.dataset.carouselBeforeHoverImage = imageElement.getAttribute("src") || "";
        card.dataset.carouselIsHovering = "true";

        imageElement.src = hoverImage;
        imageElement.alt = `${product.name} version negra`;

        if (typeof getGarmentBackgroundClass === "function") {
            const backgroundClass = getGarmentBackgroundClass(hoverImage);

            card.classList.remove("garment-bg-dark", "garment-bg-light");
            card.classList.add(backgroundClass);

            mediaElement?.classList.remove("garment-bg-dark", "garment-bg-light");
            mediaElement?.classList.add(backgroundClass);
        }

        return;
    }

    const previousImage = card.dataset.carouselBeforeHoverImage;
    card.dataset.carouselIsHovering = "false";

    if (previousImage) {
        imageElement.src = previousImage;
        imageElement.alt = product.name;

        if (typeof getGarmentBackgroundClass === "function") {
            const backgroundClass = getGarmentBackgroundClass(previousImage);

            card.classList.remove("garment-bg-dark", "garment-bg-light");
            card.classList.add(backgroundClass);

            mediaElement?.classList.remove("garment-bg-dark", "garment-bg-light");
            mediaElement?.classList.add(backgroundClass);
        }
    }
}

// Rota imagenes del armario cuando hay varias previews.
function rotateWardrobeImages() {
    if (!wardrobeGrid) return;

    const wardrobeCards = [...wardrobeGrid.querySelectorAll("[data-wardrobe-product-id]")];

    wardrobeCards.forEach((card) => {
        if (card.dataset.wardrobeIsHovering === "true") return;

        const productId = card.dataset.wardrobeProductId;
        const product = products[productId];
        if (!product) return;

        const images = getProductPreviewImages(product);
        if (images.length <= 1) return;

        const imageElement = card.querySelector(".wardrobe-image");
        if (!imageElement) return;

        const currentIndex = Number(card.dataset.wardrobeImageIndex || 0);
        const nextIndex = (currentIndex + 1) % images.length;

        card.classList.add("is-changing");

        setTimeout(() => {
            imageElement.src = images[nextIndex];
            imageElement.alt = `${product.name} vista ${nextIndex + 1}`;

            card.classList.remove("garment-bg-dark", "garment-bg-light");
            card.classList.add(getGarmentBackgroundClass(images[nextIndex]));

            card.dataset.wardrobeImageIndex = String(nextIndex);
            card.classList.remove("is-changing");
        }, 220);
    });
}

// Inicia rotacion de imagenes del armario.
function startWardrobeImageSwap() {
    if (!wardrobeGrid || shouldReduceMotion()) return;

    stopWardrobeImageSwap();
    wardrobeImageInterval = setInterval(rotateWardrobeImages, WARDROBE_IMAGE_TIME);
}

// Detiene rotacion de imagenes del armario.
function stopWardrobeImageSwap() {
    clearInterval(wardrobeImageInterval);
    wardrobeImageInterval = null;
}

// Mueve el carrusel Mas por ver.
function moveRelatedProducts(direction) {
    if (!relatedProductsTrack) return;

    const scrollAmount = getScrollAmount(relatedProductsTrack, ".related-card");
    relatedProductsTrack.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

// Desplaza Mas por ver mientras se sostiene hover en flechas.
function startRelatedHoverScroll(direction) {
    if (shouldReduceMotion()) return;

    stopRelatedHoverScroll();

    relatedHoverScrollInterval = setInterval(() => {
        relatedProductsTrack?.scrollBy({ left: direction * 14, behavior: "auto" });
    }, 16);
}

// Detiene desplazamiento continuo de Mas por ver.
function stopRelatedHoverScroll() {
    clearInterval(relatedHoverScrollInterval);
    relatedHoverScrollInterval = null;
}

// Pausa animaciones de fondo cuando se abre un modal.
function pauseBackgroundMotion() {
    stopNewProductsAutoScroll();
    stopCromoProductsAutoScroll();
    stopWardrobeImageSwap();
}

// Reactiva animaciones cuando no hay modales abiertos.
function resumeBackgroundMotion() {
    startNewProductsAutoScroll();
    startCromoProductsAutoScroll();
    startWardrobeImageSwap();
}

/* ================================
   LOADER GLOBAL
================================ */
// Muestra loader global.
function showPageLoader() {
    clearTimeout(loaderTimeout);

    if (!pageLoader) return;

    pageLoader.classList.add("is-active");
    pageLoader.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
}

// Oculta loader global.
function hidePageLoader(delay = 0) {
    clearTimeout(loaderTimeout);

    loaderTimeout = setTimeout(() => {
        if (!pageLoader) return;

        pageLoader.classList.remove("is-active");
        pageLoader.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
    }, delay);
}

// Desbloquea nuevas transiciones despues del loader.
function releasePageTransition() {
    setTimeout(() => {
        isPageTransitioning = false;
    }, LOADER_HIDE_DELAY + 120);
}

/* ================================
   HISTORIAL INTERNO DE VENTANAS
   Permite que el gesto atras del celular cierre primero
   la ventana superior antes de salir de la pagina.
================================ */
const ARKIN_HISTORY_KEY = "arkinOverlay";
const ARKIN_BASE_HISTORY_KEY = "arkinBase";

function getOpenOverlayLevel() {
    if (productImageLightbox?.classList.contains("is-open")) return "product-image";
    if (visualLightbox?.classList.contains("is-open")) return "visual-image";
    if (modal?.classList.contains("is-open")) return "product";
    if (categoriaModal?.classList.contains("is-open")) return "category";
    if (armarioCompleto?.classList.contains("is-open")) return "wardrobe";
    return "page";
}

function initializeOverlayHistory() {
    try {
        const currentState = history.state && typeof history.state === "object" ? history.state : {};

        if (currentState[ARKIN_BASE_HISTORY_KEY]) return;

        history.replaceState({
            ...currentState,
            [ARKIN_BASE_HISTORY_KEY]: true,
            [ARKIN_HISTORY_KEY]: "page"
        }, "", window.location.href);
    } catch (error) {
        console.warn("No se pudo inicializar el historial interno:", error);
    }
}

function pushOverlayHistory(level) {
    try {
        if (!level || history.state?.[ARKIN_HISTORY_KEY] === level) return;

        history.pushState({
            [ARKIN_BASE_HISTORY_KEY]: true,
            [ARKIN_HISTORY_KEY]: level
        }, "", window.location.href);
    } catch (error) {
        console.warn("No se pudo guardar el paso en historial:", error);
    }
}

function closeOverlayThroughHistory(level) {
    if (history.state?.[ARKIN_HISTORY_KEY] === level) {
        history.back();
        return true;
    }

    return false;
}

function closeTopOverlayFromHistory() {
    const activeLevel = getOpenOverlayLevel();

    if (activeLevel === "product-image") {
        closeProductImageLightbox(true);
        return true;
    }

    if (activeLevel === "visual-image") {
        closeVisualLightbox(true);
        return true;
    }

    if (activeLevel === "product") {
        closeProduct(true);
        return true;
    }

    if (activeLevel === "category") {
        closeCategoryModal(true);
        return true;
    }

    if (activeLevel === "wardrobe") {
        closeArmarioModal(true);
        return true;
    }

    return false;
}

window.addEventListener("popstate", () => {
    closeTopOverlayFromHistory();
});

/* ================================
   ARMARIO COMPLETO
================================ */
// Abre Armario completo y carga sus productos.
function openArmarioModal() {
    closeMobileMenu();
    if (!armarioCompleto || isPageTransitioning) return;

    isPageTransitioning = true;
    showPageLoader();
    pauseBackgroundMotion();

    setTimeout(() => {
        try {
            armarioCompleto.classList.add("is-open");
            armarioCompleto.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");
            pushOverlayHistory("wardrobe");

            armarioCompleto.querySelector(".armario-panel")?.scrollTo({
                top: 0,
                behavior: "auto"
            });
            cerrarArmarioButton?.focus();
        } catch (error) {
            console.error("Error al abrir el armario completo:", error);
        } finally {
            hidePageLoader(LOADER_HIDE_DELAY);
            releasePageTransition();
        }
    }, LOADER_OPEN_DELAY);
}

// Cierra Armario completo.
function closeArmarioModal(fromHistory = false) {
    if (!fromHistory && closeOverlayThroughHistory("wardrobe")) return;
    if (!armarioCompleto || isPageTransitioning) return;

    isPageTransitioning = true;
    showPageLoader();

    setTimeout(() => {
        try {
            armarioCompleto.classList.remove("is-open");
            armarioCompleto.setAttribute("aria-hidden", "true");

            if (modal?.classList.contains("is-open")) {
                document.body.classList.add("modal-open");
            } else {
                document.body.classList.remove("modal-open");
            }
        } catch (error) {
            console.error("Error al cerrar el armario completo:", error);
        } finally {
            hidePageLoader(LOADER_HIDE_DELAY);
            releasePageTransition();

            if (!modal?.classList.contains("is-open")) {
                resumeBackgroundMotion();
            }
        }
    }, LOADER_OPEN_DELAY);
}


// Verifica si Armario completo o categorias estan abiertas.
function isAnyCollectionModalOpen() {
    return Boolean(
        armarioCompleto?.classList.contains("is-open") ||
        categoriaModal?.classList.contains("is-open")
    );
}

// Abre Camisas o CropTops y renderiza solo esa categoria.
function openCategoryModal(category) {
    closeMobileMenu();
    if (!categoriaModal || isPageTransitioning) return;

    const isShirts = category === "camisas";
    const isCropTops = category === "croptops";

    if (!isShirts && !isCropTops) return;

    isPageTransitioning = true;
    showPageLoader();
    pauseBackgroundMotion();

    setTimeout(() => {
        try {
            categoriaTitulo.textContent = isShirts ? t("shirts") : t("cropTops");

            if (isShirts) {
                categoriaNoxBlock.hidden = false;
                categoriaCromoBlock.hidden = false;
                renderProductGrid(categoriaNoxGrid, noxProductIds);
                renderProductGrid(categoriaCromoGrid, cromoShirtProductIds);
            }

            if (isCropTops) {
                categoriaNoxBlock.hidden = true;
                categoriaCromoBlock.hidden = false;
                renderProductGrid(categoriaNoxGrid, []);
                renderProductGrid(categoriaCromoGrid, cropTopProductIds);
            }

            categoriaModal.classList.add("is-open");
            categoriaModal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");
            pushOverlayHistory("category");

            categoriaModal.querySelector(".armario-panel")?.scrollTo({
                top: 0,
                behavior: "auto"
            });

            activateReveal();
            fitAllCardTexts();
            cerrarCategoriaButton?.focus();
        } catch (error) {
            console.error("Error al abrir la categoria:", error);
        } finally {
            hidePageLoader(LOADER_HIDE_DELAY);
            releasePageTransition();
        }
    }, LOADER_OPEN_DELAY);
}

// Cierra la ventana de categoria.
function closeCategoryModal(fromHistory = false) {
    if (!fromHistory && closeOverlayThroughHistory("category")) return;
    if (!categoriaModal || isPageTransitioning) return;

    isPageTransitioning = true;
    showPageLoader();

    setTimeout(() => {
        try {
            categoriaModal.classList.remove("is-open");
            categoriaModal.setAttribute("aria-hidden", "true");

            if (modal?.classList.contains("is-open") || armarioCompleto?.classList.contains("is-open")) {
                document.body.classList.add("modal-open");
            } else {
                document.body.classList.remove("modal-open");
            }
        } catch (error) {
            console.error("Error al cerrar la categoria:", error);
        } finally {
            hidePageLoader(LOADER_HIDE_DELAY);
            releasePageTransition();

            if (!modal?.classList.contains("is-open") && !armarioCompleto?.classList.contains("is-open")) {
                resumeBackgroundMotion();
            }
        }
    }, LOADER_OPEN_DELAY);
}

/* ================================
   MODAL DE PRODUCTO
================================ */
// Obtiene las imagenes disponibles para el modal del producto.
function getModalImages(product) {
    return Object.entries(product.colors)
        .filter(([, colorData]) => colorData.enabled !== false)
        .map(([colorName, colorData]) => ({
            colorName,
            image: colorData.gallery?.[0] || ""
        }))
        .filter((item) => item.image);
}

// Actualiza imagen principal, miniaturas y vista 360.
// Rellena todo el modal del producto actual.
function renderModalGallery(product) {
    if (!mainImage || !thumbnailsContainer) return;

    const modalImages = getModalImages(product);
    if (!modalImages.length) return;

    let imageIndex = modalImages.findIndex((item) => item.colorName === currentColorName);

    if (imageIndex === -1) {
        imageIndex = 0;
        currentColorName = modalImages[0].colorName;
    }

    currentImageIndex = imageIndex;

    const activeImage = modalImages[currentImageIndex];
    const activeBackgroundClass = getGarmentBackgroundClass(activeImage.image || activeImage.colorName);

    mainImage.src = activeImage.image;
    mainImage.alt = `${product.name} ${activeImage.colorName}`;
    mainImage.setAttribute("role", "button");
    mainImage.setAttribute("tabindex", "0");
    mainImage.setAttribute("aria-label", t("openProductImage"));
    mainImage.setAttribute("title", t("openProductImage"));

    mainImage.classList.remove("garment-bg-dark", "garment-bg-light");
    mainImage.classList.add(activeBackgroundClass);

    mainImage.closest(".product-main-frame")?.classList.remove("garment-bg-dark", "garment-bg-light");
    mainImage.closest(".product-main-frame")?.classList.add(activeBackgroundClass);

    if (product360Shirt) {
        product360Shirt.src = activeImage.image;
        product360Shirt.alt = `${product.name} vista 360`;
    }

    if (product360Stage) {
        product360Stage.classList.remove("garment-bg-dark", "garment-bg-light");
        product360Stage.classList.add(activeBackgroundClass);
    }

    thumbnailsContainer.innerHTML = modalImages
        .map((item, index) => `
            <button
                class="thumb-button ${index === currentImageIndex ? "active" : ""}"
                data-image-index="${index}"
                data-color="${item.colorName}"
                aria-label="${item.colorName}"
                title="${item.colorName}"
                type="button"
            >
                <img src="${item.image}" alt="${item.colorName}" loading="lazy" decoding="async" />
            </button>
        `)
        .join("");
}

// Renderiza botones de color.
function renderColorOptions(product) {
    if (!colorsContainer) return;

    colorsContainer.innerHTML = Object.entries(product.colors)
        .map(([colorName, colorData]) => {
            const isDisabled = colorData.enabled === false;
            const isActive = colorName === currentColorName;
            const disabledClass = isDisabled ? "is-disabled" : "";
            const activeClass = isActive ? "active" : "";

            return `
                <button
                    class="color-button ${activeClass} ${disabledClass}"
                    data-color="${colorName}"
                    title="${colorName}"
                    aria-label="${t("colorAria", { color: colorName })}"
                    aria-pressed="${isActive}"
                    aria-disabled="${isDisabled}"
                    ${isDisabled ? "disabled" : ""}
                    style="background: ${colorData.swatch};"
                    type="button"
                ></button>
            `;
        })
        .join("");
}

// Renderiza botones de talla.
function renderSizeOptions(product) {
    if (!sizesContainer) return;

    sizesContainer.innerHTML = product.sizes
        .map((size) => {
            const isDisabled = size.enabled === false;
            const isActive = size.label === currentSize;
            const disabledClass = isDisabled ? "is-disabled" : "";
            const activeClass = isActive ? "active" : "";

            return `
                <button
                    class="size-button ${activeClass} ${disabledClass}"
                    data-size="${size.label}"
                    aria-label="${t("sizeAria", { size: size.label })}"
                    aria-pressed="${isActive}"
                    aria-disabled="${isDisabled}"
                    ${isDisabled ? "disabled" : ""}
                    type="button"
                >
                    ${size.label}
                </button>
            `;
        })
        .join("");
}

// Actualiza enlace de WhatsApp con producto, color y talla.
function updateWhatsAppLink() {
    const product = products[currentProductId];
    if (!product || !whatsappLink) return;

    const sizeText = currentSize ? ` | ${currentLanguage === "en" ? "Size" : "Talla"}: ${currentSize}` : "";
    const message = encodeURIComponent(
        t("whatsappMessage", {
            product: product.name,
            price: product.price,
            color: currentColorName,
            size: sizeText
        })
    );

    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${message}`;
}

function renderModal() {
    const product = products[currentProductId];
    if (!product) return;

    if (modalTitle) {
        modalTitle.textContent = product.name;
    }

    if (modalCollection) {
        modalCollection.textContent = getCollectionLabel(product.collection || "Coleccion NOX");
    }

    if (modalDescription) {
        modalDescription.textContent = getProductDescription(product);
    }

    if (modalMaterial) {
        modalMaterial.textContent = getProductMaterial(product);
    }

    if (modalPrice) {
        modalPrice.textContent = product.price || "";
    }

    renderColorOptions(product);
    renderSizeOptions(product);
    renderModalGallery(product);
    updateWhatsAppLink();
    renderRelatedProducts();
}

// Abre el modal de producto.
function openProduct(productId, openedFromArmario = false) {
    closeMobileMenu();
    const product = products[productId];

    if (isPageTransitioning) {
        return;
    }

    if (!modal || !product || !isProductAvailable(productId)) {
        hidePageLoader();
        return;
    }

    const wasProductModalOpen = modal.classList.contains("is-open");

    isPageTransitioning = true;
    showPageLoader();
    pauseBackgroundMotion();

    setTimeout(() => {
        try {
            productOpenedFromArmario = openedFromArmario;
            currentProductId = productId;
            currentColorName = getFirstEnabledColor(product);
            currentSize = product.sizes.find((size) => size.enabled !== false)?.label || "";
            currentImageIndex = 0;

            renderModal();

            modal.classList.add("is-open");
            modal.setAttribute("aria-hidden", "false");
            document.body.classList.add("modal-open");

            if (!wasProductModalOpen) {
                pushOverlayHistory("product");
            }

            modal.querySelector(".product-panel")?.scrollTo({
                top: 0,
                behavior: "auto"
            });

            resetProductThumbsScrollEffect();
            closeModalButton?.focus();
        } catch (error) {
            console.error("Error al abrir el producto:", error);
        } finally {
            hidePageLoader(LOADER_HIDE_DELAY);
            releasePageTransition();
        }
    }, LOADER_OPEN_DELAY);
}

// Cierra el modal de producto.
function closeProduct(fromHistory = false) {
    if (!fromHistory && closeOverlayThroughHistory("product")) return;
    if (!modal || isPageTransitioning) return;

    isPageTransitioning = true;
    showPageLoader();
    stopRelatedHoverScroll();

    setTimeout(() => {
        try {
            modal.classList.remove("is-open");
            modal.setAttribute("aria-hidden", "true");

            if (productOpenedFromArmario && isAnyCollectionModalOpen()) {
                document.body.classList.add("modal-open");
            } else {
                document.body.classList.remove("modal-open");
            }

            productOpenedFromArmario = false;
        } catch (error) {
            console.error("Error al cerrar el producto:", error);
        } finally {
            hidePageLoader(LOADER_HIDE_DELAY);
            releasePageTransition();

            if (!isAnyCollectionModalOpen()) {
                resumeBackgroundMotion();
            }
        }
    }, LOADER_OPEN_DELAY);
}

// Detecta clicks sobre cards de producto.
function handleProductClick(event) {
    const card = event.target.closest(".product-card");
    if (!card) return;

    const productId = card.dataset.productId;
    const openedFromArmario = Boolean(card.closest("#ropaCompleta, #ropaCromoCompleta, #categoriaNoxGrid, #categoriaCromoGrid"));
    openProduct(productId, openedFromArmario);
}

// Permite activar cards con Enter o Espacio.
function isKeyboardActivation(event) {
    return event.key === "Enter" || event.key === " ";
}

/* ================================
   HEADER Y REVEAL
================================ */
// Cambia el header cuando la pagina hace scroll.
function updateHeaderState() {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 10);
}

// Marca el link activo segun la seccion visible.
function updateActiveNav() {
    if (!siteHeader) return;

    const sections = [...document.querySelectorAll("section[id]")];
    const scrollPosition = window.scrollY + siteHeader.offsetHeight + 120;
    let currentSectionId = "inicio";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentSectionId}`;
        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    )
    : null;

// Activa animaciones reveal cuando los elementos entran en pantalla.
function activateReveal() {
    const revealElements = document.querySelectorAll(".reveal:not(.is-observed)");

    revealElements.forEach((element) => {
        element.classList.add("is-observed");

        if (!revealObserver) {
            element.classList.add("is-visible");
            return;
        }

        revealObserver.observe(element);
    });
}

/* ================================
   MENU MOVIL
================================ */
const navMenuToggle = document.getElementById("navMenuToggle");
const mobileNavPanel = document.getElementById("mobileNavPanel");

// Cierra el menu movil.
function closeMobileMenu() {
    if (!navMenuToggle || !mobileNavPanel || !siteHeader) return;

    siteHeader.classList.remove("mobile-menu-open");
    navMenuToggle.setAttribute("aria-expanded", "false");
    navMenuToggle.setAttribute("aria-label", t("openMenu"));
    mobileNavPanel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
}

// Abre o cierra el menu movil.
function toggleMobileMenu() {
    if (!navMenuToggle || !mobileNavPanel || !siteHeader) return;

    const isOpen = siteHeader.classList.toggle("mobile-menu-open");

    navMenuToggle.setAttribute("aria-expanded", String(isOpen));
    navMenuToggle.setAttribute("aria-label", isOpen ? t("closeMenu") : t("openMenu"));
    mobileNavPanel.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("nav-open", isOpen);
}


// Lanza animacion puntual del logo.
function playHeaderLogoClickSpin() {
    if (!headerLogoLink) return;

    headerLogoLink.classList.remove("is-click-spinning");
    void headerLogoLink.offsetWidth;
    headerLogoLink.classList.add("is-click-spinning");

    window.setTimeout(() => {
        headerLogoLink.classList.remove("is-click-spinning");
    }, 2450);
}

let visualLightbox = null;
let lastFocusedBeforeVisualModal = null;

// Crea una ventana para ampliar imagenes de Nosotros.
function getVisualLightbox() {
    if (visualLightbox) return visualLightbox;

    visualLightbox = document.createElement("div");
    visualLightbox.className = "visual-lightbox";
    visualLightbox.setAttribute("aria-hidden", "true");
    visualLightbox.innerHTML = `
        <div class="visual-lightbox-backdrop" data-visual-lightbox-close></div>
        <div class="visual-lightbox-panel" role="dialog" aria-modal="true" aria-label="${t("visualLightbox")}">
            <button class="visual-lightbox-close" type="button" aria-label="${t("closeImage")}" data-visual-lightbox-close></button>
            <img class="visual-lightbox-image" src="" alt="" />
        </div>
    `;

    visualLightbox.querySelectorAll("[data-visual-lightbox-close]").forEach((element) => {
        element.addEventListener("click", closeVisualLightbox);
    });

    document.body.appendChild(visualLightbox);
    return visualLightbox;
}

// Abre la imagen ampliada.
function openVisualLightbox(imageElement) {
    if (!imageElement) return;

    const lightbox = getVisualLightbox();
    const lightboxImage = lightbox.querySelector(".visual-lightbox-image");
    const closeButton = lightbox.querySelector(".visual-lightbox-close");

    lastFocusedBeforeVisualModal = document.activeElement;

    lightboxImage.src = imageElement.currentSrc || imageElement.src;
    lightboxImage.alt = imageElement.alt || t("imageExpandedAlt");

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    pushOverlayHistory("visual-image");
    closeButton?.focus();
}

// Cierra la imagen ampliada.
function closeVisualLightbox(fromHistory = false) {
    if (!fromHistory && closeOverlayThroughHistory("visual-image")) return;
    if (!visualLightbox?.classList.contains("is-open")) return;

    visualLightbox.classList.remove("is-open");
    visualLightbox.setAttribute("aria-hidden", "true");

    if (!modal?.classList.contains("is-open") && !armarioCompleto?.classList.contains("is-open")) {
        document.body.classList.remove("no-scroll");
    }

    if (lastFocusedBeforeVisualModal instanceof HTMLElement) {
        lastFocusedBeforeVisualModal.focus();
    }

    lastFocusedBeforeVisualModal = null;
}


/* ================================
   LIGHTBOX PRODUCTO
================================ */
let productImageLightbox = null;
let productLightboxIndex = 0;
let lastFocusedBeforeProductLightbox = null;
let productLightboxTouchStartX = 0;
let productLightboxTouchStartY = 0;
let productLightboxTouchMoved = false;

function getProductImageLightbox() {
    if (productImageLightbox) return productImageLightbox;

    productImageLightbox = document.createElement("div");
    productImageLightbox.className = "product-image-lightbox";
    productImageLightbox.setAttribute("aria-hidden", "true");
    productImageLightbox.innerHTML = `
        <div class="product-image-lightbox-backdrop" data-product-lightbox-close></div>
        <div class="product-image-lightbox-panel" role="dialog" aria-modal="true" aria-label="Imagen ampliada del producto">
            <button class="product-image-lightbox-close" type="button" data-product-lightbox-close></button>
            <button class="product-image-lightbox-arrow product-image-lightbox-arrow-left" type="button" data-product-lightbox-prev>&#10094;</button>
            <figure class="product-image-lightbox-figure">
                <div class="product-image-lightbox-glow"></div>
                <img class="product-image-lightbox-img" src="" alt="" />
                <figcaption class="product-image-lightbox-caption">
                    <span class="product-image-lightbox-title"></span>
                </figcaption>
            </figure>
            <button class="product-image-lightbox-arrow product-image-lightbox-arrow-right" type="button" data-product-lightbox-next>&#10095;</button>
            <p class="product-image-lightbox-hint"></p>
        </div>
    `;

    productImageLightbox.querySelectorAll("[data-product-lightbox-close]").forEach((element) => {
        element.addEventListener("click", closeProductImageLightbox);
    });

    productImageLightbox.querySelector("[data-product-lightbox-prev]")?.addEventListener("click", () => {
        moveProductImageLightbox(-1);
    });

    productImageLightbox.querySelector("[data-product-lightbox-next]")?.addEventListener("click", () => {
        moveProductImageLightbox(1);
    });

    const panel = productImageLightbox.querySelector(".product-image-lightbox-panel");

    panel?.addEventListener("touchstart", (event) => {
        if (event.touches.length !== 1) return;

        productLightboxTouchStartX = event.touches[0].clientX;
        productLightboxTouchStartY = event.touches[0].clientY;
        productLightboxTouchMoved = false;
    }, { passive: true });

    panel?.addEventListener("touchmove", (event) => {
        if (event.touches.length !== 1) return;

        const isNativeBackArea = productLightboxTouchStartX <= 28 || productLightboxTouchStartX >= window.innerWidth - 28;
        if (isNativeBackArea) return;

        const deltaX = event.touches[0].clientX - productLightboxTouchStartX;
        const deltaY = event.touches[0].clientY - productLightboxTouchStartY;

        if (Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
            productLightboxTouchMoved = true;
            event.preventDefault();
        }
    }, { passive: false });

    panel?.addEventListener("touchend", (event) => {
        if (!productLightboxTouchMoved) return;

        const changedTouch = event.changedTouches[0];
        const deltaX = changedTouch.clientX - productLightboxTouchStartX;

        if (Math.abs(deltaX) < 48) return;

        moveProductImageLightbox(deltaX < 0 ? 1 : -1);
    }, { passive: true });

    document.body.appendChild(productImageLightbox);
    return productImageLightbox;
}

function updateProductImageLightboxTexts() {
    if (!productImageLightbox) return;

    productImageLightbox.querySelector(".product-image-lightbox-close")?.setAttribute("aria-label", t("closeProductImage"));
    productImageLightbox.querySelector("[data-product-lightbox-prev]")?.setAttribute("aria-label", t("previousProductImage"));
    productImageLightbox.querySelector("[data-product-lightbox-next]")?.setAttribute("aria-label", t("nextProductImage"));

    const hint = productImageLightbox.querySelector(".product-image-lightbox-hint");
    if (hint) hint.textContent = t("swipeProductImage");
}

function renderProductImageLightbox() {
    const product = products[currentProductId];
    if (!product || !productImageLightbox) return;

    const modalImages = getModalImages(product);
    if (!modalImages.length) return;

    productLightboxIndex = (productLightboxIndex + modalImages.length) % modalImages.length;
    const activeImage = modalImages[productLightboxIndex];
    const lightboxImage = productImageLightbox.querySelector(".product-image-lightbox-img");
    const titleLabel = productImageLightbox.querySelector(".product-image-lightbox-title");
    const backgroundClass = getGarmentBackgroundClass(activeImage.image || activeImage.colorName);

    if (lightboxImage) {
        lightboxImage.src = activeImage.image;
        lightboxImage.alt = `${product.name} ${activeImage.colorName}`;
        lightboxImage.classList.remove("garment-bg-dark", "garment-bg-light");
        lightboxImage.classList.add(backgroundClass);
    }

    productImageLightbox.classList.remove("garment-bg-dark", "garment-bg-light");
    productImageLightbox.classList.add(backgroundClass);

    if (titleLabel) titleLabel.textContent = product.name;

    updateProductImageLightboxTexts();
}

function openProductImageLightbox(index = currentImageIndex) {
    const product = products[currentProductId];
    if (!product) return;

    const modalImages = getModalImages(product);
    if (!modalImages.length) return;

    const lightbox = getProductImageLightbox();
    productLightboxIndex = Number.isFinite(index) ? index : 0;
    lastFocusedBeforeProductLightbox = document.activeElement;

    renderProductImageLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    pushOverlayHistory("product-image");
    lightbox.querySelector(".product-image-lightbox-close")?.focus();
}

function closeProductImageLightbox(fromHistory = false) {
    if (!fromHistory && closeOverlayThroughHistory("product-image")) return;
    if (!productImageLightbox?.classList.contains("is-open")) return;

    const product = products[currentProductId];
    const modalImages = product ? getModalImages(product) : [];

    if (modalImages[productLightboxIndex]) {
        currentImageIndex = productLightboxIndex;
        currentColorName = modalImages[productLightboxIndex].colorName;
        renderModal();
    }

    productImageLightbox.classList.remove("is-open");
    productImageLightbox.setAttribute("aria-hidden", "true");

    if (!modal?.classList.contains("is-open") && !armarioCompleto?.classList.contains("is-open") && !categoriaModal?.classList.contains("is-open") && !visualLightbox?.classList.contains("is-open")) {
        document.body.classList.remove("no-scroll");
    }

    if (lastFocusedBeforeProductLightbox instanceof HTMLElement) {
        lastFocusedBeforeProductLightbox.focus();
    }

    lastFocusedBeforeProductLightbox = null;
}

function moveProductImageLightbox(direction) {
    if (!productImageLightbox?.classList.contains("is-open")) return;

    const product = products[currentProductId];
    const modalImages = product ? getModalImages(product) : [];
    if (!modalImages.length) return;

    productLightboxIndex = (productLightboxIndex + direction + modalImages.length) % modalImages.length;
    renderProductImageLightbox();
}

// Conecta las imagenes de Nosotros con el lightbox.
function initializeVisualCards() {
    document.querySelectorAll(".nosotros-visual .visual-card").forEach((card) => {
        const imageElement = card.querySelector("img");
        if (!imageElement) return;

        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", t("expandImage", { alt: imageElement.alt || "imagen ARKIN" }));

        card.addEventListener("click", () => openVisualLightbox(imageElement));
        card.addEventListener("keydown", (event) => {
            if (event.key !== "Enter" && event.key !== " ") return;

            event.preventDefault();
            openVisualLightbox(imageElement);
        });
    });
}

/* ================================
   EFECTO SCROLL MINIATURAS MODAL
================================ */
let lastProductModalScrollTop = 0;

// Hace que las miniaturas suban al bajar scroll en el modal.
function handleProductThumbsScrollEffect() {
    const productPanel = document.querySelector(".product-panel-luxury");
    const thumbs = document.getElementById("miniaturas");

    if (!productPanel || !thumbs) return;

    const currentScrollTop = productPanel.scrollTop;
    const isScrollingDown = currentScrollTop > lastProductModalScrollTop;
    const hasScrolledEnough = currentScrollTop > 80;

    if (isScrollingDown && hasScrolledEnough) {
        thumbs.classList.add("thumbs-over-main");
    } else {
        thumbs.classList.remove("thumbs-over-main");
    }

    lastProductModalScrollTop = Math.max(currentScrollTop, 0);
}

// Reinicia posicion de miniaturas al abrir producto.
function resetProductThumbsScrollEffect() {
    const productPanel = document.querySelector(".product-panel-luxury");
    const thumbs = document.getElementById("miniaturas");

    lastProductModalScrollTop = 0;
    thumbs?.classList.remove("thumbs-over-main");

    if (productPanel) {
        productPanel.scrollTop = 0;
    }
}

/* ================================
   EVENTOS
================================ */
themeToggles.forEach((button) => {
    button.addEventListener("click", toggleTheme);
});

languageToggles.forEach((button) => {
    button.addEventListener("click", toggleLanguage);
});

document
    .querySelector(".product-panel-luxury")
    ?.addEventListener("scroll", handleProductThumbsScrollEffect, { passive: true });

newNextButton?.addEventListener("click", () => {
    moveNewProducts(1);
    startNewProductsAutoScroll();
});

newPrevButton?.addEventListener("click", () => {
    moveNewProducts(-1);
    startNewProductsAutoScroll();
});

newProductsTrack?.addEventListener("mouseenter", stopNewProductsAutoScroll);
newProductsTrack?.addEventListener("mouseleave", startNewProductsAutoScroll);

newProductsTrack?.addEventListener("mouseover", (event) => {
    const card = event.target.closest("[data-new-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setCarouselHoverImage(card, true);
});

newProductsTrack?.addEventListener("mouseout", (event) => {
    const card = event.target.closest("[data-new-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setCarouselHoverImage(card, false);
});

newProductsTrack?.addEventListener("click", (event) => {
    const card = event.target.closest("[data-new-product-id]");
    if (!card) return;

    openProduct(card.dataset.newProductId);
});

newProductsTrack?.addEventListener("keydown", (event) => {
    if (!isKeyboardActivation(event)) return;

    const card = event.target.closest("[data-new-product-id]");
    if (!card) return;

    event.preventDefault();
    openProduct(card.dataset.newProductId);
});

cromoNextButton?.addEventListener("click", () => {
    moveCromoProducts(1);
    startCromoProductsAutoScroll();
});

cromoPrevButton?.addEventListener("click", () => {
    moveCromoProducts(-1);
    startCromoProductsAutoScroll();
});

cromoProductsTrack?.addEventListener("mouseenter", stopCromoProductsAutoScroll);
cromoProductsTrack?.addEventListener("mouseleave", startCromoProductsAutoScroll);

cromoProductsTrack?.addEventListener("mouseover", (event) => {
    const card = event.target.closest("[data-new-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setCarouselHoverImage(card, true);
});

cromoProductsTrack?.addEventListener("mouseout", (event) => {
    const card = event.target.closest("[data-new-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setCarouselHoverImage(card, false);
});

cromoProductsTrack?.addEventListener("click", (event) => {
    const card = event.target.closest("[data-new-product-id]");
    if (!card) return;

    openProduct(card.dataset.newProductId);
});

cromoProductsTrack?.addEventListener("keydown", (event) => {
    if (!isKeyboardActivation(event)) return;

    const card = event.target.closest("[data-new-product-id]");
    if (!card) return;

    event.preventDefault();
    openProduct(card.dataset.newProductId);
});

relatedNextButton?.addEventListener("click", () => moveRelatedProducts(1));
relatedPrevButton?.addEventListener("click", () => moveRelatedProducts(-1));
relatedNextButton?.addEventListener("mouseenter", () => startRelatedHoverScroll(1));
relatedPrevButton?.addEventListener("mouseenter", () => startRelatedHoverScroll(-1));
relatedNextButton?.addEventListener("mouseleave", stopRelatedHoverScroll);
relatedPrevButton?.addEventListener("mouseleave", stopRelatedHoverScroll);
relatedNextButton?.addEventListener("blur", stopRelatedHoverScroll);
relatedPrevButton?.addEventListener("blur", stopRelatedHoverScroll);

scrollToRelatedButton?.addEventListener("click", () => {
    document.querySelector(".related-products")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Conecta eventos de click, teclado y hover en grids renderizados.
function bindProductGridEvents(grid) {
    if (!grid) return;

    grid.addEventListener("mouseover", (event) => {
        const card = event.target.closest("[data-product-id]");
        if (!card || card.contains(event.relatedTarget)) return;

        setFullWardrobeHoverImage(card, true);
    });

    grid.addEventListener("mouseout", (event) => {
        const card = event.target.closest("[data-product-id]");
        if (!card || card.contains(event.relatedTarget)) return;

        setFullWardrobeHoverImage(card, false);
    });

    grid.addEventListener("click", handleProductClick);

    grid.addEventListener("keydown", (event) => {
        if (!isKeyboardActivation(event)) return;

        const card = event.target.closest("[data-product-id]");
        if (!card) return;

        event.preventDefault();
        const openedFromArmario = Boolean(card.closest("#ropaCompleta, #ropaCromoCompleta, #categoriaNoxGrid, #categoriaCromoGrid"));
        openProduct(card.dataset.productId, openedFromArmario);
    });
}

[
    ropaCompleta,
    ropaCromoCompleta,
    categoriaNoxGrid,
    categoriaCromoGrid
].forEach(bindProductGridEvents);

toggleArmarioButton?.addEventListener("click", openArmarioModal);
cerrarArmarioButton?.addEventListener("click", closeArmarioModal);
armarioBackdrop?.addEventListener("click", closeArmarioModal);
cerrarCategoriaButton?.addEventListener("click", closeCategoryModal);
categoriaBackdrop?.addEventListener("click", closeCategoryModal);
closeModalButton?.addEventListener("click", closeProduct);
backdrop?.addEventListener("click", closeProduct);

wardrobeGrid?.addEventListener("mouseover", (event) => {
    const categoryCard = event.target.closest("[data-category-target]");
    if (categoryCard && !categoryCard.contains(event.relatedTarget)) {
        setCategoryHoverImage(categoryCard, true);
        return;
    }

    const card = event.target.closest("[data-wardrobe-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setWardrobeHoverImage(card, true);
});

wardrobeGrid?.addEventListener("mouseout", (event) => {
    const categoryCard = event.target.closest("[data-category-target]");
    if (categoryCard && !categoryCard.contains(event.relatedTarget)) {
        setCategoryHoverImage(categoryCard, false);
        return;
    }

    const card = event.target.closest("[data-wardrobe-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setWardrobeHoverImage(card, false);
});

wardrobeGrid?.addEventListener("click", (event) => {
    const categoryCard = event.target.closest("[data-category-target]");

    if (categoryCard && !categoryCard.classList.contains("is-upcoming")) {
        openCategoryModal(categoryCard.dataset.categoryTarget);
        return;
    }

    const card = event.target.closest("[data-wardrobe-product-id]");
    if (!card) return;

    openProduct(card.dataset.wardrobeProductId);
});

wardrobeGrid?.addEventListener("keydown", (event) => {
    if (!isKeyboardActivation(event)) return;

    const categoryCard = event.target.closest("[data-category-target]");

    if (categoryCard && !categoryCard.classList.contains("is-upcoming")) {
        event.preventDefault();
        openCategoryModal(categoryCard.dataset.categoryTarget);
        return;
    }

    const card = event.target.closest("[data-wardrobe-product-id]");
    if (!card) return;

    event.preventDefault();
    openProduct(card.dataset.wardrobeProductId);
});

relatedProductsTrack?.addEventListener("mouseover", (event) => {
    const card = event.target.closest("[data-related-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setCarouselHoverImage(card, true);
});

relatedProductsTrack?.addEventListener("mouseout", (event) => {
    const card = event.target.closest("[data-related-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setCarouselHoverImage(card, false);
});

relatedProductsTrack?.addEventListener("click", (event) => {
    const card = event.target.closest("[data-related-product-id]");
    if (!card) return;

    openProduct(card.dataset.relatedProductId, productOpenedFromArmario);
});

relatedProductsTrack?.addEventListener("keydown", (event) => {
    if (!isKeyboardActivation(event)) return;

    const card = event.target.closest("[data-related-product-id]");
    if (!card) return;

    event.preventDefault();
    openProduct(card.dataset.relatedProductId, productOpenedFromArmario);
});

colorsContainer?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-color]");
    if (!button || !currentProductId) return;

    const selectedColor = button.dataset.color;
    const product = products[currentProductId];
    const colorData = product.colors[selectedColor];

    if (!colorData || colorData.enabled === false) return;

    currentColorName = selectedColor;
    renderModal();
});

sizesContainer?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-size]");
    if (!button || !currentProductId) return;

    const selectedSize = button.dataset.size;
    const product = products[currentProductId];
    const sizeData = product.sizes.find((size) => size.label === selectedSize);

    if (!sizeData || sizeData.enabled === false) return;

    currentSize = selectedSize;
    renderModal();
});


mainImage?.addEventListener("click", () => {
    if (!currentProductId) return;
    openProductImageLightbox(currentImageIndex);
});

mainImage?.addEventListener("keydown", (event) => {
    if (!isKeyboardActivation(event)) return;

    event.preventDefault();
    if (!currentProductId) return;
    openProductImageLightbox(currentImageIndex);
});

thumbnailsContainer?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-image-index]");
    if (!button || !currentProductId) return;

    const product = products[currentProductId];
    const modalImages = getModalImages(product);
    const selectedIndex = Number(button.dataset.imageIndex);

    if (!modalImages[selectedIndex]) return;

    currentImageIndex = selectedIndex;
    currentColorName = modalImages[currentImageIndex].colorName;
    renderModal();
});

prevImageButton?.addEventListener("click", () => {
    if (!currentProductId) return;

    const product = products[currentProductId];
    const modalImages = getModalImages(product);
    if (!modalImages.length) return;

    currentImageIndex = (currentImageIndex - 1 + modalImages.length) % modalImages.length;
    currentColorName = modalImages[currentImageIndex].colorName;
    renderModal();
});

nextImageButton?.addEventListener("click", () => {
    if (!currentProductId) return;

    const product = products[currentProductId];
    const modalImages = getModalImages(product);
    if (!modalImages.length) return;

    currentImageIndex = (currentImageIndex + 1) % modalImages.length;
    currentColorName = modalImages[currentImageIndex].colorName;
    renderModal();
});

document.addEventListener("keydown", (event) => {
    if (productImageLightbox?.classList.contains("is-open")) {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveProductImageLightbox(-1);
            return;
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            moveProductImageLightbox(1);
            return;
        }

        if (event.key === "Escape") {
            closeProductImageLightbox();
            return;
        }
    }

    if (event.key !== "Escape") return;

    if (visualLightbox?.classList.contains("is-open")) {
        closeVisualLightbox();
        return;
    }

    if (modal?.classList.contains("is-open")) {
        closeProduct();
        return;
    }

    if (categoriaModal?.classList.contains("is-open")) {
        closeCategoryModal();
        return;
    }

    if (armarioCompleto?.classList.contains("is-open")) {
        closeArmarioModal();
    }
});

navMenuToggle?.addEventListener("click", toggleMobileMenu);
mobileNavPanel?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

headerLogoLink?.addEventListener("click", () => {
    playHeaderLogoClickSpin();
    closeMobileMenu();
});

window.addEventListener("scroll", () => {
    updateHeaderState();
    updateActiveNav();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
        closeMobileMenu();
    }

    updateActiveNav();
    fitAllCardTexts();
});

prefersReducedMotionQuery?.addEventListener?.("change", () => {
    if (shouldReduceMotion()) {
        pauseBackgroundMotion();
        clearInterval(heroSlideInterval);
        stopRelatedHoverScroll();
        return;
    }

    startHeroSlider();

    if (!modal?.classList.contains("is-open") && !armarioCompleto?.classList.contains("is-open")) {
        resumeBackgroundMotion();
    }
});



/* ================================
   OPTIMIZACION: PAUSAR MOVIMIENTO EN SEGUNDO PLANO
================================ */
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        pauseBackgroundMotion();
        clearInterval(heroSlideInterval);
        return;
    }

    startHeroSlider();

    if (!modal?.classList.contains("is-open") && !armarioCompleto?.classList.contains("is-open")) {
        resumeBackgroundMotion();
    }
});



/* ================================
   OPTIMIZACION: PAUSAR CARRUSELES FUERA DE PANTALLA
================================ */
const loNuevoSection = document.getElementById("loNuevo");
const armarioSection = document.getElementById("armario");

if ("IntersectionObserver" in window) {
    const motionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.target === loNuevoSection) {
                    if (entry.isIntersecting && !modal?.classList.contains("is-open") && !armarioCompleto?.classList.contains("is-open")) {
                        startNewProductsAutoScroll();
                        startCromoProductsAutoScroll();
                    } else {
                        stopNewProductsAutoScroll();
                        stopCromoProductsAutoScroll();
                    }
                }

                if (entry.target === armarioSection) {
                    if (entry.isIntersecting && !modal?.classList.contains("is-open") && !armarioCompleto?.classList.contains("is-open")) {
                        startWardrobeImageSwap();
                    } else {
                        stopWardrobeImageSwap();
                    }
                }
            });
        },
        {
            root: null,
            threshold: 0.08
        }
    );

    if (loNuevoSection) motionObserver.observe(loNuevoSection);
    if (armarioSection) motionObserver.observe(armarioSection);
}



/* ================================
   GESTOS MOVILES NATIVOS
   No bloqueamos el gesto atras del sistema.
   El historial interno cierra primero lightbox, producto, categoria o armario.
================================ */

/* ================================
   RESPONSIVE FIX: ALTURA REAL EN MOVIL
================================ */
// Guarda la altura real de pantalla sin bloquear el zoom del navegador.
let viewportHeightAnimationFrame = null;

function updateAppViewportHeight() {
    const height = window.innerHeight || document.documentElement.clientHeight;
    document.documentElement.style.setProperty("--app-height", `${height}px`);
}

function requestAppViewportHeightUpdate() {
    cancelAnimationFrame(viewportHeightAnimationFrame);
    viewportHeightAnimationFrame = requestAnimationFrame(updateAppViewportHeight);
}

updateAppViewportHeight();
window.addEventListener("resize", requestAppViewportHeightUpdate, { passive: true });
window.addEventListener("orientationchange", () => {
    window.setTimeout(requestAppViewportHeightUpdate, 180);
}, { passive: true });

if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
        if (window.visualViewport.scale && Math.abs(window.visualViewport.scale - 1) > 0.01) return;
        requestAppViewportHeightUpdate();
    }, { passive: true });
}

/* ================================
   INICIALIZACION
================================ */
initializeOverlayHistory();
setTheme(getSavedTheme(), false);
setLanguage(getSavedLanguage(), false);
renderProducts();
renderNewProducts();
renderCromoNewProducts();
renderWardrobeProducts();
initializeVisualCards();
updateHeaderState();
updateActiveNav();
startHeroSlider();
startNewProductsAutoScroll();
startCromoProductsAutoScroll();
startWardrobeImageSwap();

if (document.fonts) {
    document.fonts.ready.then(fitAllCardTexts);
} else {
    window.addEventListener("load", fitAllCardTexts);
}