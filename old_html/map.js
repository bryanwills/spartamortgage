// Initialize and add the map
function initMap() {
  // The location of Uluru 38.0945324,-85.5701781
  const uluru = { lat: 38.0945324, lng: -85.5701781 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
