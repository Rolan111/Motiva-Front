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

  trayendoData: any = [];

  //Tabla ALERT
  public getAlertSize() {
    const path = mainUrl + 'api/alerts-size';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public getAlertSize2() {
    this.getAllAlerts().subscribe(data => {
      console.log(data)
      this.trayendoData.push(data);
    })

    return this.trayendoData;
  }

  //*****************************
  public getAllAlerts() {
    const path = mainUrl + 'api/alerts-pruebas';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public deleteAlertByIdPoll(idPoll: any) {
    const path = mainUrl + 'api/alert-delete/';
    const headers = this.getHeader();
    return this.http.delete(path + idPoll, {headers});
  }

  //Tabla POLL
  public getPollById(id: any) {
    const path = mainUrl + 'api/pollById/';
    const headers = this.getHeader();
    return this.http.get(path + id, {headers});
  }

  //Tabla USER
  public getUserById(id: any) {
    const path = mainUrl + 'api/userById/';
    const headers = this.getHeader();
    return this.http.get(path + id, {headers});
  }

  //Tabla ANSWER
  public getAnswerByPollAndIdQuestion(id_poll: any, id_question: any) {
    const path = mainUrl + 'api/answerByIdPollAndIdQuestion/';
    const headers = this.getHeader();
    return this.http.get(path + id_poll + '/' + id_question, {headers});
  }

  //Tabla ANSWER PSYCHOSOCIAL
  public getAllAnswersPsychosocial() {
    const path = mainUrl + 'api/answer-psychosocial-all';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public getAnswerPsychosocialByIdPoll(id_poll: any) {
    const path = mainUrl + 'api/answer-psychosocial-ByIdPoll/';
    const headers = this.getHeader();
    return this.http.get(path + id_poll, {headers});
  }

  public getAnswerPsychosocialByIdPollAndIdQuestion(id_poll: any, id_question: any) {
    const path = mainUrl + 'api/answer-psychosocial-ByIdPollAndIdQuestion/';
    const headers = this.getHeader();
    return this.http.get(path + id_poll + '/' + id_question, {headers});
  }

  //Tabla QUESTION
  public getQuestionByIdQuestion(id_question: any) {
    const path = mainUrl + 'api/questionByIdQuestion/';
    const headers = this.getHeader();
    return this.http.get(path + id_question, {headers});
  }

  //Tabla INACTIVE_ALERT
  public getAllInactiveAlerts() {
    const path = mainUrl + 'api/inactive-alert';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public postInactiveAlert(body: any) {
    const path = mainUrl + 'api/inactive-alert-create/';
    const headers = this.getHeader();
    return this.http.post(path, body, {headers});
  }

  //Tabla RASM
  public postRASM(body: any) {
    const path = mainUrl + 'api/rasm-create/';
    const headers = this.getHeader();
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
