import { Elysia } from "elysia";
import { SkillServices } from "./src/services/skill-service";
import cors from "@elysia/cors";

const app = new Elysia()
  .use(cors({ origin: '*' }))
  .get("/", () => "Server is running")
  .get('/skill', ({ query: params }) => SkillServices.handlerGetSkill({ params }));

export default app;
