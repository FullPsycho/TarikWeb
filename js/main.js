// Handle navigation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            move: {
                enable: true,
                speed: 2
            }
        }
    });

    // Enhanced navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('href').substring(1);
            switch(page) {
                case 'book':
                    window.location.href = 'pages/book-ride.html';
                    break;
                case 'login':
                    window.location.href = 'pages/login.html';
                    break;
                case 'become-driver':
                    window.location.href = 'pages/driver-signup.html';
                    break;
                default:
                    window.location.href = '#' + page;
            }
        });
    });

    // Handle CTA buttons
    const bookButton = document.querySelector('.btn.primary');
    const driverButton = document.querySelector('.btn.secondary');

    bookButton.addEventListener('click', () => {
        console.log('Book ride clicked');
        // Add booking logic here
    });

    driverButton.addEventListener('click', () => {
        console.log('Become driver clicked');
        // Add driver registration logic here
    });
});
