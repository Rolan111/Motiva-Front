import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorage} from "../storage/local-storage";
import {LocalStorageKeyEnum} from "../enums/enum";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DataResponse} from "../util/data-response";
import {RepComAgentModel} from "./rep-com-agent.model";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RepComAgentService {

  oLocalStorage = new LocalStorage(); //Otenemos el token para pasarlo a los headers

  constructor(private http: HttpClient) {
  }


  public get() {
    return this.http.get(mainUrl + 'api/rep-com-agents', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  public getById(id: string) {
    return this.http.get(`http://localhost:5000/api/rep-com-agents/${id}`, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  /*
  public post(body: any) {
    return this.http.post(mainUrl + 'api/rep-com-agent-create', body, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }*/

  create(repComAgent: RepComAgentModel): Observable<DataResponse> {
    const path = mainUrl + 'api/rep-com-agent-create';
    const headers = this.getHeader();
    return this.http.post<DataResponse>(path, repComAgent, {headers});
  }

  public update(body: any) {
    return this.http.put('http://localhost:3000/rep-com-agent/1', body);
  }

  public delete() {
    return this.http.delete('http://localhost:3000/rep-com-agent/5');
  }

  getHeader() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token),
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });
  }
}
