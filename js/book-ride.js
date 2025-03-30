document.addEventListener('DOMContentLoaded', () => {
    const mapHandler = new MapHandler('map');
    const form = document.getElementById('booking-form');

    async function searchLocation(query) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`
            );
            const data = await response.json();
            if (data.length > 0) {
                return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            }
        } catch (error) {
            console.error('Search error:', error);
        }
        return null;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pickupValue = document.getElementById('pickup').value;
        const destinationValue = document.getElementById('destination').value;

        // Clear previous markers and routes
        mapHandler.clearMap();

        // Search locations
        const pickup = await searchLocation(pickupValue);
        const destination = await searchLocation(destinationValue);

        if (pickup && destination) {
            // Add markers
            mapHandler.addMarker(pickup, 'Pickup Location');
            mapHandler.addMarker(destination, 'Destination');

            // Calculate and display route
            const routeInfo = mapHandler.calculateRoute(pickup, destination);
            
            // If you want to show price estimate
            if (routeInfo) {
                const basePrice = 2.5;
                const pricePerKm = 1.5;
                const estimatedPrice = (basePrice + (routeInfo.distance * pricePerKm)).toFixed(2);
                
                alert(`Estimated trip details:
                    Distance: ${routeInfo.distance.toFixed(1)} km
                    Duration: ${Math.round(routeInfo.duration)} minutes
                    Price: $${estimatedPrice}`);
            }
        } else {
            alert('Could not find one or both locations. Please try again.');
        }
    });

    // Add autocomplete functionality
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Add search suggestions as user types
    const addSearchSuggestions = debounce(async (input) => {
        const query = input.value;
        if (query.length < 3) return;

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
            );
            const data = await response.json();
            
            // Create and show suggestions
            const suggestions = document.createElement('ul');
            suggestions.className = 'location-suggestions';
            
            data.forEach(place => {
                const li = document.createElement('li');
                li.textContent = place.display_name;
                li.addEventListener('click', () => {
                    input.value = place.display_name;
                    suggestions.remove();
                });
                suggestions.appendChild(li);
            });

            // Remove old suggestions and add new ones
            const oldSuggestions = input.parentNode.querySelector('.location-suggestions');
            if (oldSuggestions) oldSuggestions.remove();
            input.parentNode.appendChild(suggestions);
        } catch (error) {
            console.error('Error getting suggestions:', error);
        }
    }, 300);

    // Add input listeners
    const pickupInput = document.getElementById('pickup');
    const destinationInput = document.getElementById('destination');
    [pickupInput, destinationInput].forEach(input => {
        input.addEventListener('input', () => addSearchSuggestions(input));
        input.addEventListener('blur', () => {
            // Delay removal to allow clicking on suggestions
            setTimeout(() => {
                const suggestions = document.querySelector('.location-suggestions');
                if (suggestions) suggestions.remove();
            }, 200);
        });
    });
});
