let map;

function initMap() {
    // Initialize the map and set the default view over India
    map = L.map('map').setView([20.5937, 78.9629], 5);

    // Set up the OpenStreetMap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
}

function searchLocation() {
    const location = document.getElementById("location").value;
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;

                // Set map view to the searched location
                map.setView([lat, lon], 12);

                // Fetch nearby tourism spots
                fetchTourismSpots(lat, lon);
            } else {
                alert("Location not found!");
            }
        });
}

function fetchTourismSpots(lat, lon) {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${lat},${lon})["tourism"~"attraction|museum|viewpoint|theme_park|zoo|aquarium|gallery|archaeological_site|camp_site|hotel|picnic_site|wilderness_hut|guest_house"];out;`;

    fetch(overpassUrl)
        .then(response => response.json())
        .then(data => {
            // Clear existing markers
            map.eachLayer(layer => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Add markers for all nearby tourism spots
            data.elements.forEach(site => {
                const siteName = site.tags.name || getTourismType(site.tags);

                if (siteName) {
                    L.marker([site.lat, site.lon])
                        .addTo(map)
                        .bindPopup(siteName);
                }
            });
        });
}

// Helper function to name unnamed tourism spots based on their type
function getTourismType(tags) {
    if (tags.tourism === "attraction") return "Attraction";
    if (tags.tourism === "museum") return "Museum";
    if (tags.tourism === "viewpoint") return "Viewpoint";
    if (tags.tourism === "theme_park") return "Theme Park";
    if (tags.tourism === "zoo") return "Zoo";
    if (tags.tourism === "aquarium") return "Aquarium";
    if (tags.tourism === "gallery") return "Gallery";
    if (tags.tourism === "archaeological_site") return "Archaeological Site";
    if (tags.tourism === "camp_site") return "Camp Site";
    if (tags.tourism === "picnic_site") return "Picnic Site";
    if (tags.tourism === "wilderness_hut") return "Wilderness Hut";
    if (tags.tourism === "guest_house") return "Guest House";
    return null;
}

// Initialize the map on page load
window.onload = initMap;
