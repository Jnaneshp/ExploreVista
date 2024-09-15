let map;

function initMap() {
    // Initialize map centered at a default location
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 20.5937, lng: 78.9629 }, // Default location (India)
        zoom: 5
    });
}

function displayLocation() {
    const location = document.getElementById('location').value;

    // Geocoding API to find the latitude and longitude of the entered location
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': location }, (results, status) => {
        if (status === 'OK') {
            const locationLatLng = results[0].geometry.location;
            
            // Center map on the entered location
            map.setCenter(locationLatLng);
            map.setZoom(14);

            // Place a marker on the map
            new google.maps.Marker({
                position: locationLatLng,
                map: map
            });

            // Simulate crowd level (can be replaced with real API)
            const crowdLevel = getCrowdLevel();
            displayCrowdLevel(crowdLevel);

        } else {
            alert('Location not found: ' + status);
        }
    });
}

// Simulate crowd level based on random generation
function getCrowdLevel() {
    const levels = ['Low', 'Medium', 'High'];
    return levels[Math.floor(Math.random() * levels.length)];
}

function displayCrowdLevel(level) {
    const crowdLevelDiv = document.getElementById('crowd-level');
    crowdLevelDiv.innerHTML = `Current crowd level: <strong>${level}</strong>`;
}
