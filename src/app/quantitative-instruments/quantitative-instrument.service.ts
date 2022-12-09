import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DataResponse} from "../util/data-response";
import {LocalStorage} from "../storage/local-storage";
import {LocalStorageKeyEnum} from "../enums/enum";
import {AnswerModel} from "./answer.model";
import {PollModel} from "./poll.model";
import {AlertModel} from "./alert.model";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class QuantitativeInstrumentService {
  oLocalStorage = new LocalStorage();

  shareDataSession:any=[];

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<any> {
    const path = mainUrl + 'api/answers';
    const headers = this.getHeader();
    return this.http.get<any>(path, {headers});
  }

  public getAnswerByIdPollAndIdQuestion(id_poll: any, id_question: any) {
    const path = mainUrl + 'api/answerByIdPollAndIdQuestion/';
    const headers = this.getHeader();
    return this.http.get(path + id_poll + '/' + id_question, {headers});
  }
  public getAnswerByIdQuestionAndOpenAnswer(id_question: any, open_asnwer: any) {
    const path = mainUrl + 'api/answerByIdQuestionAndOpenAnswer/';
    const headers = this.getHeader();
    return this.http.get(path + id_question + '/' + open_asnwer, {headers});
  }

  getAnswersByIdQuestion(idQuestion: number): Observable<any> {
    const path = mainUrl + 'api/answerByIdQuestion/';
    const headers = this.getHeader();
    return this.http.get<any>(path + idQuestion, {headers});
  }

  getAnswersMultipleByIdPoll(idPoll: string): Observable<any> {
    const path = mainUrl + 'api/answerMultipleByIdPoll/';
    const headers = this.getHeader();
    return this.http.get<any>(path + idPoll, {headers});
  }

  createAnswer(quantitativeInstrumentForm: Array<AnswerModel>): Observable<DataResponse> {
    const path = mainUrl + 'api/answer';
    const headers = this.getHeader();
    return this.http.post<DataResponse>(path, quantitativeInstrumentForm, {headers});
  }

  findAllQuestions(type: string): Observable<any> {
    const path = mainUrl + `api/questions?type=${type}`;
    const headers = this.getHeader();
    return this.http.get<any>(path, {headers});
  }

  getLastSequence(): Observable<any> {
    const path = mainUrl + 'api/last-sequences';
    const headers = this.getHeader();
    return this.http.get<any>(path, {headers});
  }

  getPollByIdPoll(idPoll: string): Observable<any> {
    const path = mainUrl + 'api/pollByIdPoll/';
    const headers = this.getHeader();
    return this.http.get<any>(path + idPoll, {headers});
  }

  createPoll(poll: PollModel): Observable<DataResponse> {
    const path = mainUrl + 'api/poll';
    const headers = this.getHeader();
    return this.http.post<DataResponse>(path, poll, {headers});
  }

  createAlert(alert: AlertModel): Observable<DataResponse> {
    const path = mainUrl + 'api/alert-create';
    const headers = this.getHeader();
    return this.http.post<DataResponse>(path, alert, {headers});
  }

  getAnswersByIdPoll(idPoll: number): Observable<any> {
    const path = mainUrl + `api/answers-by-poll?idPoll=${idPoll}`;
    const headers = this.getHeader();
    return this.http.get<any>(path, {headers});
  }

  getVerificandoSesion(): Observable<any> {
    const path = mainUrl + 'api/verificando-sesion';
    const headers = this.getHeader();
    return this.http.get<any>(path, {headers});
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
