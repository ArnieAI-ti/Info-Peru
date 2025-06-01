// Configuración de scripts
const scriptConfig = {
    // Función para cargar un script
    loadScript(src, async = true, defer = true) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = async;
            script.defer = defer;
            
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Error al cargar el script: ${src}`));
            
            document.body.appendChild(script);
        });
    },

    // Función para cargar múltiples scripts en orden
    async loadScripts(scripts) {
        for (const src of scripts) {
            try {
                await this.loadScript(src);
            } catch (error) {
                console.error(error);
            }
        }
    }
};

// Exportar la configuración
window.scriptConfig = scriptConfig; 