/**
 * <skill-node> Web Component
 * Representa un cuadradito de habilidad en el grid.
 * 
 * Atributos:
 *   topic-id   - ID único del tema
 *   icon       - emoji o símbolo
 *   label      - nombre corto
 *   highlights - número de highlights
 *   selected   - (boolean) si está seleccionado
 */
class SkillNode extends HTMLElement {
  static get observedAttributes() {
    return ['topic-id', 'icon', 'label', 'highlights', 'selected'];
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this._render();
    // Listener único — lee el atributo topic-id en el momento del click.
    this.shadowRoot.addEventListener('click', () => {
      const topicId = this.getAttribute('topic-id');
      if (topicId) {
        this.dispatchEvent(new CustomEvent(
          (window.DEVPATH && window.DEVPATH.CONSTANTS)
            ? window.DEVPATH.CONSTANTS.EVENTS.NODE_SELECT
            : 'node-select',
          { bubbles: true, composed: true, detail: { topicId } }
        ));
      }
    });
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this._render();
  }

  _render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    const icon       = this.getAttribute('icon') || '📄';
    const label      = this.getAttribute('label') || '';
    const highlights = this.getAttribute('highlights') || '0';
    const selected   = this.hasAttribute('selected');

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          /* Las variables de color se heredan de :root — no se sobreescriben aquí */
        }

        .skill-node {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 6px 4px 5px;
          transition: border-color 120ms ease, background 120ms ease, transform 80ms ease;
          user-select: none;
          overflow: hidden;
          font-family: var(--font);
        }
        .skill-node::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(99,102,241,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 120ms ease;
        }
        .skill-node:hover {
          border-color: var(--accent);
          background: var(--bg-overlay);
          transform: translateY(-1px);
        }
        .skill-node:hover::before { opacity: 1; }
        .skill-node:active { transform: translateY(0) scale(0.97); }
        .skill-node.selected {
          border-color: var(--accent2);
          background: var(--bg-overlay);
          box-shadow: 0 0 0 1px var(--accent2-dim), inset 0 0 12px rgba(236,72,153,0.08);
        }
        .skill-node.selected::before {
          background: linear-gradient(135deg, rgba(236,72,153,0.1) 0%, transparent 60%);
          opacity: 1;
        }
        .skill-node::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 8px; height: 2px;
          background: var(--accent);
          opacity: 0;
          transition: opacity 120ms ease;
        }
        .skill-node:hover::after { opacity: 1; }
        .skill-node.selected::after {
          opacity: 1;
          background: var(--accent2);
          width: 100%;
          height: 2px;
        }
        .node-icon {
          font-size: 20px;
          line-height: 1;
          transition: transform 120ms ease;
        }
        .skill-node:hover .node-icon { transform: scale(1.1); }
        .node-label {
          font-size: 8.5px;
          font-weight: 600;
          text-align: center;
          color: var(--text-secondary);
          line-height: 1.2;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
        .skill-node:hover .node-label,
        .skill-node.selected .node-label { color: var(--text-primary); }
        .node-badge {
          position: absolute;
          top: 3px; right: 3px;
          background: var(--accent-dim);
          color: var(--accent-light);
          font-size: 7px;
          font-weight: 700;
          padding: 1px 3px;
          border-radius: 2px;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .skill-node.selected .node-badge {
          background: var(--accent2-dim);
          color: var(--accent2-light);
        }
      </style>
      <div class="skill-node${selected ? ' selected' : ''}">
        ${highlights > 0 ? `<span class="node-badge">${highlights}</span>` : ''}
        <span class="node-icon">${icon}</span>
        <span class="node-label" title="${label}">${label}</span>
      </div>
    `;

    // El click se maneja en connectedCallback (listener único).
  }
}

customElements.define('skill-node', SkillNode);
