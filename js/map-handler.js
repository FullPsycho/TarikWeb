class MapHandler {
    constructor(mapId) {
        this.mapId = mapId;
        this.map = null;
        this.markers = new Map();
        this.searchControl = null;
        this.initializeMap();
    }

    initializeMap() {
        // Create map instance
        this.map = L.map(this.mapId).setView(MAP_CONFIG.defaultCenter, MAP_CONFIG.defaultZoom);
        
        // Add OpenStreetMap tile layer
        L.tileLayer(MAP_CONFIG.tileLayer, {
            attribution: MAP_CONFIG.attribution,
            maxZoom: 19
        }).addTo(this.map);

        // Add geocoder control
        this.searchControl = L.Control.geocoder({
            defaultMarkGeocode: false
        }).addTo(this.map);

        // Get user location
        this.getUserLocation();
    }

    async searchLocation(query) {
        return rateLimiter(async () => {
            try {
                const params = new URLSearchParams({
                    q: query,
                    format: 'json',
                    limit: 1
                });

                const response = await fetch(`${MAP_CONFIG.geocoding.search}?${params}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    return {
                        lat: parseFloat(data[0].lat),
                        lon: parseFloat(data[0].lon),
                        name: data[0].display_name
                    };
                }
            } catch (error) {
                console.error('Location search error:', error);
                throw new Error('Location search failed');
            }
            return null;
        });
    }

    addMarker(location, options = {}) {
        const marker = L.marker([location.lat, location.lon])
            .bindPopup(options.popup || location.name)
            .addTo(this.map);

        if (options.id) {
            if (this.markers.has(options.id)) {
                this.map.removeLayer(this.markers.get(options.id));
            }
            this.markers.set(options.id, marker);
        }

        return marker;
    }

    async calculateRoute(start, end) {
        const startPoint = L.latLng(start.lat, start.lon);
        const endPoint = L.latLng(end.lat, end.lon);
        
        // Fit map to show both points
        const bounds = L.latLngBounds([startPoint, endPoint]);
        this.map.fitBounds(bounds, { padding: [50, 50] });

        // Draw a simple line for now (consider using OSRM for actual routing)
        const routeLine = L.polyline([startPoint, endPoint], {
            color: 'blue',
            weight: 3,
            opacity: 0.7
        }).addTo(this.map);

        // Calculate straight-line distance
        const distance = this.map.distance(startPoint, endPoint) / 1000;
        return {
            distance: distance,
            duration: distance * 2 // Rough estimate: 2 minutes per km
        };
    }

    clearMap() {
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers.clear();
    }

    getUserLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                        name: 'Your Location'
                    };
                    this.map.setView([userLocation.lat, userLocation.lon], 15);
                    this.addMarker(userLocation, { id: 'userLocation' });
                },
                error => console.warn('Location access denied:', error)
            );
        }
    }
}
