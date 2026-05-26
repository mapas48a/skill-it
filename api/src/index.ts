import { Elysia } from "elysia";
import { SkillServices } from "./services/skill-service";
const app = new Elysia().get("/", () => "Server is running").listen(3000);

app.get('/skill',({request,query:params})=>SkillServices.handlerGetSkill({request,params}))

console.log(
  `Server is running ${app.server?.hostname}:${app.server?.port}`
);
