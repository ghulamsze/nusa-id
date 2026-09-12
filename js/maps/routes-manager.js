const CONSTRAINED_ROUTES = {
  NusaFly: {
    'Makassar (UPG)': 'Surabaya (SUB)',
    'Surabaya (SUB)': 'Makassar (UPG)'
  },
  NusaRail: {
    'Maros Station': 'Barru Station',
    'Barru Station': 'Maros Station'
  }
};

const LOCATION_COORDS = {
  'Makassar (UPG)': { lat: -5.0616, lng: 119.5540 },
  'Surabaya (SUB)': { lat: -7.3798, lng: 112.7875 },
  'Maros Station': { lat: -5.0031, lng: 119.5732 },
  'Barru Station': { lat: -4.4063, lng: 119.6133 }
};

export function setupConstrainedPickers(serviceType, fromSelectElem, toSelectElem, mapInstance) {
  if (!fromSelectElem || !toSelectElem) return;

  const routeRules = CONSTRAINED_ROUTES[serviceType];

  if (routeRules) {
    // Initial sync
    const initialFrom = fromSelectElem.value;
    if (routeRules[initialFrom]) {
      toSelectElem.value = routeRules[initialFrom];
      toSelectElem.disabled = true;
    }

    // Change listener
    fromSelectElem.addEventListener('change', (e) => {
      const selectedFrom = e.target.value;
      if (routeRules[selectedFrom]) {
        toSelectElem.value = routeRules[selectedFrom];
        toSelectElem.disabled = true;
        
        if (mapInstance) {
          renderFixedRouteMap(mapInstance, selectedFrom, toSelectElem.value);
        }
      }
    });
  } else {
    toSelectElem.disabled = false;
  }
}

export function renderFixedRouteMap(map, originName, destName) {
  const origin = LOCATION_COORDS[originName];
  const dest = LOCATION_COORDS[destName];

  if (!origin || !dest || !map) return;

  if (window.activeRoutePolyline) {
    window.activeRoutePolyline.setMap(null);
  }

  const originMarker = new google.maps.Marker({
    position: origin,
    map: map,
    title: originName,
    icon: { url: '/assets/icons/pickup-pin.svg' }
  });

  const destMarker = new google.maps.Marker({
    position: dest,
    map: map,
    title: destName,
    icon: { url: '/assets/icons/dest-pin.svg' }
  });

  window.activeRoutePolyline = new google.maps.Polyline({
    path: [origin, dest],
    geodesic: true,
    strokeColor: '#EB4E70',
    strokeOpacity: 0.8,
    strokeWeight: 4,
    map: map
  });

  const bounds = new google.maps.LatLngBounds();
  bounds.extend(origin);
  bounds.extend(dest);
  map.fitBounds(bounds);
}