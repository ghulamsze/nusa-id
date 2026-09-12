/* ==========================================================================
   NusaMap Controller & Theme Configuration
   ========================================================================== */

// Skema Warna Rose Blush Gradient (#EB4E70, #FD9799, Soft Backgrounds)
const ROSE_BLUSH_MAP_STYLE = [
  { "elementType": "geometry", "stylers": [{ "color": "#faf8f9" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#1f1b1d" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#b84a67" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#fdf0f3" }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#f3e1e6" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#fd9799" }] },
  { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#eb4e70" }] },
  { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#fbe3e8" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#f7d6de" }] },
  { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#b84a67" }] }
];

export const NusaMap = {
  instance: null,
  markers: [],

  /**
   * Inisialisasi peta Google Maps dalam container
   */
  initMap(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    if (typeof google === 'undefined' || !google.maps) {
      this.renderFallback(container, "Google Maps API tidak terdeteksi atau koneksi terputus.");
      return null;
    }

    try {
      const defaultOptions = {
        zoom: 13,
        center: { lat: -6.2088, lng: 106.8456 }, // Jakarta Pusat
        styles: ROSE_BLUSH_MAP_STYLE,
        disableDefaultUI: true,
        zoomControl: true,
        clickableIcons: false,
        ...options
      };

      this.instance = new google.maps.Map(container, defaultOptions);
      return this.instance;
    } catch (error) {
      this.renderFallback(container, "Gagal menginisialisasi peta.");
      return null;
    }
  },

  /**
   * Ubah titik pusat koordinat peta
   */
  setCenter(lat, lng) {
    if (this.instance && lat && lng) {
      this.instance.setCenter({ lat: Number(lat), lng: Number(lng) });
    }
  },

  /**
   * Tambah Marker Baru
   */
  addMarker(position, icon = null, title = "") {
    if (!this.instance) return null;

    const markerOptions = {
      position,
      map: this.instance,
      title
    };

    if (icon) {
      markerOptions.icon = icon;
    }

    const marker = new google.maps.Marker(markerOptions);
    this.markers.push(marker);
    return marker;
  },

  /**
   * Hapus seluruh marker pada peta
   */
  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  },

  /**
   * Pemicu Re-layout saat container/modal berubah ukuran
   */
  handleResize() {
    if (this.instance && typeof google !== 'undefined' && google.maps) {
      google.maps.event.trigger(this.instance, 'resize');
    }
  },

  /**
   * Destroy instance peta
   */
  destroy() {
    this.clearMarkers();
    this.instance = null;
  },

  /**
   * Menampilkan UI Fallback jika terjadi error
   */
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

// Trap global Auth Failure dari Google Maps API (Kunci API Invalid)
window.gm_authFailure = function() {
  const containers = document.querySelectorAll('.map-container');
  containers.forEach(container => {
    NusaMap.renderFallback(container, "Autentikasi gagal. API Key Google Maps tidak valid atau tidak diizinkan.");
  });
};