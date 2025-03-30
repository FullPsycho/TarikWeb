document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const isInPagesDirectory = window.location.pathname.includes('/pages/');
    const basePath = isInPagesDirectory ? '..' : '.';
    
    fetch(`${basePath}/components/header.html`)
        .then(response => response.text())
        .then(data => {
            headerPlaceholder.innerHTML = data;
            
            // Fix navigation links
            const links = headerPlaceholder.getElementsByTagName('a');
            for (let link of links) {
                let href = link.getAttribute('href');
                if (isInPagesDirectory) {
                    // If in pages directory, go up one level
                    href = href.replace('/TarikWeb/', '../');
                } else {
                    // If in root, use relative paths
                    href = href.replace('/TarikWeb/', './');
                }
                link.setAttribute('href', href);
            }

            // Load header.js after HTML is inserted
            const script = document.createElement('script');
            script.src = `${basePath}/js/header.js`;
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error loading header:', error));
});
