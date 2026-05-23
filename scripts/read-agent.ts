import chalk from 'chalk';
import { readdir,mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { objStruct } from '../utils/arg-to-obj';

const [_,path] = process.argv;

const IASoported = [
  ".agents",
  ".claude",

]

export async function readAgents({arg}:{arg:objStruct}){
  try {
    const files = await readdir(process.cwd())
    let haveAgent = false

    for (const file of files){
      console.log(IASoported.some(v => v === file),file)
      if (
        IASoported.some(v => v === file)
      ) {

        console.log("hola?")
      } else {
       haveAgent = true
       console.log(chalk.yellow('agents not found we create automaticly for you'))
      } 
      if (haveAgent && !files.some(v => v === ".agents")) {
         const agentsFolder = join(process.cwd(),'.agents')
          mkdir(agentsFolder).catch(e => {
            console.log(chalk.red('Something went wrong: ',e))
          });
          return
      }
      console.log(chalk.red("We can't find a folder with skills"))
      process.exit(1)
    } 
  } catch (error) {
    
  }
  
}

