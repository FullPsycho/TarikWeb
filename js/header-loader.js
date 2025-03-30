document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const isInPagesDirectory = window.location.pathname.includes('/pages/');
    const headerPath = isInPagesDirectory ? '../components/header.html' : './components/header.html';

    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            headerPlaceholder.innerHTML = data;
            
            // Fix paths based on current location
            if (isInPagesDirectory) {
                const links = headerPlaceholder.getElementsByTagName('a');
                for (let link of links) {
                    if (link.getAttribute('href').startsWith('/')) {
                        link.href = '..' + link.getAttribute('href');
                    }
                }
            }
        })
        .catch(error => console.error('Error loading header:', error));
});
