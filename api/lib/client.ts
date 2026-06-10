import Cerebras from '@cerebras/cerebras_cloud_sdk';

const CEREBRAS_API_KEY = Deno.env.get("CEREBRAS_API_KEY");

if (!CEREBRAS_API_KEY) {
  throw new Error("CEREBRAS_API_KEY is not set");
}

export const client = new Cerebras({
  apiKey: CEREBRAS_API_KEY,
});
