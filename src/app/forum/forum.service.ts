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
    const path = mainUrl + 'api/rep-com-agent/';
    const headers = this.getHeader();
    return this.http.get(path + id, {headers});
  }

  public getComments(id: any) {
    const path = mainUrl + 'api/rep-com-agent-forum-comments/';
    const headers = this.getHeader();
    return this.http.get(path + id, {headers});
  }

  public postComments(id: any, body: any) {
    const path = mainUrl + 'api/rep-com-agent-comments-create/';
    const headers = this.getHeader();
    return this.http.post(path + id, body, {headers});
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
