import {Injectable} from '@angular/core';
import {LocalStorage} from "../storage/local-storage";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageKeyEnum} from "../enums/enum";
import {environment} from "../../environments/environment";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) {
  }

  public getAll() {
    const path = mainUrl + 'api/rep-com-agents';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public get(id: any) {
    return this.http.get(mainUrl + 'api/rep-com-agent/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  public getComments(id: any) {
    return this.http.get(mainUrl + 'api/rep-com-agent-forum-comments/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  public postComments(id: any, body: any) {
    return this.http.post(mainUrl + 'api/rep-com-agent-comments-create/' + id, body, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
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
