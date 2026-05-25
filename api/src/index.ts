import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Server is running").listen(3000);

app.get('/skill',({request})=>{

})

console.log(
  `Server is running ${app.server?.hostname}:${app.server?.port}`
);
