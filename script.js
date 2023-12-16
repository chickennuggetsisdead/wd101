// Initialize the map
var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialize the flight data
var flightData = {};

// Add a marker to the map for each flight
for (var flight in flightData) {
  var marker = L.marker([flightData[flight].latitude, flightData[flight].longitude]).addTo(map);
  marker.bindPopup(flightData[flight].flightNumber);
}

// Update the flight data every second
setInterval(function() {
  // Get the latest flight data
  $.ajax({
    url: 'https://example.com/api/flights',
    success: function(data) {
      flightData = data;

      // Update the markers on the map
      for (var flight in flightData) {
        var marker = L.marker([flightData[flight].latitude, flightData[flight].longitude]);
        marker.bindPopup(flightData[flight].flightNumber);
      }
    }
  });
}, 1000);

// Track a specific flight
$('#track-button').click(function() {
  var flightNumber = $('#flight-number').val();

  // Get the flight data for the specified flight number
  $.ajax({
    url: 'https://example.com/api/flights/' + flightNumber,
    success: function(data) {
      // Update the flight info sidebar
      $('#flight-number-info').text(data.flightNumber);
      $('#origin-info').text(data.origin);
      $('#destination-info').text(data.destination);
      $('#status-info').text(data.status);
      $('#altitude-info').text(data.altitude);
      $('#speed-info').text(data.speed);

      // Center the map on the flight's current location
      map.setView([data.latitude, data.longitude], 10);
    }
  });
});
