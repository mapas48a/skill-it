import chalk from 'chalk';
import { createWriteStream } from 'node:fs';
import {writeFile} from 'node:fs/promises'
import { join } from 'node:path'
import { argToObj, type objStruct } from '../utils/arg-to-obj';
import type { Skilltype } from '../types/skill-type';

export class WriteSKill {
  static async createFile({skillFolder}:{skillFolder:string}) {
    try {
      
      const arg = argToObj(process.argv) as objStruct;
      
      //fetch api
      const responseAPI = await fetch(
        `
        ${process.env.API_URL!}/skill?url=${arg.url}&prompt=${arg.prompt}
        `);

        const data = await responseAPI.json() as Skilltype
        
        if (!responseAPI.ok) {
          throw new Error(`Failed to obtain a data for api:${data}`,)
        }
        
        // Create a path
        const pathSkill = join(skillFolder,`${data.name!}.md`)
        
        // Create a file
        const createSkill = await writeFile(pathSkill,"")
        .catch(e => {throw Error(e)});

        const writer =  createWriteStream(pathSkill)
        
        console.log(createSkill,writer)
        
      for await (const chunk of responseAPI.body!) {
        writer.write(chunk)
      }
    } catch (error) {
      console.log(chalk.red(error))
      process.exit(1)
    }
  }


  
}