import chalk from "chalk";
import { readAgents } from "./read-agent";
import { WriteSKill } from "../services/writeskill";

export async function makeSkill({} = {}) {
  const skillFolder = await readAgents()

  if (!skillFolder) {
    console.log(chalk.red("something go wrong with read agent"))
    process.exit(1)
  }
  try {
    WriteSKill.createFile({skillFolder})
    
  } catch (error) {
    console.log(chalk.red("something go wrong",error))
    process.exit(1)
  }

}