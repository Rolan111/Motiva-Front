import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageKeyEnum} from "../enums/enum";
import {environment} from "../../environments/environment";
import {LocalStorage} from "../storage/local-storage";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CareRasmService {
  id_poll: string = 'a';
  nameBeneficiary: string = 'b';
  lastNameBeneficiary: string = 'c';
  identification: number = 0;
  typeRasm: string = 'd';
  type_identification: string = 'f';

  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) {
  }

  public getAllRasm() {
    const path = mainUrl + 'api/getAllRasm';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public getRASMByIdPoll(idPoll:string) {
    const path = mainUrl + 'api/rasmByIdPoll/';
    const headers = this.getHeader();
    return this.http.get(path + idPoll, {headers});
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
