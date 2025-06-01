// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar todas las funcionalidades
    initNavigation();
    initScrollToTop();
});

// Función para manejar la navegación
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Si el enlace es interno (comienza con #)
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Función para el botón de "volver arriba"
function initScrollToTop() {
    // Crear el botón
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-top';
    scrollButton.style.display = 'none';
    document.body.appendChild(scrollButton);

    // Mostrar/ocultar el botón según el scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    // Función para volver arriba
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

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