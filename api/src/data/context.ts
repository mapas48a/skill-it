import { readFile } from "node:fs/promises";
import { join } from "node:path";

const pathMakeSkill = join(import.meta.dir, 'ai-skill-engineer-knowledge.md')

const pathToReadURL = join(import.meta.dir, 'web-research-scraping-knowledge.md')


const knowledgesToMakeSkill = await readFile(pathMakeSkill,{encoding:'utf-8'})
const knowledgesToReadURL= await readFile(pathToReadURL,{encoding:'utf-8'})

export const preContenxt = [knowledgesToReadURL,knowledgesToMakeSkill]