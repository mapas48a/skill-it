# skill-it

> Si la IA no conoce un tema, es porque ese tema no existe todavía.

Transforma cualquier documentación web en skills reutilizables para agentes de IA. Pasa una URL — obtén un archivo markdown completo listo para usar.

---

## Mentalidad Skill-it

La IA solo puede responder lo que sabe. Si no conoce una tecnología, un patrón o una herramienta, falla. **skill-it** cierra ese gap: toma documentación cruda de la web y la convierte en conocimiento estructurado que cualquier agente puede consumir.

**La filosofía es simple:**
- Si la IA no sabe algo, enséñaselo.
- Si no existe documentación clara, créala.
- Si el conocimiento está disperso, condénsalo.

Un skill no es un prompt. Es un módulo de conocimiento reutilizable, modulable y optimizado para razonamiento.

---

## Estructura del Proyecto

```
skill-it/
├── index.ts                    # CLI entrypoint — punto de entrada del paquete npm
├── scripts/
│   ├── make-skill.ts           # Orquesta el flujo: lee agente → genera skill
│   └── read-agent.ts           # Detecta carpeta de agentes (.agents, .claude)
├── services/
│   └── writeskill.ts           # Clase con métodos async — llama a la API y escribe el archivo
├── types/
│   └── skill-type.ts           # Contrato de tipo para la respuesta de la API
├── utils/
│   └── arg-to-obj.ts           # Parser de argumentos CLI a objeto
│
├── api/                        # Backend (Elysia + Bun, desplegado en Vercel)
│   ├── index.ts                # Servidor HTTP — rutas / y /skill
│   ├── lib/
│   │   └── client.ts           # Cliente Cerebras SDK configurado
│   └── src/
│       ├── services/
│       │   └── skill-service.ts    # Clase SkillServices — handler async con IA
│       ├── models/
│       │   └── skill-model.ts      # Contrato SkillServicesContract
│       ├── utils/
│       │   └── markdown-formatter.ts  # Limpieza y formato del markdown generado
│       └── data/
│           ├── context.ts                    # System prompt y contexto para la IA
│           ├── ai-skill-engineer-knowledge.md # Conocimiento sobre cómo crear skills
│           └── web-research-scraping-knowledge.md  # Conocimiento sobre scraping de docs
│
├── web/                        # Frontend (React + Vite + Tailwind v4)
│   └── src/
│       ├── components/
│       │   ├── App.tsx         # Componente principal — hero, filtros, grid de skills
│       │   └── SkillCard.tsx   # Card individual de skill
│       ├── hooks/
│       │   └── data.ts         # Skills de muestra y categorías
│       ├── index.css           # Tailwind v4 + tema custom
│       └── main.tsx            # Entry point de React
│
├── package.json                # Paquete npm — bin "skill-it"
├── tsconfig.json               # Config TypeScript ESM
├── vercel.json                 # Deploy API en Vercel con runtime Bun
└── netlify.toml                # Deploy frontend en Netlify
```

---

## Arquitectura

### CLI (`index.ts` → `scripts/` → `services/`)

El CLI es el punto de entrada publicado como paquete npm. El flujo:

```
index.ts
  └→ makeSkill()
       ├→ readAgents()          // Detecta .agents/ o .claude/
       └→ WriteSKill.createFile()  // Llama a la API, escribe el .md
```

**`WriteSKill`** (`services/writeskill.ts`) es una clase con un método estático async que:
1. Parsea los argumentos CLI (`url`, `prompt`)
2. Hace `fetch` al endpoint `/skill` de la API
3. Espera la respuesta JSON (`await responseAPI.json()`)
4. Escribe el archivo `.md` en la carpeta del agente

```typescript
export class WriteSKill {
  static async createFile({ skillFolder }: { skillFolder: string }) {
    const responseAPI = await fetch(`https://skill-it-nine.vercel.app/skill?url=...&prompt=...`)
    const data = await responseAPI.json() as Skilltype
    await writeFile(pathSkill, data.messages, 'utf-8')
  }
}
```

### API (`api/` — Elysia + Cerebras)

Backend desplegado en Vercel con runtime Bun. Expone un único endpoint:

```
GET /skill?url={url}&prompt={task}
```

**`SkillServices`** (`api/src/services/skill-service.ts`) es una clase con un método estático async que:
1. Valida que exista `url` en los query params
2. Construye el prompt con contexto pre-cargado (`ai-skill-engineer-knowledge.md` + `web-research-scraping-knowledge.md`)
3. Llama a Cerebras (`await client.chat.completions.create(...)`)
4. Formatea el markdown con `formatMarkdownResponse()`
5. Retorna `{ success, name, messages }`

```typescript
export class SkillServices {
  static async handlerGetSkill({ params }: SkillServicesContract) {
    const ia = await client.chat.completions.create({
      model: 'gpt-oss-120b',
      messages: [
        { role: 'system', content: `${preContenxt[0]} ${preContenxt[1]} ${SYSTEM_PROMPT}` },
        { role: 'user', content: `URL: ${params.url}\n\nTASK: ${task}` }
      ]
    })
    return status(200, { success: true, name, messages: raw })
  }
}
```

### Web (`web/` — React + Vite + Tailwind v4)

Frontend estático desplegado en Netlify. Muestra los skills generados con:
- Hero section con gradiente animado
- Búsqueda en tiempo real por nombre, descripción o tags
- Filtros por categoría
- Grid responsive de SkillCards

---

## Modelos de Datos

**`Skilltype`** — Respuesta de la API:
```typescript
interface Skilltype {
  success: boolean
  name: string
  messages: string
  error?: string
}
```

**`SkillServicesContract`** — Contrato del servicio:
```typescript
interface SkillServicesContract {
  params: {
    url: string
    prompt?: string
  } | Record<string, string>
}
```

**`Skill`** — Estructura de skill en el frontend:
```typescript
interface Skill {
  id: string
  name: string
  description: string
  category: string
  url: string
  tags: string[]
  date: string
}
```

---

## Comandos

### CLI

```bash
# Instalar dependencias
bun install

# Modo desarrollo (watch)
bun run dev

# Build para publicar
bun run build

# Usar directamente
bun run index.ts url https://bun.sh/docs

# Con prompt personalizado
bun run index.ts url https://bun.sh/docs prompt "Enfócate en los comandos CLI"

# Ver ayuda
bun run index.ts help
```

### API

```bash
cd api
bun install
bun run dev    # Servidor en http://localhost:3000
```

### Web

```bash
cd web
bun install
bun run dev    # Dev server en http://localhost:5173
bun run build  # Build de producción
```

---

## Deploy

| Servicio | Qué despliega | Config |
|----------|--------------|--------|
| **Vercel** | API backend (Bun runtime) | `vercel.json` |
| **Netlify** | Frontend estático (web/dist) | `netlify.toml` |

---

## Stack

| Capa | Tecnología |
|------|-----------|
| CLI | TypeScript, Bun, chalk |
| API | Elysia, Cerebras SDK, Bun |
| Frontend | React 19, Vite 8, Tailwind v4 |
| Lenguaje | TypeScript (ESM) |

---

## Licencia

MIT — [@mapas48](https://github.com/mapas48)
