import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorage} from "../storage/local-storage";
import {environment} from "../../environments/environment";
import {LocalStorageKeyEnum} from "../enums/enum";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) {
  }

  public getAlertSize() {
    const path = mainUrl + 'api/alerts-size';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public getAllAlerts() {
    const path = mainUrl + 'api/alerts-pruebas';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public getPollById(id: any) {
    const path = mainUrl + 'api/pollById/';
    const headers = this.getHeader();
    return this.http.get(path + id, {headers});
  }

  public getUserById(id: any) {
    const path = mainUrl + 'api/userById/';
    const headers = this.getHeader();
    return this.http.get(path + id, {headers});
  }

  public getNameAnswerByPollAndIdQuestion(id_poll: any, id_question: any) {
    const path = mainUrl + 'api/answerByIdPollAndIdQuestion/';
    const headers = this.getHeader();
    return this.http.get(path + id_poll + '/' + id_question, {headers});
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
