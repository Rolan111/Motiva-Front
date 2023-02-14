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
      this.trayendoData.push(data);
    })
    return this.trayendoData;
  }

  public getAllAlerts() {
    const path = mainUrl + 'api/alerts';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public deleteAlertByIdPoll(idPoll: any) {
    const path = mainUrl + 'api/alert-delete/';
    const headers = this.getHeader();
    return this.http.delete(path + idPoll, {headers});
  }
  public AlertByIdPoll(idPoll: any) {
    const path = mainUrl + 'api/alertByIdPoll/';
    const headers = this.getHeader();
    return this.http.get(path + idPoll, {headers});
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
  public getAnswerByIdPoll(id_poll: any) {
    const path = mainUrl + 'api/answerByIdPoll/';
    const headers = this.getHeader();
    return this.http.get(path + id_poll, {headers});
  }

  public getAnswerByIdPollAndIdQuestion(id_poll: any, id_question: any) {
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

  public getAnswerPsychosocialByIdPoll(id_poll: any) { //Trae las respuestas completas con el id_poll
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
  public getQuestionsAdult() {
    const path = mainUrl + 'api/questionsAdult';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public getQuestionsChildren() {
    const path = mainUrl + 'api/questionsChildren';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public getQuestionByIdQuestion(id_question: any) {
    const path = mainUrl + 'api/questionByIdQuestion/';
    const headers = this.getHeader();
    return this.http.get(path + id_question, {headers});
  }

  //Tabla OPTION_ANSWER
  public getOtionAnswerByIdOptionAnswer(id_option_answer: any) {
    const path = mainUrl + 'api/optionAnswerByIdOptionAnswer/';
    const headers = this.getHeader();
    return this.http.get(path + id_option_answer, {headers});
  }

  /**Tabla INACTIVE_ALERT**/
  public getInactiveAlertSize() {
    const path = mainUrl + 'api/inactive-alerts-size';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

    public getAllInactiveAlerts() {
    const path = mainUrl + 'api/inactive-alerts';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public postInactiveAlert(body: any) {
    const path = mainUrl + 'api/inactive-alert-create/';
    const headers = this.getHeader();
    return this.http.post(path, body, {headers});
  }

  //Tabla RASM
  public createRasm(body: any) {
    const path = mainUrl + 'api/rasm-create/';
    const headers = this.getHeader();
    return this.http.post(path, body, {headers});
  }

  //Tabla type_rasmi
  public getAllTypeRasmi() {
    const path = mainUrl + 'api/type-rasmi';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
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
