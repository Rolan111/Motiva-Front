import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {LoginModel} from "./login.model";
import {DataResponse} from "../util/data-response";
import {LoginResponse} from "./login-response";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  logIn(loginForm: LoginModel): Observable<any> {
    const path = mainUrl + 'auth';
    const headers = this.getHeader();
    return this.http.post<any>(path, loginForm, {headers});
  }

  attemptAuthMock(loginModel:LoginModel): Observable<DataResponse> {
    let login = new LoginResponse('111111','DAVID','MONTERO','SUPERVISOR','','');
    // let login = new LoginResponse('222222','JUAN','PELAES','P_CAMPO','','');
    // let login = new LoginResponse('333333','ANDRES','GUZMAN','AGENTE','','');
    // let login = new LoginResponse('444444','FERNANDA','GOMEZ','USER','','');
    let mock = new DataResponse(null, login, null, "OK", null);
    return of(mock);
  }

  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });
  }
}
