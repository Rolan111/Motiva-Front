import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuantitativeInstrumentService} from "../quantitative-instrument.service";
import {AnswerModel} from "../answer.model";
import {Question} from "../question.model";
import {OptionAnswer} from "../option-answer.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PollModel} from "../poll.model";
import {CareSheetService} from "../../care-sheet/care-sheet.service";

interface ListTypes {
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
  occupationValue: number = 0;
  answerList: Array<AnswerModel> = [];
  idAnswer: number = 0;
  idPoll: number = 0;
  questions: Array<Question> = [];
  hadCovid: number = 0;
  deadFamilyCovid: number = 0;
  score: number = 0;

  typeIdentificationQuestion: Question[] = [];
  sexQuestion: Question[] = [];
  ethnicityQuestion: Question[] = [];
  civilStatus: Question[] = [];
  question5: Question[] = [];
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

  citiesList: ListTypes[] = [
    {viewValue: 'POPAYAN'},
    {viewValue: 'ALMAGUER'},
    {viewValue: 'ARGELIA'},
    {viewValue: 'BALBOA'},
    {viewValue: 'BOLIVAR'},
    {viewValue: 'BUENOS AIRES'},
    {viewValue: 'CAJIBIO'},
    {viewValue: 'CALDONO'},
    {viewValue: 'CALOTO'},
    {viewValue: 'CORINTO'},
    {viewValue: 'EL TAMBO'},
    {viewValue: 'FLORENCIA'},
    {viewValue: 'GUACHENE'},
    {viewValue: 'GUAPI'},
    {viewValue: 'INZA'},
    {viewValue: 'JAMBALO'},
    {viewValue: 'LA SIERRA'},
    {viewValue: 'LA VEGA'},
    {viewValue: 'LOPEZ'},
    {viewValue: 'MERCADERES'},
    {viewValue: 'MIRANDA'},
    {viewValue: 'MORALES'},
    {viewValue: 'PADILLA'},
    {viewValue: 'PAEZ'},
    {viewValue: 'PIAMONTE'},
    {viewValue: 'PIENDAMO'},
    {viewValue: 'PUERTO TEJADA'},
    {viewValue: 'PATIA'},
    {viewValue: 'PURACE'},
    {viewValue: 'ROSAS'},
    {viewValue: 'SAN SEBASTIAN'},
    {viewValue: 'SANTANDER DE QUILICHAO'},
    {viewValue: 'SANTA ROSA'},
    {viewValue: 'SILVIA'},
    {viewValue: 'SOTARA'},
    {viewValue: 'SUAREZ'},
    {viewValue: 'SUCRE'},
    {viewValue: 'TIMBIO'},
    {viewValue: 'TIMBIQUI'},
    {viewValue: 'TORIBIO'},
    {viewValue: 'TOTORO'},
    {viewValue: 'VILLA RICA'}
  ];

  ngOnInit(): void {
    this.formQuantitative();

    this.quanInstService.findAllQuestions('ADULT').subscribe(response => {
      this.questions = response.data;
    })

    this.quanInstService.getLastSequence().subscribe(response => {
      this.idAnswer = response.data.idAnswer;
      this.idPoll = response.data.idPoll;
    })
  }

  private formQuantitative() {
    this.personalInfo = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
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
      workMode: [''],
      zoneResidence: ['', Validators.required],
    });

    this.comorbidityInfo = this.formBuilder.group({
      comorbilities: this.formBuilder.array([]),
      disorderDisease: [''],
      physicalMental: [''],
    })

    this.factors = this.formBuilder.group({
      hadCovid: [''],
      affectationCovid: [''],
      aftermath: ['', Validators.required],
      deadFamilyCovid: [''],
      deadFamily: [''],
      workSituation: ['', Validators.required],
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
  }

  saveAnswerPersonalInfo(answerForm: FormGroup) {
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

    this.answerList.push(answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8)
  }

  saveAnswerSecundaryInfo(answerForm: FormGroup) {
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
      score: 0,
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
      score: 0,
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

  saveAnswerComorbidity(answerForm: FormGroup) {
    let answer24: AnswerModel = {
      idAnswer: this.idAnswer + 23,
      idQuestion: 16,
      idOptionAnswers: answerForm.value.comorbilities,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer25: AnswerModel = {
      idAnswer: this.idAnswer + 24,
      idQuestion: 16,
      idOptionAnswers: [],
      openAnswer: answerForm.value.disorderDisease,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer26: AnswerModel = {
      idAnswer: this.idAnswer + 25,
      idQuestion: 16,
      idOptionAnswers: [],
      openAnswer: answerForm.value.physicalMental,
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    this.answerList.push(answer24, answer25, answer26)
  }

  saveAnswerFactor(answerForm: FormGroup) {
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
      idOptionAnswers: [answerForm.value.affectationCovid],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer29: AnswerModel = {
      idAnswer: this.idAnswer + 28,
      idQuestion: 19,
      idOptionAnswers: answerForm.value.aftermath,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
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
      idOptionAnswers: answerForm.value.deadFamily,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer32: AnswerModel = {
      idAnswer: this.idAnswer + 31,
      idQuestion: 22,
      idOptionAnswers: answerForm.value.workSituation,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer33: AnswerModel = {
      idAnswer: this.idAnswer + 32,
      idQuestion: 23,
      idOptionAnswers: answerForm.value.studentSituation,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
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
      score: 0,
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

  saveMentalHealthNeeds(answerForm: FormGroup) {
    let answer38: AnswerModel = {
      idAnswer: this.idAnswer + 37,
      idQuestion: 2801,
      idOptionAnswers: [answerForm.value.one],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer39: AnswerModel = {
      idAnswer: this.idAnswer + 38,
      idQuestion: 2802,
      idOptionAnswers: [answerForm.value.two],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer40: AnswerModel = {
      idAnswer: this.idAnswer + 39,
      idQuestion: 2803,
      idOptionAnswers: [answerForm.value.three],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer41: AnswerModel = {
      idAnswer: this.idAnswer + 40,
      idQuestion: 2804,
      idOptionAnswers: [answerForm.value.four],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer42: AnswerModel = {
      idAnswer: this.idAnswer + 41,
      idQuestion: 2805,
      idOptionAnswers: [answerForm.value.five],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer43: AnswerModel = {
      idAnswer: this.idAnswer + 42,
      idQuestion: 2806,
      idOptionAnswers: [answerForm.value.six],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer44: AnswerModel = {
      idAnswer: this.idAnswer + 43,
      idQuestion: 2807,
      idOptionAnswers: [answerForm.value.seven],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer45: AnswerModel = {
      idAnswer: this.idAnswer + 44,
      idQuestion: 2808,
      idOptionAnswers: [answerForm.value.eight],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer46: AnswerModel = {
      idAnswer: this.idAnswer + 45,
      idQuestion: 2809,
      idOptionAnswers: [answerForm.value.nine],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer47: AnswerModel = {
      idAnswer: this.idAnswer + 46,
      idQuestion: 2810,
      idOptionAnswers: [answerForm.value.ten],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer48: AnswerModel = {
      idAnswer: this.idAnswer + 47,
      idQuestion: 2811,
      idOptionAnswers: [answerForm.value.eleven],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer49: AnswerModel = {
      idAnswer: this.idAnswer + 48,
      idQuestion: 2812,
      idOptionAnswers: [answerForm.value.twelve],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
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
      score: 0,
    };

    let answer52: AnswerModel = {
      idAnswer: this.idAnswer + 51,
      idQuestion: 2815,
      idOptionAnswers: [answerForm.value.fifteen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer53: AnswerModel = {
      idAnswer: this.idAnswer + 52,
      idQuestion: 2816,
      idOptionAnswers: [answerForm.value.sixteen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer54: AnswerModel = {
      idAnswer: this.idAnswer + 53,
      idQuestion: 2817,
      idOptionAnswers: [answerForm.value.seventeen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer55: AnswerModel = {
      idAnswer: this.idAnswer + 54,
      idQuestion: 2818,
      idOptionAnswers: [answerForm.value.eighteen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    let answer56: AnswerModel = {
      idAnswer: this.idAnswer + 55,
      idQuestion: 2819,
      idOptionAnswers: [answerForm.value.nineteen],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'ADULT',
      score: 0,
    };

    this.answerList.push(answer38, answer39, answer40, answer41, answer42, answer43, answer44, answer45, answer46, answer47, answer48, answer49,
      answer50, answer51, answer52, answer53, answer54, answer55, answer56)
  }

  sendQuantitativeInstrument(answerFormList: Array<FormGroup>) {
    answerFormList.forEach(answerForm => {
      if (answerForm.value.firstName)
        this.saveAnswerPersonalInfo(answerForm);

      if (answerForm.value.sex)
        this.saveAnswerSecundaryInfo(answerForm);

      if (answerForm.value.comorbilities)
        this.saveAnswerComorbidity(answerForm);

      if (answerForm.value.hadCovid)
        this.saveMentalHealthNeeds(answerForm);

      if (answerForm.value.one)
        this.saveAnswerFactor(answerForm);
    });

    let poll: PollModel = {
      approvalDoc: "/document",
      evidence: "evidence",
      idCity: 1,
      type: "ADULT",
    };

    this.quanInstService.createAnswer(this.answerList).subscribe({
      next: () => {
        this.quanInstService.createPoll(poll);
        this.openSnackBar('Se guardó correctamente el formulario de adulto', 'Alert');
        this.answerList = [];
        window.location.reload();
      }, error: () => {
        this.openSnackBar('No se guardó correctamente el formulario', 'Alert');
      }
    });
  }

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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  enviandoACareSheet() {
    this.careSheetService.shareIdPoll = this.idPoll;
    this.careSheetService.shareCity = this.secundaryInfo.value.municipalityResidence;
    this.careSheetService.shareSex = this.secundaryInfo.value.sex;
    this.careSheetService.shareName = this.personalInfo.value.firstName;
    this.careSheetService.shareLastName = this.personalInfo.value.firstLastName;
    this.careSheetService.shareIdentificationNumber = this.personalInfo.value.identification;
    this.careSheetService.shareEthnicity = this.secundaryInfo.value.ethnicity;
  }
}
