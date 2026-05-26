import { status } from "elysia";
import { client } from "../../lib/client";
import type { SkillServicesContract } from "../models/skill-model";
import { formatMarkdownResponse } from "../utils/markdown-formatter";
import { preContenxt, SYSTEM_PROMPT } from "../data/context";

export class SkillServices {
  static async handlerGetSkill({params}:SkillServicesContract) {
    
    if (!params.url) return status(401,{
      success:false,
      messages:'missing url'
    })

    const task = params.prompt?.trim() || 'Create a comprehensive skill from this documentation'

    console.log(task)
    const ia = await client.chat.completions.create({
      model:'gpt-oss-120b',
      messages: [
        {
          role:'system',
          content:`
            ${preContenxt[0]}
            ${preContenxt[1]}
            ${SYSTEM_PROMPT}
          `
        },
        {
          role:'user',
          content: `URL: ${params.url}\n\nTASK: ${task}`
        }
      ]
    })

    if (ia.error) return status('Bad Request',{
      success:false,
      messages:ia.error
    })

    const choices = ia.choices as any
    const raw = choices[0].message.content as string
    const formatted = formatMarkdownResponse(raw)

    const name = extractName(params.url)

    return status(200,{
      success:true,
      name,
      messages:raw
    })
    
  }
}

function extractName(url: string): string {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.split('.')[0]!
    const path = parsed.pathname.split('/').filter(Boolean).pop()
    return path
      ? `${host}-${path}`.replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase()
      : host.replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase()
  } catch {
    return 'skill'
  }
}
