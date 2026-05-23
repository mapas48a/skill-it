import chalk from 'chalk';
import { readdir,mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const [_,path] = process.argv;

const IASoported = [
  ".agents",
  ".claude",

]

export async function readAgents(){
  try {
    console.log(_)
    dirname
    const files = await readdir(process.cwd())
    for (const file of files){
      if (
        IASoported.some(v => v === file)
      ) {

      } else {
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

