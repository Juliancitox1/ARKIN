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

function createColors(baseName, includeRedBlack = false) {
    const colors = {
        "Blanco Morado": {
            enabled: true,
            swatch: "linear-gradient(135deg, #f5f1e8 50%, #6d28d9 50%)",
            gallery: [`Images/${baseName}_BlancoMorado.png`]
        },
        "Blanco Negro": {
            enabled: true,
            swatch: "linear-gradient(135deg, #f5f1e8 50%, #111111 50%)",
            gallery: [`Images/${baseName}_BlancoNegro.png`]
        },
        "Negro Blanco": {
            enabled: true,
            swatch: "linear-gradient(135deg, #111111 50%, #f5f1e8 50%)",
            gallery: [`Images/${baseName}_NegroBlanco.png`]
        },
        "Negro Morado": {
            enabled: true,
            swatch: "linear-gradient(135deg, #111111 50%, #6d28d9 50%)",
            gallery: [`Images/${baseName}_NegroMorado.png`]
        }
    };

    if (includeRedBlack) {
        colors["Rojo Negro"] = {
            enabled: true,
            swatch: "linear-gradient(135deg, #dc2626 50%, #111111 50%)",
            gallery: [`Images/${baseName}_RojoNegro.png`]
        };
    }

    return colors;
}

/* ================================
   PRODUCTOS
================================ */
const products = {
    1: {
        name: "Heart Cross",
        description: "Un simbolo afilado que nace del vacio. Una pieza limpia, oscura y elegante para quienes imponen presencia sin decir demasiado.",
        material: "Oversize\n80% Algodon\n16% Poliester\n4% Spandex\nGramaje 250",
        price: "$95.000",
        sizes: cloneSizes(),
        colors: createColors("D1", true)
    },
    2: {
        name: "Tribal Cross",
        description: "Trazos curvos y espinas visuales recorren la prenda como una marca nocturna. Disenada para destacar con caracter y misterio.",
        material: "Oversize\n80% Algodon\n16% Poliester\n4% Spandex\nGramaje 250",
        price: "$95.000",
        sizes: cloneSizes(),
        colors: createColors("D2")
    },
    3: {
        name: "Framing",
        description: "Una composicion oscura de energia silenciosa. Su diseno mezcla fuerza, elegancia y una identidad que no busca aprobacion.",
        material: "Oversize\n80% Algodon\n16% Poliester\n4% Spandex\nGramaje 250",
        price: "$85.000",
        sizes: cloneSizes(),
        colors: createColors("D3")
    },
    4: {
        name: "Demonic Flash",
        description: "Un diseno de presencia intensa, creado para quienes caminan entre lo minimalista y lo agresivo sin perder sofisticacion.",
        material: "Oversize\n80% Algodon\n16% Poliester\n4% Spandex\nGramaje 250",
        price: "$75.000",
        sizes: cloneSizes(),
        colors: createColors("D4")
    },
    5: {
        name: "Chain",
        description: "Una pieza marcada por el contraste y la sombra. Sutil a primera vista, pero con una esencia rebelde imposible de ignorar.",
        material: "Oversize\n80% Algodon\n16% Poliester\n4% Spandex\nGramaje 250",
        price: "$75.000",
        sizes: cloneSizes(),
        colors: createColors("D5")
    },
    6: {
        name: "Abyss Beast",
        available: false,
        description: "Espinas violetas atraviesan la prenda como una herida elegante. Un diseno agresivo, oscuro y dominante nacido desde el abismo.",
        material: "Oversize\n80% Algodon\n16% Poliester\n4% Spandex\nGramaje 250",
        price: "$75.000",
        sizes: cloneSizes(),
        colors: createColors("D6")
    },
    7: {
        name: "Winged Arcane",
        description: "Un sello vertical de apariencia mistica y ornamental. Una pieza creada para vestir elegancia oscura con aire ceremonial.",
        material: "Oversize\n80% Algodon\n16% Poliester\n4% Spandex\nGramaje 250",
        price: "$75.000",
        sizes: cloneSizes(),
        colors: createColors("D7")
    }
};

const newProductIds = [1, 2, 3, 4, 5, 6, 7];
const wardrobeProductIds = [1, 2, 3, 4];

/* ================================
   ELEMENTOS DEL HTML
================================ */
const siteHeader = document.getElementById("siteHeader");
const navLinks = [...document.querySelectorAll(".nav-link")];
const toggleArmarioButton = document.getElementById("toggleArmario");
const armarioCompleto = document.getElementById("armarioCompleto");
const ropaCompleta = document.getElementById("ropaCompleta");
const cerrarArmarioButton = document.getElementById("cerrarArmario");
const armarioBackdrop = armarioCompleto?.querySelector("[data-close-armario]");
const modal = document.getElementById("productModal");
const closeModalButton = document.getElementById("cerrarProducto");
const backdrop = modal?.querySelector("[data-close-modal]");
const modalTitle = document.getElementById("modalTitle");
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
const wardrobeGrid = document.getElementById("wardrobeGrid");
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

function createWardrobeCardMarkup(productId) {
    const product = products[productId];
    if (!product) return "";

    const images = getProductPreviewImages(product);
    const image = images[0] || getPrimaryImage(product);
    const blackImage = getBlackVariantImage(product) || image;
    const backgroundClass = typeof getGarmentBackgroundClass === "function" ? getGarmentBackgroundClass(image) : "";

    return `
        <article
            class="wardrobe-card reveal ${backgroundClass}"
            data-wardrobe-product-id="${productId}"
            data-wardrobe-image-index="0"
            data-wardrobe-hover-image="${blackImage}"
            data-wardrobe-before-hover-image=""
            data-wardrobe-is-hovering="false"
            role="button"
            tabindex="0"
            aria-label="Ver ${product.name}"
        >
            <img class="wardrobe-image" src="${image}" alt="${product.name}" loading="lazy" decoding="async" />
            <div class="wardrobe-card-overlay">
                <span class="wardrobe-card-title">${product.name}</span>
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

function renderProducts() {
    if (!ropaCompleta) return;

    ropaCompleta.innerHTML = Object.keys(products)
        .filter(isProductAvailable)
        .map(createCardMarkup)
        .join("");

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

function renderWardrobeProducts() {
    if (!wardrobeGrid) return;

    wardrobeGrid.innerHTML = wardrobeProductIds
        .filter(isProductAvailable)
        .map(createWardrobeCardMarkup)
        .join("");

    activateReveal();
    fitAllCardTexts();
}

function renderRelatedProducts() {
    if (!relatedProductsTrack || !currentProductId) return;

    relatedProductsTrack.innerHTML = Object.keys(products)
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
    stopWardrobeImageSwap();
}

function resumeBackgroundMotion() {
    startNewProductsAutoScroll();
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

            if (productOpenedFromArmario && armarioCompleto?.classList.contains("is-open")) {
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

            if (!armarioCompleto?.classList.contains("is-open")) {
                resumeBackgroundMotion();
            }
        }
    }, LOADER_OPEN_DELAY);
}

function handleProductClick(event) {
    const card = event.target.closest(".product-card");
    if (!card) return;

    const productId = card.dataset.productId;
    const openedFromArmario = Boolean(card.closest("#ropaCompleta"));
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
   EVENTOS
================================ */
themeToggles.forEach((button) => {
    button.addEventListener("click", toggleTheme);
});

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

ropaCompleta?.addEventListener("mouseover", (event) => {
    const card = event.target.closest("[data-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setFullWardrobeHoverImage(card, true);
});

ropaCompleta?.addEventListener("mouseout", (event) => {
    const card = event.target.closest("[data-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setFullWardrobeHoverImage(card, false);
});

ropaCompleta?.addEventListener("click", handleProductClick);

ropaCompleta?.addEventListener("keydown", (event) => {
    if (!isKeyboardActivation(event)) return;

    const card = event.target.closest("[data-product-id]");
    if (!card) return;

    event.preventDefault();
    const openedFromArmario = Boolean(card.closest("#ropaCompleta"));
    openProduct(card.dataset.productId, openedFromArmario);
});

toggleArmarioButton?.addEventListener("click", openArmarioModal);
cerrarArmarioButton?.addEventListener("click", closeArmarioModal);
armarioBackdrop?.addEventListener("click", closeArmarioModal);
closeModalButton?.addEventListener("click", closeProduct);
backdrop?.addEventListener("click", closeProduct);

wardrobeGrid?.addEventListener("mouseover", (event) => {
    const card = event.target.closest("[data-wardrobe-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setWardrobeHoverImage(card, true);
});

wardrobeGrid?.addEventListener("mouseout", (event) => {
    const card = event.target.closest("[data-wardrobe-product-id]");
    if (!card || card.contains(event.relatedTarget)) return;

    setWardrobeHoverImage(card, false);
});

wardrobeGrid?.addEventListener("click", (event) => {
    const card = event.target.closest("[data-wardrobe-product-id]");
    if (!card) return;

    openProduct(card.dataset.wardrobeProductId);
});

wardrobeGrid?.addEventListener("keydown", (event) => {
    if (!isKeyboardActivation(event)) return;

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
                    } else {
                        stopNewProductsAutoScroll();
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
renderWardrobeProducts();
initializeVisualCards();
updateHeaderState();
updateActiveNav();
startHeroSlider();
startNewProductsAutoScroll();
startWardrobeImageSwap();

if (document.fonts) {
    document.fonts.ready.then(fitAllCardTexts);
} else {
    window.addEventListener("load", fitAllCardTexts);
}