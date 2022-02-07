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
    const path = mainUrl + 'api/quantitative-instruments';
    const headers = this.getHeader();
    return this.http.get<any>(path, {headers});
  }

  create(quantitativeInstrumentForm: Array<AnswerModel>): Observable<DataResponse> {
    const path = mainUrl + 'api/quantitative-instrument-create';
    const headers = this.getHeader();
    return this.http.post<DataResponse>(path, quantitativeInstrumentForm, {headers});
  }

  update(quantitativeInstrumentForm: QuantitativeInstrumentModel): Observable<DataResponse> {
    const path = mainUrl + 'api/quantitative-instrument-update';
    const headers = this.getHeader();
    return this.http.post<DataResponse>(path, quantitativeInstrumentForm, {headers});
  }

  delete(quantitativeInstrumentForm: QuantitativeInstrumentModel): Observable<DataResponse> {
    const path = mainUrl + 'api/quantitative-instrument-delete'
    const headers = this.getHeader();
    return this.http.post<DataResponse>(path, quantitativeInstrumentForm, {headers});
  }

  findAllQuestion(): Observable<any> {
    const path = mainUrl + 'api/quantitative-instrument-questions';
    const headers = this.getHeader();
    return this.http.get<any>(path, {headers});
  }

  getLastSequence(): Observable<any> {
    const path = mainUrl + 'api/quantitative-last-sequences';
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
