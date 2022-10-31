import {Component, destroyPlatform, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ReportsService} from "./reports.service";
import {
  arrayMeses,
  arrayRutas,
  arrayZona,
  arraySubRegion,
  arrayMunicipios,
  arrayZonaCentro,
  arrayZonaMacizo, arrayZonaNorte, arrayZonaOriente, arrayZonaPacifico, arrayZonaPiedemonteAmazonico, arrayZonaSur
} from "../enums/enum";
import {QuantitativeInstrumentService} from "../quantitative-instruments/quantitative-instrument.service";
import {CareRasmService} from "../care-rasm/care-rasm.service";
import {empty, Observable, observable, of, Subscription, timeout} from "rxjs";

interface ListTypes{
  value: string;
  viewValue: string;
}

export interface reporte2{
  id_poll: string;
  Fecha: string;
  Tipo: string;
  Sexo: string;
  Municipio: string;
  Edad: string;
  Zona: string;
  Tipo_Ruta_Activada: string;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  datosAExportar2:Array<reporte2>=[];
  datosAExportar1:Array<any>=[];

  consultSelected:any;
  contandoCantidadEncuestas = 1;
  contandoCantidadFiltro2 = 1;


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
    private careRasmService: CareRasmService,
    private formBuilder: FormBuilder,
    private reportsService: ReportsService,
    private quantitativeInstrumentService: QuantitativeInstrumentService,
    // public procesandoReporteRutas: ProcesandoReporteRutas
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

          // if(typeConsultSelected=="municipio"){ // Para el caso de consultar MUNICIPIO

          // Realizamos una sola consulta con múltiples resultados en donde nos trae: todos los campos faltantes que se pueden consultar en ANSWER excepto las rutas activas
          //Ahora consultamos la tabla answer para sacar sexo 2,  Municipio 6, edad 1, zona 5
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
                  //MUNICIPIO Y SUBREGIÓN
                  case 6:
                    if(typeConsultSelected=="municipio") { // Para el caso de consultar MUNICIPIO unico
                      data2.openAnswer == municipalitySelected?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica'

                    }else{//para el caso de SUB-REGION

                      let contador=0;

                      if(this.form.value.subRegionSelected=="CENTRO"){
                        while(data2.openAnswer != this.municipioMostrar && arrayZonaCentro[contador]!=undefined){
                          // console.log('La data de ZONA CENTRO en la posicion 8 es: ',arrayZonaCentro[8])
                          data2.openAnswer == arrayZonaCentro[contador]?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica';
                          contador++;
                        }
                      }
                      if(this.form.value.subRegionSelected=="MACIZO"){
                        while(data2.openAnswer != this.municipioMostrar && arrayZonaMacizo[contador]!=undefined){
                          data2.openAnswer == arrayZonaMacizo[contador]?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica';
                          contador++;
                        }
                      }
                      if(this.form.value.subRegionSelected=="NORTE"){
                        while(data2.openAnswer != this.municipioMostrar && arrayZonaNorte[contador]!=undefined){
                          data2.openAnswer == arrayZonaNorte[contador]?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica';
                          contador++;
                        }
                      }
                      if(this.form.value.subRegionSelected=="ORIENTE"){
                        while(data2.openAnswer != this.municipioMostrar && arrayZonaOriente[contador]!=undefined){
                          data2.openAnswer == arrayZonaOriente[contador]?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica';
                          contador++;
                        }
                      }
                      if(this.form.value.subRegionSelected=="PACIFICO"){
                        while(data2.openAnswer != this.municipioMostrar && arrayZonaPacifico[contador]!=undefined){
                          data2.openAnswer == arrayZonaPacifico[contador]?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica';
                          contador++;
                        }
                      }
                      if(this.form.value.subRegionSelected=="PIEDEMONTE AMAZONICO"){
                        while(data2.openAnswer != this.municipioMostrar && arrayZonaPiedemonteAmazonico[contador]!=undefined){
                          data2.openAnswer == arrayZonaPiedemonteAmazonico[contador]?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica';
                          contador++;
                        }
                      }
                      if(this.form.value.subRegionSelected=="SUR"){
                        while(data2.openAnswer != this.municipioMostrar && arrayZonaSur[contador]!=undefined){
                          data2.openAnswer == arrayZonaSur[contador]?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica';
                          contador++;
                        }
                      }
                      if(this.form.value.subRegionSelected=="TODOS" && arrayMunicipios[contador]!=undefined){
                        while(data2.openAnswer != this.municipioMostrar){
                          data2.openAnswer == arrayMunicipios[contador]?this.municipioMostrar=data2.openAnswer:this.municipioMostrar='no_clasifica';
                          contador++;
                        }
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
            //Hacemo limpieza de los datos que clasifican para el siguiente filtro
            if(this.municipioMostrar=='no_clasifica' || this.zonaMostrar=='no_clasifica'){
              //NO HAGA NADA CON ESTOS DATOS, es decir se perderán si no clasifican
            }else{
              this.datosAExportar1.push({
                "id_poll":data1.idPoll,
                "Fecha":data1.openAnswer,
                "Tipo":data1.type,
                "Sexo":this.sexoMostar,
                "Municipio":this.municipioMostrar,
                "Edad":this.edadMostrar,
                "Zona":this.zonaMostrar
              })
            }

            },error => {},() => {


              if(this.contandoCantidadEncuestas==capturandoDataAnswer.length){ //Se han procesado todos los datos del primer filtro

                this.procesandoFiltro2()

              }else{
                this.contandoCantidadEncuestas++
              }
            })

        }else {
          console.log(' NO HAY REGISTROS dentro de este rango -- Evaluar condición')
        }
      })
    },error => {},() => {

    })
  }

  // ********** inicio SEGUNDO FILTRO ********** Una vez tenemos todos los datos del primer filtro entonces se procede a realizar el SEGUNDO FILTRO en donde se consulta la tabla de reportes

  procesandoFiltro2(){

    if(this.form.value.typeRouteSelected=='no_aplicar'){
      this.reportsService.exportToExcel(this.datosAExportar1, 'datosExportados');
      window.location.reload();
    }

    if(this.form.value.typeRouteSelected=='si'){ //SI

      this.datosAExportar1.forEach((dataArray:any)=>{

        this.careRasmService.getRASMByIdPoll(dataArray.id_poll).subscribe(data=>{
          let datosRASM:any=data;
          if(data==false){
            // RASM: NO HAY DATOS PARA ESTE ID
          }else{
            datosRASM.forEach((recorriendoDatosRasm:any)=>{
              this.datosAExportar2.push({
                id_poll:dataArray.id_poll,
                Fecha:dataArray.Fecha,
                Tipo:dataArray.Tipo,
                Sexo:dataArray.Sexo,
                Municipio:dataArray.Municipio,
                Edad:dataArray.Edad,
                Zona:dataArray.Zona,
                Tipo_Ruta_Activada:recorriendoDatosRasm.typeRasm
              })
            })
          }


        },error => {}, () => {
          if(this.datosAExportar1.length==this.contandoCantidadFiltro2){
            this.reportsService.exportToExcel(this.datosAExportar2, 'datosExportados2')
            window.location.reload();
          }else{
            this.contandoCantidadFiltro2++
          }

        })

      })

    }

    if(this.form.value.typeRouteSelected=='no'){ //NO

      this.datosAExportar1.forEach((dataArray:any)=>{

        this.careRasmService.getRASMByIdPoll(dataArray.id_poll).subscribe(data=>{
          if(data==false){

              this.datosAExportar2.push({
                id_poll:dataArray.id_poll,
                Fecha:dataArray.Fecha,
                Tipo:dataArray.Tipo,
                Sexo:dataArray.Sexo,
                Municipio:dataArray.Municipio,
                Edad:dataArray.Edad,
                Zona:dataArray.Zona,
                Tipo_Ruta_Activada:"NO"
              })
          }else{
            //Los id coinciden entoces esta informacion SE PIERDE
          }


        },error => {}, () => {
          if(this.datosAExportar1.length==this.contandoCantidadFiltro2){
            this.reportsService.exportToExcel(this.datosAExportar2, 'datosExportados2')
            window.location.reload();
          }else{
            this.contandoCantidadFiltro2++
          }

        })

      })

    }

    if(this.form.value.typeRouteSelected=='todas'){ //TODAS

      this.datosAExportar1.forEach((dataArray:any)=>{

        this.careRasmService.getRASMByIdPoll(dataArray.id_poll).subscribe(data=>{
          let datosRASM:any=data;
          if(data==false){
            this.datosAExportar2.push({
              id_poll:dataArray.id_poll,
              Fecha:dataArray.Fecha,
              Tipo:dataArray.Tipo,
              Sexo:dataArray.Sexo,
              Municipio:dataArray.Municipio,
              Edad:dataArray.Edad,
              Zona:dataArray.Zona,
              Tipo_Ruta_Activada:"NO"
            })
          }else{
            datosRASM.forEach((recorriendoDatosRasm:any)=>{
              this.datosAExportar2.push({
                id_poll:dataArray.id_poll,
                Fecha:dataArray.Fecha,
                Tipo:dataArray.Tipo,
                Sexo:dataArray.Sexo,
                Municipio:dataArray.Municipio,
                Edad:dataArray.Edad,
                Zona:dataArray.Zona,
                Tipo_Ruta_Activada:recorriendoDatosRasm.typeRasm
              })
            })
          }


        },error => {}, () => {
          if(this.datosAExportar1.length==this.contandoCantidadFiltro2){
            this.reportsService.exportToExcel(this.datosAExportar2, 'datosExportados2')
            window.location.reload();
          }else{
            this.contandoCantidadFiltro2++
          }

        })

      })
    }
  }

  // *********** FIN SEGUNDO FILTRO ***********


  exportAsXLSX():void{
    // this.reportsService.exportToExcel(this.dataSource, 'my_export')
  }


  probandoMetodos(){ //para hacer pruebas en los métodos
    // console.log('El mes seleccionado fue: ', this.form.value.monthSelected)
  }

}
