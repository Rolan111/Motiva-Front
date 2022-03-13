import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuantitativeInstrumentService} from "../quantitative-instrument.service";
import {OptionAnswer} from "../option-answer.model";
import {AnswerModel} from "../answer.model";
import {Question} from "../question.model";

interface listTypes {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-quantitative-instrument-children',
  templateUrl: './quantitative-instrument-children.component.html',
  styleUrls: ['./quantitative-instrument-children.component.scss']
})
export class QuantitativeInstrumentChildrenComponent implements OnInit {
  isLinear = false;
  personalInfo!: FormGroup;
  secundaryInfo!: FormGroup;
  comorbidityInfo!: FormGroup;
  factors!: FormGroup;
  answerList: Array<AnswerModel> = [];
  questions: Array<Question> = [];
  idAnswer: number = 0;
  idPoll: number = 0;

  sexQuestion: Question[] = [];
  ethnicityQuestion: Question[] = [];
  typeHome: Question[] = [];
  accessServicies: Question[] = [];
  educationLevel: Question[] = [];
  studyMode: Question[] = [];
  socialSecurity: Question[] = [];
  comorbilities: Question[] = [];

  sexList: Array<OptionAnswer> = [];
  ethnicityList: Array<OptionAnswer> = [];
  typeHomeList: Array<OptionAnswer> = [];
  accessServiciesList: Array<OptionAnswer> = [];
  educationLevelList: Array<OptionAnswer> = [];
  studyModeList: Array<OptionAnswer> = [];
  socialSecurityList: Array<OptionAnswer> = [];
  comorbilitiesList: Array<OptionAnswer> = [];

  factorsQuestions: Question[] = [];
  oneList: Array<OptionAnswer> = [];
  twoList: Array<OptionAnswer> = [];
  threeList: Array<OptionAnswer> = [];
  fourList: Array<OptionAnswer> = [];
  fiveList: Array<OptionAnswer> = [];

  identification: listTypes[] = [
    {value: 'RC', viewValue: 'Registro Civil'},
    {value: 'TI', viewValue: 'Tarjeta Identidad'},
  ];

  citiesList: listTypes[] = [
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

  constructor(
    private formBuilder: FormBuilder,
    private quanInstService: QuantitativeInstrumentService
  ) { }

  ngOnInit(): void {
    this.formQuantitative();

    this.quanInstService.findAllQuestions('CHILDREN').subscribe(response => {
      this.questions = response.data;
      console.log('questions', this.questions)
    })

    this.quanInstService.getLastSequence().subscribe(response => {
      this.idAnswer = response.data.idAnswer;
      this.idPoll = response.data.idPoll;
    })
  }

  private formQuantitative() {
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
      numberChildrens: ['', Validators.required],
      socialSecurity: ['', Validators.required],
      personCoexist: ['', Validators.required],
      typeHome: ['', Validators.required],
      accessServicies: ['', Validators.required],
      educationLevel: ['', Validators.required],
      studyMode: ['', Validators.required]
    });

    this.comorbidityInfo = this.formBuilder.group({
      comorbilities: this.formBuilder.array([]),
      anyDiagnostic: [''],
      illnessHistory: [''],
      disability: [''],
    })

    this.factors = this.formBuilder.group({
      one: [''],
      two: [''],
      three: [''],
      four: [''],
      five: [''],
    });
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

    this.selectQuestion(12);
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
      openAnswer: answerForm.value.illnessHistory ? 'SI' : 'NO',
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

    let idQuestions: Array<number> = [13, 14, 15, 16, 17];
    this.selectFactors(idQuestions);
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
      case 7:
        this.typeHome = this.questions.filter(x => x.idQuestion === idQuestion);
        this.typeHome.forEach(item => this.typeHomeList = item.optionAnswerDtoList);
        break;
      case 8:
        this.accessServicies = this.questions.filter(x => x.idQuestion === idQuestion);
        this.accessServicies.forEach(item => this.accessServiciesList = item.optionAnswerDtoList);
        break;
      case 9:
        this.educationLevel = this.questions.filter(x => x.idQuestion === idQuestion);
        this.educationLevel.forEach(item => this.educationLevelList = item.optionAnswerDtoList);
        break;
      case 10:
        this.studyMode = this.questions.filter(x => x.idQuestion === idQuestion);
        this.studyMode.forEach(item => this.studyModeList = item.optionAnswerDtoList);
        break;
      case 11:
        this.socialSecurity = this.questions.filter(x => x.idQuestion === idQuestion);
        this.socialSecurity.forEach(item => this.socialSecurityList = item.optionAnswerDtoList);
        break;
      case 12:
        this.comorbilities = this.questions.filter(x => x.idQuestion === idQuestion);
        this.comorbilities.forEach(item => this.comorbilitiesList = item.optionAnswerDtoList);
        break;
    }
  }

  selectFactors(idQuestions: Array<number>) {
    idQuestions.forEach(idQuestion => {
      switch (idQuestion) {
        case 13:
          this.factorsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.factorsQuestions.forEach(item => this.oneList = item.optionAnswerDtoList);
          break;
        case 14:
          this.factorsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.factorsQuestions.forEach(item => this.twoList = item.optionAnswerDtoList);
          break;
        case 15:
          this.factorsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.factorsQuestions.forEach(item => this.threeList = item.optionAnswerDtoList);
          break;
        case 16:
          this.factorsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.factorsQuestions.forEach(item => this.fourList = item.optionAnswerDtoList);
          break;
        case 17:
          this.factorsQuestions = this.questions.filter(x => x.idQuestion === idQuestion);
          this.factorsQuestions.forEach(item => this.fiveList = item.optionAnswerDtoList);
          break;
      }
    });
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
