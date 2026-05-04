/**
 * <chapter-card> Web Component
 * Tarjeta de capítulo con thumbnail, título y highlights internos.
 * 
 * Atributos:
 *   chapter-id  - ID del capítulo
 *   title       - título
 *   duration    - "32:15"
 *   video-id    - ID de YouTube
 *   icon        - emoji opcional para placeholder
 * 
 * Slot: highlights (lista de highlight-item)
 */
class ChapterCard extends HTMLElement {
  static get observedAttributes() {
    return ['chapter-id', 'title', 'duration', 'video-id', 'icon', 'highlights-count'];
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._render();
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });

    const title       = this.getAttribute('title') || '';
    const duration    = this.getAttribute('duration') || '';
    const videoId     = this.getAttribute('video-id') || '';
    const icon        = this.getAttribute('icon') || '▶';
    const hlCount     = this.getAttribute('highlights-count') || '0';

    const thumb = videoId
      ? `<img src="https://img.youtube.com/vi/${videoId}/mqdefault.jpg" alt="${title}" loading="lazy" />`
      : `<div class="chapter-thumb-placeholder">${icon}</div>`;

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        :host {
          --bg-elevated:  #1a1a26;
          --bg-overlay:   #22223a;
          --border:       #2a2a42;
          --accent2:      #ec4899;
          --accent2-light:#f472b6;
          --accent2-dim:  #831843;
          --accent-light: #818cf8;
          --text-primary: #e2e2f0;
          --text-secondary:#9090b0;
          --radius:       4px;
          --transition:   180ms ease;
          --font: 'Segoe UI', system-ui, sans-serif;
          --mono: 'Cascadia Code', 'Fira Code', monospace;
        }

        .chapter-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          cursor: pointer;
          transition: border-color var(--transition), transform 120ms ease;
          font-family: var(--font);
        }
        .chapter-card:hover {
          border-color: var(--accent2);
          transform: translateY(-2px);
        }

        .chapter-thumb {
          position: relative;
          aspect-ratio: 16/9;
          background: #000;
          overflow: hidden;
        }
        .chapter-thumb img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.85;
          display: block;
        }
        .chapter-thumb-placeholder {
          width: 100%; height: 100%;
          background: var(--bg-overlay);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          opacity: 0.4;
        }
        .chapter-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition);
        }
        .chapter-card:hover .chapter-thumb-overlay { opacity: 1; }
        .play-circle {
          width: 40px; height: 40px;
          background: rgba(236,72,153,0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          padding-left: 2px;
          color: #fff;
        }
        .chapter-duration-badge {
          position: absolute;
          bottom: 6px; right: 6px;
          background: rgba(0,0,0,0.8);
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 2px;
          font-variant-numeric: tabular-nums;
        }
        .chapter-info { padding: 10px 12px; }
        .chapter-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 5px;
        }
        .chapter-highlights-count {
          font-size: 10px;
          color: var(--accent2-light);
          font-weight: 600;
          margin-bottom: 6px;
        }
        .chapter-highlights-preview {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        ::slotted(highlight-item) {
          display: block;
        }
      </style>

      <div class="chapter-card">
        <div class="chapter-thumb">
          ${thumb}
          <div class="chapter-thumb-overlay">
            <div class="play-circle">▶</div>
          </div>
          ${duration ? `<div class="chapter-duration-badge">${duration}</div>` : ''}
        </div>
        <div class="chapter-info">
          <div class="chapter-title">${title}</div>
          ${hlCount > 0 ? `<div class="chapter-highlights-count">▸ ${hlCount} highlights</div>` : ''}
          <div class="chapter-highlights-preview">
            <slot></slot>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.chapter-card').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('chapter-click', {
        bubbles: true,
        composed: true,
        detail: { videoId }
      }));
    });
  }
}

customElements.define('chapter-card', ChapterCard);
