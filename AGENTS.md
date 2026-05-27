# skill-it

## Architecture

```
skill-it/          # Root: CLI entrypoint (published as npm package)
├── index.ts       # CLI entry, calls makeSkill()
├── dist/          # Compiled CLI output
├── services/      # writeskill.ts — calls backend API
├── scripts/       # CLI logic (make-skill.ts, read-agent.ts)
├── types/         # Shared TypeScript types
├── utils/         # arg-to-obj.ts
├── web/           # React frontend (Vite + Tailwind v4)
└── api/           # Elysia/Bun backend (Vercel)
```

## Commands

```bash
# Root CLI (requires bun)
bun run dev        # Watch mode for CLI
bun run build      # Build CLI to dist/

# Web frontend
cd web && bun install && bun run dev    # Dev server
cd web && bun run build                  # Production build

# API backend
cd api && bun install && bun run dev     # Dev server
```

## Important

- **Backend URL is hardcoded** in `services/writeskill.ts` to `https://skill-it-nine.vercel.app`. Do not add `.env` usage — it was intentionally removed so the package works without local env config.
- **CLI uses bun** as runtime and bundler (not npm/node scripts).
- **Web uses Tailwind v4** with `@tailwindcss/vite` plugin, not the classic setup.
- **API uses Elysia** framework on Bun, deployed on Vercel with bun runtime (`vercel.json`).

## Deploy

- `netlify.toml` — builds `web/dist` using bun
- `vercel.json` — deploys `api/` with bun runtime

## TypeScript

Root tsconfig uses `"module": "ESNext"` and the packages are ESM-only.
