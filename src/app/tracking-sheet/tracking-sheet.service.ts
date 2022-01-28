import {Injectable} from '@angular/core';
import {LocalStorage} from "../storage/local-storage";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageKeyEnum} from "../enums/enum";

@Injectable({
  providedIn: 'root'
})
export class TrackingSheetService {

  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) {
  }

  public get() {
    return this.http.get('http://localhost:5000/api/tracking-sheets', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.oLocalStorage.getItem(LocalStorageKeyEnum.token)
      })
    });
  }

  public post(body: any) {
    return this.http.post('http://localhost:5000/api/tracking-sheet-create', body, {
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
