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

  create(repComAgent: RepComAgentModel): Observable<DataResponse> {
    const path = mainUrl + 'api/rep-com-agent-create';
    const headers = this.getHeader();
    return this.http.post<DataResponse>(path, repComAgent, {headers});
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
