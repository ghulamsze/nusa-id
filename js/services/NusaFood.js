import { showToast } from '../utils/toast.js';
import { t } from '../utils/i18n.js';

/**
 * nusaFood.js - Food & Beverage Delivery Module for Nusa Super-App (2026)
 * Senior Front-End Architecture: Pure ES6 Module, Glassmorphism UI, Tactile Audio,
 * Interactive Cart System, Regional Mamminasata Culinary Database, and Nusa Pay Integration.
 * 
 * STRICT NO-EMOJI CONSTRAINT: Uses clean inline SVG vectors only.
 */

const svgIcons = {
  food: (color = 'currentColor', size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/>
      <line x1="10" y1="1" x2="10" y2="4"/>
      <line x1="14" y1="1" x2="14" y2="4"/>
    </svg>`,

  search: (color = 'currentColor', size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>`,

  star: (color = '#F59E0B', size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`,

  clock: (color = 'currentColor', size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>`,

  pin: (color = 'currentColor', size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>`,

  plus: (color = 'currentColor', size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>`,

  minus: (color = 'currentColor', size = 14) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>`,

  cart: (color = 'currentColor', size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>`,

  check: (color = 'currentColor', size = 12) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>`,

  bike: (color = 'currentColor', size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5"/>
      <circle cx="18.5" cy="17.5" r="3.5"/>
      <path d="M15 6h2.5a2.5 2.5 0 0 1 2.5 2.5V14h-3M9 18h6"/>
      <circle cx="9" cy="9" r="2"/>
    </svg>`
};

export const NusaFood = {
  categories: [
    { id: 'ALL', label: 'Semua Culinary' },
    { id: 'COTO', label: 'Coto & Pallubasa' },
    { id: 'AYAM', label: 'Ayam & Bebek' },
    { id: 'MIE', label: 'Mie & Bakso' },
    { id: 'SNACK', label: 'Kue & Pisang Epe' }
  ],

  restaurants: [
    {
      id: 'RESTO-1',
      name: 'Coto Makassar H. Daeng Sirua',
      category: 'COTO',
      rating: 4.9,
      time: '15-25 mnt',
      distance: '1.8 km',
      deliveryFee: 6000,
      location: 'Panakkukang, Makassar',
      imageBg: 'bg-amber-900/40',
      items: [
        { id: 'M1', name: 'Coto Daging Sapi Bagian Dalam', price: 25000, desc: 'Kuah rempah kaya rasa dengan daging sapi pilihan' },
        { id: 'M2', name: 'Coto Campur (Daging + Paru + Handuk)', price: 25000, desc: 'Kombinasi komplit khas Makassar' },
        { id: 'M3', name: 'Ketupat Daun Kelapa (2 Pcs)', price: 4000, desc: 'Pendamping wajib coto' }
      ]
    },
    {
      id: 'RESTO-2',
      name: 'Pallubasa Serui Asli',
      category: 'COTO',
      rating: 4.8,
      time: '20-30 mnt',
      distance: '2.5 km',
      deliveryFee: 7000,
      location: 'Ujung Pandang, Makassar',
      imageBg: 'bg-red-950/40',
      items: [
        { id: 'M4', name: 'Pallubasa Spesial Alas Telur (Alas Alas)', price: 30000, desc: 'Daging sapi berkuah kelapa sangrai plus telur murni' },
        { id: 'M5', name: 'Pallubasa Daging Lidah', price: 28000, desc: 'Lidah sapi empuk gurih' }
      ]
    },
    {
      id: 'RESTO-3',
      name: 'Mie Titi Panakkukang Original',
      category: 'MIE',
      rating: 4.9,
      time: '25-35 mnt',
      distance: '3.1 km',
      deliveryFee: 8000,
      location: 'Boulevard, Makassar',
      imageBg: 'bg-orange-950/40',
      items: [
        { id: 'M6', name: 'Mie Kering Seafood Porsi Besar', price: 35000, desc: 'Mie renyah disiram kuah kental udang, cumi & sayuran' },
        { id: 'M7', name: 'Mie Kering Ayam Telur', price: 30000, desc: 'Porsi pas untuk santap siang' }
      ]
    },
    {
      id: 'RESTO-4',
      name: 'Ayam Goreng Sulawesi Samata',
      category: 'AYAM',
      rating: 4.7,
      time: '15-20 mnt',
      distance: '1.2 km',
      deliveryFee: 5000,
      location: 'Gowa',
      imageBg: 'bg-[#2A141A]',
      items: [
        { id: 'M8', name: 'Paket Ayam Kampung Bakar Sambal Cobek', price: 28000, desc: 'Nasi, Ayam Kampung Bakar, Tahu, Tempe & Sambal' },
        { id: 'M9', name: 'Ayam Penyet Rica-Rica Extra Pedas', price: 24000, desc: 'Olahan khas bumbu Mamminasata' }
      ]
    },
    {
      id: 'RESTO-5',
      name: 'Pisang Epe Pantai Losari Pak Dg. Naba',
      category: 'SNACK',
      rating: 4.9,
      time: '10-20 mnt',
      distance: '4.0 km',
      deliveryFee: 9000,
      location: 'Losari, Makassar',
      imageBg: 'bg-amber-950/30',
      items: [
        { id: 'M10', name: 'Pisang Epe Keju Gula Merah Spesial', price: 18000, desc: 'Pisang raja bakar pipih disiram gula merah cair & keju' },
        { id: 'M11', name: 'Pisang Epe Cokelat Durian', price: 20000, desc: 'Aroma khas topping durian melimpah' },
        { id: 'M12', name: 'Jalangkote Daging Telur (3 Pcs)', price: 15000, desc: 'Lengkap dengan sambal cair asam manis' }
      ]
    }
  ],

  // State Management
  selectedCategory: 'ALL',
  searchQuery: '',
  activeRestoId: null,
  cart: {}, // { itemId: { item, restoId, qty } }
  deliveryAddress: 'Jl. Boulevard No. 88, Panakkukang, Makassar',
  assignedDriver: null,
  searchTimer: null,
  soundEngine: null,

  init(targetContainerId, soundEngine = null) {
    const container = typeof targetContainerId === 'string'
      ? document.getElementById(targetContainerId)
      : targetContainerId;
    if (!container) return;

    this.soundEngine = soundEngine || window.NusaSoundEngine;

    container.innerHTML = `
      <div id="nusafood-engine-panel" class="space-y-4 max-w-full overflow-hidden text-[var(--text-main)]">
        
        <!-- Header & Delivery Address Bar -->
        <div class="tactile-card p-4 space-y-3 backdrop-blur-md bg-slate-900/40 border border-white/10 rounded-2xl">
          <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">LAYANAN PESAN ANTAR MAKANAN</span>
            <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FDE5E7] text-[#EB4E70] font-extrabold">NusaFood 2026</span>
          </div>

          <!-- Address Selector -->
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 min-w-0">
              <div class="w-7 h-7 rounded-lg bg-[#EB4E70]/10 text-[#EB4E70] flex items-center justify-center shrink-0">
                ${svgIcons.pin('#EB4E70', 14)}
              </div>
              <div class="min-w-0">
                <span class="text-[9px] font-bold text-gray-400 block uppercase tracking-wide">Alamat Pengantaran</span>
                <p id="food-delivery-address-text" class="text-xs font-extrabold text-[var(--text-main)] truncate">${this.deliveryAddress}</p>
              </div>
            </div>
            <button id="food-change-addr-btn" class="px-2.5 py-1 text-[10px] font-extrabold text-[#EB4E70] bg-[#EB4E70]/10 rounded-lg hover:bg-[#EB4E70] hover:text-white transition-colors btn-tactile shrink-0">
              Ubah
            </button>
          </div>

          <!-- Search Input -->
          <div class="relative">
            <input type="text" id="food-search-input" placeholder="Cari Coto, Pallubasa, Mie Titi, atau resto..." value="${this.searchQuery}" class="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl font-bold text-xs text-[var(--text-main)] outline-none focus:border-[#EB4E70] transition-colors" />
            <div class="absolute left-3 top-3 text-gray-400 pointer-events-none">
              ${svgIcons.search('currentColor', 15)}
            </div>
          </div>

          <!-- Category Chips Filter -->
          <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            ${this.categories.map(cat => `
              <button data-food-cat="${cat.id}" class="food-cat-chip shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all btn-tactile ${this.selectedCategory === cat.id ? 'bg-[#EB4E70] text-white shadow-sm' : 'bg-gray-100 dark:bg-[#2A141A] text-gray-400 border border-[var(--border-color)] hover:text-[#EB4E70]'}" >
                ${cat.label}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Restaurant List View -->
        <div id="food-resto-list" class="space-y-3">
          ${this.renderRestaurantCards()}
        </div>

      </div>

      <!-- Menu Modal / Bottom Drawer -->
      <div id="food-menu-modal" class="hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end">
        <div class="bg-[var(--bg-card)] w-full max-w-md mx-auto rounded-t-3xl p-5 shadow-2xl border-t border-[var(--border-color)] space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar relative animate-drawer-spring">
          <button id="food-close-menu-btn" class="close-btn-top-left">
            <svg class="w-6 h-6 stroke-[#EB4E70]" fill="none" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>

          <div id="food-menu-modal-content" class="pt-2 space-y-4"></div>
        </div>
      </div>

      <!-- Bottom Floating Cart Bar -->
      <div id="food-floating-cart-bar" class="hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-40">
        <div class="bg-gradient-to-r from-[#EB4E70] to-[#FD9799] p-3.5 rounded-2xl shadow-xl border border-white/20 text-white flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">
              ${svgIcons.cart('#FFFFFF', 18)}
            </div>
            <div>
              <span id="food-cart-count-text" class="text-[10px] font-extrabold uppercase tracking-wide block text-white/90">0 Item Dipesan</span>
              <span id="food-cart-total-text" class="text-sm font-black text-white">Rp 0</span>
            </div>
          </div>
          <button id="food-cart-checkout-btn" class="px-4 py-2 bg-white text-[#EB4E70] text-xs font-black rounded-xl shadow-md btn-tactile hover:bg-[#FDE5E7] transition-colors">
            Lanjut Checkout
          </button>
        </div>
      </div>

      <!-- Driver Search & Processing Modal -->
      <div id="food-search-modal" class="hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-white dark:bg-[#1A0B10] p-6 rounded-3xl max-w-xs w-full text-center space-y-4 shadow-2xl border border-[#EB4E70]/30 relative overflow-hidden">
          
          <div id="food-search-searching" class="space-y-4">
            <div class="radar-box relative w-24 h-24 mx-auto flex items-center justify-center">
              <div class="radar-circle"></div>
              <div class="radar-circle delay-1"></div>
              <div class="radar-sweep"></div>
              <span class="relative z-10 text-[#EB4E70] animate-pulse">
                ${svgIcons.food('#EB4E70', 36)}
              </span>
            </div>
            <div>
              <h3 class="text-sm font-black text-[var(--text-main)]">Meneruskan Pesanan ke Resto...</h3>
              <p class="text-[11px] text-gray-400 mt-1 font-semibold">Resto menyiapkan makanan & mencari driver terdekat.</p>
            </div>
            <button id="food-cancel-search-btn" class="text-xs text-gray-400 font-extrabold hover:text-[#EB4E70] transition-colors">
              Batal
            </button>
          </div>

          <div id="food-search-found" class="hidden space-y-4 text-left relative">
            <div class="text-center pb-1">
              <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[11px] font-black mb-2 shadow-sm">
                ${svgIcons.check('#10B981', 12)} Pesanan Diterima Resto!
              </span>
              <h3 class="text-sm font-black text-[var(--text-main)]">Driver Menuju Resto</h3>
            </div>

            <div class="bg-gray-50 dark:bg-[#2A141A] p-3 rounded-2xl border border-[var(--border-color)] space-y-2.5">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#EB4E70]/20 text-[#EB4E70] flex items-center justify-center shrink-0">
                  ${svgIcons.bike('#EB4E70', 20)}
                </div>
                <div class="flex-1 min-w-0">
                  <h4 id="food-driver-name" class="font-extrabold text-xs text-[var(--text-main)] truncate"></h4>
                  <div class="flex items-center gap-1 text-[10px] font-bold text-amber-500 mt-0.5">
                    ${svgIcons.star('#F59E0B', 12)} <span id="food-driver-rating"></span>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between items-center text-xs">
                <div>
                  <span class="text-[9px] text-gray-400 font-bold block uppercase">Armada</span>
                  <span id="food-driver-vehicle" class="font-extrabold text-[var(--text-main)]"></span>
                </div>
                <div class="text-right">
                  <span class="text-[9px] text-gray-400 font-bold block uppercase">Plat Nomor</span>
                  <span id="food-driver-plate" class="font-black text-[#EB4E70] bg-[#EB4E70]/10 px-2 py-0.5 rounded-md"></span>
                </div>
              </div>
            </div>

            <button id="food-close-found-btn" class="w-full py-2.5 bg-gradient-to-r from-[#EB4E70] to-[#FD9799] text-white text-xs font-black rounded-xl shadow-md btn-tactile">
              Bayar Via Saldo NUSA & Lacak
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateCartBarDisplay();
  },

  playAudio(soundType, pitchMult = 1) {
    if (this.soundEngine && typeof this.soundEngine[soundType] === 'function') {
      this.soundEngine[soundType](pitchMult);
    } else if (typeof window.playSound === 'function') {
      window.playSound(soundType);
    }
  },

  renderRestaurantCards() {
    const filtered = this.restaurants.filter(resto => {
      const matchCat = this.selectedCategory === 'ALL' || resto.category === this.selectedCategory;
      const matchSearch = resto.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          resto.items.some(i => i.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      return `
        <div class="tactile-card p-6 text-center space-y-2">
          <p class="text-xs font-bold text-gray-400">Tidak ada resto atau kuliner yang cocok dengan pencarian.</p>
        </div>
      `;
    }

    return filtered.map(resto => `
      <div data-resto-id="${resto.id}" class="food-resto-card tactile-card p-3.5 space-y-3 cursor-pointer hover:border-[#EB4E70] transition-colors">
        <div class="flex gap-3">
          <div class="w-20 h-20 rounded-2xl ${resto.imageBg} border border-white/10 flex items-center justify-center shrink-0 shadow-inner text-[#EB4E70]">
            ${svgIcons.food('#EB4E70', 32)}
          </div>
          <div class="flex-1 min-w-0 space-y-1">
            <div class="flex justify-between items-start gap-1">
              <h3 class="font-extrabold text-xs text-[var(--text-main)] truncate">${resto.name}</h3>
              <span class="flex items-center gap-0.5 text-[10px] font-black text-amber-500 shrink-0 bg-amber-500/10 px-1.5 py-0.5 rounded-md">
                ${svgIcons.star('#F59E0B', 10)} ${resto.rating}
              </span>
            </div>
            
            <p class="text-[10px] text-gray-400 font-semibold truncate">${resto.location}</p>
            
            <div class="flex items-center gap-3 text-[10px] font-extrabold text-gray-400 pt-1">
              <span class="flex items-center gap-1">
                ${svgIcons.clock('currentColor', 10)} ${resto.time}
              </span>
              <span>•</span>
              <span>${resto.distance}</span>
              <span>•</span>
              <span class="text-[#EB4E70]">Ongkir Rp ${(resto.deliveryFee/1000).toFixed(0)}rb</span>
            </div>
          </div>
        </div>

        <!-- Sample Item Menu Preview -->
        <div class="border-t border-gray-100 dark:border-gray-800/80 pt-2 flex items-center justify-between text-[11px]">
          <span class="text-gray-400 font-semibold truncate max-w-[200px]">Menu Populer: ${resto.items[0].name}</span>
          <span class="font-black text-[#EB4E70] shrink-0">Rp ${resto.items[0].price.toLocaleString('id-ID')}</span>
        </div>
      </div>
    `).join('');
  },

  bindEvents() {
    // Search input event
    const searchInput = document.getElementById('food-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value;
        const listContainer = document.getElementById('food-resto-list');
        if (listContainer) listContainer.innerHTML = this.renderRestaurantCards();
        this.bindRestoCardEvents();
      };
    }

    // Category chips event
    document.querySelectorAll('.food-cat-chip').forEach(chip => {
      chip.onclick = () => {
        this.playAudio('pop');
        this.selectedCategory = chip.dataset.foodCat;
        document.querySelectorAll('.food-cat-chip').forEach(c => {
          c.className = `food-cat-chip shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-extrabold transition-all btn-tactile ${c.dataset.foodCat === this.selectedCategory ? 'bg-[#EB4E70] text-white shadow-sm' : 'bg-gray-100 dark:bg-[#2A141A] text-gray-400 border border-[var(--border-color)] hover:text-[#EB4E70]'}`;
        });
        const listContainer = document.getElementById('food-resto-list');
        if (listContainer) listContainer.innerHTML = this.renderRestaurantCards();
        this.bindRestoCardEvents();
      };
    });

    // Change address
    const changeAddrBtn = document.getElementById('food-change-addr-btn');
    if (changeAddrBtn) {
      changeAddrBtn.onclick = () => {
        this.playAudio('click');
        const newAddr = prompt('Masukkan Alamat Pengantaran NUSA:', this.deliveryAddress);
        if (newAddr && newAddr.trim() !== '') {
          this.deliveryAddress = newAddr.trim();
          const el = document.getElementById('food-delivery-address-text');
          if (el) el.innerText = this.deliveryAddress;
          showToast('Alamat pengantaran diperbarui.');
        }
      };
    }

    this.bindRestoCardEvents();

    // Menu Modal close button
    const closeMenuBtn = document.getElementById('food-close-menu-btn');
    if (closeMenuBtn) {
      closeMenuBtn.onclick = () => {
        this.playAudio('click');
        this.closeMenuModal();
      };
    }

    // Checkout button inside Floating Cart Bar
    const cartCheckoutBtn = document.getElementById('food-cart-checkout-btn');
    if (cartCheckoutBtn) {
      cartCheckoutBtn.onclick = () => {
        this.playAudio('chime');
        this.processCartCheckout();
      };
    }

    // Cancel / Close Search modal
    const cancelSearchBtn = document.getElementById('food-cancel-search-btn');
    if (cancelSearchBtn) {
      cancelSearchBtn.onclick = () => {
        this.playAudio('pop');
        this.stopSearchingDriver();
      };
    }

    const closeFoundBtn = document.getElementById('food-close-found-btn');
    if (closeFoundBtn) {
      closeFoundBtn.onclick = () => {
        this.playAudio('chime');
        this.confirmBookingAndPay();
      };
    }
  },

  bindRestoCardEvents() {
    document.querySelectorAll('.food-resto-card').forEach(card => {
      card.onclick = () => {
        this.playAudio('click');
        const restoId = card.dataset.restoId;
        this.openRestoMenuModal(restoId);
      };
    });
  },

  openRestoMenuModal(restoId) {
    const resto = this.restaurants.find(r => r.id === restoId);
    if (!resto) return;

    this.activeRestoId = restoId;
    const modal = document.getElementById('food-menu-modal');
    const content = document.getElementById('food-menu-modal-content');

    if (!modal || !content) return;

    content.innerHTML = `
      <div class="space-y-3">
        <div class="border-b border-gray-100 dark:border-gray-800 pb-3">
          <span class="text-[10px] font-extrabold text-[#EB4E70] bg-[#EB4E70]/10 px-2.5 py-0.5 rounded-full">${resto.location}</span>
          <h2 class="font-display font-extrabold text-lg text-[var(--text-main)] mt-1">${resto.name}</h2>
          <div class="flex items-center gap-3 text-[11px] text-gray-400 font-bold mt-1">
            <span class="text-amber-500 font-extrabold">${svgIcons.star('#F59E0B', 12)} ${resto.rating}</span>
            <span>•</span>
            <span>Waktu: ${resto.time}</span>
            <span>•</span>
            <span>Ongkir: Rp ${resto.deliveryFee.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <h3 class="text-xs font-black text-gray-400 uppercase tracking-wide pt-1">Daftar Menu Hidangan</h3>

        <div class="space-y-3">
          ${resto.items.map(item => {
            const currentQty = this.cart[item.id] ? this.cart[item.id].qty : 0;
            return `
              <div class="bg-gray-50 dark:bg-[#2A141A] p-3 rounded-2xl border border-[var(--border-color)] flex justify-between items-center gap-3">
                <div class="flex-1 min-w-0">
                  <h4 class="font-extrabold text-xs text-[var(--text-main)] truncate">${item.name}</h4>
                  <p class="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">${item.desc}</p>
                  <span class="text-xs font-black text-[#EB4E70] block mt-1">Rp ${item.price.toLocaleString('id-ID')}</span>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  ${currentQty > 0 ? `
                    <button data-item-id="${item.id}" class="food-btn-minus w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-300 flex items-center justify-center font-bold btn-tactile">
                      ${svgIcons.minus('currentColor', 12)}
                    </button>
                    <span class="text-xs font-black text-[var(--text-main)] w-4 text-center">${currentQty}</span>
                  ` : ''}
                  <button data-item-id="${item.id}" class="food-btn-plus w-7 h-7 rounded-lg bg-[#EB4E70] text-white flex items-center justify-center font-bold btn-tactile shadow-sm">
                    ${svgIcons.plus('#FFFFFF', 12)}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    this.bindMenuItemEvents();

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  },

  bindMenuItemEvents() {
    document.querySelectorAll('.food-btn-plus').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        this.playAudio('pop');
        const itemId = btn.dataset.itemId;
        this.updateItemQty(itemId, 1);
        this.openRestoMenuModal(this.activeRestoId);
      };
    });

    document.querySelectorAll('.food-btn-minus').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        this.playAudio('click');
        const itemId = btn.dataset.itemId;
        this.updateItemQty(itemId, -1);
        this.openRestoMenuModal(this.activeRestoId);
      };
    });
  },

  closeMenuModal() {
    const modal = document.getElementById('food-menu-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  },

  updateItemQty(itemId, delta) {
    let itemObj = null;
    let restoObj = null;

    for (const r of this.restaurants) {
      const found = r.items.find(i => i.id === itemId);
      if (found) {
        itemObj = found;
        restoObj = r;
        break;
      }
    }

    if (!itemObj || !restoObj) return;

    // Reject adding item if cart already has items from another restaurant
    const existingRestoId = Object.values(this.cart)[0]?.restoId;
    if (existingRestoId && existingRestoId !== restoObj.id && delta > 0) {
      showToast(`Keranjang Anda berisi hidangan dari resto lain. Selesaikan atau kosongkan dahulu.`);
      return;
    }

    if (!this.cart[itemId]) {
      this.cart[itemId] = { item: itemObj, restoId: restoObj.id, qty: 0 };
    }

    this.cart[itemId].qty += delta;

    if (this.cart[itemId].qty <= 0) {
      delete this.cart[itemId];
    }

    this.updateCartBarDisplay();
  },

  updateCartBarDisplay() {
    const floatingBar = document.getElementById('food-floating-cart-bar');
    const countText = document.getElementById('food-cart-count-text');
    const totalText = document.getElementById('food-cart-total-text');

    if (!floatingBar) return;

    const items = Object.values(this.cart);
    if (items.length === 0) {
      floatingBar.classList.add('hidden');
      return;
    }

    let totalQty = 0;
    let foodSubtotal = 0;
    let restoFee = 0;

    items.forEach(c => {
      totalQty += c.qty;
      foodSubtotal += c.item.price * c.qty;
      if (!restoFee) {
        const r = this.restaurants.find(resto => resto.id === c.restoId);
        if (r) restoFee = r.deliveryFee;
      }
    });

    const grandTotal = foodSubtotal + restoFee;

    if (countText) countText.innerText = `${totalQty} Item Dipesan`;
    if (totalText) totalText.innerText = `Rp ${grandTotal.toLocaleString('id-ID')}`;

    floatingBar.classList.remove('hidden');
  },

  processCartCheckout() {
    const items = Object.values(this.cart);
    if (items.length === 0) return;

    const restoObj = this.restaurants.find(r => r.id === items[0].restoId);
    let foodSubtotal = 0;
    items.forEach(c => foodSubtotal += c.item.price * c.qty);
    const grandTotal = foodSubtotal + (restoObj ? restoObj.deliveryFee : 0);

    if (window.userBalance !== undefined && window.userBalance < grandTotal) {
      showToast('Saldo NUSA Anda tidak mencukupi untuk pesanan makanan ini.');
      return;
    }

    this.closeMenuModal();
    this.startSearchingDriver();
  },

  startSearchingDriver() {
    const modal = document.getElementById('food-search-modal');
    const searchingBox = document.getElementById('food-search-searching');
    const foundBox = document.getElementById('food-search-found');

    if (modal) {
      modal.classList.remove('hidden');
      modal.style.display = 'flex';
    }
    if (searchingBox) searchingBox.classList.remove('hidden');
    if (foundBox) foundBox.classList.add('hidden');

    const names = ['Ahmad Syahril (Driver Kuliner)', 'Rian Kurniawan', 'Muhammad Ilham', 'Dg. Kulle Express'];
    const vehicles = ['Honda Vario 125 Food Box', 'Yamaha Aerox Express', 'Honda BeAT Delivery'];
    
    this.assignedDriver = {
      name: names[Math.floor(Math.random() * names.length)],
      vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
      plate: `DD ${Math.floor(1000 + Math.random() * 8999)} FS`,
      rating: (4.8 + Math.random() * 0.2).toFixed(1)
    };

    if (this.searchTimer) clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.playAudio('chime');
      if (searchingBox) searchingBox.classList.add('hidden');
      if (foundBox) {
        const dName = document.getElementById('food-driver-name');
        const dVehicle = document.getElementById('food-driver-vehicle');
        const dPlate = document.getElementById('food-driver-plate');
        const dRating = document.getElementById('food-driver-rating');

        if (dName) dName.innerText = this.assignedDriver.name;
        if (dVehicle) dVehicle.innerText = this.assignedDriver.vehicle;
        if (dPlate) dPlate.innerText = this.assignedDriver.plate;
        if (dRating) dRating.innerText = this.assignedDriver.rating;

        foundBox.classList.remove('hidden');
      }
      showToast('Resto menyetujui & driver meluncur!');
    }, 2800);
  },

  stopSearchingDriver() {
    if (this.searchTimer) clearTimeout(this.searchTimer);
    const modal = document.getElementById('food-search-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.style.display = 'none';
    }
  },

  confirmBookingAndPay() {
    this.stopSearchingDriver();

    const items = Object.values(this.cart);
    if (items.length === 0) return;

    const restoObj = this.restaurants.find(r => r.id === items[0].restoId);
    let foodSubtotal = 0;
    items.forEach(c => foodSubtotal += c.item.price * c.qty);
    const grandTotal = foodSubtotal + (restoObj ? restoObj.deliveryFee : 0);

    if (window.deductBalance) {
      window.deductBalance(grandTotal, 'NusaFood');
    }

    this.showSuccessModal(grandTotal, restoObj, this.assignedDriver);
    
    // Clear Cart
    this.cart = {};
    this.updateCartBarDisplay();
  },

  showSuccessModal(grandTotal, resto, driver) {
    const modal = document.getElementById('checkout-success-modal');
    if (!modal) {
      showToast(`Pesanan NusaFood berhasil! Total: Rp ${grandTotal.toLocaleString('id-ID')}`);
      return;
    }

    const amountEl = document.getElementById('checkout-success-amount');
    const subtitleEl = document.getElementById('checkout-success-subtitle');

    if (amountEl) amountEl.innerText = `Rp ${grandTotal.toLocaleString('id-ID')}`;
    if (subtitleEl) {
      subtitleEl.innerText = `NusaFood (${resto ? resto.name : 'Resto'}) • Driver: ${driver ? driver.name : ''} [${driver ? driver.plate : ''}] • Diantar ke ${this.deliveryAddress}`;
    }

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
  }
};

export function renderNusaFood(container, soundEngine = null) {
  NusaFood.init(container, soundEngine);
}

export default NusaFood;