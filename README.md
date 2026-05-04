# DevPath — Plataforma de Cursos

Plataforma web para visualizar cursos estructurados en fases y temas, con videos de YouTube, highlights por timestamp y capítulos editados.

## Estructura del proyecto

```
Lab7/
├── src/
│   ├── assets/
│   │   ├── fonts/          # Tipografías locales
│   │   └── images/         # Imágenes estáticas
│   ├── css/
│   │   └── global.css      # Estilos globales (variables, layout, componentes)
│   ├── modules/            # Web Components reutilizables + datos
│   │   ├── skill-node.js       # <skill-node>     — cuadradito de habilidad
│   │   ├── skill-grid.js       # <skill-grid>     — árbol de habilidades (sidebar)
│   │   ├── topic-content.js    # <topic-content>  — panel principal del tema
│   │   ├── highlight-item.js   # <highlight-item> — fila de highlight con timestamp
│   │   ├── chapter-card.js     # <chapter-card>   — tarjeta de capítulo
│   │   └── course-data.js      # Datos del curso (editar aquí)
│   ├── index.html
│   └── main.js             # Lógica principal y navegación
├── .gitignore
├── package.json
└── pnpm-lock.yaml
```

## Inicio rápido

```bash
pnpm install
pnpm dev       # http://localhost:1234
```

## Personalizar el curso

Edita `src/modules/course-data.js`. La estructura de datos es:

```js
{
  name: "Nombre del curso",
  phases: [
    {
      id: "fase-1",
      name: "Nombre de la fase",
      topics: [
        {
          id: "mi-tema",
          name: "Nombre del tema",
          shortName: "Corto",   // texto del cuadradito en el grid
          icon: "⚡",
          description: "Descripción del tema",
          tags: ["Tag1", "Tag2"],
          videoId: "ID_DE_YOUTUBE",
          videoTitle: "Título del video",
          duration: "4h 30m",
          highlights: [
            { seconds: 0,    title: "Título del highlight", desc: "Descripción opcional" },
            { seconds: 1800, title: "Otro highlight" },
          ],
          chapters: [           // opcional — si no hay, deja []
            {
              id: "cap-1",
              title: "Título del capítulo",
              videoId: "ID_DE_YOUTUBE",
              duration: "45:00",
              icon: "📦",
              highlights: [
                { seconds: 0, title: "Highlight del capítulo" }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Web Components

| Componente | Etiqueta | Descripción |
|---|---|---|
| SkillNode | `<skill-node>` | Cuadradito del grid de habilidades |
| SkillGrid | `<skill-grid>` | Grid completo de fases y temas |
| TopicContent | `<topic-content>` | Panel con video, highlights y capítulos |
| HighlightItem | `<highlight-item>` | Fila de highlight con timestamp clickeable |
| ChapterCard | `<chapter-card>` | Tarjeta de capítulo con thumbnail de YouTube |

## Tecnologías

- HTML / CSS / JavaScript vanilla
- Web Components nativos (Custom Elements + Shadow DOM)
- YouTube IFrame API (embed estático, seek por `?start=segundos`)
- `servor` como servidor de desarrollo con live reload
