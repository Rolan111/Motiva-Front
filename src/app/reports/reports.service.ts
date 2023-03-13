import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LocalStorageKeyEnum} from "../enums/enum";
import {LocalStorage} from "../storage/local-storage";
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.speadsheetml.sheet; charset=UTF-8';

const EXCEL_EXT = '.xlsx';

const mainUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  oLocalStorage = new LocalStorage();

  constructor(private http: HttpClient) { }

  exportToExcel(json:any[], excelFileName: string): void{
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: {'data':worksheet},
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    //call method buffer and filename
    this.saveAsExcel(excelBuffer, excelFileName)
  }

  private saveAsExcel(buffer:any, fileName:string):void{
    const data: Blob = new Blob([buffer],{type:EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT);
  }

  public getPolls() {
    const path = mainUrl + 'api/polls';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public getAllUsers() {
    const path = mainUrl + 'api/users/';
    const headers = this.getHeader();
    return this.http.get(path, {headers});
  }

  public getSurveysByMunicipality(municipality:string) {
    const path = mainUrl + 'api/surveysByMunicipality/';
    const headers = this.getHeader();
    return this.http.get(path + municipality, {headers});
  }

  public getSurveysByProfessional(idProfessional:number) {
    const path = mainUrl + 'api/surveysByProfessional/';
    const headers = this.getHeader();
    return this.http.get(path + idProfessional, {headers});
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
