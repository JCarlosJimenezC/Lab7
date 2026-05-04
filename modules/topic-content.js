/**
 * <topic-content> Web Component
 * Panel principal que muestra el contenido de un tema seleccionado:
 * video principal, highlights y capítulos.
 *
 * API:
 *   el.loadTopic(topicData, phaseData) — carga y renderiza el tema
 *   el.clear()                          — limpia el contenido
 */
class TopicContent extends HTMLElement {
  constructor() {
    super();
    this._topic = null;
    this._phase = null;
    this._activeTab = 'highlights';
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._render();
  }

  loadTopic(topic, phase) {
    this._topic = topic;
    this._phase = phase;
    this._activeTab = 'highlights';
    this._render();

    // Scroll al inicio (el host <topic-content> es el elemento scrollable)
    this.scrollTop = 0;
  }

  clear() {
    this._topic = null;
    this._phase = null;
    this._render();
  }

  _secondsToTime(s) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
    return `${m}:${String(sec).padStart(2,'0')}`;
  }

  _buildHighlightsList(highlights, videoId) {
    if (!highlights || highlights.length === 0) return `<p style="color:var(--text-secondary);font-size:13px;">Sin highlights disponibles.</p>`;
    return `<div class="highlights-list">
      ${highlights.map(hl => `
        <highlight-item
          time="${this._secondsToTime(hl.seconds)}"
          title="${hl.title}"
          desc="${hl.desc || ''}"
          video-id="${videoId}"
          seconds="${hl.seconds}"
        ></highlight-item>
      `).join('')}
    </div>`;
  }

  _buildChaptersGrid(chapters) {
    if (!chapters || chapters.length === 0) {
      return `<div class="no-chapters-notice">
        <strong>Sin capítulos editados</strong>
        Este tema no tiene capítulos. Puedes usar los highlights del video principal para navegar al contenido que te interese.
      </div>`;
    }

    return `<div class="chapters-grid">
      ${chapters.map(ch => {
        const hlCount = ch.highlights ? ch.highlights.length : 0;
        const miniHighlights = (ch.highlights || []).slice(0, 3).map(hl => `
          <div class="chapter-hl-mini">
            <span class="t">${this._secondsToTime(hl.seconds)}</span>
            <span>${hl.title}</span>
          </div>
        `).join('');

        return `<chapter-card
          chapter-id="${ch.id}"
          title="${ch.title}"
          duration="${ch.duration || ''}"
          video-id="${ch.videoId || ''}"
          icon="${ch.icon || '▶'}"
          highlights-count="${hlCount}"
        >
          ${miniHighlights}
        </chapter-card>`;
      }).join('')}
    </div>`;
  }

  _getStyles() {
    return `
      <style>
        :host {
          display: block;
          overflow-y: auto;
          height: 100%;
          scrollbar-width: thin;
          scrollbar-color: #3d3d60 transparent;
        }
        :host {
          --bg-base:        #0a0a0f;
          --bg-surface:     #111118;
          --bg-elevated:    #1a1a26;
          --bg-overlay:     #22223a;
          --border:         #2a2a42;
          --border-bright:  #3d3d60;
          --accent:         #6366f1;
          --accent-light:   #818cf8;
          --accent-dim:     #312e81;
          --accent2:        #ec4899;
          --accent2-light:  #f472b6;
          --accent2-dim:    #831843;
          --text-primary:   #e2e2f0;
          --text-secondary: #9090b0;
          --radius-sm: 2px;
          --radius:    4px;
          --transition: 180ms ease;
          --font: 'Segoe UI', system-ui, sans-serif;
          --mono: 'Cascadia Code', 'Fira Code', monospace;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .topic-wrapper {
          padding: 32px 40px 60px;
          max-width: 980px;
          font-family: var(--font);
        }

        /* HEADER */
        .topic-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 28px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }
        .topic-header-icon { font-size: 40px; line-height: 1; flex-shrink: 0; margin-top: 2px; }
        .topic-header-info { flex: 1; }
        .topic-phase-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--accent);
          margin-bottom: 5px;
        }
        .topic-title {
          font-size: 26px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 8px;
        }
        .topic-description {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 600px;
        }
        .topic-meta-tags {
          display: flex;
          gap: 6px;
          margin-top: 10px;
          flex-wrap: wrap;
        }
        .meta-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 2px;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .meta-tag.accent { border-color: var(--accent-dim); color: var(--accent-light); background: rgba(99,102,241,0.08); }
        .meta-tag.pink   { border-color: var(--accent2-dim); color: var(--accent2-light); background: rgba(236,72,153,0.08); }

        /* SECTION TITLE */
        .section-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-secondary);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .section-title::before {
          content: '';
          display: inline-block;
          width: 3px; height: 14px;
          background: var(--accent);
          border-radius: 2px;
        }

        /* VIDEO PRINCIPAL */
        .video-main-block { margin-bottom: 36px; }
        .video-embed-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #000;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          margin-bottom: 10px;
        }
        .video-embed-wrapper iframe {
          position: absolute;
          inset: 0; width: 100%; height: 100%;
          border: none;
        }
        .video-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .video-title { font-size: 14px; font-weight: 600; color: var(--text-primary); }
        .video-duration {
          font-size: 11px;
          color: var(--text-secondary);
          font-variant-numeric: tabular-nums;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          padding: 3px 8px;
          border-radius: 2px;
          white-space: nowrap;
        }

        /* TABS */
        .content-tabs {
          display: flex;
          border-bottom: 1px solid var(--border);
          margin-bottom: 20px;
        }
        .tab-btn {
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 10px 18px;
          cursor: pointer;
          transition: all var(--transition);
          margin-bottom: -1px;
          font-family: var(--font);
        }
        .tab-btn:hover { color: var(--text-primary); }
        .tab-btn.active { color: var(--accent-light); border-bottom-color: var(--accent); }
        .tab-count {
          background: var(--bg-overlay);
          color: var(--text-secondary);
          font-size: 9px;
          padding: 1px 5px;
          border-radius: 2px;
          margin-left: 5px;
          font-weight: 700;
        }
        .tab-btn.active .tab-count { background: var(--accent-dim); color: var(--accent-light); }

        .tab-panel { display: none; }
        .tab-panel.active { display: block; }

        /* HIGHLIGHTS */
        .highlights-list { display: flex; flex-direction: column; gap: 6px; }

        /* CHAPTERS GRID */
        .chapters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 10px;
        }

        /* HIGHLIGHT INLINE */
        highlight-item { display: block; }
        chapter-card { display: block; }

        /* NO CHAPTERS */
        .no-chapters-notice {
          padding: 24px;
          text-align: center;
          border: 1px dashed var(--border);
          border-radius: var(--radius);
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.6;
        }
        .no-chapters-notice strong {
          color: var(--text-primary);
          display: block;
          margin-bottom: 4px;
        }

        /* Chapter mini highlights (slot content) */
        .chapter-hl-mini {
          font-size: 10px;
          color: var(--text-secondary);
          display: flex;
          gap: 6px;
          align-items: flex-start;
          line-height: 1.3;
        }
        .chapter-hl-mini .t {
          color: var(--accent-light);
          font-family: var(--mono);
          font-size: 9px;
          flex-shrink: 0;
        }
      </style>
    `;
  }

  _render() {
    if (!this.shadowRoot) return;

    if (!this._topic) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    const topic = this._topic;
    const phase = this._phase;
    const videoId = topic.videoId || '';
    const hlCount = topic.highlights ? topic.highlights.length : 0;
    const chCount = topic.chapters ? topic.chapters.length : 0;
    const hasChapters = chCount > 0;

    const tags = (topic.tags || []).map((t, i) =>
      `<span class="meta-tag ${i === 0 ? 'accent' : i === 1 ? 'pink' : ''}">${t}</span>`
    ).join('');

    const embedSrc = videoId
      ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
      : '';

    const hlActive = this._activeTab === 'highlights' ? 'active' : '';
    const chActive = this._activeTab === 'chapters' ? 'active' : '';

    this.shadowRoot.innerHTML = `
      ${this._getStyles()}
      <div class="topic-wrapper">

        <!-- HEADER -->
        <div class="topic-header">
          <div class="topic-header-icon">${topic.icon || '📄'}</div>
          <div class="topic-header-info">
            <div class="topic-phase-label">${phase ? phase.name : ''}</div>
            <div class="topic-title">${topic.name}</div>
            ${topic.description ? `<div class="topic-description">${topic.description}</div>` : ''}
            ${tags ? `<div class="topic-meta-tags">${tags}</div>` : ''}
          </div>
        </div>

        <!-- VIDEO PRINCIPAL -->
        <div class="video-main-block">
          <div class="section-title">Video completo del tema</div>
          ${videoId ? `
            <div class="video-embed-wrapper">
              <iframe src="${embedSrc}" title="${topic.name}" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </div>
          ` : `
            <div style="background:var(--bg-elevated);border:1px dashed var(--border);border-radius:var(--radius);aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;color:var(--text-secondary);font-size:13px;">
              No hay video disponible aún
            </div>
          `}
          <div class="video-title-row">
            <span class="video-title">${topic.videoTitle || topic.name}</span>
            ${topic.duration ? `<span class="video-duration">⏱ ${topic.duration}</span>` : ''}
          </div>
        </div>

        <!-- TABS: HIGHLIGHTS / CHAPTERS -->
        <div class="content-tabs">
          <button class="tab-btn ${hlActive}" data-tab="highlights">
            Highlights <span class="tab-count">${hlCount}</span>
          </button>
          <button class="tab-btn ${chActive}" data-tab="chapters">
            Capítulos <span class="tab-count">${chCount}</span>
          </button>
        </div>

        <!-- HIGHLIGHTS PANEL -->
        <div class="tab-panel ${hlActive}" id="panel-highlights">
          ${this._buildHighlightsList(topic.highlights, videoId)}
        </div>

        <!-- CHAPTERS PANEL -->
        <div class="tab-panel ${chActive}" id="panel-chapters">
          ${this._buildChaptersGrid(topic.chapters)}
        </div>

      </div>
    `;

    // Tab switching
    this.shadowRoot.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._activeTab = btn.dataset.tab;
        this.shadowRoot.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.shadowRoot.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        this.shadowRoot.getElementById(`panel-${btn.dataset.tab}`).classList.add('active');
      });
    });

    // Highlight click → seek video
    this.shadowRoot.addEventListener('highlight-click', (e) => {
      const { videoId: vid, seconds } = e.detail;
      if (!vid) return;
      const iframe = this.shadowRoot.querySelector('iframe');
      if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${vid}?start=${seconds}&autoplay=1&rel=0&modestbranding=1`;
      }
    });

    // Chapter click → open video
    this.shadowRoot.addEventListener('chapter-click', (e) => {
      const { videoId: vid } = e.detail;
      if (vid) window.open(`https://www.youtube.com/watch?v=${vid}`, '_blank');
    });
  }
}

customElements.define('topic-content', TopicContent);
