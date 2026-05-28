import chalk from 'chalk';
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { argToObj, type objStruct } from '../utils/arg-to-obj';
import type { Skilltype } from '../types/skill-type';

export class WriteSKill {
  static async createFile({skillFolder}:{skillFolder:string}) {
    try {
      
      const arg = argToObj(process.argv) as objStruct;
      
      const responseAPI = await fetch(
        `https://skill-it-xsnzc3g8aec4.mapas48a.deno.net/skill?url=${encodeURIComponent(arg.url ?? '')}&prompt=${encodeURIComponent(arg.prompt ?? '')}`
      );

      if (!responseAPI.ok) {
        throw new Error(`API returned ${responseAPI.status}: ${await responseAPI.text()}`)
      }

      const data = await responseAPI.json() as Skilltype

      console.log(data)
      if (!data.success) {
        throw new Error(`Failed to obtain skill: ${data.error || 'unknown error'}`)
      }

      const pathSkill = join(skillFolder, `${data.name}.md`)

      await writeFile(pathSkill, data.messages, 'utf-8')

      console.log(chalk.green(`Skill created: ${pathSkill}`))

    } catch (error) {
      console.log(chalk.red(error))
      process.exit(1)
    }
  }
}
