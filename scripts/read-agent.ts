import chalk from 'chalk';
import { readdir,mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { argToObj, type objStruct } from '../utils/arg-to-obj';
import { argv } from 'node:process';

const [_,path] = process.argv;

const IASoported = [
  ".agents",
  ".claude",

]

export async function readAgents(){
  try {
    const files = await readdir(process.cwd())
    let haveAgent = false
    let nameFolder = ''

    for (const file of files){
      if (
        IASoported.some(v => v === file)
      ) {
        nameFolder = file
        break
      } else {
       haveAgent = true;
      } 
    }
    if (haveAgent && !files.some(v => v === ".agents")) {
      console.log(chalk.yellow('agents not found we create automaticly for you'))
       const agentsFolder = join(process.cwd(),'.agents')
       const agentsSkillFolder = join('.agents','skills')
        mkdir(agentsFolder).catch(
          e => console.log(chalk.red('Something went wrong: ',e))
        );
        mkdir(agentsSkillFolder).catch(
          e => console.log(chalk.red('Something went wrong: ',e))
        )
        nameFolder = '.agents'
        return
    }
    return join(process.cwd(),nameFolder,'skills')
  } catch (error) {
    console.log(chalk.red("We can't find a folder with skills"))
    process.exit(1)
  }
  
}

