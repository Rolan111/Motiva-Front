import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorage} from "../storage/local-storage";
import {LocalStorageKeyEnum} from "../enums/enum";
import {environment} from "../../environments/environment";
import {RepComAgentModel} from "../rep-com-agent/rep-com-agent.model";
import {Observable} from "rxjs";
import {DataResponse} from "../util/data-response";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CareSheetService {

  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) {
  }

  public getPruebas() {
    return this.http.get(mainUrl + 'api/care-sheet-pruebas', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  public getOpcionesRespuestas(id: any) {
    return this.http.get(mainUrl + 'api/care-sheet-opciones-respuestas/' + id, {
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

  public create2(body: any) {
    const headers = this.getHeader();
    return this.http.post('http://localhost:5000/api/care-sheet-answer-psychosocial-create', body, {headers});
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
