/**
 * <course-info> Web Component
 * Panel por defecto del área principal. Muestra la información completa
 * del curso cuando no hay ningún tema seleccionado.
 *
 * API:
 *   el.setCourse(courseData) — carga y renderiza los datos del curso
 *
 * courseData puede incluir los campos opcionales:
 *   technologies: string[]  — lista de tecnologías a mostrar como chips
 *   objectives:   string[]  — lista de objetivos de aprendizaje
 */
class CourseInfo extends HTMLElement {
  constructor() {
    super();
    this._course = null;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  setCourse(data) {
    this._course = data;
    this._render();
  }

  // ── Helpers de datos ─────────────────────────────────────────────
  _computeStats(course) {
    let totalTopics = 0;
    let totalHighlights = 0;
    course.phases.forEach(p => {
      p.topics.forEach(t => {
        totalTopics++;
        totalHighlights += t.highlights ? t.highlights.length : 0;
      });
    });
    return { totalTopics, totalHighlights };
  }

  _deriveTags(course) {
    if (course.technologies && course.technologies.length > 0) {
      return course.technologies;
    }
    const seen = new Set();
    course.phases.forEach(p =>
      p.topics.forEach(t =>
        (t.tags || []).forEach(tag => seen.add(tag))
      )
    );
    return [...seen];
  }

  // ── Bloques de HTML ──────────────────────────────────────────────
  _buildMetaCard(c) {
    const rows = [
      { label: 'Código',    value: c.code },
      { label: 'Profesor',  value: c.professor },
      { label: 'Correo',    value: c.email, isEmail: true },
      { label: 'Atención',  value: c.officeHours },
      { label: 'Modalidad', value: c.modality },
    ].filter(r => r.value);

    if (rows.length === 0) return '';

    return `
      <div class="ci-meta-card">
        ${rows.map(r => `
          <div class="ci-row">
            <span class="ci-key">${r.label}</span>
            ${r.isEmail
              ? `<a class="ci-val ci-link" href="mailto:${r.value}">${r.value}</a>`
              : `<span class="ci-val">${r.value}</span>`
            }
          </div>
        `).join('')}
      </div>
    `;
  }

  _buildStats(course) {
    const { totalTopics, totalHighlights } = this._computeStats(course);
    return `
      <div class="ci-stats">
        <div class="ci-stat">
          <span class="ci-stat-num">${totalTopics}</span>
          <span class="ci-stat-label">Temas</span>
        </div>
        <div class="ci-stat">
          <span class="ci-stat-num">${course.phases.length}</span>
          <span class="ci-stat-label">Fases</span>
        </div>
        <div class="ci-stat">
          <span class="ci-stat-num">${totalHighlights}</span>
          <span class="ci-stat-label">Highlights</span>
        </div>
      </div>
    `;
  }

  _buildPhases(phases) {
    return `
      <div class="ci-section">
        <div class="ci-section-title">Contenido del curso</div>
        <div class="ci-phases">
          ${phases.map((p, i) => `
            <div class="ci-phase" style="--phase-delay:${i * 40}ms">
              <div class="ci-phase-header">
                <span class="ci-phase-icon">${p.icon || '◈'}</span>
                <span class="ci-phase-name">${p.name}</span>
                <span class="ci-phase-count">${p.topics.length} tema${p.topics.length !== 1 ? 's' : ''}</span>
              </div>
              <div class="ci-topics">
                ${p.topics.map(t => `
                  <span class="ci-topic-chip">${t.icon ? t.icon + ' ' : ''}${t.name}</span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  _buildTechnologies(tags) {
    if (!tags || tags.length === 0) return '';
    return `
      <div class="ci-section">
        <div class="ci-section-title">Tecnologías</div>
        <div class="ci-tech-list">
          ${tags.map(t => `<span class="ci-tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
  }

  _buildObjectives(objectives) {
    if (!objectives || objectives.length === 0) return '';
    return `
      <div class="ci-section">
        <div class="ci-section-title">Objetivos</div>
        <ul class="ci-objectives">
          ${objectives.map(o => `<li>${o}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // ── Estilos del Shadow DOM ───────────────────────────────────────
  _getStyles() {
    return `
      <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :host {
          display: flex;
          flex: 1;
          align-items: flex-start;
          justify-content: center;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: thin;
          scrollbar-color: var(--border-bright) transparent;
        }
        :host::-webkit-scrollbar       { width: 6px; }
        :host::-webkit-scrollbar-track { background: transparent; }
        :host::-webkit-scrollbar-thumb { background: var(--border-bright); border-radius: 3px; }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ci-wrapper {
          width: 100%;
          max-width: 700px;
          padding: 48px 40px 80px;
          font-family: var(--font, 'Segoe UI', system-ui, sans-serif);
          animation: fadeSlideIn 380ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        /* HERO ────────────────────────────────────────────────── */
        .ci-hero {
          display: flex;
          align-items: flex-start;
          gap: 22px;
          margin-bottom: 28px;
        }
        .ci-hero-icon {
          font-size: 52px;
          line-height: 1;
          color: var(--accent);
          flex-shrink: 0;
          opacity: 0.65;
          margin-top: 6px;
        }
        .ci-hero-text { flex: 1; }
        .ci-label-small {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--accent);
          margin-bottom: 7px;
        }
        .ci-title {
          font-size: 30px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.15;
          margin-bottom: 10px;
        }
        .ci-desc {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 520px;
        }

        /* META CARD ───────────────────────────────────────────── */
        .ci-meta-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius, 4px);
          padding: 16px 20px;
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .ci-row {
          display: flex;
          gap: 12px;
          align-items: baseline;
          font-size: 12.5px;
        }
        .ci-key {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--text-secondary);
          min-width: 72px;
          flex-shrink: 0;
        }
        .ci-val { color: var(--text-primary); line-height: 1.4; }
        .ci-link { color: var(--accent-light); text-decoration: none; }
        .ci-link:hover { text-decoration: underline; }

        /* STATS ───────────────────────────────────────────────── */
        .ci-stats {
          display: flex;
          margin-bottom: 32px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius, 4px);
          overflow: hidden;
        }
        .ci-stat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 12px;
          border-right: 1px solid var(--border);
          gap: 4px;
        }
        .ci-stat:last-child { border-right: none; }
        .ci-stat-num {
          font-size: 26px;
          font-weight: 700;
          color: var(--accent-light);
          font-variant-numeric: tabular-nums;
        }
        .ci-stat-label {
          font-size: 10px;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* SECCIÓN GENÉRICA ────────────────────────────────────── */
        .ci-section { margin-bottom: 28px; }
        .ci-section-title {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          padding-left: 10px;
          border-left: 2px solid var(--accent);
        }

        /* PHASES ──────────────────────────────────────────────── */
        .ci-phases { display: flex; flex-direction: column; gap: 8px; }
        .ci-phase {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius, 4px);
          padding: 12px 16px;
          animation: fadeSlideIn 320ms cubic-bezier(0.4, 0, 0.2, 1) both;
          animation-delay: var(--phase-delay, 0ms);
        }
        .ci-phase-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .ci-phase-icon { font-size: 15px; }
        .ci-phase-name {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          flex: 1;
        }
        .ci-phase-count {
          font-size: 10px;
          color: var(--accent-light);
          background: var(--bg-overlay);
          border: 1px solid var(--border);
          padding: 2px 7px;
          border-radius: 2px;
          font-weight: 600;
        }
        .ci-topics { display: flex; flex-wrap: wrap; gap: 5px; }
        .ci-topic-chip {
          font-size: 10.5px;
          color: var(--text-secondary);
          background: var(--bg-overlay);
          border: 1px solid var(--border);
          border-radius: 2px;
          padding: 3px 8px;
          white-space: nowrap;
        }

        /* TECHNOLOGIES ────────────────────────────────────────── */
        .ci-tech-list { display: flex; flex-wrap: wrap; gap: 6px; }
        .ci-tech-tag {
          font-size: 11px;
          font-weight: 600;
          color: var(--accent-light);
          background: rgba(99, 102, 241, 0.08);
          border: 1px solid var(--accent-dim);
          border-radius: 2px;
          padding: 4px 10px;
        }

        /* OBJECTIVES ──────────────────────────────────────────── */
        .ci-objectives {
          padding-left: 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ci-objectives li {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        /* CTA ─────────────────────────────────────────────────── */
        .ci-cta {
          margin-top: 8px;
          padding: 18px 20px;
          border: 1px dashed var(--border-bright);
          border-radius: var(--radius, 4px);
          text-align: center;
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 1.5;
        }
        .ci-cta strong {
          color: var(--accent-light);
          display: block;
          margin-bottom: 4px;
          font-size: 13px;
        }

        @media (max-width: 600px) {
          .ci-wrapper { padding: 28px 20px 60px; }
          .ci-hero { flex-direction: column; gap: 12px; }
          .ci-hero-icon { font-size: 36px; }
          .ci-title { font-size: 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ci-wrapper, .ci-phase { animation: none; }
        }
      </style>
    `;
  }

  // ── Render ───────────────────────────────────────────────────────
  _render() {
    if (!this.shadowRoot) return;

    if (!this._course) {
      this.shadowRoot.innerHTML = `
        ${this._getStyles()}
        <div class="ci-wrapper">
          <div class="ci-hero">
            <div class="ci-hero-icon">⬡</div>
            <div class="ci-hero-text">
              <div class="ci-label-small">Plataforma de Cursos</div>
              <h1 class="ci-title">DevPath</h1>
              <p class="ci-desc">Cargando información del curso…</p>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const c = this._course;
    const tags = this._deriveTags(c);

    this.shadowRoot.innerHTML = `
      ${this._getStyles()}
      <div class="ci-wrapper">

        <!-- HERO -->
        <div class="ci-hero">
          <div class="ci-hero-icon">⬡</div>
          <div class="ci-hero-text">
            <div class="ci-label-small">${c.subtitle || 'Plataforma de Cursos'}</div>
            <h1 class="ci-title">${c.name}</h1>
            ${c.description ? `<p class="ci-desc">${c.description}</p>` : ''}
          </div>
        </div>

        <!-- METADATA -->
        ${this._buildMetaCard(c)}

        <!-- ESTADÍSTICAS -->
        ${this._buildStats(c)}

        <!-- FASES / CONTENIDO -->
        ${this._buildPhases(c.phases)}

        <!-- TECNOLOGÍAS -->
        ${this._buildTechnologies(tags)}

        <!-- OBJETIVOS (opcional) -->
        ${this._buildObjectives(c.objectives)}

        <!-- CTA -->
        <div class="ci-cta">
          <strong>⬡ Elige un tema para comenzar</strong>
          Selecciona cualquier bloque del árbol de habilidades en la barra lateral.
        </div>

      </div>
    `;
  }
}

customElements.define('course-info', CourseInfo);
