# skill-it API

Backend API for skill-it. Converts web documentation URLs into structured AI skill markdown files.

## Architecture (MVC)

```
api/src/
├── index.ts              # Entry point (Elysia router — Controller)
├── models/
│   └── skill-model.ts   # Data contracts & interfaces
├── services/
│   └── skill-service.ts # Business logic (Model)
├── data/
│   ├── context.ts       # System prompts & pre-context
│   ├── ai-skill-engineer-knowledge.md
│   └── web-research-scraping-knowledge.md
└── utils/
    └── markdown-formatter.ts
```

- **Model** (`services/`): Business logic, AI client calls, response formatting
- **View** (not applicable): This is an API-only service
- **Controller** (`index.ts`): Elysia route handlers, request validation

## Tech Stack

- **Runtime**: Bun
- **Framework**: Elysia
- **AI**: Cerebras (`@cerebras/cerebras_cloud_sdk`) with `gpt-oss-120b` model

## Endpoints

```
GET /skill?url=<url>&prompt=<optional_prompt>
```

## Development

```bash
cd api && bun install && bun run dev
```

## AI API Keys

This project runs on Cerebras API. Any contribution in the form of an API key credit or sponsorship would be greatly appreciated to keep this project alive and the service running.

You can get Cerebras API credits at: https://cerebras.ai

## Scaling AI Calls

Currently using a single AI provider (Cerebras). For production load balancing across multiple AI providers:

- **OpenRouter**: Unified API for 100+ models, fallback routing, cost management
- **Cloudflare Workers AI**: Edge-deployed inference with built-in rate limiting
- **Gradient AI**: Llama endpoints with auto-scaling

Recommended approach: Use OpenRouter as a proxy layer — it handles provider failover, rate limits, and logging transparently. Swap the Cerebras client in `lib/client.ts` for an OpenRouter-compatible client with multi-provider fallback.

## Deploy

Deployed on Deno Deploy.
