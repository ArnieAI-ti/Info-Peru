// Configuración inicial
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initializeApp();
});

// Función principal de inicialización
function initializeApp() {
    // Cargar schema markup
    if (window.insertSchemaMarkup) {
        window.insertSchemaMarkup();
    }

    // Inicializar componentes
    initDateDisplay();
    initMobileNav();
    initScrollToTop();
    initActiveNavLinks();
    initBackToTop();
    initThemeToggle();
    initLazyLoading();
    initIntersectionObserver();
    initScrollNav();
    loadHeader();
    loadFooter();
    loadMenu();
}

// Mostrar fecha actual
function initDateDisplay() {
    const dateElements = document.querySelectorAll('.current-date');
    if (dateElements.length > 0) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'America/Lima'
        };
        const currentDate = new Date().toLocaleDateString('es-PE', options);
        dateElements.forEach(element => {
            element.textContent = currentDate;
        });
    }
}

// Navegación móvil
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;

    if (!navToggle || !navMenu || !menuOverlay) return;

    function toggleMenu() {
        const isOpen = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        navToggle.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Añadir/remover aria-expanded
        navToggle.setAttribute('aria-expanded', !isOpen);
        
        // Manejar el foco
        if (!isOpen) {
            // Al abrir el menú, enfocar el primer enlace
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) firstLink.focus();
        } else {
            // Al cerrar el menú, devolver el foco al botón
            navToggle.focus();
        }
    }

    // Event listeners
    navToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer clic en un enlace
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Manejar el foco dentro del menú móvil
    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = navMenu.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Scroll suave
function initScrollToTop() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enlaces de navegación activos
function initActiveNavLinks() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath) {
            link.classList.add('active');
        }
    });
}

// Botón volver arriba
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', utils.throttle(() => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }, 100));

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Toggle de tema
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (themeToggle) {
        // Verificar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.body.classList.toggle('dark-theme', savedTheme === 'dark');
            themeToggle.setAttribute('aria-pressed', savedTheme === 'dark');
        } else if (prefersDarkScheme.matches) {
            document.body.classList.add('dark-theme');
            themeToggle.setAttribute('aria-pressed', 'true');
        }

        // Toggle de tema
        themeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            themeToggle.setAttribute('aria-pressed', isDark);
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
}

// Carga perezosa de imágenes
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores que no soportan IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
}

// Observador de intersección para animaciones
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(element => observer.observe(element));
    }
}

// Manejar el efecto de scroll en la navegación
function initScrollNav() {
    const nav = document.querySelector('.nav-container');
    if (!nav) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Añadir/remover clase scrolled
        if (currentScroll > scrollThreshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Ocultar/mostrar navegación al hacer scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Utilidades
const utils = {
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        }
    }
};

// Exportar utilidades
window.utils = utils;

// Función para manejar mensajes de error
function showError(message) {
    console.error(message);
    // Aquí se puede implementar una UI para mostrar errores
}

// Función para manejar mensajes de éxito
function showSuccess(message) {
    console.log(message);
    // Aquí se puede implementar una UI para mostrar mensajes de éxito
}

// Función para validar formularios
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Función para cargar el footer
async function loadFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    try {
        // Determinar qué footer cargar basado en la ubicación actual
        const isIndexPage = window.location.pathname.endsWith('index.html') || 
                          window.location.pathname.endsWith('/');
        const footerPath = isIndexPage ? 
            './components/footer-index.html' : 
            '../components/footer.html';

        const response = await fetch(footerPath);
        if (!response.ok) throw new Error('Error al cargar el footer');
        
        const footerContent = await response.text();
        footerContainer.innerHTML = footerContent;
    } catch (error) {
        console.error('Error al cargar el footer:', error);
        footerContainer.innerHTML = '<p>Error al cargar el pie de página</p>';
    }
}

// Función para cargar el menú de navegación
async function loadMenu() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    try {
        const menuPath = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') ?
            './components/menu.html' :
            '../components/menu.html';

        const response = await fetch(menuPath);
        if (!response.ok) throw new Error('Error al cargar el menú');
        
        const menuContent = await response.text();
        menuContainer.innerHTML = menuContent;
    } catch (error) {
        console.error('Error al cargar el menú:', error);
        menuContainer.innerHTML = '<p>Error al cargar el menú de navegación</p>';
    }
}

// Inicializar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollNav();
    loadHeader();
    loadFooter();
    initThemeToggle();
    initScrollToTop();
    initSearch();
    initFormValidation();
}); 