import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CareSheetService} from "./care-sheet.service";
import {AnswerPsychosocialModel} from "./answer-psychosocial.model";
import {ToastrService} from "ngx-toastr";
import {Observable, of} from "rxjs";


@Component({
  selector: 'app-care-sheet',
  templateUrl: './care-sheet.component.html',
  styleUrls: ['./care-sheet.component.scss']
})
export class CareSheetComponent implements OnInit {
  maxDate = new Date();
  edadCalculada: any = 0;
  contadoclicks = 0;

  firstGroup = 0;
  bvariable = 0;

  listaDeRespuestas: AnswerPsychosocialModel [] = [];
  // listaDeRespuestas: Array<AnswerPsychosocialModel> = [];

  nivelIntervencionModeloBiopsicosocial: string[] = ['Prevención de la enfermedad', 'Adherencia al tratamiento', 'Afrontamiento de la enfermedad', 'Psicooncología', 'Manejo del dolor', 'Intervención en enfermedades crónicas transmisibles y no transmisibles','Ninguno'];

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


  formPersonalInfo!: FormGroup;
  formOrigin!: FormGroup;
  formConsultation!: FormGroup;

  formAP_PsychiatricHistory!: FormGroup;
  formAP_MedicalHistory!: FormGroup;
  formAP_SurgicalHistory!: FormGroup;
  formAP_RelationalHistory!: FormGroup;

  formAF_PsychiatricHistory!: FormGroup;
  formAF_MedicalHistory!: FormGroup;

  formStateOfMind!: FormGroup;
  formPsychosocialEvaluation!: FormGroup;
  formInterventionLevel!: FormGroup;
  formResponsibleProfessional!: FormGroup;


  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public careSheetService: CareSheetService
  ) {


  }


  ngOnInit(): void {
    this.formCareSheet();

    this.formPersonalInfo.get('evaluationDate')?.setValue(new Date().toLocaleDateString())

    switch (this.careSheetService.shareSex) {
      case 1: {
        this.formPersonalInfo.get('sex')?.setValue('Hombre')
        break;
      }
      case 2: {
        this.formPersonalInfo.get('sex')?.setValue('Mujer')
        break;
      }

      case 3: {
        this.formPersonalInfo.get('sex')?.setValue('Indeterminado')
        break;
      }
      default: {
        this.formPersonalInfo.get('sex')?.setValue('Esperando...')
        break;
      }
    }

    this.formPersonalInfo.get('name')?.setValue(this.careSheetService.shareName)
    this.formPersonalInfo.get('lastName')?.setValue(this.careSheetService.shareLastName)
    this.formPersonalInfo.get('identificationNumber')?.setValue(this.careSheetService.shareIdentificationNumber)

    switch (this.careSheetService.shareEthnicity) {
      case 4: {
        this.formOrigin.get('ethnicity')?.setValue('Indígena')
        break;
      }

      case 5: {
        this.formOrigin.get('ethnicity')?.setValue('Afrodescendiente/Afrocolombiano')
        break;
      }

      case 6: {
        this.formOrigin.get('ethnicity')?.setValue('Gitano/Rrom')
        break;
      }

      case 7: {
        this.formOrigin.get('ethnicity')?.setValue('Palenquero')
        break;
      }
      case 8: {
        this.formOrigin.get('ethnicity')?.setValue('Raizal')
        break;
      }

      case 9: {
        this.formOrigin.get('ethnicity')?.setValue('Ninguno')
        break;
      }

      default: {
        this.formOrigin.get('ethnicity')?.setValue('Esperando...')
        break;
      }
    }

  }

  calculandoEdad() {
    let fechaSeleccionada: any = this.formPersonalInfo.value.dateBirth;
    let fechaActual: any = new Date();
    let diferenciaTiempo: any = Math.abs(fechaActual - fechaSeleccionada);
    let age = Math.floor((diferenciaTiempo / (1000 * 3600 * 24)) / 365.25);
    this.formPersonalInfo.get('age')?.setValue(age)
    this.edadCalculada = age;
  }

  //Guardado de datos
  public saveForm() {
    //Información personal
    this.listaDeRespuestas.push({
      id_question: 101,
      id_option_answer: 0,
      open_answer: this.formPersonalInfo.value.departament,
      id_poll: this.formPersonalInfo.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 102,
      id_option_answer: 0,
      open_answer: this.formPersonalInfo.value.evaluationDate,
      id_poll: this.formPersonalInfo.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 110,
      id_option_answer: 0,
      open_answer: this.formOrigin.value.religion,
      id_poll: this.formOrigin.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 111,
      id_option_answer: 0,
      open_answer: this.formOrigin.value.placeBirth,
      id_poll: this.formOrigin.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 112,
      id_option_answer: 0,
      open_answer: this.formOrigin.value.origin,
      id_poll: this.formOrigin.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 113,
      id_option_answer: 0,
      open_answer: this.formOrigin.value.originAddress,
      id_poll: this.formOrigin.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 114,
      id_option_answer: 0,
      open_answer: this.formOrigin.value.neighborhood,
      id_poll: this.formOrigin.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 115,
      id_option_answer: 0,
      open_answer: this.formOrigin.value.stratum,
      id_poll: this.formOrigin.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 116,
      id_option_answer: 0,
      open_answer: this.formOrigin.value.phone,
      id_poll: this.formOrigin.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 117,
      id_option_answer: 0,
      open_answer: this.formConsultation.value.reasonConsultation,
      id_poll: this.formConsultation.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 118,
      id_option_answer: 0,
      open_answer: this.formConsultation.value.currentIllness,
      id_poll: this.formConsultation.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 119,
      id_option_answer: 0,
      open_answer: this.formAP_PsychiatricHistory.value.AP_APS_Observations,
      id_poll: this.formAP_PsychiatricHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 120,
      id_option_answer: 0,
      open_answer: this.formAP_PsychiatricHistory.value.AP_APS_Diagnostics,
      id_poll: this.formAP_PsychiatricHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 121,
      id_option_answer: 0,
      open_answer: this.formAP_PsychiatricHistory.value.AP_APS_Medicine,
      id_poll: this.formAP_PsychiatricHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 122,
      id_option_answer: 0,
      open_answer: this.formAP_PsychiatricHistory.value.AP_APS_Dose,
      id_poll: this.formAP_PsychiatricHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 123,
      id_option_answer: 0,
      open_answer: this.formAP_PsychiatricHistory.value.AP_APS_Time,
      id_poll: this.formAP_PsychiatricHistory.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 124,
      id_option_answer: 0,
      open_answer: this.formAP_MedicalHistory.value.AP_AM_Observations,
      id_poll: this.formAP_MedicalHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 125,
      id_option_answer: 0,
      open_answer: this.formAP_MedicalHistory.value.AP_AM_Diagnostics,
      id_poll: this.formAP_MedicalHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 126,
      id_option_answer: 0,
      open_answer: this.formAP_MedicalHistory.value.AP_AM_Medicine,
      id_poll: this.formAP_MedicalHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 127,
      id_option_answer: 0,
      open_answer: this.formAP_MedicalHistory.value.AP_AM_Dose,
      id_poll: this.formAP_MedicalHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 128,
      id_option_answer: 0,
      open_answer: this.formAP_MedicalHistory.value.AP_AM_Time,
      id_poll: this.formAP_MedicalHistory.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 129,
      id_option_answer: 0,
      open_answer: this.formAP_SurgicalHistory.value.AP_AQ_Observations,
      id_poll: this.formAP_MedicalHistory.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 130,
      id_option_answer: 0,
      open_answer: this.formAP_RelationalHistory.value.AP_AR_employmentSituation,
      id_poll: this.formAP_RelationalHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 131,
      id_option_answer: 0,
      open_answer: this.formAP_RelationalHistory.value.AP_AR_Relationships,
      id_poll: this.formAP_RelationalHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 132,
      id_option_answer: 0,
      open_answer: this.formAP_RelationalHistory.value.AP_AR_socialRelationships,
      id_poll: this.formAP_RelationalHistory.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 133,
      id_option_answer: 0,
      open_answer: this.formAP_RelationalHistory.value.AP_AR_familyRelationships,
      id_poll: this.formAP_RelationalHistory.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 134,
      id_option_answer: 0,
      open_answer: this.formAF_PsychiatricHistory.value.AF_APS_Observations,
      id_poll: this.formAF_PsychiatricHistory.value.capturaIdPoll
    });

    //REVISAR ORDEN
    this.listaDeRespuestas.push({
      id_question: 135,
      id_option_answer: 0,
      open_answer: this.formAF_MedicalHistory.value.AF_AM_Observations,
      id_poll: this.formAF_MedicalHistory.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 136,
      id_option_answer: 0,
      open_answer: this.formStateOfMind.value.EM_Time,
      id_poll: this.formStateOfMind.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 137,
      id_option_answer: 0,
      open_answer: this.formStateOfMind.value.EM_Place,
      id_poll: this.formStateOfMind.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 138,
      id_option_answer: 0,
      open_answer: this.formStateOfMind.value.EM_Person,
      id_poll: this.formStateOfMind.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 139,
      id_option_answer: 0,
      open_answer: this.formStateOfMind.value.EM_Observations,
      id_poll: this.formStateOfMind.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 140,
      id_option_answer: 0,
      open_answer: this.formPsychosocialEvaluation.value.EPIS_healthProblems,
      id_poll: this.formPsychosocialEvaluation.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 141,
      id_option_answer: 0,
      open_answer: this.formPsychosocialEvaluation.value.EPIS_healthBeliefSystem,
      id_poll: this.formPsychosocialEvaluation.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 142,
      id_option_answer: 0,
      open_answer: this.formPsychosocialEvaluation.value.EPIS_copingWithIllness,
      id_poll: this.formPsychosocialEvaluation.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 143,
      id_option_answer: 0,
      open_answer: this.formPsychosocialEvaluation.value.EPIS_diagnosticImpression,
      id_poll: this.formPsychosocialEvaluation.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 144,
      id_option_answer: 300,
      open_answer: this.formInterventionLevel.value.especifique_promocionSalud,
      id_poll: this.formInterventionLevel.value.capturaIdPoll
    });


    switch (this.formInterventionLevel.value.nivelIntervencionElegida) {

      case "Prevención de la enfermedad":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 301,
          open_answer: this.formInterventionLevel.value.seleccione_prevencionEnfermedad,
          id_poll: this.formInterventionLevel.value.capturaIdPoll
        });
        break
      case "Adherencia al tratamiento":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 302,
          open_answer: "",
          id_poll: this.formInterventionLevel.value.capturaIdPoll
        });
        break
      case "Afrontamiento de la enfermedad":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 303,
          open_answer: "",
          id_poll: this.formInterventionLevel.value.capturaIdPoll
        });
        break
      case "Psicooncología":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 304,
          open_answer: "",
          id_poll: this.formInterventionLevel.value.capturaIdPoll
        });
        break
      case "Manejo del dolor":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 305,
          open_answer: "",
          id_poll: this.formInterventionLevel.value.capturaIdPoll
        });
        break
      case "Intervención en enfermedades crónicas transmisibles y no transmisibles":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 306,
          open_answer: "",
          id_poll: this.formInterventionLevel.value.capturaIdPoll
        });
        break

    }

    this.listaDeRespuestas.push({
      id_question: 146,
      id_option_answer: 0,
      open_answer: this.formResponsibleProfessional.value.professionalName,
      id_poll: this.formResponsibleProfessional.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 147,
      id_option_answer: 0,
      open_answer: this.formResponsibleProfessional.value.Profession,
      id_poll: this.formResponsibleProfessional.value.capturaIdPoll
    });

    //PROCEDEMOS A GUARDAR

    // Guardado tipo 1
    // for (let guardando of this.listaDeRespuestas) {
    //   this.careSheetService.create(guardando).subscribe(value => {
    //   }, error => {
    //     this.toastr.error('¡La información no se ha podido registrar!', 'Error')
    //   }, () => {
    //   })
    // }
    // this.toastr.success('¡La información ha sido registrada!', 'Enviado');


    //Guardado Tipo 2

      this.careSheetService.create2(this.listaDeRespuestas).subscribe(value => {
        // this.toastr.success('¡La información ha sido registrada!', 'Enviado');
      }, error => {
        this.toastr.error('¡La información no se ha podido registrar!', 'Error')
        this.listaDeRespuestas = [];
      }, () => {
        this.toastr.success('¡La información ha sido registrada!', 'Enviado');
        this.listaDeRespuestas = [];
        this.router.navigate(['navbar/dashboard'])
      })

  }




  private formCareSheet(){

    this.formPersonalInfo = this.formBuilder.group({
      capturaIdPoll: [this.careSheetService.shareIdPoll, Validators.required],
      city: [this.careSheetService.shareCity],
      department: ['Cauca'],
      evaluationDate: ['', Validators.required],
      sex: [''],
      name: [''],
      lastName: [''],
      identificationNumber: ['', Validators.required],
      age: ['', Validators.required],
      dateBirth: ['', Validators.required],
    })
    this.formOrigin = this.formBuilder.group({
      ethnicity: [''],
      religion: ['', Validators.required],
      placeBirth: ['', Validators.required],
      origin: ['', Validators.required],
      originAddress: ['', Validators.required],
      neighborhood: ['', Validators.required],
      stratum: ['', Validators.required],
      phone: this.careSheetService.sharePhone,
    })
    this.formConsultation = this.formBuilder.group({
      reasonConsultation: ['', Validators.required],
      currentIllness: ['', Validators.required],
    })

    //Antecedetes personales
    this.formAP_PsychiatricHistory = this.formBuilder.group({
      AP_APS_Observations: ['', Validators.required],
      AP_APS_Diagnostics: ['', Validators.required],
      AP_APS_Medicine: ['', Validators.required],
      AP_APS_Dose: ['', Validators.required],
      AP_APS_Time: ['', Validators.required],
    })
    this.formAP_MedicalHistory = this.formBuilder.group({
      AP_AM_Observations: ['', Validators.required],
      AP_AM_Diagnostics: ['', Validators.required],
      AP_AM_Medicine: ['', Validators.required],
      AP_AM_Dose: ['', Validators.required],
      AP_AM_Time: ['', Validators.required],
    })
    this.formAP_SurgicalHistory = this.formBuilder.group({
      AP_AQ_Observations: ['', Validators.required],
    })
    this.formAP_RelationalHistory = this.formBuilder.group({
      AP_AR_employmentSituation: ['', Validators.required],
      AP_AR_Relationships: ['', Validators.required],
      AP_AR_socialRelationships: ['', Validators.required],
      AP_AR_familyRelationships: ['', Validators.required],
    })

    //Antecedentes familiares
    this.formAF_PsychiatricHistory = this.formBuilder.group({
      AF_APS_Observations: ['', Validators.required],
    })
    this.formAF_MedicalHistory = this.formBuilder.group({
      AF_AM_Observations: ['', Validators.required],
    })

    this.formStateOfMind = this.formBuilder.group({
      EM_Time: ['', Validators.required],
      EM_Place: ['', Validators.required],
      EM_Person: ['', Validators.required],
      EM_Observations: ['', Validators.required],
    })
    this.formPsychosocialEvaluation = this.formBuilder.group({
      EPIS_healthProblems: ['', Validators.required],
      EPIS_healthBeliefSystem: ['', Validators.required],
      EPIS_copingWithIllness: ['', Validators.required],
      EPIS_diagnosticImpression: ['', Validators.required],
    })
    this.formInterventionLevel = this.formBuilder.group({
      especifique_promocionSalud: ['', [Validators.required]],
      nivelIntervencionElegida: ['Ninguno', [Validators.required]],
      seleccione_prevencionEnfermedad: [Validators.required],
    })
    this.formResponsibleProfessional = this.formBuilder.group({
      professionalName: ['', Validators.required],
      Profession: ['', Validators.required]
    })
  }

  //Validators

  isControlHasErrorPI(controlName: string, validationType: string): boolean {
    const control = this.formPersonalInfo.controls[controlName];
    if (!control)
      return false;
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
  isControlHasErrorOrigin(controlName: string, validationType: string): boolean {
    const control = this.formOrigin.controls[controlName];
    if (!control)
      return false;
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
  isControlHasErrorConsultation(controlName: string, validationType: string): boolean {
    const control = this.formConsultation.controls[controlName];
    if (!control)
      return false;
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
  isControlHasErrorAP_PsychiatricHistory(controlName: string, validationType: string): boolean {
    const control = this.formConsultation.controls[controlName];
    if (!control)
      return false;
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
  isControlHasErrorAP_MedicalHistory(controlName: string, validationType: string): boolean {
    const control = this.formAP_MedicalHistory.controls[controlName];
    if (!control)
      return false;
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
  isControlHasErrorAP_SurgicalHistory(controlName: string, validationType: string): boolean {
      const control = this.formAP_SurgicalHistory.controls[controlName];
      if (!control)
        return false;
      return control.hasError(validationType) && (control.dirty || control.touched);
    }
  isControlHasErrorAP_RelationalHistory(controlName: string, validationType: string): boolean {
      const control = this.formAP_RelationalHistory.controls[controlName];
      if (!control)
        return false;
      return control.hasError(validationType) && (control.dirty || control.touched);
    }
  isControlHasErrorAF_PsychiatricHistory(controlName: string, validationType: string): boolean {
      const control = this.formAF_PsychiatricHistory.controls[controlName];
      if (!control)
        return false;
      return control.hasError(validationType) && (control.dirty || control.touched);
    }
  isControlHasErrorAF_MedicalHistory(controlName: string, validationType: string): boolean {
      const control = this.formAF_MedicalHistory.controls[controlName];
      if (!control)
        return false;
      return control.hasError(validationType) && (control.dirty || control.touched);
    }
  isControlHasErrorStateOfMind(controlName: string, validationType: string): boolean {
      const control = this.formStateOfMind.controls[controlName];
      if (!control)
        return false;
      return control.hasError(validationType) && (control.dirty || control.touched);
    }
  isControlHasErrorPsychosocialEvaluation(controlName: string, validationType: string): boolean {
      const control = this.formPsychosocialEvaluation.controls[controlName];
      if (!control)
        return false;
      return control.hasError(validationType) && (control.dirty || control.touched);
    }
  isControlHasErrorResponsibleProfessional(controlName: string, validationType: string): boolean {
      const control = this.formResponsibleProfessional.controls[controlName];
      if (!control)
        return false;
      return control.hasError(validationType) && (control.dirty || control.touched);
    }

  onFirstGroupChange() {
    this.contadoclicks = this.contadoclicks+1;
    if(this.contadoclicks>1){
      this.formInterventionLevel.controls['']
      this.formInterventionLevel.controls['especifique_promocionSalud'].setErrors(null);
    }
    if(this.firstGroup === 1 ) {
      this.bvariable = this.firstGroup;
    } else {
      this.bvariable = 0;
    }
  }


}

