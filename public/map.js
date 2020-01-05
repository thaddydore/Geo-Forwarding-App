

mapboxgl.accessToken = "pk.eyJ1IjoidGhhZGR5ZG9yZSIsImEiOiJjazR4Y2t2aWowb3V4M2xycGxjaWY3cTIwIn0.-rp39n7cDcaP5ohf3J10PA"

//map style settings
var map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mapbox/streets-v11",
	center: [6.802949, 6.141312],
	zoom: 13,
	antialias: true,
	zoom: 11,
	pitch: 60,
	bearing: -60
});

//fetch location from database
async function fetchData() {
	const response = await fetch("/api/jude/locations");
	const data = await response.json();

	const locations = data.data.map(location => {
		return {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [
					location.location.coordinates[0],
					location.location.coordinates[1]
				]
			},
			properties: {
				storeId: location.storeId,
				icon: "cat"
			}
		};
	});

	loadMap(locations);
}

//load map
function loadMap(locations) {
	map.on("load", function() {
		map.loadImage(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png",
			function(error, image) {
				if (error) throw error;
				map.addImage("cat", image);
				map.addLayer({
					id: "points",
					type: "symbol",
					source: {
						type: "geojson",
						data: {
							type: "FeatureCollection",
							features: locations
						}
					},
					layout: {
						"icon-image": "cat",
						"icon-size": 0.1,
						"text-field": "{storeId}",
						"text-offset": [0, 0.8],
						"text-anchor": "top"
					}
				});
			}
		);
	});
}

fetchData();

//add search control
map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl
	})
);

//add live location
map.addControl(
	new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true
		},
		trackUserLocation: true
	})
);

//add live data
var url = "https://wanderdrone.appspot.com/";
map.on("load", function() {
	window.setInterval(function() {
		map.getSource("drone").setData(url);
	}, 2000);

	map.addSource("drone", { type: "geojson", data: url });
	map.addLayer({
		id: "drone",
		type: "symbol",
		source: "drone",
		layout: {
			"icon-image": "rocket-15"
		}
	});
});

