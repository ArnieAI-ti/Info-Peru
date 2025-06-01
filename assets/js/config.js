// Configuración de scripts
const scriptConfig = {
    // Cargar scripts de forma asíncrona
    loadScript: function(src, async = true, defer = true) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = async;
            script.defer = defer;
            
            script.onload = resolve;
            script.onerror = reject;
            
            document.body.appendChild(script);
        });
    },

    // Cargar múltiples scripts en orden
    loadScripts: async function(scripts) {
        for (const src of scripts) {
            try {
                await this.loadScript(src);
            } catch (error) {
                console.error(`Error al cargar el script ${src}:`, error);
            }
        }
    }
};

// Exportar configuración
window.scriptConfig = scriptConfig; 