import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuantitativeInstrumentService} from "./quantitative-instrument.service";

interface DocumentsTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-quantitative-instrument',
  templateUrl: './quantitative-instrument.component.html',
  styleUrls: ['./quantitative-instrument.component.scss']
})
export class QuantitativeInstrumentComponent implements OnInit {
  firstFormGroup!: FormGroup;
  personalInfo!: FormGroup;
  selectedValue: string = "";

  constructor(
    private _formBuilder: FormBuilder,
    private quanInstService: QuantitativeInstrumentService) {
  }

  identification: DocumentsTypes[] = [
    {value: 'CC', viewValue: 'Cedula Ciudadanía'},
    {value: 'CE', viewValue: 'Cedula Extranjería'},
    {value: 'NIP', viewValue: 'Número Identificación Personal'},
    {value: 'NIT', viewValue: 'Número Identificación Tributaría'},
    {value: 'TI', viewValue: 'Tarjeta Identidad'},
    {value: 'PAP', viewValue: 'Pasaporte'},
  ];

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.personalInfo = this._formBuilder.group({
      firstName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondName: ['', Validators.required],
      secondLastName: ['', Validators.required],
      identification: ['', Validators.required],
      typeIdentification: ['', Validators.required],
      address: ['', Validators.required],
      cellphone: ['', Validators.required],
    });
  }
}
