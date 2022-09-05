import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportsService} from "./reports.service";
import {arrayMeses} from "../enums/enum";
import {QuantitativeInstrumentService} from "../quantitative-instruments/quantitative-instrument.service";

interface month {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  datosAExportar:any = [];
  month2: month[] = arrayMeses;
  form: FormGroup;

  //Variables para imprimir en excel
  sexoMostar:any;
  municipioMostrar:any;
  edadMostrar:any;
  zonaMostrar:any;

  constructor(
    private formBuilder: FormBuilder,
    private reportsService: ReportsService,
    private quantitativeInstrumentService: QuantitativeInstrumentService
  ) {
    this.form = this.formBuilder.group({
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      monthSelected: ['', Validators.required]
    })
  }

  //Tabla de prueba, datos de prueba
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  //procesamiento de las fechas

  procesamientoFechas(){
    // let dt:any = new Date();
    // let month:any = dt.getMonth()-4;
    // let year:any = dt.getFullYear();
    // let daysInMonth = new Date(year, month, 0).getDate(); //calcula los días que tiene el mes
    let mesSeleccionado = this.form.value.monthSelected;
    let daysInMonth = new Date(2022, mesSeleccionado, 0).getDate(); //calcula los días que tiene el mes
    let fechaInicio:string = '2022-'+mesSeleccionado+'-01';
    let fechaFin:string = '2022-'+mesSeleccionado+'-'+daysInMonth;
    console.log('La fecha inicio es: ', fechaInicio);
    console.log('La fecha fin es: ', fechaFin);

    let dateStart1:any = "2022-07-28";//fechas de prueba
    let dateEnd1:any = "2022-07-27";
    this.procesandoReportes(fechaInicio, fechaFin);
  }

  // dateStart1:any = "2022-07-28";//fechas de prueba
  // dateEnd1:any = "2022-07-27";

  ngOnInit(): void {
    // if(this.dateStart1>this.dateEnd1){
    //   console.log('La fecha inicial es MAYOR a la fecha final')
    // }else {
    //   console.log('La fecha inicial es MENOR a la fecha final')
    // }

  }

  procesandoReportes(DateStart:string, DateEnd:string) {

    // let selectedDateStart: any = this.form.value.dateStart;
    // let selectedDateEnd: any = this.form.value.dateEnd;

    let selectedDateStart: string = DateStart;
    let selectedDateEnd: string = DateEnd;

    // let selectedDateStart: any = new Date(DateStart);
    // let selectedDateEnd: any = new Date(DateEnd);

    console.log('La fecha inicial capturada es: ', DateStart)

    this.reportsService.getPolls().subscribe(data=>{ //Consultamos la tabla Poll
      console.log('La data inicial poll es: ',data)
      let capturandoDataPoll:any = data;
      capturandoDataPoll.forEach((data1:any)=>{
        // let datePoll:any= new Date(data1.date);
        let datePoll:any = data1.date;

        if(datePoll>=selectedDateStart && datePoll<=selectedDateEnd){
          console.log('La fecha de id_poll: ',data1.idPoll, ', ESTÁ dentro del rango')
          //Consultamos la tabla answer, Tipo sacar en Poll Type, sexo 2,  Municipio 6
          this.quantitativeInstrumentService.getAnswerByIdPollAndIdQuestion(data1.idPoll, 2).subscribe(data=>{ //Para consultar sexo
            let extrayendoSexo:any = data;
            extrayendoSexo.forEach((data2:any)=>{

              switch (data2.idOptionAnswers[0]){
                case 1:
                  this.sexoMostar = "Hombre";
                  break;
                case 2:
                  this.sexoMostar = "Mujer";
                  break;
                case 3:
                  this.sexoMostar = "Indefinido";
                  break;
                default:
                  break;
              }
              console.log('El sexo de esta persona es: ', data2.idOptionAnswers[0])
            })

            this.quantitativeInstrumentService.getAnswerByIdPollAndIdQuestion(data1.idPoll, 6).subscribe(data=>{ //Para consultar MUNICIPIO
              let extrayendoMunicipio:any = data;
              extrayendoMunicipio.forEach((element:any) => this.municipioMostrar=element.openAnswer)

              this.quantitativeInstrumentService.getAnswerByIdPollAndIdQuestion(data1.idPoll, 1).subscribe(data=>{ //Para consultar EDAD
                let extrayendoEdad:any = data;
                extrayendoEdad.forEach((element:any) => this.edadMostrar=element.openAnswer)

                this.quantitativeInstrumentService.getAnswerByIdPollAndIdQuestion(data1.idPoll, 5).subscribe(data=>{//Para consultar ZONA de residencia
                  let extrayendoZona:any = data;
                  extrayendoZona.forEach((element:any) => {
                    element.idOptionAnswers[0]==15?this.zonaMostrar='Rural':this.zonaMostrar='Urbano'
                  })
                  // this.zonaMostrar=element.id
                  this.datosAExportar.push({
                    "Tipo":data1.type,
                    "Sexo":this.sexoMostar,
                    "Municipio":this.municipioMostrar,
                    "Edad":this.edadMostrar,
                    "Zona":this.zonaMostrar,
                    "fecha":data1.date,
                    "evidencia":data1.evidence,
                    "id_poll":data1.idPoll
                  })
                }, error => {},() => this.reportsService.exportToExcel(this.datosAExportar, 'datosExportados'))

              })

            })

          })

          // this.datosAExportar.push({
          //   "Tipo":data1.type,
          //   "Sexo":this.sexoMostar,
          //   "Municipio":this.municipioMostrar,
          //   "fecha":data1.date,
          //   "evidencia":data1.evidence,
          //   "id_poll":data1.idPoll
          // })

        }else {
          console.log(' NO HAY REGISTROS dentro de este rango -- Evaluar condición')
        }
      })
    },error => {},() => {})
    // },error => {},() => {this.reportsService.exportToExcel(this.datosAExportar, 'datosExportados')})

  }

  exportAsXLSX():void{
    this.reportsService.exportToExcel(this.dataSource, 'my_export')
  }

  probandoMetodos(){
    console.log('El mes seleccionado fue: ', this.form.value.monthSelected)
  }

}
