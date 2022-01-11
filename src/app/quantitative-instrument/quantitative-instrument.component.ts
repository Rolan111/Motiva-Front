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
  comorbidityFormGroup!: FormGroup;
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
  hadCovid: any;
  deadFamilyCovid: any;
  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private quanInstService: QuantitativeInstrumentService) {
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

  comorbilityList: listTypes[] = [
    {value: '66', viewValue: 'Hipertensión'},
    {value: '67', viewValue: 'Asma'},
    {value: '68', viewValue: 'EPOC'},
    {value: '69', viewValue: 'Diabetes'},
    {value: '70', viewValue: 'Enfermedades del corazón'},
    {value: '71', viewValue: 'Enfermedades del riñon'},
    {value: '72', viewValue: 'Obesidad o sobrepeso'},
    {value: '73', viewValue: 'Usa medicamentos'},
    {value: '74', viewValue: 'VIH'},
    {value: '75', viewValue: 'Hipo-Hipertironismo'},
    {value: '76', viewValue: 'Cáncer'},
  ];

  affectationCovidList: listTypes[] = [
    {value: '77', viewValue: 'Leve'},
    {value: '78', viewValue: 'Moderada'},
    {value: '79', viewValue: 'Severa/Hospitalización'}
  ];

  aftermathList: listTypes[] = [
    {value: '81', viewValue: 'Físico'},
    {value: '82', viewValue: 'Psicológico'},
    {value: '83', viewValue: 'Familiar'},
    {value: '84', viewValue: 'Laboral'},
    {value: '85', viewValue: 'Educativo'},
    {value: '86', viewValue: 'Relación de pareja'},
    {value: '0', viewValue: 'Todos los anterioles'},
  ];

  deadFamilyList: listTypes[] = [
    {value: '87', viewValue: 'Tristeza Profunda'},
    {value: '88', viewValue: 'Culpabilidad'},
    {value: '89', viewValue: 'Confusión'},
    {value: '90', viewValue: 'Preocuoación excesiva'},
    {value: '91', viewValue: 'Resentimiento'},
    {value: '92', viewValue: 'Problemas de sueño'},
    {value: '0', viewValue: 'Todas las anteriores'},
  ];

  workCovidList: listTypes[] = [
    {value: '93', viewValue: 'Aumento en la carga laboral'},
    {value: '104', viewValue: 'Conflictos con los compañeros'},
    {value: '94', viewValue: 'Desmotivación laboral'},
    {value: '95', viewValue: 'Reducción de salario'},
    {value: '0', viewValue: 'Todas las anteriores'},
  ];

  studentList: listTypes[] = [
    {value: '96', viewValue: 'Aumento carga académica'},
    {value: '97', viewValue: 'Desmotivación'},
    {value: '98', viewValue: 'Falta de tiempo libre'},
    {value: '99', viewValue: 'Dificultades de entendimiento'},
    {value: '100', viewValue: 'Abandono de estudios'},
    {value: '0', viewValue: 'Todas las anteriores'},
  ];


  vaccinationPostureList: listTypes[] = [
    {value: '101', viewValue: 'A favor'},
    {value: '102', viewValue: 'En contra'},
    {value: '103', viewValue: 'Indiferente'},
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
    this.comorbidityFormGroup = this._formBuilder.group({
      disorder:['']
    });
  }
}
