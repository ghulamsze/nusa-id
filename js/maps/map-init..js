/* ==========================================================================
   NusaMap Controller - Menggunakan @googlemaps/js-api-loader Dynamic Import
   ========================================================================== */

import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

// Ganti nilai berikut dengan Google Maps API Key Anda yang valid
const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

setOptions({
  key: API_KEY,
  v: 'weekly'
});

const ROSE_BLUSH_MAP_STYLE = [
  { "elementType": "geometry", "stylers": [{ "color": "#faf8f9" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#1f1b1d" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#b84a67" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#fdf0f3" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#fd9799" }] },
  { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#eb4e70" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#f7d6de" }] }
];

export const NusaMap = {
  instance: null,
  markers: [],

  async initMap(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    if (this.instance) return this.instance;

    try {
      // Lazy load pustaka 'maps' dari Google Maps SDK
      const { Map } = await importLibrary('maps');

      const defaultOptions = {
        zoom: 13,
        center: { lat: -5.1477, lng: 119.4327 }, // Makassar
        styles: ROSE_BLUSH_MAP_STYLE,
        disableDefaultUI: true,
        zoomControl: true,
        clickableIcons: false,
        ...options
      };

      this.instance = new Map(container, defaultOptions);
      return this.instance;
    } catch (error) {
      console.error("Gagal memuat Google Maps API:", error);
      this.renderFallback(container, "Gagal memuat peta. Pastikan API Key valid dan terhubung ke internet.");
      return null;
    }
  },

  setCenter(lat, lng) {
    if (this.instance && lat && lng) {
      this.instance.setCenter({ lat: Number(lat), lng: Number(lng) });
    }
  },

  async addMarker(position, icon = null, title = "") {
    if (!this.instance) return null;

    try {
      const { Marker } = await importLibrary('marker');

      const markerOptions = { position, map: this.instance, title };
      if (icon) markerOptions.icon = icon;

      const marker = new Marker(markerOptions);
      this.markers.push(marker);
      return marker;
    } catch (error) {
      console.error("Gagal menambahkan marker:", error);
      return null;
    }
  },

  clearMarkers() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
  },

  handleResize() {
    if (this.instance && window.google?.maps) {
      google.maps.event.trigger(this.instance, 'resize');
    }
  },

  renderFallback(container, message) {
    container.innerHTML = `
      <div class="map-fallback-banner">
        <span class="fallback-icon">⚠️</span>
        <p class="fallback-title">Peta Tidak Dapat Dimuat</p>
        <p class="fallback-msg">${message}</p>
      </div>
    `;
  }
};