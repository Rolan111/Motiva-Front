import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorage} from "../storage/local-storage";
import {LocalStorageKeyEnum} from "../enums/enum";

@Injectable({
  providedIn: 'root'
})
export class RepComAgentService {
  oLocalStorage = new LocalStorage(); //Otenemos el token para pasarlo a los headers
  constructor(private http: HttpClient) {
  }

  public get(url: string) {
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  public post(url: string, body: any) {
    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  public update(url: string, body: any) {
    return this.http.put(url, body);
  }

  public delete(url: string) {
    return this.http.delete(url);
  }
}
