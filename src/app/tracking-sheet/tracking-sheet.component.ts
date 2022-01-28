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
      identification_type: ['', Validators.required],
      n_identification: ['', Validators.required],
      type_route: ['', Validators.required],
      referred_entity: ['', Validators.required],
      attention_status: ['', Validators.required],
      recommendations_suggestions: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadData()
  }

  public loadData() {
    this.TrackingSheetService.get().subscribe(respuesta => {
    })
  }

  public sendData() {
    this.TrackingSheetService.post(
      {
        names: this.form.value.names,
        lastnames: this.form.value.lastnames,
        identification_type: this.form.value.identification_type,
        n_identification: this.form.value.n_identification,
        type_route: this.form.value.type_route,
        referred_entity: this.form.value.referred_entity,
        attention_status: this.form.value.attention_status,
        recommendations_suggestions: this.form.value.recommendations_suggestions

      }).subscribe(respuesta => {

    })
  }


}
