import Cerebras from '@cerebras/cerebras_cloud_sdk';
import { config } from "dotenv";

const env = await config({
  // optional: choose a specific path (defaults to ".env")
  path: ".env.local",
  // optional: also export to the process environment (so Deno.env can read it)
});



const CEREBRAS_API_KEY = process.env.CEREBRAS_API_KEY

export const client = new Cerebras({
  apiKey: CEREBRAS_API_KEY,
});
