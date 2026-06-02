// ========== SLIDESHOW FUNCTIONALITY - OPTIMIZED ==========
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Only run slideshow if there are slides
if (totalSlides > 0) {
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides[currentSlide].classList.add('active');
    }
    
    let slideshowInterval = setInterval(nextSlide, 5000);
    
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearInterval(slideshowInterval);
        });
        
        slideshowContainer.addEventListener('mouseleave', () => {
            slideshowInterval = setInterval(nextSlide, 5000);
        });
    }
}

// ========== LOGO HOME LINK FUNCTIONALITY ==========
const logoElement = document.getElementById('logoHomeLink');
if (logoElement) {
    logoElement.addEventListener('click', (e) => {
        e.preventDefault();
        const heroSection = document.getElementById('home');
        if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// ========== FALLBACK FOR LOGO IMAGE ==========
const logoImg = document.querySelector('.logo-img');
const fallbackText = document.querySelector('.logo-text-fallback');

if (logoImg && logoImg.complete && logoImg.naturalWidth === 0) {
    logoImg.style.display = 'none';
    if (fallbackText) fallbackText.style.display = 'block';
} else if (logoImg) {
    logoImg.addEventListener('error', function() {
        this.style.display = 'none';
        if (fallbackText) fallbackText.style.display = 'block';
    });
}

// ========== FALLBACK FOR SERVICE ICONS ==========
const serviceIcons = document.querySelectorAll('.service-icon-img');
serviceIcons.forEach(icon => {
    icon.addEventListener('error', function() {
        this.style.display = 'none';
        const fallbackSpan = this.nextElementSibling;
        if (fallbackSpan && fallbackSpan.classList.contains('service-icon-fallback')) {
            fallbackSpan.style.display = 'block';
        }
    });
    
    if (icon.complete && icon.naturalWidth === 0) {
        icon.style.display = 'none';
        const fallbackSpan = icon.nextElementSibling;
        if (fallbackSpan && fallbackSpan.classList.contains('service-icon-fallback')) {
            fallbackSpan.style.display = 'block';
        }
    }
});

// ========== SMOOTH SCROLLING FOR ALL NAV LINKS ==========
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ========== PERFORMANCE: LAZY LOAD OFFSCREEN IMAGES ==========
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('.service-icon-img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.loading = 'eager';
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== FIX FOR MOBILE TOUCH SCROLL PERFORMANCE ==========
if ('ontouchstart' in window) {
    document.body.style.webkitOverflowScrolling = 'touch';
}

// ========== PRELOAD NEXT SLIDE IMAGES ==========
function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

if (slides.length > 1) {
    setTimeout(() => {
        for (let i = 1; i <= Math.min(2, totalSlides - 1); i++) {
            const nextSlide = slides[i];
            if (nextSlide) {
                const bgImage = window.getComputedStyle(nextSlide).backgroundImage;
                const url = bgImage.slice(5, -2);
                if (url && url !== 'none') {
                    preloadImage(url);
                }
            }
        }
    }, 1000);
}

console.log('Neugart GmbH Website - Fixed Version Loaded');
