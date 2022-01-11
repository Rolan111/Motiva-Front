import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuantitativeInstrumentService} from "./quantitative-instrument.service";

interface listTypes {
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
  secundaryInfo!: FormGroup;
  personalInfo!: FormGroup;
  selectedValue: string = "";
  genderValue: string = "";
  ethnicityValue: string = "";
  civilStatusValue: string = "";
  typeDwellingValue: string = "";
  scholarshipValue: string = "";
  occupationValue: string = "";
  workModeValue: string = "";
  socialSecurityValue: string = "";
  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private quanInstService: QuantitativeInstrumentService) {
    console.log(this.occupationValue)
  }

  identification: listTypes[] = [
    {value: 'CC', viewValue: 'Cedula Ciudadanía'},
    {value: 'CE', viewValue: 'Cedula Extranjería'},
    {value: 'NIP', viewValue: 'Número Identificación Personal'},
    {value: 'NIT', viewValue: 'Número Identificación Tributaría'},
    {value: 'TI', viewValue: 'Tarjeta Identidad'},
    {value: 'PAP', viewValue: 'Pasaporte'},
  ];

  genderList: listTypes[] = [
    {value: 'M', viewValue: 'Hombre'},
    {value: 'F', viewValue: 'Mujer'},
    {value: 'O', viewValue: 'Indeterminado'}
  ];

  ethnicityList: listTypes[] = [
    {value: 'ind', viewValue: 'Indigena'},
    {value: 'afro', viewValue: 'Afrodescendiente, Afrocolombiano'},
    {value: 'git', viewValue: 'Gitano/Rrom'},
    {value: 'pal', viewValue: 'Palenquero'},
    {value: 'rai', viewValue: 'Raizal'},
    {value: 'nin', viewValue: 'Ninguno'}
  ]

  civilStatusList: listTypes[] = [
    {value: 'sol', viewValue: 'Soltero (a)'},
    {value: 'unL', viewValue: 'Unión libre'},
    {value: 'div', viewValue: 'Divorciado (a)'},
    {value: 'cas', viewValue: 'Casado (a)'},
    {value: 'viu', viewValue: 'Viudo (a)'},
  ];

  accessServiciesList: string[] = [
    'Acueducto',
    'Alcantarillado',
    'Electricidad',
    'Gas',
    'Internet fijo o móvil',
    'Televisión',
    'Telefonía fijo o móvil'
  ];

  typeDwellingList: listTypes[] = [
    {value: 'cas', viewValue: 'Casa'},
    {value: 'apt', viewValue: 'Apartamento'},
    {value: 'cua', viewValue: 'Tipo cuarto (s) en inquilinato'},
    {value: 'est', viewValue: 'Tipo cuartos (s) en otra estructura'},
    {value: 'otr', viewValue: 'otro'},
  ];

  scholarshipList: listTypes[] = [
    {value: 'pre', viewValue: 'Preescolar'},
    {value: 'pri', viewValue: 'Básica primaria'},
    {value: 'sec', viewValue: 'Básica secundaria'},
    {value: 'med', viewValue: 'Educación media'},
    {value: 'tec', viewValue: 'Técnico/tecnólogo'},
    {value: 'uni', viewValue: 'Universitario'},
    {value: 'pos', viewValue: 'Posgrado'},
    {value: 'nin', viewValue: 'Ninguno'},
  ];

  occupationList: listTypes[] = [
    {value: 'emp', viewValue: 'Empleado'},
    {value: 'ind', viewValue: 'Independiente'},
    {value: 'des', viewValue: 'Desempleado'},
    {value: 'desPan', viewValue: 'Desempleado a raíz de la pandemia'},
    {value: 'pen', viewValue: 'Pensionado'},
    {value: 'est', viewValue: 'Estudiante'},
    {value: 'cas', viewValue: 'Ama de casa '},
  ];

  workModeList: listTypes[] = [
    {value: '3', viewValue: 'Presencial'},
    {value: '4', viewValue: 'Virtual'},
    {value: '5', viewValue: 'Semipresencial'}
  ];

  socialSecurityList: listTypes[] = [
    {value: '48', viewValue: 'Empeoró'},
    {value: '49', viewValue: 'Quedó igual'},
    {value: '50', viewValue: 'Mejoró'}
  ];

  ngOnInit(): void {
    this.secundaryInfo = this._formBuilder.group({
      age: ['', Validators.required],
      gender: ['', Validators.required],
      ethnicity: ['', Validators.required],
      civilStatus: ['', Validators.required],
      residentialArea: ['', Validators.required],
      municipalityResidence: ['', Validators.required],
      accessServicies: ['', Validators.required],
      numberChildrens: ['', Validators.required],
      socialSecurity: ['', Validators.required],
      personCoexist: ['', Validators.required],
      typeDwelling: ['', Validators.required],
      scholarship: ['', Validators.required],
      dependents: ['', Validators.required],
      occupation: ['', Validators.required],
      workMode: ['', Validators.required],
    });
    this.personalInfo = this._formBuilder.group({
      firstName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondName: [''],
      secondLastName: [''],
      identification: ['', Validators.required],
      typeIdentification: ['', Validators.required],
      address: ['', Validators.required],
      cellphone: ['', Validators.required],
    });
  }
}
