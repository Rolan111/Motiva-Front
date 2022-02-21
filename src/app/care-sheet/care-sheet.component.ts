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


  /*FORMULARIO*/
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

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
      city: ['', Validators.required],
      departament: ['', Validators.required],
      evaluationDate: ['', Validators.required],
      sex: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      age: ['', Validators.required],
      dateBirth: ['', Validators.required],


      ethnicity: ['', Validators.required],
      race: ['', Validators.required],
      religion: ['', Validators.required],
      placeBirth: ['', Validators.required],
      origin: ['', Validators.required],
      originAddress: ['', Validators.required],
      neighborhood: ['', Validators.required],
      stratum: ['', Validators.required],
      phone: ['', Validators.required],


    })
  }

  ngOnInit(): void {
  }

  public saveForm(form: FormGroup) {

  }

}
