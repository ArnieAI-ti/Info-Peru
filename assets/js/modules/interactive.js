// Módulo de funcionalidades interactivas
const Interactive = {
    // Estado del módulo
    state: {
        isMenuOpen: false,
        isScrolling: false,
        lastScrollTop: 0,
        scrollDirection: 'down'
    },

    // Inicialización
    init() {
        this.initEventListeners();
        this.initIntersectionObserver();
        this.initScrollSpy();
    },

    // Event Listeners
    initEventListeners() {
        // Eventos de scroll
        window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 100));
        
        // Eventos de resize
        window.addEventListener('resize', utils.debounce(this.handleResize.bind(this), 250));
        
        // Eventos de click
        document.addEventListener('click', this.handleClick.bind(this));
        
        // Eventos de teclado
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    },

    // Manejadores de eventos
    handleScroll() {
        this.state.isScrolling = true;
        this.state.lastScrollTop = window.pageYOffset;
        
        // Determinar dirección del scroll
        this.state.scrollDirection = window.pageYOffset > this.state.lastScrollTop ? 'down' : 'up';
        
        // Actualizar clases del header
        this.updateHeaderClasses();
        
        // Actualizar botón "volver arriba"
        this.updateBackToTopButton();
        
        // Actualizar scroll spy
        this.updateScrollSpy();
        
        requestAnimationFrame(() => {
            this.state.isScrolling = false;
        });
    },

    handleResize() {
        // Actualizar dimensiones y posiciones
        this.updateLayout();
    },

    handleClick(event) {
        // Delegación de eventos para elementos interactivos
        const target = event.target;
        
        // Menú móvil
        if (target.closest('.nav-toggle')) {
            this.toggleMobileMenu();
        }
        
        // Botón volver arriba
        if (target.closest('.back-to-top')) {
            this.scrollToTop();
        }
        
        // Enlaces de anclaje
        if (target.closest('a[href^="#"]')) {
            this.handleAnchorClick(event);
        }
    },

    handleKeydown(event) {
        // Navegación por teclado
        if (event.key === 'Escape') {
            this.closeAllModals();
        }
    },

    // Funcionalidades de scroll
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    // Funcionalidades de menú
    toggleMobileMenu() {
        this.state.isMenuOpen = !this.state.isMenuOpen;
        document.body.classList.toggle('menu-open', this.state.isMenuOpen);
        document.querySelector('.menu-responsive')?.classList.toggle('active', this.state.isMenuOpen);
        document.querySelector('.menu-overlay')?.classList.toggle('active', this.state.isMenuOpen);
    },

    // Funcionalidades de observación
    initIntersectionObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        this.handleIntersection(entry);
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            }
        );

        // Observar elementos con la clase 'observe'
        document.querySelectorAll('.observe').forEach(element => {
            this.observer.observe(element);
        });
    },

    handleIntersection(entry) {
        // Personalizar comportamiento según el tipo de elemento
        const element = entry.target;
        
        if (element.classList.contains('animate-on-scroll')) {
            this.animateElement(element);
        }
        
        if (element.classList.contains('lazy-load')) {
            this.loadLazyContent(element);
        }
    },

    // Funcionalidades de animación
    animateElement(element) {
        const animation = element.dataset.animation || 'fade-in';
        element.classList.add(`animate-${animation}`);
    },

    // Funcionalidades de carga perezosa
    loadLazyContent(element) {
        if (element.dataset.src) {
            element.src = element.dataset.src;
        }
        if (element.dataset.background) {
            element.style.backgroundImage = `url(${element.dataset.background})`;
        }
    },

    // Funcionalidades de scroll spy
    initScrollSpy() {
        this.spyElements = document.querySelectorAll('[data-spy]');
        this.updateScrollSpy();
    },

    updateScrollSpy() {
        this.spyElements.forEach(element => {
            const targetId = element.dataset.spy;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                const isInView = rect.top <= 0 && rect.bottom >= 0;
                
                if (isInView) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            }
        });
    },

    // Utilidades
    updateHeaderClasses() {
        const header = document.querySelector('header');
        if (header) {
            if (this.state.scrollDirection === 'down' && window.pageYOffset > 100) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
        }
    },

    updateBackToTopButton() {
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }
    },

    updateLayout() {
        // Actualizar dimensiones y posiciones de elementos
        this.updateHeaderHeight();
        this.updateStickyElements();
    },

    updateHeaderHeight() {
        const header = document.querySelector('header');
        if (header) {
            document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
        }
    },

    updateStickyElements() {
        document.querySelectorAll('.sticky').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 0) {
                element.classList.add('is-sticky');
            } else {
                element.classList.remove('is-sticky');
            }
        });
    },

    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.classList.remove('modal-open');
    }
};

// Exportar módulo
window.Interactive = Interactive; 