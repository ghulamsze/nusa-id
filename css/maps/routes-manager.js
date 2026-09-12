/* ==========================================================================
   NUSA Service Route Manager & NusaStay Hotel Integration
   ========================================================================== */

import { NusaMap } from './map-init.js';

// Koordinat Terkunci & Metadata Layanan
export const SERVICE_LOCATIONS = {
  fly: {
    origin: { name: "Makassar (UPG) - Sultan Hasanuddin", lat: -5.0616, lng: 119.5540 },
    destination: { name: "Surabaya (SUB) - Juanda", lat: -7.3798, lng: 112.7869 }
  },
  rail: {
    origin: { name: "Stasiun Maros", lat: -5.0039, lng: 119.5742 },
    destination: { name: "Stasiun Barru", lat: -4.4251, lng: 119.6083 }
  },
  busStops: [
    { name: "Terminal Daya Makassar", lat: -5.1165, lng: 119.4932 },
    { name: "Maros Center Stop", lat: -5.0089, lng: 119.5735 },
    { name: "Terminal Sungguminasa Gowa", lat: -5.2078, lng: 119.4526 }
  ],
  hotels: [
    {
      id: "h1",
      name: "The Rinra Makassar",
      rating: "4.8 ★",
      price: "Rp 1.250.000",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=80",
      position: { lat: -5.1558, lng: 119.4045 }
    },
    {
      id: "h2",
      name: "Mercure Makassar Nexa",
      rating: "4.6 ★",
      price: "Rp 680.000",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&q=80",
      position: { lat: -5.1612, lng: 119.4355 }
    },
    {
      id: "h3",
      name: "Aryaduta Makassar",
      rating: "4.7 ★",
      price: "Rp 890.000",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=200&q=80",
      position: { lat: -5.1482, lng: 119.4082 }
    }
  ]
};

export const RouteManager = {
  polylines: [],
  activeInfoWindow: null,

  /**
   * Reset total status peta (penanda, garis lintasan, & info window)
   */
  clearMapState() {
    NusaMap.clearMarkers();
    this.polylines.forEach(polyline => polyline.setMap(null));
    this.polylines = [];
    if (this.activeInfoWindow) {
      this.activeInfoWindow.close();
      this.activeInfoWindow = null;
    }
  },

  /**
   * Paskan tampilan peta mengikuti semua lokasi aktif
   */
  fitBounds(locations) {
    if (!NusaMap.instance || !locations.length) return;
    const bounds = new google.maps.LatLngBounds();
    locations.forEach(loc => bounds.extend(loc));
    NusaMap.instance.fitBounds(bounds);
  },

  /**
   * 1. NusaFly Logic: Penguncian Rute UPG ↔ SUB & Penerbangan Melengkung (Geodesic)
   */
  loadNusaFly() {
    this.clearMapState();
    this.lockFormFields(SERVICE_LOCATIONS.fly.origin.name, SERVICE_LOCATIONS.fly.destination.name, true);

    const { origin, destination } = SERVICE_LOCATIONS.fly;
    
    // Custom Icon Bandara
    const airportIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 8,
      fillColor: "#EB4E70",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeWeight: 2
    };

    const originMarker = NusaMap.addMarker(origin, airportIcon, origin.name);
    const destMarker = NusaMap.addMarker(destination, airportIcon, destination.name);

    // Garis Jalur Penerbangan Melengkung (Geodesic Polyline)
    const flightPath = new google.maps.Polyline({
      path: [origin, destination],
      geodesic: true,
      strokeColor: "#EB4E70",
      strokeOpacity: 0.8,
      strokeWeight: 3,
      map: NusaMap.instance
    });

    this.polylines.push(flightPath);
    this.fitBounds([origin, destination]);
  },

  /**
   * 2. NusaRail Logic: Penguncian Rute Maros ↔ Barru
   */
  loadNusaRail() {
    this.clearMapState();
    this.lockFormFields(SERVICE_LOCATIONS.rail.origin.name, SERVICE_LOCATIONS.rail.destination.name, true);

    const { origin, destination } = SERVICE_LOCATIONS.rail;

    const trainIcon = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      scale: 6,
      fillColor: "#B84A67",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeWeight: 2
    };

    NusaMap.addMarker(origin, trainIcon, origin.name);
    NusaMap.addMarker(destination, trainIcon, destination.name);

    const railLine = new google.maps.Polyline({
      path: [origin, destination],
      geodesic: false,
      strokeColor: "#B84A67",
      strokeOpacity: 0.9,
      strokeWeight: 4,
      map: NusaMap.instance
    });

    this.polylines.push(railLine);
    this.fitBounds([origin, destination]);
  },

  /**
   * 3. NusaBus Logic: Titik Halte Bus Regional Makassar
   */
  loadNusaBus() {
    this.clearMapState();
    this.lockFormFields("Terminal Daya Makassar", "Terminal Sungguminasa Gowa", false);

    const busIcon = {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 6,
      fillColor: "#DE6B88",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeWeight: 2
    };

    const busCoords = SERVICE_LOCATIONS.busStops.map(stop => {
      NusaMap.addMarker({ lat: stop.lat, lng: stop.lng }, busIcon, stop.name);
      return { lat: stop.lat, lng: stop.lng };
    });

    this.fitBounds(busCoords);
  },

  /**
   * 4. NusaStay Logic: Pencarian Hotel & InfoWindow Interaktif
   */
  loadNusaStay() {
    this.clearMapState();
    this.toggleStaySearchUI(true);

    const hotelCoords = [];

    SERVICE_LOCATIONS.hotels.forEach(hotel => {
      hotelCoords.push(hotel.position);

      const hotelIcon = {
        path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
        fillColor: "#EB4E70",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 1.5,
        scale: 1.5,
        anchor: new google.maps.Point(12, 24)
      };

      const marker = NusaMap.addMarker(hotel.position, hotelIcon, hotel.name);

      // Kartu InfoWindow Interaktif
      const infoWindowContent = `
        <div class="hotel-infowindow">
          <img src="${hotel.image}" alt="${hotel.name}" class="hotel-thumb" />
          <div class="hotel-details">
            <h4 class="hotel-title">${hotel.name}</h4>
            <div class="hotel-meta">
              <span class="hotel-rating">${hotel.rating}</span>
              <span class="hotel-price">${hotel.price} / malam</span>
            </div>
            <button type="button" class="btn-select-hotel" onclick="window.selectNusaHotel('${hotel.id}', '${hotel.name}')">
              Pilih Hotel
            </button>
          </div>
        </div>
      `;

      const infoWindow = new google.maps.InfoWindow({ content: infoWindowContent });

      marker.addListener("click", () => {
        if (this.activeInfoWindow) this.activeInfoWindow.close();
        infoWindow.open(NusaMap.instance, marker);
        this.activeInfoWindow = infoWindow;
      });
    });

    this.fitBounds(hotelCoords);
  },

  /**
   * Helper: Mengunci atau Membuka Input Form
   */
  lockFormFields(fromText, toText, isLocked = true) {
    this.toggleStaySearchUI(false);
    const fromInput = document.getElementById("search-from");
    const toInput = document.getElementById("search-to");

    if (fromInput && toInput) {
      fromInput.value = fromText;
      toInput.value = toText;
      fromInput.readOnly = isLocked;
      toInput.readOnly = isLocked;
    }
  },

  /**
   * Helper: Beralih Tampilan UI Khusus Pencarian Hotel
   */
  toggleStaySearchUI(isStay) {
    const searchForm = document.getElementById("search-form");
    if (!searchForm) return;

    let stayContainer = document.getElementById("stay-search-container");

    if (isStay) {
      searchForm.style.display = "none";
      if (!stayContainer) {
        stayContainer = document.createElement("div");
        stayContainer.id = "stay-search-container";
        stayContainer.className = "search-form";
        stayContainer.innerHTML = `
          <div class="form-field" style="flex:1;">
            <label for="stay-area-input">Cari Kota / Area Hotel</label>
            <input type="text" id="stay-area-input" value="Makassar, Sulawesi Selatan" placeholder="Masukkan nama kota/area...">
          </div>
        `;
        searchForm.parentNode.insertBefore(stayContainer, searchForm);
      }
      stayContainer.style.display = "flex";
    } else {
      searchForm.style.display = "flex";
      if (stayContainer) stayContainer.style.display = "none";
    }
  }
};

// Global Event Handler Pilihan Hotel
window.selectNusaHotel = function(hotelId, hotelName) {
  if (typeof window.showToast === 'function') {
    window.showToast(`Memilih ${hotelName}... Meneruskan ke pemesanan.`);
  }
};