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

function cloneSizes(disabledSizes = []) {
    return baseSizes.map((size) => ({
        ...size,
        enabled: !disabledSizes.includes(size.label)
    }));
}

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
const THEME_COLORS = {
    dark: "#050308",
    angelic: "#fffaf1"
};
const prefersReducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

function shouldReduceMotion() {
    return Boolean(prefersReducedMotionQuery?.matches);
}

/* ================================
   UTILIDADES
================================ */
function isProductAvailable(productId) {
    const product = products[productId];
    return product && product.available !== false;
}

function getFirstEnabledColor(product) {
    const availableColor = Object.entries(product.colors).find(([, color]) => color.enabled !== false);
    return availableColor ? availableColor[0] : Object.keys(product.colors)[0];
}

function getPrimaryImage(product) {
    const colorName = getFirstEnabledColor(product);
    const gallery = product.colors[colorName]?.gallery || [];
    return gallery[0] || "";
}

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

function getProductPreviewImages(product) {
    return [...new Set(
        Object.values(product.colors)
            .filter((colorData) => colorData.enabled !== false)
            .flatMap((colorData) => colorData.gallery || [])
            .filter(Boolean)
    )];
}

function getBlackVariantImage(product) {
    const blackColor = Object.entries(product.colors).find(([colorName, colorData]) => {
        return colorData.enabled !== false && colorName.toLowerCase().startsWith("negro");
    });

    return blackColor?.[1]?.gallery?.[0] || "";
}

function updateWardrobeBackground(card, image) {
    if (typeof getGarmentBackgroundClass !== "function") return;

    card.classList.remove("garment-bg-dark", "garment-bg-light");
    card.classList.add(getGarmentBackgroundClass(image));
}

function getScrollAmount(track, cardSelector) {
    const firstCard = track?.querySelector(cardSelector);
    if (!track || !firstCard) return track?.clientWidth || 0;

    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.gap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;

    return cardWidth + gap;
}

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

function fitAllCardTexts() {
    fitTextToCard(".product-card-name", 9);
    fitTextToCard(".related-card-name", 8);
    fitTextToCard(".new-product-name", 18);
    fitTextToCard(".wardrobe-card-title", 18);
}

function getSavedTheme() {
    try {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        return savedTheme === "angelic" ? "angelic" : "dark";
    } catch (error) {
        return "dark";
    }
}

function setTheme(theme, savePreference = true) {
    const activeTheme = theme === "angelic" ? "angelic" : "dark";
    const isAngelic = activeTheme === "angelic";

    document.body.dataset.theme = activeTheme;
    themeColorMeta?.setAttribute("content", THEME_COLORS[activeTheme]);

    themeToggles.forEach((button) => {
        button.setAttribute("aria-pressed", String(isAngelic));
        button.setAttribute("title", isAngelic ? "Cambiar a Dark" : "Cambiar a Angelic");
    });

    themeToggleTexts.forEach((textElement) => {
        textElement.textContent = isAngelic ? "Angelic / Dark" : "Dark / Angelic";
    });

    if (!savePreference) return;

    try {
        localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
    } catch (error) {
        console.warn("No se pudo guardar la preferencia de tema:", error);
    }
}

function toggleTheme() {
    const nextTheme = document.body.dataset.theme === "angelic" ? "dark" : "angelic";
    setTheme(nextTheme);
}

/* ================================
   HERO
================================ */
function showHeroSlide(index) {
    if (!heroSlides.length) return;

    heroSlides[currentHeroSlide].classList.remove("active");
    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add("active");
}

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
            aria-label="Ver detalle de ${product.name}"
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
            aria-label="Ver detalle de ${product.name}"
        >
            <h3 class="new-product-name new-product-name-top">${product.name}</h3>
            <div class="new-product-media ${backgroundClass}">
                <img src="${image}" alt="${product.name}" loading="lazy" decoding="async" />
            </div>
            <div class="new-product-content">
                <span class="new-product-label">Lo Nuevo</span>
                <p class="new-product-description">${product.description}</p>
                <div class="new-product-footer">
                    <span class="new-product-action">Ver detalle</span>
                </div>
            </div>
        </article>
    `;
}

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
            aria-label="Ver detalle de ${product.name}"
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

function createWardrobeCategoryMarkup(card) {
    const backgroundClass = getGarmentBackgroundClass(card.image || "");
    const disabledClass = card.disabled ? "is-upcoming" : "";
    const roleAttributes = card.disabled
        ? `aria-disabled="true"`
        : `role="button" tabindex="0" aria-label="Abrir ${card.title}"`;

    return `
        <article
            class="wardrobe-card reveal ${backgroundClass} ${disabledClass}"
            data-category-target="${card.target}"
            data-category-hover-image="${card.hoverImage || card.image}"
            data-category-before-hover-image=""
            data-category-is-hovering="false"
            ${roleAttributes}
        >
            <img class="wardrobe-image" src="${card.image}" alt="${card.title}" loading="lazy" decoding="async" />
            <div class="wardrobe-card-overlay">
                <span class="wardrobe-card-title">${card.title}</span>
            </div>
        </article>
    `;
}

function renderProductGrid(grid, productIds) {
    if (!grid) return;

    grid.innerHTML = productIds
        .filter(isProductAvailable)
        .map(createCardMarkup)
        .join("");
}

function renderProducts() {
    renderProductGrid(ropaCompleta, noxProductIds);
    renderProductGrid(ropaCromoCompleta, cromoProductIds);

    activateReveal();
    fitAllCardTexts();
}

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

function renderWardrobeProducts() {
    if (!wardrobeGrid) return;

    wardrobeGrid.innerHTML = wardrobeCategoryCards
        .map(createWardrobeCategoryMarkup)
        .join("");

    activateReveal();
    fitAllCardTexts();
}

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

function startNewProductsAutoScroll() {
    if (!newProductsTrack || newProductsTrack.children.length <= 2 || shouldReduceMotion()) return;

    stopNewProductsAutoScroll();
    newProductsAutoScrollInterval = setInterval(() => {
        moveNewProducts(1);
    }, NEW_PRODUCTS_AUTOSCROLL_TIME);
}

function stopNewProductsAutoScroll() {
    clearInterval(newProductsAutoScrollInterval);
    newProductsAutoScrollInterval = null;
}

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

function startCromoProductsAutoScroll() {
    if (!cromoProductsTrack || cromoProductsTrack.children.length <= 2 || shouldReduceMotion()) return;

    stopCromoProductsAutoScroll();
    cromoProductsAutoScrollInterval = setInterval(() => {
        moveCromoProducts(1);
    }, NEW_PRODUCTS_AUTOSCROLL_TIME + 1800);
}

function stopCromoProductsAutoScroll() {
    clearInterval(cromoProductsAutoScrollInterval);
    cromoProductsAutoScrollInterval = null;
}

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

function startWardrobeImageSwap() {
    if (!wardrobeGrid || shouldReduceMotion()) return;

    stopWardrobeImageSwap();
    wardrobeImageInterval = setInterval(rotateWardrobeImages, WARDROBE_IMAGE_TIME);
}

function stopWardrobeImageSwap() {
    clearInterval(wardrobeImageInterval);
    wardrobeImageInterval = null;
}

function moveRelatedProducts(direction) {
    if (!relatedProductsTrack) return;

    const scrollAmount = getScrollAmount(relatedProductsTrack, ".related-card");
    relatedProductsTrack.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

function startRelatedHoverScroll(direction) {
    if (shouldReduceMotion()) return;

    stopRelatedHoverScroll();

    relatedHoverScrollInterval = setInterval(() => {
        relatedProductsTrack?.scrollBy({ left: direction * 14, behavior: "auto" });
    }, 16);
}

function stopRelatedHoverScroll() {
    clearInterval(relatedHoverScrollInterval);
    relatedHoverScrollInterval = null;
}

function pauseBackgroundMotion() {
    stopNewProductsAutoScroll();
    stopCromoProductsAutoScroll();
    stopWardrobeImageSwap();
}

function resumeBackgroundMotion() {
    startNewProductsAutoScroll();
    startCromoProductsAutoScroll();
    startWardrobeImageSwap();
}

/* ================================
   LOADER GLOBAL
================================ */
function showPageLoader() {
    clearTimeout(loaderTimeout);

    if (!pageLoader) return;

    pageLoader.classList.add("is-active");
    pageLoader.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
}

function hidePageLoader(delay = 0) {
    clearTimeout(loaderTimeout);

    loaderTimeout = setTimeout(() => {
        if (!pageLoader) return;

        pageLoader.classList.remove("is-active");
        pageLoader.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");
    }, delay);
}

function releasePageTransition() {
    setTimeout(() => {
        isPageTransitioning = false;
    }, LOADER_HIDE_DELAY + 120);
}

/* ================================
   ARMARIO COMPLETO
================================ */
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

function closeArmarioModal() {
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


function isAnyCollectionModalOpen() {
    return Boolean(
        armarioCompleto?.classList.contains("is-open") ||
        categoriaModal?.classList.contains("is-open")
    );
}

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
            categoriaTitulo.textContent = isShirts ? "Camisas" : "CropTops";

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

function closeCategoryModal() {
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
function getModalImages(product) {
    return Object.entries(product.colors)
        .filter(([, colorData]) => colorData.enabled !== false)
        .map(([colorName, colorData]) => ({
            colorName,
            image: colorData.gallery?.[0] || ""
        }))
        .filter((item) => item.image);
}

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
                    aria-label="Color ${colorName}"
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
                    aria-label="Talla ${size.label}"
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

function updateWhatsAppLink() {
    const product = products[currentProductId];
    if (!product || !whatsappLink) return;

    const message = encodeURIComponent(
        `Hola ARKIN, estoy interesad@ en ${product.name} | ${product.price} | Color: ${currentColorName}${currentSize ? ` | Talla: ${currentSize}` : ""}`
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
        modalCollection.textContent = product.collection || "Coleccion NOX";
    }

    if (modalDescription) {
        modalDescription.textContent = product.fullDescription || product.description || "";
    }

    if (modalMaterial) {
        modalMaterial.textContent = product.material || "Material por confirmar.";
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

function closeProduct() {
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

function handleProductClick(event) {
    const card = event.target.closest(".product-card");
    if (!card) return;

    const productId = card.dataset.productId;
    const openedFromArmario = Boolean(card.closest("#ropaCompleta, #ropaCromoCompleta, #categoriaNoxGrid, #categoriaCromoGrid"));
    openProduct(productId, openedFromArmario);
}

function isKeyboardActivation(event) {
    return event.key === "Enter" || event.key === " ";
}

/* ================================
   HEADER Y REVEAL
================================ */
function updateHeaderState() {
    siteHeader?.classList.toggle("is-scrolled", window.scrollY > 10);
}

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

function closeMobileMenu() {
    if (!navMenuToggle || !mobileNavPanel || !siteHeader) return;

    siteHeader.classList.remove("mobile-menu-open");
    navMenuToggle.setAttribute("aria-expanded", "false");
    navMenuToggle.setAttribute("aria-label", "Abrir menu");
    mobileNavPanel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
}

function toggleMobileMenu() {
    if (!navMenuToggle || !mobileNavPanel || !siteHeader) return;

    const isOpen = siteHeader.classList.toggle("mobile-menu-open");

    navMenuToggle.setAttribute("aria-expanded", String(isOpen));
    navMenuToggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
    mobileNavPanel.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("nav-open", isOpen);
}


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

function getVisualLightbox() {
    if (visualLightbox) return visualLightbox;

    visualLightbox = document.createElement("div");
    visualLightbox.className = "visual-lightbox";
    visualLightbox.setAttribute("aria-hidden", "true");
    visualLightbox.innerHTML = `
        <div class="visual-lightbox-backdrop" data-visual-lightbox-close></div>
        <div class="visual-lightbox-panel" role="dialog" aria-modal="true" aria-label="Imagen ampliada de ARKIN">
            <button class="visual-lightbox-close" type="button" aria-label="Cerrar imagen" data-visual-lightbox-close></button>
            <img class="visual-lightbox-image" src="" alt="" />
        </div>
    `;

    visualLightbox.querySelectorAll("[data-visual-lightbox-close]").forEach((element) => {
        element.addEventListener("click", closeVisualLightbox);
    });

    document.body.appendChild(visualLightbox);
    return visualLightbox;
}

function openVisualLightbox(imageElement) {
    if (!imageElement) return;

    const lightbox = getVisualLightbox();
    const lightboxImage = lightbox.querySelector(".visual-lightbox-image");
    const closeButton = lightbox.querySelector(".visual-lightbox-close");

    lastFocusedBeforeVisualModal = document.activeElement;

    lightboxImage.src = imageElement.currentSrc || imageElement.src;
    lightboxImage.alt = imageElement.alt || "Imagen ARKIN ampliada";

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    closeButton?.focus();
}

function closeVisualLightbox() {
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

function initializeVisualCards() {
    document.querySelectorAll(".nosotros-visual .visual-card").forEach((card) => {
        const imageElement = card.querySelector("img");
        if (!imageElement) return;

        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Ampliar ${imageElement.alt || "imagen ARKIN"}`);

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
   RESPONSIVE FIX: ALTURA REAL EN MOVIL
================================ */
function updateAppViewportHeight() {
    document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
}

updateAppViewportHeight();
window.addEventListener("resize", updateAppViewportHeight);
window.addEventListener("orientationchange", updateAppViewportHeight);

if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateAppViewportHeight);
}

/* ================================
   INICIALIZACION
================================ */
setTheme(getSavedTheme(), false);
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