export class LoginResponse {
  userName : string;
  name:string;
  last_name:string;
  job_profile:string;
  token:string;
  type:string;

  constructor(userName: string, name: string, last_name: string, job_profile: string, token: string, type: string) {
    this.userName = userName;
    this.name = name;
    this.last_name = last_name;
    this.job_profile = job_profile;
    this.token = token;
    this.type = type;
  }
}


