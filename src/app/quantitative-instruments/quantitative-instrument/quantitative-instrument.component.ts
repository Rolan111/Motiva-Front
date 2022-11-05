import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuantitativeInstrumentService} from "../quantitative-instrument.service";
import {AnswerModel} from "../answer.model";
import {Question} from "../question.model";
import {OptionAnswer} from "../option-answer.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PollModel} from "../poll.model";
import {AlertModel} from "../alert.model";
import {CareSheetService} from "../../care-sheet/care-sheet.service";
import { nanoid } from 'nanoid'
import { arrayMunicipios } from "../../enums/enum";
import {timeout, timer} from "rxjs";

interface ListTypes {
  viewValue: string;
}

@Component({
  selector: 'app-quantitative-instrument',
  templateUrl: './quantitative-instrument.component.html',
  styleUrls: ['./quantitative-instrument.component.scss']
})
export class QuantitativeInstrumentComponent implements OnInit {

  //Ng-model
  occupationValue: number = 0;

  maxDate = new Date();



  //Control for last form - mentalHealthNeeds-
  contadoclicks = 0;
  firstGroup = 0;
  bvariable = 0;


  //Declaración de las colecciones de formularios
  personalInfo!: FormGroup;
  sociodemographicFactors!: FormGroup;
  comorbidityInfo!: FormGroup;
  factorsCovid19!: FormGroup;
  mentalHealthNeeds!: FormGroup;

  //Variables para cada formulario
  answerList: Array<AnswerModel> = []; //Array que guardará las respuestas de todos los formularios

  idAnswer: number = 0;
  // idPoll: number = 0;
  idPoll!: string;
  questions: Array<Question> = [];
  hadCovid: number = 0;
  deadFamilyCovid: number = 0;
  score: number = 0;

  typeIdentificationQuestion: Question[] = [];
  sexQuestion: Question[] = [];
  ethnicityQuestion: Question[] = [];
  civilStatus: Question[] = [];
  typeHome: Question[] = [];
  accessServicies: Question[] = [];
  educationLevel: Question[] = [];
  occupation: Question[] = [];
  workMode: Question[] = [];
  socialSecurity: Question[] = [];
  comorbilities: Question[] = [];
  affectationCovid: Question[] = [];
  aftermath: Question[] = [];
  mentalHealthNeedsQuestions: Question[] = [];

  typeIdentificationList: Array<OptionAnswer> = [];
  sexList: Array<OptionAnswer> = [];
  ethnicityList: Array<OptionAnswer> = [];
  civilStatusList: Array<OptionAnswer> = [];
  typeHomeList: Array<OptionAnswer> = [];
  accessServiciesList: Array<OptionAnswer> = [];
  educationLevelList: Array<OptionAnswer> = [];
  occupationList: Array<OptionAnswer> = [];
  workModeList: Array<OptionAnswer> = [];
  socialSecurityList: Array<OptionAnswer> = [];
  comorbilitiesList: Array<OptionAnswer> = [];
  affectationCovidList: Array<OptionAnswer> = [];
  aftermathList: Array<OptionAnswer> = [];
  deadFamilyList: Array<OptionAnswer> = [];
  workSituationList: Array<OptionAnswer> = [];
  studentSituationList: Array<OptionAnswer> = [];

  oneList: Array<OptionAnswer> = [];
  twoList: Array<OptionAnswer> = [];
  threeList: Array<OptionAnswer> = [];
  fourList: Array<OptionAnswer> = [];
  fiveList: Array<OptionAnswer> = [];
  sixList: Array<OptionAnswer> = [];
  sevenList: Array<OptionAnswer> = [];
  eightList: Array<OptionAnswer> = [];
  nineList: Array<OptionAnswer> = [];
  tenList: Array<OptionAnswer> = [];
  elevenList: Array<OptionAnswer> = [];
  twelveList: Array<OptionAnswer> = [];
  thirteenList: Array<OptionAnswer> = [];
  fourteenList: Array<OptionAnswer> = [];
  fifteenList: Array<OptionAnswer> = [];
  sixteenList: Array<OptionAnswer> = [];
  seventeenList: Array<OptionAnswer> = [];
  eighteenList: Array<OptionAnswer> = [];
  nineteenList: Array<OptionAnswer> = [];

  constructor(
    private careSheetService: CareSheetService,
    private formBuilder: FormBuilder,
    private quanInstService: QuantitativeInstrumentService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
  }

  citiesList:ListTypes[] = arrayMunicipios;

  ngOnInit(): void {

    this.formQuantitative();
    this.personalInfo.get('applicationDate')?.setValue(new Date().toLocaleDateString())
    this.quanInstService.findAllQuestions('ADULT').subscribe(response => {
      this.questions = response.data;
    })
    this.quanInstService.getLastSequence().subscribe(response => {
      this.idAnswer = response.data.idAnswer;
      // this.idPoll = response.data.idPoll;
      this.idPoll=nanoid(10);
      console.log('EL ID POLL ES', this.idPoll)
    })

    this.addValidatorWorkMode();
    this.addValidatorAffectationCovid();
    this.addValidatorDeadFamilyCovid();
    this.addValidatorWorkSituation();

  }

    /* Captura de información de los FORMULARIOS */
  private formQuantitative() {

    //Formulario Información personal
    this.personalInfo = this.formBuilder.group({
      applicationDate: ['', Validators.required],
      firstName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondName: [''],
      secondLastName: [''],
      typeIdentification: ['', Validators.required],
      identification: ['', Validators.required],
      address: ['', Validators.required],
      cellphone: ['', Validators.required],
    });

    //Formulario Factores Sociodemográficos
    this.sociodemographicFactors = this.formBuilder.group({
      age: ['', Validators.required],
      sex: ['', Validators.required],
      ethnicity: ['', Validators.required],
      civilStatus: ['', Validators.required],
      zoneResidence: ['', Validators.required],
      municipalityResidence: ['', Validators.required],
      personCoexist: ['', Validators.required],
      typeHome: ['', Validators.required],
      accessServicies: ['', Validators.required],
      educationLevel: ['', Validators.required],
      occupation: new FormControl('', [Validators.required]),
      workMode: [''],
      socialSecurity: ['', Validators.required],
      numberChildren: ['', Validators.required],
      dependents: ['', Validators.required],

    });

    //Formulario Comorbilidades, trastornos y enfermedades preexistentes
    this.comorbidityInfo = this.formBuilder.group({
      comorbilities: this.formBuilder.array([]),
      historyMentalIllness: [''],
      disabilityPhysicalMental: [''],
    })

    //Formulario Factores contextuales asociados al COVID-19
    this.factorsCovid19 = this.formBuilder.group({
      // hadCovid: new FormControl(null, Validators.required),
      hadCovid: ['', Validators.required],
      affectationCovid: [[]],
      aftermath: ['', Validators.required],
      // deadFamilyCovid: new FormControl(null, Validators.required),
      deadFamilyCovid: ['', Validators.required],
      deadFamilySymptom: [[]],
      workSituation: [[]],
      studentSituation: [[]],
      conflictVictim: ['', Validators.required],
      diomesticViolence: ['', Validators.required],
      mentalHealth: ['', Validators.required],
      vaccinationPosture: ['', Validators.required],
    });

    //Necesidades en salud mental asociadas al Covid-19
    this.mentalHealthNeeds = this.formBuilder.group({
      one: ['', Validators.required],
      two: ['', Validators.required],
      three: ['', Validators.required],
      four: ['', Validators.required],
      five: ['', Validators.required],
      six: ['', Validators.required],
      seven: ['', Validators.required],
      eight: ['', Validators.required],
      nine: ['', Validators.required],
      ten: ['', Validators.required],
      eleven: ['', Validators.required],
      twelve: ['', Validators.required],
      thirteen: ['', Validators.required],
      fourteen: ['', Validators.required],
      fifteen: ['', Validators.required],
      sixteen: ['', Validators.required],
      seventeen: ['', Validators.required],
      eighteen: [0, Validators.required],
      nineteen: ['', Validators.required],
    });
  }

  //*** Empieza el proceso de GUARDADO ***

  //1 En cada método se pasan los datos de los diferentes formularios al modelo de la tabla ANSWER
    // Posteriormente en cada método se guarda en en array "answerList" todas las respuestas obtenidas de todos los formularios
  saveAnswerPersonalInfo(answerForm: FormGroup) {
    let answer0: AnswerModel = {
      idAnswer: this.idAnswer,
      idQuestion: 102,
      idOptionAnswers: [],
      openAnswer: answerForm.value.applicationDate,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };
    let answer1: AnswerModel = {
      idAnswer: this.idAnswer,
      idQuestion: 200,
      idOptionAnswers: [],
      openAnswer: answerForm.value.firstName,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer2: AnswerModel = {
      idAnswer: this.idAnswer + 1,
      idQuestion: 201,
      idOptionAnswers: [],
      openAnswer: answerForm.value.secondName,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer3: AnswerModel = {
      idAnswer: this.idAnswer + 2,
      idQuestion: 202,
      idOptionAnswers: [],
      openAnswer: answerForm.value.firstLastName,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer4: AnswerModel = {
      idAnswer: this.idAnswer + 3,
      idQuestion: 203,
      idOptionAnswers: [],
      openAnswer: answerForm.value.secondLastName,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer5: AnswerModel = {
      idAnswer: this.idAnswer + 4,
      idQuestion: 204,
      idOptionAnswers: [answerForm.value.typeIdentification],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer6: AnswerModel = {
      idAnswer: this.idAnswer + 5,
      idQuestion: 205,
      idOptionAnswers: [],
      openAnswer: answerForm.value.identification,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer7: AnswerModel = {
      idAnswer: this.idAnswer + 6,
      idQuestion: 206,
      idOptionAnswers: [],
      openAnswer: answerForm.value.address,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer8: AnswerModel = {
      idAnswer: this.idAnswer + 7,
      idQuestion: 207,
      idOptionAnswers: [],
      openAnswer: answerForm.value.cellphone,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    this.answerList.push(answer0,answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8)
  }

  saveAnswerSociodemographicFactors(answerForm: FormGroup) {
    let answer9: AnswerModel = {
      idAnswer: this.idAnswer + 8,
      idQuestion: 1,
      idOptionAnswers: [],
      openAnswer: answerForm.value.age,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer10: AnswerModel = {
      idAnswer: this.idAnswer + 9,
      idQuestion: 2,
      idOptionAnswers: [answerForm.value.sex],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: answerForm.value.sex == 2 ? 2 : 0,
    };

    let answer11: AnswerModel = {
      idAnswer: this.idAnswer + 10,
      idQuestion: 3,
      idOptionAnswers: [answerForm.value.ethnicity],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer12: AnswerModel = {
      idAnswer: this.idAnswer + 11,
      idQuestion: 4,
      idOptionAnswers: [answerForm.value.civilStatus],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer13: AnswerModel = {
      idAnswer: this.idAnswer + 12,
      idQuestion: 5,
      idOptionAnswers: [answerForm.value.zoneResidence],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: answerForm.value.zoneResidence == 15 ? 2 : 0,
    };

    let answer14: AnswerModel = {
      idAnswer: this.idAnswer + 13,
      idQuestion: 6,
      idOptionAnswers: [],
      openAnswer: answerForm.value.municipalityResidence,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer15: AnswerModel = {
      idAnswer: this.idAnswer + 14,
      idQuestion: 7,
      idOptionAnswers: [],
      openAnswer: answerForm.value.personCoexist,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer16: AnswerModel = {
      idAnswer: this.idAnswer + 15,
      idQuestion: 8,
      idOptionAnswers: [answerForm.value.typeHome],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer17: AnswerModel = {
      idAnswer: this.idAnswer + 16,
      idQuestion: 9,
      idOptionAnswers: answerForm.value.accessServicies,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer18: AnswerModel = {
      idAnswer: this.idAnswer + 17,
      idQuestion: 10,
      idOptionAnswers: [answerForm.value.educationLevel],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer19: AnswerModel = {
      idAnswer: this.idAnswer + 18,
      idQuestion: 11,
      idOptionAnswers: [answerForm.value.occupation],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer20: AnswerModel = {
      idAnswer: this.idAnswer + 19,
      idQuestion: 12,
      idOptionAnswers: [answerForm.value.workMode],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer21: AnswerModel = {
      idAnswer: this.idAnswer + 20,
      idQuestion: 13,
      idOptionAnswers: [answerForm.value.socialSecurity],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer22: AnswerModel = {
      idAnswer: this.idAnswer + 21,
      idQuestion: 14,
      idOptionAnswers: [],
      openAnswer: answerForm.value.numberChildren,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer23: AnswerModel = {
      idAnswer: this.idAnswer + 22,
      idQuestion: 15,
      idOptionAnswers: [],
      openAnswer: answerForm.value.dependents,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    this.answerList.push(answer9, answer10, answer11, answer12, answer13, answer14, answer15, answer16, answer17, answer18,
      answer19, answer20, answer21, answer22, answer23)
  }

  saveAnswerComorbidityInfo(answerForm: FormGroup) {
    let answer24: AnswerModel = {
      idAnswer: this.idAnswer + 23,
      idQuestion: 16,
      idOptionAnswers: answerForm.value.comorbilities,
      openAnswer: 'Enfermedad: ',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer25: AnswerModel = {
      idAnswer: this.idAnswer + 24,
      idQuestion: 16,
      idOptionAnswers: [],
      openAnswer: 'Diagnosticado con algún trastorno o enfermedad menta: ' + answerForm.value.historyMentalIllness,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: answerForm.value.historyMentalIllness != '' ? 5 : 0,
    };



    let answer26: AnswerModel = {
      idAnswer: this.idAnswer + 25,
      idQuestion: 16,
      idOptionAnswers: [],
      openAnswer: 'Discapacidad Fisica o Mental: '+answerForm.value.disabilityPhysicalMental,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    this.answerList.push(answer24, answer25, answer26)
  }

  saveAnswerFactorsCovid19(answerForm: FormGroup) {
    let answer27: AnswerModel = {
      idAnswer: this.idAnswer + 26,
      idQuestion: 17,
      idOptionAnswers: [answerForm.value.hadCovid],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer28: AnswerModel = {
      idAnswer: this.idAnswer + 27,
      idQuestion: 18,
      idOptionAnswers: answerForm.value.affectationCovid,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    // let answer28: AnswerModel;
    //
    // if(answerForm.value.hadCovid == 66){ //Selecciona NO
    //     answer28 = {
    //     idAnswer: this.idAnswer + 27,
    //     idQuestion: 18,
    //     idOptionAnswers: [],
    //     openAnswer: '',
    //     idPoll: this.idPoll,
    //     type: 'ADULT',
    //     score: 0,
    //   }
    // }else{
    //    answer28 = {
    //     idAnswer: this.idAnswer + 27,
    //     idQuestion: 18,
    //     idOptionAnswers: [answerForm.value.affectationCovid],
    //     openAnswer: '',
    //     idPoll: this.idPoll,
    //     type: 'ADULT',
    //     score: 0,
    //   }
    // }

    let answer29: AnswerModel = {
      idAnswer: this.idAnswer + 28,
      idQuestion: 19,
      idOptionAnswers: answerForm.value.aftermath,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: this.scoreAftermath(answerForm.value.aftermath),
      // score: this.scoreAftermath(this.factorsCovid19.value.aftermath),
    };

    let answer30: AnswerModel = {
      idAnswer: this.idAnswer + 29,
      idQuestion: 20,
      idOptionAnswers: [answerForm.value.deadFamilyCovid],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer31: AnswerModel = {
      idAnswer: this.idAnswer + 30,
      idQuestion: 21,
      idOptionAnswers: answerForm.value.deadFamilySymptom,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: this.scoreDeadFamily(answerForm.value.deadFamilySymptom),
    };

    let answer32: AnswerModel = {
      idAnswer: this.idAnswer + 31,
      idQuestion: 22,
      idOptionAnswers: answerForm.value.workSituation,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: this.scoreWorkSituation(answerForm.value.workSituation),
      //score: 0,
    };

    let answer33: AnswerModel = {
      idAnswer: this.idAnswer + 32,
      idQuestion: 23,
      idOptionAnswers: answerForm.value.studentSituation,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: this.scoreStudentSituation(answerForm.value.studentSituation),
      //score: 0,
    };

    let answer34: AnswerModel = {
      idAnswer: this.idAnswer + 33,
      idQuestion: 24,
      idOptionAnswers: [answerForm.value.conflictVictim],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer35: AnswerModel = {
      idAnswer: this.idAnswer + 34,
      idQuestion: 25,
      idOptionAnswers: [answerForm.value.diomesticViolence],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: answerForm.value.diomesticViolence == 104 ? 5 : 0,
    };

    let answer36: AnswerModel = {
      idAnswer: this.idAnswer + 35,
      idQuestion: 26,
      idOptionAnswers: [answerForm.value.mentalHealth],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer37: AnswerModel = {
      idAnswer: this.idAnswer + 36,
      idQuestion: 27,
      idOptionAnswers: [answerForm.value.vaccinationPosture],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    this.answerList.push(answer27, answer28, answer29, answer30, answer31, answer32, answer33, answer34, answer35, answer36, answer37)
  }

  saveAnswerMentalHealthNeeds(answerForm: FormGroup) {
    let answer38: AnswerModel = {
      idAnswer: this.idAnswer + 37,
      idQuestion: 2801,
      idOptionAnswers: [answerForm.value.one],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [111, 112].includes(answerForm.value.one) ? 1 : 0,
    };

    let answer39: AnswerModel = {
      idAnswer: this.idAnswer + 38,
      idQuestion: 2802,
      idOptionAnswers: [answerForm.value.two],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [115, 116].includes(answerForm.value.two) ? 1 : 0,
    };

    let answer40: AnswerModel = {
      idAnswer: this.idAnswer + 39,
      idQuestion: 2803,
      idOptionAnswers: [answerForm.value.three],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [119, 120].includes(answerForm.value.three) ? 1 : 0,
    };

    let answer41: AnswerModel = {
      idAnswer: this.idAnswer + 40,
      idQuestion: 2804,
      idOptionAnswers: [answerForm.value.four],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [123, 124].includes(answerForm.value.four) ? 1 : 0,
    };

    let answer42: AnswerModel = {
      idAnswer: this.idAnswer + 41,
      idQuestion: 2805,
      idOptionAnswers: [answerForm.value.five],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [127, 128].includes(answerForm.value.five) ? 1 : 0,
    };

    let answer43: AnswerModel = {
      idAnswer: this.idAnswer + 42,
      idQuestion: 2806,
      idOptionAnswers: [answerForm.value.six],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [133, 134].includes(answerForm.value.six) ? 1 : 0,
    };

    let answer44: AnswerModel = {
      idAnswer: this.idAnswer + 43,
      idQuestion: 2807,
      idOptionAnswers: [answerForm.value.seven],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [135, 136].includes(answerForm.value.seven) ? 1 : 0,
    };

    let answer45: AnswerModel = {
      idAnswer: this.idAnswer + 44,
      idQuestion: 2808,
      idOptionAnswers: [answerForm.value.eight],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [139, 140].includes(answerForm.value.eight) ? 1 : 0,
    };

    let answer46: AnswerModel = {
      idAnswer: this.idAnswer + 45,
      idQuestion: 2809,
      idOptionAnswers: [answerForm.value.nine],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [143, 144].includes(answerForm.value.nine) ? 1 : 0,
    };

    let answer47: AnswerModel = {
      idAnswer: this.idAnswer + 46,
      idQuestion: 2810,
      idOptionAnswers: [answerForm.value.ten],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [147, 148].includes(answerForm.value.ten) ? 1 : 0,
    };

    let answer48: AnswerModel = {
      idAnswer: this.idAnswer + 47,
      idQuestion: 2811,
      idOptionAnswers: [answerForm.value.eleven],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [151, 152].includes(answerForm.value.eleven) ? 1 : 0,
    };

    let answer49: AnswerModel = {
      idAnswer: this.idAnswer + 48,
      idQuestion: 2812,
      idOptionAnswers: [answerForm.value.twelve],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [155, 156].includes(answerForm.value.twelve) ? 1 : 0,
    };

    let answer50: AnswerModel = {
      idAnswer: this.idAnswer + 49,
      idQuestion: 2813,
      idOptionAnswers: [answerForm.value.thirteen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer51: AnswerModel = {
      idAnswer: this.idAnswer + 50,
      idQuestion: 2814,
      idOptionAnswers: [answerForm.value.fourteen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [163, 164].includes(answerForm.value.fourteen) ? 1 : 0,
    };

    let answer52: AnswerModel = {
      idAnswer: this.idAnswer + 51,
      idQuestion: 2815,
      idOptionAnswers: [answerForm.value.fifteen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [167, 168].includes(answerForm.value.fifteen) ? 1 : 0,
    };

    let answer53: AnswerModel = {
      idAnswer: this.idAnswer + 52,
      idQuestion: 2816,
      idOptionAnswers: [answerForm.value.sixteen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [171, 172].includes(answerForm.value.sixteen) ? 1 : 0,
    };

    let answer54: AnswerModel = {
      idAnswer: this.idAnswer + 53,
      idQuestion: 2817,
      idOptionAnswers: [answerForm.value.seventeen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [175, 176].includes(answerForm.value.seventeen) ? 1 : 0,
    };

    let answer55: AnswerModel = {
      idAnswer: this.idAnswer + 54,
      idQuestion: 2818,
      idOptionAnswers: [answerForm.value.eighteen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: this.scoreEighteen(answerForm.value.eighteen),
    };

    let answer56: AnswerModel = {
      idAnswer: this.idAnswer + 55,
      idQuestion: 2819,
      idOptionAnswers: [answerForm.value.nineteen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: [183, 184].includes(answerForm.value.nineteen) ? 1 : 0,
    };

    this.answerList.push(answer38, answer39, answer40, answer41, answer42, answer43, answer44, answer45, answer46, answer47, answer48, answer49,
      answer50, answer51, answer52, answer53, answer54, answer55, answer56)
  }

  //2 Se recorre cada formulario (5 en total), se cargan las respuestas al modelo y a "answerList"
    //Posteriormente se llaman los servicios y los datos se envían a la base de datos
  sendQuantitativeInstrument(answerFormList: Array<FormGroup>) {

    answerFormList.forEach(answerForm => {

      if (answerForm.value.firstName)
        this.saveAnswerPersonalInfo(answerForm);

      if (answerForm.value.sex)
        this.saveAnswerSociodemographicFactors(answerForm);

      if (answerForm.value.comorbilities)
        this.saveAnswerComorbidityInfo(answerForm);

      if (answerForm.value.hadCovid)
        this.saveAnswerFactorsCovid19(answerForm);

      if (answerForm.value.one)
        this.saveAnswerMentalHealthNeeds(answerForm);
    });

    this.answerList.forEach(x => this.score = this.score + x.score)
    // setTimeout(timeout, 5000)

    let poll: PollModel = {
      approvalDoc: "/document",
      evidence: "evidence",
      idCity: 1,
      idPoll: this.idPoll,
      type: "ADULT",
    };

    // this.answerList.forEach(x => this.score = this.score + x.score)
    //this.answerList.forEach(x => console.log('Recorriendo escores es: ',x.score))

    let alert: AlertModel = {
      idAlert: 1,
      idPoll: this.idPoll,
      score: this.score
    }

    // console.log('El puntaje TOTAL es: ', this.score)
    // console.log('El resultado del Formualrio Factores asociados al covid-19 es: ',this.factorsCovid19)

    //llamado del SERVICIO para guardar a la tabla ANSWER

    this.quanInstService.createAnswer(this.answerList).subscribe({
      next: () => {
        this.openSnackBar('Se guardó correctamente el formulario ADULT', 'Aceptar');

        //Llamado del servicio para guardar en la tabla POLL
        this.quanInstService.createPoll(poll).subscribe({
          next: () => {
            this.openSnackBar('Se guardó correctamente la encuesta (Poll)', 'Aceptar');
          }, error: () => {
            this.openSnackBar('No se guardó correctamente la encuesta (Poll)', 'Aceptar');
          }
        })

        //LLamado del servicio para guardar a la tabla Alert
        if(this.score >= 25){
          this.quanInstService.createAlert(alert).subscribe({
            next: () => {
              this.openSnackBar('Se guardó correctamente la alerta', 'Aceptar');
            }
          })
        }

        this.answerList = [];
        this.sendToCareSheet();

      }, error: () => {
        this.answerList = [];
        this.score = 0;
        this.openSnackBar('No se guardó correctamente el formulario del INSTRUMENTO ADULTOS', 'Aceptar');
      }
    });

  }

  /** Fin proceso guardado */


  //          *** Manejo del PUNTAJE ****

  //<editor-fold desc="Manejo del Puntaje">

  private scoreAftermath(aftermath: Array<number>): any {
    let score: Array<number> = aftermath;
    let addScoreAftermath: number = 0;
    for (let x of score) {
      switch (x) {
        case 70:
          addScoreAftermath = addScoreAftermath + 1;
          break;
        case 71:
          addScoreAftermath = addScoreAftermath + 2;
          break;
        case 72:
          addScoreAftermath = addScoreAftermath + 1;
          break;
        case 73:
          addScoreAftermath = addScoreAftermath + 1;
          break;
        case 74:
          addScoreAftermath = addScoreAftermath + 1;
          break;
        case 75:
          addScoreAftermath = addScoreAftermath + 1;
          break;
        case 76:
          addScoreAftermath = addScoreAftermath + 7;
          break;
      }
    }

    return addScoreAftermath;
  }

  private scoreDeadFamily(deadFamily: Array<number>): any {
    let score: Array<number> = deadFamily;
    let addScoreDeadFamily: number = 0;
    for (let x of score) {
      if (x > 79 && x < 86)
        addScoreDeadFamily = addScoreDeadFamily + 1;
      if (x==86)
        addScoreDeadFamily = addScoreDeadFamily + 7;
    }

    return addScoreDeadFamily;
  }

  private scoreWorkSituation(workSituation: Array<number>): any {
    let score: Array<number> = workSituation;
    let addScoreWorkSituation: number = 0;
    for (let x of score) {
      if (x > 87 && x < 92)
        addScoreWorkSituation = addScoreWorkSituation + 1;
    }

    return addScoreWorkSituation;
  }

  private scoreStudentSituation(studentSituation: Array<number>): any {
    let score: Array<number> = studentSituation;
    let addScoreStudentSituation: number = 0;
    for (let x of score) {
      if (x == 94)
        addScoreStudentSituation = addScoreStudentSituation + 1;

      if (x == 96)
        addScoreStudentSituation = addScoreStudentSituation + 1;

      if (x > 97 && x < 100)
        addScoreStudentSituation = addScoreStudentSituation + 1;
    }

    return addScoreStudentSituation;
  }

  private scoreEighteen(eighteen: number): any { //De necesidades en salud mental
    switch (eighteen) {
      case 179:
        return 25;
      case 180:
        return 25;
      case 181:
        return 13;
    }
  }
  //</editor-fold>

  //*** Fin manejo del puntaje ***

  selectQuestion(idQuestion: number) {
    switch (idQuestion) {
      case 2:
        this.sexQuestion = this.questions.filter(x => x.idQuestion === idQuestion);
        this.sexQuestion.forEach(item => this.sexList = item.optionAnswerDtoList);
        break;
      case 3:
        this.ethnicityQuestion = this.questions.filter(x => x.idQuestion === idQuestion);
        this.ethnicityQuestion.forEach(item => this.ethnicityList = item.optionAnswerDtoList);
        break;
      case 4:
        this.civilStatus = this.questions.filter(x => x.idQuestion === idQuestion);
        this.civilStatus.forEach(item => this.civilStatusList = item.optionAnswerDtoList);
        break;
      case 8:
        this.typeHome = this.questions.filter(x => x.idQuestion === idQuestion);
        this.typeHome.forEach(item => this.typeHomeList = item.optionAnswerDtoList);
        break;
      case 9:
        this.accessServicies = this.questions.filter(x => x.idQuestion === idQuestion);
        this.accessServicies.forEach(item => this.accessServiciesList = item.optionAnswerDtoList);
        break;
      case 10:
        this.educationLevel = this.questions.filter(x => x.idQuestion === idQuestion);
        this.educationLevel.forEach(item => this.educationLevelList = item.optionAnswerDtoList);
        break;
      case 11:
        this.occupation = this.questions.filter(x => x.idQuestion === idQuestion);
        this.occupation.forEach(item => this.occupationList = item.optionAnswerDtoList);
        break;
      case 12:
        this.workMode = this.questions.filter(x => x.idQuestion === idQuestion);
        this.workMode.forEach(item => this.workModeList = item.optionAnswerDtoList);
        break;
      case 13:
        this.socialSecurity = this.questions.filter(x => x.idQuestion === idQuestion);
        this.socialSecurity.forEach(item => this.socialSecurityList = item.optionAnswerDtoList);
        break;
      case 16:
        this.comorbilities = this.questions.filter(x => x.idQuestion === idQuestion);
        this.comorbilities.forEach(item => this.comorbilitiesList = item.optionAnswerDtoList);
        break;
      case 18:
        this.affectationCovid = this.questions.filter(x => x.idQuestion === idQuestion);
        this.affectationCovid.forEach(item => this.affectationCovidList = item.optionAnswerDtoList);
        break;
      case 19:
        this.aftermath = this.questions.filter(x => x.idQuestion === idQuestion);
        this.aftermath.forEach(item => this.aftermathList = item.optionAnswerDtoList);
        break;
      case 21:
        this.aftermath = this.questions.filter(x => x.idQuestion === idQuestion);
        this.aftermath.forEach(item => this.deadFamilyList = item.optionAnswerDtoList);
        break;
      case 22:
        this.aftermath = this.questions.filter(x => x.idQuestion === idQuestion);
        this.aftermath.forEach(item => this.workSituationList = item.optionAnswerDtoList);
        break;
      case 23:
        this.aftermath = this.questions.filter(x => x.idQuestion === idQuestion);
        this.aftermath.forEach(item => this.studentSituationList = item.optionAnswerDtoList);
        break;
      case 204:
        this.typeIdentificationQuestion = this.questions.filter(x => x.idQuestion === idQuestion);
        this.typeIdentificationQuestion.forEach(item => this.typeIdentificationList = item.optionAnswerDtoList);
        break;
    }
  }

  selectMentalHealthNeeds(idQuestions: Array<number>) {
    idQuestions.forEach(idQuestion => {
      switch (idQuestion) {
        case 2801:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.oneList = item.optionAnswerDtoList);
          break;
        case 2802:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.twoList = item.optionAnswerDtoList);
          break;
        case 2803:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.threeList = item.optionAnswerDtoList);
          break;
        case 2804:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.fourList = item.optionAnswerDtoList);
          break;
        case 2805:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.fiveList = item.optionAnswerDtoList);
          break;
        case 2806:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.sixList = item.optionAnswerDtoList);
          break;
        case 2807:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.sevenList = item.optionAnswerDtoList);
          break;
        case 2808:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.eightList = item.optionAnswerDtoList);
          break;
        case 2809:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.nineList = item.optionAnswerDtoList);
          break;
        case 2810:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.tenList = item.optionAnswerDtoList);
          break;
        case 2811:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.elevenList = item.optionAnswerDtoList);
          break;
        case 2812:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.twelveList = item.optionAnswerDtoList);
          break;
        case 2813:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.thirteenList = item.optionAnswerDtoList);
          break;
        case 2814:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.fourteenList = item.optionAnswerDtoList);
          break;
        case 2815:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.fifteenList = item.optionAnswerDtoList);
          break;
        case 2816:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.sixteenList = item.optionAnswerDtoList);
          break;
        case 2817:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.seventeenList = item.optionAnswerDtoList);
          break;
        case 2818:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.eighteenList = item.optionAnswerDtoList);
          break;
        case 2819:
          this.mentalHealthNeedsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.mentalHealthNeedsQuestions.forEach(item => this.nineteenList = item.optionAnswerDtoList);
          break;
      }
    })
  }

  /*  Control Errores */

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.personalInfo.controls[controlName];
    if (!control)
      return false;
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  isControlHasErrorSecundary(controlName: string, validationType: string): boolean {
    const control = this.sociodemographicFactors.controls[controlName];
    if (!control)
      return false;
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  isControlHasErrorfactorsCovid19(controlName: string, validationType: string): boolean {
    const control = this.factorsCovid19.controls[controlName];
    if (!control)
      return false;
   return  control.hasError(validationType) && (control.dirty || control.touched);
  }

  onMentalHealthNeedsFormChange() {
    this.contadoclicks = this.contadoclicks+1;
    if(this.contadoclicks>1){
      this.mentalHealthNeeds.controls['mentalHealthNeeds'].setErrors(null);
    }
    if(this.firstGroup === 1 ) {
      this.bvariable = this.firstGroup;
    } else {
      this.bvariable = 0;
    }
  }


/*
* Agrega la propiedad Validators a paneles ocultos
* */
  private addValidatorWorkMode() {
    // @ts-ignore
    this.sociodemographicFactors.get('occupation').valueChanges
      .subscribe(value => {
          if(value == 38 || value == 39) {
            // @ts-ignore
            this.sociodemographicFactors.get('workMode').setValidators(Validators.required)
          }else if(value == 38 || value == 39 || value == 44){
            // @ts-ignore
            this.factorsCovid19.get('workSituation').setValidators(Validators.required)
          }else if(value == 43){
            // @ts-ignore
            this.factorsCovid19.get('studentSituation').setValidators(Validators.required)
          }else   {
            // @ts-ignore
            this.sociodemographicFactors.get('workMode').clearValidators();
            // @ts-ignore
            this.sociodemographicFactors.get('workMode').updateValueAndValidity();
            // @ts-ignore
            this.factorsCovid19.get('workSituation').clearValidators();
            // @ts-ignore
            this.factorsCovid19.get('workSituation').updateValueAndValidity();
            // @ts-ignore
            this.factorsCovid19.get('studentSituation').clearValidators();
            // @ts-ignore
            this.factorsCovid19.get('studentSituation').updateValueAndValidity();

          }
        }
      );
  }
  private  addValidatorWorkSituation(){
    // @ts-ignore
    this.sociodemographicFactors.get('occupation').valueChanges
      .subscribe(value => {
        if(value == 38 || value == 39 || value == 44) {
          // @ts-ignore
          this.factorsCovid19.get('workSituation').setValidators(Validators.required)
        }else   {
            // @ts-ignore
            this.factorsCovid19.get('workSituation').clearValidators();
            // @ts-ignore
            this.factorsCovid19.get('workSituation').updateValueAndValidity();
          }
        }
      );
  }
  private addValidatorAffectationCovid() {
    // @ts-ignore
    this.factorsCovid19.get('hadCovid').valueChanges
      .subscribe(value => {
          if(value == 65) {
            // @ts-ignore
            this.factorsCovid19.get('affectationCovid').setValidators(Validators.required)
          }else{
            // @ts-ignore
            this.factorsCovid19.get('affectationCovid').clearValidators();
            // @ts-ignore
            this.factorsCovid19.get('affectationCovid').updateValueAndValidity();
          }
        }
      );
  }
  private addValidatorDeadFamilyCovid() {
    // @ts-ignore
    this.factorsCovid19.get('deadFamilyCovid').valueChanges
      .subscribe(value => {
          if(value == 78) {
            // @ts-ignore
            this.factorsCovid19.get('deadFamilySymptom').setValidators(Validators.required);
          }else {
            // @ts-ignore
            this.factorsCovid19.get('deadFamilySymptom').clearValidators();
            // @ts-ignore
            this.factorsCovid19.get('deadFamilySymptom').updateValueAndValidity();
          }
        }
      );
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
  //</editor-fold>

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  //Datos enviados al siguiente formulario - Ficha de atención
  sendToCareSheet() {
    this.careSheetService.shareIdPoll = this.idPoll;
    this.careSheetService.shareCity = this.sociodemographicFactors.value.municipalityResidence;
    this.careSheetService.shareSex = this.sociodemographicFactors.value.sex;
    this.careSheetService.shareName = this.personalInfo.value.firstName;
    this.careSheetService.shareLastName = this.personalInfo.value.firstLastName;
    this.careSheetService.shareIdentificationNumber = this.personalInfo.value.identification;
    this.careSheetService.shareEthnicity = this.sociodemographicFactors.value.ethnicity;
    this.careSheetService.sharePhone = this.personalInfo.value.cellphone;
    this.router.navigate(['navbar/care-sheet'])
  }

}
