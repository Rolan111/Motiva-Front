import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {QuantitativeInstrumentModel} from "./quantitative-instrument.model";
import {Observable} from "rxjs";
import {DataResponse} from "../util/data-response";
import {LocalStorage} from "../storage/local-storage";
import {LocalStorageKeyEnum} from "../enums/enum";
import {AnswerModel} from "./answer.model";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class QuantitativeInstrumentService {
  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<any> {
    const path = mainUrl + 'api/answers';
    const headers = this.getHeader();
    return this.http.get<any>(path, {headers});
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

  getAnswersByIdPoll(idPoll: number): Observable<any> {
    const path = mainUrl + `api/answers-by-poll?idPoll=${idPoll}`;
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
