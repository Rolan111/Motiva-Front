import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TrackingSheetService} from "./tracking-sheet.service";
import {TrackingSheetModel} from "./tracking-sheet.model";

@Component({
  selector: 'app-tracking-sheet',
  templateUrl: './tracking-sheet.component.html',
  styleUrls: ['./tracking-sheet.component.scss']
})
export class TrackingSheetComponent {
  form: FormGroup;

  identificationType: any[] = [
    {value: 'CC', viewValue: 'Cedula Ciudadanía'},
    {value: 'CE', viewValue: 'Cedula Extranjería'},
    {value: 'NIP', viewValue: 'Número Identificación Personal'},
    {value: 'NIT', viewValue: 'Número Identificación Tributaría'},
    {value: 'TI', viewValue: 'Tarjeta Identidad'},
    {value: 'PAP', viewValue: 'Pasaporte'},
  ];

  constructor(
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

  public saveForm(form: FormGroup) {
    let trackingSheetModel: TrackingSheetModel = {
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
    })
  }

  //1 Capturar idPoll que viene en la URL
  //Sacar los datos de esta persona por consola (para efectos de prueba)
  //2 Pintar los datos en el formulario
  //3 En el botón gurdar llamar el método de guardar y de eliminar a la vez

  saveFormPrueba(){
    console.log('Gurdado de prueba: se hace en follow_users')
  }

  deleteRasm(idPoll:any){
    console.log('El idPoll a eliminar es: en   rasm ',idPoll)
    //Aquí llamar el servicio para eliminar y pasarle el idPoll
  }
}
