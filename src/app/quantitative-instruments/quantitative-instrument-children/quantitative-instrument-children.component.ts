import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuantitativeInstrumentService} from "../quantitative-instrument.service";
import {OptionAnswer} from "../option-answer.model";
import {AnswerModel} from "../answer.model";
import {Question} from "../question.model";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PollModel} from "../poll.model";
import {AlertModel} from "../alert.model";
import {arrayMunicipios} from "../../enums/enum";
import {QuantitativeInstrumentComponent} from "../quantitative-instrument/quantitative-instrument.component";
import {CareSheetService} from "../../care-sheet/care-sheet.service";
import {nanoid} from "nanoid";

interface ListTypes {
  viewValue: string;
}

@Component({
  selector: 'app-quantitative-instrument-children',
  templateUrl: './quantitative-instrument-children.component.html',
  styleUrls: ['./quantitative-instrument-children.component.scss']
})
export class QuantitativeInstrumentChildrenComponent implements OnInit {

  //Validacion ingreso fecha de caracterizacion de beneficiario
  maxDate = new Date();
  minDate = new Date('December 31, 2021 24:00:00');

  isntrumentoAdultos!: QuantitativeInstrumentComponent;
  //Declaración de las colecciones de formularios
  personalInfo!: FormGroup;
  sociodemographicFactors!: FormGroup;
  comorbidityInfo!: FormGroup;
  factors!: FormGroup;

  answerList: Array<AnswerModel> = [];
  questions: Array<Question> = [];
  idAnswer: number = 0;
  // idPoll: number = 0;
  idPoll!: string;
  score: number = 0;

  //Modelo de alerta

  professional!: string;
  beneficiary!: string;
  municipality!: string;
  date!: string;
  nameBeneficiary!: string;
  lastNameBeneficiary!: string;
  identification: number = 0;
  typeIdentification!: string;
  cellphone: number = 0;

  typeIdentificationQuestion: Question[] = [];
  sexQuestion: Question[] = [];
  ethnicityQuestion: Question[] = [];
  typeHomeQuestion: Question[] = [];
  accessServiciesQuestion: Question[] = [];
  educationLevelQuestion: Question[] = [];
  studyModeQuestion: Question[] = [];
  socialSecurityQuestion: Question[] = [];
  comorbilitiesQuestion: Question[] = [];

  typeIdentificationList: Array<OptionAnswer> = [];
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

  citiesList: ListTypes[] = arrayMunicipios;

  constructor(
    private formBuilder: FormBuilder,
    private quanInstService: QuantitativeInstrumentService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private careSheetService: CareSheetService
    // private instrumentoAdultos: QuantitativeInstrumentComponent
  ) {
  }

  ngOnInit(): void {
    this.formQuantitative();

    this.personalInfo.get('applicationDate')?.setValue(new Date().toLocaleDateString())


    this.quanInstService.findAllQuestions('CHILDREN').subscribe(response => {
      this.questions = response.data;
      console.log('La preguntas de CHILDREN son: ',response)
    })

    this.quanInstService.getLastSequence().subscribe(response => {
      this.idAnswer = response.data.idAnswer;
      this.idPoll = nanoid(10);
    })
  }

  private formQuantitative() {
    this.personalInfo = this.formBuilder.group({
      applicationDate: ['', Validators.required],
      firstName: ['', Validators.required],
      firstLastName: ['', Validators.required],
      secondName: [''],
      secondLastName: [''],
      identification: ['', Validators.required],
      typeIdentification: ['', Validators.required],
      address: ['', Validators.required],
      cellphone: ['', Validators.required],
    });

    this.sociodemographicFactors = this.formBuilder.group({
      age: new FormControl('', [Validators.required,Validators.max(13)]),
      sex: ['', Validators.required],
      ethnicity: ['', Validators.required],
      zoneResidence: ['', Validators.required],
      municipalityResidence: ['', Validators.required],
      personCoexist: ['', Validators.required],
      typeHome: ['', Validators.required],
      accessServicies: ['', Validators.required],
      educationLevel: ['', Validators.required],
      studyMode: ['', Validators.required],
      socialSecurity: ['', Validators.required],
    });

    this.comorbidityInfo = this.formBuilder.group({
      comorbilities: this.formBuilder.array([]),
      disorderDisease: [''],
      physicalMental: [''],
    })

    this.factors = this.formBuilder.group({
      one: ['', Validators.required],
      two: ['', Validators.required],
      three: ['', Validators.required],
      four: ['', Validators.required],
      five: ['', Validators.required],
    });
  }

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
      type: 'CHILDREN',
      score: 0,
    };

    let answer2: AnswerModel = {
      idAnswer: this.idAnswer + 1,
      idQuestion: 201,
      idOptionAnswers: [],
      openAnswer: answerForm.value.secondName,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer3: AnswerModel = {
      idAnswer: this.idAnswer + 2,
      idQuestion: 202,
      idOptionAnswers: [],
      openAnswer: answerForm.value.firstLastName,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer4: AnswerModel = {
      idAnswer: this.idAnswer + 3,
      idQuestion: 203,
      idOptionAnswers: [],
      openAnswer: answerForm.value.secondLastName,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer5: AnswerModel = {
      idAnswer: this.idAnswer + 4,
      idQuestion: 204,
      idOptionAnswers: [answerForm.value.typeIdentification],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer6: AnswerModel = {
      idAnswer: this.idAnswer + 5,
      idQuestion: 205,
      idOptionAnswers: [],
      openAnswer: answerForm.value.identification,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer7: AnswerModel = {
      idAnswer: this.idAnswer + 6,
      idQuestion: 206,
      idOptionAnswers: [],
      openAnswer: answerForm.value.address,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer8: AnswerModel = {
      idAnswer: this.idAnswer + 7,
      idQuestion: 207,
      idOptionAnswers: [],
      openAnswer: answerForm.value.cellphone,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    this.answerList.push(answer0,answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8);
  }

  saveAnswerSecundaryInfo(answerForm: FormGroup) {
    let answer9: AnswerModel = {
      idAnswer: this.idAnswer + 8,
      idQuestion: 1,
      idOptionAnswers: [],
      openAnswer: answerForm.value.age,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer10: AnswerModel = {
      idAnswer: this.idAnswer + 9,
      idQuestion: 2,
      idOptionAnswers: [answerForm.value.sex],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer11: AnswerModel = {
      idAnswer: this.idAnswer + 10,
      idQuestion: 3,
      idOptionAnswers: [answerForm.value.ethnicity],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer12: AnswerModel = {
      idAnswer: this.idAnswer + 11,
      idQuestion: 4,
      idOptionAnswers: [answerForm.value.zoneResidence],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: answerForm.value.zoneResidence == 196 ? 1 : 0,
    };

    let answer13: AnswerModel = {
      idAnswer: this.idAnswer + 12,
      idQuestion: 5,
      idOptionAnswers: [],
      openAnswer: answerForm.value.municipalityResidence,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer14: AnswerModel = {
      idAnswer: this.idAnswer + 13,
      idQuestion: 6,
      idOptionAnswers: [],
      openAnswer: answerForm.value.personCoexist,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer15: AnswerModel = {
      idAnswer: this.idAnswer + 14,
      idQuestion: 7,
      idOptionAnswers: [answerForm.value.typeHome],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer16: AnswerModel = {
      idAnswer: this.idAnswer + 15,
      idQuestion: 8,
      idOptionAnswers: answerForm.value.accessServicies,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer17: AnswerModel = {
      idAnswer: this.idAnswer + 16,
      idQuestion: 9,
      idOptionAnswers: [answerForm.value.educationLevel],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer18: AnswerModel = {
      idAnswer: this.idAnswer + 17,
      idQuestion: 10,
      idOptionAnswers: [answerForm.value.studyMode],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: this.scoreModeStudy(answerForm.value.studyMode),
    };

    let answer19: AnswerModel = {
      idAnswer: this.idAnswer + 18,
      idQuestion: 11,
      idOptionAnswers: [answerForm.value.socialSecurity],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    this.answerList.push(answer9, answer10, answer11, answer12, answer13, answer14, answer15, answer16, answer17,
      answer18, answer19);
  }

  saveAnswerComorbidity(answerForm: FormGroup) {
    let answer20: AnswerModel = {
      idAnswer: this.idAnswer + 19,
      idQuestion: 12,
      idOptionAnswers: answerForm.value.comorbilities,
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    let answer21: AnswerModel = {
      idAnswer: this.idAnswer + 20,
      idQuestion: 12,
      idOptionAnswers: [],
      openAnswer: answerForm.value.disorderDisease,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: answerForm.value.disorderDisease != '' ? 5 : 0,
    };

    let answer22: AnswerModel = {
      idAnswer: this.idAnswer + 21,
      idQuestion: 12,
      idOptionAnswers: [],
      openAnswer: answerForm.value.physicalMental,
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: 0,
    };

    this.answerList.push(answer20, answer21, answer22);
  }

  saveAnswerFactor(answerForm: FormGroup) {
    let answer23: AnswerModel = {
      idAnswer: this.idAnswer + 22,
      idQuestion: 13,
      idOptionAnswers: [answerForm.value.one],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: [236, 237, 238].includes(answerForm.value.one) ? 1 : 0,
    };

    let answer24: AnswerModel = {
      idAnswer: this.idAnswer + 23,
      idQuestion: 14,
      idOptionAnswers: [answerForm.value.two],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: [240, 241, 242].includes(answerForm.value.two) ? 1 : 0,
    };

    let answer25: AnswerModel = {
      idAnswer: this.idAnswer + 24,
      idQuestion: 15,
      idOptionAnswers: [answerForm.value.three],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: [244, 245, 246].includes(answerForm.value.three) ? 1 : 0,
    };

    let answer26: AnswerModel = {
      idAnswer: this.idAnswer + 25,
      idQuestion: 16,
      idOptionAnswers: [answerForm.value.four],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: [248, 249, 250].includes(answerForm.value.four) ? 1 : 0,
    };

    let answer27: AnswerModel = {
      idAnswer: this.idAnswer + 26,
      idQuestion: 17,
      idOptionAnswers: [answerForm.value.five],
      openAnswer: '',
      idPoll: this.idPoll,
      type: 'CHILDREN',
      score: [252, 253, 254].includes(answerForm.value.five) ? 1 : 0,
    };

    this.answerList.push(answer23, answer24, answer25, answer26, answer27);
  }

  sendQuantitativeInstrument(answerFormList: Array<FormGroup>) {
    answerFormList.forEach(answerForm => {
      if (answerForm.value.firstName)
        this.saveAnswerPersonalInfo(answerForm);

      if (answerForm.value.sex)
        this.saveAnswerSecundaryInfo(answerForm);

      if (answerForm.value.comorbilities)
        this.saveAnswerComorbidity(answerForm);

      if (answerForm.value.one)
        this.saveAnswerFactor(answerForm);

    });

    this.answerList.forEach(x => this.score = this.score + x.score)

    let poll: PollModel = {
      approvalDoc: "/document",
      evidence: "evidence",
      idCity: 1,
      idPoll: this.idPoll,
      type: "CHILDREN",
    };

    let alert: AlertModel = {
      idAlert: 1,
      idPoll: this.idPoll,
      score: this.score,
      professional: this.professional,
      beneficiary: this.beneficiary,
      municipality: this.municipality,
      date: this.date,
      nameBeneficiary: this.personalInfo.value.firstName,
      lastNameBeneficiary: this.lastNameBeneficiary,
      identification: this.identification,
      typeIdentification: this.typeIdentification,
      cellphone: this.personalInfo.value.cellphone
    }

    this.quanInstService.createAnswer(this.answerList).subscribe({
      next: () => {
        this.openSnackBar('Se guardó correctamente el formulario CHILDREN', 'Aceptar')

        this.quanInstService.createPoll(poll).subscribe({
          next: () => {
            this.openSnackBar('Se guardó correctamente la encuesta (Poll)', 'Aceptar');
          },error: ()=>{
            this.openSnackBar('No se guardó correctamente la encuesta (Poll)', 'Aceptar');
          }
        })

        if(this.score >= 6){
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
        this.openSnackBar('No se guardó correctamente el formulario del INSTRUMENTO NIÑOS', 'Aceptar');
      }
    });

  }

  private scoreModeStudy(studyMode: number): any {
    switch (studyMode) {
      case 216 :
        return 1;
      case 217:
        return 3;
      case 218:
        return 2;
    }
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
        this.typeHomeQuestion = this.questions.filter(x => x.idQuestion === idQuestion);
        this.typeHomeQuestion.forEach(item => this.typeHomeList = item.optionAnswerDtoList);
        break;
      case 8:
        this.accessServiciesQuestion = this.questions.filter(x => x.idQuestion === idQuestion);
        this.accessServiciesQuestion.forEach(item => this.accessServiciesList = item.optionAnswerDtoList);
        break;
      case 9:
        this.educationLevelQuestion = this.questions.filter(x => x.idQuestion === idQuestion);
        this.educationLevelQuestion.forEach(item => this.educationLevelList = item.optionAnswerDtoList);
        break;
      case 10:
        this.studyModeQuestion = this.questions.filter(x => x.idQuestion === idQuestion);
        this.studyModeQuestion.forEach(item => this.studyModeList = item.optionAnswerDtoList);
        break;
      case 11:
        this.socialSecurityQuestion = this.questions.filter(x => x.idQuestion === idQuestion);
        this.socialSecurityQuestion.forEach(item => this.socialSecurityList = item.optionAnswerDtoList);
        break;
      case 12:
        this.comorbilitiesQuestion = this.questions.filter(x => x.idQuestion === idQuestion);
        this.comorbilitiesQuestion.forEach(item => this.comorbilitiesList = item.optionAnswerDtoList);
        break;
      case 204:
        this.typeIdentificationQuestion = this.questions.filter(x => x.idQuestion === idQuestion);
        this.typeIdentificationQuestion.forEach(item => this.typeIdentificationList = item.optionAnswerDtoList);
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

  metodoPrueba(){
    console.log('El sexo es: ',this.sociodemographicFactors.value.sex,'La etnia es: ',this.sociodemographicFactors.value.ethnicity)
  }

}
