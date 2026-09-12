/**
 * Non-Intrusive Auto-Dismissing Glassmorphism Toast System
 * @param {string} message 
 */
export function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-glass opacity-0 translate-y-[-8px]';
  toast.innerHTML = `
    <span class="flex-1">${message}</span>
    <span class="text-[10px] font-black text-[#EB4E70] uppercase tracking-wider">NUSA</span>
  `;

  container.appendChild(toast);

  // Animasikan masuk secara halus
  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-[-8px]');
  });

  // Otomatis fade out & hancurkan setelah 2.5 detik
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-[-8px]');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Pasang ke window agar bisa dipanggil dari inline HTML
window.showToast = showToast;