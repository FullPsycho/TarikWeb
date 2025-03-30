document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star-rating i');
    const form = document.getElementById('feedbackForm');
    let currentRating = 0;

    // Handle star rating
    stars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const rating = star.getAttribute('data-rating');
            highlightStars(rating);
        });

        star.addEventListener('click', () => {
            currentRating = star.getAttribute('data-rating');
            highlightStars(currentRating);
            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= currentRating) {
                    s.classList.add('active');
                }
            });
        });
    });

    // Reset stars when mouse leaves rating section
    document.querySelector('.star-rating').addEventListener('mouseleave', () => {
        highlightStars(currentRating);
    });

    function highlightStars(rating) {
        stars.forEach(star => {
            const starRating = star.getAttribute('data-rating');
            if (starRating <= rating) {
                star.style.color = '#ffd700';
            } else {
                star.style.color = '#ddd';
            }
        });
    }

    // Add feedback type switching
    const switchButtons = document.querySelectorAll('.feedback-switch');
    const feedbackFields = document.querySelectorAll('.feedback-fields');

    switchButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            switchButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show corresponding fields
            const type = button.getAttribute('data-type');
            feedbackFields.forEach(field => {
                field.classList.remove('active');
                if (field.id === `${type}-fields`) {
                    field.classList.add('active');
                }
            });
        });
    });

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (currentRating === 0) {
            alert('Please select a rating');
            return;
        }

        const activeType = document.querySelector('.feedback-switch.active').getAttribute('data-type');
        const feedbackData = {
            type: activeType,
            rating: currentRating,
            driverName: form.driverName.value,
            rideDate: form.rideDate.value,
            feedbackType: form.feedbackType.value,
            message: form.message.value,
            timestamp: new Date().toISOString()
        };

        try {
            // Here you would typically send the data to your server
            console.log('Feedback submitted:', feedbackData);
            
            // Show success message
            alert('Thank you for your feedback!');
            form.reset();
            currentRating = 0;
            highlightStars(0);
            stars.forEach(s => s.classList.remove('active'));
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback. Please try again.');
        }
    });
});
