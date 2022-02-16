import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TrackingSheetService} from "../tracking-sheet/tracking-sheet.service";

@Component({
  selector: 'app-care-sheet',
  templateUrl: './care-sheet.component.html',
  styleUrls: ['./care-sheet.component.scss']
})
export class CareSheetComponent implements OnInit {

  form: FormGroup;

  sexo: any[] = [
    {value: 'Masculino', viewValue: 'Masculino'},
    {value: 'Femenino', viewValue: 'Femenino'}
  ];

  constructor(
    private route: ActivatedRoute,
    private trackingSheetService: TrackingSheetService,
    private formBuilder: FormBuilder
  ) {
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
  }

  public saveForm(form: FormGroup) {

  }

}
