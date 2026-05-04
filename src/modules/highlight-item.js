/**
 * <highlight-item> Web Component
 * Muestra un highlight con su timestamp y descripción.
 * 
 * Atributos:
 *   time       - timestamp "1:23:45"
 *   title      - título del highlight
 *   desc       - descripción opcional
 *   video-id   - ID de YouTube para abrir en el timestamp correcto
 *   seconds    - segundos del timestamp (para construir el link)
 */
class HighlightItem extends HTMLElement {
  static get observedAttributes() {
    return ['time', 'title', 'desc', 'video-id', 'seconds'];
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this._render();
    // Listener único — lee los atributos en el momento del click.
    this.shadowRoot.addEventListener('click', () => {
      const videoId = this.getAttribute('video-id') || '';
      const seconds = parseInt(this.getAttribute('seconds') || '0', 10);
      const evName  = (window.DEVPATH && window.DEVPATH.CONSTANTS)
        ? window.DEVPATH.CONSTANTS.EVENTS.HIGHLIGHT_CLICK
        : 'highlight-click';
      this.dispatchEvent(new CustomEvent(evName, {
        bubbles: true,
        composed: true,
        detail: { videoId, seconds },
      }));
    });
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._render();
  }

  _render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    const time    = this.getAttribute('time') || '0:00';
    const title   = this.getAttribute('title') || '';
    const desc    = this.getAttribute('desc') || '';
    const videoId = this.getAttribute('video-id') || '';
    const seconds = this.getAttribute('seconds') || '0';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          /* Las variables de color se heredan de :root */
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 14px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: border-color var(--transition), background var(--transition);
          font-family: var(--font);
        }
        .highlight-item:hover {
          border-color: var(--accent);
          background: var(--bg-overlay);
        }
        .highlight-time {
          font-size: 11px;
          font-weight: 700;
          color: var(--accent-light);
          font-family: var(--mono);
          background: rgba(99,102,241,0.1);
          border: 1px solid var(--accent-dim);
          padding: 3px 7px;
          border-radius: 2px;
          white-space: nowrap;
          flex-shrink: 0;
          margin-top: 1px;
          text-decoration: none;
        }
        .highlight-info { flex: 1; min-width: 0; }
        .highlight-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
          margin-bottom: 2px;
        }
        .highlight-desc {
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .highlight-play {
          width: 20px; height: 20px;
          flex-shrink: 0;
          color: var(--text-secondary);
          opacity: 0;
          transition: opacity var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          margin-top: 2px;
        }
        .highlight-item:hover .highlight-play {
          opacity: 1;
          color: var(--accent-light);
        }
      </style>
      <div class="highlight-item" data-video-id="${videoId}" data-seconds="${seconds}" tabindex="0" role="button">
        <span class="highlight-time">${time}</span>
        <div class="highlight-info">
          <div class="highlight-title">${title}</div>
          ${desc ? `<div class="highlight-desc">${desc}</div>` : ''}
        </div>
        <div class="highlight-play">▶</div>
      </div>
    `;

    // El click se maneja en connectedCallback (listener único).
  }
}

customElements.define('highlight-item', HighlightItem);
