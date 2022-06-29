import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LocalStorageKeyEnum} from "../enums/enum";
import {LocalStorage} from "../storage/local-storage";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) { }

  public getPolls() {
    const path = mainUrl + 'api/polls';
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
