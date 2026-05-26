import { status } from "elysia";
import { client } from "../../lib/client";
import { SkillServicesContract } from "../models/skill-model";
import { preContenxt } from "../data/context";

export class SkillServices {
  static async handlerGetSkill({params,request}:SkillServicesContract) {
    
    console.log(params)
    if (!params.url) return status(401,{
      success:false,
      messages:'missing url'
    })


    const ia = await client.chat.completions.create({
      model:'gpt-oss-120b',
      reasoning_format:"hidden",
      messages: [
        {
          role:'user',
          content:`
            ${preContenxt.join('\n')}
            URL:${params.url}
            PROMPT:${params.prompt ? params.prompt : 'Make it!'}
          `
        }
      ]
    })

    if (ia.error) return status('Bad Request',{
      success:false,
      messages:ia.error
    })

    const choices = ia.choices as any

    return status(200,{
      success:true,
      messages:choices[0].message.content
    })
    
  }
}