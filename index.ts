import { readAgents } from "./scripts/read-agent";
import { argToObj, type objStruct } from "./utils/arg-to-obj"
import chalk from 'chalk';

const argv = process.argv.slice(2)


if (argv.some((v) => v === 'help')) {
  console.log(chalk.white(
    `
    commands to use:
    You don't need tu use -- or -.
    url paste the url of web
    prompt for better skill
    `.padStart(20)));
  process.exit(0)
}
argToObj(process.argv)

