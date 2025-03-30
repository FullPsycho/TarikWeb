document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const isInPagesDirectory = window.location.pathname.includes('/pages/');
    const basePath = isInPagesDirectory ? '..' : '.';
    
    fetch(`${basePath}/components/header.html`)
        .then(response => response.text())
        .then(data => {
            headerPlaceholder.innerHTML = data;
            
            // Fix navigation links based on current page location
            const links = headerPlaceholder.getElementsByTagName('a');
            for (let link of links) {
                let href = link.getAttribute('href');
                // Remove any /TarikWeb/ prefix if it exists
                href = href.replace('/TarikWeb/', '');
                
                if (isInPagesDirectory) {
                    // If in pages directory, adjust paths to go up one level
                    if (!href.startsWith('../')) {
                        href = '../' + href;
                    }
                }
                link.setAttribute('href', href);
            }

            // Initialize mobile menu after links are fixed
            const script = document.createElement('script');
            script.src = `${basePath}/js/header.js`;
            document.body.appendChild(script);
        })
        .catch(error => console.error('Error loading header:', error));
});
