import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorage} from "../storage/local-storage";
import {LocalStorageKeyEnum} from "../enums/enum";
import {environment} from "../../environments/environment";
import {RepComAgentModel} from "../rep-com-agent/rep-com-agent.model";
import {Observable} from "rxjs";
import {DataResponse} from "../util/data-response";
import {AnswerPsychosocialModel} from "./answer-psychosocial.model";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CareSheetService {

  // shareIdPoll: number = 0;
  shareIdPoll: string = '';
  shareCity: string = 'Esperando...';
  shareSex: number = 0;
  shareName: string = 'Esperando...';
  shareLastName: string = 'Esperando...';
  shareIdentificationNumber: number = 0;
  shareEthnicity: number = 0;
  sharePhone: number = 0;

  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) {
  }

  public create(body: any) {
    const headers = this.getHeader();
    const path = mainUrl + 'api/care-sheet-answer-psychosocial-create';
    return this.http.post(path, body, {headers});
  }

  //Aquí está completo
  public create2(body: Array<AnswerPsychosocialModel>):Observable<DataResponse> {
    const headers = this.getHeader();
    const path = mainUrl + 'api/care-sheet-answer-psychosocial-create2';
    return this.http.post<DataResponse>(path, body, {headers});
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
