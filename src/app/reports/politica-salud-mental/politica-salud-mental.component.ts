import { Component, OnInit } from '@angular/core';

import {
  arrayMeses,
  arrayRutas,
  arrayZona,
  arraySubRegion,
  arrayMunicipios,
  arrayZonaCentro,
  arrayZonaMacizo, arrayZonaNorte, arrayZonaOriente, arrayZonaPacifico, arrayZonaPiedemonteAmazonico, arrayZonaSur
} from "../../enums/enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CareRasmService} from "../../care-rasm/care-rasm.service";
import {ReportsService} from "../reports.service";
import {QuantitativeInstrumentService} from "../../quantitative-instruments/quantitative-instrument.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {formatDate} from "@angular/common";

interface ListTypes{
  value: string;
  viewValue: string;
}

export interface reporte2{
  id_poll: string;
  Fecha: string;
  Subregión: string;
  Tipo: string;
  Sexo: string;
  Municipio: string;
  Edad: string;
  Zona: string;
  Tipo_Ruta_Activada: string;
}

@Component({
  selector: 'app-politica-salud-mental',
  templateUrl: './politica-salud-mental.component.html',
  styleUrls: ['./politica-salud-mental.component.scss']
})
export class PoliticaSaludMentalComponent implements OnInit {
  datosAExportar2:Array<reporte2>=[];
  datosAExportar1:Array<any>=[];
  datosAExportarPruebas:Array<any>=[];

  consultSelected:any;
  contandoCantidadEncuestas = 1;
  contandoCantidadEncuestasCondicion1=0;
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
    private _snackBar: MatSnackBar
    // public procesandoReporteRutas: ProcesandoReporteRutas
  ) {

    this.form = this.formBuilder.group({
      dateStart: [''],
      dateEnd: [''],
      monthSelected: ['', Validators.required],
      typeConsultSelected: ['', Validators.required],
      municipalitySelected: [''],
      subRegionSelected: [''],
      zoneSelected: ['', Validators.required],
      typeRouteSelected: ['', Validators.required],
    })
  }

  //procesamiento de las fechas

  procesamientoFechas(){
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

    this.addValidation();

  }

  procesandoReportes(DateStart:string, DateEnd:string) {

    let selectedDateStart: string = DateStart;
    let selectedDateEnd: string = DateEnd;
    let typeConsultSelected: string = this.form.value.typeConsultSelected;
    let municipalitySelected: string = this.form.value.municipalitySelected;
    let subRegionSelected: string = this.form.value.subRegionSelected;
    let zoneSelected: string = this.form.value.zoneSelected;
    let typeRouteSelected: string = this.form.value.typeRouteSelected;

    /** Si se va a trabajar con fechas directamente desde angular no es necesario formatear, pero para este caso
     * se va a trabajar con Backend por lo que para hacer coincidir con el formato que acepta Firebase, es necesario
     * Formatear de la siguiente manera yyy-mm-ddThh:mm:ss*/
    let formateadaFechaInicio = formatDate(DateStart,'yyyy-MM-ddT00:00:00', 'en-US'); //MM mayusculas para este caso. Este es el formato con el que trabaja firebase
    let formateadaFechaFin = formatDate(DateEnd,'yyyy-MM-ddT00:00:00', 'en-US');
    console.log('La fecha inicio formateada es: ',formateadaFechaInicio)
    console.log('La fecha fin formateada es: ',formateadaFechaFin)

    console.log('La fecha inicial capturada es: ', DateStart)
    console.log('La fecha final capturada es: ', DateEnd)
    console.log('Municipio ', municipalitySelected)
    console.log('subregion: ', subRegionSelected)
    console.log('Zona: ', zoneSelected)
    console.log('Ruta : ', typeRouteSelected)

    this.reportsService.getidPollsBasedData(formateadaFechaInicio, formateadaFechaFin).subscribe()


    this.quantitativeInstrumentService.getAnswersByIdQuestion(102).subscribe(data=>{ //1 Consultamos la tabla answer donde todos los id_question sean 102 y al campo open_answer para FECHA DE EVALUACION
      // console.log('La data de la primera consulta es: ',data)
      if(data.length == 0){
        this.openSnackBar('NO HAY REGISTROS - EVALUAR LOS FILTROS SELECCIONADOS', 'ACEPTAR');
      }else{
        let capturandoDataAnswer:any = data;
        capturandoDataAnswer.forEach((data1:any)=>{ //De aquí sacamos id_poll, fecha, type (Adult, children)
          console.log('El contador de encuestas 1 está en: ',this.contandoCantidadEncuestas)
          let dateInstrument:any = data1.openAnswer;

          if(dateInstrument>=selectedDateStart && dateInstrument<=selectedDateEnd){ //Condición FECHAS (dentro de rango)
            console.log('PRIMER CONSULTA: La fecha de id_poll: ',data1.idPoll, ', ESTÁ dentro del rango')
            this.contandoCantidadEncuestasCondicion1++
            console.log('La cantidad que CUMPLEN CONDICION FECHA son: ',this.contandoCantidadEncuestasCondicion1)
            // Realizamos una sola consulta con múltiples resultados en donde nos trae: todos los campos faltantes que se pueden consultar en ANSWER excepto las rutas activas
            //Ahora consultamos la tabla answer para sacar sexo 2,  Municipio 6, edad 1, zona 5
            this.quantitativeInstrumentService.getAnswersMultipleByIdPoll(data1.idPoll).subscribe(data=>{
              console.log('SEGUNDA CONSULTA: Los datos MULTIPLES consultados son: ',data)
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

              }) //FIN SEGUNDA CONSULTA

              //Hacemos limpieza de los datos que clasifican para el siguiente filtro
              if(this.municipioMostrar=='no_clasifica' || this.zonaMostrar=='no_clasifica'){
                //NO HAGA NADA CON ESTOS DATOS, es decir se perderán si no clasifican
                // /** El siguiente es un espacio de PRUEBAS - se debe volver a comentar **/
                // this.datosAExportarPruebas.push({
                //   "id_poll":data1.idPoll,
                //   "Fecha":data1.openAnswer,
                //   "Subregión":this.form.value.subRegionSelected,
                //   "Tipo":data1.type,
                //   "Sexo":this.sexoMostar,
                //   "Municipio":this.municipioMostrar,
                //   "Edad":this.edadMostrar,
                //   "Zona":this.zonaMostrar
                // })
                // console.log('Todos lo datos procesados del PRIMER FILTRO sin procesar SON: ', this.datosAExportarPruebas)
              }else{
                this.datosAExportar1.push({
                  "id_poll":data1.idPoll,
                  "Fecha":data1.openAnswer,
                  "Subregión":this.form.value.subRegionSelected,
                  "Tipo":data1.type,
                  "Sexo":this.sexoMostar,
                  "Municipio":this.municipioMostrar,
                  "Edad":this.edadMostrar,
                  "Zona":this.zonaMostrar
                })
              }

            },error => {console.log('Tenemos un registro de ERROR')},() => {
              // console.log('La cantidad que CUMPLEN CONDICION FECHA son: ',this.contandoCantidadEncuestasCondicion1)
              console.log('Se completó el primer filtro')
              console.log('El tamaño de la data de question fue: ',capturandoDataAnswer.length)
              console.log('El contador de encuestas está en: ', this.contandoCantidadEncuestas)
              if(this.contandoCantidadEncuestas==this.contandoCantidadEncuestasCondicion1){ //Se han procesado todos los datos del primer filtro
                console.log('Todos lo datos procesados del PRIMER FILTRO son: ', this.datosAExportar1)
                this.procesandoFiltro2()

              }else{
                this.contandoCantidadEncuestas++
              }
            })

          }else {
            //No colocar evaluación aquí ya muchas fechas pasarán por este filtro a pesar de que la siguiente si clasifique
            // this.openSnackBar('NO HAY FECHAS QUE COINCIDAN - EVALUAR LOS FILTROS SELECCIONADOS', 'Aceptar');
          }
        })

      }

    },error => {
      this.openSnackBar('NO HAY REGISTROS -- EVALUAR LOS FILTROS SELECCIONADOS', 'Aceptar');

    },() => {
      /** Este completo se realiza primero que todos */
    })
  }

  // ********** inicio SEGUNDO FILTRO ********** Una vez tenemos todos los datos del primer filtro entonces se procede a realizar el SEGUNDO FILTRO en donde se consulta la tabla de reportes

  procesandoFiltro2(){

    if(this.form.value.typeRouteSelected=='no_aplicar'){
      this.reportsService.exportToExcel(this.datosAExportar1, 'datosExportados');
      window.location.reload();
    }

    if(this.form.value.typeRouteSelected=='si'){ //SI rasm activa

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
                Subregión:this.form.value.subRegionSelected,
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

    if(this.form.value.typeRouteSelected=='no'){ //NO rasm activa

      this.datosAExportar1.forEach((dataArray:any)=>{

        this.careRasmService.getRASMByIdPoll(dataArray.id_poll).subscribe(data=>{
          if(data==false){

            this.datosAExportar2.push({
              id_poll:dataArray.id_poll,
              Fecha:dataArray.Fecha,
              Subregión:this.form.value.subRegionSelected,
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
              Subregión:this.form.value.subRegionSelected,
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
                Subregión:this.form.value.subRegionSelected,
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

  //metodo para agregar prop Validators
  private  addValidation(){
    // @ts-ignore
    this.form.get('typeConsultSelected').valueChanges
      .subscribe((value: any) => {

          if(value == 'municipio') {
            // @ts-ignore
            this.form.get('municipalitySelected').setValidators(Validators.required)
          }else  if(value == 'sub-region') {
            // @ts-ignore
            this.form.get('subRegionSelected').setValidators(Validators.required)
          }else{
            // @ts-ignore
            this.form.get('municipalitySelected').clearValidators();
            // @ts-ignore
            this.form.get('municipalitySelected').updateValueAndValidity();
            // @ts-ignore
            this.form.get('subRegionSelected').clearValidators();
            // @ts-ignore
            this.form.get('subRegionSelected').updateValueAndValidity();

          }
        }
      );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
