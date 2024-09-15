async function getLocationInfo() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
      alert("Please enter a location");
      return;
    }
    
    const locationInfo = await fetchLocationInfo(location);
    const locationImage = await fetchLocationImage(location);
  
    if (locationInfo && locationImage) {
      displayResult(location, locationInfo, locationImage);
    } else {
      alert('No information found for this location.');
    }
  }
  
  async function fetchLocationInfo(location) {
    const apiKey = '24d3892d79834505a11a123ae7db7484';  // Replace with your OpenCage API key
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`);
    const data = await response.json();
  
    if (data && data.results && data.results.length > 0) {
      const result = data.results[0];
      const formattedLocation = result.formatted;  // Full location name
      const country = result.components.country || '';
      const region = result.components.state || result.components.region || '';
      const city = result.components.city || result.components.town || result.components.village || '';
  
      // Construct the description in 3 lines
      let locationDescription = `Location: ${formattedLocation}\nCountry: ${country}\nRegion: ${region}, City: ${city}`;
      return locationDescription;
    }
    return null;
  }
  
  async function fetchLocationImage(location) {
    const apiKey = 's1Bmx3AXyHYOCbFmziwjqhWZeAyXrc34lgotxiolPxg';  // Replace with your Unsplash API key
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${location}&client_id=${apiKey}`);
    const data = await response.json();
  
    if (data && data.results && data.results.length > 0) {
      return data.results[0].urls.small;
    }
    return null;
  }
  
  function displayResult(location, info, imageUrl) {
    document.getElementById('locationName').textContent = location;
    document.getElementById('locationInfo').textContent = info;
    document.getElementById('locationImage').src = imageUrl;
    
    document.getElementById('resultContainer').style.display = 'block';
  }
  