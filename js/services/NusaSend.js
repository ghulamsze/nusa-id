import { showToast } from '../utils/toast.js';
import { t } from '../utils/i18n.js';

/**
 * NusaSend.js - Kurir & Pengiriman Paket Nusa Super-App (2026)
 * Upgraded: Compact "Set Tujuan" Button, Dynamic Fleet Pool (Motor/Truk/Pesawat Kargo),
 * Map-Pin State Deactivation, Refreshable GPS, and Scalable Dynamic Tariff Engine.
 */

const svgIcons = {
  package: (size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>`,
  mapPin: (size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`,
  truck: (size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="3" width="15" height="13"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>`,
  lightning: (size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>`,
  clock: (size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`,
  chevronRight: (size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>`,
  gps: (color = 'currentColor', size = 14) => `
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
  search: (size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>`,
  refresh: (size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21.5 2v6h-6M2.5 22v-6h6"/>
      <path d="M21.15 13.01A9 9 0 1 1 15 3.51l6.5 4.5"/>
    </svg>`
};

export const NusaSend = {
  soundEngine: null,
  map: null,
  activeMapTarget: null,
  isCustomPinMode: false,

  pickupCoords: [-5.147665, 119.432732],
  dropoffCoords: [-5.2054, 119.4983],
  pickupAddress: 'Mendeteksi Lokasi GPS...',
  dropoffAddress: 'UINAM Samata, Gowa',

  senderName: 'User NUSA',
  senderPhone: '081234567890',
  receiverName: 'Penerima Paket',
  receiverPhone: '089876543210',

  packageWeight: 1,
  packageType: 'Dokumen / Barang Kecil',
  selectedService: 'instant',

  selectedIsland: 'Sulawesi',
  selectedCity: 'MAK',
  selectedLandmark: 'UINAM Samata',

  indonesiaTerritories: {
    'Sulawesi': {
      MAK: {
        name: 'Makassar',
        coords: [-5.1476, 119.4327],
        landmarks: [
          { name: 'Pantai Losari', coords: [-5.1433, 119.4070], address: 'Jl. Penghibur' },
          { name: 'Mall Panakkukang (MP)', coords: [-5.1565, 119.4475], address: 'Jl. Boulevard' },
          { name: 'UNHAS Tamalanrea', coords: [-5.1330, 119.4860], address: 'Jl. Perintis Kemerdekaan' },
          { name: 'Center Point of Indonesia (CPI)', coords: [-5.1435, 119.4038], address: 'Kawasan CPI' },
          { name: 'Nipah Park', coords: [-5.1375, 119.4525], address: 'Jl. Urip Sumoharjo' },
          { name: 'Bandara Sultan Hasanuddin', coords: [-5.0614, 119.5540], address: 'Maros / Makassar' }
        ]
      },
      GOW: {
        name: 'Gowa',
        coords: [-5.2054, 119.4983],
        landmarks: [
          { name: 'UINAM Samata', coords: [-5.2054, 119.4983], address: 'Jl. H.M. Yasin Limpo' },
          { name: 'UNHAS Kampus Teknik Gowa', coords: [-5.2304, 119.5025], address: 'Jl. Poros Malino' },
          { name: 'Sungguminasa Pusat', coords: [-5.2155, 119.4560], address: 'Jl. Tumanurung' }
        ]
      },
      PLP: {
        name: 'Palopo',
        coords: [-2.9945, 120.1956],
        landmarks: [
          { name: 'Pusat Kota Palopo', coords: [-2.9945, 120.1956], address: 'Jl. Jend. Sudirman' },
          { name: 'Lapangan Pancasila Palopo', coords: [-2.9920, 120.1910], address: 'Pusat Kota' },
          { name: 'Pelabuhan Tanjung Ringgit', coords: [-3.0010, 120.2105], address: 'Palopo Timur' }
        ]
      },
      PAR: {
        name: 'Parepare',
        coords: [-4.0125, 119.6242],
        landmarks: [
          { name: 'Monumen Habibie Ainun', coords: [-4.0125, 119.6242], address: 'Alun-Alun Parepare' },
          { name: 'Pelabuhan Nusantara Parepare', coords: [-4.0090, 119.6190], address: 'Jl. Yos Sudarso' }
        ]
      },
      MND: {
        name: 'Manado',
        coords: [1.4748, 124.8428],
        landmarks: [
          { name: 'Kawasan Megamas', coords: [1.4820, 124.8350], address: 'Jl. Piere Tendean' },
          { name: 'Bandara Sam Ratulangi', coords: [1.5494, 124.9262], address: 'Lapangan' }
        ]
      },
      PLU: {
        name: 'Palu',
        coords: [-0.9003, 119.8779],
        landmarks: [
          { name: 'Taman Vatulemo', coords: [-0.8980, 119.8770], address: 'Palu Selatan' }
        ]
      },
      KDR: {
        name: 'Kendari',
        coords: [-3.9985, 122.5126],
        landmarks: [
          { name: 'Tugu Religi Sultra', coords: [-3.9870, 122.5110], address: 'Kawasan MTQ' }
        ]
      }
    },
    'Jawa': {
      JKT: {
        name: 'Jakarta',
        coords: [-6.2088, 106.8456],
        landmarks: [
          { name: 'Grand Indonesia', coords: [-6.1950, 106.8230], address: 'MH Thamrin' },
          { name: 'Bandara Soekarno-Hatta', coords: [-6.1275, 106.6537], address: 'Cengkareng' },
          { name: 'Monas Pusat', coords: [-6.1754, 106.8272], address: 'Jakarta Pusat' }
        ]
      },
      SBY: {
        name: 'Surabaya',
        coords: [-7.2575, 112.7521],
        landmarks: [
          { name: 'Tunjungan Plaza', coords: [-7.2622, 112.7384], address: 'Jl. Basuki Rahmat' }
        ]
      },
      BDG: {
        name: 'Bandung',
        coords: [-6.9175, 107.6191],
        landmarks: [
          { name: 'Gedung Sate', coords: [-6.9025, 107.6186], address: 'Jl. Diponegoro' }
        ]
      }
    },
    'Sumatera': {
      MDN: {
        name: 'Medan',
        coords: [3.5952, 98.6722],
        landmarks: [
          { name: 'Sun Plaza Medan', coords: [3.5855, 98.6710], address: 'Jl. KH Zainul Arifin' }
        ]
      }
    },
    'Bali & NTB': {
      BAL: {
        name: 'Bali (Denpasar)',
        coords: [-8.6705, 115.2126],
        landmarks: [
          { name: 'Kuta Beach', coords: [-8.7180, 115.1690], address: 'Badung, Bali' }
        ]
      }
    }
  },

  services: [
    {
      id: 'instant',
      name: 'NusaSend Instant',
      desc: 'Tiba dalam 1-2 jam • Motor Kurir',
      icon: svgIcons.lightning(18)
    },
    {
      id: 'sameday',
      name: 'NusaSend SameDay',
      desc: 'Tiba di hari yang sama • Motor',
      icon: svgIcons.clock(18)
    },
    {
      id: 'intercity',
      name: 'NusaExpress Reguler',
      desc: 'Pengiriman Seluruh Indonesia (1-3 Hari)',
      icon: svgIcons.package(18)
    },
    {
      id: 'cargo',
      name: 'NusaCargo (Mobil/PickUp)',
      desc: 'Paket besar & berat up to 50kg',
      icon: svgIcons.truck(18)
    }
  ],

  couriersPool: {
    local: {
      names: ['Rahmat Hidayat', 'Fajar Pratama', 'Dg. Sila', 'Budi Santoso', 'Andi Arfan'],
      vehicles: ['Honda Vario 160 Hitam', 'Yamaha NMAX 155 Merah', 'Honda BeAT Street'],
      plates: ['DD 4582 XA', 'DD 3892 KLG', 'DD 1092 AB']
    },
    intercity: {
      names: ['Bambang Supriyanto (Driver Kargo)', 'Agus Hermawan (Ekspedisi Darat)', 'Hendra Trans (L300)'],
      vehicles: ['Truk Box Isuzu Elf Long', 'Mitsubishi L300 Box Cargo', 'Hino Dutro Logistics'],
      plates: ['B 9081 UTR', 'DD 8721 CC', 'L 9281 DD']
    },
    interisland: {
      names: ['NusaAir Cargo Flight NC-204', 'Kapal Roro Express Cargo', 'Armada Logistik Hava Air'],
      vehicles: ['Pesawat Kargo Boeing 737-800F', 'Airbus A330 Freighter', 'Kapal Kontainer Express'],
      plates: ['PK-NSA (Flight)', 'KM-NUSA-01', 'PK-NUB (Air Cargo)']
    }
  },

  searchTimer: null,
  assignedCourier: null,

  init(targetContainerId, soundEngine = null) {
    const container = typeof targetContainerId === 'string'
      ? document.getElementById(targetContainerId)
      : targetContainerId;
    if (!container) return;

    this.soundEngine = soundEngine || window.NusaSoundEngine;
    this.injectStyles();

    container.innerHTML = `
      <div id="nusasend-engine-panel" class="space-y-4">
        <!-- Header & Card Utama -->
        <div class="tactile-card p-4 space-y-4">
          <div class="flex items-center justify-between">
            <h1 class="text-xs font-bold uppercase tracking-wider text-gray-400">Layanan Kurir & Pengiriman</h1>
            <span class="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDE5E7] text-[#EB4E70] font-extrabold">NUSA Send 2026</span>
          </div>

          <!-- MAP CONTAINER -->
          <div class="space-y-1.5">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold text-gray-400 block uppercase tracking-wide">Peta Pengiriman & Lokasi</label>
              <div class="flex items-center gap-1.5">
                <span class="text-[9px] bg-[#FDE5E7] dark:bg-[#2A141A] text-[#EB4E70] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                  ${svgIcons.gps('#EB4E70', 10)} GPS Aktif
                </span>
                <button id="send-target-dest-btn" class="px-2.5 py-1 text-[11px] font-bold rounded-lg text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-[#2A141A] border border-[var(--border-color)] transition-colors hover:border-[#EB4E70] cursor-pointer inline-flex items-center gap-1">
                  ${svgIcons.mapPin(12)}
                  <span>Set Tujuan</span>
                </button>
              </div>
            </div>

            <div class="relative w-full h-44 rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-inner">
              <div id="nusasend-map" class="w-full h-full z-0 cursor-crosshair"></div>
              <div class="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-[10px] font-bold flex justify-between items-center z-10 pointer-events-none">
                <span>Jarak Estimasi: <strong id="nusasend-distance-val" class="text-[#EB4E70]">0.0 km</strong></span>
                <span id="nusasend-route-badge" class="bg-[#EB4E70]/20 text-[#EB4E70] px-2 py-0.5 rounded text-[9px]">Rute Aktif</span>
              </div>
            </div>
          </div>

          <!-- SELEKSI HIERARKI TUJUAN: PULAU / KOTA / LANDMARK -->
          <div id="send-location-dropdown-group" class="space-y-2.5 pt-1 border-t border-[var(--border-color)] transition-opacity duration-200">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">Tentukan Lokasi Tujuan Paket</label>
              <span id="send-pin-indicator" class="text-[9px] text-[#EB4E70] font-extrabold">Pulau → Kota → Landmark</span>
            </div>

            <!-- Cari Kota Quick Search Bar -->
            <div class="relative flex items-center bg-gray-50 dark:bg-[#2A141A] rounded-xl border border-[var(--border-color)] px-2.5 py-1.5 focus-within:border-[#EB4E70]">
              <span class="text-gray-400 mr-2">${svgIcons.search(14)}</span>
              <input type="text" id="send-city-search-input" placeholder="Cari Kota di Indonesia (mis. Palopo, Surabaya, Medan)..." class="w-full bg-transparent text-xs font-bold text-[var(--text-main)] outline-none placeholder:text-gray-400 placeholder:font-normal" />
              <button id="send-clear-search-btn" class="hidden text-gray-400 hover:text-[#EB4E70] text-xs font-bold px-1">✕</button>
            </div>

            <!-- 3 Dropdown Bertingkat -->
            <div class="grid grid-cols-3 gap-1.5">
              <div>
                <label class="text-[9px] font-bold text-gray-400 block uppercase mb-1">Pulau</label>
                <select id="send-island-select" class="w-full p-2 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70]">
                  ${this.renderIslandOptions()}
                </select>
              </div>

              <div>
                <label class="text-[9px] font-bold text-gray-400 block uppercase mb-1">Kota</label>
                <select id="send-city-select" class="w-full p-2 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[#EB4E70] outline-none focus:border-[#EB4E70]">
                  ${this.renderCityOptions()}
                </select>
              </div>

              <div>
                <label class="text-[9px] font-bold text-gray-400 block uppercase mb-1">Landmark</label>
                <select id="send-landmark-select" class="w-full p-2 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70]">
                  ${this.renderLandmarkOptions()}
                </select>
              </div>
            </div>

            <!-- Detail Alamat Dropoff -->
            <div class="flex items-center bg-gray-50 dark:bg-[#2A141A] rounded-xl border border-[var(--border-color)] p-2.5">
              <span class="w-2.5 h-2.5 rounded-full bg-[#EB4E70] mr-2 flex-shrink-0"></span>
              <input type="text" id="send-dropoff-input" value="${this.dropoffAddress}" placeholder="Alamat detail / nomor rumah tujuan..." class="w-full bg-transparent font-bold text-xs text-[var(--text-main)] outline-none" />
            </div>
          </div>

          <!-- LOKASI PENJEMPUTAN TERKUNCI GPS + TOMBOL REFRESH DETEKSI LOKASI -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-[10px] font-bold text-gray-400 block uppercase">Alamat Penjemputan Paket (LOKASI SAAT INI)</label>
              <button id="send-refresh-gps-btn" class="px-2 py-0.5 text-[9px] font-bold rounded-md bg-[#FDE5E7] dark:bg-[#2A141A] text-[#EB4E70] hover:bg-[#EB4E70] hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                ${svgIcons.refresh(10)} Deteksi Ulang GPS
              </button>
            </div>
            <div class="flex items-center bg-gray-100/70 dark:bg-[#1E0F13] rounded-xl border border-[var(--border-color)] p-2.5 opacity-90 cursor-not-allowed">
              <span class="w-2.5 h-2.5 rounded-full bg-[#EB4E70] mr-2 flex-shrink-0 animate-pulse"></span>
              <input type="text" id="send-pickup-input" value="${this.pickupAddress}" readonly class="w-full bg-transparent font-extrabold text-xs text-gray-500 dark:text-gray-400 outline-none cursor-not-allowed" />
            </div>
          </div>

          <!-- DETAIL PENGIRIM & PENERIMA -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)] space-y-1">
              <label class="text-[9px] font-bold text-gray-400 block uppercase">Pengirim</label>
              <input type="text" id="send-sender-name" value="${this.senderName}" class="bg-transparent font-extrabold text-xs text-[var(--text-main)] outline-none w-full focus:text-[#EB4E70]" />
              <input type="text" id="send-sender-phone" value="${this.senderPhone}" class="bg-transparent font-medium text-[10px] text-gray-400 outline-none w-full" />
            </div>

            <div class="bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)] space-y-1">
              <label class="text-[9px] font-bold text-gray-400 block uppercase">Penerima</label>
              <input type="text" id="send-receiver-name" value="${this.receiverName}" class="bg-transparent font-extrabold text-xs text-[var(--text-main)] outline-none w-full focus:text-[#EB4E70]" />
              <input type="text" id="send-receiver-phone" value="${this.receiverPhone}" class="bg-transparent font-medium text-[10px] text-gray-400 outline-none w-full" />
            </div>
          </div>

          <!-- DETIL PAKET & BERAT -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)] space-y-1">
              <label class="text-[9px] font-bold text-gray-400 block uppercase">Jenis Barang</label>
              <select id="send-package-type" class="w-full bg-transparent font-bold text-xs text-[var(--text-main)] outline-none cursor-pointer">
                <option value="Dokumen / Barang Kecil">Dokumen / Berkas</option>
                <option value="Makanan & Minuman">Makanan / Kuliner</option>
                <option value="Pakaian / Shopee">Pakaian & Fashion</option>
                <option value="Barang Elektronik">Elektronik & Gadget</option>
                <option value="Paket Besar / Dus">Paket Dus Besar</option>
              </select>
            </div>

            <div class="bg-gray-50 dark:bg-[#2A141A] p-2.5 rounded-xl border border-[var(--border-color)] space-y-1">
              <label class="text-[9px] font-bold text-gray-400 block uppercase">Estimasi Berat</label>
              <select id="send-package-weight" class="w-full bg-transparent font-bold text-xs text-[var(--text-main)] outline-none cursor-pointer">
                <option value="1">1 kg</option>
                <option value="2">2 kg</option>
                <option value="3">3 kg</option>
                <option value="5">5 kg</option>
                <option value="10">10 kg</option>
                <option value="20">20 kg</option>
                <option value="25">> 20 kg (25 kg)</option>
                <option value="30">> 20 kg (30 kg)</option>
                <option value="50">> 50 kg (Cargo Heavy)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- PILIHAN LAYANAN KURIR -->
        <div class="space-y-2">
          <h2 class="text-xs font-bold uppercase text-gray-400 tracking-wide px-1">Pilih Layanan Kurir</h2>
          <div id="send-services-list" class="space-y-2"></div>
        </div>

        <!-- STICKY NAVIGATION CHECKOUT BAR -->
        <div class="tactile-card p-3 flex items-center justify-between sticky bottom-3 shadow-2xl bg-[var(--bg-card)] border border-[var(--border-color)] z-20 rounded-2xl">
          <div>
            <span class="text-[9px] font-bold text-gray-400 block uppercase">Total Ongkos Kirim</span>
            <span id="send-total-price" class="text-base font-black text-[#EB4E70]">Rp 0</span>
          </div>
          <button id="send-order-btn" class="px-5 py-2.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white font-extrabold text-xs rounded-xl shadow-lg btn-tactile active:scale-95 flex items-center gap-1.5 cursor-pointer">
            <span>Pesan Kurir Sekarang</span>
            ${svgIcons.chevronRight(14)}
          </button>
        </div>
      </div>

      <!-- MODAL ANIMASI PENCARIAN KURIR -->
      <div id="send-search-modal" class="hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-white dark:bg-[#1A0B10] p-6 rounded-3xl max-w-xs w-full text-center space-y-4 shadow-2xl border border-[#EB4E70]/30 relative overflow-hidden">
          
          <div id="send-search-searching" class="space-y-4">
            <div class="radar-box relative w-24 h-24 mx-auto flex items-center justify-center">
              <div class="radar-circle"></div>
              <div class="radar-circle delay-1"></div>
              <div class="radar-sweep"></div>
              <span id="send-searching-icon" class="relative z-10 text-[#EB4E70] animate-pulse">
                ${svgIcons.package(36)}
              </span>
            </div>
            <div>
              <h3 id="send-searching-title" class="text-sm font-black text-[var(--text-main)]">Mencari Armada Pengiriman...</h3>
              <p id="send-searching-desc" class="text-[11px] text-gray-400 mt-1 font-semibold">Mendeteksi armada NusaSend aktif yang sesuai rute.</p>
            </div>
            <button id="send-cancel-search-btn" class="text-xs text-gray-400 font-extrabold hover:text-[#EB4E70] transition-colors cursor-pointer">
              Batal Mencari
            </button>
          </div>

          <div id="send-search-found" class="hidden space-y-4 text-left relative">
            <button id="send-cancel-found-btn" title="Batal Pesanan" class="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gray-100 dark:bg-[#2A141A] text-gray-400 hover:text-[#EB4E70] flex items-center justify-center text-xs font-bold transition-colors border border-[var(--border-color)]">
              ✕
            </button>
            
            <div class="text-center -mt-1 pb-1">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FDE5E7] dark:bg-[#2A141A] text-[#EB4E70] text-[11px] font-black mb-2 shadow-sm">
                ${svgIcons.check('#EB4E70', 12)} Armada Berhasil Dikonfirmasi!
              </span>
              <h3 id="send-found-subtitle" class="text-sm font-black text-[var(--text-main)]">Kurir Siap Menjemput Paket</h3>
            </div>

            <div class="bg-gray-50 dark:bg-[#2A141A] p-3 rounded-2xl border border-[var(--border-color)] space-y-2.5">
              <div class="flex items-center gap-3">
                <div id="courier-avatar" class="w-10 h-10 rounded-full bg-[#EB4E70]/20 text-[#EB4E70] flex items-center justify-center shrink-0 font-extrabold text-xs">
                  NUSA
                </div>
                <div class="flex-1 min-w-0">
                  <h4 id="courier-name" class="font-extrabold text-xs text-[var(--text-main)] truncate"></h4>
                  <div class="flex items-center gap-1 text-[10px] font-bold text-amber-500 mt-0.5">
                    ${svgIcons.star('#F59E0B', 12)} <span id="courier-rating">4.9</span>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between items-center text-xs">
                <div>
                  <span class="text-[9px] text-gray-400 font-bold block uppercase">Kendaraan / Transportasi</span>
                  <span id="courier-vehicle" class="font-extrabold text-[var(--text-main)]"></span>
                </div>
                <div class="text-right">
                  <span class="text-[9px] text-gray-400 font-bold block uppercase">No. Registrasi / Flight</span>
                  <span id="courier-plate" class="font-black text-[#EB4E70] bg-[#EB4E70]/10 px-2 py-0.5 rounded-md"></span>
                </div>
              </div>
            </div>

            <button id="send-confirm-pay-btn" class="w-full py-2.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white text-xs font-black rounded-xl shadow-md btn-tactile active:scale-95 transition-transform cursor-pointer">
              Konfirmasi & Lanjut Pembayaran
            </button>
          </div>
        </div>
      </div>
    `;

    this.detectGPSPickup();
    this.bindEvents();
    this.renderServices();
    this.recalculatePrice();
  },

  playAudio(soundType, pitchMult = 1) {
    if (this.soundEngine && typeof this.soundEngine[soundType] === 'function') {
      this.soundEngine[soundType](pitchMult);
    } else if (typeof window.playSound === 'function') {
      window.playSound(soundType);
    }
  },

  injectStyles() {
    if (document.getElementById('nusasend-styles')) return;
    const style = document.createElement('style');
    style.id = 'nusasend-styles';
    style.innerHTML = `
      .map-radar-wrapper { position: relative; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; pointer-events: none; }
      .map-radar-wave { position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 1.5px solid rgba(235, 78, 112, 0.6); background: rgba(235, 78, 112, 0.08); animation: mapRadarPulse 2.4s cubic-bezier(0.1, 0.8, 0.3, 1) infinite; pointer-events: none; }
      .map-radar-wave.w2 { animation-delay: 0.8s; }
      .map-radar-wave.w3 { animation-delay: 1.6s; }
      @keyframes mapRadarPulse { 0% { transform: scale(0.1); opacity: 0.9; } 100% { transform: scale(1.4); opacity: 0; } }
      .courier-dot-icon { width: 12px; height: 12px; background-color: #EB4E70; border: 2px solid #FFFFFF; border-radius: 50%; box-shadow: 0 0 8px #EB4E70; animation: courierBlink 1.4s ease-in-out infinite alternate; }
      @keyframes courierBlink { 0% { opacity: 0.3; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1.2); } }
      .radar-box { overflow: hidden; border-radius: 9999px; background: rgba(235, 78, 112, 0.05); border: 1px solid rgba(235, 78, 112, 0.2); }
      .radar-circle { position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(235, 78, 112, 0.5); animation: radar-pulse 2s cubic-bezier(0, 0.2, 0.8, 1) infinite; }
      .radar-circle.delay-1 { animation-delay: -1s; }
      .radar-sweep { position: absolute; inset: 0; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0%, transparent 70%, rgba(235, 78, 112, 0.4) 100%); animation: radar-spin 2s linear infinite; }
      @keyframes radar-pulse { 0% { transform: scale(0.1); opacity: 1; } 100% { transform: scale(1.2); opacity: 0; } }
      @keyframes radar-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .dropdown-disabled { opacity: 0.4; pointer-events: none; filter: grayscale(1); }
    `;
    document.head.appendChild(style);
  },

  renderIslandOptions() {
    return Object.keys(this.indonesiaTerritories)
      .map(island => `<option value="${island}" ${island === this.selectedIsland ? 'selected' : ''}>${island}</option>`)
      .join('');
  },

  renderCityOptions(filterSearch = '') {
    const islandData = this.indonesiaTerritories[this.selectedIsland] || {};
    let cityKeys = Object.keys(islandData);

    if (filterSearch.trim() !== '') {
      const q = filterSearch.toLowerCase().trim();
      let globalMatches = [];
      Object.keys(this.indonesiaTerritories).forEach(isl => {
        Object.keys(this.indonesiaTerritories[isl]).forEach(cKey => {
          const cName = this.indonesiaTerritories[isl][cKey].name;
          if (cName.toLowerCase().includes(q) || cKey.toLowerCase().includes(q)) {
            globalMatches.push({ island: isl, key: cKey, name: cName });
          }
        });
      });

      if (globalMatches.length > 0) {
        return globalMatches.map(item => 
          `<option value="${item.key}" ${item.key === this.selectedCity ? 'selected' : ''}>${item.name} (${item.island})</option>`
        ).join('');
      }
    }

    return cityKeys.map(key => 
      `<option value="${key}" ${key === this.selectedCity ? 'selected' : ''}>${islandData[key].name}</option>`
    ).join('');
  },

  renderLandmarkOptions() {
    const cityObj = this.getCityObj(this.selectedCity);
    if (!cityObj || !cityObj.landmarks) {
      return `<option value="Pusat Kota">Pusat Kota</option>`;
    }

    return cityObj.landmarks.map(lm => 
      `<option value="${lm.name}" ${lm.name === this.selectedLandmark ? 'selected' : ''}>${lm.name}</option>`
    ).join('');
  },

  getCityObj(cityKey) {
    for (const island in this.indonesiaTerritories) {
      if (this.indonesiaTerritories[island][cityKey]) {
        return this.indonesiaTerritories[island][cityKey];
      }
    }
    return null;
  },

  getIslandByCity(cityKey) {
    for (const island in this.indonesiaTerritories) {
      if (this.indonesiaTerritories[island][cityKey]) {
        return island;
      }
    }
    return 'Sulawesi';
  },

  detectGPSPickup() {
    const inputPick = document.getElementById('send-pickup-input');
    if (inputPick) inputPick.value = 'Deteksi Ulang GPS Berlangsung...';

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.pickupCoords = [pos.coords.latitude, pos.coords.longitude];
          this.pickupAddress = `[GPS Terkini] (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`;
          if (inputPick) inputPick.value = this.pickupAddress;
          showToast('Lokasi GPS penjemputan diperbarui!');
          this.initMap();
        },
        () => {
          this.pickupAddress = 'Jl. A.P. Pettarani No. 45, Makassar';
          if (inputPick) inputPick.value = this.pickupAddress;
          showToast('Gagal GPS, menggunakan alamat standar.');
          this.initMap();
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    } else {
      this.initMap();
    }
  },

  initMap() {
    if (typeof L === 'undefined') return;

    const mapElement = document.getElementById('nusasend-map');
    if (!mapElement) return;

    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    this.map = L.map(mapElement, {
      zoomControl: false,
      attributionControl: false
    }).setView(this.pickupCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    this.map.on('click', (e) => {
      this.handleMapClick(e.latlng.lat, e.latlng.lng);
    });

    this.updateMapMarkers();
  },

  handleMapClick(lat, lng) {
    if (this.activeMapTarget !== 'dest') return;

    this.dropoffCoords = [lat, lng];
    this.dropoffAddress = `[Pin Peta] (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    this.isCustomPinMode = true;

    const inputDrop = document.getElementById('send-dropoff-input');
    if (inputDrop) inputDrop.value = this.dropoffAddress;

    this.activeMapTarget = null;
    this.updateTargetBtnUI();
    this.toggleDropdownStateUI(false);

    showToast('Tujuan ditetapkan dari Pin Peta. Seleksi kota dinonaktifkan.');
    this.updateMapMarkers();
    this.renderServices();
  },

  toggleDropdownStateUI(active = true) {
    const group = document.getElementById('send-location-dropdown-group');
    const indicator = document.getElementById('send-pin-indicator');
    
    if (!group) return;
    if (!active) {
      group.classList.add('dropdown-disabled');
      if (indicator) indicator.innerText = 'Tujuan Diset via Pin Peta (Pilih manual untuk reset)';
    } else {
      group.classList.remove('dropdown-disabled');
      this.isCustomPinMode = false;
      if (indicator) indicator.innerText = 'Pulau → Kota → Landmark';
    }
  },

  updateTargetBtnUI() {
    const btn = document.getElementById('send-target-dest-btn');
    if (!btn) return;
    if (this.activeMapTarget === 'dest') {
      btn.className = 'px-2.5 py-1 text-[11px] font-bold rounded-lg text-white bg-[#EB4E70] transition-colors shadow-sm cursor-pointer inline-flex items-center gap-1';
    } else {
      btn.className = 'px-2.5 py-1 text-[11px] font-bold rounded-lg text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-[#2A141A] border border-[var(--border-color)] transition-colors hover:border-[#EB4E70] cursor-pointer inline-flex items-center gap-1';
    }
  },

  updateMapMarkers() {
    if (!this.map || typeof L === 'undefined') return;

    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        this.map.removeLayer(layer);
      }
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
    L.marker(this.pickupCoords, { icon: waveIcon, zIndexOffset: -100 }).addTo(this.map);

    const courierDots = [
      [this.pickupCoords[0] + 0.005, this.pickupCoords[1] + 0.004],
      [this.pickupCoords[0] - 0.006, this.pickupCoords[1] - 0.003],
      [this.pickupCoords[0] + 0.003, this.pickupCoords[1] - 0.007]
    ];
    courierDots.forEach(coord => {
      const dotIcon = L.divIcon({
        className: '',
        html: `<div class="courier-dot-icon" title="Kurir NusaSend"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
      L.marker(coord, { icon: dotIcon, zIndexOffset: 50 }).addTo(this.map);
    });

    const createPin = (label, color) => L.divIcon({
      className: 'custom-send-pin',
      html: `<div style="transform: translate(-50%, -100%); background:#1F2937; color:${color}; padding:3px 7px; border-radius:8px; font-weight:800; font-size:9px; border:1px solid ${color}; box-shadow:0 2px 6px rgba(0,0,0,0.3); white-space:nowrap;">${label}</div>`,
      iconAnchor: [0, 0]
    });

    L.marker(this.pickupCoords, { icon: createPin('Jemput (GPS)', '#EB4E70') }).addTo(this.map);
    L.marker(this.dropoffCoords, { icon: createPin('Tujuan Kirim', '#EB4E70') }).addTo(this.map);

    L.polyline([this.pickupCoords, this.dropoffCoords], {
      color: '#EB4E70',
      weight: 4,
      opacity: 0.85,
      dashArray: '6, 6'
    }).addTo(this.map);

    const bounds = L.latLngBounds([this.pickupCoords, this.dropoffCoords]);
    this.map.fitBounds(bounds, { padding: [35, 35] });

    this.recalculatePrice();
  },

  calculateDistance() {
    const [lat1, lon1] = this.pickupCoords;
    const [lat2, lon2] = this.dropoffCoords;
    
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Math.max(1.2, parseFloat(d.toFixed(1)));
  },

  calculateLogisticsPrice(serviceId, distKm, weightKg) {
    const targetIsland = this.getIslandByCity(this.selectedCity);
    const isInterIsland = !this.isCustomPinMode && (targetIsland !== 'Sulawesi');

    if (serviceId === 'instant') {
      let price = 10000 + (distKm * 2200);
      if (weightKg > 3) price += (weightKg - 3) * 3000;
      return Math.round(price);
    }

    if (serviceId === 'sameday') {
      let price = 7000 + (distKm * 1600);
      if (weightKg > 3) price += (weightKg - 3) * 2500;
      return Math.round(price);
    }

    if (serviceId === 'intercity') {
      if (isInterIsland) {
        let price = 35000 + (distKm * 12);
        if (weightKg > 1) price += (weightKg - 1) * 22000;
        return Math.round(price);
      } else {
        const extraDist = Math.max(0, distKm - 15);
        let price = 16000 + (extraDist * 105);
        if (weightKg > 1) price += (weightKg - 1) * 7500;
        return Math.round(price);
      }
    }

    if (serviceId === 'cargo') {
      if (isInterIsland) {
        let price = 80000 + (distKm * 15) + (weightKg * 5500);
        return Math.round(price);
      } else {
        const extraDist = Math.max(0, distKm - 10);
        let price = 32000 + (extraDist * 220) + (weightKg * 3200);
        return Math.round(price);
      }
    }

    return 20000;
  },

  bindEvents() {
    document.getElementById('send-refresh-gps-btn').onclick = () => {
      this.playAudio('click');
      this.detectGPSPickup();
    };

    document.getElementById('send-target-dest-btn').onclick = () => {
      this.playAudio('click');
      if (this.activeMapTarget === 'dest') {
        this.activeMapTarget = null;
        showToast('Mode pasang pin tujuan dimatikan.');
      } else {
        this.activeMapTarget = 'dest';
        showToast('Mode Peta: Klik titik lokasi tujuan di peta');
      }
      this.updateTargetBtnUI();
    };

    const searchInput = document.getElementById('send-city-search-input');
    const clearBtn = document.getElementById('send-clear-search-btn');

    if (searchInput) {
      searchInput.oninput = (e) => {
        this.toggleDropdownStateUI(true);
        const query = e.target.value;
        if (query.trim().length > 0) {
          clearBtn.classList.remove('hidden');
        } else {
          clearBtn.classList.add('hidden');
        }

        const citySelect = document.getElementById('send-city-select');
        if (citySelect) {
          citySelect.innerHTML = this.renderCityOptions(query);
          if (citySelect.options.length > 0) {
            this.selectedCity = citySelect.value;
            this.selectedIsland = this.getIslandByCity(this.selectedCity);
            const islandSelect = document.getElementById('send-island-select');
            if (islandSelect) islandSelect.value = this.selectedIsland;
            this.onCityChange();
          }
        }
      };
    }

    if (clearBtn) {
      clearBtn.onclick = () => {
        if (searchInput) searchInput.value = '';
        clearBtn.classList.add('hidden');
        const citySelect = document.getElementById('send-city-select');
        if (citySelect) {
          citySelect.innerHTML = this.renderCityOptions('');
        }
      };
    }

    const islandSelect = document.getElementById('send-island-select');
    if (islandSelect) {
      islandSelect.onchange = (e) => {
        this.playAudio('click');
        this.toggleDropdownStateUI(true);
        this.selectedIsland = e.target.value;
        
        const firstCityKey = Object.keys(this.indonesiaTerritories[this.selectedIsland])[0];
        this.selectedCity = firstCityKey;

        const citySelect = document.getElementById('send-city-select');
        if (citySelect) citySelect.innerHTML = this.renderCityOptions();

        this.onCityChange();
      };
    }

    const citySelect = document.getElementById('send-city-select');
    if (citySelect) {
      citySelect.onchange = (e) => {
        this.playAudio('click');
        this.toggleDropdownStateUI(true);
        this.selectedCity = e.target.value;
        this.selectedIsland = this.getIslandByCity(this.selectedCity);
        if (islandSelect) islandSelect.value = this.selectedIsland;
        this.onCityChange();
      };
    }

    const landmarkSelect = document.getElementById('send-landmark-select');
    if (landmarkSelect) {
      landmarkSelect.onchange = (e) => {
        this.playAudio('click');
        this.toggleDropdownStateUI(true);
        this.selectedLandmark = e.target.value;
        this.onLandmarkChange();
      };
    }

    const inputDrop = document.getElementById('send-dropoff-input');
    if (inputDrop) {
      inputDrop.oninput = (e) => {
        this.dropoffAddress = e.target.value;
      };
    }

    document.getElementById('send-sender-name').oninput = (e) => { this.senderName = e.target.value; };
    document.getElementById('send-sender-phone').oninput = (e) => { this.senderPhone = e.target.value; };
    document.getElementById('send-receiver-name').oninput = (e) => { this.receiverName = e.target.value; };
    document.getElementById('send-receiver-phone').oninput = (e) => { this.receiverPhone = e.target.value; };

    document.getElementById('send-package-type').onchange = (e) => {
      this.packageType = e.target.value;
    };

    document.getElementById('send-package-weight').onchange = (e) => {
      this.playAudio('click');
      this.packageWeight = parseInt(e.target.value, 10) || 1;
      this.renderServices();
      this.recalculatePrice();
    };

    document.getElementById('send-order-btn').onclick = (e) => {
      this.playAudio('chime');
      if (window.spawnParticleBurst) {
        const rect = e.target.getBoundingClientRect();
        window.spawnParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      this.startSearchingCourier();
    };

    document.getElementById('send-cancel-search-btn').onclick = () => {
      this.playAudio('pop');
      this.stopSearchingCourier();
    };

    document.getElementById('send-cancel-found-btn').onclick = () => {
      this.playAudio('pop');
      this.stopSearchingCourier();
      showToast('Pemesanan NusaSend dibatalkan.');
    };

    document.getElementById('send-confirm-pay-btn').onclick = () => {
      this.playAudio('chime');
      this.stopSearchingCourier();
      this.checkoutSend();
    };
  },

  onCityChange() {
    const landmarkSelect = document.getElementById('send-landmark-select');
    if (landmarkSelect) {
      landmarkSelect.innerHTML = this.renderLandmarkOptions();
      this.selectedLandmark = landmarkSelect.value;
    }
    this.onLandmarkChange();
  },

  onLandmarkChange() {
    const cityObj = this.getCityObj(this.selectedCity);
    if (!cityObj) return;

    let targetCoords = cityObj.coords;
    let targetAddress = `${this.selectedLandmark}, ${cityObj.name}`;

    if (cityObj.landmarks) {
      const lm = cityObj.landmarks.find(l => l.name === this.selectedLandmark);
      if (lm) {
        targetCoords = lm.coords;
        targetAddress = `${lm.name}, ${lm.address}, ${cityObj.name}`;
      }
    }

    this.dropoffCoords = targetCoords;
    this.dropoffAddress = targetAddress;

    const inputDrop = document.getElementById('send-dropoff-input');
    if (inputDrop) inputDrop.value = this.dropoffAddress;

    this.updateMapMarkers();
    this.renderServices();
  },

  getAvailableServices() {
    const dist = this.calculateDistance();
    const isInterIsland = !this.isCustomPinMode && (this.selectedIsland !== 'Sulawesi' || dist > 60);
    const isHeavy = this.packageWeight >= 5;

    let available = [...this.services];

    if (isInterIsland) {
      available = available.filter(s => s.id !== 'instant' && s.id !== 'sameday');
    }

    if (this.packageWeight > 10) {
      available = available.filter(s => s.id !== 'instant' && s.id !== 'sameday');
    }

    if (!isHeavy) {
      available = available.filter(s => s.id !== 'cargo');
    }

    if (available.length > 0 && !available.some(s => s.id === this.selectedService)) {
      this.selectedService = available[0].id;
    }

    return available;
  },

  renderServices() {
    const container = document.getElementById('send-services-list');
    if (!container) return;
    container.innerHTML = '';

    const dist = this.calculateDistance();
    const availableServices = this.getAvailableServices();

    availableServices.forEach((srv) => {
      const isSelected = srv.id === this.selectedService;
      const cost = this.calculateLogisticsPrice(srv.id, dist, this.packageWeight);

      const card = document.createElement('div');
      card.className = `tactile-card p-3 flex items-center justify-between cursor-pointer transition-all ${
        isSelected
          ? 'border-2 border-[#EB4E70] bg-[#EB4E70]/5 shadow-md'
          : 'hover:border-[#EB4E70]/50'
      }`;

      card.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-[#EB4E70] text-white' : 'bg-gray-100 dark:bg-gray-800 text-[#EB4E70]'}">
            ${srv.icon}
          </div>
          <div>
            <h4 class="font-extrabold text-xs text-[var(--text-main)] flex items-center gap-1.5">
              ${srv.name}
              ${isSelected ? '<span class="text-[9px] bg-[#EB4E70] text-white font-black px-1.5 py-0.2 rounded uppercase">Dipilih</span>' : ''}
            </h4>
            <p class="text-[10px] text-gray-400 font-semibold">${srv.desc}</p>
          </div>
        </div>

        <div class="text-right">
          <span class="text-xs font-black text-[#EB4E70]">Rp ${cost.toLocaleString('id-ID')}</span>
        </div>
      `;

      card.onclick = () => {
        this.playAudio('pop');
        this.selectedService = srv.id;
        this.renderServices();
        this.recalculatePrice();
      };

      container.appendChild(card);
    });
  },

  recalculatePrice() {
    const dist = this.calculateDistance();
    const distEl = document.getElementById('nusasend-distance-val');
    if (distEl) distEl.innerText = `${dist} km`;

    const availableServices = this.getAvailableServices();
    const srv = availableServices.find(s => s.id === this.selectedService) || availableServices[0];
    if (!srv) return;

    const totalPrice = this.calculateLogisticsPrice(srv.id, dist, this.packageWeight);

    const priceEl = document.getElementById('send-total-price');
    if (priceEl) priceEl.innerText = `Rp ${totalPrice.toLocaleString('id-ID')}`;
  },

  startSearchingCourier() {
    const modal = document.getElementById('send-search-modal');
    const searchingBox = document.getElementById('send-search-searching');
    const foundBox = document.getElementById('send-search-found');

    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
    if (searchingBox) searchingBox.classList.remove('hidden');
    if (foundBox) foundBox.classList.add('hidden');

    const dist = this.calculateDistance();
    const isInterIsland = !this.isCustomPinMode && (this.selectedIsland !== 'Sulawesi');
    const isInterCity = dist > 50;

    let fleetCategory = 'local';
    let searchingTitle = 'Mencari Kurir Terdekat...';
    let searchingDesc = 'Mendeteksi kurir motor terdekat di radius penjemputan.';
    let foundSubtitle = 'Kurir Motor Siap Menjemput Paket';

    if (isInterIsland) {
      fleetCategory = 'interisland';
      searchingTitle = 'Menghubungkan ke Cargo Air / Kapal Logistik...';
      searchingDesc = 'Menyiapkan manifest kargo penerbangan / ekspedisi lintas pulau.';
      foundSubtitle = 'Armada Pesawat / Kapal Kargo Dikonfirmasi';
    } else if (isInterCity || this.selectedService === 'cargo') {
      fleetCategory = 'intercity';
      searchingTitle = 'Mencari Truk Ekspedisi Antar-Kota...';
      searchingDesc = 'Mendeteksi armada mobil pickup & truk kargo antar-kota.';
      foundSubtitle = 'Driver Truk Kargo Siap Mengambil Paket';
    }

    const titleEl = document.getElementById('send-searching-title');
    const descEl = document.getElementById('send-searching-desc');
    const foundSubEl = document.getElementById('send-found-subtitle');

    if (titleEl) titleEl.innerText = searchingTitle;
    if (descEl) descEl.innerText = searchingDesc;
    if (foundSubEl) foundSubEl.innerText = foundSubtitle;

    const pool = this.couriersPool[fleetCategory];
    const randomName = pool.names[Math.floor(Math.random() * pool.names.length)];
    const randomVehicle = pool.vehicles[Math.floor(Math.random() * pool.vehicles.length)];
    const randomPlate = pool.plates[Math.floor(Math.random() * pool.plates.length)];

    this.assignedCourier = {
      name: randomName,
      vehicle: randomVehicle,
      plate: randomPlate,
      rating: (4.8 + Math.random() * 0.2).toFixed(1)
    };

    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.playAudio('chime');
      if (searchingBox) searchingBox.classList.add('hidden');
      if (foundBox) {
        const cName = document.getElementById('courier-name');
        const cVehicle = document.getElementById('courier-vehicle');
        const cPlate = document.getElementById('courier-plate');
        const cRating = document.getElementById('courier-rating');

        if (cName) cName.innerText = this.assignedCourier.name;
        if (cVehicle) cVehicle.innerText = this.assignedCourier.vehicle;
        if (cPlate) cPlate.innerText = this.assignedCourier.plate;
        if (cRating) cRating.innerText = this.assignedCourier.rating;

        foundBox.classList.remove('hidden');
      }
      showToast('Armada pengiriman NusaSend berhasil ditemukan!');
    }, 3000);
  },

  stopSearchingCourier() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    const modal = document.getElementById('send-search-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  },

  checkoutSend() {
    const dist = this.calculateDistance();
    const availableServices = this.getAvailableServices();
    const srv = availableServices.find(s => s.id === this.selectedService) || availableServices[0];
    const totalPrice = this.calculateLogisticsPrice(srv.id, dist, this.packageWeight);

    showToast(`Membuat pesanan kurir ${srv.name}...`);

    const summaryHtml = `
      <div class="space-y-2">
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Layanan</span><span>${srv.name}</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Jemput (GPS)</span><span>${this.pickupAddress}</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Tujuan</span><span class="text-[#EB4E70] font-black">${this.dropoffAddress}</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Armada / Kurir</span><span>${this.assignedCourier ? this.assignedCourier.name : 'Armada Logistik'} [${this.assignedCourier ? this.assignedCourier.vehicle : ''}]</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Penerima</span><span>${this.receiverName} (${this.receiverPhone})</span></div>
        <div class="flex justify-between font-bold text-xs"><span class="text-gray-400">Barang & Berat</span><span>${this.packageType} (${this.packageWeight} kg)</span></div>
        <div class="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between font-extrabold text-sm">
          <span>Total Payment</span>
          <span class="text-[#EB4E70]">Rp ${totalPrice.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `;

    if (window.openPaymentDrawerWithAmount) {
      window.openPaymentDrawerWithAmount(totalPrice, summaryHtml);
    }
  }
};

export function renderNusaSend(container, soundEngine = null) {
  NusaSend.init(container, soundEngine);
}