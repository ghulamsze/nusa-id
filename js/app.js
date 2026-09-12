/* ==========================================================================
   NUSA Application Main Controller (js/app.js)
   ========================================================================== */

import { formatRupiah } from './utils/nusaHelpers.js';
import { t, setLanguage, getCurrentLang } from './utils/i18n.js';

// State Aplikasi
const state = {
  theme: localStorage.getItem("nusa_theme") || "light",
  lang: getCurrentLang(),
  balance: 500000,
  activeService: "NusaFly",
  summary: {
    serviceName: "NusaFly",
    origin: "Makassar (UPG)",
    details: "Garuda Indonesia",
    totalFare: 0
  }
};

// Referensi DOM Elements
const DOM = {
  html: document.documentElement,
  themeToggleBtn: document.getElementById("theme-toggle-btn"),
  langToggleBtn: document.getElementById("lang-toggle-btn"),
  dynamicGreeting: document.getElementById("dynamic-greeting"),
  userBalanceAmount: document.getElementById("user-balance-amount"),
  walletPayBtn: document.getElementById("wallet-pay-btn"),
  walletTopupBtn: document.getElementById("wallet-topup-btn"),
  serviceTabs: document.querySelectorAll(".service-tab"),
  dynamicServicePanel: document.getElementById("dynamic-service-panel"),
  liveFareAmount: document.getElementById("live-fare-amount"),
  mainCtaPesanBtn: document.getElementById("main-cta-pesan-btn"),
  serviceDrawer: document.getElementById("service-drawer"),
  closeDrawerBtn: document.getElementById("close-drawer-btn")
};

// Inisialisasi Aplikasi
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  applyTheme(state.theme);
  applyLanguage(state.lang);
  updateGreeting();
  updateBalanceUI();
  bindEventHandlers();
  selectServiceTab(state.activeService);
}

/* ==========================================================================
   Tema & Bahasa
   ========================================================================== */

function applyLanguage(lang) {
  state.lang = lang;
  setLanguage(lang);

  if (DOM.langToggleBtn) DOM.langToggleBtn.textContent = lang.toUpperCase();
  updateGreeting();
}

function applyTheme(theme) {
  state.theme = theme;
  DOM.html.setAttribute("data-theme", theme);
  if (theme === "dark") {
    DOM.html.classList.add("dark");
  } else {
    DOM.html.classList.remove("dark");
  }
  localStorage.setItem("nusa_theme", theme);
  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

function updateGreeting() {
  if (!DOM.dynamicGreeting) return;
  const hour = new Date().getHours();

  if (hour >= 4 && hour < 11) {
    DOM.dynamicGreeting.textContent = t('greetingMorning');
  } else if (hour >= 11 && hour < 15) {
    DOM.dynamicGreeting.textContent = t('greetingAfternoon');
  } else if (hour >= 15 && hour < 18) {
    DOM.dynamicGreeting.textContent = t('greetingEvening');
  } else {
    DOM.dynamicGreeting.textContent = t('greetingNight');
  }
}

function updateBalanceUI() {
  if (DOM.userBalanceAmount) {
    DOM.userBalanceAmount.textContent = formatRupiah(state.balance);
  }
}

/* ==========================================================================
   Service Tab & Form Switcher
   ========================================================================== */

export function selectServiceTab(serviceName) {
  state.activeService = serviceName;

  DOM.serviceTabs.forEach(tab => {
    const service = tab.getAttribute("data-service");
    if (service === serviceName) {
      tab.classList.add("border-2", "border-[#EB4E70]", "bg-[#FDE5E7]/20");
    } else {
      tab.classList.remove("border-2", "border-[#EB4E70]", "bg-[#FDE5E7]/20");
    }
  });

  if (!DOM.dynamicServicePanel) return;

  if (serviceName === "NusaFly" && typeof window.renderNusaFlyForm === "function") {
    window.renderNusaFlyForm(DOM.dynamicServicePanel, updateOrderSummary);
  } else if (serviceName === "NusaRail" && typeof window.renderNusaRailForm === "function") {
    window.renderNusaRailForm(DOM.dynamicServicePanel, updateOrderSummary);
  } else {
    renderFallbackForm(serviceName);
  }
}

function renderFallbackForm(serviceName) {
  const defaultFares = {
    NusaRide: 15000,
    NusaCar: 45000
  };

  const fare = defaultFares[serviceName] || 20000;

  DOM.dynamicServicePanel.innerHTML = `
    <div class="space-y-3">
      <div>
        <label class="text-[10px] font-bold text-gray-400 mb-1 block uppercase">Lokasi Penjemputan</label>
        <input type="text" value="Lokasi Saat Ini" class="w-full p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl text-xs font-bold text-[var(--text-main)] outline-none" />
      </div>
      <div>
        <label class="text-[10px] font-bold text-gray-400 mb-1 block uppercase">Tujuan</label>
        <input type="text" placeholder="Masukkan lokasi tujuan..." class="w-full p-2.5 bg-gray-50 dark:bg-[#2A141A] border border-[var(--border-color)] rounded-xl text-xs font-bold text-[var(--text-main)] outline-none" />
      </div>
    </div>
  `;

  updateOrderSummary(serviceName, "Lokasi Saat Ini", "Perjalanan Standar", fare);
}

export function updateOrderSummary(serviceName, origin, details, totalFare) {
  state.summary = { serviceName, origin, details, totalFare };
  if (DOM.liveFareAmount) {
    DOM.liveFareAmount.textContent = formatRupiah(totalFare);
  }
}

/* ==========================================================================
   Event Bindings & Handlers
   ========================================================================== */

function bindEventHandlers() {
  if (DOM.langToggleBtn) {
    DOM.langToggleBtn.addEventListener("click", () => {
      window.playAudio("click");
      const nextLang = state.lang === "id" ? "en" : "id";
      applyLanguage(nextLang);
      window.showToast(t('langChanged'));
    });
  }

  if (DOM.themeToggleBtn) {
    DOM.themeToggleBtn.addEventListener("click", () => {
      window.playAudio("click");
      const nextTheme = state.theme === "light" ? "dark" : "light";
      applyTheme(nextTheme);
      window.showToast(nextTheme === "dark" ? t('themeDark') : t('themeLight'));
    });
  }

  DOM.serviceTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      window.playAudio("click");
      const serviceName = tab.getAttribute("data-service");
      selectServiceTab(serviceName);

      if (DOM.serviceDrawer) {
        DOM.serviceDrawer.classList.add("open");
      }
    });
  });

  if (DOM.walletPayBtn) {
    DOM.walletPayBtn.addEventListener("click", () => {
      window.playAudio("click");
      window.showToast("Pembayaran QRIS dibuka");
    });
  }

  if (DOM.walletTopupBtn) {
    DOM.walletTopupBtn.addEventListener("click", () => {
      window.playAudio("success");
      state.balance += 100000;
      updateBalanceUI();
      window.showToast(`${t('topupSuccess')} (+Rp 100.000)`);
    });
  }

  if (DOM.mainCtaPesanBtn) {
    DOM.mainCtaPesanBtn.addEventListener("click", () => {
      if (state.balance < state.summary.totalFare) {
        window.playAudio("error");
        window.showToast(t('insufficientBalance'));
        return;
      }
      window.playAudio("success");
      state.balance -= state.summary.totalFare;
      updateBalanceUI();
      window.showToast(`${t('paySuccess')} (${state.summary.serviceName})`);
      if (DOM.serviceDrawer) DOM.serviceDrawer.classList.remove("open");
    });
  }

  if (DOM.closeDrawerBtn) {
    DOM.closeDrawerBtn.addEventListener("click", () => {
      if (DOM.serviceDrawer) DOM.serviceDrawer.classList.remove("open");
    });
  }
}

/* ==========================================================================
   Global Sound & Toast Utilities
   ========================================================================== */

window.playAudio = function(type = "click") {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "click") {
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === "success") {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === "error") {
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    // Web Audio Fallback
  }
};

window.showToast = function(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-xs px-4";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg transition-all duration-300 opacity-0 transform translate-y-2 pointer-events-auto text-center";
  toast.textContent = message;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "translate-y-2");
    toast.classList.add("opacity-100", "translate-y-0");
  });

  setTimeout(() => {
    toast.classList.remove("opacity-100", "translate-y-0");
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 2200);
};