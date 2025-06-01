// Función para obtener la ruta base del sitio
function getBasePath() {
    const path = window.location.pathname;
    const isInPages = path.includes('/pages/');
    return isInPages ? '../' : './';
}

// Función para cargar componentes
async function loadComponent(containerId, componentPath) {
    try {
        const basePath = getBasePath();
        const fullPath = `${basePath}${componentPath}`;
        const response = await fetch(fullPath);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.text();
        const container = document.getElementById(containerId);
        
        if (container) {
            container.innerHTML = data;
            
            // Ejecutar scripts dentro del componente
            const scripts = container.getElementsByTagName('script');
            for (let script of scripts) {
                const newScript = document.createElement('script');
                newScript.textContent = script.textContent;
                script.parentNode.replaceChild(newScript, script);
            }
        } else {
            console.error(`Container ${containerId} not found`);
        }
    } catch (error) {
        console.error(`Error cargando ${componentPath}:`, error);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    Error al cargar el componente. Por favor, recarga la página.
                </div>
            `;
        }
    }
}

// Función para cargar todos los componentes
async function loadAllComponents() {
    try {
        // Cargar header
        await loadComponent('header-container', 'components/header.html');
        
        // Cargar menú
        await loadComponent('menu-container', 'components/menu.html');
        
        // Cargar footer
        await loadComponent('footer-container', 'components/footer.html');
    } catch (error) {
        console.error('Error cargando componentes:', error);
    }
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loadAllComponents); 