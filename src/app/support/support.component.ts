import { Component, OnInit } from '@angular/core';
import { arrayMunicipios } from "../enums/enum";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  listaMunicipios:any = arrayMunicipios;
  constructor() { }

  ngOnInit(): void {

  }

}
