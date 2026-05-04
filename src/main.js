/**
 * app.js — Lógica principal de la aplicación
 * Conecta los datos con los web components y gestiona la navegación.
 */

(function () {
  'use strict';

  // ── Referencias al DOM ────────────────────────────────────────────
  const skillGrid    = document.getElementById('skill-grid');
  const topicContent = document.getElementById('topic-content');
  const welcomeScreen = document.getElementById('welcome-screen');
  const sidebar      = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle');

  // Stats de la pantalla de bienvenida
  const statTopics     = document.getElementById('stat-topics');
  const statPhases     = document.getElementById('stat-phases');
  const statHighlights = document.getElementById('stat-highlights');

  // ── Botón para mostrar sidebar cuando está colapsado ─────────────
  const showBtn = document.createElement('button');
  showBtn.id = 'show-sidebar-btn';
  showBtn.title = 'Mostrar menú';
  showBtn.innerHTML = '›';
  document.body.appendChild(showBtn);

  // ── Estado ────────────────────────────────────────────────────────
  let currentTopicId = null;
  const courseData = window.COURSE_DATA;

  // ── Inicialización ────────────────────────────────────────────────
  function init() {
    if (!courseData) {
      console.error('No se encontraron datos del curso (COURSE_DATA).');
      return;
    }

    // Cargar el grid de habilidades
    skillGrid.loadCourse(courseData);

    // Calcular y mostrar estadísticas en la pantalla de bienvenida
    let totalTopics = 0;
    let totalHighlights = 0;
    courseData.phases.forEach(phase => {
      phase.topics.forEach(topic => {
        totalTopics++;
        totalHighlights += topic.highlights ? topic.highlights.length : 0;
      });
    });

    animateCount(statTopics, totalTopics);
    animateCount(statPhases, courseData.phases.length);
    animateCount(statHighlights, totalHighlights);

    // Título del curso en el sidebar
    document.getElementById('course-title').textContent = courseData.name;
    document.getElementById('course-subtitle').textContent = courseData.subtitle || '';

    // Pantalla de bienvenida — info del curso
    const welcomeTitle = document.getElementById('welcome-title');
    if (welcomeTitle) welcomeTitle.textContent = courseData.name;
    const welcomeDesc = document.getElementById('welcome-desc');
    if (welcomeDesc && courseData.description) welcomeDesc.textContent = courseData.description;
    _setText('ci-code',     courseData.code       || '—');
    _setText('ci-prof',     courseData.professor  || '—');
    _setText('ci-hours',    courseData.officeHours || '—');
    _setText('ci-modality', courseData.modality   || '—');
    const emailEl = document.getElementById('ci-email');
    if (emailEl && courseData.email) {
      emailEl.textContent = courseData.email;
      emailEl.href = `mailto:${courseData.email}`;
    }

    // Título de la pestaña/tab del navegador
    document.title = `${courseData.name} — ${courseData.subtitle || 'Plataforma de Cursos'}`;
  }

  function _setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  // ── Animación de contadores en bienvenida ─────────────────────────
  function animateCount(el, target) {
    let current = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  // ── Encontrar datos del tema por ID ──────────────────────────────
  function findTopicById(id) {
    for (const phase of courseData.phases) {
      for (const topic of phase.topics) {
        if (topic.id === id) return { topic, phase };
      }
    }
    return null;
  }

  // ── Mostrar tema ──────────────────────────────────────────────────
  function selectTopic(topicId) {
    if (currentTopicId === topicId) return;
    currentTopicId = topicId;

    const result = findTopicById(topicId);
    if (!result) return;

    const { topic, phase } = result;

    // Mostrar el componente de contenido y ocultar la bienvenida
    topicContent.classList.add('visible');
    welcomeScreen.classList.add('hidden');

    // Cargar el tema en el web component
    topicContent.loadTopic(topic, phase);

    // Actualizar el grid (selección visual)
    skillGrid.selectTopic(topicId);

    // Actualizar URL hash para bookmarking
    history.replaceState(null, '', `#${topicId}`);
  }

  // ── Escuchar eventos de selección del skill grid ──────────────────
  document.addEventListener('topic-selected', (e) => {
    selectTopic(e.detail.topicId);
  });

  // ── Sidebar toggle ────────────────────────────────────────────────
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('collapsed');
    showBtn.classList.add('visible');
  });

  showBtn.addEventListener('click', () => {
    sidebar.classList.remove('collapsed');
    showBtn.classList.remove('visible');
  });

  // ── Restaurar estado desde URL hash ──────────────────────────────
  function restoreFromHash() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // Esperar a que los web components estén listos
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

  // ── Keyboard navigation ───────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('collapsed')) {
      sidebar.classList.remove('collapsed');
      showBtn.classList.remove('visible');
    }
  });

  // ── Boot ──────────────────────────────────────────────────────────
  init();
  restoreFromHash();

})();
