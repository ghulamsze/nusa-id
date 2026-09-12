import { showToast } from '../utils/toast.js';
import { t } from '../utils/i18n.js';

/**
 * NusaCar.js - Car Ride-Hailing Module for Nusa Super-App (2026)
 * Senior Front-End Architecture: Pure ES6 Module, Glassmorphism UI, Tactile Audio,
 * Interactive Leaflet Map Visualizer, GoCar/GrabCar Real-Time Pricing, and Nusa Balance payment integration.
 * 
 * STRICT NO-EMOJI CONSTRAINT: Uses clean inline SVG vectors only.
 */

const svgIcons = {
  car: (color = 'currentColor', size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H7c-.7 0-1.3.3-1.8.7C4.3 8.6 3 10 3 10s-2.7.6-4.5 1.1C-2.3 11.3-3 12.1-3 13v3c0 .6.4 1 1 1h2"/>
      <circle cx="7" cy="17" r="2"/>
      <circle cx="17" cy="17" r="2"/>
      <path d="M5 10l2-4h10l2 4"/>
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
    </svg>`,

  userGroup: (color = 'currentColor', size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`
};

export const NusaCar = {
  cities: {
    MAK: 'Makassar',
    GOW: 'Gowa',
    MAR: 'Maros',
    TAK: 'Takalar'
  },

  quickChips: [
    { label: 'Bandara UPG', point: '[Transit] Bandara Internasional Sultan Hasanuddin (UPG)', city: 'MAR' },
    { label: 'Mall MP', point: '[Mall] Mall Panakkukang (MP)', city: 'MAK' },
    { label: 'TSM Makassar', point: '[Mall] Trans Studio Mall (TSM)', city: 'MAK' },
    { label: 'Kampus UNHAS', point: '[Kampus] UNHAS Tamalanrea', city: 'MAK' }
  ],

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
      { name: '[Mall] Trans Studio Mall (TSM)', coords: [-5.1608, 119.3935] },
      { name: '[Mall] Nipah Park (Nipah Mall)', coords: [-5.1375, 119.4525] },
      { name: '[Mall] Mall Ratu Indah (MaRi)', coords: [-5.1565, 119.4158] },
      { name: '[Kampus] UNHAS Tamalanrea', coords: [-5.1330, 119.4860] },
      { name: '[Kampus] UINAM Kampus 1 (Sultan Alauddin)', coords: [-5.1828, 119.4358] },
      { name: '[Kampus] UNM Gunungsari', coords: [-5.1685, 119.4360] },
      { name: '[Hunian] CitraLand City CPI Makassar (Sunset Quay)', coords: [-5.1478, 119.3975] },
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
    names: ['Daeng Sewang', 'Andi Rahmat', 'Syamsuddin Jalil', 'Muhammad Aris', 'Hendra Wijaya', 'Dg. Mile', 'Bambang Irawan'],
    cars: ['Toyota Avanza Veloz Hitam', 'Honda Brio RS Merah', 'Mitsubishi Xpander Putih', 'Toyota Calya Silver', 'Hyundai Ioniq 5 EV Hitam'],
    plateSuffixes: ['AB', 'DD', 'KS', 'KM', 'UA', 'RZ']
  },

  // State Management
  pickupCityKey: 'MAK',
  pickupPoint: '[Mall] Mall Panakkukang (MP)',
  destCityKey: 'MAR',
  destPoint: '[Transit] Bandara Internasional Sultan Hasanuddin (UPG)',
  passengerName: 'User NUSA',
  selectedTier: 'CAR-STD',
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
      <div id="nusacar-engine-panel" class="space-y-4 max-w-full overflow-hidden text-[var(--text-main)]">
        
        <!-- Main Form Card -->
        <div class="tactile-card p-4 space-y-4 overflow-hidden relative backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl">
          
          <!-- Header Bar -->
          <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">LAYANAN MOBIL</span>
            <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FDE5E7] text-[#EB4E70] font-extrabold">NusaCar 2026</span>
          </div>

          <!-- Quick Chips Selection -->
          <div class="space-y-1.5 pb-2">
            <label class="text-[10px] font-bold text-gray-400 block uppercase tracking-wide">Tujuan Populer Mobil</label>
            <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              ${this.quickChips.map(chip => `
                <button data-chip-point="${chip.point}" data-chip-city="${chip.city}" class="car-quick-chip shrink-0 px-3 py-1.5 bg-gray-100 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl text-[10px] font-extrabold text-gray-300 hover:border-[#EB4E70] hover:text-[#EB4E70] transition-colors btn-tactile">
                  ${chip.label}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Pickup & Destination Inputs with Swap Button -->
          <div class="space-y-3 relative">
            
            <!-- Pickup Input Group -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 block uppercase tracking-wide">LOKASI PENJEMPUTAN</label>
              <div class="flex items-center gap-2 w-full min-w-0">
                <select id="car-pickup-city" class="w-28 shrink-0 p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-extrabold text-xs text-[#EB4E70] outline-none focus:border-[#EB4E70]">
                  ${this.renderCityOptions(this.pickupCityKey)}
                </select>
                <select id="car-pickup-point" class="flex-1 min-w-0 p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70] truncate">
                  ${this.renderPointOptions(this.pickupCityKey, this.pickupPoint)}
                </select>
                <button id="car-gps-btn" title="Gunakan Lokasi GPS Saat Ini" class="w-9 h-9 shrink-0 rounded-xl bg-gray-100 dark:bg-[#2A141A] border border-[var(--border-color)] text-[#EB4E70] flex items-center justify-center btn-tactile font-black text-xs hover:border-[#EB4E70] active:scale-90 transition-transform">
                  ${svgIcons.gps('#EB4E70', 16)}
                </button>
              </div>
            </div>

            <!-- Centered Swap Button -->
            <div class="relative flex justify-center -my-2 z-20">
              <button id="car-swap-btn" title="Tukar Rute Penjemputan & Tujuan" class="w-8 h-8 rounded-full bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white flex items-center justify-center shadow-lg btn-tactile active:scale-90 transition-transform">
                <div id="car-swap-icon-container" class="transition-transform duration-500 ease-out flex items-center justify-center">
                  ${svgIcons.swap(16)}
                </div>
              </button>
            </div>

            <!-- Destination Input Group -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold text-gray-400 block uppercase tracking-wide">LOKASI TUJUAN</label>
              <div class="flex items-center gap-2 w-full min-w-0">
                <select id="car-dest-city" class="w-28 shrink-0 p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-extrabold text-xs text-[#EB4E70] outline-none focus:border-[#EB4E70]">
                  ${this.renderCityOptions(this.destCityKey)}
                </select>
                <select id="car-dest-point" class="flex-1 min-w-0 p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70] truncate">
                  ${this.renderPointOptions(this.destCityKey, this.destPoint)}
                </select>
              </div>
            </div>

            <!-- Passenger Name -->
            <div class="flex items-center justify-between bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <span class="text-[11px] font-bold text-gray-400 uppercase">Nama Pemesan:</span>
              <input type="text" id="car-passenger-input" value="${this.passengerName}" class="bg-transparent text-right font-extrabold text-xs text-[var(--text-main)] outline-none w-1/2 focus:text-[#EB4E70]" />
            </div>
          </div>

          <!-- Interactive Route Map -->
          <div class="space-y-1.5 pt-1">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold text-gray-400 block uppercase tracking-wide">Peta Jalur & Mobil Sekitar</label>
              <div class="flex gap-1 bg-gray-100 dark:bg-[#2A141A] p-0.5 rounded-lg border border-[var(--border-color)]">
                <button id="car-map-target-pickup" class="px-2 py-0.5 text-[9px] font-extrabold rounded-md text-gray-400 transition-colors">Set Jemput</button>
                <button id="car-map-target-dest" class="px-2 py-0.5 text-[9px] font-extrabold rounded-md text-gray-400 transition-colors">Set Tujuan</button>
              </div>
            </div>

            <div class="relative w-full h-48 rounded-2xl border border-[var(--border-color)] overflow-hidden z-10 shadow-inner">
              <div id="car-map" class="w-full h-full cursor-crosshair"></div>
            </div>
            
            <div class="flex justify-between items-center text-[9px] text-gray-400 font-semibold px-1">
              <span>* Klik peta untuk menentukan titik jemput/tujuan.</span>
              <span id="car-route-dist" class="font-black text-[#EB4E70]"></span>
            </div>
          </div>
        </div>

        <!-- Option Cards & Fare Summary -->
        <div class="tactile-card p-4 space-y-4 backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl">
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-extrabold text-gray-300 uppercase tracking-wide">Pilihan Armada NusaCar</h3>
            <span id="car-eta-badge" class="text-[10px] font-extrabold text-[#EB4E70] bg-[#FDE5E7] dark:bg-[#2A141A] px-2 py-0.5 rounded-md"></span>
          </div>

          <!-- Dynamic Option Tiers Grid -->
          <div id="car-tier-grid" class="grid grid-cols-2 gap-2"></div>

          <!-- Active Tier Price Summary -->
          <div id="car-price-summary" class="bg-gray-50 dark:bg-[#2A141A] p-3 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
            <div>
              <span class="text-[9px] text-gray-400 font-bold block uppercase">Total Tarif (Saldo NUSA)</span>
              <span id="car-price-val" class="text-lg font-black text-[#EB4E70]">Rp 0</span>
            </div>
            <div class="text-right">
              <span id="car-tier-name" class="text-xs font-extrabold text-[var(--text-main)] block"></span>
              <span id="car-tier-desc" class="text-[9px] text-gray-400 font-bold block"></span>
            </div>
          </div>

          <!-- Submit Order Button -->
          <button id="car-submit-btn" class="w-full py-3.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white text-xs font-black rounded-xl shadow-lg btn-tactile active:scale-95 transition-transform flex items-center justify-center">
            Pesan NusaCar Sekarang
          </button>
        </div>
      </div>

      <!-- Real-Time Driver Search Modal -->
      <div id="car-search-modal" class="hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-white dark:bg-[#1A0B10] p-6 rounded-3xl max-w-xs w-full text-center space-y-4 shadow-2xl border border-[#EB4E70]/30 relative overflow-hidden">
          
          <div id="car-search-searching" class="space-y-4">
            <div class="radar-box relative w-24 h-24 mx-auto flex items-center justify-center">
              <div class="radar-circle"></div>
              <div class="radar-circle delay-1"></div>
              <div class="radar-sweep"></div>
              <span class="relative z-10 text-[#EB4E70] animate-pulse">
                ${svgIcons.car('#EB4E70', 36)}
              </span>
            </div>
            <div>
              <h3 class="text-sm font-black text-[var(--text-main)]">Mencari Driver NusaCar Terdekat...</h3>
              <p class="text-[11px] text-gray-400 mt-1 font-semibold">Mencocokkan armada mobil terbaik di sekitar Anda.</p>
            </div>
            <button id="car-cancel-search-btn" class="text-xs text-gray-400 font-extrabold hover:text-[#EB4E70] transition-colors">
              Batal Mencari
            </button>
          </div>

          <div id="car-search-found" class="hidden space-y-4 text-left relative">
            <button id="car-cancel-found-btn" title="Batal Pesanan" class="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gray-100 dark:bg-[#2A141A] text-gray-400 hover:text-[#EB4E70] flex items-center justify-center text-xs font-bold transition-colors border border-[var(--border-color)]">
              ✕
            </button>
            
            <div class="text-center -mt-1 pb-1">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[11px] font-black mb-2 shadow-sm">
                ${svgIcons.check('#10B981', 12)} Driver Ditemukan!
              </span>
              <h3 class="text-sm font-black text-[var(--text-main)]">Driver Mobil Menuju Lokasi Jemput</h3>
            </div>

            <div class="bg-gray-50 dark:bg-[#2A141A] p-3 rounded-2xl border border-[var(--border-color)] space-y-2.5">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#EB4E70]/20 text-[#EB4E70] flex items-center justify-center shrink-0">
                  ${svgIcons.car('#EB4E70', 20)}
                </div>
                <div class="flex-1 min-w-0">
                  <h4 id="car-driver-name" class="font-extrabold text-xs text-[var(--text-main)] truncate"></h4>
                  <div class="flex items-center gap-1 text-[10px] font-bold text-amber-500 mt-0.5">
                    ${svgIcons.star('#F59E0B', 12)} <span id="car-driver-rating"></span>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between items-center text-xs">
                <div>
                  <span class="text-[9px] text-gray-400 font-bold block uppercase">Mobil</span>
                  <span id="car-driver-vehicle" class="font-extrabold text-[var(--text-main)]"></span>
                </div>
                <div class="text-right">
                  <span class="text-[9px] text-gray-400 font-bold block uppercase">Plat Nomor</span>
                  <span id="car-driver-plate" class="font-black text-[#EB4E70] bg-[#EB4E70]/10 px-2 py-0.5 rounded-md"></span>
                </div>
              </div>
            </div>

            <button id="car-close-found-btn" class="w-full py-2.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white text-xs font-black rounded-xl shadow-md btn-tactile active:scale-95 transition-transform">
              Bayar Via Saldo NUSA & Lacak Driver
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
    if (document.getElementById('nusacar-styles')) return;
    const style = document.createElement('style');
    style.id = 'nusacar-styles';
    style.innerHTML = `
      .car-tier-card { transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; }
      .car-tier-card.active { border-color: #EB4E70 !important; background-color: rgba(235, 78, 112, 0.1) !important; transform: translateY(-2px); }
      .car-dot-icon { width: 14px; height: 14px; background-color: #2563EB; border: 2px solid #FFFFFF; border-radius: 50%; box-shadow: 0 0 8px #2563EB; animation: carBlink 1.4s ease-in-out infinite alternate; }
      @keyframes carBlink { 0% { opacity: 0.4; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1.2); } }
    `;
    document.head.appendChild(style);
  },

  getSurgeMultiplier() {
    const hour = new Date().getHours();
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      return { surge: 1.25, reason: 'Jam Sibuk' };
    } else if (hour >= 22 || hour <= 4) {
      return { surge: 1.15, reason: 'Malam/Dini Hari' };
    }
    return { surge: 1.0, reason: 'Normal' };
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
      return { valid: false, message: 'Lokasi berada di area laut! Pilih titik daratan.' };
    }

    if (lat < -5.1100 && lat > -5.1700 && lng < 119.3930) {
      const isCPILand = (lat <= -5.1400 && lat >= -5.1520 && lng >= 119.3950);
      if (!isCPILand) {
        return { valid: false, message: 'Lokasi penjemputan terlalu dekat perairan CPI!' };
      }
    }

    if (!this.isPointInLand(lat, lng)) {
      return { valid: false, message: 'Lokasi di luar area operasional NusaCar Mamminasata.' };
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
            this.updateDropdownSingleCustom('car-pickup-point', customLoc);
          }
          this.onRouteChanged();
        },
        () => { this.onRouteChanged(); },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      this.onRouteChanged();
    }
  },

  bindEvents() {
    const chips = document.querySelectorAll('.car-quick-chip');
    chips.forEach(chip => {
      chip.onclick = () => {
        this.playAudio('pop');
        this.destCityKey = chip.dataset.chipCity;
        this.destPoint = chip.dataset.chipPoint;
        this.destCustomCoords = null;

        const destCitySelect = document.getElementById('car-dest-city');
        const destPointSelect = document.getElementById('car-dest-point');

        if (destCitySelect) destCitySelect.value = this.destCityKey;
        if (destPointSelect) destPointSelect.innerHTML = this.renderPointOptions(this.destCityKey, this.destPoint);

        showToast(`Tujuan diatur ke ${chip.innerText.trim()}`);
        this.onRouteChanged();
      };
    });

    const pickupCitySelect = document.getElementById('car-pickup-city');
    const pickupPointSelect = document.getElementById('car-pickup-point');
    const destCitySelect = document.getElementById('car-dest-city');
    const destPointSelect = document.getElementById('car-dest-point');

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

    const btnTargetPickup = document.getElementById('car-map-target-pickup');
    const btnTargetDest = document.getElementById('car-map-target-dest');

    if (btnTargetPickup && btnTargetDest) {
      btnTargetPickup.onclick = () => {
        this.playAudio('click');
        this.activeMapTarget = this.activeMapTarget === 'pickup' ? null : 'pickup';
        this.updateMapTargetUI();
      };

      btnTargetDest.onclick = () => {
        this.playAudio('click');
        this.activeMapTarget = this.activeMapTarget === 'dest' ? null : 'dest';
        this.updateMapTargetUI();
      };
    }

    const swapBtn = document.getElementById('car-swap-btn');
    if (swapBtn) {
      swapBtn.onclick = () => {
        this.playAudio('pop');
        this.swapRotation += 180;
        const iconContainer = document.getElementById('car-swap-icon-container');
        if (iconContainer) iconContainer.style.transform = `rotate(${this.swapRotation}deg)`;
        this.swapRoute();
      };
    }

    const gpsBtn = document.getElementById('car-gps-btn');
    if (gpsBtn) {
      gpsBtn.onclick = () => {
        this.playAudio('click');
        this.acceptLocation();
      };
    }

    const passengerInput = document.getElementById('car-passenger-input');
    if (passengerInput) {
      passengerInput.oninput = (e) => {
        this.passengerName = e.target.value.trim() || 'User NUSA';
      };
    }

    const submitBtn = document.getElementById('car-submit-btn');
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

    const cancelSearchBtn = document.getElementById('car-cancel-search-btn');
    if (cancelSearchBtn) {
      cancelSearchBtn.onclick = () => {
        this.playAudio('pop');
        this.stopSearchingDriver();
      };
    }

    const cancelFoundBtn = document.getElementById('car-cancel-found-btn');
    if (cancelFoundBtn) {
      cancelFoundBtn.onclick = () => {
        this.playAudio('pop');
        this.stopSearchingDriver();
        showToast('Pemesanan NusaCar dibatalkan.');
      };
    }

    const closeFoundBtn = document.getElementById('car-close-found-btn');
    if (closeFoundBtn) {
      closeFoundBtn.onclick = () => {
        this.playAudio('chime');
        this.confirmBookingAndPay();
      };
    }
  },

  updateMapTargetUI() {
    const btnTargetPickup = document.getElementById('car-map-target-pickup');
    const btnTargetDest = document.getElementById('car-map-target-dest');
    if (!btnTargetPickup || !btnTargetDest) return;

    if (this.activeMapTarget === 'pickup') {
      btnTargetPickup.className = 'px-2 py-0.5 text-[9px] font-extrabold rounded-md bg-[#EB4E70] text-white transition-colors shadow-sm';
      btnTargetDest.className = 'px-2 py-0.5 text-[9px] font-extrabold rounded-md text-gray-400 transition-colors';
      showToast('Mode Peta: Klik lokasi penjemputan');
    } else if (this.activeMapTarget === 'dest') {
      btnTargetPickup.className = 'px-2 py-0.5 text-[9px] font-extrabold rounded-md text-gray-400 transition-colors';
      btnTargetDest.className = 'px-2 py-0.5 text-[9px] font-extrabold rounded-md bg-[#EB4E70] text-white transition-colors shadow-sm';
      showToast('Mode Peta: Klik lokasi tujuan');
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
      this.updateDropdownSingleCustom('car-pickup-point', customLoc);
      showToast('Titik penjemputan mobil diperbarui.');
    } else if (this.activeMapTarget === 'dest') {
      this.destCustomCoords = [lat, lng];
      this.destPoint = customLoc;
      this.updateDropdownSingleCustom('car-dest-point', customLoc);
      showToast('Titik tujuan diperbarui.');
    }

    this.activeMapTarget = null;
    this.updateMapTargetUI();
    this.onRouteChanged();
  },

  acceptLocation() {
    if (!navigator.geolocation) {
      showToast('Geolokasi tidak didukung.');
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
        this.updateDropdownSingleCustom('car-pickup-point', customLoc);

        showToast('Lokasi penjemputan diperbarui dari GPS.');
        this.onRouteChanged();
      },
      (err) => { showToast('Gagal mendapatkan lokasi GPS: ' + err.message); },
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

    const pickupCityEl = document.getElementById('car-pickup-city');
    const destCityEl = document.getElementById('car-dest-city');
    const pickupPointEl = document.getElementById('car-pickup-point');
    const destPointEl = document.getElementById('car-dest-point');

    if (pickupCityEl) pickupCityEl.value = this.pickupCityKey;
    if (destCityEl) destCityEl.value = this.destCityKey;

    if (pickupPointEl) pickupPointEl.innerHTML = this.renderPointOptions(this.pickupCityKey, this.pickupPoint);
    if (destPointEl) destPointEl.innerHTML = this.renderPointOptions(this.destCityKey, this.destPoint);

    if (this.pickupCustomCoords) this.updateDropdownSingleCustom('car-pickup-point', this.pickupPoint);
    if (this.destCustomCoords) this.updateDropdownSingleCustom('car-dest-point', this.destPoint);

    showToast('Rute penjemputan dan tujuan ditukar.');
    this.onRouteChanged();
  },

  onRouteChanged() {
    this.initCarMap();
    this.renderTierGrid();
  },

  calculateDistance(coord1, coord2) {
    if (!coord1 || !coord2 || isNaN(coord1[0]) || isNaN(coord2[0])) return 5.2;

    const R = 6371;
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const straightDist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const roadDist = straightDist * 1.35;
    return Math.max(1.5, Math.round(roadDist * 10) / 10);
  },

  getNearbyDriversCoords(centerCoord) {
    const count = Math.floor(Math.random() * 4) + 3;
    const coords = [];
    for (let i = 0; i < count; i++) {
      const latOffset = (Math.random() - 0.5) * 0.02; 
      const lngOffset = (Math.random() - 0.5) * 0.02;
      coords.push([centerCoord[0] + latOffset, centerCoord[1] + lngOffset]);
    }
    return coords;
  },

  initCarMap() {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }

    const pickupCoord = this.getCoordinates(this.pickupCityKey, this.pickupPoint, 'pickup');
    const destCoord = this.getCoordinates(this.destCityKey, this.destPoint, 'dest');

    const dist = this.calculateDistance(pickupCoord, destCoord);
    const etaMin = Math.round(dist * 2.5 + 4);

    const distLabel = document.getElementById('car-route-dist');
    if (distLabel) distLabel.innerText = `${dist} km • ETA ${etaMin} mnt`;

    const map = L.map('car-map', { zoomControl: false, attributionControl: false }).setView(pickupCoord, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    map.on('click', (e) => {
      this.handleMapClick(e.latlng.lat, e.latlng.lng);
    });

    const driverCoords = this.getNearbyDriversCoords(pickupCoord);
    driverCoords.forEach(coord => {
      const carDotIcon = L.divIcon({
        className: '',
        html: `<div class="car-dot-icon" title="Mobil Sekitar"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      });
      L.marker(coord, { icon: carDotIcon, zIndexOffset: 50 }).addTo(map);
    });

    const createPin = (label, color) => L.divIcon({
      className: 'custom-car-pin',
      html: `<div style="transform: translate(-50%, -100%); background:#1F2937; color:${color}; padding:3px 7px; border-radius:8px; font-weight:800; font-size:9px; border:1px solid ${color}; box-shadow:0 2px 6px rgba(0,0,0,0.3); white-space:nowrap;">${label}</div>`,
      iconAnchor: [0, 0]
    });

    L.marker(pickupCoord, { icon: createPin('Jemput', '#10B981') }).addTo(map);
    L.marker(destCoord, { icon: createPin('Tujuan', '#EB4E70') }).addTo(map);

    const polyline = L.polyline([pickupCoord, destCoord], {
      color: '#2563EB',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8'
    }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [35, 35] });
    this.mapInstance = map;
  },

  getTiers() {
    const pickupCoord = this.getCoordinates(this.pickupCityKey, this.pickupPoint, 'pickup');
    const destCoord = this.getCoordinates(this.destCityKey, this.destPoint, 'dest');
    const dist = this.calculateDistance(pickupCoord, destCoord);
    
    const { surge } = this.getSurgeMultiplier();
    const platformFee = 2500;
    const insuranceFee = 1000;

    const calcPrice = (baseFareMin, perKmRate, minKm = 4) => {
      let distanceFare = baseFareMin;
      if (dist > minKm) {
        distanceFare += (dist - minKm) * perKmRate;
      }
      const total = (distanceFare * surge) + platformFee + insuranceFee;
      return Math.round(total / 1000) * 1000;
    };

    return [
      { id: 'CAR-ECO', name: 'NusaCar Hemat', capacity: '3-4 Seat', eta: '4-7 mnt', price: calcPrice(12000, 3200), desc: 'City Car ekonomis (Brio, Agya)' },
      { id: 'CAR-STD', name: 'NusaCar Standard', capacity: '4 Seat', eta: '3-5 mnt', price: calcPrice(15000, 3800), desc: 'MPV Nyaman (Avanza, Xpander)' },
      { id: 'CAR-XL', name: 'NusaCar XL', capacity: '6 Seat', eta: '5-8 mnt', price: calcPrice(22000, 4800), desc: 'MPV Besar rombongan (Innova, XL7)' },
      { id: 'CAR-PRIO', name: 'NusaCar Priority EV', capacity: '4 Seat Premium', eta: '2-4 mnt', price: calcPrice(28000, 6200), desc: 'Mobil Listrik / SUV Premium Top Driver' }
    ];
  },

  renderTierGrid() {
    const gridContainer = document.getElementById('car-tier-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const tiers = this.getTiers();
    const activeTier = tiers.find(t => t.id === this.selectedTier) || tiers[1];

    tiers.forEach((tier) => {
      const isSelected = tier.id === this.selectedTier;
      const btn = document.createElement('div');
      btn.className = `car-tier-card p-2.5 rounded-xl border border-[var(--border-color)] bg-gray-50 dark:bg-[#2A141A] text-center space-y-1 ${isSelected ? 'active' : ''}`;
      
      btn.innerHTML = `
        <div class="flex items-center justify-between text-[9px] text-gray-400 font-bold">
          <span>${tier.eta}</span>
          <span class="flex items-center gap-0.5">${svgIcons.userGroup('#6B7280', 10)} ${tier.capacity}</span>
        </div>
        <span class="text-xs font-black text-[var(--text-main)] block truncate">${tier.name}</span>
        <span class="text-[11px] font-extrabold text-[#EB4E70] block">Rp ${(tier.price / 1000).toFixed(1)}rb</span>
      `;

      btn.onclick = () => {
        this.playAudio('pop');
        this.selectedTier = tier.id;
        this.renderTierGrid();
      };

      gridContainer.appendChild(btn);
    });

    const priceVal = document.getElementById('car-price-val');
    const tierName = document.getElementById('car-tier-name');
    const tierDesc = document.getElementById('car-tier-desc');
    const etaBadge = document.getElementById('car-eta-badge');

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

    if (dist > 150) {
      showToast('Jarak terlalu jauh (~' + dist + ' km). Maksimal perjalanan NusaCar adalah 150 km.');
      return;
    }

    const activeTier = this.getTiers().find(t => t.id === this.selectedTier);
    if (!activeTier) return;

    if (window.userBalance !== undefined && window.userBalance < activeTier.price) {
      showToast('Saldo NUSA tidak mencukupi untuk pemesanan taksi mobil ini.');
      return;
    }

    showToast('Mencari Driver Mobil Terdekat...');
    this.startSearchingDriver();
  },

  startSearchingDriver() {
    const modal = document.getElementById('car-search-modal');
    const searchingBox = document.getElementById('car-search-searching');
    const foundBox = document.getElementById('car-search-found');

    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
    if (searchingBox) searchingBox.classList.remove('hidden');
    if (foundBox) foundBox.classList.add('hidden');

    const randomName = this.driversPool.names[Math.floor(Math.random() * this.driversPool.names.length)];
    const randomCar = this.driversPool.cars[Math.floor(Math.random() * this.driversPool.cars.length)];
    const randomSuffix = this.driversPool.plateSuffixes[Math.floor(Math.random() * this.driversPool.plateSuffixes.length)];
    const randomPlate = `DD ${Math.floor(1000 + Math.random() * 8999)} ${randomSuffix}`;

    this.assignedDriver = {
      name: randomName,
      vehicle: randomCar,
      plate: randomPlate,
      rating: (4.8 + Math.random() * 0.2).toFixed(1)
    };

    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.playAudio('chime');
      if (searchingBox) searchingBox.classList.add('hidden');
      if (foundBox) {
        const dName = document.getElementById('car-driver-name');
        const dVehicle = document.getElementById('car-driver-vehicle');
        const dPlate = document.getElementById('car-driver-plate');
        const dRating = document.getElementById('car-driver-rating');

        if (dName) dName.innerText = this.assignedDriver.name;
        if (dVehicle) dVehicle.innerText = this.assignedDriver.vehicle;
        if (dPlate) dPlate.innerText = this.assignedDriver.plate;
        if (dRating) dRating.innerText = this.assignedDriver.rating;

        foundBox.classList.remove('hidden');
      }
      showToast('Driver NusaCar ditemukan!');
    }, 3200);
  },

  stopSearchingDriver() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    const modal = document.getElementById('car-search-modal');
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
      window.deductBalance(activeTier.price, 'NusaCar');
    }

    this.showSuccessModal(activeTier, this.assignedDriver);
  },

  showSuccessModal(activeTier, driver) {
    const modal = document.getElementById('checkout-success-modal');
    if (!modal) {
      showToast(`Pesanan NusaCar berhasil! Total: Rp ${activeTier.price.toLocaleString('id-ID')}`);
      return;
    }

    const amountEl = document.getElementById('checkout-success-amount');
    const subtitleEl = document.getElementById('checkout-success-subtitle');

    if (amountEl) amountEl.innerText = `Rp ${activeTier.price.toLocaleString('id-ID')}`;
    if (subtitleEl) {
      subtitleEl.innerText = `NusaCar (${activeTier.name}) • ${driver ? driver.name : 'Driver Mobil'} [${driver ? driver.plate : ''}]`;
    }

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
};

export function renderNusaCar(container, soundEngine = null) {
  NusaCar.init(container, soundEngine);
}

export default NusaCar;