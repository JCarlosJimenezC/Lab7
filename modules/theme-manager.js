/**
 * theme-manager.js — Gestión del tema visual (oscuro / claro).
 * Lee la preferencia guardada en localStorage; si no hay, usa
 * prefers-color-scheme del sistema. Aplica el atributo
 * data-theme="dark|light" en <html>.
 *
 * Expone: window.DEVPATH.ThemeManager
 */

window.DEVPATH = window.DEVPATH || {};

window.DEVPATH.ThemeManager = (() => {
  'use strict';

  const { THEME, EVENTS } = window.DEVPATH.CONSTANTS;

  // ── Aplicar tema al <html> ──────────────────────────────────────
  function _applyTheme(theme) {
    document.documentElement.setAttribute(THEME.ATTR, theme);
  }

  // ── Detectar preferencia del sistema ───────────────────────────
  function _getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEME.DARK
      : THEME.LIGHT;
  }

  // ── API pública ─────────────────────────────────────────────────
  function getCurrent() {
    return document.documentElement.getAttribute(THEME.ATTR) || THEME.DARK;
  }

  function toggle() {
    const next = getCurrent() === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    _applyTheme(next);
    try { localStorage.setItem(THEME.STORAGE_KEY, next); } catch (_) {}
    document.dispatchEvent(new CustomEvent(EVENTS.THEME_CHANGED, {
      bubbles: true,
      detail: { theme: next },
    }));
    return next;
  }

  function init() {
    let stored;
    try { stored = localStorage.getItem(THEME.STORAGE_KEY); } catch (_) {}
    _applyTheme(stored || _getSystemPreference());

    // Actualizar automáticamente si cambia la preferencia del SO
    // y el usuario no tiene una elección guardada.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      let saved;
      try { saved = localStorage.getItem(THEME.STORAGE_KEY); } catch (_) {}
      if (!saved) _applyTheme(e.matches ? THEME.DARK : THEME.LIGHT);
    });
  }

  return { init, toggle, getCurrent };
})();
