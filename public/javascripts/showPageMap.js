mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map",
    center: campground.geometry.coordinates,
    zoom: 14,
    style: "mapbox://styles/mapbox/satellite-streets-v11",
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({offset: 25})
        .setHTML(`<h3>${campground.title}</h3>`)
    )
    .addTo(map);
