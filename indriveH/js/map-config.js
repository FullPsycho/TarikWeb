const MAP_CONFIG = {
    // OpenStreetMap tile layer URL
    tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    
    // Default map center (if user location not available)
    defaultCenter: [0, 0],
    defaultZoom: 13,
    
    // Map attribution required by OpenStreetMap
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    
    // Nominatim API endpoints (OpenStreetMap's geocoding service)
    geocoding: {
        search: 'https://nominatim.openstreetmap.org/search',
        reverse: 'https://nominatim.openstreetmap.org/reverse'
    },
    
    // Rate limiting settings (to comply with Nominatim usage policy)
    rateLimit: {
        requests: 1,
        perSeconds: 1
    }
};

// Utility function to handle rate limiting
const rateLimiter = (() => {
    let lastRequest = 0;
    
    return async (fn) => {
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequest;
        const minimumGap = (MAP_CONFIG.rateLimit.perSeconds * 1000) / MAP_CONFIG.rateLimit.requests;
        
        if (timeSinceLastRequest < minimumGap) {
            await new Promise(resolve => 
                setTimeout(resolve, minimumGap - timeSinceLastRequest)
            );
        }
        
        lastRequest = Date.now();
        return fn();
    };
})();
