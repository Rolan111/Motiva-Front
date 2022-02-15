import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  personalInfo!: FormGroup;
  secundaryInfo!: FormGroup;
  comorbidityInfo!: FormGroup;
  factors!: FormGroup;
  mentalHealthNeeds!: FormGroup;
  occupationValue: string = '';
  workOStudyModeValue: string = '';
  answerList: Array<AnswerModel> = [];
  idAnswer: number = 0;
  idPoll: number = 0;

  isLinear = false;

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

  sexList: ListTypes[] = [
    {value: '17', viewValue: 'Hombre'},
    {value: '18', viewValue: 'Mujer'},
    {value: '19', viewValue: 'Indeterminado'}
  ];

  ethnicityList: ListTypes[] = [
    {value: '20', viewValue: 'Indigena'},
    {value: '21', viewValue: 'Afrodescendiente, Afrocolombiano'},
    {value: '22', viewValue: 'Gitano/Rrom'},
    {value: '23', viewValue: 'Palenquero'},
    {value: '24', viewValue: 'Raizal'},
    {value: '25', viewValue: 'Ninguno'}
  ]

  civilStatusList: ListTypes[] = [
    {value: '26', viewValue: 'Soltero (a)'},
    {value: '27', viewValue: 'Unión libre'},
    {value: '28', viewValue: 'Divorciado (a)'},
    {value: '29', viewValue: 'Casado (a)'},
    {value: '30', viewValue: 'Viudo (a)'},
  ];

  accessServiciesList: ListTypes[] = [
    {value: '59', viewValue: 'Acueducto'},
    {value: '60', viewValue: 'Alcantarillado'},
    {value: '61', viewValue: 'Electricidad'},
    {value: '62', viewValue: 'Gas'},
    {value: '63', viewValue: 'Internet fijo o móvil'},
    {value: '64', viewValue: 'Televisión'},
    {value: '65', viewValue: 'Telefonía fijo o móvil'},
  ];

  typeHomeList: ListTypes[] = [
    {value: '53', viewValue: 'Casa'},
    {value: '54', viewValue: 'Apartamento'},
    {value: '55', viewValue: 'Tipo cuarto (s) en inquilinato'},
    {value: '56', viewValue: 'Tipo cuartos (s) en otra estructura'},
    {value: '57', viewValue: 'Vivienda tradicional indígena o étnica'},
    {value: '58', viewValue: 'otro'},
  ];

  educationLevelList: ListTypes[] = [
    {value: '31', viewValue: 'Preescolar'},
    {value: '32', viewValue: 'Básica primaria'},
    {value: '33', viewValue: 'Básica secundaria'},
    {value: '34', viewValue: 'Educación media'},
    {value: '35', viewValue: 'Técnico/tecnólogo'},
    {value: '36', viewValue: 'Universitario'},
    {value: '37', viewValue: 'Posgrado'},
    {value: '38', viewValue: 'Estudio independiente en casa'},
    {value: '39', viewValue: 'No estudia'},
    {value: '40', viewValue: 'Ninguno'},
  ];

  occupationList: ListTypes[] = [
    {value: '41', viewValue: 'Empleado'},
    {value: '42', viewValue: 'Independiente'},
    {value: '43', viewValue: 'Desempleado'},
    {value: '44', viewValue: 'Desempleado a raíz de la pandemia'},
    {value: '45', viewValue: 'Pensionado'},
    {value: '46', viewValue: 'Estudiante'},
    {value: '47', viewValue: 'Ama de casa '},
  ];

  workOStudyModeList: ListTypes[] = [
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
  ];

  deadFamilyList: ListTypes[] = [
    {value: '87', viewValue: 'Tristeza Profunda'},
    {value: '88', viewValue: 'Culpabilidad'},
    {value: '89', viewValue: 'Confusión'},
    {value: '90', viewValue: 'Preocuoación excesiva'},
    {value: '91', viewValue: 'Resentimiento'},
    {value: '92', viewValue: 'Problemas de sueño'},
  ];

  workSituationList: ListTypes[] = [
    {value: '93', viewValue: 'Aumento de carga laboral'},
    {value: '16', viewValue: 'Conflictos con los compañeros'},
    {value: '94', viewValue: 'Desmotivación laboral'},
    {value: '95', viewValue: 'Reducción de salario'},
  ];

  academySituationList: ListTypes[] = [
    {value: '96', viewValue: 'Aumento carga académica'},
    {value: '97', viewValue: 'Desmotivación'},
    {value: '98', viewValue: 'Falta de tiempo libre'},
    {value: '99', viewValue: 'Dificultades de entendimiento'},
    {value: '100', viewValue: 'Abandono de estudios'},
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
    {value: '56', viewValue: 'Ha perdido interes en el sexo'},
    {value: '57', viewValue: 'Se ha sentido culpable respecto de las cosas que hizo o debió hacer'},
    {value: '58', viewValue: 'Ha tenido pensamientos o deseos de matarse'},
    {
      value: '59',
      viewValue: '¿Cómo te sentiste con tu familia el tiempo que estuvieron en casa sin poder salir a causa del virus'
    },
  ];

  citiesList: ListTypes[] = [
    {value: '19001', viewValue: 'POPAYAN'},
    {value: '19022', viewValue: 'ALMAGUER'},
    {value: '19050', viewValue: 'ARGELIA'},
    {value: '19075', viewValue: 'BALBOA'},
    {value: '19100', viewValue: 'BOLIVAR'},
    {value: '19110', viewValue: 'BUENOS AIRES'},
    {value: '19130', viewValue: 'CAJIBIO'},
    {value: '19137', viewValue: 'CALDONO'},
    {value: '19142', viewValue: 'CALOTO'},
    {value: '19212', viewValue: 'CORINTO'},
    {value: '19256', viewValue: 'EL TAMBO'},
    {value: '19290', viewValue: 'FLORENCIA'},
    {value: '19300', viewValue: 'GUACHENE'},
    {value: '19318', viewValue: 'GUAPI'},
    {value: '19355', viewValue: 'INZA'},
    {value: '19364', viewValue: 'JAMBALO'},
    {value: '19392', viewValue: 'LA SIERRA'},
    {value: '19397', viewValue: 'LA VEGA'},
    {value: '19418', viewValue: 'LOPEZ'},
    {value: '19450', viewValue: 'MERCADERES'},
    {value: '19455', viewValue: 'MIRANDA'},
    {value: '19473', viewValue: 'MORALES'},
    {value: '19513', viewValue: 'PADILLA'},
    {value: '19517', viewValue: 'PAEZ'},
    {value: '19533', viewValue: 'PIAMONTE'},
    {value: '19548', viewValue: 'PIENDAMO'},
    {value: '19573', viewValue: 'PUERTO TEJADA'},
    {value: '19532', viewValue: 'PATIA'},
    {value: '19585', viewValue: 'PURACE'},
    {value: '19622', viewValue: 'ROSAS'},
    {value: '19693', viewValue: 'SAN SEBASTIAN'},
    {value: '19698', viewValue: 'SANTANDER DE QUILICHAO'},
    {value: '19701', viewValue: 'SANTA ROSA'},
    {value: '19743', viewValue: 'SILVIA'},
    {value: '19760', viewValue: 'SOTARA'},
    {value: '19780', viewValue: 'SUAREZ'},
    {value: '19785', viewValue: 'SUCRE'},
    {value: '19807', viewValue: 'TIMBIO'},
    {value: '19809', viewValue: 'TIMBIQUI'},
    {value: '19821', viewValue: 'TORIBIO'},
    {value: '19824', viewValue: 'TOTORO'},
    {value: '19845', viewValue: 'VILLA RICA'}
  ];

  commonAnswerList: ListTypes[] = [
    {value: '6', viewValue: 'Mucho'},
    {value: '7', viewValue: 'Algo'},
    {value: '8', viewValue: 'Poco'},
    {value: '9', viewValue: 'Nunca/Nada'},
  ]

  ngOnInit(): void {
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

    this.secundaryInfo = this.formBuilder.group({
      age: ['', Validators.required],
      sex: ['', Validators.required],
      ethnicity: ['', Validators.required],
      civilStatus: ['', Validators.required],
      municipalityResidence: ['', Validators.required],
      accessServicies: ['', Validators.required],
      numberChildren: ['', Validators.required],
      socialSecurity: ['', Validators.required],
      personCoexist: ['', Validators.required],
      typeHome: ['', Validators.required],
      educationLevel: ['', Validators.required],
      dependents: ['', Validators.required],
      occupation: ['', Validators.required],
      workOStudyMode: [''],
      zoneResidence: [''],
    });

    this.comorbidityInfo = this.formBuilder.group({
      comorbilities: this.formBuilder.array([]),
      anyDiagnostic: [''],
      illnessHistory: [''],
      disability: [''],
    })

    this.factors = this.formBuilder.group({
      hadCovid: [''],
      affectationCovid: [''],
      aftermath: [''],
      deadFamilyCovid: [''],
      deadFamily: [''],
      workSituation: [''],
      studentSituation: [''],
      conflictVictim: [''],
      diomesticViolence: [''],
      mentalHealth: [''],
      vaccinationPosture: [''],
    });

    this.mentalHealthNeeds = this.formBuilder.group({
      one: [''],
      two: [''],
      three: [''],
      four: [''],
      five: [''],
      six: [''],
      seven: [''],
      eight: [''],
      nine: [''],
      ten: [''],
      eleven: [''],
      twelve: [''],
      thirteen: [''],
      fourteen: [''],
      fifteen: [''],
      sixteen: [''],
      seventeen: [''],
      eighteen: [''],
      nineteen: [''],
    });

    this.quanInstService.findAllQuestions("ADULT").subscribe(response => {
      console.log('question', response)
    })

    this.quanInstService.findAll().subscribe(response => {
      console.log('answer', response.data)
    })

    this.quanInstService.getLastSequence().subscribe(reponse => {
      console.log(reponse.data)
      this.idAnswer = reponse.data.idAnswer;
      this.idPoll = reponse.data.idPoll;

      console.log('answer', this.idAnswer)
      console.log('poll', this.idPoll)
    })
  }

  saveAnswerPersonalInfo(answerForm: FormGroup) {
    let answer1: AnswerModel = {
      idAnswer: this.idAnswer + 1,
      idQuestion: 2,
      idOptionAnswers: [],
      openAnswer: answerForm.value.firstName,
      idPoll: this.idAnswer + 1,
    };

    let answer2: AnswerModel = {
      idAnswer: this.idAnswer + 2,
      idQuestion: 1,
      idOptionAnswers: [],
      openAnswer: answerForm.value.secondName,
      idPoll: this.idAnswer + 1,
    };

    let answer3: AnswerModel = {
      idAnswer: this.idAnswer + 3,
      idQuestion: 3,
      idOptionAnswers: [],
      openAnswer: answerForm.value.firstLastName,
      idPoll: this.idAnswer + 1,
    };

    let answer4: AnswerModel = {
      idAnswer: this.idAnswer + 4,
      idQuestion: 1,
      idOptionAnswers: [],
      openAnswer: answerForm.value.secondLastName,
      idPoll: this.idAnswer + 1,
    };

    let answer5: AnswerModel = {
      idAnswer: this.idAnswer + 5,
      idQuestion: 4,
      idOptionAnswers: [],
      openAnswer: answerForm.value.typeIdentification,
      idPoll: this.idAnswer + 1,
    };

    let answer6: AnswerModel = {
      idAnswer: this.idAnswer + 6,
      idQuestion: 5,
      idOptionAnswers: [],
      openAnswer: answerForm.value.identification,
      idPoll: this.idAnswer + 1,
    };

    let answer7: AnswerModel = {
      idAnswer: this.idAnswer + 7,
      idQuestion: 1,
      idOptionAnswers: [],
      openAnswer: answerForm.value.address,
      idPoll: this.idAnswer + 1,
    };

    let answer8: AnswerModel = {
      idAnswer: this.idAnswer + 8,
      idQuestion: 8,
      idOptionAnswers: [],
      openAnswer: answerForm.value.cellphone,
      idPoll: this.idAnswer + 1,
    };

    this.answerList.push(answer1)
    this.answerList.push(answer2)
    this.answerList.push(answer3)
    this.answerList.push(answer4)
    this.answerList.push(answer5)
    this.answerList.push(answer6)
    this.answerList.push(answer7)
    this.answerList.push(answer8)
  }

  saveAnswerSecundaryInfo(answerForm: FormGroup) {
    let answer9: AnswerModel = {
      idAnswer: this.idAnswer + 9,
      idQuestion: 9,
      idOptionAnswers: [],
      openAnswer: answerForm.value.age,
      idPoll: this.idAnswer + 1,
    };

    let answer10: AnswerModel = {
      idAnswer: this.idAnswer + 10,
      idQuestion: 7,
      idOptionAnswers: [answerForm.value.sex],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer11: AnswerModel = {
      idAnswer: this.idAnswer + 11,
      idQuestion: 10,
      idOptionAnswers: [answerForm.value.ethnicity],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer12: AnswerModel = {
      idAnswer: this.idAnswer + 12,
      idQuestion: 11,
      idOptionAnswers: [answerForm.value.civilStatus],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer13: AnswerModel = {
      idAnswer: this.idAnswer + 13,
      idQuestion: 19,
      idOptionAnswers: [answerForm.value.zoneResidence],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer14: AnswerModel = {
      idAnswer: this.idAnswer + 14,
      idQuestion: 18,
      idOptionAnswers: [],
      openAnswer: answerForm.value.municipalityResidence,
      idPoll: this.idAnswer + 1,
    };

    let answer15: AnswerModel = {
      idAnswer: this.idAnswer + 15,
      idQuestion: 12,
      idOptionAnswers: [],
      openAnswer: answerForm.value.personCoexist,
      idPoll: this.idAnswer + 1,
    };

    let answer16: AnswerModel = {
      idAnswer: this.idAnswer + 16,
      idQuestion: 20,
      idOptionAnswers: [answerForm.value.typeHome],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer17: AnswerModel = {
      idAnswer: this.idAnswer + 17,
      idQuestion: 21,
      idOptionAnswers: answerForm.value.accessServicies,
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer18: AnswerModel = {
      idAnswer: this.idAnswer + 18,
      idQuestion: 13,
      idOptionAnswers: [answerForm.value.educationLevel],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer19: AnswerModel = {
      idAnswer: this.idAnswer + 19,
      idQuestion: 14,
      idOptionAnswers: [answerForm.value.occupation],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer20: AnswerModel = {
      idAnswer: this.idAnswer + 20,
      idQuestion: 15,
      idOptionAnswers: [answerForm.value.workOStudyMode],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer21: AnswerModel = {
      idAnswer: this.idAnswer + 21,
      idQuestion: 16,
      idOptionAnswers: [answerForm.value.workOStudyMode],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer22: AnswerModel = {
      idAnswer: this.idAnswer + 22,
      idQuestion: 17,
      idOptionAnswers: [answerForm.value.occupation],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer23: AnswerModel = {
      idAnswer: this.idAnswer + 23,
      idQuestion: 22,
      idOptionAnswers: [],
      openAnswer: answerForm.value.numberChildren,
      idPoll: this.idAnswer + 1,
    };

    let answer24: AnswerModel = {
      idAnswer: this.idAnswer + 24,
      idQuestion: 23,
      idOptionAnswers: [],
      openAnswer: answerForm.value.dependents,
      idPoll: this.idAnswer + 1,
    };

    console.log('hdkjshdkja',this.answerList)

    this.answerList.push(answer9)
    this.answerList.push(answer10)
    this.answerList.push(answer11)
    this.answerList.push(answer12)
    this.answerList.push(answer13)
    this.answerList.push(answer14)
    this.answerList.push(answer15)
    this.answerList.push(answer16)
    this.answerList.push(answer17)
    this.answerList.push(answer18)
    this.answerList.push(answer19)
    this.answerList.push(answer20)
    this.answerList.push(answer21)
    this.answerList.push(answer22)
    this.answerList.push(answer23)
    this.answerList.push(answer24)
  }

  saveAnswerComorbidity(answerForm: FormGroup) {
    let answer25: AnswerModel = {
      idAnswer: this.idAnswer + 25,
      idQuestion: 24,
      idOptionAnswers: answerForm.value.comorbilities,
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer26: AnswerModel = {
      idAnswer: this.idAnswer + 26,
      idQuestion: 25,
      idOptionAnswers: [],
      openAnswer: answerForm.value.anyDiagnostic,
      idPoll: this.idAnswer + 1,
    };

    let answer27: AnswerModel = {
      idAnswer: this.idAnswer + 27,
      idQuestion: 27,
      idOptionAnswers: [],
      openAnswer: answerForm.value.illnessHistory ? "SI" : "NO",
      idPoll: this.idAnswer + 1,
    };

    let answer28: AnswerModel = {
      idAnswer: this.idAnswer + 28,
      idQuestion: 28,
      idOptionAnswers: [],
      openAnswer: answerForm.value.disability,
      idPoll: this.idAnswer + 1,
    };

    this.answerList.push(answer25)
    this.answerList.push(answer26)
    this.answerList.push(answer27)
    this.answerList.push(answer28)
  }

  saveAnswerFactor(answerForm: FormGroup) {
    console.log(answerForm.value)

    let answer29: AnswerModel = {
      idAnswer: this.idAnswer + 29,
      idQuestion: 30,
      idOptionAnswers: [answerForm.value.hadCovid],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer30: AnswerModel = {
      idAnswer: this.idAnswer + 30,
      idQuestion: 31,
      idOptionAnswers: [],
      openAnswer: answerForm.value.affectationCovid,
      idPoll: this.idAnswer + 1,
    };

    let answer31: AnswerModel = {
      idAnswer: this.idAnswer + 31,
      idQuestion: 32,
      idOptionAnswers: answerForm.value.aftermath,
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer32: AnswerModel = {
      idAnswer: this.idAnswer + 32,
      idQuestion: 33,
      idOptionAnswers: [],
      openAnswer: answerForm.value.deadFamilyCovid,
      idPoll: this.idAnswer + 1,
    };

    let answer33: AnswerModel = {
      idAnswer: this.idAnswer + 33,
      idQuestion: 34,
      idOptionAnswers: answerForm.value.deadFamily,
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer34: AnswerModel = {
      idAnswer: this.idAnswer + 34,
      idQuestion: 35,
      idOptionAnswers: answerForm.value.workSituation,
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer35: AnswerModel = {
      idAnswer: this.idAnswer + 35,
      idQuestion: 36,
      idOptionAnswers: answerForm.value.studentSituation,
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer36: AnswerModel = {
      idAnswer: this.idAnswer + 36,
      idQuestion: 37,
      idOptionAnswers: [],
      openAnswer: answerForm.value.conflictVictim,
      idPoll: this.idAnswer + 1,
    };

    let answer37: AnswerModel = {
      idAnswer: this.idAnswer + 37,
      idQuestion: 38,
      idOptionAnswers: [],
      openAnswer: answerForm.value.diomesticViolence,
      idPoll: this.idAnswer + 1,
    };

    let answer38: AnswerModel = {
      idAnswer: this.idAnswer + 38,
      idQuestion: 39,
      idOptionAnswers: [],
      openAnswer: answerForm.value.mentalHealth,
      idPoll: this.idAnswer + 1,
    };

    let answer39: AnswerModel = {
      idAnswer: this.idAnswer + 39,
      idQuestion: 40,
      idOptionAnswers: [],
      openAnswer: answerForm.value.vaccinationPosture,
      idPoll: this.idAnswer + 1,
    };

    this.answerList.push(answer29)
    this.answerList.push(answer30)
    this.answerList.push(answer31)
    this.answerList.push(answer32)
    this.answerList.push(answer33)
    this.answerList.push(answer34)
    this.answerList.push(answer35)
    this.answerList.push(answer36)
    this.answerList.push(answer37)
    this.answerList.push(answer38)
    this.answerList.push(answer39)
  }

  saveMentalHealthNeeds(answerForm: FormGroup) {
    let answer40: AnswerModel = {
      idAnswer: this.idAnswer + 40,
      idQuestion: 41,
      idOptionAnswers: [answerForm.value.one],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer41: AnswerModel = {
      idAnswer: this.idAnswer + 41,
      idQuestion: 42,
      idOptionAnswers: [answerForm.value.two],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer42: AnswerModel = {
      idAnswer: this.idAnswer + 42,
      idQuestion: 43,
      idOptionAnswers: [answerForm.value.three],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer43: AnswerModel = {
      idAnswer: this.idAnswer + 43,
      idQuestion: 44,
      idOptionAnswers: [answerForm.value.four],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer44: AnswerModel = {
      idAnswer: this.idAnswer + 44,
      idQuestion: 45,
      idOptionAnswers: [answerForm.value.five],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer45: AnswerModel = {
      idAnswer: this.idAnswer + 45,
      idQuestion: 46,
      idOptionAnswers: [answerForm.value.six],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer46: AnswerModel = {
      idAnswer: this.idAnswer + 46,
      idQuestion: 47,
      idOptionAnswers: [answerForm.value.seven],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer47: AnswerModel = {
      idAnswer: this.idAnswer + 47,
      idQuestion: 47,
      idOptionAnswers: [answerForm.value.eight],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer48: AnswerModel = {
      idAnswer: this.idAnswer + 48,
      idQuestion: 49,
      idOptionAnswers: [answerForm.value.nine],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer49: AnswerModel = {
      idAnswer: this.idAnswer + 49,
      idQuestion: 50,
      idOptionAnswers: [answerForm.value.ten],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer50: AnswerModel = {
      idAnswer: this.idAnswer + 50,
      idQuestion: 51,
      idOptionAnswers: [answerForm.value.eleven],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer51: AnswerModel = {
      idAnswer: this.idAnswer + 51,
      idQuestion: 52,
      idOptionAnswers: [answerForm.value.twelve],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer52: AnswerModel = {
      idAnswer: this.idAnswer + 52,
      idQuestion: 53,
      idOptionAnswers: [answerForm.value.thirteen],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer53: AnswerModel = {
      idAnswer: this.idAnswer + 53,
      idQuestion: 54,
      idOptionAnswers: [answerForm.value.fourteen],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer54: AnswerModel = {
      idAnswer: this.idAnswer + 54,
      idQuestion: 55,
      idOptionAnswers: [answerForm.value.fifteen],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer55: AnswerModel = {
      idAnswer: this.idAnswer + 55,
      idQuestion: 56,
      idOptionAnswers: [answerForm.value.sixteen],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer56: AnswerModel = {
      idAnswer: this.idAnswer + 56,
      idQuestion: 57,
      idOptionAnswers: [answerForm.value.seventeen],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer57: AnswerModel = {
      idAnswer: this.idAnswer + 57,
      idQuestion: 58,
      idOptionAnswers: [answerForm.value.eighteen],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    let answer58: AnswerModel = {
      idAnswer: this.idAnswer + 58,
      idQuestion: 59,
      idOptionAnswers: [answerForm.value.nineteen],
      openAnswer: '',
      idPoll: this.idAnswer + 1,
    };

    this.answerList.push(answer40)
    this.answerList.push(answer41)
    this.answerList.push(answer42)
    this.answerList.push(answer43)
    this.answerList.push(answer44)
    this.answerList.push(answer45)
    this.answerList.push(answer46)
    this.answerList.push(answer47)
    this.answerList.push(answer48)
    this.answerList.push(answer49)
    this.answerList.push(answer50)
    this.answerList.push(answer51)
    this.answerList.push(answer52)
    this.answerList.push(answer53)
    this.answerList.push(answer54)
    this.answerList.push(answer55)
    this.answerList.push(answer56)
    this.answerList.push(answer57)
    this.answerList.push(answer58)

    this.quanInstService.createAnswer(this.answerList).subscribe(response => {
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

  isControlHasErrorComorbidity(controlName: string, validationType: string): boolean {
    const control = this.comorbidityInfo.controls[controlName];
    if (!control)
      return false;

    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  onCheckboxChange(event: any) {
    const comorbilities = <FormArray>this.comorbidityInfo.get('comorbilities') as FormArray;

    if (event.checked) {
      comorbilities.push(new FormControl(event.source.value))
    } else {
      const i = comorbilities.controls.findIndex(x => x.value === event.source.value);
      comorbilities.removeAt(i);
    }
  }
}
