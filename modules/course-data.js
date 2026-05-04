/**
 * course-data.js
 * Datos del curso. Edita este archivo para personalizar el contenido.
 *
 * Estructura:
 *   Course → phases[] → topics[] → { videoId, highlights[], chapters[]? }
 *
 * highlights: { seconds, title, desc? }
 * chapters:   { id, title, videoId, duration?, icon?, highlights[]? }
 */

window.COURSE_DATA = {
  id: 'if-7102',
  name: 'Multimedios',
  subtitle: 'IF-7102 · I Ciclo 2026 · Grupo 01',
  code: 'I.S.2026.GLI.IF-7102.001',
  professor: 'Lic. Iván Alonso Chavarría Cubero',
  email: 'ivan.chavarriacubero@ucr.ac.cr',
  officeHours: 'Lunes 9 a 12 md',
  description: 'Desarrollar aplicaciones con multimedios e hipermedios, poniendo en práctica los conocimientos adquiridos a lo largo de la carrera.',
  modality: 'Presencial con apoyo de Mediación Virtual',
  phases: [

    // ─────────────────────────────────────────────
    {
      id: 'fase-fundamentos',
      name: 'Fundamentos',
      topics: [
        {
          id: 'terminal',
          name: 'Terminal & CLI',
          shortName: 'Terminal',
          icon: '🖥',
          description: 'Domina la línea de comandos: navegación, scripts, procesos y herramientas esenciales para cualquier desarrollador.',
          tags: ['CLI', 'Bash', 'Productividad'],
          videoId: 'nZ1DMMsyVds',        // placeholder (reemplaza con tu videoId real)
          videoTitle: 'Terminal y línea de comandos — Curso completo',
          duration: '4h 12m',
          highlights: [
            { seconds: 0,    title: 'Introducción a la terminal', desc: '¿Qué es y por qué usarla?' },
            { seconds: 312,  title: 'Navegación básica: ls, cd, pwd', desc: 'Moverse por el sistema de archivos' },
            { seconds: 820,  title: 'Manipulación de archivos', desc: 'cp, mv, rm, mkdir, touch' },
            { seconds: 1540, title: 'Permisos y chmod', desc: 'Entender los permisos Unix' },
            { seconds: 2200, title: 'Variables de entorno', desc: 'PATH, export, .bashrc / .zshrc' },
            { seconds: 3100, title: 'Pipes y redirecciones', desc: '|, >, >>, 2>&1' },
            { seconds: 4500, title: 'Scripts básicos en Bash', desc: 'Automatizar tareas repetitivas' },
            { seconds: 6200, title: 'Procesos: ps, kill, top, htop', desc: 'Gestión de procesos en el sistema' },
            { seconds: 8100, title: 'SSH y conexiones remotas', desc: 'Conectarse a servidores seguros' },
            { seconds: 10000, title: 'Herramientas útiles: grep, find, awk, sed', desc: 'Procesamiento de texto avanzado' },
          ],
          chapters: [
            {
              id: 'terminal-ch1',
              title: 'Primeros pasos en la terminal',
              videoId: 'nZ1DMMsyVds',
              duration: '45:00',
              icon: '🖥',
              highlights: [
                { seconds: 0,   title: 'Apertura y tipos de shell' },
                { seconds: 312, title: 'Navegación básica' },
                { seconds: 820, title: 'Crear y borrar archivos' },
              ]
            },
            {
              id: 'terminal-ch2',
              title: 'Scripting y automatización',
              videoId: 'nZ1DMMsyVds',
              duration: '52:30',
              icon: '⚙️',
              highlights: [
                { seconds: 4500, title: 'Primer script Bash' },
                { seconds: 5100, title: 'Bucles y condicionales' },
                { seconds: 6200, title: 'Gestión de procesos' },
              ]
            },
          ]
        },
        {
          id: 'git',
          name: 'Git & GitHub',
          shortName: 'Git',
          icon: '🌿',
          description: 'Control de versiones, flujos de trabajo con ramas, pull requests y colaboración con GitHub.',
          tags: ['Git', 'GitHub', 'Control de versiones'],
          videoId: 'tRZGeaHPoaw',
          videoTitle: 'Git y GitHub — Curso completo desde cero',
          duration: '5h 30m',
          highlights: [
            { seconds: 0,    title: '¿Qué es el control de versiones?' },
            { seconds: 450,  title: 'Instalación y configuración inicial', desc: 'git config --global' },
            { seconds: 900,  title: 'git init, add y commit', desc: 'El flujo básico de trabajo' },
            { seconds: 1800, title: 'Ramas: git branch y checkout', desc: 'Trabajar en paralelo sin conflictos' },
            { seconds: 2700, title: 'git merge y resolución de conflictos' },
            { seconds: 3600, title: 'GitHub: repos remotos, push y pull' },
            { seconds: 4800, title: 'Pull Requests y Code Review' },
            { seconds: 6000, title: 'git rebase y git stash' },
            { seconds: 7200, title: 'Flujo GitFlow' },
            { seconds: 9000, title: 'GitHub Actions — Introducción a CI/CD' },
          ],
          chapters: [
            {
              id: 'git-ch1',
              title: 'Git local — commits y ramas',
              videoId: 'tRZGeaHPoaw',
              duration: '1h 10m',
              icon: '🌿',
              highlights: [
                { seconds: 450,  title: 'Configurar Git' },
                { seconds: 900,  title: 'Primer commit' },
                { seconds: 1800, title: 'Ramas y merge' },
              ]
            },
            {
              id: 'git-ch2',
              title: 'GitHub — Repositorios remotos',
              videoId: 'tRZGeaHPoaw',
              duration: '58:00',
              icon: '🐙',
              highlights: [
                { seconds: 3600, title: 'Push y pull' },
                { seconds: 4800, title: 'Pull Requests' },
              ]
            },
          ]
        },
        {
          id: 'markdown',
          name: 'Markdown',
          shortName: 'Markdown',
          icon: '📝',
          description: 'Escribe documentación clara con Markdown: READMEs, wikis y documentos técnicos.',
          tags: ['Documentación', 'Markdown'],
          videoId: '',
          videoTitle: 'Markdown desde cero',
          duration: '1h 00m',
          highlights: [
            { seconds: 0,   title: 'Sintaxis básica: títulos, listas, énfasis' },
            { seconds: 720, title: 'Tablas y bloques de código' },
            { seconds: 1200, title: 'Links e imágenes' },
            { seconds: 1800, title: 'README profesional para GitHub' },
          ],
          chapters: []
        },
      ]
    },

    // ─────────────────────────────────────────────
    {
      id: 'fase-frontend',
      name: 'Frontend',
      topics: [
        {
          id: 'html',
          name: 'HTML',
          shortName: 'HTML',
          icon: '🧱',
          description: 'El esqueleto de la web. Semántica, accesibilidad, formularios y las mejores prácticas de HTML5.',
          tags: ['HTML5', 'Semántica', 'Accesibilidad'],
          videoId: 'kUMe1FH4CHE',
          videoTitle: 'HTML desde cero — Curso completo',
          duration: '4h 20m',
          highlights: [
            { seconds: 0,    title: 'Estructura básica de un documento HTML' },
            { seconds: 600,  title: 'Etiquetas semánticas: header, main, section, article' },
            { seconds: 1500, title: 'Formularios y validación nativa' },
            { seconds: 2400, title: 'Tablas y su uso correcto' },
            { seconds: 3300, title: 'Accesibilidad: ARIA y buenas prácticas' },
            { seconds: 4500, title: 'SEO básico: meta tags, og: y robots' },
            { seconds: 6000, title: 'HTML5 APIs: Canvas, Video, Audio' },
            { seconds: 8000, title: 'Web Components nativos: template, slot' },
          ],
          chapters: [
            {
              id: 'html-ch1',
              title: 'HTML Básico',
              videoId: 'kUMe1FH4CHE',
              duration: '1h 05m',
              icon: '🧱',
              highlights: [
                { seconds: 0,   title: 'Estructura del documento' },
                { seconds: 600, title: 'Etiquetas semánticas' },
              ]
            },
            {
              id: 'html-ch2',
              title: 'Formularios y Accesibilidad',
              videoId: 'kUMe1FH4CHE',
              duration: '48:00',
              icon: '♿',
              highlights: [
                { seconds: 1500, title: 'Formularios avanzados' },
                { seconds: 3300, title: 'ARIA labels' },
              ]
            },
          ]
        },
        {
          id: 'css',
          name: 'CSS',
          shortName: 'CSS',
          icon: '🎨',
          description: 'Estilos modernos con CSS: selectores, Flexbox, Grid, animaciones, custom properties y responsive design.',
          tags: ['CSS3', 'Flexbox', 'Grid', 'Responsive'],
          videoId: 'wZniZEbPAzk',
          videoTitle: 'CSS moderno — Curso completo',
          duration: '6h 15m',
          highlights: [
            { seconds: 0,    title: 'Selectores y especificidad' },
            { seconds: 1200, title: 'Box model y posicionamiento' },
            { seconds: 2800, title: 'Flexbox — el modelo de cajas flexible' },
            { seconds: 4500, title: 'CSS Grid — layouts de dos dimensiones' },
            { seconds: 6500, title: 'Custom Properties (variables CSS)' },
            { seconds: 8000, title: 'Animaciones y transiciones' },
            { seconds: 9500, title: 'Responsive Design y media queries' },
            { seconds: 11000, title: 'Dark mode con prefers-color-scheme' },
            { seconds: 13000, title: 'CSS moderno: container queries, :has, @layer' },
          ],
          chapters: [
            {
              id: 'css-ch1',
              title: 'Flexbox',
              videoId: 'wZniZEbPAzk',
              duration: '50:00',
              icon: '↔️',
              highlights: [
                { seconds: 2800, title: 'display: flex' },
                { seconds: 3200, title: 'justify-content y align-items' },
                { seconds: 3800, title: 'flex-wrap y order' },
              ]
            },
            {
              id: 'css-ch2',
              title: 'CSS Grid',
              videoId: 'wZniZEbPAzk',
              duration: '55:00',
              icon: '⬛',
              highlights: [
                { seconds: 4500, title: 'grid-template-columns' },
                { seconds: 5000, title: 'grid-area y named areas' },
                { seconds: 5600, title: 'auto-fill y minmax' },
              ]
            },
            {
              id: 'css-ch3',
              title: 'Animaciones y diseño responsive',
              videoId: 'wZniZEbPAzk',
              duration: '42:00',
              icon: '✨',
              highlights: [
                { seconds: 8000, title: 'Transitions' },
                { seconds: 8500, title: '@keyframes' },
                { seconds: 9500, title: 'Media queries' },
              ]
            },
          ]
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          shortName: 'JS',
          icon: '⚡',
          description: 'El lenguaje de la web. Desde tipos y funciones hasta promesas, módulos, DOM y APIs del navegador.',
          tags: ['ES2024', 'DOM', 'Async', 'Módulos'],
          videoId: 'dtKciwk_si4',
          videoTitle: 'JavaScript desde cero — Curso completo',
          duration: '8h 30m',
          highlights: [
            { seconds: 0,     title: 'Variables: var, let, const' },
            { seconds: 1500,  title: 'Tipos de datos y coerción' },
            { seconds: 3000,  title: 'Funciones: declaración, expresión, arrow' },
            { seconds: 4800,  title: 'Scope, closures y hoisting' },
            { seconds: 6500,  title: 'Objetos, prototipos y clases ES6+' },
            { seconds: 8500,  title: 'Arrays y métodos funcionales: map, filter, reduce' },
            { seconds: 10500, title: 'DOM manipulation' },
            { seconds: 12000, title: 'Eventos y event delegation' },
            { seconds: 14000, title: 'Promesas y async/await' },
            { seconds: 16000, title: 'Fetch API y REST' },
            { seconds: 18000, title: 'Módulos ES6: import/export' },
            { seconds: 20000, title: 'Web APIs: localStorage, History, IntersectionObserver' },
          ],
          chapters: [
            {
              id: 'js-ch1',
              title: 'Fundamentos de JS',
              videoId: 'dtKciwk_si4',
              duration: '1h 30m',
              icon: '📦',
              highlights: [
                { seconds: 0,    title: 'Variables y tipos' },
                { seconds: 3000, title: 'Funciones' },
                { seconds: 4800, title: 'Closures' },
              ]
            },
            {
              id: 'js-ch2',
              title: 'DOM y eventos',
              videoId: 'dtKciwk_si4',
              duration: '1h 10m',
              icon: '🖱',
              highlights: [
                { seconds: 10500, title: 'Seleccionar elementos' },
                { seconds: 11200, title: 'Modificar el DOM' },
                { seconds: 12000, title: 'addEventListener' },
              ]
            },
            {
              id: 'js-ch3',
              title: 'Async JS y Fetch',
              videoId: 'dtKciwk_si4',
              duration: '1h 00m',
              icon: '🔄',
              highlights: [
                { seconds: 14000, title: 'Promesas' },
                { seconds: 15000, title: 'async/await' },
                { seconds: 16000, title: 'Fetch y APIs' },
              ]
            },
          ]
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          shortName: 'TS',
          icon: '🔷',
          description: 'JavaScript tipado: interfaces, generics, enums, utility types y configuración del compilador.',
          tags: ['TypeScript', 'Tipos', 'Tooling'],
          videoId: 'BwuLxPH8IDs',
          videoTitle: 'TypeScript — Curso completo',
          duration: '4h 45m',
          highlights: [
            { seconds: 0,    title: 'Por qué TypeScript' },
            { seconds: 600,  title: 'Tipos básicos: string, number, boolean, any, unknown' },
            { seconds: 1800, title: 'Interfaces y type aliases' },
            { seconds: 3000, title: 'Generics' },
            { seconds: 4500, title: 'Utility types: Partial, Required, Pick, Omit' },
            { seconds: 6000, title: 'Clases y modificadores de acceso' },
            { seconds: 7500, title: 'tsconfig.json — Configuración avanzada' },
          ],
          chapters: []
        },
        {
          id: 'web-components',
          name: 'Web Components',
          shortName: 'WC',
          icon: '🧩',
          description: 'Componentes reutilizables nativos del navegador: Custom Elements, Shadow DOM, HTML Templates y slots.',
          tags: ['Custom Elements', 'Shadow DOM', 'HTML Templates'],
          videoId: '',
          videoTitle: 'Web Components desde cero',
          duration: '3h 00m',
          highlights: [
            { seconds: 0,    title: 'Custom Elements: define y connectedCallback' },
            { seconds: 900,  title: 'observedAttributes y attributeChangedCallback' },
            { seconds: 1800, title: 'Shadow DOM: encapsulación de estilos' },
            { seconds: 2700, title: 'HTML Templates y slots' },
            { seconds: 3600, title: 'Custom Events y composición' },
            { seconds: 4800, title: 'Lifecycle callbacks completos' },
            { seconds: 6000, title: 'Buenas prácticas y patterns' },
          ],
          chapters: []
        },
      ]
    },

    // ─────────────────────────────────────────────
    {
      id: 'fase-herramientas',
      name: 'Herramientas',
      topics: [
        {
          id: 'npm',
          name: 'NPM & Tooling',
          shortName: 'NPM',
          icon: '📦',
          description: 'Gestión de paquetes, scripts npm, bundlers (Vite, Webpack), linters (ESLint) y formatters (Prettier).',
          tags: ['NPM', 'Vite', 'ESLint', 'Prettier'],
          videoId: '',
          videoTitle: 'NPM y Tooling moderno',
          duration: '2h 30m',
          highlights: [
            { seconds: 0,    title: 'package.json explicado' },
            { seconds: 700,  title: 'npm install, ci, update' },
            { seconds: 1400, title: 'Scripts npm personalizados' },
            { seconds: 2100, title: 'Vite como bundler moderno' },
            { seconds: 3000, title: 'ESLint: linting de código' },
            { seconds: 3800, title: 'Prettier: formateo automático' },
          ],
          chapters: []
        },
        {
          id: 'vscode',
          name: 'VS Code',
          shortName: 'VS Code',
          icon: '💎',
          description: 'Productividad máxima en VS Code: atajos, extensiones imprescindibles, snippets y configuración.',
          tags: ['VS Code', 'Productividad', 'Extensions'],
          videoId: '',
          videoTitle: 'VS Code — Guía completa',
          duration: '2h 00m',
          highlights: [
            { seconds: 0,    title: 'Atajos de teclado esenciales' },
            { seconds: 900,  title: 'Extensiones imprescindibles' },
            { seconds: 1800, title: 'Snippets y multi-cursor' },
            { seconds: 2700, title: 'Debugger integrado' },
            { seconds: 3600, title: 'settings.json y workspace config' },
          ],
          chapters: []
        },
        {
          id: 'debugging',
          name: 'Debugging',
          shortName: 'Debug',
          icon: '🐛',
          description: 'Encuentra y corrige bugs eficientemente con DevTools, breakpoints, profiling y error tracking.',
          tags: ['DevTools', 'Breakpoints', 'Performance'],
          videoId: '',
          videoTitle: 'Debugging en el navegador',
          duration: '2h 15m',
          highlights: [
            { seconds: 0,    title: 'Chrome DevTools overview' },
            { seconds: 720,  title: 'Console: log, warn, error, table, group' },
            { seconds: 1500, title: 'Breakpoints en Sources' },
            { seconds: 2400, title: 'Network tab: inspeccionar peticiones' },
            { seconds: 3300, title: 'Performance profiling' },
            { seconds: 4200, title: 'Memory leaks' },
          ],
          chapters: []
        },
      ]
    },

    // ─────────────────────────────────────────────
    {
      id: 'fase-backend',
      name: 'Backend',
      topics: [
        {
          id: 'nodejs',
          name: 'Node.js',
          shortName: 'Node',
          icon: '🟢',
          description: 'JavaScript en el servidor: módulos, streams, eventos, file system y el event loop.',
          tags: ['Node.js', 'Server', 'Streams'],
          videoId: '',
          videoTitle: 'Node.js — Curso completo',
          duration: '5h 00m',
          highlights: [
            { seconds: 0,    title: 'El event loop explicado' },
            { seconds: 1200, title: 'Módulos: CommonJS vs ESModules' },
            { seconds: 2400, title: 'File System (fs) asíncrono' },
            { seconds: 3600, title: 'Streams y Buffers' },
            { seconds: 5000, title: 'HTTP nativo: crear un servidor' },
            { seconds: 6500, title: 'NPM: publicar un paquete' },
          ],
          chapters: []
        },
        {
          id: 'express',
          name: 'Express',
          shortName: 'Express',
          icon: '🚂',
          description: 'Framework minimalista para APIs REST: rutas, middlewares, autenticación y manejo de errores.',
          tags: ['Express', 'REST API', 'Middleware'],
          videoId: '',
          videoTitle: 'Express.js — APIs REST',
          duration: '4h 00m',
          highlights: [
            { seconds: 0,    title: 'Configurar un proyecto Express' },
            { seconds: 800,  title: 'Rutas: GET, POST, PUT, DELETE' },
            { seconds: 1800, title: 'Middlewares: logging, cors, body-parser' },
            { seconds: 2800, title: 'Autenticación con JWT' },
            { seconds: 4000, title: 'Manejo global de errores' },
            { seconds: 5000, title: 'Estructura de proyecto escalable' },
          ],
          chapters: []
        },
        {
          id: 'databases',
          name: 'Bases de Datos',
          shortName: 'BD',
          icon: '🗄',
          description: 'SQL con PostgreSQL y NoSQL con MongoDB. Modelado de datos, consultas y ORMs.',
          tags: ['SQL', 'PostgreSQL', 'MongoDB'],
          videoId: '',
          videoTitle: 'Bases de datos para developers',
          duration: '6h 00m',
          highlights: [
            { seconds: 0,    title: 'Relacional vs No relacional' },
            { seconds: 1200, title: 'SQL básico: SELECT, INSERT, UPDATE, DELETE' },
            { seconds: 2700, title: 'JOINs: INNER, LEFT, RIGHT' },
            { seconds: 4200, title: 'Índices y optimización de queries' },
            { seconds: 5800, title: 'MongoDB: documentos y colecciones' },
            { seconds: 7500, title: 'Mongoose ORM' },
            { seconds: 9200, title: 'Prisma ORM con PostgreSQL' },
          ],
          chapters: []
        },
      ]
    },

    // ─────────────────────────────────────────────
    {
      id: 'fase-avanzado',
      name: 'Avanzado',
      topics: [
        {
          id: 'react',
          name: 'React',
          shortName: 'React',
          icon: '⚛️',
          description: 'La librería UI más popular: componentes, hooks, estado global, performance y React 19.',
          tags: ['React', 'Hooks', 'JSX', 'State'],
          videoId: '',
          videoTitle: 'React — Curso completo',
          duration: '7h 00m',
          highlights: [
            { seconds: 0,    title: 'JSX y componentes funcionales' },
            { seconds: 1500, title: 'useState y useEffect' },
            { seconds: 3000, title: 'Props y composición' },
            { seconds: 4500, title: 'useContext y estado global' },
            { seconds: 6000, title: 'useReducer y patrones avanzados' },
            { seconds: 7800, title: 'React Router v6' },
            { seconds: 9500, title: 'Optimización: memo, useMemo, useCallback' },
            { seconds: 11500, title: 'React Query / TanStack Query' },
          ],
          chapters: []
        },
        {
          id: 'testing',
          name: 'Testing',
          shortName: 'Test',
          icon: '🧪',
          description: 'Unit testing, integration testing y E2E con Vitest, Testing Library y Playwright.',
          tags: ['Vitest', 'Testing Library', 'Playwright'],
          videoId: '',
          videoTitle: 'Testing en JavaScript',
          duration: '3h 30m',
          highlights: [
            { seconds: 0,    title: 'Pirámide de testing' },
            { seconds: 900,  title: 'Vitest: setup y primer test' },
            { seconds: 1800, title: 'Testing Library: render y queries' },
            { seconds: 2800, title: 'Mocks y stubs' },
            { seconds: 3800, title: 'Playwright: tests E2E' },
            { seconds: 5000, title: 'Cobertura de código' },
          ],
          chapters: []
        },
        {
          id: 'docker',
          name: 'Docker',
          shortName: 'Docker',
          icon: '🐳',
          description: 'Contenedores para desarrollo y producción: Dockerfile, docker-compose, redes y volúmenes.',
          tags: ['Docker', 'Containers', 'DevOps'],
          videoId: '',
          videoTitle: 'Docker desde cero',
          duration: '4h 00m',
          highlights: [
            { seconds: 0,    title: '¿Qué es un contenedor?' },
            { seconds: 900,  title: 'Dockerfile: instrucciones básicas' },
            { seconds: 1800, title: 'Imágenes: build, tag, push' },
            { seconds: 2700, title: 'docker-compose para multi-servicios' },
            { seconds: 3700, title: 'Volúmenes y persistencia' },
            { seconds: 4800, title: 'Redes en Docker' },
          ],
          chapters: []
        },
        {
          id: 'cicd',
          name: 'CI/CD',
          shortName: 'CI/CD',
          icon: '🔁',
          description: 'Integración y despliegue continuo con GitHub Actions, pipelines, artefactos y despliegue en la nube.',
          tags: ['GitHub Actions', 'CI/CD', 'DevOps'],
          videoId: '',
          videoTitle: 'CI/CD con GitHub Actions',
          duration: '2h 30m',
          highlights: [
            { seconds: 0,    title: 'Qué es CI/CD y por qué importa' },
            { seconds: 600,  title: 'Anatomía de un workflow de GitHub Actions' },
            { seconds: 1400, title: 'Jobs, steps y runners' },
            { seconds: 2200, title: 'Variables y secretos' },
            { seconds: 3100, title: 'Deploy automático a Vercel / Railway' },
          ],
          chapters: []
        },
      ]
    },

  ]
};
