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

  dateStart1:any = "2022-07-28";
  dateEnd1:any = "2022-07-27";

  dt:any = new Date();
  month:any = this.dt.getMonth()-4;
  year:any = this.dt.getFullYear();
  daysInMonth = new Date(this.year, this.month, 0).getDate();

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
    if(this.dateStart1>this.dateEnd1){
      console.log('La fecha inicial es MAYOR a la fecha final')
    }else {
      console.log('La fecha inicial es MENOR a la fecha final')
    }

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
