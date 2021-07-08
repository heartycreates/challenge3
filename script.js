mapboxgl.accessToken = 'pk.eyJ1IjoiaGVhcnR5Y3JlYXRlcyIsImEiOiJja3BwYmptdnowNjczMm5xemlwbGdnZmM2In0.qTZfLJzxfuJAf7WtJQuR7g';


// Initialate map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/heartycreates/ckppcymsj0r1818qh6h5dtj92',
    center: [4.322840, 52.067101],
    zoom: 14.15
});

var myPopup = new mapboxgl.Popup().setHTML('<h3>De Haagse Hogeschool</h3>');

// Adding a marker based on lon lat coordinates
var marker = new mapboxgl.Marker().setLngLat([4.324439, 52.067200]).setPopup(myPopup).addTo(map);


var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');


button.addEventListener('click', function () {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=9ead68d90a5ec61d3969b8dfabeb8c97')
        .then(response => response.json())
        .then(data => {
            var nameValue = data['main']['name'];
            var tempValue = data['main']['temp'];
            var descValue = data['weather'][0]['description'];

            name.innerHTML = nameValue;
            temp.innerHTML = tempValue;
            desc.innerHTML = descValue;

            if (descValue == 'clear sky'){
                alert('This is a good landing spot!')

            } else {
                alert('Bad landing spot, choose another city.')
            }

        })


        .catch(err => alert("City name not found!"))


    // do the fetch here for the coords
        fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + inputValue.value + ' .json?limit=1&type==place&access_token=pk.eyJ1IjoiaGVhcnR5Y3JlYXRlcyIsImEiOiJja3BwYmptdnowNjczMm5xemlwbGdnZmM2In0.qTZfLJzxfuJAf7WtJQuR7g')
        // save the coord in a label
        .then(response => response.json())
        .then(data => {

                 var xCoord= data.features[0].center[0];
            var yCoord= data.features[0].center[1];
            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/heartycreates/ckppcymsj0r1818qh6h5dtj92',
                center: [xCoord, yCoord],
                zoom: 14.15
            });
                var myPopup = new mapboxgl.Popup().setHTML('welcome back!');

// Adding a marker based on lon lat coordinates
                var marker = new mapboxgl.Marker().setLngLat({lng:xCoord, lat:yCoord}).setPopup(myPopup).addTo(map);
            }
        )

}
)
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVhcnR5Y3JlYXRlcyIsImEiOiJja3BwYmptdnowNjczMm5xemlwbGdnZmM2In0.qTZfLJzxfuJAf7WtJQuR7g';

// Add the control to the map.
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);


