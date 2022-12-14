import {Injectable} from '@angular/core';
import {LocalStorage} from "../storage/local-storage";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageKeyEnum} from "../enums/enum";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DataResponse} from "../util/data-response";
import {TrackingSheetModel} from "./tracking-sheet.model";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TrackingSheetService {
  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<any> {
    const path = mainUrl + 'api/tracking-sheets';
    const headers = this.getHeader();
    return this.http.get<any>(path, {headers});
  }

  create(trackingSheet: TrackingSheetModel): Observable<DataResponse> {
    const path = mainUrl + 'api/tracking-sheet-create';
    const headers = this.getHeader();
    return this.http.post<DataResponse>(path, trackingSheet, {headers});
  }

  deleteRasmByIdPoll(idPoll: string): Observable<any> {
    const path = mainUrl + 'api/rasm-delete/';
    const headers = this.getHeader();
    return this.http.delete<any>(path + idPoll, {headers});
  }

  getRasmByIdPoll(idPoll: string): Observable<any> {
    const path = mainUrl + 'api/rasmByIdPoll/';
    const headers = this.getHeader();
    return this.http.get<any>(path + idPoll, {headers});
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
