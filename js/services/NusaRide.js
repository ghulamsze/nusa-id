import { showToast } from '../utils/toast.js';
import { t } from '../utils/i18n.js';

/**
 * NusaRide.js - Motorcycle-Only Ride-Hailing Module for Nusa Super-App (2026)
 * Senior Front-End Architecture: Pure ES6 Module, Glassmorphism UI, Tactile Audio,
 * Interactive Leaflet Map Visualizer, distance-based pricing, and Nusa Balance payment integration.
 * 
 * STRICT NO-EMOJI CONSTRAINT: Uses clean inline SVG vectors only.
 */

const svgIcons = {
  motorcycle: (color = 'currentColor', size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="6" cy="16" r="3"/>
      <circle cx="18" cy="16" r="3"/>
      <path d="M10 16h4M13 6l2 4h4M9 12l2-6h3"/>
      <path d="M6 13l3-3h3"/>
    </svg>`,

  swap: (size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/>
    </svg>`,

  gps: (color = 'currentColor', size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
      <circle cx="12" cy="12" r="8"/>
    </svg>`,

  star: (color = '#F59E0B', size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`,

  check: (color = 'currentColor', size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`
};

export const NusaRide = {
  cities: {
    MAK: 'Makassar',
    GOW: 'Gowa',
    MAR: 'Maros',
    TAK: 'Takalar'
  },

  // Fixed Quick Chips Selection
  quickChips: [
    { label: 'Rumah', point: '[Hunian] Perumahan Mutiara Indah Village Samata', city: 'GOW' },
    { label: 'Kampus UINAM', point: '[Kampus] UINAM Kampus 2 (Samata, Gowa)', city: 'GOW' },
    { label: 'Mall MP', point: '[Mall] Mall Panakkukang (MP)', city: 'MAK' },
    { label: 'Stasiun Daya', point: '[Transit] Terminal Regional Daya', city: 'MAK' }
  ],

  // Calibrated OpenStreetMap Boundary Polygons for Mamminasata Region
  landPolygon: [
    [-4.70, 119.25],
    [-4.70, 119.90],
    [-5.65, 119.90],
    [-5.65, 119.25]
  ],

  seaPolygons: [
    [
      [-5.1300, 119.3500], [-5.1300, 119.4030],
      [-5.1420, 119.4010], [-5.1500, 119.3950],
      [-5.1650, 119.3850], [-5.1850, 119.3700],
      [-5.1850, 119.3500]
    ]
  ],

  locationDatabase: {
    MAK: [
      { name: '[Mall] Mall Panakkukang (MP)', coords: [-5.1565, 119.4475] },
      { name: '[Mall] Panakkukang Square', coords: [-5.1555, 119.4422] },
      { name: '[Mall] Trans Studio Mall (TSM)', coords: [-5.1608, 119.3935] },
      { name: '[Mall] Nipah Park (Nipah Mall)', coords: [-5.1375, 119.4525] },
      { name: '[Mall] Mall Ratu Indah (MaRi)', coords: [-5.1565, 119.4158] },
      { name: '[Kampus] UNHAS Tamalanrea', coords: [-5.1330, 119.4860] },
      { name: '[Kampus] UINAM Kampus 1 (Sultan Alauddin)', coords: [-5.1828, 119.4358] },
      { name: '[Kampus] UNM Gunungsari', coords: [-5.1685, 119.4360] },
      { name: '[Kampus] UMI (Urip Sumoharjo)', coords: [-5.1365, 119.4478] },
      { name: '[Hunian] CitraLand City CPI Makassar (Sunset Quay)', coords: [-5.1478, 119.3975] },
      { name: '[Hunian] Bumi Tamalanrea Permai (BTP)', coords: [-5.1275, 119.4970] },
      { name: '[Wisata] CPI & Masjid 99 Kubah', coords: [-5.1435, 119.4038] },
      { name: '[Wisata] Anjungan Pantai Losari', coords: [-5.1433, 119.4070] },
      { name: '[Transit] Pelabuhan Soekarno-Hatta Makassar', coords: [-5.1240, 119.4095] },
      { name: '[Transit] Terminal Regional Daya', coords: [-5.1020, 119.5130] }
    ],
    GOW: [
      { name: '[Hunian] Perumahan Mutiara Indah Village Samata', coords: [-5.2100, 119.5072] },
      { name: '[Kampus] UINAM Kampus 2 (Samata, Gowa)', coords: [-5.2054, 119.4983] },
      { name: '[Kampus] UNHAS Kampus Teknik Gowa', coords: [-5.2304, 119.5025] },
      { name: '[Hunian] Royal Spring Hertasning / Samata', coords: [-5.1865, 119.4798] }
    ],
    MAR: [
      { name: '[Transit] Bandara Internasional Sultan Hasanuddin (UPG)', coords: [-5.0614, 119.5540] },
      { name: '[Wisata] Taman Nasional Bantimurung', coords: [-5.0160, 119.6142] }
    ],
    TAK: [
      { name: '[Pusat] Takalar City Center', coords: [-5.4188, 119.4388] },
      { name: '[Wisata] Pantai Puntondo', coords: [-5.5578, 119.4878] }
    ]
  },

  driversPool: {
    names: ['Andi Muhammad Rian', 'Dg. Nojeng', 'Syamsul Bahri', 'Faisal Ahmad', 'Budi Santoso', 'Rahmat Hidayat', 'Dg. Naba', 'Fahri Husaini'],
    bikes: ['Honda Vario 160 Hitam', 'Yamaha NMAX 155 Hitam', 'Honda BeAT Deluxe Merah', 'Yamaha Aerox 155 Biru', 'Honda PCX 160 Putih'],
    plateSuffixes: ['KL', 'AB', 'XZ', 'AK', 'KM', 'RE', 'UA']
  },

  // State Management
  pickupCityKey: 'GOW',
  pickupPoint: '[Hunian] Perumahan Mutiara Indah Village Samata',
  destCityKey: 'MAK',
  destPoint: '[Mall] Mall Panakkukang (MP)',
  passengerName: 'User NUSA',
  selectedTier: 'RIDE-MOTOR-STD',
  activeMapTarget: null,
  pickupCustomCoords: null,
  destCustomCoords: null,
  mapInstance: null,
  assignedDriver: null,
  searchTimer: null,
  soundEngine: null,
  swapRotation: 0,

  init(targetContainerId, soundEngine = null) {
    const container = typeof targetContainerId === 'string'
      ? document.getElementById(targetContainerId)
      : targetContainerId;
    if (!container) return;

    this.soundEngine = soundEngine || window.NusaSoundEngine;
    this.injectStyles();

    container.innerHTML = `
      <div id="nusaride-engine-panel" class="space-y-4 max-w-full overflow-hidden text-[var(--text-main)]">
        
        <!-- Main Form Card -->
        <div class="tactile-card p-4 space-y-4 overflow-hidden relative backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl">
          
          <!-- Header Bar -->
          <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">LAYANAN OJEK</span>
            <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FDE5E7] text-[#EB4E70] font-extrabold">Nusa Ride 2026</span>
          </div>

          <!-- Quick Chips Selection -->
          <div class="space-y-1.5 pb-2">
            <label class="text-[10px] font-bold text-gray-400 block uppercase tracking-wide">Tujuan Cepat</label>
            <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              ${this.quickChips.map(chip => `
                <button data-chip-point="${chip.point}" data-chip-city="${chip.city}" class="ride-quick-chip shrink-0 px-3 py-1.5 bg-gray-100 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl text-[10px] font-extrabold text-gray-300 hover:border-[#EB4E70] hover:text-[#EB4E70] transition-colors btn-tactile">
                  ${chip.label}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Pickup & Destination Inputs with Swap Button -->
          <div class="space-y-3 relative">
            
            <!-- Pickup Input Group -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 block uppercase tracking-wide">
                LOKASI PENJEMPUTAN
              </label>
              <div class="flex items-center gap-2 w-full min-w-0">
                <select id="ride-pickup-city" class="w-28 shrink-0 p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-extrabold text-xs text-[#EB4E70] outline-none focus:border-[#EB4E70]">
                  ${this.renderCityOptions(this.pickupCityKey)}
                </select>
                <select id="ride-pickup-point" class="flex-1 min-w-0 p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70] truncate">
                  ${this.renderPointOptions(this.pickupCityKey, this.pickupPoint)}
                </select>
                <button id="ride-gps-btn" title="Gunakan Lokasi GPS Saat Ini" class="w-9 h-9 shrink-0 rounded-xl bg-gray-100 dark:bg-[#2A141A] border border-[var(--border-color)] text-[#EB4E70] flex items-center justify-center btn-tactile font-black text-xs hover:border-[#EB4E70] active:scale-90 transition-transform">
                  ${svgIcons.gps('#EB4E70', 16)}
                </button>
              </div>
            </div>

            <!-- Centered Swap Button -->
            <div class="relative flex justify-center -my-2 z-20">
              <button id="ride-swap-btn" title="Tukar Rute Penjemputan & Tujuan" class="w-8 h-8 rounded-full bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white flex items-center justify-center shadow-lg btn-tactile active:scale-90 transition-transform">
                <div id="ride-swap-icon-container" class="transition-transform duration-500 ease-out flex items-center justify-center">
                  ${svgIcons.swap(16)}
                </div>
              </button>
            </div>

            <!-- Destination Input Group -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 block uppercase tracking-wide">
                LOKASI TUJUAN
              </label>
              <div class="flex items-center gap-2 w-full min-w-0">
                <select id="ride-dest-city" class="w-28 shrink-0 p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-extrabold text-xs text-[#EB4E70] outline-none focus:border-[#EB4E70]">
                  ${this.renderCityOptions(this.destCityKey)}
                </select>
                <select id="ride-dest-point" class="flex-1 min-w-0 p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70] truncate">
                  ${this.renderPointOptions(this.destCityKey, this.destPoint)}
                </select>
              </div>
            </div>

            <!-- Passenger Name -->
            <div class="flex items-center justify-between bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <span class="text-[11px] font-bold text-gray-400 uppercase">Nama Penumpang:</span>
              <input type="text" id="ride-passenger-input" value="${this.passengerName}" class="bg-transparent text-right font-extrabold text-xs text-[var(--text-main)] outline-none w-1/2 focus:text-[#EB4E70]" />
            </div>
          </div>

          <!-- Interactive Route Map -->
          <div class="space-y-1.5 pt-1">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold text-gray-400 block uppercase tracking-wide">Peta Jalur & Driver Sekitar</label>
              <div class="flex gap-1 bg-gray-100 dark:bg-[#2A141A] p-0.5 rounded-lg border border-[var(--border-color)]">
                <button id="map-target-pickup" class="px-2 py-0.5 text-[9px] font-extrabold rounded-md text-gray-400 transition-colors">Set Jemput</button>
                <button id="map-target-dest" class="px-2 py-0.5 text-[9px] font-extrabold rounded-md text-gray-400 transition-colors">Set Tujuan</button>
              </div>
            </div>

            <!-- Map Container -->
            <div class="relative w-full h-48 rounded-2xl border border-[var(--border-color)] overflow-hidden z-10 shadow-inner">
              <div id="ride-map" class="w-full h-full cursor-crosshair"></div>
            </div>
            
            <div class="flex justify-between items-center text-[9px] text-gray-400 font-semibold px-1">
              <span>* Klik peta untuk menggeser koordinat penjemputan/tujuan.</span>
              <span id="ride-route-dist" class="font-black text-[#EB4E70]"></span>
            </div>
          </div>
        </div>

        <!-- Dynamic Motorcycle Option Cards & Fare Summary -->
        <div class="tactile-card p-4 space-y-4 backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-extrabold text-gray-300 uppercase tracking-wide">Opsi Armada Ojek</h3>
            <span id="ride-eta-badge" class="text-[10px] font-extrabold text-[#EB4E70] bg-[#FDE5E7] dark:bg-[#2A141A] px-2 py-0.5 rounded-md"></span>
          </div>

          <!-- Dynamic Option Tiers -->
          <div id="ride-tier-grid" class="grid grid-cols-3 gap-2"></div>

          <!-- Active Tier Fare Breakdown & Nusa Balance indicator -->
          <div id="ride-price-summary" class="bg-gray-50 dark:bg-[#2A141A] p-3 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
            <div>
              <span class="text-[9px] text-gray-400 font-bold block uppercase">Total Tarif (Nusa Balance)</span>
              <span id="ride-price-val" class="text-lg font-black text-[#EB4E70]">Rp 0</span>
            </div>
            <div class="text-right">
              <span id="ride-tier-name" class="text-xs font-extrabold text-[var(--text-main)] block"></span>
              <span id="ride-tier-desc" class="text-[9px] text-gray-400 font-bold block"></span>
            </div>
          </div>

          <!-- Submit Order Button -->
          <button id="ride-submit-btn" class="w-full py-3.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white text-xs font-black rounded-xl shadow-lg btn-tactile active:scale-95 transition-transform flex items-center justify-center">
            Pesan NusaRide Sekarang
          </button>
        </div>
      </div>

      <!-- Real-Time Driver Radar Search Modal -->
      <div id="ride-search-modal" class="hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-white dark:bg-[#1A0B10] p-6 rounded-3xl max-w-xs w-full text-center space-y-4 shadow-2xl border border-[#EB4E70]/30 relative overflow-hidden">
          
          <!-- Searching Animation Step -->
          <div id="ride-search-searching" class="space-y-4">
            <div class="radar-box relative w-24 h-24 mx-auto flex items-center justify-center">
              <div class="radar-circle"></div>
              <div class="radar-circle delay-1"></div>
              <div class="radar-sweep"></div>
              <span class="relative z-10 text-[#EB4E70] animate-pulse">
                ${svgIcons.motorcycle('#EB4E70', 36)}
              </span>
            </div>
            <div>
              <h3 class="text-sm font-black text-[var(--text-main)]">Mencari Driver Ojek Terdekat...</h3>
              <p class="text-[11px] text-gray-400 mt-1 font-semibold">Mendeteksi armada NusaRide aktif dalam radius terdekat.</p>
            </div>
            <button id="ride-cancel-search-btn" class="text-xs text-gray-400 font-extrabold hover:text-[#EB4E70] transition-colors">
              Batal Mencari
            </button>
          </div>

          <!-- Driver Found Step -->
          <div id="ride-search-found" class="hidden space-y-4 text-left relative">
            <button id="ride-cancel-found-btn" title="Batal Pesanan" class="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gray-100 dark:bg-[#2A141A] text-gray-400 hover:text-[#EB4E70] flex items-center justify-center text-xs font-bold transition-colors border border-[var(--border-color)]">
              ✕
            </button>
            
            <div class="text-center -mt-1 pb-1">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[11px] font-black mb-2 shadow-sm">
                ${svgIcons.check('#10B981', 12)} Driver Ditemukan!
              </span>
              <h3 class="text-sm font-black text-[var(--text-main)]">Driver Menuju Lokasi Penjemputan</h3>
            </div>

            <div class="bg-gray-50 dark:bg-[#2A141A] p-3 rounded-2xl border border-[var(--border-color)] space-y-2.5">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#EB4E70]/20 text-[#EB4E70] flex items-center justify-center shrink-0">
                  ${svgIcons.motorcycle('#EB4E70', 20)}
                </div>
                <div class="flex-1 min-w-0">
                  <h4 id="driver-name" class="font-extrabold text-xs text-[var(--text-main)] truncate"></h4>
                  <div class="flex items-center gap-1 text-[10px] font-bold text-amber-500 mt-0.5">
                    ${svgIcons.star('#F59E0B', 12)} <span id="driver-rating"></span>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between items-center text-xs">
                <div>
                  <span class="text-[9px] text-gray-400 font-bold block uppercase">Sepeda Motor</span>
                  <span id="driver-bike" class="font-extrabold text-[var(--text-main)]"></span>
                </div>
                <div class="text-right">
                  <span class="text-[9px] text-gray-400 font-bold block uppercase">Plat Nomor</span>
                  <span id="driver-plate" class="font-black text-[#EB4E70] bg-[#EB4E70]/10 px-2 py-0.5 rounded-md"></span>
                </div>
              </div>
            </div>

            <button id="ride-close-found-btn" class="w-full py-2.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white text-xs font-black rounded-xl shadow-md btn-tactile active:scale-95 transition-transform">
              Bayar Via Nusa Balance & Lacak Driver
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.autoDetectLocationOnStart();
  },

  playAudio(soundType, pitchMult = 1) {
    if (this.soundEngine && typeof this.soundEngine[soundType] === 'function') {
      this.soundEngine[soundType](pitchMult);
    } else if (typeof window.playSound === 'function') {
      window.playSound(soundType);
    }
  },

  injectStyles() {
    if (document.getElementById('nusaride-styles')) return;
    const style = document.createElement('style');
    style.id = 'nusaride-styles';
    style.innerHTML = `
      .ride-tier-card { transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; }
      .ride-tier-card.active { border-color: #EB4E70 !important; background-color: rgba(235, 78, 112, 0.1) !important; transform: translateY(-2px); }
      .map-radar-wrapper { position: relative; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
      .map-radar-wave { position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 1.5px solid rgba(235, 78, 112, 0.6); background: rgba(235, 78, 112, 0.08); animation: mapRadarPulse 2.4s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; pointer-events: none; }
      .map-radar-wave.w2 { animation-delay: 0.8s; }
      .map-radar-wave.w3 { animation-delay: 1.6s; }
      @keyframes mapRadarPulse { 0% { transform: scale(0.1); opacity: 0.9; } 100% { transform: scale(1.4); opacity: 0; } }
      .ojek-dot-icon { width: 12px; height: 12px; background-color: #10B981; border: 2px solid #FFFFFF; border-radius: 50%; box-shadow: 0 0 8px #10B981; animation: ojekBlink 1.4s ease-in-out infinite alternate; }
      @keyframes ojekBlink { 0% { opacity: 0.3; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1.2); } }
      .radar-box { overflow: hidden; border-radius: 9999px; background: rgba(235, 78, 112, 0.05); border: 1px solid rgba(235, 78, 112, 0.2); }
      .radar-circle { position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(235, 78, 112, 0.5); animation: radar-pulse 2s cubic-bezier(0, 0.2, 0.8, 1) infinite; }
      .radar-circle.delay-1 { animation-delay: -1s; }
      .radar-sweep { position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(235, 78, 112, 0.4) 100%); animation: radar-spin 2s linear infinite; }
      @keyframes radar-pulse { 0% { transform: scale(0.1); opacity: 1; } 100% { transform: scale(1.2); opacity: 0; } }
      @keyframes radar-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
  },

  isPointInLand(lat, lng) {
    const polygon = this.landPolygon;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][1], yi = polygon[i][0];
      const xj = polygon[j][1], yj = polygon[j][0];
      const intersect = ((yi > lat) !== (yj > lat)) && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  },

  isPointInSea(lat, lng) {
    return this.seaPolygons.some(polygon => {
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][1], yi = polygon[i][0];
        const xj = polygon[j][1], yj = polygon[j][0];
        const intersect = ((yi > lat) !== (yj > lat)) && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    });
  },

  validateCoordinates(lat, lng) {
    if (this.isPointInSea(lat, lng)) {
      return {
        valid: false,
        message: 'Lokasi berada di area laut! Silakan pilih titik di daratan.'
      };
    }

    if (lat < -5.1100 && lat > -5.1700 && lng < 119.3930) {
      const isCPILand = (lat <= -5.1400 && lat >= -5.1520 && lng >= 119.3950);
      if (!isCPILand) {
        return {
          valid: false,
          message: 'Lokasi penjemputan terlalu dekat dengan perairan laut CPI!'
        };
      }
    }

    if (!this.isPointInLand(lat, lng)) {
      return {
        valid: false,
        message: 'Lokasi berada di luar area operasional NusaRide.'
      };
    }

    return { valid: true };
  },

  renderCityOptions(selectedKey) {
    return Object.keys(this.cities)
      .map(key => `<option value="${key}" ${key === selectedKey ? 'selected' : ''}>${this.cities[key]}</option>`)
      .join('');
  },

  renderPointOptions(cityKey, selectedPoint) {
    const list = this.locationDatabase[cityKey] || [];
    return list
      .map(item => `<option value="${item.name}" ${item.name === selectedPoint ? 'selected' : ''}>${item.name}</option>`)
      .join('');
  },

  updateDropdownSingleCustom(selectId, customLoc) {
    const selectEl = document.getElementById(selectId);
    if (!selectEl) return;
    
    const existingPinOption = Array.from(selectEl.options).find(opt => opt.value.startsWith('[Pin Peta]') || opt.value.startsWith('[GPS]'));
    if (existingPinOption) {
      existingPinOption.value = customLoc;
      existingPinOption.text = customLoc;
      existingPinOption.selected = true;
    } else {
      const opt = document.createElement('option');
      opt.value = customLoc;
      opt.text = customLoc;
      opt.selected = true;
      selectEl.insertBefore(opt, selectEl.firstChild);
    }
  },

  getCoordinates(cityKey, pointName, type) {
    if (type === 'pickup' && this.pickupCustomCoords) return this.pickupCustomCoords;
    if (type === 'dest' && this.destCustomCoords) return this.destCustomCoords;

    const list = this.locationDatabase[cityKey] || [];
    const found = list.find(item => item.name === pointName);
    if (found) return found.coords;

    if (pointName && (pointName.startsWith('[GPS]') || pointName.startsWith('[Pin Peta]'))) {
      const match = pointName.match(/\((-?\d+\.\d+),\s*(-?\d+\.\d+)\)/);
      if (match && !isNaN(parseFloat(match[1])) && !isNaN(parseFloat(match[2]))) {
        return [parseFloat(match[1]), parseFloat(match[2])];
      }
    }

    return list.length > 0 ? list[0].coords : [-5.1565, 119.4475];
  },

  autoDetectLocationOnStart() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const check = this.validateCoordinates(lat, lng);

          if (check.valid) {
            const customLoc = `[GPS] Lokasi Terdeteksi (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
            this.pickupCustomCoords = [lat, lng];
            this.pickupPoint = customLoc;
            this.updateDropdownSingleCustom('ride-pickup-point', customLoc);
          }
          this.onRouteChanged();
        },
        () => {
          this.onRouteChanged();
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      this.onRouteChanged();
    }
  },

  bindEvents() {
    // Quick Chips Binding
    const chips = document.querySelectorAll('.ride-quick-chip');
    chips.forEach(chip => {
      chip.onclick = () => {
        this.playAudio('pop');
        const chipCity = chip.dataset.chipCity;
        const chipPoint = chip.dataset.chipPoint;

        this.destCityKey = chipCity;
        this.destPoint = chipPoint;
        this.destCustomCoords = null;

        const destCitySelect = document.getElementById('ride-dest-city');
        const destPointSelect = document.getElementById('ride-dest-point');

        if (destCitySelect) destCitySelect.value = this.destCityKey;
        if (destPointSelect) destPointSelect.innerHTML = this.renderPointOptions(this.destCityKey, this.destPoint);

        showToast(`Tujuan diatur ke ${chip.innerText.trim()}`);
        this.onRouteChanged();
      };
    });

    // Select Dropdown bindings
    const pickupCitySelect = document.getElementById('ride-pickup-city');
    const pickupPointSelect = document.getElementById('ride-pickup-point');
    const destCitySelect = document.getElementById('ride-dest-city');
    const destPointSelect = document.getElementById('ride-dest-point');

    if (pickupCitySelect) {
      pickupCitySelect.onchange = (e) => {
        this.playAudio('click');
        this.pickupCityKey = e.target.value;
        this.pickupCustomCoords = null;
        const list = this.locationDatabase[this.pickupCityKey] || [];
        this.pickupPoint = list[0] ? list[0].name : '';
        pickupPointSelect.innerHTML = this.renderPointOptions(this.pickupCityKey, this.pickupPoint);
        this.onRouteChanged();
      };
    }

    if (pickupPointSelect) {
      pickupPointSelect.onchange = (e) => {
        this.playAudio('click');
        this.pickupPoint = e.target.value;
        if (!this.pickupPoint.startsWith('[Pin Peta]') && !this.pickupPoint.startsWith('[GPS]')) {
          this.pickupCustomCoords = null;
        }
        this.onRouteChanged();
      };
    }

    if (destCitySelect) {
      destCitySelect.onchange = (e) => {
        this.playAudio('click');
        this.destCityKey = e.target.value;
        this.destCustomCoords = null;
        const list = this.locationDatabase[this.destCityKey] || [];
        this.destPoint = list[0] ? list[0].name : '';
        destPointSelect.innerHTML = this.renderPointOptions(this.destCityKey, this.destPoint);
        this.onRouteChanged();
      };
    }

    if (destPointSelect) {
      destPointSelect.onchange = (e) => {
        this.playAudio('click');
        this.destPoint = e.target.value;
        if (!this.destPoint.startsWith('[Pin Peta]') && !this.destPoint.startsWith('[GPS]')) {
          this.destCustomCoords = null;
        }
        this.onRouteChanged();
      };
    }

    // Map Target Controls
    const btnTargetPickup = document.getElementById('map-target-pickup');
    const btnTargetDest = document.getElementById('map-target-dest');

    if (btnTargetPickup && btnTargetDest) {
      btnTargetPickup.onclick = () => {
        this.playAudio('click');
        if (this.activeMapTarget === 'pickup') {
          this.activeMapTarget = null;
          showToast('Mode pasang pin dimatikan.');
        } else {
          this.activeMapTarget = 'pickup';
          showToast('Mode Peta: Klik lokasi penjemputan');
        }
        this.updateMapTargetUI();
      };

      btnTargetDest.onclick = () => {
        this.playAudio('click');
        if (this.activeMapTarget === 'dest') {
          this.activeMapTarget = null;
          showToast('Mode pasang pin dimatikan.');
        } else {
          this.activeMapTarget = 'dest';
          showToast('Mode Peta: Klik lokasi tujuan');
        }
        this.updateMapTargetUI();
      };
    }

    // Interactive Spring Swap Button
    const swapBtn = document.getElementById('ride-swap-btn');
    if (swapBtn) {
      swapBtn.onclick = () => {
        this.playAudio('pop');
        this.swapRotation += 180;
        const iconContainer = document.getElementById('ride-swap-icon-container');
        if (iconContainer) {
          iconContainer.style.transform = `rotate(${this.swapRotation}deg)`;
        }
        this.swapRoute();
      };
    }

    const gpsBtn = document.getElementById('ride-gps-btn');
    if (gpsBtn) {
      gpsBtn.onclick = () => {
        this.playAudio('click');
        this.acceptLocation();
      };
    }

    const passengerInput = document.getElementById('ride-passenger-input');
    if (passengerInput) {
      passengerInput.oninput = (e) => {
        this.passengerName = e.target.value.trim() || 'User NUSA';
      };
    }

    const submitBtn = document.getElementById('ride-submit-btn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        this.playAudio('chime');
        if (window.spawnParticleBurst) {
          const rect = submitBtn.getBoundingClientRect();
          window.spawnParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
        this.processBooking();
      };
    }

    const cancelSearchBtn = document.getElementById('ride-cancel-search-btn');
    if (cancelSearchBtn) {
      cancelSearchBtn.onclick = () => {
        this.playAudio('pop');
        this.stopSearchingDriver();
      };
    }

    const cancelFoundBtn = document.getElementById('ride-cancel-found-btn');
    if (cancelFoundBtn) {
      cancelFoundBtn.onclick = () => {
        this.playAudio('pop');
        this.stopSearchingDriver();
        showToast('Pemesanan NusaRide dibatalkan.');
      };
    }

    const closeFoundBtn = document.getElementById('ride-close-found-btn');
    if (closeFoundBtn) {
      closeFoundBtn.onclick = () => {
        this.playAudio('chime');
        this.confirmBookingAndPay();
      };
    }
  },

  updateMapTargetUI() {
    const btnTargetPickup = document.getElementById('map-target-pickup');
    const btnTargetDest = document.getElementById('map-target-dest');
    if (!btnTargetPickup || !btnTargetDest) return;

    if (this.activeMapTarget === 'pickup') {
      btnTargetPickup.className = 'px-2 py-0.5 text-[9px] font-extrabold rounded-md bg-[#EB4E70] text-white transition-colors shadow-sm';
      btnTargetDest.className = 'px-2 py-0.5 text-[9px] font-extrabold rounded-md text-gray-400 transition-colors';
    } else if (this.activeMapTarget === 'dest') {
      btnTargetPickup.className = 'px-2 py-0.5 text-[9px] font-extrabold rounded-md text-gray-400 transition-colors';
      btnTargetDest.className = 'px-2 py-0.5 text-[9px] font-extrabold rounded-md bg-[#EB4E70] text-white transition-colors shadow-sm';
    } else {
      btnTargetPickup.className = 'px-2 py-0.5 text-[9px] font-extrabold rounded-md text-gray-400 transition-colors';
      btnTargetDest.className = 'px-2 py-0.5 text-[9px] font-extrabold rounded-md text-gray-400 transition-colors';
    }
  },

  handleMapClick(lat, lng) {
    if (!this.activeMapTarget) return;

    const check = this.validateCoordinates(lat, lng);
    if (!check.valid) {
      showToast(check.message);
      return;
    }

    const customLoc = `[Pin Peta] (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

    if (this.activeMapTarget === 'pickup') {
      this.pickupCustomCoords = [lat, lng];
      this.pickupPoint = customLoc;
      this.updateDropdownSingleCustom('ride-pickup-point', customLoc);
      showToast('Titik penjemputan diperbarui.');
    } else if (this.activeMapTarget === 'dest') {
      this.destCustomCoords = [lat, lng];
      this.destPoint = customLoc;
      this.updateDropdownSingleCustom('ride-dest-point', customLoc);
      showToast('Titik tujuan diperbarui.');
    }

    this.activeMapTarget = null;
    this.updateMapTargetUI();
    this.onRouteChanged();
  },

  acceptLocation() {
    if (!navigator.geolocation) {
      showToast('Geolokasi tidak didukung pada perangkat ini.');
      return;
    }

    showToast('Mendeteksi lokasi GPS...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const check = this.validateCoordinates(lat, lng);

        if (!check.valid) {
          showToast(check.message);
          return;
        }

        const customLoc = `[GPS] Lokasi Terdeteksi (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
        this.pickupCustomCoords = [lat, lng];
        this.pickupPoint = customLoc;
        this.updateDropdownSingleCustom('ride-pickup-point', customLoc);

        showToast('Lokasi penjemputan diperbarui dari GPS.');
        this.onRouteChanged();
      },
      (err) => {
        showToast('Gagal mendapatkan lokasi GPS: ' + err.message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  },

  swapRoute() {
    const tempCity = this.pickupCityKey;
    this.pickupCityKey = this.destCityKey;
    this.destCityKey = tempCity;

    const tempPoint = this.pickupPoint;
    this.pickupPoint = this.destPoint;
    this.destPoint = tempPoint;

    const tempCoords = this.pickupCustomCoords;
    this.pickupCustomCoords = this.destCustomCoords;
    this.destCustomCoords = tempCoords;

    const pickupCityEl = document.getElementById('ride-pickup-city');
    const destCityEl = document.getElementById('ride-dest-city');
    const pickupPointEl = document.getElementById('ride-pickup-point');
    const destPointEl = document.getElementById('ride-dest-point');

    if (pickupCityEl) pickupCityEl.value = this.pickupCityKey;
    if (destCityEl) destCityEl.value = this.destCityKey;

    if (pickupPointEl) pickupPointEl.innerHTML = this.renderPointOptions(this.pickupCityKey, this.pickupPoint);
    if (destPointEl) destPointEl.innerHTML = this.renderPointOptions(this.destCityKey, this.destPoint);

    if (this.pickupCustomCoords) this.updateDropdownSingleCustom('ride-pickup-point', this.pickupPoint);
    if (this.destCustomCoords) this.updateDropdownSingleCustom('ride-dest-point', this.destPoint);

    showToast('Rute penjemputan dan tujuan ditukar.');
    this.onRouteChanged();
  },

  onRouteChanged() {
    this.initRideMap();
    this.renderTierGrid();
  },

  calculateDistance(coord1, coord2) {
    if (!coord1 || !coord2 || isNaN(coord1[0]) || isNaN(coord2[0])) return 3.8;

    const R = 6371;
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const straightDist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const roadDist = straightDist * 1.35;
    return Math.max(1.2, Math.round(roadDist * 10) / 10);
  },

  getNearbyDriversCoords(centerCoord) {
    const count = Math.floor(Math.random() * 5) + 4;
    const coords = [];
    for (let i = 0; i < count; i++) {
      const latOffset = (Math.random() - 0.5) * 0.018; 
      const lngOffset = (Math.random() - 0.5) * 0.018;
      coords.push([centerCoord[0] + latOffset, centerCoord[1] + lngOffset]);
    }
    return coords;
  },

  initRideMap() {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }

    const pickupCoord = this.getCoordinates(this.pickupCityKey, this.pickupPoint, 'pickup');
    const destCoord = this.getCoordinates(this.destCityKey, this.destPoint, 'dest');

    const dist = this.calculateDistance(pickupCoord, destCoord);
    const etaMin = Math.round(dist * 2.2 + 3);

    const distLabel = document.getElementById('ride-route-dist');
    if (distLabel) distLabel.innerText = `${dist} km • ETA ${etaMin} mnt`;

    const map = L.map('ride-map', { zoomControl: false, attributionControl: false }).setView(pickupCoord, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    map.on('click', (e) => {
      this.handleMapClick(e.latlng.lat, e.latlng.lng);
    });

    const waveIcon = L.divIcon({
      className: '',
      html: `
        <div class="map-radar-wrapper">
          <div class="map-radar-wave"></div>
          <div class="map-radar-wave w2"></div>
          <div class="map-radar-wave w3"></div>
        </div>
      `,
      iconSize: [100, 100],
      iconAnchor: [50, 50]
    });
    
    L.marker(pickupCoord, { icon: waveIcon, zIndexOffset: -100 }).addTo(map);

    const driverCoords = this.getNearbyDriversCoords(pickupCoord);
    driverCoords.forEach(coord => {
      const driverDotIcon = L.divIcon({
        className: '',
        html: `<div class="ojek-dot-icon" title="Motor Sekitar"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
      L.marker(coord, { icon: driverDotIcon, zIndexOffset: 50 }).addTo(map);
    });

    const createPin = (label, color) => L.divIcon({
      className: 'custom-ride-pin',
      html: `<div style="transform: translate(-50%, -100%); background:#1F2937; color:${color}; padding:3px 7px; border-radius:8px; font-weight:800; font-size:9px; border:1px solid ${color}; box-shadow:0 2px 6px rgba(0,0,0,0.3); white-space:nowrap;">${label}</div>`,
      iconAnchor: [0, 0]
    });

    L.marker(pickupCoord, { icon: createPin('Jemput', '#10B981') }).addTo(map);
    L.marker(destCoord, { icon: createPin('Tujuan', '#EB4E70') }).addTo(map);

    const polyline = L.polyline([pickupCoord, destCoord], {
      color: '#EB4E70',
      weight: 4,
      opacity: 0.85,
      dashArray: '6, 6'
    }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [35, 35] });
    this.mapInstance = map;
  },

  // Dynamic Fare Calculation Benchmark (Aligned with Indonesian Gojek/Grab Rates)
  getTiers() {
    const pickupCoord = this.getCoordinates(this.pickupCityKey, this.pickupPoint, 'pickup');
    const destCoord = this.getCoordinates(this.destCityKey, this.destPoint, 'dest');
    const dist = this.calculateDistance(pickupCoord, destCoord);
    const platformFee = 2000;

    const calcPrice = (baseFare, perKmRate) => {
      const distanceFare = dist <= 2.0 ? baseFare : baseFare + ((dist - 2.0) * perKmRate);
      const total = distanceFare + platformFee;
      return Math.round(total / 500) * 500;
    };

    return [
      { id: 'RIDE-MOTOR-ECO', name: 'NusaRide Hemat', eta: '5-8 mnt', price: calcPrice(7000, 2400), desc: 'Ojek ekonomis hemat rute harian' },
      { id: 'RIDE-MOTOR-STD', name: 'NusaRide Reguler', eta: '2-4 mnt', price: calcPrice(9000, 2800), desc: 'Respon cepat driver standar Nusa' },
      { id: 'RIDE-MOTOR-PRIO', name: 'NusaRide Prioritas', eta: '1-2 mnt', price: calcPrice(12000, 3600), desc: 'Prioritas penjemputan terdepan & driver top' }
    ];
  },

  renderTierGrid() {
    const gridContainer = document.getElementById('ride-tier-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const tiers = this.getTiers();
    const activeTier = tiers.find(t => t.id === this.selectedTier) || tiers[1];

    tiers.forEach((tier) => {
      const isSelected = tier.id === this.selectedTier;
      const btn = document.createElement('div');
      btn.className = `ride-tier-card p-2.5 rounded-xl border border-[var(--border-color)] bg-gray-50 dark:bg-[#2A141A] text-center space-y-1 ${isSelected ? 'active' : ''}`;
      
      btn.innerHTML = `
        <span class="text-[9px] font-bold text-gray-400 block uppercase">${tier.eta}</span>
        <span class="text-xs font-black text-[var(--text-main)] block">${tier.name}</span>
        <span class="text-[11px] font-extrabold text-[#EB4E70] block">Rp ${(tier.price / 1000).toFixed(1)}rb</span>
      `;

      btn.onclick = () => {
        this.playAudio('pop');
        this.selectedTier = tier.id;
        this.renderTierGrid();
      };

      gridContainer.appendChild(btn);
    });

    const priceVal = document.getElementById('ride-price-val');
    const tierName = document.getElementById('ride-tier-name');
    const tierDesc = document.getElementById('ride-tier-desc');
    const etaBadge = document.getElementById('ride-eta-badge');

    if (priceVal) priceVal.innerText = `Rp ${activeTier.price.toLocaleString('id-ID')}`;
    if (tierName) tierName.innerText = activeTier.name;
    if (tierDesc) tierDesc.innerText = activeTier.desc;
    if (etaBadge) etaBadge.innerText = `Jemput: ${activeTier.eta}`;
  },

  processBooking() {
    if (!this.mapInstance) {
      showToast('Peta dan rute sedang dimuat, harap tunggu sebentar...');
      return;
    }

    const pickupCoord = this.getCoordinates(this.pickupCityKey, this.pickupPoint, 'pickup');
    const destCoord = this.getCoordinates(this.destCityKey, this.destPoint, 'dest');

    const pickupCheck = this.validateCoordinates(pickupCoord[0], pickupCoord[1]);
    const destCheck = this.validateCoordinates(destCoord[0], destCoord[1]);

    if (!pickupCheck.valid) {
      showToast(pickupCheck.message);
      return;
    }

    if (!destCheck.valid) {
      showToast(destCheck.message);
      return;
    }

    const dist = this.calculateDistance(pickupCoord, destCoord);

    if (dist > 60) {
      showToast('Jarak terlalu jauh (~' + dist + ' km). Maksimal perjalanan motor NusaRide adalah 60 km.');
      return;
    }

    const activeTier = this.getTiers().find(t => t.id === this.selectedTier);
    if (!activeTier) return;

    if (window.userBalance !== undefined && window.userBalance < activeTier.price) {
      showToast('Saldo Nusa Balance tidak mencukupi untuk pemesanan ini.');
      return;
    }

    showToast('Mencari Driver Ojek Terdekat...');
    this.startSearchingDriver();
  },

  startSearchingDriver() {
    const modal = document.getElementById('ride-search-modal');
    const searchingBox = document.getElementById('ride-search-searching');
    const foundBox = document.getElementById('ride-search-found');

    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
    if (searchingBox) searchingBox.classList.remove('hidden');
    if (foundBox) foundBox.classList.add('hidden');

    const randomName = this.driversPool.names[Math.floor(Math.random() * this.driversPool.names.length)];
    const randomBike = this.driversPool.bikes[Math.floor(Math.random() * this.driversPool.bikes.length)];
    const randomSuffix = this.driversPool.plateSuffixes[Math.floor(Math.random() * this.driversPool.plateSuffixes.length)];
    const randomPlate = `DD ${Math.floor(1000 + Math.random() * 8999)} ${randomSuffix}`;

    this.assignedDriver = {
      name: randomName,
      bike: randomBike,
      plate: randomPlate,
      rating: (4.7 + Math.random() * 0.3).toFixed(1)
    };

    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.playAudio('chime');
      if (searchingBox) searchingBox.classList.add('hidden');
      if (foundBox) {
        const dName = document.getElementById('driver-name');
        const dBike = document.getElementById('driver-bike');
        const dPlate = document.getElementById('driver-plate');
        const dRating = document.getElementById('driver-rating');

        if (dName) dName.innerText = this.assignedDriver.name;
        if (dBike) dBike.innerText = this.assignedDriver.bike;
        if (dPlate) dPlate.innerText = this.assignedDriver.plate;
        if (dRating) dRating.innerText = this.assignedDriver.rating;

        foundBox.classList.remove('hidden');
      }
      showToast('Driver NusaRide ditemukan!');
    }, 3200);
  },

  stopSearchingDriver() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    const modal = document.getElementById('ride-search-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  },

  confirmBookingAndPay() {
    this.stopSearchingDriver();
    const activeTier = this.getTiers().find(t => t.id === this.selectedTier);
    if (!activeTier) return;

    if (window.deductBalance) {
      window.deductBalance(activeTier.price, 'NusaRide');
    }

    this.showSuccessModal(activeTier, this.assignedDriver);
  },

  showSuccessModal(activeTier, driver) {
    const modal = document.getElementById('checkout-success-modal');
    if (!modal) {
      showToast(`Pesanan NusaRide berhasil! Total: Rp ${activeTier.price.toLocaleString('id-ID')}`);
      return;
    }

    const amountEl = document.getElementById('checkout-success-amount');
    const subtitleEl = document.getElementById('checkout-success-subtitle');

    if (amountEl) amountEl.innerText = `Rp ${activeTier.price.toLocaleString('id-ID')}`;
    if (subtitleEl) {
      subtitleEl.innerText = `NusaRide (${activeTier.name}) • ${driver ? driver.name : 'Driver Ojek'} [${driver ? driver.plate : ''}]`;
    }

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
};

export function renderNusaRide(container, soundEngine = null) {
  NusaRide.init(container, soundEngine);
}