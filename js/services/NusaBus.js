import { showToast } from '../utils/toast.js';
import { t } from '../utils/i18n.js';

/**
 * NusaBus.js - Enterprise Bus & Shuttle Module for Nusa Super-App (2026)
 * Strict No-Emoji Constraint: Clean inline SVG vectors only.
 * Features: Realistic Travel Duration (12h for Makassar - Masamba), Dynamic Date-Distance Occupancy,
 * Complete Real-Time Operator Roster, Pure Numeric Seat Matrix, and Adaptive Category Switcher.
 */

const svgIcons = {
  bus: (color = 'currentColor', size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 6v6M16 6v6M4 11h16M2 15h20"/>
      <rect x="3" y="4" width="18" height="15" rx="3"/>
      <circle cx="7" cy="19" r="2" fill="${color}"/>
      <circle cx="17" cy="19" r="2" fill="${color}"/>
    </svg>`,
  steering: (color = 'currentColor', size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="2"/>
      <path d="M12 3v7M12 14v7M3 12h7M14 12h7"/>
    </svg>`,
  swap: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/>
    </svg>`,
  seat: (color = 'currentColor', size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 19v2M18 19v2M5 11V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5"/>
      <path d="M4 11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H4z"/>
    </svg>`,
  wifi: (size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0"/>
      <line x1="12" y1="20" x2="12.01" y2="20" stroke-width="3"/>
    </svg>`,
  usb: (size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v13M12 15l-3-3M12 15l3-3M6 7l-2 2 2 2M18 7l2 2-2 2M10 21h4"/>
    </svg>`,
  recline: (size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19h16M7 15l3-8 5 2"/>
      <circle cx="10" cy="5" r="2"/>
    </svg>`
};

export const NusaBus = {
  islands: ['Sulawesi', 'Jawa', 'Sumatra', 'Kalimantan'],

  categories: [
    { id: 'akap', label: 'Intercity / AKAP' },
    { id: 'sleeper', label: 'Executive Sleeper' },
    { id: 'shuttle', label: 'City Shuttle / Trans' }
  ],

  terminals: {
    // --- SULAWESI ---
    MAK: { code: 'MAK', name: 'Terminal Daya / Karebosi', city: 'Makassar', island: 'Sulawesi', coords: [-5.1182, 119.5050] },
    GOW: { code: 'GOW', name: 'Sungguminasa / UNHAS Gowa', city: 'Gowa', island: 'Sulawesi', coords: [-5.2072, 119.4520] },
    MAR: { code: 'MAR', name: 'Terminal Maros', city: 'Maros', island: 'Sulawesi', coords: [-5.0050, 119.5700] },
    TAK: { code: 'TAK', name: 'Takalar City Center', city: 'Takalar', island: 'Sulawesi', coords: [-5.4190, 119.4390] },
    TOR: { code: 'TOR', name: 'Makale & Rantepao', city: 'Tana Toraja', island: 'Sulawesi', coords: [-3.0970, 119.8630] },
    PLO: { code: 'PLO', name: 'Terminal Dangerakko', city: 'Palopo', island: 'Sulawesi', coords: [-2.9930, 120.1960] },
    MSB: { code: 'MSB', name: 'Terminal Masamba', city: 'Masamba', island: 'Sulawesi', coords: [-2.5582, 120.3200] },
    PAL: { code: 'PAL', name: 'Terminal Tipo / Manonda', city: 'Palu', island: 'Sulawesi', coords: [-0.9000, 119.8330] },
    MND: { code: 'MND', name: 'Terminal Malalayang', city: 'Manado', island: 'Sulawesi', coords: [1.4500, 124.8100] },

    // --- JAWA ---
    JKT: { code: 'JKT', name: 'Terminal Pulo Gebang', city: 'Jakarta', island: 'Jawa', coords: [-6.2132, 106.9535] },
    SBY: { code: 'SBY', name: 'Terminal Purabaya (Bungurasih)', city: 'Surabaya', island: 'Jawa', coords: [-7.3524, 112.7247] },
    YOG: { code: 'YOG', name: 'Terminal Giwangan', city: 'Yogyakarta', island: 'Jawa', coords: [-7.8340, 110.3920] },
    BDG: { code: 'BDG', name: 'Terminal Leuwipanjang', city: 'Bandung', island: 'Jawa', coords: [-6.9458, 107.5936] },

    // --- SUMATRA ---
    MDN: { code: 'MDN', name: 'Terminal Amplas', city: 'Medan', island: 'Sumatra', coords: [3.5380, 98.7120] },
    ACH: { code: 'ACH', name: 'Terminal Batoh', city: 'Banda Aceh', island: 'Sumatra', coords: [5.5340, 95.3280] },

    // --- KALIMANTAN ---
    BPN: { code: 'BPN', name: 'Terminal Batu Ampar', city: 'Balikpapan', island: 'Kalimantan', coords: [-1.2180, 116.8650] },
    SMD: { code: 'SMD', name: 'Terminal Sungai Kunjang', city: 'Samarinda', island: 'Kalimantan', coords: [-0.5150, 117.1250] }
  },

  busIsland: 'Sulawesi',
  busCategory: 'akap',
  originKey: 'MAK',
  destKey: 'MSB',
  selectedDeck: 'Lower Deck',
  selectedSeatNumber: 'Kursi 12',
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
    this.checkRouteCategorySupport();

    container.innerHTML = `
      <div id="nusabus-engine-panel" class="space-y-4">
        <div class="tactile-card p-4 space-y-4 backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl">
          
          <!-- Header Bar -->
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">LAYANAN PEMESANAN TIKET BUS</span>
            <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FDE5E7] text-[#EB4E70] font-extrabold">Nusa Bus 2026</span>
          </div>

          <!-- Service Category Switcher -->
          <div class="space-y-1 bg-gray-50 dark:bg-[#2A141A] p-2 rounded-xl border border-[var(--border-color)]">
            <label class="text-[10px] font-bold text-gray-400 block uppercase px-1">Pilih Kategori Layanan Bus</label>
            <div id="bus-cat-switcher-box" class="relative flex items-center bg-white dark:bg-[#140B0D] p-1 rounded-xl border border-[var(--border-color)]">
              <div id="bus-category-slider-pill" class="absolute top-1 bottom-1 left-1 w-[calc(33.33%-4px)] bg-[#EB4E70] rounded-lg transition-transform duration-300 ease-out shadow-sm"></div>
              ${this.renderCategoryButtons()}
            </div>
          </div>

          <!-- PEMILIHAN PULAU & TERMINAL -->
          <div class="space-y-3">
            <div class="space-y-1 bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">Pilih Wilayah Operasional</label>
              <select id="bus-island-select" class="w-full p-2 bg-white dark:bg-[#140B0D] border border-[var(--border-color)] rounded-lg font-extrabold text-xs text-[#EB4E70] outline-none focus:border-[#EB4E70]">
                ${this.renderIslandOptions(this.busIsland)}
              </select>
            </div>

            <!-- Terminal Asal & Tujuan Switcher -->
            <div class="flex items-center gap-2">
              <div class="flex-1 space-y-1">
                <label class="text-[10px] font-bold text-gray-400 block uppercase">Dari (Kota / Terminal Asal)</label>
                <select id="bus-origin-select" class="w-full p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70]">
                  ${this.renderTerminalOptions(this.originKey)}
                </select>
              </div>

              <button id="bus-swap-btn" title="Tukar Rute" class="mt-4 w-10 h-10 min-w-[40px] rounded-full bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white flex items-center justify-center shadow-md btn-tactile text-base font-black active:scale-90 transition-transform">
                <div id="bus-swap-icon-container" class="transition-transform duration-500 ease-out flex items-center justify-center">
                  ${svgIcons.swap(18)}
                </div>
              </button>

              <div class="flex-1 space-y-1">
                <label class="text-[10px] font-bold text-gray-400 block uppercase">Ke (Kota / Terminal Tujuan)</label>
                <select id="bus-dest-select" class="w-full p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70]">
                  ${this.renderTerminalOptions(this.destKey)}
                </select>
              </div>
            </div>

            <div class="flex items-center justify-between bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <span class="text-[11px] font-bold text-gray-400 uppercase">Nama Penumpang:</span>
              <input type="text" id="bus-passenger-input" value="${this.passengerName}" class="bg-transparent text-right font-extrabold text-xs text-[var(--text-main)] outline-none w-1/2 focus:text-[#EB4E70]" />
            </div>
          </div>

          <!-- Live Tracking Simulator -->
          <div class="space-y-1.5 bg-gray-50 dark:bg-[#2A141A] p-3 rounded-xl border border-[var(--border-color)]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                ${svgIcons.steering('#EB4E70', 16)}
                <span class="text-[11px] font-extrabold text-[var(--text-main)]">Simulasi Live Tracking Bus</span>
              </div>
              <span class="text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                Tracking Active
              </span>
            </div>

            <div id="bus-live-simulator" class="relative w-full h-14 bg-white dark:bg-[#140B0D] rounded-xl border border-[var(--border-color)] overflow-hidden flex items-center px-4">
              <svg class="w-full h-full pointer-events-none" viewBox="0 0 320 60" preserveAspectRatio="none">
                <path d="M 20 30 Q 160 10 300 30" fill="none" stroke="var(--border-color)" stroke-width="3" stroke-dasharray="4 4"/>
                <path d="M 20 30 Q 160 10 300 30" fill="none" stroke="#EB4E70" stroke-width="3" stroke-dasharray="8 6"/>
                <g>
                  <circle r="10" fill="#EB4E70" opacity="0.2"/>
                  <circle r="6" fill="#EB4E70"/>
                  <animateMotion dur="4s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#bus-live-path"/>
                  </animateMotion>
                </g>
                <path id="bus-live-path" d="M 20 30 Q 160 10 300 30" fill="none"/>
              </svg>

              <div class="absolute inset-x-3 bottom-1.5 flex justify-between text-[9px] font-extrabold text-gray-400">
                <span id="bus-sim-origin">${this.terminals[this.originKey]?.city || 'Asal'}</span>
                <span id="bus-sim-stop" class="text-[#EB4E70]">Next: Rest Area Lintas</span>
                <span id="bus-sim-dest">${this.terminals[this.destKey]?.city || 'Tujuan'}</span>
              </div>
            </div>
          </div>

          <!-- Interactive Bus Seat Picker Grid -->
          <div class="space-y-3 bg-gray-50 dark:bg-[#2A141A] p-3 rounded-xl border border-[var(--border-color)]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                ${svgIcons.seat('#EB4E70', 16)}
                <span id="bus-seat-grid-title" class="text-[11px] font-extrabold text-[var(--text-main)]">Denah Kursi Bus (${this.busCategory.toUpperCase()})</span>
              </div>
              <span id="bus-selected-seat-badge" class="text-[10px] px-2.5 py-0.5 rounded-md bg-[#FDE5E7] text-[#EB4E70] font-black">
                ${this.busCategory === 'sleeper' ? `${this.selectedDeck} - ` : ''}${this.selectedSeatNumber}
              </span>
            </div>

            <div id="bus-deck-selector-wrap" class="${this.busCategory === 'sleeper' ? 'block' : 'hidden'} space-y-1">
              <span class="text-[9px] font-bold text-gray-400 block uppercase">Pilih Lantai Bus (Double Decker):</span>
              <div class="flex gap-2">
                ${['Lower Deck', 'Upper Deck'].map(deck => `
                  <button data-deck="${deck}" class="bus-deck-btn flex-1 py-1.5 rounded-lg text-xs font-extrabold border transition-all btn-tactile ${
                    this.selectedDeck === deck
                      ? 'bg-[#EB4E70] text-white border-[#EB4E70] shadow-sm'
                      : 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)]'
                  }">
                    ${deck}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="pt-1">
              <div id="bus-seat-matrix-container" class="space-y-1.5 mx-auto">
                ${this.renderSeatGridContent()}
              </div>
            </div>

            <div class="flex items-center justify-center gap-4 pt-2 text-[9px] text-gray-400 font-bold border-t border-[var(--border-color)]">
              <div class="flex items-center gap-1">
                <div class="w-3.5 h-3.5 rounded bg-white dark:bg-[#140B0D] border border-[var(--border-color)]"></div>
                <span>Tersedia</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-3.5 h-3.5 rounded bg-[#EB4E70]"></div>
                <span>Dipilih</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-3.5 h-3.5 rounded bg-gray-300 dark:bg-gray-700 opacity-60"></div>
                <span>Terisi</span>
              </div>
            </div>
          </div>

          <!-- Date Selector Carousel -->
          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">Tanggal Keberangkatan</label>
            </div>
            <div class="relative flex items-center">
              <button id="bus-scroll-left" class="absolute left-0 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 shadow border border-[var(--border-color)] text-[#EB4E70] font-black text-xs flex items-center justify-center -ml-2 hover:scale-110 active:scale-95 transition-transform">‹</button>
              <div id="bus-calendar-carousel" class="date-carousel-container flex gap-2 overflow-x-auto no-scrollbar pb-1 px-3 scroll-smooth w-full"></div>
              <button id="bus-scroll-right" class="absolute right-0 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 shadow border border-[var(--border-color)] text-[#EB4E70] font-black text-xs flex items-center justify-center -mr-2 hover:scale-110 active:scale-95 transition-transform">›</button>
            </div>
          </div>

          <!-- Leaflet Interactive Map -->
          <div class="space-y-1">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">Peta Jalur Rute Bus</label>
              <span id="bus-route-dist" class="text-[10px] font-extrabold text-[#EB4E70]"></span>
            </div>
            <div class="relative w-full h-44 rounded-2xl border border-[var(--border-color)] overflow-hidden z-10">
              <div id="bus-map" class="w-full h-full"></div>
            </div>
          </div>
        </div>

        <!-- Operator List Header -->
        <div class="flex items-center justify-between px-1">
          <h2 class="text-sm font-extrabold tracking-wide">JADWAL & OPERATOR BUS TERSEDIA</h2>
          <span id="bus-count-badge" class="text-xs text-gray-400 font-bold">Memuat...</span>
        </div>

        <section id="bus-results-container" class="space-y-3"></section>
      </div>
    `;

    this.bindEvents();
    this.initCalendarWindow();
    this.initBusMap();
    this.renderBusSchedule();
  },

  playAudio(soundType, pitchMult = 1) {
    if (this.soundEngine && typeof this.soundEngine[soundType] === 'function') {
      this.soundEngine[soundType](pitchMult);
    } else if (typeof window.playSound === 'function') {
      window.playSound(soundType);
    }
  },

  isShortHaulRoute() {
    const shortPairs = ['MAK-GOW', 'GOW-MAK', 'MAK-MAR', 'MAR-MAK', 'MAK-TAK', 'TAK-MAK', 'BPN-SMD', 'SMD-BPN'];
    const pair = `${this.originKey}-${this.destKey}`;
    return shortPairs.includes(pair);
  },

  isLongHaulRoute() {
    const longPairs = [
      'MAK-MSB', 'MSB-MAK', 'MAK-TOR', 'TOR-MAK', 'MAK-PLO', 'PLO-MAK',
      'MAK-PAL', 'PAL-MAK', 'MAK-MND', 'MND-MAK', 'JKT-SBY', 'SBY-JKT',
      'JKT-YOG', 'YOG-JKT', 'MDN-ACH', 'ACH-MDN'
    ];
    const pair = `${this.originKey}-${this.destKey}`;
    return longPairs.includes(pair);
  },

  checkRouteCategorySupport() {
    if (this.isShortHaulRoute()) {
      this.busCategory = 'shuttle';
    } else if (this.isLongHaulRoute() && this.busCategory === 'shuttle') {
      this.busCategory = 'akap';
    }
  },

  renderCategoryButtons() {
    const isShort = this.isShortHaulRoute();
    const isLong = this.isLongHaulRoute();

    return this.categories.map((cat, idx) => {
      let isDisabled = false;
      if (isShort && cat.id !== 'shuttle') isDisabled = true;
      if (isLong && cat.id === 'shuttle') isDisabled = true;

      const isSelected = this.busCategory === cat.id;

      let btnStyle = isSelected ? 'text-white' : 'text-gray-400 hover:text-[var(--text-main)]';
      if (isDisabled) btnStyle = 'text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-40';

      return `
        <button data-cat="${cat.id}" data-idx="${idx}" ${isDisabled ? 'disabled' : ''} class="bus-cat-btn relative z-10 w-1/3 text-center text-[10px] sm:text-[11px] font-extrabold py-1.5 transition-colors focus:outline-none ${btnStyle}">
          ${cat.label}
        </button>
      `;
    }).join('');
  },

  updateCategoryPillPosition() {
    const pill = document.getElementById('bus-category-slider-pill');
    if (!pill) return;

    const currIdx = this.categories.findIndex(c => c.id === this.busCategory);
    const safeIdx = currIdx >= 0 ? currIdx : 0;
    pill.style.transform = `translateX(${safeIdx * 100}%)`;
  },

  /**
   * Dynamic Date-Distance Occupancy Logic:
   * - Today (0 days): 75% occupied (mostly booked)
   * - Tomorrow (1 day): 55% occupied
   * - +2 Days: 35% occupied
   * - +3 Days: 20% occupied
   * - +4 Days: 10% occupied
   * - +5 to +7 Days: 5% occupied (nearly empty)
   * - >7 Days: 0% occupied (Completely empty / all seats available)
   */
  getOccupiedSeatsForDate(totalSeats) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const selDate = this.selectedDateStr ? new Date(this.selectedDateStr) : new Date();
    selDate.setHours(0,0,0,0);

    const diffTime = Math.max(0, selDate - today);
    const daysDiff = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let occupancyRatio = 0;
    if (daysDiff === 0) occupancyRatio = 0.75;
    else if (daysDiff === 1) occupancyRatio = 0.55;
    else if (daysDiff === 2) occupancyRatio = 0.35;
    else if (daysDiff === 3) occupancyRatio = 0.20;
    else if (daysDiff === 4) occupancyRatio = 0.10;
    else if (daysDiff <= 7) occupancyRatio = 0.05;
    else occupancyRatio = 0; // >7 Days: All seats completely open!

    const seed = `${this.selectedDateStr}-${this.originKey}-${this.destKey}-${this.busCategory}-${this.selectedDeck}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }

    const occupied = [];
    for (let s = 1; s <= totalSeats; s++) {
      const val = Math.abs((hash + s * 37) % 100) / 100;
      if (val < occupancyRatio) {
        occupied.push(`Kursi ${s}`);
      }
    }
    return occupied;
  },

  renderSeatGridContent() {
    const isSleeper = this.busCategory === 'sleeper';
    const isShuttle = this.busCategory === 'shuttle';

    const maxRows = isSleeper ? 7 : (isShuttle ? 5 : 9);
    const seatsPerRow = isSleeper || isShuttle ? 3 : 4;
    const totalSeats = maxRows * seatsPerRow;

    const occupiedSeats = this.getOccupiedSeatsForDate(totalSeats);

    const gridColsClass = isSleeper || isShuttle ? 'grid-cols-4' : 'grid-cols-5';
    const maxWidthClass = isSleeper || isShuttle ? 'max-w-[240px]' : 'max-w-[290px]';

    let seatCounter = 1;
    let rowsHtml = `
      <div class="${maxWidthClass} mx-auto space-y-1.5">
    `;

    for (let r = 1; r <= maxRows; r++) {
      rowsHtml += `<div class="grid ${gridColsClass} gap-1.5">`;

      if (isSleeper || isShuttle) {
        // Format 1 x 2 (Sleeper Pod / Shuttle)
        for (let c = 0; c < 3; c++) {
          if (c === 1) {
            rowsHtml += `<div class="flex items-center justify-center text-[9px] text-gray-300 font-bold opacity-40">${r}</div>`;
          }
          const seatLabel = `Kursi ${seatCounter}`;
          const isOccupied = occupiedSeats.includes(seatLabel);
          const isSelected = this.selectedSeatNumber === seatLabel;

          let btnClass = 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] hover:border-[#EB4E70]';
          if (isOccupied) {
            btnClass = 'bg-gray-200 dark:bg-gray-800 text-gray-400 border-transparent cursor-not-allowed opacity-50';
          } else if (isSelected) {
            btnClass = 'bg-[#EB4E70] text-white border-[#EB4E70] font-black shadow-md ring-2 ring-[#EB4E70]/40 scale-105';
          }

          rowsHtml += `
            <button data-seat="${seatLabel}" ${isOccupied ? 'disabled' : ''} class="bus-seat-btn py-2 rounded-lg border text-[11px] font-black transition-all btn-tactile ${btnClass}">
              ${seatCounter}
            </button>
          `;
          seatCounter++;
        }
      } else {
        // Format 2 x 2 Standard AKAP (Kursi 1, 2 - LORONG - 3, 4)
        for (let c = 0; c < 4; c++) {
          if (c === 2) {
            rowsHtml += `<div class="flex items-center justify-center text-[9px] text-gray-300 font-bold opacity-40">${r}</div>`;
          }
          const seatLabel = `Kursi ${seatCounter}`;
          const isOccupied = occupiedSeats.includes(seatLabel);
          const isSelected = this.selectedSeatNumber === seatLabel;

          let btnClass = 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] hover:border-[#EB4E70]';
          if (isOccupied) {
            btnClass = 'bg-gray-200 dark:bg-gray-800 text-gray-400 border-transparent cursor-not-allowed opacity-50';
          } else if (isSelected) {
            btnClass = 'bg-[#EB4E70] text-white border-[#EB4E70] font-black shadow-md ring-2 ring-[#EB4E70]/40 scale-105';
          }

          rowsHtml += `
            <button data-seat="${seatLabel}" ${isOccupied ? 'disabled' : ''} class="bus-seat-btn py-1.5 rounded-lg border text-[11px] font-black transition-all btn-tactile ${btnClass}">
              ${seatCounter}
            </button>
          `;
          seatCounter++;
        }
      }

      rowsHtml += `</div>`;
    }

    rowsHtml += `</div>`;
    return rowsHtml;
  },

  renderIslandOptions(selectedIsland) {
    return this.islands.map(is => `
      <option value="${is}" ${is === selectedIsland ? 'selected' : ''}>Pulau ${is}</option>
    `).join('');
  },

  renderTerminalOptions(selectedKey) {
    const validTerminals = Object.keys(this.terminals).filter(key => this.terminals[key].island === this.busIsland);
    if (validTerminals.length === 0) return `<option value="">Tidak ada terminal</option>`;

    return validTerminals.map(key => {
      const tm = this.terminals[key];
      return `<option value="${key}" ${key === selectedKey ? 'selected' : ''}>${tm.city} - ${tm.name}</option>`;
    }).join('');
  },

  bindEvents() {
    const islandSelect = document.getElementById('bus-island-select');
    const originSelect = document.getElementById('bus-origin-select');
    const destSelect = document.getElementById('bus-dest-select');

    this.bindCategorySwitcherEvents();

    islandSelect.onchange = (e) => {
      this.playAudio('click');
      this.busIsland = e.target.value;

      const filteredKeys = Object.keys(this.terminals).filter(k => this.terminals[k].island === this.busIsland);
      this.originKey = filteredKeys[0] || '';
      this.destKey = filteredKeys[1] || filteredKeys[0] || '';

      originSelect.innerHTML = this.renderTerminalOptions(this.originKey);
      destSelect.innerHTML = this.renderTerminalOptions(this.destKey);

      this.onRouteChanged();
    };

    originSelect.onchange = (e) => {
      this.playAudio('click');
      this.originKey = e.target.value;
      if (this.originKey === this.destKey) {
        showToast('Terminal asal dan tujuan tidak boleh sama.');
      }
      this.onRouteChanged();
    };

    destSelect.onchange = (e) => {
      this.playAudio('click');
      this.destKey = e.target.value;
      if (this.originKey === this.destKey) {
        showToast('Terminal asal dan tujuan tidak boleh sama.');
      }
      this.onRouteChanged();
    };

    this.bindDeckEvents();
    this.bindSeatMatrixEvents();

    document.getElementById('bus-swap-btn').onclick = () => this.swapRoute();
    document.getElementById('bus-passenger-input').oninput = (e) => {
      this.passengerName = e.target.value.trim() || 'User NUSA';
    };

    const carousel = document.getElementById('bus-calendar-carousel');
    document.getElementById('bus-scroll-left').onclick = (e) => {
      e.stopPropagation();
      carousel.scrollBy({ left: -140, behavior: 'smooth' });
    };
    document.getElementById('bus-scroll-right').onclick = (e) => {
      e.stopPropagation();
      carousel.scrollBy({ left: 140, behavior: 'smooth' });
    };
  },

  bindCategorySwitcherEvents() {
    const catBtns = document.querySelectorAll('.bus-cat-btn');

    catBtns.forEach(btn => {
      btn.onclick = () => {
        if (btn.hasAttribute('disabled')) return;

        const cat = btn.dataset.cat;
        if (this.busCategory === cat) return;

        this.playAudio('click');
        this.busCategory = cat;

        this.updateCategoryPillPosition();

        catBtns.forEach(b => {
          if (b.dataset.cat === cat) {
            b.className = 'bus-cat-btn relative z-10 w-1/3 text-center text-[10px] sm:text-[11px] font-extrabold py-1.5 text-white transition-colors focus:outline-none';
          } else if (!b.hasAttribute('disabled')) {
            b.className = 'bus-cat-btn relative z-10 w-1/3 text-center text-[10px] sm:text-[11px] font-extrabold py-1.5 text-gray-400 hover:text-[var(--text-main)] transition-colors focus:outline-none';
          }
        });

        const deckWrap = document.getElementById('bus-deck-selector-wrap');
        if (deckWrap) {
          deckWrap.className = this.busCategory === 'sleeper' ? 'block space-y-1' : 'hidden space-y-1';
        }

        const gridTitle = document.getElementById('bus-seat-grid-title');
        if (gridTitle) gridTitle.innerText = `Denah Kursi Bus (${this.busCategory.toUpperCase()})`;

        this.updateSeatGrid();
        this.renderBusSchedule();
      };
    });

    this.updateCategoryPillPosition();
  },

  bindDeckEvents() {
    const deckBtns = document.querySelectorAll('.bus-deck-btn');
    deckBtns.forEach(btn => {
      btn.onclick = () => {
        const deck = btn.dataset.deck;
        if (this.selectedDeck === deck) return;

        this.playAudio('click');
        this.selectedDeck = deck;

        deckBtns.forEach(b => {
          const isCurr = b.dataset.deck === deck;
          b.className = `bus-deck-btn flex-1 py-1.5 rounded-lg text-xs font-extrabold border transition-all btn-tactile ${
            isCurr
              ? 'bg-[#EB4E70] text-white border-[#EB4E70] shadow-sm'
              : 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)]'
          }`;
        });

        const badge = document.getElementById('bus-selected-seat-badge');
        if (badge) badge.innerText = `${this.selectedDeck} - ${this.selectedSeatNumber}`;

        this.updateSeatGrid();
      };
    });
  },

  bindSeatMatrixEvents() {
    const seatBtns = document.querySelectorAll('.bus-seat-btn:not([disabled])');
    seatBtns.forEach(btn => {
      btn.onclick = () => {
        const seatId = btn.dataset.seat;
        this.playAudio('pop', 1.2);

        this.selectedSeatNumber = seatId;
        const badge = document.getElementById('bus-selected-seat-badge');
        if (badge) {
          badge.innerText = this.busCategory === 'sleeper'
            ? `${this.selectedDeck} - ${this.selectedSeatNumber}`
            : this.selectedSeatNumber;
        }

        this.updateSeatGrid();
      };
    });
  },

  updateSeatGrid() {
    const matrixContainer = document.getElementById('bus-seat-matrix-container');
    if (matrixContainer) {
      matrixContainer.innerHTML = this.renderSeatGridContent();
      this.bindSeatMatrixEvents();
    }
  },

  swapRoute() {
    this.playAudio('pop');

    this.swapRotation += 180;
    const iconContainer = document.getElementById('bus-swap-icon-container');
    if (iconContainer) {
      iconContainer.style.transform = `rotate(${this.swapRotation}deg)`;
    }

    if (this.originKey === this.destKey) return;

    const temp = this.originKey;
    this.originKey = this.destKey;
    this.destKey = temp;

    document.getElementById('bus-origin-select').value = this.originKey;
    document.getElementById('bus-dest-select').value = this.destKey;

    showToast(`Rute bus ditukar: ${this.terminals[this.originKey].city} ➔ ${this.terminals[this.destKey].city}`);
    this.onRouteChanged();
  },

  onRouteChanged() {
    this.checkRouteCategorySupport();

    const switcherBox = document.getElementById('bus-cat-switcher-box');
    if (switcherBox) {
      switcherBox.innerHTML = `
        <div id="bus-category-slider-pill" class="absolute top-1 bottom-1 left-1 w-[calc(33.33%-4px)] bg-[#EB4E70] rounded-lg transition-transform duration-300 ease-out shadow-sm"></div>
        ${this.renderCategoryButtons()}
      `;
      this.bindCategorySwitcherEvents();
    }

    const simOrigin = document.getElementById('bus-sim-origin');
    const simDest = document.getElementById('bus-sim-dest');
    if (simOrigin) simOrigin.innerText = this.terminals[this.originKey]?.city || 'Asal';
    if (simDest) simDest.innerText = this.terminals[this.destKey]?.city || 'Tujuan';

    this.initBusMap();
    this.updateSeatGrid();
    this.renderBusSchedule();
  },

  initCalendarWindow() {
    const carousel = document.getElementById('bus-calendar-carousel');
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
      btn.className = `bus-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
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
        document.querySelectorAll('.bus-date-pill').forEach(p => {
          p.className = 'bus-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] font-bold text-center flex flex-col items-center justify-center transition-all hover:border-[#EB4E70]';
        });
        btn.className = 'bus-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border border-[#EB4E70] bg-[#EB4E70] text-white font-extrabold text-center flex flex-col items-center justify-center transition-all shadow-md';
        this.selectedDateStr = isoDate;

        this.updateSeatGrid();
        this.renderBusSchedule();
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

  initBusMap() {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }

    const origin = this.terminals[this.originKey];
    const dest = this.terminals[this.destKey];

    if (!origin || !dest || !origin.coords || !dest.coords) return;

    const dist = this.calculateDistance(origin.coords, dest.coords);

    const distLabel = document.getElementById('bus-route-dist');
    if (distLabel) distLabel.innerText = `Jarak: ~${dist} km`;

    const map = L.map('bus-map', { zoomControl: false, attributionControl: false }).setView(origin.coords, 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const createPin = (label, color) => L.divIcon({
      className: 'custom-bus-pin',
      html: `<div style="background:#1F2937; color:${color}; padding:3px 8px; border-radius:12px; font-weight:900; font-size:10px; border:2px solid ${color}; box-shadow:0 4px 10px rgba(0,0,0,0.3); white-space:nowrap;">${label}</div>`
    });

    L.marker(origin.coords, { icon: createPin(`${origin.city}`, '#FD9799') }).addTo(map);
    L.marker(dest.coords, { icon: createPin(`${dest.city}`, '#EB4E70') }).addTo(map);

    const polyline = L.polyline([origin.coords, dest.coords], {
      color: '#EB4E70',
      weight: 4,
      opacity: 0.85
    }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
    this.mapInstance = map;
  },

  /**
   * Generates Complete Real-Time Bus Inventory with exact regional operators & 12h Makassar-Masamba travel time
   */
  generateBusInventory() {
    const origin = this.terminals[this.originKey];
    const dest = this.terminals[this.destKey];

    if (!origin || !dest || origin.code === dest.code) return [];

    const isShort = this.isShortHaulRoute();
    const distKm = this.calculateDistance(origin.coords, dest.coords);
    let baseBusList = [];

    // 1. SHORT-HAUL / AGLOMERASI ROUTES
    if (isShort) {
      return [
        {
          poName: 'Trans Sulsel (Koridor Aglomerasi)',
          class: 'BRT Medium Bus (QRIS)',
          catId: 'shuttle',
          depTime: '06:30', arrTime: '07:30', duration: '45m - 1 jam', seatsLeft: 18,
          fare: 4600, note: 'Makassar, Gowa, Maros & Takalar Network'
        },
        {
          poName: 'Trans Mamminasata BRT',
          class: 'BRT Direct AC',
          catId: 'shuttle',
          depTime: '08:00', arrTime: '09:00', duration: '45m - 1 jam', seatsLeft: 24,
          fare: 4600, note: 'Sungguminasa, UNHAS Gowa & Karebosi'
        }
      ];
    }

    // 2. SULAWESI LONG-HAUL ROUTES (Realistic ~12h Makassar - Masamba Travel Time)
    if (this.busIsland === 'Sulawesi') {
      if ((origin.code === 'MAK' && dest.code === 'MSB') || (origin.code === 'MSB' && dest.code === 'MAK')) {
        baseBusList = [
          {
            poName: 'PO Borlindo',
            class: 'Sleeper Suite (Scania K410iB)',
            catId: 'sleeper',
            depTime: '20:00', arrTime: '08:00', duration: '12 jam', seatsLeft: 6,
            fare: 350000, note: 'Direct Makassar ➔ Masamba (Luwu Utara)'
          },
          {
            poName: 'PO Bintang Timur',
            class: 'First Class Sleeper Pod',
            catId: 'sleeper',
            depTime: '20:30', arrTime: '08:30', duration: '12 jam', seatsLeft: 8,
            fare: 330000, note: 'Sleeper Double Deck, Free Wi-Fi'
          },
          {
            poName: 'PO Putra Jaya',
            class: 'Super Executive Sleeper',
            catId: 'sleeper',
            depTime: '19:30', arrTime: '07:30', duration: '12 jam', seatsLeft: 5,
            fare: 320000, note: 'Suspension Udara, Reclining Pods'
          },
          {
            poName: 'PO Bintang Prima',
            class: 'Executive Sleeper Pod',
            catId: 'sleeper',
            depTime: '21:00', arrTime: '09:00', duration: '12 jam', seatsLeft: 10,
            fare: 300000, note: 'Personal Audio & USB Charger'
          },
          {
            poName: 'PO Remaja Jaya',
            class: 'Executive AC (2x2)',
            catId: 'akap',
            depTime: '19:00', arrTime: '07:00', duration: '12 jam', seatsLeft: 16,
            fare: 230000, note: 'Terminal Daya ➔ Terminal Masamba'
          },
          {
            poName: 'PO Litha & Co',
            class: 'Royal Executive AC',
            catId: 'akap',
            depTime: '19:30', arrTime: '07:30', duration: '12 jam', seatsLeft: 14,
            fare: 220000, note: 'Legrest & Servis Makan Malam'
          },
          {
            poName: 'PO Primadora',
            class: 'Executive Class AC',
            catId: 'akap',
            depTime: '20:00', arrTime: '08:00', duration: '12 jam', seatsLeft: 12,
            fare: 220000, note: 'Akses Reguler Makassar ➔ Luwu Utara'
          },
          {
            poName: 'PO PIPOSS',
            class: 'Executive Air Suspension',
            catId: 'akap',
            depTime: '20:15', arrTime: '08:15', duration: '12 jam', seatsLeft: 11,
            fare: 220000, note: 'Terminal Daya ➔ Luwu Utara Direct'
          }
        ];
      } else {
        baseBusList = [
          {
            poName: 'PO Borlindo Trans-Sulawesi',
            class: 'Sleeper Double Decker',
            catId: 'sleeper',
            depTime: '21:00', arrTime: '06:00', duration: '9 jam', seatsLeft: 6,
            fare: 350000, note: `Makassar ➔ ${dest.city}`
          },
          {
            poName: 'PO Litha & Co Executive',
            class: 'Executive AC VIP',
            catId: 'akap',
            depTime: '20:00', arrTime: '05:00', duration: '9 jam', seatsLeft: 12,
            fare: 240000, note: `Terminal Daya ➔ ${dest.name}`
          }
        ];
      }
    } else {
      // JAWA & OTHER ISLANDS
      baseBusList = [
        {
          poName: 'PO 27 Trans',
          class: 'President Sleeper Pod',
          catId: 'sleeper',
          depTime: '18:00', arrTime: '04:00', duration: '10 jam', seatsLeft: 5,
          fare: 510000, note: 'Tol Trans-Jawa, Free Meals & Wi-Fi'
        },
        {
          poName: 'PO Sinar Jaya',
          class: 'Executive Suite Class',
          catId: 'akap',
          depTime: '07:00', arrTime: '17:00', duration: '10 jam', seatsLeft: 14,
          fare: 330000, note: `${origin.city} ➔ ${dest.city}`
        }
      ];
    }

    let filtered = baseBusList;
    if (this.busCategory) {
      filtered = baseBusList.filter(b => b.catId === this.busCategory);
      if (filtered.length === 0) filtered = baseBusList;
    }

    return filtered;
  },

  renderBusSchedule() {
    const container = document.getElementById('bus-results-container');
    const badge = document.getElementById('bus-count-badge');
    if (!container) return;
    container.innerHTML = '';

    const buses = this.generateBusInventory();
    if (badge) badge.innerText = `${buses.length} Bus Tersedia`;

    if (buses.length === 0) {
      container.innerHTML = `
        <div class="tactile-card p-6 text-center space-y-3 border-2 border-dashed border-[#EB4E70]/40 my-4">
          <div class="w-12 h-12 rounded-full bg-[#FDE5E7] flex items-center justify-center mx-auto text-[#EB4E70]">
            ${svgIcons.bus('#EB4E70', 22)}
          </div>
          <p class="font-extrabold text-xs text-gray-400">Tidak ada rute bus langsung untuk pilihan ini.</p>
        </div>
      `;
      return;
    }

    buses.forEach((bus) => {
      const card = document.createElement('div');
      card.className = 'tactile-card p-4 space-y-3';
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            ${svgIcons.bus('#EB4E70', 18)}
            <span class="font-black text-xs text-[var(--text-main)]">${bus.poName}</span>
            <span class="text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-rose-50 text-[#EB4E70] dark:bg-rose-950/50 dark:text-[#FD9799]">
              ${bus.class}
            </span>
          </div>
          <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
            Sisa ${bus.seatsLeft} Kursi
          </span>
        </div>

        <div class="flex items-center justify-between text-center bg-gray-50 dark:bg-[#2A141A] p-3 rounded-xl border border-[var(--border-color)]">
          <div class="text-left">
            <span class="text-lg font-black block leading-none">${bus.depTime}</span>
            <span class="text-[10px] text-gray-400 font-extrabold uppercase">${this.terminals[this.originKey]?.city || 'Asal'}</span>
          </div>

          <div class="flex flex-col items-center px-2">
            <span class="text-[10px] font-bold text-[#EB4E70]">${bus.duration}</span>
            <div class="w-20 h-[2px] bg-gradient-to-r from-[#EB4E70] to-[#FD9799] my-1 relative">
              <div class="w-1.5 h-1.5 rounded-full bg-[#EB4E70] absolute -top-0.5 left-1/2 -translate-x-1/2"></div>
            </div>
            <span class="text-[9px] text-gray-400 font-bold max-w-[120px] truncate">
              ${this.busCategory === 'sleeper' ? `${this.selectedDeck} - ` : ''}${this.selectedSeatNumber}
            </span>
          </div>

          <div class="text-right">
            <span class="text-lg font-black block leading-none">${bus.arrTime}</span>
            <span class="text-[10px] text-gray-400 font-extrabold uppercase">${this.terminals[this.destKey]?.city || 'Tujuan'}</span>
          </div>
        </div>

        <!-- Amenities Badges -->
        <div class="flex items-center gap-2 text-[9px] text-gray-400 font-bold px-1">
          <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/60 px-2 py-0.5 rounded-md">
            ${svgIcons.wifi(12)}
            <span>Wi-Fi Free</span>
          </div>
          <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/60 px-2 py-0.5 rounded-md">
            ${svgIcons.usb(12)}
            <span>USB Charger</span>
          </div>
          <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/60 px-2 py-0.5 rounded-md">
            ${svgIcons.recline(12)}
            <span>Reclining Seat</span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-1 border-t border-[var(--border-color)]">
          <div>
            <span class="text-[9px] text-gray-400 block font-bold">Harga per orang</span>
            <span class="text-base font-black text-[#EB4E70]">Rp ${bus.fare.toLocaleString('id-ID')}</span>
          </div>
          <button class="book-bus-btn px-5 py-2.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white text-xs font-extrabold rounded-xl shadow-md btn-tactile active:scale-95 transition-transform">
            Pilih Kursi & Pesan
          </button>
        </div>
      `;

      card.querySelector('.book-bus-btn').onclick = (e) => {
        this.playAudio('chime');
        if (window.spawnParticleBurst) {
          const rect = e.target.getBoundingClientRect();
          window.spawnParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
        this.checkoutBus(bus);
      };

      container.appendChild(card);
    });
  },

  checkoutBus(bus) {
    showToast(`Memproses tiket ${bus.poName}...`);

    const summaryHtml = `
      <div class="space-y-2">
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Layanan</span><span>NusaBus (${bus.poName})</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Rute Bus</span><span>${this.terminals[this.originKey].name} ➔ ${this.terminals[this.destKey].name}</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Jadwal</span><span>${bus.depTime} - ${bus.arrTime} (${this.selectedDateStr})</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Kelas & Kursi</span><span>${bus.class} | ${this.busCategory === 'sleeper' ? `${this.selectedDeck} - ` : ''}${this.selectedSeatNumber}</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Penumpang</span><span class="text-[#EB4E70] font-black">${this.passengerName}</span></div>
        <div class="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between font-extrabold text-sm">
          <span>Total Bayar</span>
          <span class="text-[#EB4E70]">Rp ${bus.fare.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `;

    if (window.openPaymentDrawerWithAmount) {
      window.openPaymentDrawerWithAmount(bus.fare, summaryHtml);
    }
  }
};

export function renderNusaBus(container, soundEngine = null) {
  NusaBus.init(container, soundEngine);
}