document.addEventListener('DOMContentLoaded', () => {
    // Background image preloader
    const backgroundImages = [
        '../images/hero-bg.jpg',
        '../images/city-bg.jpg',
        '../images/night-bg.jpg',
        '../images/road-bg.jpg'
    ];

    backgroundImages.forEach(img => {
        new Image().src = img;
    });

    // Parallax effect for travel sections
    window.addEventListener('scroll', () => {
        const parallaxSections = document.querySelectorAll('.parallax-section');
        parallaxSections.forEach(section => {
            const scroll = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const speed = 0.5;
            
            if (scroll > sectionTop - window.innerHeight && scroll < sectionTop + section.offsetHeight) {
                section.style.backgroundPositionY = `${(sectionTop - scroll) * speed}px`;
            }
        });
    });
});
