export interface SkillServicesContract {
  params:{
    url:string;
    prompt?:string;
  } | Record<string,string>;
  request:Request
}