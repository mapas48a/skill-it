export interface objStruct {
  url?:string;
  prompt?:string;
  help?:any
}

export const argToObj = (argv:string[]):string|objStruct =>{
  if (argv.length === 0 ) return "not arguments pass";
  let objEntries = []
  if (argv.length < 2) return "arguments missed fields"
  for (let i = 0; i < argv.length; i++){
    objEntries.push([argv[i],argv[i + 1]])
  }
  const obj = Object.fromEntries(
    new Map(
      objEntries as any
    )
  )

  return obj

}