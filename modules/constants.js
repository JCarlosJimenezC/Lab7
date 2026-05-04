/**
 * constants.js — Constantes globales de la aplicación DevPath.
 * Expone: window.DEVPATH.CONSTANTS
 */

window.DEVPATH = window.DEVPATH || {};

window.DEVPATH.CONSTANTS = {

  // ── Animaciones ──────────────────────────────────────────────────
  ANIM: {
    FADE_OUT_MS:      150,
    FADE_IN_MS:       300,
    STAGGER_MS:        60,
    COUNTER_STEPS:     30,
    COUNTER_INTERVAL_MS: 30,
  },

  // ── Tema visual ──────────────────────────────────────────────────
  THEME: {
    STORAGE_KEY: 'devpath-theme',
    DARK:        'dark',
    LIGHT:       'light',
    ATTR:        'data-theme',
  },

  // ── Eventos personalizados ────────────────────────────────────────
  EVENTS: {
    TOPIC_SELECTED:   'topic-selected',
    NODE_SELECT:      'node-select',
    HIGHLIGHT_CLICK:  'highlight-click',
    CHAPTER_CLICK:    'chapter-click',
    SHOW_COURSE_INFO: 'show-course-info',
    THEME_CHANGED:    'theme-changed',
  },

};
