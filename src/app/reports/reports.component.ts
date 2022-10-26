import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportsService} from "./reports.service";
import {arrayMeses, arrayRutas, arrayZona, arraySubRegion, arrayMunicipios, arrayZonaCentro} from "../enums/enum";
import {QuantitativeInstrumentService} from "../quantitative-instruments/quantitative-instrument.service";

interface ListTypes{
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

  datosAExportar:Array<any>=[];
  consultSelected:any;
  contandoCantidadEncuestas = 1;


  monthList: ListTypes[] = arrayMeses;
  municipiosList: ListTypes[] = arrayMunicipios;
  subRegionList: ListTypes[] = arraySubRegion;
  zonaList: ListTypes[] = arrayZona;
  rutasList: ListTypes[] = arrayRutas;



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
      monthSelected: ['', Validators.required],
      typeConsultSelected: ['', Validators.required],
      municipalitySelected: ['', Validators.required],
      subRegionSelected: ['', Validators.required],
      zoneSelected: ['', Validators.required],
      typeRouteSelected: ['', Validators.required],
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
    let typeConsultSelected: string = this.form.value.typeConsultSelected;
    let municipalitySelected: string = this.form.value.municipalitySelected;
    let subRegionSelected: string = this.form.value.subRegionSelected;
    let zoneSelected: string = this.form.value.zoneSelected;
    let typeRouteSelected: string = this.form.value.typeRouteSelected;

    // let selectedDateStart: any = new Date(DateStart);
    // let selectedDateEnd: any = new Date(DateEnd);

    console.log('La fecha inicial capturada es: ', DateStart)
    console.log('La fecha final capturada es: ', DateEnd)
    console.log('Municipio ', municipalitySelected)
    console.log('subregion: ', subRegionSelected)
    console.log('Zona: ', zoneSelected)
    console.log('Ruta : ', typeRouteSelected)



    this.quantitativeInstrumentService.getAnswersByIdQuestion(102).subscribe(data=>{ //Consultamos la tabla answer donde todos los id_question sean 102 y a open_answer para FECHA DE EVALUACION

      console.log('La data inicial answer es: ',data)
      let capturandoDataAnswer:any = data;
      capturandoDataAnswer.forEach((data1:any)=>{ //De aquí sacamos id_poll, fecha, type (Adult, children)
        let dateInstrument:any = data1.openAnswer;

        if(dateInstrument>=selectedDateStart && dateInstrument<=selectedDateEnd){
          console.log('La fecha de id_poll: ',data1.idPoll, ', ESTÁ dentro del rango')
          //Evaluamos Tipo de consulta Municipio/subregion
          // if(typeConsultSelected=="municipio"){ // Para el caso de consultar MUNICIPIO

            //CÓDIGO NUEVO
            // Realizamos una sola consulta con múltiples resultados en donde nos trae: todos los campos faltantes que se pueden consultar en ANSWER excepto las rutas activas
            this.quantitativeInstrumentService.getAnswersMultipleByIdPoll(data1.idPoll).subscribe(data=>{
              console.log('Los datos MULTIPLES consultados son>: ',data)
              let capturandoMultiplesDatos:any = data;
              capturandoMultiplesDatos.forEach((data2:any)=>{
                switch (data2.idQuestion){
                  case 2: //SEXO
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
                    break;
                  case 6: //MUNICIPIO
                    if(typeConsultSelected=="municipio") { // Para el caso de consultar MUNICIPIO unico
                      data2.openAnswer == municipalitySelected?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica'
                    }else{//para el caro de SUB-REGION
                      let contador=0;
                      while(data2.openAnswer != this.municipioMostrar){
                        console.log('El valor del contador es: ', contador)
                        console.log('La data de zona centro es: ',arrayZonaCentro[contador])
                        data2.openAnswer == arrayZonaCentro[contador]?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica';
                        contador++;
                      }
                    }

                    break;
                  case 1: //EDAD
                    this.edadMostrar=data2.openAnswer
                    break;
                  case 5: //ZONA
                    if(zoneSelected=='TODAS'){
                      data2.idOptionAnswers[0]==15?this.zonaMostrar='Rural':this.zonaMostrar='Urbana'
                    }else{
                      let traduciendozona;
                      //
                      data2.idOptionAnswers[0]==15?traduciendozona='RURAL':traduciendozona='URBANA'
                      traduciendozona==zoneSelected?this.zonaMostrar=traduciendozona:this.zonaMostrar='no_clasifica'
                    }

                    break;
                  default:
                    break;
                }

              })
              this.datosAExportar.push({
                "id_poll":data1.idPoll,
                "fecha":data1.openAnswer,
                "Tipo":data1.type,
                "Sexo":this.sexoMostar,
                "Municipio":this.municipioMostrar,
                "Edad":this.edadMostrar,
                "Zona":this.zonaMostrar,
                "evidencia":data1.evidence,
              })
            },error => {},() => {


              if(this.contandoCantidadEncuestas==capturandoDataAnswer.length){

                this.reportsService.exportToExcel(this.datosAExportar, 'datosExportados');
                // window.location.reload();
              }else{
                this.contandoCantidadEncuestas++
              }
            })

            /* +++++++++++++++++++++++++++++++++++++++ FIN CÓDIGO NUEVO +++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

          //Ahora consultamos la tabla answer para sacar sexo 2,  Municipio 6, edad 1, zona 5
        }else {
          console.log(' NO HAY REGISTROS dentro de este rango -- Evaluar condición')
        }
      })
    },error => {},() => {

    })
  }

  exportAsXLSX():void{
    this.reportsService.exportToExcel(this.dataSource, 'my_export')
  }


  probandoMetodos(){ //para hacer pruebas en los métodos
    // console.log('El mes seleccionado fue: ', this.form.value.monthSelected)
  }

}
