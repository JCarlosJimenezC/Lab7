/**
 * <skill-grid> Web Component
 * Renderiza el grid de fases y nodos de habilidades.
 * 
 * API:
 *   grid.loadCourse(courseData)  — carga los datos del curso
 *   grid.selectTopic(topicId)    — marca un nodo como seleccionado
 */
class SkillGrid extends HTMLElement {
  constructor() {
    super();
    this._courseData = null;
    this._selectedId = null;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this._render();
    this.shadowRoot.addEventListener('node-select', (e) => {
      this.selectTopic(e.detail.topicId);
      // Re-bubble al documento
      this.dispatchEvent(new CustomEvent('topic-selected', {
        bubbles: true,
        composed: true,
        detail: { topicId: e.detail.topicId }
      }));
    });
  }

  loadCourse(courseData) {
    this._courseData = courseData;
    this._render();
  }

  selectTopic(topicId) {
    this._selectedId = topicId;
    // Actualizar atributos selected en todos los nodos
    if (this.shadowRoot) {
      this.shadowRoot.querySelectorAll('skill-node').forEach(node => {
        if (node.getAttribute('topic-id') === topicId) {
          node.setAttribute('selected', '');
        } else {
          node.removeAttribute('selected');
        }
      });
    }
  }

  _render() {
    if (!this.shadowRoot) return;

    const styles = `
      <style>
        :host {
          display: block;
          color: var(--text-primary, #e2e2f0);
        }

        /* Variables duplicadas para el shadow DOM */
        :host {
          --bg-base:       #0a0a0f;
          --bg-surface:    #111118;
          --bg-elevated:   #1a1a26;
          --bg-overlay:    #22223a;
          --border:        #2a2a42;
          --border-bright: #3d3d60;
          --accent:        #6366f1;
          --accent-light:  #818cf8;
          --accent-dim:    #312e81;
          --accent2:       #ec4899;
          --accent2-light: #f472b6;
          --accent2-dim:   #831843;
          --text-primary:  #e2e2f0;
          --text-secondary:#9090b0;
          --radius-sm: 2px;
          --radius: 4px;
          --transition: 180ms ease;
          --font: 'Segoe UI', system-ui, sans-serif;
          --mono: 'Cascadia Code', 'Fira Code', monospace;
        }

        .phase-block { margin-bottom: 4px; }

        .phase-label {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-secondary);
          padding: 14px 2px 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font);
        }
        .phase-block:first-child .phase-label { padding-top: 2px; }
        .phase-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .phase-num {
          background: var(--bg-overlay);
          border: 1px solid var(--border);
          color: var(--accent);
          font-size: 8px;
          padding: 1px 5px;
          border-radius: 2px;
        }

        .nodes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(68px, 1fr));
          gap: 4px;
        }

        skill-node {
          display: block;
        }

        /* Estilos internos de skill-node (se inyectan aquí también
           porque el shadow DOM de skill-node es anidado) */
      </style>
    `;

    if (!this._courseData) {
      this.shadowRoot.innerHTML = styles + `<div style="color:var(--text-secondary);padding:20px;font-size:12px;text-align:center;font-family:var(--font)">Cargando curso...</div>`;
      return;
    }

    let html = styles;

    this._courseData.phases.forEach((phase, phaseIdx) => {
      html += `
        <div class="phase-block">
          <div class="phase-label">
            <span class="phase-num">${phaseIdx + 1}</span>
            ${phase.name}
          </div>
          <div class="nodes-grid">
      `;

      phase.topics.forEach(topic => {
        const hlCount = topic.highlights ? topic.highlights.length : 0;
        const isSelected = topic.id === this._selectedId ? 'selected' : '';
        html += `<skill-node
          topic-id="${topic.id}"
          icon="${topic.icon || '📄'}"
          label="${topic.shortName || topic.name}"
          highlights="${hlCount}"
          ${isSelected}
        ></skill-node>`;
      });

      html += `</div></div>`;
    });

    this.shadowRoot.innerHTML = html;

    // Definir skill-node si no está definido aún en este contexto
    // (skill-node usa su propio shadow DOM con estilos inline)
  }
}

customElements.define('skill-grid', SkillGrid);
