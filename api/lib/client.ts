import Cerebras from '@cerebras/cerebras_cloud_sdk';

export const client = new Cerebras({
  apiKey: Deno.env.get('CEREBRAS_API_KEY'),
});
