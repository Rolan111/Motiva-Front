import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {QuantitativeInstrumentService} from "./quantitative-instrument.service";
import {AnswerModel} from "./answer.model";

interface ListTypes {
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
  hadCovid: number = 1;
  deadFamilyCovid: number = 1;
  armedConflict: number = 1;
  diomesticViolence: number = 1;
  mentalHealth: number = 1;
  vaccinationPosture: any;
  quinto: any;
  citiesValue: any;

  isLinear = true;

  constructor(
    private formBuilder: FormBuilder,
    private quanInstService: QuantitativeInstrumentService) {
  }

  identification: ListTypes[] = [
    {value: 'CC', viewValue: 'Cedula Ciudadanía'},
    {value: 'CE', viewValue: 'Cedula Extranjería'},
    {value: 'NIP', viewValue: 'Número Identificación Personal'},
    {value: 'NIT', viewValue: 'Número Identificación Tributaría'},
    {value: 'TI', viewValue: 'Tarjeta Identidad'},
    {value: 'PAP', viewValue: 'Pasaporte'},
  ];

  genderList: ListTypes[] = [
    {value: 'M', viewValue: 'Hombre'},
    {value: 'F', viewValue: 'Mujer'},
    {value: 'I', viewValue: 'Indeterminado'}
  ];

  ethnicityList: ListTypes[] = [
    {value: 'ind', viewValue: 'Indigena'},
    {value: 'afro', viewValue: 'Afrodescendiente, Afrocolombiano'},
    {value: 'git', viewValue: 'Gitano/Rrom'},
    {value: 'pal', viewValue: 'Palenquero'},
    {value: 'rai', viewValue: 'Raizal'},
    {value: 'nin', viewValue: 'Ninguno'}
  ]

  civilStatusList: ListTypes[] = [
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

  typeDwellingList: ListTypes[] = [
    {value: 'cas', viewValue: 'Casa'},
    {value: 'apt', viewValue: 'Apartamento'},
    {value: 'cua', viewValue: 'Tipo cuarto (s) en inquilinato'},
    {value: 'est', viewValue: 'Tipo cuartos (s) en otra estructura'},
    {value: 'otr', viewValue: 'otro'},
  ];

  scholarshipList: ListTypes[] = [
    {value: 'pre', viewValue: 'Preescolar'},
    {value: 'pri', viewValue: 'Básica primaria'},
    {value: 'sec', viewValue: 'Básica secundaria'},
    {value: 'med', viewValue: 'Educación media'},
    {value: 'tec', viewValue: 'Técnico/tecnólogo'},
    {value: 'uni', viewValue: 'Universitario'},
    {value: 'pos', viewValue: 'Posgrado'},
    {value: 'nin', viewValue: 'Ninguno'},
  ];

  occupationList: ListTypes[] = [
    {value: 'emp', viewValue: 'Empleado'},
    {value: 'ind', viewValue: 'Independiente'},
    {value: 'des', viewValue: 'Desempleado'},
    {value: 'desPan', viewValue: 'Desempleado a raíz de la pandemia'},
    {value: 'pen', viewValue: 'Pensionado'},
    {value: 'est', viewValue: 'Estudiante'},
    {value: 'cas', viewValue: 'Ama de casa '},
  ];

  workModeList: ListTypes[] = [
    {value: '3', viewValue: 'Presencial'},
    {value: '4', viewValue: 'Virtual'},
    {value: '5', viewValue: 'Semipresencial'}
  ];

  socialSecurityList: ListTypes[] = [
    {value: '48', viewValue: 'Empeoró'},
    {value: '49', viewValue: 'Quedó igual'},
    {value: '50', viewValue: 'Mejoró'}
  ];

  comorbilityList: ListTypes[] = [
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

  affectationCovidList: ListTypes[] = [
    {value: '77', viewValue: 'Leve'},
    {value: '78', viewValue: 'Moderada'},
    {value: '79', viewValue: 'Severa/Hospitalización'}
  ];

  aftermathList: ListTypes[] = [
    {value: '81', viewValue: 'Físico'},
    {value: '82', viewValue: 'Psicológico'},
    {value: '83', viewValue: 'Familiar'},
    {value: '84', viewValue: 'Laboral'},
    {value: '85', viewValue: 'Educativo'},
    {value: '86', viewValue: 'Relación de pareja'},
    {value: '0', viewValue: 'Todos los anterioles'},
  ];

  deadFamilyList: ListTypes[] = [
    {value: '87', viewValue: 'Tristeza Profunda'},
    {value: '88', viewValue: 'Culpabilidad'},
    {value: '89', viewValue: 'Confusión'},
    {value: '90', viewValue: 'Preocuoación excesiva'},
    {value: '91', viewValue: 'Resentimiento'},
    {value: '92', viewValue: 'Problemas de sueño'},
    {value: '0', viewValue: 'Todas las anteriores'},
  ];

  workCovidList: ListTypes[] = [
    {value: '93', viewValue: 'Aumento en la carga laboral'},
    {value: '104', viewValue: 'Conflictos con los compañeros'},
    {value: '94', viewValue: 'Desmotivación laboral'},
    {value: '95', viewValue: 'Reducción de salario'},
    {value: '0', viewValue: 'Todas las anteriores'},
  ];

  studentList: ListTypes[] = [
    {value: '96', viewValue: 'Aumento carga académica'},
    {value: '97', viewValue: 'Desmotivación'},
    {value: '98', viewValue: 'Falta de tiempo libre'},
    {value: '99', viewValue: 'Dificultades de entendimiento'},
    {value: '100', viewValue: 'Abandono de estudios'},
    {value: '0', viewValue: 'Todas las anteriores'},
  ];

  vaccinationPostureList: ListTypes[] = [
    {value: '101', viewValue: 'A favor'},
    {value: '102', viewValue: 'En contra'},
    {value: '103', viewValue: 'Indiferente'},
  ];

  questionsMentalHealtList: ListTypes[] = [
    {value: '41', viewValue: 'Se ha sentido triste o infeliz'},
    {value: '42', viewValue: 'Ha dormido menos de lo habitual'},
    {
      value: '43',
      viewValue: 'Le han afectado eventos inesperados en su vida o en la vida de las personas con las que se relaciona'
    },
    {
      value: '44',
      viewValue: 'Ha perdido el control y la estabilidad debido a problemas y cambios importantes en su vida'
    },
    {value: '45', viewValue: 'Ha perdido el interes en otras actividades o personas'},
    {value: '46', viewValue: 'Se ha sentido optimista y motivado(a) a pesar de sus fracasos'},
    {value: '47', viewValue: 'No ha podido concentrarse tan bien como habitualmente'},
    {value: '48', viewValue: 'Ha incrementado en consumo de alcohol u otras sustancias psicoactivas'},
    {value: '49', viewValue: 'Se ha criticado y culpado a mi mismo por todo lo malo que ha sucedido'},
    {value: '50', viewValue: 'Se ha sentido inquieto, tenso o agitado'},
    {value: '51', viewValue: 'Ha estado mas irritable de lo habitual'},
    {value: '52', viewValue: 'Ha sentido miedo y desesperanza respecto a su futuro'},
    {value: '53', viewValue: 'Todo el tiempo ha pensado en su salud y le ha preocupado adquirir una enfermedad'},
    {value: '54', viewValue: 'Se ha sentido mas cansado o fatigado de lo habitual'},
    {value: '55', viewValue: 'No ha experimentado placer por las cosas que solia disfrutar'},
    {value: '56', viewValue: 'Ha perdido el interes sexual'},
    {value: '57', viewValue: 'Se ha sentido culpable respecto de las cosas que hizo o debió hacer'},
    {value: '58', viewValue: 'Ha tenido pensamientos o deseos de matarse'},
    {
      value: '59',
      viewValue: '¿Cómo te sentiste con tu familia el tiempo que estuvieron en casa sin poder salir a causa del virus'
    },
  ];

  citiesList: ListTypes[] = [
    {value: '19001	', viewValue: '	POPAYAN'},
    {value: '19022	', viewValue: '	ALMAGUER'},
    {value: '19050	', viewValue: '	ARGELIA'},
    {value: '19075	', viewValue: '	BALBOA'},
    {value: '19100	', viewValue: '	BOLIVAR'},
    {value: '19110	', viewValue: '	BUENOS AIRES'},
    {value: '19130	', viewValue: '	CAJIBIO'},
    {value: '19137	', viewValue: '	CALDONO'},
    {value: '19142	', viewValue: '	CALOTO'},
    {value: '19212	', viewValue: '	CORINTO'},
    {value: '19256	', viewValue: '	EL TAMBO'},
    {value: '19290	', viewValue: '	FLORENCIA'},
    {value: '19300	', viewValue: '	GUACHENE'},
    {value: '19318	', viewValue: '	GUAPI'},
    {value: '19355	', viewValue: '	INZA'},
    {value: '19364	', viewValue: '	JAMBALO'},
    {value: '19392	', viewValue: '	LA SIERRA'},
    {value: '19397	', viewValue: '	LA VEGA'},
    {value: '19418	', viewValue: '	LOPEZ'},
    {value: '19450	', viewValue: '	MERCADERES'},
    {value: '19455	', viewValue: '	MIRANDA'},
    {value: '19473	', viewValue: '	MORALES'},
    {value: '19513	', viewValue: '	PADILLA'},
    {value: '19517	', viewValue: '	PAEZ'},
    {value: '19533	', viewValue: '	PIAMONTE'},
    {value: '19548	', viewValue: '	PIENDAMO'},
    {value: '19573	', viewValue: '	PUERTO TEJADA'},
    {value: '19532	', viewValue: '	PATIA'},
    {value: '19585	', viewValue: '	PURACE'},
    {value: '19622	', viewValue: '	ROSAS'},
    {value: '19693	', viewValue: '	SAN SEBASTIAN'},
    {value: '19698	', viewValue: '	SANTANDER DE QUILICHAO'},
    {value: '19701	', viewValue: '	SANTA ROSA'},
    {value: '19743	', viewValue: '	SILVIA'},
    {value: '19760	', viewValue: '	SOTARA'},
    {value: '19780	', viewValue: '	SUAREZ'},
    {value: '19785	', viewValue: '	SUCRE'},
    {value: '19807	', viewValue: '	TIMBIO'},
    {value: '19809	', viewValue: '	TIMBIQUI'},
    {value: '19821	', viewValue: '	TORIBIO'},
    {value: '19824	', viewValue: '	TOTORO'},
    {value: '19845	', viewValue: '	VILLA RICA'}
  ];

  ngOnInit(): void {
    this.secundaryInfo = this.formBuilder.group({
      age: ['', Validators.required],
      gender: ['', Validators.required],
      ethnicity: ['', Validators.required],
      civilStatus: ['', Validators.required],
      municipalityResidence: ['', Validators.required],
      accessServicies: ['', Validators.required],
      numberChildrens: ['', Validators.required],
      socialSecurity: ['', Validators.required],
      personCoexist: ['', Validators.required],
      typeDwelling: ['', Validators.required],
      scholarship: ['', Validators.required],
      dependents: ['', Validators.required],
      occupation: ['', Validators.required],
      workMode: [''],
    });
    this.personalInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondName: [''],
      secondLastName: [''],
      identification: ['', Validators.required],
      typeIdentification: ['', Validators.required],
      address: ['', Validators.required],
      cellphone: ['', Validators.required],
    });
    this.comorbidityFormGroup = this.formBuilder.group({
      disorder: ['']
    });
    this.quinto = this.formBuilder.group({});

    this.quanInstService.findAllQuestion().subscribe(response => {
      console.log('question', response)
    })

    this.quanInstService.findAll().subscribe(response => {
      console.log('answer', response.data)
    })
  }

  saveAnswer(answerForm: FormGroup) {
    let answerList: Array<AnswerModel> = [];

    let answer1: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.firstName,
      idPoll: 1,
    };

    let answer2: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.secondName,
      idPoll: 1,
    };

    let answer3: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.firstLastName,
      idPoll: 1,
    };

    let answer4: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.secondLastName,
      idPoll: 1,
    };

    let answer5: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.typeIdentification,
      idPoll: 1,
    };

    let answer6: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer7: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.address,
      idPoll: 1,
    };

    let answer8: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.cellphone,
      idPoll: 1,
    };

    let answer9: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.age,
      idPoll: 1,
    };

    let answer10: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.gender,
      idPoll: 1,
    };

    let answer11: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.ethnicity,
      idPoll: 1,
    };

    let answer12: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.civilStatus,
      idPoll: 1,
    };

    //Pendiente Zona de Residencia
    let answer13: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.zonaresidencia,
      idPoll: 1,
    };

    let answer14: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.municipalityResidence,
      idPoll: 1,
    };

    let answer15: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.accessServicies,
      idPoll: 1,
    };

    let answer16: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.numberChildrens,
      idPoll: 1,
    };

    let answer17: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.socialSecurity,
      idPoll: 1,
    };

    let answer18: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.personCoexist,
      idPoll: 1,
    };

    let answer19: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.typeDwelling,
      idPoll: 1,
    };

    let answer20: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.scholarship,
      idPoll: 1,
    };

    let answer21: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.dependents,
      idPoll: 1,
    };

    let answer22: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.occupation,
      idPoll: 1,
    };

    let answer23: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.workMode,
      idPoll: 1,
    };

    let answer24: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer25: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer26: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer27: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer28: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer29: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer30: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer31: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer32: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer33: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer34: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer35: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer36: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer37: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer38: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer39: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer40: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer41: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer42: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer43: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer44: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer45: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer46: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer47: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };


    let answer48: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer49: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer50: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer51: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer52: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer53: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer54: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer55: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer56: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer57: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer58: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer59: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer60: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer61: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer62: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer63: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer64: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer65: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer66: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    let answer67: AnswerModel = {
      idAnswer: 1,
      idQuestion: 2,
      idOptionAnswer: 0,
      openAnswer: answerForm.value.identification,
      idPoll: 1,
    };

    answerList.push(answer1)
    answerList.push(answer2)
    answerList.push(answer3)
    answerList.push(answer4)
    answerList.push(answer5)
    answerList.push(answer6)
    answerList.push(answer7)
    answerList.push(answer8)
    answerList.push(answer9)
    answerList.push(answer10)
    answerList.push(answer11)
    answerList.push(answer12)
    answerList.push(answer13)
    answerList.push(answer14)
    answerList.push(answer15)
    answerList.push(answer16)
    answerList.push(answer17)
    answerList.push(answer18)
    answerList.push(answer19)
    answerList.push(answer20)
    answerList.push(answer21)
    answerList.push(answer22)
    answerList.push(answer23)
    answerList.push(answer24)
    answerList.push(answer25)
    answerList.push(answer26)
    answerList.push(answer27)
    answerList.push(answer28)
    answerList.push(answer29)
    answerList.push(answer30)
    answerList.push(answer31)
    answerList.push(answer32)
    answerList.push(answer33)
    answerList.push(answer34)
    answerList.push(answer35)
    answerList.push(answer36)
    answerList.push(answer37)
    answerList.push(answer38)
    answerList.push(answer39)
    answerList.push(answer40)
    answerList.push(answer41)
    answerList.push(answer42)
    answerList.push(answer43)
    answerList.push(answer44)
    answerList.push(answer45)
    answerList.push(answer46)
    answerList.push(answer47)
    answerList.push(answer48)
    answerList.push(answer49)
    answerList.push(answer50)
    answerList.push(answer51)
    answerList.push(answer52)
    answerList.push(answer53)
    answerList.push(answer54)
    answerList.push(answer55)
    answerList.push(answer56)
    answerList.push(answer57)
    answerList.push(answer58)
    answerList.push(answer59)
    answerList.push(answer60)
    answerList.push(answer61)
    answerList.push(answer62)
    answerList.push(answer63)
    answerList.push(answer64)
    answerList.push(answer65)
    answerList.push(answer66)
    answerList.push(answer67)
    console.log(answerList)

    this.quanInstService.create(answerList).subscribe(response => {
      console.log(response.data)
    })
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.personalInfo.controls[controlName];
    if (!control)
      return false;

    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  isControlHasErrorSecundary(controlName: string, validationType: string): boolean {
    const control = this.secundaryInfo.controls[controlName];
    if (!control)
      return false;

    return control.hasError(validationType) && (control.dirty || control.touched);
  }
}
