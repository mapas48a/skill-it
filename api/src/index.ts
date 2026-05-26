import { Elysia } from "elysia";
import { SkillServices } from "./services/skill-service";
import cors from "@elysia/cors";
const app = new Elysia().get("/", () => "Server is running").listen(3000);

app.use(cors({
  origin:'*'
}))

app.get('/skill',({query:params})=>SkillServices.handlerGetSkill({params}))

console.log(
  `Server is running ${app.server?.hostname}:${app.server?.port}`
);
