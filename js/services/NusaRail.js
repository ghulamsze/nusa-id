import { showToast } from '../utils/toast.js';
import { t } from '../utils/i18n.js';

/**
 * NusaRail.js - Enterprise Train & KRL Booking Module for Nusa Super-App (2026)
 * Real-Time Indonesian Rail System with Dynamic Carriage & Seat Occupancy.
 * 
 * STRICT NO-EMOJI CONSTRAINT: Uses clean inline SVG vectors only.
 */

const svgIcons = {
  train: (color = 'currentColor', size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="3" width="16" height="15" rx="3"/>
      <path d="M4 11h16"/>
      <path d="M12 3v8"/>
      <circle cx="8" cy="15" r="1.5" fill="${color}"/>
      <circle cx="16" cy="15" r="1.5" fill="${color}"/>
      <path d="M6 18l-2 3.5"/>
      <path d="M18 18l2 3.5"/>
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
  carriage: (size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="20" height="11" rx="2"/>
      <path d="M6 18v2M18 18v2"/>
      <circle cx="7" cy="12" r="1"/>
      <circle cx="12" cy="12" r="1"/>
      <circle cx="17" cy="12" r="1"/>
    </svg>`,
  clock: (size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`
};

export const NusaRail = {
  islands: ['Jawa', 'Sumatra', 'Sulawesi'],

  islandCategories: {
    Jawa: [
      { id: 'all', label: 'Semua Kategori' },
      { id: 'intercity', label: 'Antarkota / Exec' },
      { id: 'commuter', label: 'KRL Commuter' },
      { id: 'airport', label: 'LRT / Bandara' }
    ],
    Sumatra: [
      { id: 'all', label: 'Semua Kategori' },
      { id: 'intercity', label: 'KA Regional' },
      { id: 'commuter', label: 'Commuter / Bandara' }
    ],
    Sulawesi: [
      { id: 'all', label: 'Semua Kategori' },
      { id: 'perintis', label: 'KA Perintis Trans-Sulawesi' }
    ]
  },

  timeSlots: [
    { id: '06:00', label: 'Pagi', time: '06:00' },
    { id: '11:00', label: 'Siang', time: '11:00' },
    { id: '16:00', label: 'Sore', time: '16:00' },
    { id: '20:00', label: 'Malam', time: '20:00' }
  ],

  stations: {
    // Jawa
    GMR: { code: 'GMR', name: 'Gambir', city: 'Jakarta', island: 'Jawa', coords: [-6.1767, 106.8306] },
    PSE: { code: 'PSE', name: 'Pasar Senen', city: 'Jakarta', island: 'Jawa', coords: [-6.1738, 106.8453] },
    BD:  { code: 'BD',  name: 'Bandung', city: 'Bandung', island: 'Jawa', coords: [-6.9147, 107.6025] },
    YK:  { code: 'YK',  name: 'Yogyakarta', city: 'Yogyakarta', island: 'Jawa', coords: [-7.7891, 110.3635] },
    SLO: { code: 'SLO', name: 'Solo Balapan', city: 'Surakarta', island: 'Jawa', coords: [-7.5583, 110.8213] },
    SGU: { code: 'SGU', name: 'Surabaya Gubeng', city: 'Surabaya', island: 'Jawa', coords: [-7.2654, 112.7521] },

    // Sumatra
    MDN: { code: 'MDN', name: 'Medan', city: 'Medan', island: 'Sumatra', coords: [3.5906, 98.6812] },
    BIJ: { code: 'BIJ', name: 'Binjai', city: 'Binjai', island: 'Sumatra', coords: [3.6001, 98.4854] },

    // Sulawesi (Trans-Sulawesi Route)
    MRS: { code: 'MRS', name: 'Maros', city: 'Maros', island: 'Sulawesi', coords: [-5.0061, 119.5750] },
    BAR: { code: 'BAR', name: 'Barru', city: 'Barru', island: 'Sulawesi', coords: [-4.4063, 119.6053] },
    GAR: { code: 'GAR', name: 'Garongkong', city: 'Barru', island: 'Sulawesi', coords: [-4.3521, 119.6120] }
  },

  railIsland: 'Jawa',
  railCategory: 'all',
  originKey: 'GMR',
  destKey: 'BD',
  selectedTimeSlot: '06:00',
  selectedCarriage: 'Gerbong 1',
  selectedSeatNumber: '2A',
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
    this.selectedCarriage = this.getCarriagesForRoute()[0];

    container.innerHTML = `
      <div id="nusarail-engine-panel" class="space-y-4">
        <div class="tactile-card p-4 space-y-4 backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl">
          
          <!-- Header Bar -->
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">${t('railServiceTitle') || 'Pemesanan Tiket Kereta Api'}</span>
            <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FDE5E7] text-[#EB4E70] font-extrabold">Nusa Rail 2026</span>
          </div>

          <!-- PEMILIHAN PULAU & STASIUN -->
          <div class="space-y-3">
            <div class="space-y-1 bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">Pilih Wilayah Operasional</label>
              <select id="rail-island-select" class="w-full p-2 bg-white dark:bg-[#140B0D] border border-[var(--border-color)] rounded-lg font-extrabold text-xs text-[#EB4E70] outline-none focus:border-[#EB4E70]">
                ${this.renderIslandOptions(this.railIsland)}
              </select>
            </div>

            <!-- Dynamic Category Switcher -->
            <div class="space-y-1 bg-gray-50 dark:bg-[#2A141A] p-2 rounded-xl border border-[var(--border-color)]">
              <label class="text-[10px] font-bold text-gray-400 block uppercase px-1">Kategori Kereta</label>
              <div id="rail-category-container" class="flex items-center gap-1 overflow-x-auto no-scrollbar p-1 bg-white dark:bg-[#140B0D] rounded-xl border border-[var(--border-color)]">
                ${this.renderCategoryButtons()}
              </div>
            </div>

            <!-- Stasiun Asal & Tujuan -->
            <div class="flex items-center gap-2">
              <div class="flex-1 space-y-1">
                <label class="text-[10px] font-bold text-gray-400 block uppercase">Dari (Stasiun Asal)</label>
                <select id="rail-origin-select" class="w-full p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70]">
                  ${this.renderStationOptions(this.originKey)}
                </select>
              </div>

              <button id="rail-swap-btn" title="${t('swapStation') || 'Tukar Stasiun'}" class="mt-4 w-10 h-10 min-w-[40px] rounded-full bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white flex items-center justify-center shadow-md btn-tactile text-base font-black active:scale-90 transition-transform">
                <div id="rail-swap-icon-container" class="transition-transform duration-500 ease-out flex items-center justify-center">
                  ${svgIcons.swap(18)}
                </div>
              </button>

              <div class="flex-1 space-y-1">
                <label class="text-[10px] font-bold text-gray-400 block uppercase">Ke (Stasiun Tujuan)</label>
                <select id="rail-dest-select" class="w-full p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70]">
                  ${this.renderStationOptions(this.destKey)}
                </select>
              </div>
            </div>

            <div class="flex items-center justify-between bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
              <span class="text-[11px] font-bold text-gray-400 uppercase">${t('passengerName') || 'Nama Penumpang'}:</span>
              <input type="text" id="rail-passenger-input" value="${this.passengerName}" class="bg-transparent text-right font-extrabold text-xs text-[var(--text-main)] outline-none w-1/2 focus:text-[#EB4E70]" />
            </div>
          </div>

          <!-- Time Slot Selector -->
          <div class="space-y-1.5 bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)]">
            <label class="text-[10px] font-bold text-gray-400 block uppercase">Jadwal Jam Keberangkatan</label>
            <div class="grid grid-cols-4 gap-2">
              ${this.timeSlots.map(slot => `
                <button data-slot="${slot.time}" class="rail-timeslot-btn py-2 px-1 rounded-xl text-center border transition-all btn-tactile ${
                  this.selectedTimeSlot === slot.time
                    ? 'border-[#EB4E70] bg-[#EB4E70] text-white font-extrabold shadow-sm'
                    : 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] font-bold hover:border-[#EB4E70]'
                }">
                  <span class="text-[9px] block opacity-80 uppercase">${slot.label}</span>
                  <span class="text-xs font-black block">${slot.time}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Interactive Carriage & Seat Picker Grid -->
          <div class="space-y-3 bg-gray-50 dark:bg-[#2A141A] p-3 rounded-xl border border-[var(--border-color)]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                ${svgIcons.seat('#EB4E70', 16)}
                <span class="text-[11px] font-extrabold text-[var(--text-main)]">Pilih Gerbong & Kursi</span>
              </div>
              <span id="rail-selected-seat-badge" class="text-[10px] px-2 py-0.5 rounded-md bg-[#FDE5E7] text-[#EB4E70] font-black">
                ${this.selectedCarriage} - ${this.selectedSeatNumber}
              </span>
            </div>

            <!-- Carriage Selector Carousel (Gerbong Real-time) -->
            <div class="space-y-1">
              <span class="text-[9px] font-bold text-gray-400 block uppercase">Pilih Gerbong Kereta:</span>
              <div id="rail-carriage-container" class="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                ${this.renderCarriageButtons()}
              </div>
            </div>

            <!-- Seat Matrix (2x2 Grid with A, B - LORONG - C, D) -->
            <div class="pt-1">
              <div class="grid grid-cols-5 gap-1.5 max-w-[260px] mx-auto text-center font-extrabold text-[10px] text-gray-400 mb-1">
                <span>A</span><span>B</span><span class="text-[9px] text-gray-300">LORONG</span><span>C</span><span>D</span>
              </div>
              <div id="rail-seat-matrix" class="space-y-1.5 max-w-[260px] mx-auto">
                ${this.renderSeatMatrix()}
              </div>
            </div>

            <div class="flex items-center justify-center gap-4 pt-2 text-[9px] text-gray-400 font-bold border-t border-[var(--border-color)]">
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 rounded bg-white dark:bg-[#140B0D] border border-[var(--border-color)]"></div>
                <span>Tersedia</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 rounded bg-[#EB4E70]"></div>
                <span>Dipilih</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="w-3 h-3 rounded bg-gray-300 dark:bg-gray-700 opacity-60"></div>
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
              <button id="rail-scroll-left" class="absolute left-0 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 shadow border border-[var(--border-color)] text-[#EB4E70] font-black text-xs flex items-center justify-center -ml-2 hover:scale-110 active:scale-95 transition-transform">‹</button>
              <div id="rail-calendar-carousel" class="date-carousel-container flex gap-2 overflow-x-auto no-scrollbar pb-1 px-3 scroll-smooth w-full"></div>
              <button id="rail-scroll-right" class="absolute right-0 z-20 w-7 h-7 rounded-full bg-white/90 dark:bg-black/80 shadow border border-[var(--border-color)] text-[#EB4E70] font-black text-xs flex items-center justify-center -mr-2 hover:scale-110 active:scale-95 transition-transform">›</button>
            </div>
          </div>

          <!-- Leaflet Interactive Railway Map -->
          <div class="space-y-1">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">${t('routeMap') || 'Peta Jalur Kereta Api'}</label>
              <span id="rail-route-dist" class="text-[10px] font-extrabold text-[#EB4E70]"></span>
            </div>
            <div class="relative w-full h-44 rounded-2xl border border-[var(--border-color)] overflow-hidden z-10">
              <div id="rail-map" class="w-full h-full"></div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between px-1">
          <h2 class="text-sm font-extrabold tracking-wide">${t('availableTrains') || 'Jadwal Kereta Tersedia'}</h2>
          <span id="rail-count-badge" class="text-xs text-gray-400 font-bold">${t('loading') || 'Memuat...'}</span>
        </div>

        <section id="rail-results-container" class="space-y-3"></section>
      </div>
    `;

    this.bindEvents();
    this.initCalendarWindow();
    this.initRailMap();
    this.renderRailSchedule();
  },

  playAudio(soundType, pitchMult = 1) {
    if (this.soundEngine && typeof this.soundEngine[soundType] === 'function') {
      this.soundEngine[soundType](pitchMult);
    } else if (typeof window.playSound === 'function') {
      window.playSound(soundType);
    }
  },

  getCarriagesForRoute() {
    if (this.railIsland === 'Sulawesi') {
      return ['Gerbong 1', 'Gerbong 2', 'Gerbong 3'];
    }
    if (this.railIsland === 'Sumatra') {
      return ['Gerbong 1', 'Gerbong 2', 'Gerbong 3', 'Gerbong 4'];
    }
    if (this.railCategory === 'commuter' || this.railCategory === 'airport') {
      return ['KRL-1', 'KRL-2', 'KRL-3', 'KRL-4'];
    }
    return ['Exec 1', 'Exec 2', 'Exec 3', 'Exec 4', 'Eko 1', 'Eko 2'];
  },

  renderCarriageButtons() {
    const carriages = this.getCarriagesForRoute();
    if (!carriages.includes(this.selectedCarriage)) {
      this.selectedCarriage = carriages[0];
    }

    return carriages.map(c => `
      <button data-carriage="${c}" class="rail-carriage-btn flex-shrink-0 px-3 py-1 rounded-lg text-xs font-extrabold border transition-all btn-tactile ${
        this.selectedCarriage === c
          ? 'bg-[#EB4E70] text-white border-[#EB4E70] shadow-sm'
          : 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] hover:border-[#EB4E70]'
      }">
        ${c}
      </button>
    `).join('');
  },

  getOccupiedSeatsForDate() {
    const seed = `${this.selectedDateStr}-${this.originKey}-${this.destKey}-${this.selectedTimeSlot}-${this.selectedCarriage}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }

    const allSeats = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D', '5A', '5B', '5C', '5D'];
    const occupied = [];

    allSeats.forEach((seat, idx) => {
      if (Math.abs((hash + idx * 17) % 3) === 0) {
        occupied.push(seat);
      }
    });

    return occupied;
  },

  renderSeatMatrix() {
    let rowsHtml = '';
    const seatCols = ['A', 'B', 'GAP', 'C', 'D'];
    const occupiedSeats = this.getOccupiedSeatsForDate();

    for (let r = 1; r <= 5; r++) {
      rowsHtml += `<div class="grid grid-cols-5 gap-1.5">`;
      seatCols.forEach(col => {
        if (col === 'GAP') {
          rowsHtml += `<div class="flex items-center justify-center text-[9px] text-gray-300 font-bold opacity-40">${r}</div>`;
        } else {
          const seatId = `${r}${col}`;
          const isOccupied = occupiedSeats.includes(seatId);
          const isSelected = this.selectedSeatNumber === seatId;

          let btnClass = 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] hover:border-[#EB4E70]';
          if (isOccupied) {
            btnClass = 'bg-gray-200 dark:bg-gray-800 text-gray-400 border-transparent cursor-not-allowed opacity-50';
          } else if (isSelected) {
            btnClass = 'bg-[#EB4E70] text-white border-[#EB4E70] font-black shadow-md ring-2 ring-[#EB4E70]/40 scale-105';
          }

          rowsHtml += `
            <button data-seat="${seatId}" ${isOccupied ? 'disabled' : ''} class="rail-seat-btn py-1.5 rounded-lg border text-xs font-bold transition-all btn-tactile ${btnClass}">
              ${seatId}
            </button>
          `;
        }
      });
      rowsHtml += `</div>`;
    }
    return rowsHtml;
  },

  renderIslandOptions(selectedIsland) {
    return this.islands.map(is => `
      <option value="${is}" ${is === selectedIsland ? 'selected' : ''}>Pulau ${is}</option>
    `).join('');
  },

  renderCategoryButtons() {
    const cats = this.islandCategories[this.railIsland] || this.islandCategories.Jawa;
    return cats.map(cat => `
      <button data-cat="${cat.id}" class="rail-cat-btn flex-shrink-0 px-3 py-1 rounded-lg text-xs font-extrabold border transition-all btn-tactile ${
        this.railCategory === cat.id
          ? 'bg-[#EB4E70] text-white border-[#EB4E70] shadow-sm'
          : 'border-[var(--border-color)] text-gray-400 hover:text-[var(--text-main)] hover:border-[#EB4E70]'
      }">
        ${cat.label}
      </button>
    `).join('');
  },

  renderStationOptions(selectedKey) {
    const validStations = Object.keys(this.stations).filter(key => this.stations[key].island === this.railIsland);
    if (validStations.length === 0) return `<option value="">Tidak ada stasiun</option>`;

    return validStations.map(key => {
      const st = this.stations[key];
      return `<option value="${key}" ${key === selectedKey ? 'selected' : ''}>${st.city} - ${st.name} (${st.code})</option>`;
    }).join('');
  },

  bindEvents() {
    const islandSelect = document.getElementById('rail-island-select');
    const originSelect = document.getElementById('rail-origin-select');
    const destSelect = document.getElementById('rail-dest-select');

    islandSelect.onchange = (e) => {
      this.playAudio('click');
      this.railIsland = e.target.value;
      this.railCategory = 'all';

      const filteredKeys = Object.keys(this.stations).filter(k => this.stations[k].island === this.railIsland);
      this.originKey = filteredKeys[0] || '';
      this.destKey = filteredKeys[1] || filteredKeys[0] || '';

      document.getElementById('rail-category-container').innerHTML = this.renderCategoryButtons();
      this.bindCategoryEvents();

      originSelect.innerHTML = this.renderStationOptions(this.originKey);
      destSelect.innerHTML = this.renderStationOptions(this.destKey);

      this.updateCarriageGrid();
      this.onRouteChanged();
    };

    originSelect.onchange = (e) => {
      this.playAudio('click');
      this.originKey = e.target.value;
      if (this.originKey === this.destKey) {
        showToast('Stasiun asal dan tujuan tidak boleh sama.');
      }
      this.onRouteChanged();
    };

    destSelect.onchange = (e) => {
      this.playAudio('click');
      this.destKey = e.target.value;
      if (this.originKey === this.destKey) {
        showToast('Stasiun asal dan tujuan tidak boleh sama.');
      }
      this.onRouteChanged();
    };

    // Time Slot Selector
    const timeSlotBtns = document.querySelectorAll('.rail-timeslot-btn');
    timeSlotBtns.forEach(btn => {
      btn.onclick = () => {
        const slot = btn.dataset.slot;
        if (this.selectedTimeSlot === slot) return;

        this.playAudio('click');
        this.selectedTimeSlot = slot;

        timeSlotBtns.forEach(b => {
          const isCurr = b.dataset.slot === slot;
          b.className = `rail-timeslot-btn py-2 px-1 rounded-xl text-center border transition-all btn-tactile ${
            isCurr
              ? 'border-[#EB4E70] bg-[#EB4E70] text-white font-extrabold shadow-sm'
              : 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] font-bold hover:border-[#EB4E70]'
          }`;
        });
        this.updateSeatGrid();
        this.renderRailSchedule();
      };
    });

    this.bindCategoryEvents();
    this.bindCarriageEvents();
    this.bindSeatMatrixEvents();

    document.getElementById('rail-swap-btn').onclick = () => this.swapRoute();
    document.getElementById('rail-passenger-input').oninput = (e) => {
      this.passengerName = e.target.value.trim() || 'User NUSA';
    };

    const carousel = document.getElementById('rail-calendar-carousel');
    document.getElementById('rail-scroll-left').onclick = (e) => {
      e.stopPropagation();
      carousel.scrollBy({ left: -140, behavior: 'smooth' });
    };
    document.getElementById('rail-scroll-right').onclick = (e) => {
      e.stopPropagation();
      carousel.scrollBy({ left: 140, behavior: 'smooth' });
    };
  },

  bindCategoryEvents() {
    const catBtns = document.querySelectorAll('.rail-cat-btn');
    catBtns.forEach(btn => {
      btn.onclick = () => {
        const cat = btn.dataset.cat;
        if (this.railCategory === cat) return;

        this.playAudio('click');
        this.railCategory = cat;

        catBtns.forEach(b => {
          const isCurr = b.dataset.cat === cat;
          b.className = `rail-cat-btn flex-shrink-0 px-3 py-1 rounded-lg text-xs font-extrabold border transition-all btn-tactile ${
            isCurr
              ? 'bg-[#EB4E70] text-white border-[#EB4E70] shadow-sm'
              : 'border-[var(--border-color)] text-gray-400 hover:text-[var(--text-main)] hover:border-[#EB4E70]'
          }`;
        });
        this.updateCarriageGrid();
        this.renderRailSchedule();
      };
    });
  },

  bindCarriageEvents() {
    const carriageBtns = document.querySelectorAll('.rail-carriage-btn');
    carriageBtns.forEach(btn => {
      btn.onclick = () => {
        const c = btn.dataset.carriage;
        if (this.selectedCarriage === c) return;

        this.playAudio('click');
        this.selectedCarriage = c;

        carriageBtns.forEach(b => {
          const isCurr = b.dataset.carriage === c;
          b.className = `rail-carriage-btn flex-shrink-0 px-3 py-1 rounded-lg text-xs font-extrabold border transition-all btn-tactile ${
            isCurr
              ? 'bg-[#EB4E70] text-white border-[#EB4E70] shadow-sm'
              : 'border-[var(--border-color)] bg-white dark:bg-[#140B0D] text-[var(--text-main)] hover:border-[#EB4E70]'
          }`;
        });

        const badge = document.getElementById('rail-selected-seat-badge');
        if (badge) badge.innerText = `${this.selectedCarriage} - ${this.selectedSeatNumber}`;

        this.updateSeatGrid();
      };
    });
  },

  bindSeatMatrixEvents() {
    const seatBtns = document.querySelectorAll('.rail-seat-btn:not([disabled])');
    seatBtns.forEach(btn => {
      btn.onclick = () => {
        const seatId = btn.dataset.seat;
        this.playAudio('pop', 1.2);

        this.selectedSeatNumber = seatId;
        const badge = document.getElementById('rail-selected-seat-badge');
        if (badge) badge.innerText = `${this.selectedCarriage} - ${this.selectedSeatNumber}`;

        this.updateSeatGrid();
      };
    });
  },

  updateCarriageGrid() {
    const carriageContainer = document.getElementById('rail-carriage-container');
    if (carriageContainer) {
      carriageContainer.innerHTML = this.renderCarriageButtons();
      this.bindCarriageEvents();
    }
    this.updateSeatGrid();
  },

  updateSeatGrid() {
    const matrixContainer = document.getElementById('rail-seat-matrix');
    if (matrixContainer) {
      matrixContainer.innerHTML = this.renderSeatMatrix();
      this.bindSeatMatrixEvents();
    }
  },

  swapRoute() {
    this.playAudio('pop');

    this.swapRotation += 180;
    const iconContainer = document.getElementById('rail-swap-icon-container');
    if (iconContainer) {
      iconContainer.style.transform = `rotate(${this.swapRotation}deg)`;
    }

    if (this.originKey === this.destKey) return;

    const temp = this.originKey;
    this.originKey = this.destKey;
    this.destKey = temp;

    document.getElementById('rail-origin-select').value = this.originKey;
    document.getElementById('rail-dest-select').value = this.destKey;

    showToast(`Stasiun ditukar: ${this.stations[this.originKey].code} ➔ ${this.stations[this.destKey].code}`);
    this.onRouteChanged();
  },

  onRouteChanged() {
    this.initRailMap();
    this.updateCarriageGrid();
    this.renderRailSchedule();
  },

  initCalendarWindow() {
    const carousel = document.getElementById('rail-calendar-carousel');
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
      btn.className = `rail-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
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
        document.querySelectorAll('.rail-date-pill').forEach(p => {
          p.className = 'rail-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] font-bold text-center flex flex-col items-center justify-center transition-all hover:border-[#EB4E70]';
        });
        btn.className = 'rail-date-pill flex-shrink-0 p-2.5 px-3.5 rounded-2xl border border-[#EB4E70] bg-[#EB4E70] text-white font-extrabold text-center flex flex-col items-center justify-center transition-all shadow-md';
        this.selectedDateStr = isoDate;
        
        this.updateSeatGrid();
        this.renderRailSchedule();
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

  initRailMap() {
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }

    const origin = this.stations[this.originKey];
    const dest = this.stations[this.destKey];

    if (!origin || !dest || !origin.coords || !dest.coords) return;

    const dist = this.calculateDistance(origin.coords, dest.coords);

    const distLabel = document.getElementById('rail-route-dist');
    if (distLabel) distLabel.innerText = `Jarak: ~${dist} km`;

    const map = L.map('rail-map', { zoomControl: false, attributionControl: false }).setView(origin.coords, 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const createPin = (label, color) => L.divIcon({
      className: 'custom-station-pin',
      html: `<div style="background:#1F2937; color:${color}; padding:3px 8px; border-radius:12px; font-weight:900; font-size:10px; border:2px solid ${color}; box-shadow:0 4px 10px rgba(0,0,0,0.3); white-space:nowrap;">${label}</div>`
    });

    L.marker(origin.coords, { icon: createPin(`DEP: ${origin.code}`, '#FD9799') }).addTo(map);
    L.marker(dest.coords, { icon: createPin(`ARR: ${dest.code}`, '#EB4E70') }).addTo(map);

    const polyline = L.polyline([origin.coords, dest.coords], {
      color: '#EB4E70',
      weight: 4,
      dashArray: '6, 6',
      opacity: 0.85
    }).addTo(map);

    map.fitBounds(polyline.getBounds(), { padding: [30, 30] });
    this.mapInstance = map;
  },

  generateRailInventory() {
    const origin = this.stations[this.originKey];
    const dest = this.stations[this.destKey];

    if (!origin || !dest || origin.code === dest.code) return [];

    const isSulawesi = this.railIsland === 'Sulawesi';
    const baseHour = parseInt(this.selectedTimeSlot.split(':')[0], 10);

    // 1. SULAWESI ROUTE (Real-time KA Perintis Andalan Celebes)
    if (isSulawesi) {
      return [
        {
          id: `RAIL-SULAWESI-1`,
          trainName: 'KA Perintis Andalan Celebes',
          trainClass: 'Ekonomi Perintis',
          catId: 'perintis',
          seatsLeft: 18,
          depTime: `${String(baseHour).padStart(2, '0')}:30`,
          arrTime: `${String((baseHour + 1) % 24).padStart(2, '0')}:45`,
          durationFormatted: '1j 45m',
          price: 10000
        },
        {
          id: `RAIL-SULAWESI-2`,
          trainName: 'KA Makassar - Parepare Express',
          trainClass: 'Ekonomi Perintis',
          catId: 'perintis',
          seatsLeft: 24,
          depTime: `${String((baseHour + 3) % 24).padStart(2, '0')}:15`,
          arrTime: `${String((baseHour + 5) % 24).padStart(2, '0')}:05`,
          durationFormatted: '1j 50m',
          price: 10000
        }
      ];
    }

    // 2. SUMATRA ROUTES
    if (this.railIsland === 'Sumatra') {
      return [
        {
          id: `RAIL-SUMATRA-1`,
          trainName: 'Commuter Line Sri Lelawangsa',
          trainClass: 'Ekonomi Commuter',
          catId: 'commuter',
          seatsLeft: 32,
          depTime: `${String(baseHour).padStart(2, '0')}:15`,
          arrTime: `${String(baseHour).padStart(2, '0')}:40`,
          durationFormatted: '25m',
          price: 5000
        },
        {
          id: `RAIL-SUMATRA-2`,
          trainName: 'KA Railink Bandara Kualanamu',
          trainClass: 'Eksekutif Bandara',
          catId: 'airport',
          seatsLeft: 14,
          depTime: `${String((baseHour + 1) % 24).padStart(2, '0')}:00`,
          arrTime: `${String((baseHour + 1) % 24).padStart(2, '0')}:45`,
          durationFormatted: '45m',
          price: 50000
        }
      ];
    }

    // 3. JAWA ROUTES
    const javaTemplates = [
      { name: 'KA Argo Parahyangan', class: 'Eksekutif & Ekonomi', catId: 'intercity', price: 150000, durMin: 170 },
      { name: 'KA Taksaka Sky', class: 'Executive Luxury', catId: 'intercity', price: 380000, durMin: 360 },
      { name: 'KA Gajayana VIP', class: 'Eksekutif Suite', catId: 'intercity', price: 420000, durMin: 400 },
      { name: 'Commuter Line Jogja-Solo', class: 'KRL Commuter', catId: 'commuter', price: 8000, durMin: 68 },
      { name: 'LRT Jabodebek Express', class: 'LRT Bandara', catId: 'airport', price: 20000, durMin: 45 }
    ];

    let filtered = javaTemplates;
    if (this.railCategory !== 'all') {
      filtered = javaTemplates.filter(t => t.catId === this.railCategory);
      if (filtered.length === 0) filtered = javaTemplates.slice(0, 2);
    }

    return filtered.map((tmpl, idx) => {
      const slotH = (baseHour + idx * 2) % 24;
      const depTotal = slotH * 60 + 15;
      const arrTotal = depTotal + tmpl.durMin;

      const arrH = Math.floor((arrTotal / 60) % 24);
      const arrM = arrTotal % 60;

      const durH = Math.floor(tmpl.durMin / 60);
      const durM = tmpl.durMin % 60;

      return {
        id: `RAIL-JAWA-${idx}`,
        trainName: tmpl.name,
        trainClass: tmpl.class,
        catId: tmpl.catId,
        seatsLeft: 10 + (idx * 6),
        depTime: `${String(slotH).padStart(2, '0')}:15`,
        arrTime: `${String(arrH).padStart(2, '0')}:${String(arrM).padStart(2, '0')}`,
        durationFormatted: `${durH > 0 ? durH + 'j ' : ''}${durM}m`,
        price: tmpl.price
      };
    });
  },

  renderRailSchedule() {
    const container = document.getElementById('rail-results-container');
    const badge = document.getElementById('rail-count-badge');
    if (!container) return;
    container.innerHTML = '';

    const trains = this.generateRailInventory();
    if (badge) badge.innerText = `${trains.length} Kereta Tersedia`;

    if (trains.length === 0) {
      container.innerHTML = `
        <div class="tactile-card p-6 text-center space-y-3 border-2 border-dashed border-[#EB4E70]/40 my-4">
          <div class="w-12 h-12 rounded-full bg-[#FDE5E7] flex items-center justify-center mx-auto text-[#EB4E70]">
            ${svgIcons.train('#EB4E70', 22)}
          </div>
          <p class="font-extrabold text-xs text-gray-400">Tidak ada rute kereta langsung pada stasiun ini.</p>
        </div>
      `;
      return;
    }

    trains.forEach((train) => {
      const card = document.createElement('div');
      card.className = 'tactile-card p-4 space-y-3';
      card.innerHTML = `
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            ${svgIcons.train('#EB4E70', 18)}
            <span class="font-black text-xs text-[var(--text-main)]">${train.trainName}</span>
            <span class="text-[9px] font-extrabold px-2 py-0.5 rounded-md bg-rose-50 text-[#EB4E70] dark:bg-rose-950/50 dark:text-[#FD9799]">
              ${train.trainClass}
            </span>
          </div>
          <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
            Sisa ${train.seatsLeft} Kursi
          </span>
        </div>

        <div class="flex items-center justify-between text-center bg-gray-50 dark:bg-[#2A141A] p-3 rounded-xl border border-[var(--border-color)]">
          <div class="text-left">
            <span class="text-lg font-black block leading-none">${train.depTime}</span>
            <span class="text-[10px] text-gray-400 font-extrabold uppercase">${this.originKey}</span>
          </div>

          <div class="flex flex-col items-center px-2">
            <span class="text-[10px] font-bold text-[#EB4E70]">${train.durationFormatted}</span>
            <div class="w-20 h-[2px] bg-gradient-to-r from-[#EB4E70] to-[#FD9799] my-1 relative">
              <div class="w-1.5 h-1.5 rounded-full bg-[#EB4E70] absolute -top-0.5 left-1/2 -translate-x-1/2"></div>
            </div>
            <span class="text-[9px] text-gray-400 font-bold">${this.selectedCarriage} - ${this.selectedSeatNumber}</span>
          </div>

          <div class="text-right">
            <span class="text-lg font-black block leading-none">${train.arrTime}</span>
            <span class="text-[10px] text-gray-400 font-extrabold uppercase">${this.destKey}</span>
          </div>
        </div>

        <div class="flex items-center justify-between pt-1 border-t border-[var(--border-color)]">
          <div>
            <span class="text-[9px] text-gray-400 block font-bold">Harga per orang</span>
            <span class="text-base font-black text-[#EB4E70]">Rp ${train.price.toLocaleString('id-ID')}</span>
          </div>
          <button class="book-rail-btn px-5 py-2.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white text-xs font-extrabold rounded-xl shadow-md btn-tactile active:scale-95 transition-transform">
            Pilih Kursi & Pesan
          </button>
        </div>
      `;

      card.querySelector('.book-rail-btn').onclick = (e) => {
        this.playAudio('chime');
        if (window.spawnParticleBurst) {
          const rect = e.target.getBoundingClientRect();
          window.spawnParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
        this.checkoutRail(train);
      };

      container.appendChild(card);
    });
  },

  checkoutRail(train) {
    showToast(`Memproses tiket ${train.trainName}...`);

    const summaryHtml = `
      <div class="space-y-2">
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Layanan</span><span>NusaRail (${train.trainName})</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Rute Kereta</span><span>${this.stations[this.originKey].name} ➔ ${this.stations[this.destKey].name}</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Jadwal</span><span>${train.depTime} - ${train.arrTime} (${this.selectedDateStr})</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Kelas & Kursi</span><span>${train.trainClass} | ${this.selectedCarriage} - ${this.selectedSeatNumber}</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Penumpang</span><span class="text-[#EB4E70] font-black">${this.passengerName}</span></div>
        <div class="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between font-extrabold text-sm">
          <span>Total Bayar</span>
          <span class="text-[#EB4E70]">Rp ${train.price.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `;

    if (window.openPaymentDrawerWithAmount) {
      window.openPaymentDrawerWithAmount(train.price, summaryHtml);
    }
  }
};

export function renderNusaRail(container, soundEngine = null) {
  NusaRail.init(container, soundEngine);
}