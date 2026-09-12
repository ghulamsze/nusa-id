import { showToast } from '../utils/toast.js';
import { t } from '../utils/i18n.js';

/**
 * NusaFly.js - Enterprise Flight Booking Module for Nusa Super-App (2026)
 * Strict No-Emoji & Visual Constraint: All icons use clean inline SVG vectors.
 * Preserves Leaflet interactive map, island filtering, and post-payment particle animations.
 */

// Lightweight SVG Icon Toolkit (Strict No-Emoji Rule)
const svgIcons = {
  plane: (color = 'currentColor', size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C20 7 20 5.5 19 4.5s-2.5-1-3 0L12.5 8 4.3 6.2c-.5-.1-.9.1-1.2.5l-.8.9c-.3.4-.2 1 .2 1.3L7 12l-2.5 2.5-2-.5c-.3-.1-.7 0-.9.3l-.4.5c-.2.3-.1.8.2 1l2.8 1.9 1.9 2.8c.2.3.7.4 1 .2l.5-.4c.3-.2.4-.6.3-.9l-.5-2L12 17l3.1 4.5c.3.4.9.5 1.3.2l.9-.8c.4-.3.6-.7.5-1.2z"/>
    </svg>`,
  swap: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/>
    </svg>`,
  luggage: (size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="6" y="7" width="12" height="14" rx="2"/>
      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
    </svg>`,
  check: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`,
  airlineLogos: {
    GA: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#EB4E70" fill-opacity="0.15"/><path d="M8 20L16 8L24 20" stroke="#EB4E70" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    QG: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#10B981" fill-opacity="0.15"/><path d="M9 22L23 10M23 10H14M23 10V19" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    JT: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#F59E0B" fill-opacity="0.15"/><path d="M8 16Q16 8 24 16Q16 24 8 16Z" stroke="#F59E0B" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="16" cy="16" r="3" fill="#F59E0B"/></svg>`,
    IU: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#3B82F6" fill-opacity="0.15"/><path d="M16 6L23 24L16 20L9 24L16 6Z" stroke="#3B82F6" stroke-width="2.5" stroke-linejoin="round"/></svg>`,
    SJ: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#6366F1" fill-opacity="0.15"/><circle cx="16" cy="16" r="7" stroke="#6366F1" stroke-width="2.5"/><path d="M16 9V23" stroke="#6366F1" stroke-width="2"/></svg>`,
    QZ: `<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#EF4444" fill-opacity="0.15"/><path d="M9 16H23M16 9V23" stroke="#EF4444" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    '8B': `<svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="8" fill="#14B8A6" fill-opacity="0.15"/><path d="M10 12L22 20M10 20L22 12" stroke="#14B8A6" stroke-width="2.5" stroke-linecap="round"/></svg>`
  }
};

export const NusaFly = {
  islands: ['Jawa', 'Sulawesi', 'Sumatra', 'Kalimantan', 'Bali & Nusa Tenggara', 'Papua'],

  airports: {
    UPG: { code: 'UPG', name: 'Sultan Hasanuddin', city: 'Makassar', island: 'Sulawesi', coords: [-5.0616, 119.5540] },
    MDC: { code: 'MDC', name: 'Sam Ratulangi', city: 'Manado', island: 'Sulawesi', coords: [1.5494, 124.9264] },
    SUB: { code: 'SUB', name: 'Juanda', city: 'Surabaya', island: 'Jawa', coords: [-7.3798, 112.7874] },
    CGK: { code: 'CGK', name: 'Soekarno-Hatta', city: 'Jakarta (CGK)', island: 'Jawa', coords: [-6.1256, 106.6558] },
    HLP: { code: 'HLP', name: 'Halim Perdanakusuma', city: 'Jakarta (HLP)', island: 'Jawa', coords: [-6.2656, 106.8906] },
    YIA: { code: 'YIA', name: 'Yogyakarta International', city: 'Yogyakarta', island: 'Jawa', coords: [-7.9006, 110.0538] },
    SRG: { code: 'SRG', name: 'Ahmad Yani', city: 'Semarang', island: 'Jawa', coords: [-6.9723, 110.3752] },
    DPS: { code: 'DPS', name: 'I Gusti Ngurah Rai', city: 'Bali / Denpasar', island: 'Bali & Nusa Tenggara', coords: [-8.7482, 115.1672] },
    LOP: { code: 'LOP', name: 'Zainuddin Abdul Madjid', city: 'Lombok', island: 'Bali & Nusa Tenggara', coords: [-8.7578, 116.2758] },
    KNO: { code: 'KNO', name: 'Kualanamu', city: 'Medan', island: 'Sumatra', coords: [3.6422, 98.8853] },
    PLM: { code: 'PLM', name: 'Sultan Mahmud Badaruddin II', city: 'Palembang', island: 'Sumatra', coords: [-2.8983, 104.7001] },
    BPN: { code: 'BPN', name: 'SAMS Sepinggan', city: 'Balikpapan', island: 'Kalimantan', coords: [-1.2683, 116.8947] },
    DJJ: { code: 'DJJ', name: 'Sentani', city: 'Jayapura', island: 'Papua', coords: [-2.5770, 140.5161] }
  },

  airlines: [
    { name: 'Garuda Indonesia', code: 'GA', type: 'Full-Service', cabin: '7 kg', checked: '30 kg', multiplier: 1.70, logoSvg: svgIcons.airlineLogos.GA },
    { name: 'Citilink', code: 'QG', type: 'LCC', cabin: '7 kg', checked: '20 kg', multiplier: 1.05, logoSvg: svgIcons.airlineLogos.QG },
    { name: 'Lion Air', code: 'JT', type: 'LCC', cabin: '7 kg', checked: '15 kg', multiplier: 0.90, logoSvg: svgIcons.airlineLogos.JT },
    { name: 'Super Air Jet', code: 'IU', type: 'LCC', cabin: '7 kg', checked: '20 kg', multiplier: 0.95, logoSvg: svgIcons.airlineLogos.IU },
    { name: 'Sriwijaya Air', code: 'SJ', type: 'LCC', cabin: '7 kg', checked: '20 kg', multiplier: 1.00, logoSvg: svgIcons.airlineLogos.SJ },
    { name: 'Indonesia AirAsia', code: 'QZ', type: 'LCC', cabin: '7 kg', checked: '15 kg', multiplier: 0.88, logoSvg: svgIcons.airlineLogos.QZ },
    { name: 'TransNusa', code: '8B', type: 'LCC', cabin: '7 kg', checked: '15 kg', multiplier: 0.92, logoSvg: svgIcons.airlineLogos['8B'] }
  ],

  cabinClasses: [
    { id: 'economy', label: 'Economy', multiplier: 1.0 },
    { id: 'business', label: 'Business', multiplier: 1.8 },
    { id: 'first', label: 'First Class', multiplier: 2.8 }
  ],

  originIsland: 'Sulawesi',
  destIsland: 'Jawa',
  originKey: 'UPG',
  destKey: 'SUB',
  tripType: 'oneway', // 'oneway' | 'round'
  cabinClass: 'economy',
  selectedDateStr: '',
  passengerName: 'User NUSA',
  swapRotation: 0,
  mapInstance: null,
  soundEngine: null,

  init(targetContainerId, soundEngine = null) {
    const container = typeof targetContainerId === 'string' 
      ? document.getElementById(targetContainerId) 
      : targetContainerId;
    if (!container) return;

    this.soundEngine = soundEngine || window.NusaSoundEngine;

    container.innerHTML = `
      <div id="nusafly-engine-panel" class="space-y-4">
        <div class="tactile-card p-4 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">${t('flightServiceTitle') || 'Penerbangan Lintas Pulau'}</span>
            <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FDE5E7] text-[#EB4E70] font-extrabold">NUSA Fly 2026</span>
          </div>

          <!-- Trip Type Switcher (One-Way vs Round-Trip Slider) -->
          <div class="flex items-center justify-between bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Tipe Keberangkatan</span>
            <div class="relative flex items-center bg-white dark:bg-[#140B0D] p-1 rounded-xl border border-[var(--border-color)] w-44">
              <div id="fly-trip-slider-pill" class="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#EB4E70] rounded-lg transition-all duration-300 left-1 shadow-sm"></div>
              <button id="fly-btn-oneway" class="relative z-10 w-1/2 text-center text-[11px] font-extrabold py-1 text-white transition-colors focus:outline-none">One-Way</button>
              <button id="fly-btn-round" class="relative z-10 w-1/2 text-center text-[11px] font-extrabold py-1 text-gray-400 hover:text-[var(--text-main)] transition-colors focus:outline-none">Round-Trip</button>
            </div>
          </div>

          <!-- PEMILIHAN PULAU ASAL & TUJUAN -->
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-2 bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <div class="space-y-1">
                <label class="text-[10px] font-bold text-gray-400 block uppercase">Pulau Asal</label>
                <select id="fly-origin-island-select" class="w-full p-2 bg-white dark:bg-[#140B0D] border border-[var(--border-color)] rounded-lg font-extrabold text-xs text-[#EB4E70] outline-none focus:border-[#EB4E70]">
                  ${this.renderIslandOptions(this.originIsland)}
                </select>
              </div>

              <div class="space-y-1">
                <label class="text-[10px] font-bold text-gray-400 block uppercase">Pulau Tujuan</label>
                <select id="fly-dest-island-select" class="w-full p-2 bg-white dark:bg-[#140B0D] border border-[var(--border-color)] rounded-lg font-extrabold text-xs text-[#EB4E70] outline-none focus:border-[#EB4E70]">
                  ${this.renderIslandOptions(this.destIsland)}
                </select>
              </div>
            </div>

            <!-- PEMILIHAN BANDARA -->
            <div class="flex items-center gap-2">
              <div class="flex-1 space-y-1">
                <label class="text-[10px] font-bold text-gray-400 block uppercase">Dari (Bandara Asal)</label>
                <select id="fly-origin-select" class="w-full p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70]">
                  ${this.renderAirportOptions(this.originIsland, this.originKey)}
                </select>
              </div>

              <button id="fly-swap-btn" title="${t('swapRoute') || 'Tukar Rute'}" class="mt-4 w-10 h-10 min-w-[40px] rounded-full bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white flex items-center justify-center shadow-md btn-tactile text-base font-black">
                <div id="fly-swap-icon-container" class="transition-transform duration-500 ease-out flex items-center justify-center">
                  ${svgIcons.swap(18)}
                </div>
              </button>

              <div class="flex-1 space-y-1">
                <label class="text-[10px] font-bold text-gray-400 block uppercase">Ke (Bandara Tujuan)</label>
                <select id="fly-dest-select" class="w-full p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70]">
                  ${this.renderAirportOptions(this.destIsland, this.destKey)}
                </select>
              </div>
            </div>

            <!-- Cabin Class Switcher -->
            <div class="space-y-1 bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">Kelas Kabin</label>
              <div class="grid grid-cols-3 gap-2 pt-0.5">
                ${this.cabinClasses.map(c => `
                  <button data-cabin="${c.id}" class="fly-cabin-btn py-1.5 px-2 rounded-lg text-xs font-extrabold border transition-all btn-tactile ${
                    this.cabinClass === c.id
                      ? 'bg-[#EB4E70] text-white border-[#EB4E70] shadow-sm'
                      : 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] hover:border-[#EB4E70]'
                  }">
                    ${c.label}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Passenger Input -->
            <div class="flex items-center justify-between bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <span class="text-[11px] font-bold text-gray-400 uppercase">${t('passengerName') || 'Nama Penumpang'}:</span>
              <input type="text" id="fly-passenger-input" value="${this.passengerName}" class="bg-transparent text-right font-extrabold text-xs text-[var(--text-main)] outline-none w-1/2 focus:text-[#EB4E70]" />
            </div>
          </div>
            
          <!-- Date Selector Carousel -->
          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">Tanggal Keberangkatan</label>
            </div>

            <div class="relative flex items-center">
              <button id="fly-scroll-left" class="absolute left-0 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 shadow border border-[var(--border-color)] text-[#EB4E70] font-black text-xs flex items-center justify-center -ml-2 hover:scale-110 active:scale-95 transition-transform">‹</button>
              
              <div id="fly-calendar-carousel" class="date-carousel-container flex gap-2 overflow-x-auto no-scrollbar pb-1 px-3 scroll-smooth w-full"></div>
              
              <button id="fly-scroll-right" class="absolute right-0 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 shadow border border-[var(--border-color)] text-[#EB4E70] font-black text-xs flex items-center justify-center -mr-2 hover:scale-110 active:scale-95 transition-transform">›</button>
            </div>
          </div>

          <!-- Leaflet Interactive Map & Flight Route Arc Visualizer -->
          <div class="space-y-1">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">${t('routeMap') || 'Peta Rute Penerbangan'}</label>
              <span id="fly-route-dist" class="text-[10px] font-extrabold text-[#EB4E70]"></span>
            </div>

            <div class="relative w-full h-44 rounded-2xl border border-[var(--border-color)] overflow-hidden z-10">
              <!-- Leaflet Map Container -->
              <div id="fly-map" class="w-full h-full"></div>

              <!-- Animated Flight SVG Arc Overlay -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 320 176" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="flyArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#EB4E70" stop-opacity="0.2"/>
                    <stop offset="50%" stop-color="#FD9799" stop-opacity="0.95"/>
                    <stop offset="100%" stop-color="#EB4E70" stop-opacity="0.2"/>
                  </linearGradient>
                </defs>

                <path id="fly-arc-path" d="M 40 130 Q 160 35 280 130" fill="none" stroke="url(#flyArcGrad)" stroke-width="2.5" stroke-dasharray="6 4" stroke-linecap="round"/>

                <g id="fly-moving-particle">
                  <path d="M -6 -6 L 6 0 L -6 6 L -2 0 Z" fill="#FD9799"/>
                  <circle r="4" fill="#EB4E70" opacity="0.6"/>
                  <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#fly-arc-path"/>
                  </animateMotion>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <!-- Available Flights List -->
        <div class="flex items-center justify-between px-1">
          <h2 class="text-sm font-extrabold tracking-wide">${t('availableFlights') || 'Jadwal Penerbangan Tersedia'}</h2>
          <span id="fly-count-badge" class="text-xs text-gray-400 font-bold">${t('loading') || 'Memuat...'}</span>
        </div>

        <section id="fly-results-container" class="space-y-3"></section>
      </div>
    `;

    this.bindEvents();
    this.initCalendarWindow();
    this.initFlightMap();
    this.renderFlights();
  },

  playAudio(soundType, pitchMult = 1) {
    if (this.soundEngine && typeof this.soundEngine[soundType] === 'function') {
      this.soundEngine[soundType](pitchMult);
    } else if (typeof window.playSound === 'function') {
      window.playSound(soundType);
    }
  },

  renderIslandOptions(selectedIsland) {
    return this.islands.map(is => `<option value="${is}" ${is === selectedIsland ? 'selected' : ''}>Pulau ${is}</option>`).join('');
  },

  renderAirportOptions(islandName, selectedCode) {
    const filtered = Object.keys(this.airports).filter(k => this.airports[k].island === islandName);
    if (filtered.length === 0) return `<option value="">Tidak ada bandara</option>`;

    return filtered.map(k => {
      const ap = this.airports[k];
      return `<option value="${k}" ${k === selectedCode ? 'selected' : ''}>${ap.city} (${ap.code}) - ${ap.name}</option>`;
    }).join('');
  },

  bindEvents() {
    const originIslandSelect = document.getElementById('fly-origin-island-select');
    const destIslandSelect = document.getElementById('fly-dest-island-select');
    const originSelect = document.getElementById('fly-origin-select');
    const destSelect = document.getElementById('fly-dest-select');

    originIslandSelect.onchange = (e) => {
      this.playAudio('click');
      this.originIsland = e.target.value;
      const validKeys = Object.keys(this.airports).filter(k => this.airports[k].island === this.originIsland);
      this.originKey = validKeys[0] || '';
      
      originSelect.innerHTML = this.renderAirportOptions(this.originIsland, this.originKey);
      this.onRouteChanged();
    };

    destIslandSelect.onchange = (e) => {
      this.playAudio('click');
      this.destIsland = e.target.value;
      const validKeys = Object.keys(this.airports).filter(k => this.airports[k].island === this.destIsland);
      this.destKey = validKeys[0] || '';

      destSelect.innerHTML = this.renderAirportOptions(this.destIsland, this.destKey);
      this.onRouteChanged();
    };

    originSelect.onchange = (e) => {
      this.playAudio('click');
      this.originKey = e.target.value;
      if (this.originKey === this.destKey) {
        showToast('Bandara asal dan tujuan tidak boleh sama.');
        return;
      }
      this.onRouteChanged();
    };

    destSelect.onchange = (e) => {
      this.playAudio('click');
      this.destKey = e.target.value;
      if (this.originKey === this.destKey) {
        showToast('Bandara asal dan tujuan tidak boleh sama.');
        return;
      }
      this.onRouteChanged();
    };

    // Trip Type Slider Handlers
    const btnOneway = document.getElementById('fly-btn-oneway');
    const btnRound = document.getElementById('fly-btn-round');
    const tripPill = document.getElementById('fly-trip-slider-pill');

    btnOneway.onclick = () => {
      if (this.tripType === 'oneway') return;
      this.playAudio('click');
      this.tripType = 'oneway';
      tripPill.style.left = '4px';
      btnOneway.className = 'relative z-10 w-1/2 text-center text-[11px] font-extrabold py-1 text-white transition-colors focus:outline-none';
      btnRound.className = 'relative z-10 w-1/2 text-center text-[11px] font-extrabold py-1 text-gray-400 hover:text-[var(--text-main)] transition-colors focus:outline-none';
      this.renderFlights();
    };

    btnRound.onclick = () => {
      if (this.tripType === 'round') return;
      this.playAudio('click');
      this.tripType = 'round';
      tripPill.style.left = 'calc(50% + 0px)';
      btnRound.className = 'relative z-10 w-1/2 text-center text-[11px] font-extrabold py-1 text-white transition-colors focus:outline-none';
      btnOneway.className = 'relative z-10 w-1/2 text-center text-[11px] font-extrabold py-1 text-gray-400 hover:text-[var(--text-main)] transition-colors focus:outline-none';
      this.renderFlights();
    };

    // Cabin Class Handlers
    const cabinBtns = document.querySelectorAll('.fly-cabin-btn');
    cabinBtns.forEach(btn => {
      btn.onclick = () => {
        const selected = btn.dataset.cabin;
        if (this.cabinClass === selected) return;

        const pitchMap = { economy: 1.0, business: 1.25, first: 1.5 };
        this.playAudio('pop', pitchMap[selected] || 1.0);

        this.cabinClass = selected;
        cabinBtns.forEach(b => {
          const isCurr = b.dataset.cabin === selected;
          b.className = `fly-cabin-btn py-1.5 px-2 rounded-lg text-xs font-extrabold border transition-all btn-tactile ${
            isCurr
              ? 'bg-[#EB4E70] text-white border-[#EB4E70] shadow-sm'
              : 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] hover:border-[#EB4E70]'
          }`;
        });
        this.renderFlights();
      };
    });

    document.getElementById('fly-swap-btn').onclick = () => this.swapRoute();
    document.getElementById('fly-passenger-input').oninput = (e) => {
      this.passengerName = e.target.value.trim() || 'User NUSA';
    };

    const carousel = document.getElementById('fly-calendar-carousel');
    document.getElementById('fly-scroll-left').onclick = (e) => {
      e.stopPropagation();
      carousel.scrollBy({ left: -140, behavior: 'smooth' });
    };
    document.getElementById('fly-scroll-right').onclick = (e) => {
      e.stopPropagation();
      carousel.scrollBy({ left: 140, behavior: 'smooth' });
    };
  },

  swapRoute() {
    this.playAudio('pop');

    this.swapRotation += 180;
    const iconContainer = document.getElementById('fly-swap-icon-container');
    if (iconContainer) {
      iconContainer.style.transform = `rotate(${this.swapRotation}deg)`;
    }

    const tempIsland = this.originIsland;
    this.originIsland = this.destIsland;
    this.destIsland = tempIsland;

    const tempKey = this.originKey;
    this.originKey = this.destKey;
    this.destKey = tempKey;

    document.getElementById('fly-origin-island-select').value = this.originIsland;
    document.getElementById('fly-dest-island-select').value = this.destIsland;

    document.getElementById('fly-origin-select').innerHTML = this.renderAirportOptions(this.originIsland, this.originKey);
    document.getElementById('fly-dest-select').innerHTML = this.renderAirportOptions(this.destIsland, this.destKey);

    showToast(`Rute ditukar: ${this.airports[this.originKey].code} ➔ ${this.airports[this.destKey].code}`);
    this.onRouteChanged();
  },

  onRouteChanged() {
    this.initFlightMap();
    this.renderFlights();
  },

  initCalendarWindow() {
    const carousel = document.getElementById('fly-calendar-carousel');
    if (!carousel) return;
    carousel.innerHTML = '';
    const today = new Date();

    for (let i = 0; i < 15; i++) {
      const dateObj = new Date(today);
      dateObj.setDate(today.getDate() + i);

      const isoDate = dateObj.toISOString().split('T')[0];
      const dayName = i === 0 ? 'Hari Ini' : dateObj.toLocaleDateString('id-ID', { weekday: 'short' });
      const dateNum = dateObj.getDate();
      const monthName = dateObj.toLocaleDateString('id-ID', { month: 'short' });

      if (i === 0) this.selectedDateStr = isoDate;

      const btn = document.createElement('button');
      const isSelected = i === 0;
      btn.className = `fly-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
        isSelected
          ? 'border-[#EB4E70] bg-[#EB4E70] text-white font-extrabold shadow-md'
          : 'border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] font-bold hover:border-[#EB4E70]'
      }`;
      btn.innerHTML = `
        <span class="text-[10px] uppercase opacity-80">${dayName}</span>
        <span class="text-sm font-black">${dateNum} ${monthName}</span>
      `;

      btn.onclick = (e) => {
        e.stopPropagation();
        this.playAudio('pop');
        document.querySelectorAll('.fly-date-pill').forEach(p => {
          p.className = 'fly-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] font-bold text-center flex flex-col items-center justify-center transition-all hover:border-[#EB4E70]';
        });
        btn.className = 'fly-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border border-[#EB4E70] bg-[#EB4E70] text-white font-extrabold text-center flex flex-col items-center justify-center transition-all shadow-md';
        this.selectedDateStr = isoDate;
        this.renderFlights();
      };

      carousel.appendChild(btn);
    }
  },

  calculateDistance(coord1, coord2) {
    const R = 6371;
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  },

  initFlightMap() {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }

    const origin = this.airports[this.originKey];
    const dest = this.airports[this.destKey];
    if (!origin || !dest) return;

    const dist = this.calculateDistance(origin.coords, dest.coords);

    const distLabel = document.getElementById('fly-route-dist');
    if (distLabel) distLabel.innerText = `Jarak: ~${dist} km`;

    const map = L.map('fly-map', { zoomControl: false, attributionControl: false }).setView([-2.5, 118.0], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const createPin = (label, color) => L.divIcon({
      className: 'custom-airport-pin',
      html: `<div style="background:#1F2937; color:${color}; padding:3px 8px; border-radius:12px; font-weight:900; font-size:10px; border:2px solid ${color}; box-shadow:0 4px 10px rgba(0,0,0,0.3); white-space:nowrap;">${label}</div>`
    });

    L.marker(origin.coords, { icon: createPin(`DEP: ${origin.code}`, '#FD9799') }).addTo(map);
    L.marker(dest.coords, { icon: createPin(`ARR: ${dest.code}`, '#EB4E70') }).addTo(map);

    const polyline = L.polyline([origin.coords, dest.coords], {
      color: '#EB4E70',
      weight: 3,
      dashArray: '8, 8',
      opacity: 0.85
    }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
    this.mapInstance = map;
  },

  generateFlightInventory() {
    const origin = this.airports[this.originKey];
    const dest = this.airports[this.destKey];
    if (!origin || !dest || origin.code === dest.code) return [];

    const distKm = this.calculateDistance(origin.coords, dest.coords);

    const rawDirectMin = Math.round((distKm / 680) * 60) + 35;
    const directDurationMin = Math.max(65, Math.round(rawDirectMin / 5) * 5);

    const baseSlotHours = [
      { h: 5, m: 15 }, { h: 6, m: 30 }, { h: 8, m: 0 }, { h: 9, m: 45 },
      { h: 11, m: 20 }, { h: 13, m: 10 }, { h: 14, m: 55 }, { h: 16, m: 25 },
      { h: 18, m: 40 }, { h: 20, m: 15 }, { h: 21, m: 50 }
    ];

    const cabinObj = this.cabinClasses.find(c => c.id === this.cabinClass) || this.cabinClasses[0];
    const tripMultiplier = this.tripType === 'round' ? 1.85 : 1.0;

    const flights = [];

    baseSlotHours.forEach((slot, idx) => {
      const carrier = this.airlines[idx % this.airlines.length];
      const isTransit = idx === 3 || idx === 7;

      let flightDurationMin = directDurationMin;
      let transitCityName = '';

      if (isTransit) {
        const layoverMin = Math.floor((120 + Math.random() * 240) / 5) * 5;
        flightDurationMin = directDurationMin + layoverMin;
        transitCityName = this.originKey !== 'SUB' && this.destKey !== 'SUB' ? 'Surabaya (SUB)' : 'Jakarta (CGK)';
      }

      const depTotalMin = slot.h * 60 + slot.m;
      const arrTotalMin = depTotalMin + flightDurationMin;

      const arrH = Math.floor((arrTotalMin / 60) % 24);
      const arrM = arrTotalMin % 60;

      const depStr = `${String(slot.h).padStart(2, '0')}:${String(slot.m).padStart(2, '0')}`;
      const arrStr = `${String(arrH).padStart(2, '0')}:${String(arrM).padStart(2, '0')}`;

      const distBasePrice = 450000 + (distKm * 850);
      let rawPrice = (distBasePrice * carrier.multiplier * cabinObj.multiplier * tripMultiplier) + (Math.random() * 250000);
      if (isTransit) rawPrice *= 1.15;
      const price = Math.floor(rawPrice / 500) * 500;

      const flightCodeNum = Math.floor(100 + Math.random() * 899);

      flights.push({
        id: `${carrier.code}-${flightCodeNum}-${idx}`,
        airline: carrier.name,
        code: `${carrier.code}-${flightCodeNum}`,
        type: carrier.type,
        cabinBaggage: carrier.cabin,
        checkedBaggage: carrier.checked,
        logoSvg: carrier.logoSvg,
        depTime: depStr,
        arrTime: arrStr,
        depTotalMin,
        durationMin: flightDurationMin,
        isTransit,
        transitCity: transitCityName,
        price
      });
    });

    return flights.sort((a, b) => a.price - b.price);
  },

  renderFlights() {
    const container = document.getElementById('fly-results-container');
    const badge = document.getElementById('fly-count-badge');
    if (!container) return;
    container.innerHTML = '';

    const allFlights = this.generateFlightInventory();
    const now = new Date();
    const todayIso = now.toISOString().split('T')[0];
    const currentMinTotal = now.getHours() * 60 + now.getMinutes();

    let validFlights = [];

    allFlights.forEach((flight) => {
      if (this.selectedDateStr === todayIso && flight.depTotalMin <= currentMinTotal) {
        return;
      }
      validFlights.push(flight);
    });

    if (badge) badge.innerText = `${validFlights.length} Penerbangan Tersedia`;

    if (validFlights.length === 0) {
      container.innerHTML = `
        <div class="tactile-card p-6 text-center space-y-4 border-2 border-dashed border-[#EB4E70]/40 my-4">
          <div class="w-14 h-14 rounded-full bg-[#FDE5E7] flex items-center justify-center mx-auto text-[#EB4E70]">
            ${svgIcons.plane('#EB4E70', 24)}
          </div>
          <div class="space-y-1">
            <h3 class="font-extrabold text-sm text-[var(--text-main)]">Tidak Ada Penerbangan</h3>
            <p class="text-xs text-gray-400">Silakan pilih rute atau tanggal keberangkatan yang lain.</p>
          </div>
        </div>
      `;
      return;
    }

    const cabinObj = this.cabinClasses.find(c => c.id === this.cabinClass) || this.cabinClasses[0];

    validFlights.forEach((flight) => {
      const durHours = Math.floor(flight.durationMin / 60);
      const durMins = flight.durationMin % 60;
      const durationFormatted = `${durHours}j ${durMins}m`;

      const card = document.createElement('div');
      card.className = 'tactile-card p-4 space-y-3';
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            ${flight.logoSvg}
            <span class="font-black text-xs text-[var(--text-main)]">${flight.airline}</span>
            <span class="text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
              flight.isTransit ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' : 'bg-rose-50 text-[#EB4E70] dark:bg-rose-950/50 dark:text-[#FD9799]'
            }">
              ${flight.isTransit ? `Transit ${flight.transitCity}` : 'Langsung (Direct)'}
            </span>
          </div>
          <span class="text-[10px] text-gray-400 font-extrabold">${flight.code}</span>
        </div>

        <div class="flex items-center justify-between text-center bg-gray-50 dark:bg-[#2A141A] p-3 rounded-xl border border-[var(--border-color)]">
          <div class="text-left">
            <span class="text-lg font-black block leading-none">${flight.depTime}</span>
            <span class="text-[10px] text-gray-400 font-extrabold uppercase">${this.originKey}</span>
          </div>

          <div class="flex flex-col items-center px-2">
            <span class="text-[10px] font-bold text-[#EB4E70]">${durationFormatted}</span>
            <div class="w-20 h-[2px] bg-gradient-to-r from-[#EB4E70] to-[#FD9799] my-1 relative">
              <div class="w-1.5 h-1.5 rounded-full bg-[#EB4E70] absolute -top-0.5 left-1/2 -translate-x-1/2"></div>
            </div>
            <span class="text-[9px] text-gray-400 font-bold">${cabinObj.label} • ${this.tripType === 'round' ? 'PP' : 'Sekali Jalan'}</span>
          </div>

          <div class="text-right">
            <span class="text-lg font-black block leading-none">${flight.arrTime}</span>
            <span class="text-[10px] text-gray-400 font-extrabold uppercase">${this.destKey}</span>
          </div>
        </div>

        <div class="flex items-center justify-between text-[10px] text-gray-400 font-semibold px-1">
          <div class="flex items-center gap-2">
            ${svgIcons.luggage(14)}
            <span>Kabin: <strong class="text-[var(--text-main)]">${flight.cabinBaggage}</strong></span>
            <span class="mx-0.5">•</span>
            <span>Bagasi: <strong class="text-[var(--text-main)]">${flight.checkedBaggage}</strong></span>
          </div>
          <span>Penumpang: <strong class="text-[#EB4E70] font-black">${this.passengerName}</strong></span>
        </div>

        <div class="flex items-center justify-between pt-1 border-t border-[var(--border-color)]">
          <div>
            <span class="text-[9px] text-gray-400 block font-bold">Harga per orang</span>
            <span class="text-base font-black text-[#EB4E70]">Rp ${flight.price.toLocaleString('id-ID')}</span>
          </div>
          <button class="book-fly-btn px-5 py-2.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white text-xs font-extrabold rounded-xl shadow-md btn-tactile active:scale-95">
            Pesan Tiket Pesawat
          </button>
        </div>
      `;

      card.querySelector('.book-fly-btn').onclick = (e) => {
        this.playAudio('chime');
        if (window.spawnParticleBurst) {
          const rect = e.target.getBoundingClientRect();
          window.spawnParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
        this.checkoutFlight(flight);
      };

      container.appendChild(card);
    });
  },

  checkoutFlight(flight) {
    showToast(`Memproses tiket ${flight.airline}...`);

    const cabinObj = this.cabinClasses.find(c => c.id === this.cabinClass) || this.cabinClasses[0];

    const summaryHtml = `
      <div class="space-y-2">
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Layanan</span><span>NusaFly (${flight.airline})</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Rute Penerbangan</span><span>${this.airports[this.originKey].city} ➔ ${this.airports[this.destKey].city}</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Jadwal</span><span>${flight.depTime} - ${flight.arrTime} (${this.selectedDateStr})</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Kelas & Tipe</span><span>${cabinObj.label} (${this.tripType === 'round' ? 'PP' : 'One-Way'})</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Fasilitas</span><span>Kabin ${flight.cabinBaggage} | Bagasi ${flight.checkedBaggage}</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Penumpang</span><span class="text-[#EB4E70] font-black">${this.passengerName}</span></div>
        <div class="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between font-extrabold text-sm">
          <span>Total Bayar</span>
          <span class="text-[#EB4E70]">Rp ${flight.price.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `;

    if (window.openPaymentDrawerWithAmount) {
      window.openPaymentDrawerWithAmount(flight.price, summaryHtml);
    }
  }
};

/**
 * Clean Single Entry Point Function
 */
export function renderNusaFly(container, soundEngine = null) {
  NusaFly.init(container, soundEngine);
}