import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportsService} from "./reports.service";
import {conditionallyCreateMapObjectLiteral} from "@angular/compiler/src/render3/view/util";

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reportsService: ReportsService
  ) {
    this.form = this.formBuilder.group({
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
    })
  }

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Profesional 1'},
    {value: 'pizza-1', viewValue: 'Profesional 2'},
    {value: 'tacos-2', viewValue: 'Profesional 3s'},
  ];

  ngOnInit(): void {

  }

  procesandoReportes() {
    let selectedDateStart: any = this.form.value.dateStart;
    let selectedDateEnd: any = this.form.value.dateEnd;

    this.reportsService.getPolls().subscribe(data=>{
      console.log('La data inicial poll es: ',data)
      let capturandoDataPoll:any = data;
      capturandoDataPoll.forEach((data1:any)=>{
        let datePoll:any= new Date(data1.date);

        if(datePoll>=selectedDateStart && datePoll<=selectedDateEnd){
          console.log('La fecha de id_poll: ',data1.idPoll, ', ESTÁ dentro del rango')
        }else {
          console.log(' NO HAY REGISTROS dentro de este rango')
        }
      })
    })

  }

}