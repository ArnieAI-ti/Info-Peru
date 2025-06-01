// Schema.org markup para Info Perú
const schemaConfig = {
    website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Info Perú",
        "url": "https://arnieai-ti.github.io/Info-Peru/",
        "description": "Tu fuente confiable de información sobre servicios, trámites y noticias en Perú",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://arnieai-ti.github.io/Info-Peru/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    },
    organization: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Info Perú",
        "url": "https://arnieai-ti.github.io/Info-Peru/",
        "logo": "https://arnieai-ti.github.io/Info-Peru/assets/img/logo.png",
        "sameAs": [
            "https://facebook.com/infoperu",
            "https://twitter.com/infoperu",
            "https://instagram.com/infoperu",
            "https://linkedin.com/company/infoperu"
        ]
    }
};

// Función para insertar el schema markup
function insertSchemaMarkup() {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify(schemaConfig.website);
    document.head.appendChild(schemaScript);

    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(schemaConfig.organization);
    document.head.appendChild(orgScript);
}

// Exportar la función
window.insertSchemaMarkup = insertSchemaMarkup; 