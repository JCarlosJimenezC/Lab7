/**
 * main.js — Lógica principal de la aplicación DevPath.
 * Conecta los datos con los web components y gestiona la navegación.
 */

(function () {
  'use strict';

  // ── Constantes y helpers de animación ────────────────────────
  const { ANIM, EVENTS, THEME } = window.DEVPATH.CONSTANTS;
  const ThemeManager = window.DEVPATH.ThemeManager;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ── Inicializar tema (antes de pintar nada) ───────────────────
  ThemeManager.init();

  // ── Referencias al DOM ────────────────────────────────────────
  const skillGrid    = document.getElementById('skill-grid');
  const topicContent = document.getElementById('topic-content');
  const courseInfoEl = document.getElementById('course-info');
  const sidebar      = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const themeToggle  = document.getElementById('theme-toggle');
  const homeBtn      = document.getElementById('home-btn');

  // ── Botón flotante para mostrar sidebar cuando está colapsado ─
  const showBtn = document.createElement('button');
  showBtn.id = 'show-sidebar-btn';
  showBtn.title = 'Mostrar menú';
  showBtn.innerHTML = '›';
  document.body.appendChild(showBtn);

  // ── Estado ────────────────────────────────────────────────────
  let currentTopicId = null;
  const courseData = window.COURSE_DATA;

  // ── Inicialización ────────────────────────────────────────────
  function init() {
    if (!courseData) {
      console.error('No se encontraron datos del curso (COURSE_DATA).');
      return;
    }

    // Cargar el grid de habilidades
    skillGrid.loadCourse(courseData);

    // Cargar datos en el panel course-info
    courseInfoEl.setCourse(courseData);

    // Datos del sidebar
    document.getElementById('course-title').textContent  = courseData.name;
    document.getElementById('course-subtitle').textContent = courseData.subtitle || '';

    // Título de la pestaña del navegador
    document.title = `${courseData.name} — ${courseData.subtitle || 'Plataforma de Cursos'}`;

    // Estado inicial del botón de tema
    _updateThemeIcon();
  }

  // ── Actualizar ícono del botón de tema ────────────────────────
  function _updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.textContent = ThemeManager.getCurrent() === THEME.DARK ? '🌙' : '☀️';
    themeToggle.title = ThemeManager.getCurrent() === THEME.DARK
      ? 'Cambiar a modo claro'
      : 'Cambiar a modo oscuro';
  }

  // ── Mostrar panel de información del curso ────────────────────
  function showCourseInfo() {
    topicContent.classList.remove('visible');
    courseInfoEl.classList.remove('hidden');
    homeBtn.classList.add('active');
    skillGrid.selectTopic(null);
    currentTopicId = null;
    history.replaceState(null, '', window.location.pathname);
  }

  // ── Encontrar datos del tema por ID ──────────────────────────
  function findTopicById(id) {
    for (const phase of courseData.phases) {
      for (const topic of phase.topics) {
        if (topic.id === id) return { topic, phase };
      }
    }
    return null;
  }

  // ── Mostrar tema con transición ───────────────────────────────
  async function selectTopic(topicId) {
    if (currentTopicId === topicId) return;

    const result = findTopicById(topicId);
    if (!result) return;

    const wasVisible = topicContent.classList.contains('visible');

    // Fade-out antes de cambiar contenido
    if (!prefersReduced && wasVisible) {
      topicContent.classList.add('is-exiting');
      await _sleep(ANIM.FADE_OUT_MS);
      topicContent.classList.remove('is-exiting');
    }

    currentTopicId = topicId;
    const { topic, phase } = result;

    // Mostrar topic-content y ocultar course-info
    courseInfoEl.classList.add('hidden');
    topicContent.classList.add('visible');
    homeBtn.classList.remove('active');

    // Cargar el tema (activa las animaciones CSS del shadow DOM)
    topicContent.loadTopic(topic, phase);

    // Actualizar selección en el grid
    skillGrid.selectTopic(topicId);

    // Actualizar URL hash para bookmarking
    history.replaceState(null, '', `#${topicId}`);
  }

  // ── Escuchar eventos de selección del skill grid ──────────────
  document.addEventListener(EVENTS.TOPIC_SELECTED, (e) => {
    selectTopic(e.detail.topicId);
  });

  // ── Botón de información del curso ────────────────────────────
  homeBtn.addEventListener('click', showCourseInfo);
  document.addEventListener(EVENTS.SHOW_COURSE_INFO, showCourseInfo);

  // ── Toggle de tema ────────────────────────────────────────────
  themeToggle.addEventListener('click', () => {
    ThemeManager.toggle();
    _updateThemeIcon();
  });

  // ── Sidebar toggle ────────────────────────────────────────────
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('collapsed');
    showBtn.classList.add('visible');
  });

  showBtn.addEventListener('click', () => {
    sidebar.classList.remove('collapsed');
    showBtn.classList.remove('visible');
  });

  // ── Restaurar estado desde URL hash ──────────────────────────
  function restoreFromHash() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          selectTopic(hash);
        });
      });
    }
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash) selectTopic(hash);
  });

  // ── Keyboard navigation ───────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('collapsed')) {
      sidebar.classList.remove('collapsed');
      showBtn.classList.remove('visible');
    }
  });

  // ── Boot ──────────────────────────────────────────────────────
  init();
  restoreFromHash();

})();
