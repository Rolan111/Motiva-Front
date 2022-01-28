import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TrackingSheetService} from "./tracking-sheet.service";

@Component({
  selector: 'app-tracking-sheet',
  templateUrl: './tracking-sheet.component.html',
  styleUrls: ['./tracking-sheet.component.scss']
})
export class TrackingSheetComponent implements OnInit {

  //Tipos de identificación para cargar al formulario
  identificationTypes: any[] = [
    {value: 'cc', viewValue: 'C.C'},
    {value: 'ti', viewValue: 'T.I'},
  ];

  form: FormGroup;

  constructor(private route: ActivatedRoute, private TrackingSheetService: TrackingSheetService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      names: ['', Validators.required],
      lastnames: ['', Validators.required],
      identificationType: ['', Validators.required],
      nIdentification: ['', Validators.required],
      typeRoute: ['', Validators.required],
      referredEntity: ['', Validators.required],
      attentionStatus: ['', Validators.required],
      recommendationsSuggestions: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadData()
  }

  public loadData() {
    this.TrackingSheetService.get('http://localhost:5000/api/tracking-sheets').subscribe(respuesta => {
      console.log('Recibiendo datos de tracking-service !');
      console.log(respuesta)
    })
  }

  public sendData() {
    this.TrackingSheetService.post('http://localhost:5000/api/tracking-sheet-create',
      {
        names: this.form.value.names,
        lastnames: this.form.value.lastnames,
        identificationType: this.form.value.identificationType,
        nIdentification: this.form.value.nIdentification,
        typeRoute: this.form.value.typeRoute,
        referredEntity: this.form.value.referredEntity,
        attentionStatus: this.form.value.attentionStatus,
        recommendationsSuggestions: this.form.value.recommendationsSuggestions

      }).subscribe(respuesta => {
      console.log('Registro CARGADO a tracking-sheet !');
    })
  }


}
