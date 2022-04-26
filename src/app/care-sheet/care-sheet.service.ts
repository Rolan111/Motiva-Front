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

  shareIdPoll: number = 0;
  shareCity: string = 'Esperando...';
  shareSex: number = 0;
  shareName: string = 'Esperando...';
  shareLastName: string = 'Esperando...';
  shareIdentificationNumber: number = 0;
  shareEthnicity: number = 0;

  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) {
  }

  public getInstrumentAnswers(idPoll: any) {
    const path = mainUrl + 'api/care-sheet-instrument-answers-ByIdPoll';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public getOpcionesRespuestas(id: any) {
    const path = mainUrl + 'api/care-sheet-options-answers/';
    const headers = this.getHeader();
    return this.http.get(path + id, {headers});
  }

  create(repComAgent: RepComAgentModel): Observable<DataResponse> {
    const path = mainUrl + 'api/rep-com-agent-create';
    const headers = this.getHeader();
    return this.http.post<DataResponse>(path, repComAgent, {headers});
  }

  public create2(body: any) {
    const headers = this.getHeader();
    const path = mainUrl + 'api/care-sheet-answer-psychosocial-create';
    return this.http.post(path, body, {headers});
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
