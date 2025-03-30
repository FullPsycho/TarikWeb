document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Offer ride form handling
    const offerForm = document.getElementById('offerRideForm');
    offerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const rideData = {
            from: offerForm.departure.value,
            to: offerForm.destination.value,
            date: offerForm.date.value,
            time: offerForm.time.value,
            seats: parseInt(offerForm.seats.value),
            pricePerSeat: parseFloat(offerForm.pricePerSeat.value),
            timestamp: new Date().toISOString()
        };

        // Store ride offer (this would typically go to a server)
        const rides = JSON.parse(localStorage.getItem('rides') || '[]');
        rides.push(rideData);
        localStorage.setItem('rides', JSON.stringify(rides));

        updateRidesList();
        offerForm.reset();
        alert('Ride offered successfully!');
    });

    // Find ride form handling
    const findForm = document.getElementById('findRideForm');
    findForm.addEventListener('submit', (e) => {
        e.preventDefault();
        updateRidesList({
            from: findForm.searchFrom.value,
            to: findForm.searchTo.value,
            date: findForm.searchDate.value
        });
    });

    function updateRidesList(filters = null) {
        const ridesList = document.getElementById('ridesList');
        let rides = JSON.parse(localStorage.getItem('rides') || '[]');

        if (filters) {
            rides = rides.filter(ride => 
                ride.from.toLowerCase().includes(filters.from.toLowerCase()) &&
                ride.to.toLowerCase().includes(filters.to.toLowerCase()) &&
                ride.date === filters.date
            );
        }

        ridesList.innerHTML = rides.length ? rides.map(ride => `
            <div class="ride-card">
                <div class="ride-header">
                    <strong>${ride.from} → ${ride.to}</strong>
                    <span class="ride-price">$${ride.pricePerSeat}/seat</span>
                </div>
                <div class="ride-details">
                    <div>Date: ${ride.date} at ${ride.time}</div>
                    <div>Available seats: ${ride.seats}</div>
                </div>
                <button onclick="bookSeat(${rides.indexOf(ride)})" 
                        class="btn primary" style="margin-top: 1rem;">
                    Book Seat
                </button>
            </div>
        `).join('') : '<p>No rides available for these criteria.</p>';
    }

    // Initial rides list
    updateRidesList();

    // Make bookSeat function global
    window.bookSeat = function(rideIndex) {
        const rides = JSON.parse(localStorage.getItem('rides') || '[]');
        if (rides[rideIndex].seats > 0) {
            rides[rideIndex].seats--;
            localStorage.setItem('rides', JSON.stringify(rides));
            updateRidesList();
            alert('Seat booked successfully!');
        } else {
            alert('No seats available!');
        }
    };
});
