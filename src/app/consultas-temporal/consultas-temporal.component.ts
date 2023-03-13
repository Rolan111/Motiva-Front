import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {signOut} from "@angular/fire/auth";
import {arrayMunicipios} from "../enums/enum";
import {ReportsService} from "../reports/reports.service";

interface ListTypes {
  viewValue: string;
}

@Component({
  selector: 'app-consultas-temporal',
  templateUrl: './consultas-temporal.component.html',
  styleUrls: ['./consultas-temporal.component.scss']
})
export class ConsultasTemporalComponent implements OnInit {

  formConsultas!:FormGroup;
  selected = 'cantidad_municipios';
  citiesList:ListTypes[] = arrayMunicipios;
  listaProfesionales:any = [];

  /** Disparadores para mostrar resultados en pantalla **/
  resultadosListos:boolean = false;
  vistaResultadosMunicipio:boolean=false;
  vistaResultadosProfessional:boolean=false;
  resultadoPorMunicipio:any=0;
  resultadoPorProfessional:any=0;
  nombreProfesionalSeleccionado:string='' //Capturado desde el index de la Lista

  constructor(private formBuilder:FormBuilder,
              private reportsService:ReportsService) {
    this.formConsultas = this.formBuilder.group({
      // SelectedMunicipality: ['', Validators.required],
      SelectedMunicipality: [''],
      selectedProfessional: [''],
      IdProfessional: ['']
    })
  }

  ngOnInit(): void {
  }

  procesarProfesionales(){
    console.log('Prosesando profesionales')
    this.reportsService.getAllUsers().subscribe(data=>{
      console.log('Los usuario son: ',data)
      this.listaProfesionales.push(data)
    })
  }


  enviarConsulta(){
    if (this.selected=='cantidad_municipio'){
      console.log('SE Va a consultar MUNICIPIO, de: '+this.formConsultas.value.SelectedMunicipality)
      /** Las consultas se van a dirigir a los servicios del modulo de REPORTES */
      this.reportsService.getSurveysByMunicipality(this.formConsultas.value.SelectedMunicipality).subscribe(data=>{
        console.log('La cantidad de datos es: '+data)
        this.resultadoPorMunicipio=data
      })
      this.vistaResultadosMunicipio=true
    }
    else if (this.selected=='cantidadEn_profesional'){
      console.log('Se va a consultar el PROFESIONAL no: ',this.formConsultas.value.IdProfessional)
      this.reportsService.getSurveysByProfessional(this.formConsultas.value.IdProfessional).subscribe(data=>{
        console.log('La cantidad de encuestas de este prfessional es: ',data)
        this.resultadoPorProfessional=data
      })
      this.vistaResultadosProfessional=true
    }


    this.resultadosListos=true
  }

  capturaIndex(index:any){
    console.log('El index es: ',index)
    this.nombreProfesionalSeleccionado = this.listaProfesionales[0][index].name
  }

}
