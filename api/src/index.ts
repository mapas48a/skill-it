import { Elysia } from "elysia";
import { SkillServices } from "./services/skill-service";
import cors from "@elysia/cors";

const app = new Elysia()
  .get("/", () => new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>skill-it</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
          background: #0c0c0e;
          color: #f4f4f5;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }
        h1 {
          font-size: 56px;
          font-weight: 800;
          letter-spacing: -1.5px;
          background: linear-gradient(135deg, #e4e4e7, #a1a1aa, #71717a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        a {
          color: #e4e4e7;
          text-decoration: none;
          font-size: 18px;
          font-weight: 600;
          padding: 12px 28px;
          border: 1px solid #222227;
          border-radius: 14px;
          background: #141417;
          transition: all 0.2s;
        }
        a:hover {
          border-color: #33333b;
          background: #1c1c21;
        }
      </style>
    </head>
    <body>
      <h1>skill-it</h1>
      <a href="https://skill-its.netlify.app/">Launch App</a>
    </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
  )
  .listen(3000);

app.use(cors({
  origin:'*'
}))

app.get('/skill',({query:params})=>SkillServices.handlerGetSkill({params}))

console.log(
  `Server is running ${app.server?.hostname}:${app.server?.port}`
);
