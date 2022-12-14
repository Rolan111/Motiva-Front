import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TrackingSheetService} from "./tracking-sheet.service";
import {TrackingSheetModel} from "./tracking-sheet.model";
import moment from "moment/moment";
import {log} from "util";
import {collectionSnapshots} from "@angular/fire/firestore";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-tracking-sheet',
  templateUrl: './tracking-sheet.component.html',
  styleUrls: ['./tracking-sheet.component.scss']
})
export class TrackingSheetComponent implements OnInit {

  capturaIdPollUrl!:string;
  form: FormGroup;

  //Variables para capturar
  capturandoNombre!:string;
  capturandoApelido!:string;
  capturandoTipoIdentificacion!:string;
  capturandoNumeroIdentificacion!:string;
  capturandoTypeRasm!:string;

  identificationType: any[] = [
    {value: 'CC', viewValue: 'Cedula Ciudadanía'},
    {value: 'CE', viewValue: 'Cedula Extranjería'},
    {value: 'NIP', viewValue: 'Número Identificación Personal'},
    {value: 'NIT', viewValue: 'Número Identificación Tributaría'},
    {value: 'TI', viewValue: 'Tarjeta Identidad'},
    {value: 'PAP', viewValue: 'Pasaporte'},
  ];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private trackingSheetService: TrackingSheetService,
    private formBuilder: FormBuilder)

  {
    this.form = this.formBuilder.group({
      names: ['', Validators.required],
      lastnames: ['', Validators.required],
      identificationType: ['', Validators.required],
      identification: ['', Validators.required],
      typeRoute: ['', Validators.required],
      referredEntity: ['', Validators.required],
      attentionStatus: ['', Validators.required],
      recommendations: ['', Validators.required]
    })
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: any) => {
      const {params} = paramMap
      this.capturaIdPollUrl = params.variable
      console.log('El idPoll es: ',this.capturaIdPollUrl)
      /** Consultar info con idPoll */
      this.trackingSheetService.getRasmByIdPoll(this.capturaIdPollUrl).subscribe(data=>{
        console.log('La data traida de rasm es: ',data)
        this.capturandoNombre = data[0].nameBeneficiary
        this.capturandoApelido = data[0].lastNameBeneficiary
        this.capturandoTipoIdentificacion = data[0].typeIdentification
        this.capturandoNumeroIdentificacion = data[0].identification
        this.capturandoTypeRasm = data[0].typeRasm
        console.log('El nombre es: ',this.capturandoNombre)
        this.form.get('names')?.setValue(this.capturandoNombre)
        this.form.get('lastnames')?.setValue(this.capturandoApelido)
        this.form.get('identificationType')?.setValue(this.capturandoTipoIdentificacion)
        this.form.get('identification')?.setValue(this.capturandoNumeroIdentificacion)
        this.form.get('typeRoute')?.setValue(this.capturandoTypeRasm)

      })
    })

  }

  public saveForm(form: FormGroup) {
    let trackingSheetModel: TrackingSheetModel = {
      idPoll: this.capturaIdPollUrl,
      names: form.value.names,
      lastnames: form.value.lastnames,
      identificationType: form.value.identificationType,
      identification: form.value.identification,
      typeRoute: form.value.typeRoute,
      referredEntity: form.value.referredEntity,
      attentionStatus: form.value.attentionStatus,
      recommendations: form.value.recommendations
    }

    this.trackingSheetService.create(trackingSheetModel).subscribe(response => {
      console.log(response.data)
    },error => {
      console.log('El error es', error)
      this.toastr.error('¡ NO se ha enviado la ficha de seguimiento!', 'Fallo al enviar')
    },() => {
      this.toastr.success('¡Se ha enviado la ficha de seguimiento!', 'Enviado')
      this.deleteRasm()
    })

  }

  deleteRasm(){
    console.log('El idPoll a eliminar en rasm es: ',this.capturaIdPollUrl)
    this.trackingSheetService.deleteRasmByIdPoll(this.capturaIdPollUrl).subscribe(data=>{
      console.log('Registro de RASM eliminado')
    },error => {},() => {
      this.router.navigate(['navbar/dashboard'])
    })
  }

}
