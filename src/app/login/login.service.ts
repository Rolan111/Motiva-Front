import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataResponse} from "../util/data-response";

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  findAllUsers(): Observable<DataResponse> {
    const path = mainUrl + 'api/users';
    const headers = this.getHeader();
    return this.http.get<DataResponse>(path, {headers});
  }

  getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
    });
  }
}
