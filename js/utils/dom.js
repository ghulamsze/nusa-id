export function clearFieldError(inputEl) {
  if (!inputEl) return;
  inputEl.removeAttribute('aria-invalid');
  const errorEl = inputEl.parentElement.querySelector('.field-error');
  if (errorEl) errorEl.remove();
}

export function showFieldError(inputEl, message) {
  if (!inputEl) return;
  inputEl.setAttribute('aria-invalid', 'true');
  let errorEl = inputEl.parentElement.querySelector('.field-error');
  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.className = 'field-error';
    errorEl.style.color = 'var(--color-danger)';
    errorEl.style.fontSize = '0.75rem';
    inputEl.parentElement.appendChild(errorEl);
  }
  errorEl.textContent = message;
}