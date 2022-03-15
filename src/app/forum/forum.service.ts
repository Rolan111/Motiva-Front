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
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
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


}
