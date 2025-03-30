document.addEventListener('DOMContentLoaded', () => {
    // Wait for a brief moment to ensure main content is visible
    setTimeout(() => {
        const header = document.querySelector('.site-header');
        if (header) {
            header.style.opacity = '1';
            document.body.style.paddingTop = header.offsetHeight + 'px';
        }
    }, 50);

    // Add error handling for missing elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!header || !hamburger || !navLinks) {
        console.error('Required elements not found');
        return;
    }

    // Show main content after header loads
    document.querySelector('main')?.style.display = 'block';
    document.body.classList.add('loaded');

    const links = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Handle navigation links
    links.forEach(link => {
        // Add active class to current page link
        if (link.href === window.location.href) {
            link.classList.add('active');
        }

        // Handle click events
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            links.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
            
            // Close mobile menu after clicking
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Add active state for current page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href').includes(currentPath)) {
            link.classList.add('active');
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});
