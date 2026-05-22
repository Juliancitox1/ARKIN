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

const products = {
    1: {
        name: "Heart Cross",
        description: "Un símbolo afilado que nace del vacío. Una pieza limpia, oscura y elegante para quienes imponen presencia sin decir demasiado.",
        price: "$95.000",
        sizes: cloneSizes(),
        colors: createColors("D1", true)
    },
    2: {
        name: "Tribal Cross",
        description: "Trazos curvos y espinas visuales recorren la prenda como una marca nocturna. Diseñada para destacar con carácter y misterio.",
        price: "$95.000",
        sizes: cloneSizes(),
        colors: createColors("D2")
    },
    3: {
        name: "Framing",
        description: "Una composición oscura de energía silenciosa. Su diseño mezcla fuerza, elegancia y una identidad que no busca aprobación.",
        price: "$85.000",
        sizes: cloneSizes(),
        colors: createColors("D3")
    },
    4: {
        name: "Demonic Flash",
        description: "Un diseño de presencia intensa, creado para quienes caminan entre lo minimalista y lo agresivo sin perder sofisticación.",
        price: "$75.000",
        sizes: cloneSizes(),
        colors: createColors("D4")
    },
    5: {
        name: "Chain",
        description: "Una pieza marcada por el contraste y la sombra. Sutil a primera vista, pero con una esencia rebelde imposible de ignorar.",
        price: "$75.000",
        sizes: cloneSizes(),
        colors: createColors("D5")
    },
    6: {
        name: "Abyss Beast",
        available: false,
        description: "Espinas violetas atraviesan la prenda como una herida elegante. Un diseño agresivo, oscuro y dominante nacido desde el abismo.",
        price: "$75.000",
        sizes: cloneSizes(),
        colors: createColors("D6")
    },
    7: {
        name: "Winged Arcane",
        description: "Un sello vertical de apariencia mística y ornamental. Una pieza creada para vestir elegancia oscura con aire ceremonial.",
        price: "$75.000",
        sizes: cloneSizes(),
        colors: createColors("D7")
    }
};
function isProductAvailable(productId) {
    const product = products[productId];
    return product && product.available !== false;
}
const newProductIds = [1, 2, 3, 4, 5, 6, 7];
const wardrobeProductIds = [1, 2, 3, 4];

const siteHeader = document.getElementById("siteHeader");
const navLinks = [...document.querySelectorAll(".nav-link")];
const toggleArmarioButton = document.getElementById("toggleArmario");
const armarioCompleto = document.getElementById("armarioCompleto");
const ropaCompleta = document.getElementById("ropaCompleta");
const cerrarArmarioButton = document.getElementById("cerrarArmario");
const armarioBackdrop = armarioCompleto.querySelector("[data-close-armario]");
const modal = document.getElementById("productModal");
const closeModalButton = document.getElementById("cerrarProducto");
const backdrop = modal.querySelector("[data-close-modal]");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("descripcionProducto");
const modalPrice = document.getElementById("precioProducto");
const mainImage = document.getElementById("imagenPrincipal");
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

document.getElementById("currentYear").textContent = new Date().getFullYear();

let newProductsAutoScrollInterval = null;
let wardrobeImageInterval = null;
let relatedHoverScrollInterval = null;
let currentProductId = null;
let loaderTimeout = null;
let currentColorName = "";
let currentSize = "";
let currentImageIndex = 0;
let productOpenedFromArmario = false;

const heroSlides = [...document.querySelectorAll("[data-hero-slide]")];
const HERO_SLIDE_TIME = 6000;
const NEW_PRODUCTS_AUTOSCROLL_TIME = 8000;
const WARDROBE_IMAGE_TIME = 8000;
const LOADER_OPEN_DELAY = 1100;
const LOADER_HIDE_DELAY = 180;

let currentHeroSlide = 0;
let heroSlideInterval = null;

function showHeroSlide(index) {
    if (!heroSlides.length) return;

    heroSlides[currentHeroSlide].classList.remove("active");

    currentHeroSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides[currentHeroSlide].classList.add("active");
}

function startHeroSlider() {
    if (heroSlides.length <= 1) return;

    clearInterval(heroSlideInterval);

    heroSlideInterval = setInterval(() => {
        showHeroSlide(currentHeroSlide + 1);
    }, HERO_SLIDE_TIME);
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

function createCardMarkup(productId) {
    const product = products[productId];
    const image = getPrimaryImage(product);

    return `
        <article class="product-card reveal" data-product-id="${productId}">
            <div class="product-card-media">
                <img src="${image}" alt="${product.name}" loading="lazy" />
            </div>
            <div class="product-card-info">
                <h3 class="product-card-name">${product.name}</h3>
                <span class="product-card-price">${product.price}</span>
            </div>
        </article>
    `;
}

function getProductPreviewImages(product) {
    return [...new Set(
        Object.values(product.colors)
            .filter((colorData) => colorData.enabled !== false)
            .flatMap((colorData) => colorData.gallery || [])
            .filter(Boolean)
    )];
}

function createWardrobeCardMarkup(productId) {
    const product = products[productId];

    if (!product) return "";

    const images = getProductPreviewImages(product);
    const image = images[0] || getPrimaryImage(product);

    return `
        <article
            class="wardrobe-card reveal"
            data-wardrobe-product-id="${productId}"
            data-wardrobe-image-index="0"
            role="button"
            tabindex="0"
            aria-label="Ver ${product.name}"
        >
            <img class="wardrobe-image" src="${image}" alt="${product.name}" loading="lazy" />

            <div class="wardrobe-card-overlay">
                <span class="wardrobe-card-title">${product.name}</span>
            </div>
        </article>
    `;
}

function renderWardrobeProducts() {
    if (!wardrobeGrid) return;

    wardrobeGrid.innerHTML = wardrobeProductIds
        .filter(isProductAvailable)
        .map(createWardrobeCardMarkup)
        .join("");

    activateReveal();
}

function rotateWardrobeImages() {
    if (!wardrobeGrid) return;

    const wardrobeCards = [...wardrobeGrid.querySelectorAll("[data-wardrobe-product-id]")];

    wardrobeCards.forEach((card) => {
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
            card.dataset.wardrobeImageIndex = String(nextIndex);
            card.classList.remove("is-changing");
        }, 220);
    });
}

function startWardrobeImageSwap() {
    if (!wardrobeGrid) return;

    stopWardrobeImageSwap();

    wardrobeImageInterval = setInterval(() => {
        rotateWardrobeImages();
    }, WARDROBE_IMAGE_TIME);
}

function stopWardrobeImageSwap() {
    clearInterval(wardrobeImageInterval);
    wardrobeImageInterval = null;
}

function createNewProductMarkup(productId) {
    const product = products[productId];

    if (!product) return "";

    const image = getPrimaryImage(product);

    return `
        <article class="new-product-card reveal" data-new-product-id="${productId}">
            <div class="new-product-media">
                <img src="${image}" alt="${product.name}" loading="lazy" />
            </div>

            <div class="new-product-content">
                <span class="new-product-label">Lo Nuevo</span>
                <h3 class="new-product-name">${product.name}</h3>
                <p class="new-product-description">${product.description}</p>

                <div class="new-product-footer">
                    <span class="new-product-price">${product.price}</span>
                    <span class="new-product-action">Ver detalle</span>
                </div>
            </div>
        </article>
    `;
}

function getProductPreviewImages(product) {
    return [...new Set(
        Object.values(product.colors)
            .filter((colorData) => colorData.enabled !== false)
            .flatMap((colorData) => colorData.gallery || [])
            .filter(Boolean)
    )];
}

function createWardrobeCardMarkup(productId) {
    const product = products[productId];

    if (!product) return "";

    const images = getProductPreviewImages(product);
    const image = images[0] || getPrimaryImage(product);

    return `
        <article
            class="wardrobe-card reveal"
            data-wardrobe-product-id="${productId}"
            data-wardrobe-image-index="0"
            role="button"
            tabindex="0"
            aria-label="Ver ${product.name}"
        >
            <img class="wardrobe-image" src="${image}" alt="${product.name}" loading="lazy" />

            <div class="wardrobe-card-overlay">
                <span class="wardrobe-card-title">${product.name}</span>
            </div>
        </article>
    `;
}

function renderWardrobeProducts() {
    if (!wardrobeGrid) return;

    wardrobeGrid.innerHTML = wardrobeProductIds
        .filter(isProductAvailable)
        .map(createWardrobeCardMarkup)
        .join("");

    activateReveal();
}

function rotateWardrobeImages() {
    if (!wardrobeGrid) return;

    const wardrobeCards = [...wardrobeGrid.querySelectorAll("[data-wardrobe-product-id]")];

    wardrobeCards.forEach((card) => {
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
            card.dataset.wardrobeImageIndex = String(nextIndex);
            card.classList.remove("is-changing");
        }, 220);
    });
}

function startWardrobeImageSwap() {
    if (!wardrobeGrid) return;

    stopWardrobeImageSwap();

    wardrobeImageInterval = setInterval(() => {
        rotateWardrobeImages();
    }, WARDROBE_IMAGE_TIME);
}

function stopWardrobeImageSwap() {
    clearInterval(wardrobeImageInterval);
    wardrobeImageInterval = null;
}

function createRelatedCardMarkup(productId) {
    const product = products[productId];
    const image = getPrimaryImage(product);

    return `
        <article class="related-card" data-related-product-id="${productId}">
            <div class="related-card-media">
                <img src="${image}" alt="${product.name}" loading="lazy" />
            </div>

            <div class="related-card-info">
                <span class="related-card-name">${product.name}</span>
                <span class="related-card-price">${product.price}</span>
            </div>
        </article>
    `;
}

function renderProducts() {
    const cards = Object.keys(products)
        .filter(isProductAvailable)
        .map(createCardMarkup)
        .join("");

    ropaCompleta.innerHTML = cards;

    activateReveal();
}

function renderNewProducts() {
    if (!newProductsTrack) return;

    const newCards = newProductIds
        .filter(isProductAvailable)
        .map(createNewProductMarkup)
        .join("");

    newProductsTrack.innerHTML = newCards;
    newProductsTrack.scrollTo({ left: 0, behavior: "auto" });
    activateReveal();
}

function getNewProductsScrollAmount() {
    const firstCard = newProductsTrack.querySelector(".new-product-card");

    if (!firstCard) return newProductsTrack.clientWidth;

    const trackStyles = window.getComputedStyle(newProductsTrack);
    const gap = parseFloat(trackStyles.gap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;

    return cardWidth + gap;
}

function moveNewProducts(direction) {
    if (!newProductsTrack) return;

    const maxScroll = newProductsTrack.scrollWidth - newProductsTrack.clientWidth;
    const scrollAmount = getNewProductsScrollAmount();

    if (direction > 0 && newProductsTrack.scrollLeft >= maxScroll - 8) {
        newProductsTrack.scrollTo({ left: 0, behavior: "smooth" });
        return;
    }

    if (direction < 0 && newProductsTrack.scrollLeft <= 8) {
        newProductsTrack.scrollTo({ left: maxScroll, behavior: "smooth" });
        return;
    }

    newProductsTrack.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
    });
}

function startNewProductsAutoScroll() {
    if (!newProductsTrack || newProductIds.length <= 2) return;

    stopNewProductsAutoScroll();

    newProductsAutoScrollInterval = setInterval(() => {
        moveNewProducts(1);
    }, NEW_PRODUCTS_AUTOSCROLL_TIME);
}

function stopNewProductsAutoScroll() {
    clearInterval(newProductsAutoScrollInterval);
    newProductsAutoScrollInterval = null;
}

function renderRelatedProducts() {
    if (!relatedProductsTrack || !currentProductId) return;

    const relatedCards = Object.keys(products)
        .filter((productId) => productId !== String(currentProductId) && isProductAvailable(productId))
        .map(createRelatedCardMarkup)
        .join("");

    relatedProductsTrack.innerHTML = relatedCards;
    relatedProductsTrack.scrollTo({ left: 0, behavior: "auto" });
}

function getRelatedScrollAmount() {
    const firstCard = relatedProductsTrack.querySelector(".related-card");
    if (!firstCard) return relatedProductsTrack.clientWidth;

    const trackStyles = window.getComputedStyle(relatedProductsTrack);
    const gap = parseFloat(trackStyles.gap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;

    return cardWidth + gap;
}

function moveRelatedProducts(direction) {
    if (!relatedProductsTrack) return;

    const scrollAmount = getRelatedScrollAmount();

    relatedProductsTrack.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth"
    });
}

function startRelatedHoverScroll(direction) {
    stopRelatedHoverScroll();

    relatedHoverScrollInterval = setInterval(() => {
        if (!relatedProductsTrack) return;

        relatedProductsTrack.scrollBy({
            left: direction * 14,
            behavior: "auto"
        });
    }, 16);
}

function stopRelatedHoverScroll() {
    clearInterval(relatedHoverScrollInterval);
    relatedHoverScrollInterval = null;
}

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

function openArmarioModal() {
    showPageLoader();

    setTimeout(() => {
        armarioCompleto.classList.add("is-open");
        armarioCompleto.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        const panel = armarioCompleto.querySelector(".armario-panel");
        if (panel) {
            panel.scrollTop = 0;
        }

        hidePageLoader(LOADER_HIDE_DELAY);
    }, LOADER_OPEN_DELAY);
}

function closeArmarioModal() {
    showPageLoader();

    setTimeout(() => {
        armarioCompleto.classList.remove("is-open");
        armarioCompleto.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        hidePageLoader(LOADER_HIDE_DELAY);
    }, LOADER_OPEN_DELAY);
}

function getSafeGallery(product, colorName) {
    const gallery = product.colors[colorName]?.gallery || [];
    if (gallery.length > 0) return gallery;
    return [getPrimaryImage(product)];
}

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
    
    const modalImages = getModalImages(product);
    if (!modalImages.length) return;

    let imageIndex = modalImages.findIndex((item) => item.colorName === currentColorName);

    if (imageIndex === -1) {
        imageIndex = 0;
        currentColorName = modalImages[0].colorName;
    }

    currentImageIndex = imageIndex;

    const activeImage = modalImages[currentImageIndex];

    mainImage.src = activeImage.image;
    mainImage.alt = `${product.name} ${activeImage.colorName}`;

    thumbnailsContainer.innerHTML = modalImages
        .map(
            (item, index) => `
                <button
                    class="thumb-button ${index === currentImageIndex ? "active" : ""}"
                    data-image-index="${index}"
                    data-color="${item.colorName}"
                    aria-label="${item.colorName}"
                    title="${item.colorName}"
                    type="button"
                >
                    <img src="${item.image}" alt="${item.colorName}" loading="lazy" />
                </button>
            `
        )
        .join("");
}

function renderColorOptions(product) {
    colorsContainer.innerHTML = Object.entries(product.colors)
        .map(([colorName, colorData]) => {
            const disabledClass = colorData.enabled === false ? "is-disabled" : "";
            const activeClass = colorName === currentColorName ? "active" : "";

            return `
                <button
                    class="color-button ${activeClass} ${disabledClass}"
                    data-color="${colorName}"
                    title="${colorName}"
                    aria-label="${colorName}"
                    style="background: ${colorData.swatch};"
                ></button>
            `;
        })
        .join("");
}

function renderSizeOptions(product) {
    sizesContainer.innerHTML = product.sizes
        .map((size) => {
            const disabledClass = size.enabled === false ? "is-disabled" : "";
            const activeClass = size.label === currentSize ? "active" : "";

            return `
                <button
                    class="size-button ${activeClass} ${disabledClass}"
                    data-size="${size.label}"
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
    if (!product) return;

    const message = encodeURIComponent(
        `Hola ARKIN, estoy interesad@ en ${product.name} | ${product.price} | Color: ${currentColorName}${currentSize ? ` | Talla: ${currentSize}` : ""}`
    );

    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${message}`;
}

function renderModal() {
    const product = products[currentProductId];
    if (!product) return;

    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    modalPrice.textContent = product.price;

    renderColorOptions(product);
    renderSizeOptions(product);
    renderModalGallery(product);
    updateWhatsAppLink();
    renderRelatedProducts();
}

function openProduct(productId, openedFromArmario = false) {
    const product = products[productId];

    if (!product || !isProductAvailable(productId)) {
        hidePageLoader();
        return;
    }

    showPageLoader();

    setTimeout(() => {
        productOpenedFromArmario = openedFromArmario;

        if (armarioCompleto.classList.contains("is-open") && !openedFromArmario) {
            closeArmarioModal();
        }

        currentProductId = productId;
        currentColorName = getFirstEnabledColor(product);
        currentSize = product.sizes.find((size) => size.enabled !== false)?.label || "";
        currentImageIndex = 0;

        renderModal();

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        const panel = modal.querySelector(".product-panel");
        if (panel) {
            panel.scrollTop = 0;
        }

        hidePageLoader(LOADER_HIDE_DELAY);
    }, LOADER_OPEN_DELAY);
}

function closeProduct() {
    showPageLoader();
    stopRelatedHoverScroll();

    setTimeout(() => {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        if (productOpenedFromArmario && armarioCompleto.classList.contains("is-open")) {
            document.body.classList.add("modal-open");
        } else {
            document.body.classList.remove("modal-open");
        }

        productOpenedFromArmario = false;

        hidePageLoader(LOADER_HIDE_DELAY);
    }, LOADER_OPEN_DELAY);
}

function handleProductClick(event) {
    const card = event.target.closest(".product-card");
    if (!card) return;

    const productId = card.dataset.productId;
    const openedFromArmario = Boolean(card.closest("#ropaCompleta"));

    openProduct(productId, openedFromArmario);
}

function updateHeaderState() {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 10);
}

function updateActiveNav() {
    const sections = [...document.querySelectorAll("section[id]")];
    const scrollPosition = window.scrollY + siteHeader.offsetHeight + 120;

    let currentSectionId = "inicio";

    sections.forEach((section) => {
        if (
            scrollPosition >= section.offsetTop &&
            scrollPosition < section.offsetTop + section.offsetHeight
        ) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${currentSectionId}`;
        link.classList.toggle("active", isActive);
    });
}

function activateReveal() {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealElements.forEach((element) => observer.observe(element));
}

newNextButton.addEventListener("click", () => {
    moveNewProducts(1);
    startNewProductsAutoScroll();
});

newPrevButton.addEventListener("click", () => {
    moveNewProducts(-1);
    startNewProductsAutoScroll();
});

newProductsTrack.addEventListener("mouseenter", stopNewProductsAutoScroll);
newProductsTrack.addEventListener("mouseleave", startNewProductsAutoScroll);

newProductsTrack.addEventListener("click", (event) => {
    const card = event.target.closest("[data-new-product-id]");
    if (!card) return;

    openProduct(card.dataset.newProductId);
});
relatedNextButton.addEventListener("click", () => moveRelatedProducts(1));
relatedPrevButton.addEventListener("click", () => moveRelatedProducts(-1));

relatedNextButton.addEventListener("mouseenter", () => startRelatedHoverScroll(1));
relatedPrevButton.addEventListener("mouseenter", () => startRelatedHoverScroll(-1));

relatedNextButton.addEventListener("mouseleave", stopRelatedHoverScroll);
relatedPrevButton.addEventListener("mouseleave", stopRelatedHoverScroll);

relatedNextButton.addEventListener("blur", stopRelatedHoverScroll);
relatedPrevButton.addEventListener("blur", stopRelatedHoverScroll);

scrollToRelatedButton.addEventListener("click", () => {
    const relatedSection = document.querySelector(".related-products");

    if (!relatedSection) return;

    relatedSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

ropaCompleta.addEventListener("click", handleProductClick);

wardrobeGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-wardrobe-product-id]");
    if (!card) return;

    openProduct(card.dataset.wardrobeProductId);
});

wardrobeGrid.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;

    const card = event.target.closest("[data-wardrobe-product-id]");
    if (!card) return;

    event.preventDefault();
    openProduct(card.dataset.wardrobeProductId);
});

relatedProductsTrack.addEventListener("click", (event) => {
    const card = event.target.closest("[data-related-product-id]");
    if (!card) return;

    openProduct(card.dataset.relatedProductId, productOpenedFromArmario);
});

toggleArmarioButton.addEventListener("click", openArmarioModal);
cerrarArmarioButton.addEventListener("click", closeArmarioModal);
armarioBackdrop.addEventListener("click", closeArmarioModal);
closeModalButton.addEventListener("click", closeProduct);
backdrop.addEventListener("click", closeProduct);

document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (modal.classList.contains("is-open")) {
        closeProduct();
        return;
    }

    if (armarioCompleto.classList.contains("is-open")) {
        closeArmarioModal();
    }
});

colorsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-color]");
    if (!button || !currentProductId) return;

    const selectedColor = button.dataset.color;
    const product = products[currentProductId];
    const colorData = product.colors[selectedColor];

    if (!colorData || colorData.enabled === false) return;

    currentColorName = selectedColor;


    renderModal();
});

sizesContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-size]");
    if (!button || !currentProductId) return;

    const selectedSize = button.dataset.size;
    const product = products[currentProductId];
    const sizeData = product.sizes.find((size) => size.label === selectedSize);

    if (!sizeData || sizeData.enabled === false) return;

    currentSize = selectedSize;
    renderModal();
});

thumbnailsContainer.addEventListener("click", (event) => {
    const button = event.target.closest("[data-image-index]");
    if (!button || !currentProductId) return;


    const product = products[currentProductId];
    const modalImages = getModalImages(product);

    currentImageIndex = Number(button.dataset.imageIndex);
    currentColorName = modalImages[currentImageIndex].colorName;

    renderModal();
});

prevImageButton.addEventListener("click", () => {
    if (!currentProductId) return;

    const product = products[currentProductId];
    const modalImages = getModalImages(product);
    if (!modalImages.length) return;

    currentImageIndex = (currentImageIndex - 1 + modalImages.length) % modalImages.length;
    currentColorName = modalImages[currentImageIndex].colorName;

    renderModal();
});

nextImageButton.addEventListener("click", () => {
    if (!currentProductId) return;

    const product = products[currentProductId];
    const modalImages = getModalImages(product);
    if (!modalImages.length) return;

    currentImageIndex = (currentImageIndex + 1) % modalImages.length;
    currentColorName = modalImages[currentImageIndex].colorName;

    renderModal();
});

window.addEventListener("scroll", () => {
    updateHeaderState();
    updateActiveNav();
});

window.addEventListener("resize", updateActiveNav);

renderProducts();
renderNewProducts();
renderWardrobeProducts();
updateHeaderState();
updateActiveNav();
startHeroSlider();
startNewProductsAutoScroll();
startWardrobeImageSwap();

document.addEventListener("mousemove", (event) => {
    const nearRightEdge = event.clientX >= window.innerWidth - 28;
    document.documentElement.classList.toggle("show-scrollbar", nearRightEdge);
});
