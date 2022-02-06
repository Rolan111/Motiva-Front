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
    };

    this.trackingSheetService.create(trackingSheetModel).subscribe(response => {
      console.log(response.data)
    })
  }
}
