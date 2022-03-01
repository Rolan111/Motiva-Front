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
    return this.http.get(mainUrl + 'api/rep-com-agents', {
      //return this.http.get('http://localhost:3000/' + 'forum/', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  public get(id: any) {
    return this.http.get(mainUrl + 'api/rep-com-agent/' + id, {
      //return this.http.get('http://localhost:3000/' + 'forum/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  public getComments(id: any) {
    return this.http.get(mainUrl + 'api/rep-com-agent-forum-comments/' + id, {
      //return this.http.get('http://localhost:3000/' + 'forum/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  public postComments(id: any, body: any) {
    return this.http.post(mainUrl + 'api/rep-com-agent-comments-create/' + id, body, {
      //return this.http.get('http://localhost:3000/' + 'forum/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }


}
