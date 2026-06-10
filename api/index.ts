import { Elysia } from "elysia";
import { SkillServices } from "./src/services/skill-service.ts";
import { AutoWhatServices } from "./src/services/auto-what-service.ts";
import cors from "@elysia/cors";

const app = new Elysia()
  .get("/", () => "Server is running")
  .use(cors({ origin: '*' }))
  .get('/skill', ({ query: params }) => SkillServices.handlerGetSkill({ params }))
  .post('/auto-what', ({ body }) => AutoWhatServices.handlerGenerate({ params: body as Record<string, string> }));

Deno.serve(app.fetch);
