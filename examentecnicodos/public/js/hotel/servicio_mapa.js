initMap();

// Funcion encargada de crear el mapa
function initMap() {
    let divMap = document.querySelector('#map');
        latLng = {};

    // definicion de latitud y longitud para ubicar el mapa
    latLng = { lat: 9.9333, lng: -84.0833 };
    // creacion del mapa con los parametros de html y la caracteristicas del mapa
    map = new google.maps.Map(divMap, { center: latLng, zoom: 8 });
    // creacion del marcados
    marker = new google.maps.Marker({
        map: map, // se asigna el marcador al mapa creado 
        draggable: true, // permitir que el marcador sea desplazable
        position: new google.maps.LatLng(latLng.lat, latLng.lng)
    });
    
    gCoder = new google.maps.Geocoder();
}

function showMapForUpdate(latitud, longitud) {
    let divMap = document.querySelector('#map');
        latLng = {};

    // definicion de latitud y longitud para ubicar el mapa
    latLng = { lat: latitud, lng: longitud };
    // creacion del mapa con los parametros de html y la caracteristicas del mapa
    map = new google.maps.Map(divMap, { center: latLng, zoom: 8 });
    // creacion del marcados
    marker = new google.maps.Marker({
        map: map, // se asigna el marcador al mapa creado 
        draggable: true, // permitir que el marcador sea desplazable
        position: new google.maps.LatLng(latLng.lat, latLng.lng)
    });
    
    gCoder = new google.maps.Geocoder();
}
