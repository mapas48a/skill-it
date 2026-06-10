import { z } from "zod";
import { client as module } from "../../lib/client.ts";

const SYSTEM_PROMPT = `Eres un asistente especializado en redactar mensajes cortos de WhatsApp.
Reglas:
- Mensajes claros, concisos y naturales.
- Maximo 300 caracteres salvo que el usuario pida mas.
- No uses emojis salvo que el tono lo justifique.
- Devuelve SOLO el texto del mensaje, sin comillas, sin prefijos como "Aqui esta:".
- Si el usuario da un prompt vacio o sin sentido, devuelve un mensaje generico cortés.`;

export const AiGenerateRequestSchema = z.object({
	prompt: z.string().min(1),
	tone: z.enum(["formal", "casual", "friendly", "sales"]).default("friendly"),
	language: z.string().default("es"),
});
export type AiGenerateRequest = z.infer<typeof AiGenerateRequestSchema>;

export const AiGenerateResponseSchema = z.object({
	text: z.string(),
});
export type AiGenerateResponse = z.infer<typeof AiGenerateResponseSchema>;

export class AutoWhatServices {
	static async handlerGenerate({ params }: { params: Partial<AiGenerateRequest> }) {
		const parsed = AiGenerateRequestSchema.safeParse(params);
		if (!parsed.success) {
			return {
				success: false,
				message: parsed.error.issues[0]?.message ?? "invalid request",
			};
		}

		const model = "gpt-oss-120by";

		const client = module;
		const completion = await client.chat.completions.create({
			model,
			messages: [
				{ role: "system", content: SYSTEM_PROMPT },
				{
					role: "user",
					content: `Tono: ${parsed.data.tone}. Idioma: ${parsed.data.language}. Tema o idea: ${parsed.data.prompt}`,
				},
			],
			max_completion_tokens: 512,
			temperature: 0.7,
		});

		const choice = (completion as {
			choices?: Array<{ message?: { content?: string | null } }>;
		}).choices?.[0];
		const text = choice?.message?.content?.trim() ?? "";

		return AiGenerateResponseSchema.parse({ text });
	}
}
