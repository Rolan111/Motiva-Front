import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  edadCalculada: any = 0;
  listaDeRespuestas: AnswerPsychosocialModel [] = [];
  // listaDeRespuestas: Array<AnswerPsychosocialModel> = [];

  nivelIntervencionModeloBiopsicosocial: string[] = ['Prevención de la enfermedad', 'Adherencia al tratamiento', 'Afrontamiento de la enfermedad', 'Psicooncología', 'Manejo del dolor', 'Intervención en enfermedades crónicas transmisibles y no transmisibles'];

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

  form: FormGroup;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public careSheetService: CareSheetService
  ) {
    //Construcción del Formulario
    this.form = this.formBuilder.group({
      capturaIdPoll: [this.careSheetService.shareIdPoll, Validators.required],
      city: [this.careSheetService.shareCity, Validators.required],
      departament: ['Cauca'],
      evaluationDate: ['', Validators.required],
      sex: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      age: ['', Validators.required],
      dateBirth: ['', Validators.required],

      ethnicity: ['', Validators.required],
      religion: ['', Validators.required],
      placeBirth: ['', Validators.required],
      origin: ['', Validators.required],
      originAddress: ['', Validators.required],
      neighborhood: ['', Validators.required],
      stratum: ['', Validators.required],
      phone: this.careSheetService.sharePhone,

      reasonConsultation: ['', Validators.required],
      currentIllness: ['', Validators.required],
      AP_APS_Observations: ['', Validators.required],
      AP_APS_Diagnostics: ['', Validators.required],
      AP_APS_Medicine: ['', Validators.required],
      AP_APS_Dose: ['', Validators.required],
      AP_APS_Time: ['', Validators.required],

      AP_AM_Observations: ['', Validators.required],
        AP_AM_Diagnostics: ['', Validators.required],
        AP_AM_Medicine: ['', Validators.required],
        AP_AM_Dose: ['', Validators.required],
        AP_AM_Time: ['', Validators.required],

        AP_AQ_Observations: ['', Validators.required],

        AP_AR_employmentSituation: ['', Validators.required],
        AP_AR_Relationships: ['', Validators.required],
        AP_AR_socialRelationships: ['', Validators.required],
        AP_AR_familyRelationships: ['', Validators.required],

        AF_APS_Observations: ['', Validators.required],
        AF_AM_Observations: ['', Validators.required],

        EM_Time: ['', Validators.required],
        EM_Place: ['', Validators.required],
        EM_Person: ['', Validators.required],
        EM_Observations: ['', Validators.required],

        EPIS_healthProblems: ['', Validators.required],
        EPIS_healthBeliefSystem: ['', Validators.required],
        EPIS_copingWithIllness: ['', Validators.required],
        EPIS_diagnosticImpression: ['', Validators.required],
        nivelIntervencionElegida: [Validators.required],
        especifique_promocionSalud: [''],
        seleccione_prevencionEnfermedad: [Validators.required],

        professionalName: ['', Validators.required],
        Profession: ['', Validators.required]
      }
    );

  }


  ngOnInit(): void {
    this.form.get('evaluationDate')?.setValue(new Date().toLocaleDateString())
    switch (this.careSheetService.shareSex) {
      case 1: {
        this.form.get('sex')?.setValue('Hombre')
        break;
      }
      case 2: {
        this.form.get('sex')?.setValue('Mujer')
        break;
      }

      case 3: {
        this.form.get('sex')?.setValue('Indeterminado')
        break;
      }
      default: {
        this.form.get('sex')?.setValue('Esperando...')
        break;
      }
    }

    this.form.get('name')?.setValue(this.careSheetService.shareName)
    this.form.get('lastName')?.setValue(this.careSheetService.shareLastName)
    this.form.get('identificationNumber')?.setValue(this.careSheetService.shareIdentificationNumber)

    switch (this.careSheetService.shareEthnicity) {
      case 4: {
        this.form.get('ethnicity')?.setValue('Indígena')
        break;
      }

      case 5: {
        this.form.get('ethnicity')?.setValue('Afrodescendiente/Afrocolombiano')
        break;
      }

      case 6: {
        this.form.get('ethnicity')?.setValue('Gitano/Rrom')
        break;
      }

      case 7: {
        this.form.get('ethnicity')?.setValue('Palenquero')
        break;
      }
      case 8: {
        this.form.get('ethnicity')?.setValue('Raizal')
        break;
      }

      case 9: {
        this.form.get('ethnicity')?.setValue('Ninguno')
        break;
      }

      default: {
        this.form.get('ethnicity')?.setValue('Esperando...')
        break;
      }
    }

  }

  calculandoEdad() {
    let fechaSeleccionada: any = this.form.value.dateBirth;
    let fechaActual: any = new Date();
    let diferenciaTiempo: any = Math.abs(fechaActual - fechaSeleccionada);
    let age = Math.floor((diferenciaTiempo / (1000 * 3600 * 24)) / 365.25);
    this.form.get('age')?.setValue(age)
    this.edadCalculada = age;
  }

  public saveForm() {
    this.listaDeRespuestas.push({
      id_question: 101,
      id_option_answer: 0,
      open_answer: this.form.value.departament,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 102,
      id_option_answer: 0,
      open_answer: this.form.value.evaluationDate,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 110,
      id_option_answer: 0,
      open_answer: this.form.value.religion,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 111,
      id_option_answer: 0,
      open_answer: this.form.value.placeBirth,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 112,
      id_option_answer: 0,
      open_answer: this.form.value.origin,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 113,
      id_option_answer: 0,
      open_answer: this.form.value.originAddress,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 114,
      id_option_answer: 0,
      open_answer: this.form.value.neighborhood,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 115,
      id_option_answer: 0,
      open_answer: this.form.value.stratum,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 116,
      id_option_answer: 0,
      open_answer: this.form.value.phone,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 117,
      id_option_answer: 0,
      open_answer: this.form.value.reasonConsultation,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 118,
      id_option_answer: 0,
      open_answer: this.form.value.currentIllness,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 119,
      id_option_answer: 0,
      open_answer: this.form.value.AP_APS_Observations,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 120,
      id_option_answer: 0,
      open_answer: this.form.value.AP_APS_Diagnostics,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 121,
      id_option_answer: 0,
      open_answer: this.form.value.AP_APS_Medicine,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 122,
      id_option_answer: 0,
      open_answer: this.form.value.AP_APS_Dose,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 123,
      id_option_answer: 0,
      open_answer: this.form.value.AP_APS_Time,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 124,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AM_Observations,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 125,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AM_Diagnostics,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 126,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AM_Medicine,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 127,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AM_Dose,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 128,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AM_Time,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 129,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AQ_Observations,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 130,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AR_employmentSituation,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 131,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AR_Relationships,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 132,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AR_socialRelationships,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 133,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AR_familyRelationships,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 134,
      id_option_answer: 0,
      open_answer: this.form.value.AF_APS_Observations,
      id_poll: this.form.value.capturaIdPoll
    });

    //REVISAR ORDEN
    this.listaDeRespuestas.push({
      id_question: 135,
      id_option_answer: 0,
      open_answer: this.form.value.AF_AM_Observations,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 136,
      id_option_answer: 0,
      open_answer: this.form.value.EM_Time,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 137,
      id_option_answer: 0,
      open_answer: this.form.value.EM_Place,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 138,
      id_option_answer: 0,
      open_answer: this.form.value.EM_Person,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 139,
      id_option_answer: 0,
      open_answer: this.form.value.EM_Observations,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 140,
      id_option_answer: 0,
      open_answer: this.form.value.EPIS_healthProblems,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 141,
      id_option_answer: 0,
      open_answer: this.form.value.EPIS_healthBeliefSystem,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 142,
      id_option_answer: 0,
      open_answer: this.form.value.EPIS_copingWithIllness,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 143,
      id_option_answer: 0,
      open_answer: this.form.value.EPIS_diagnosticImpression,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 144,
      id_option_answer: 300,
      open_answer: this.form.value.especifique_promocionSalud,
      id_poll: this.form.value.capturaIdPoll
    });


    switch (this.form.value.nivelIntervencionElegida) {

      case "Prevención de la enfermedad":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 301,
          open_answer: this.form.value.seleccione_prevencionEnfermedad,
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Adherencia al tratamiento":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 302,
          open_answer: "",
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Afrontamiento de la enfermedad":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 303,
          open_answer: "",
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Psicooncología":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 304,
          open_answer: "",
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Manejo del dolor":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 305,
          open_answer: "",
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Intervención en enfermedades crónicas transmisibles y no transmisibles":
        this.listaDeRespuestas.push({
          id_question: 145,
          id_option_answer: 306,
          open_answer: "",
          id_poll: this.form.value.capturaIdPoll
        });
        break

    }

    this.listaDeRespuestas.push({
      id_question: 146,
      id_option_answer: 0,
      open_answer: this.form.value.professionalName,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 147,
      id_option_answer: 0,
      open_answer: this.form.value.Profession,
      id_poll: this.form.value.capturaIdPoll
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


  //Validators
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.form.controls[controlName];

    if (!control)
      return false;

    return control.hasError(validationType) && (control.dirty || control.touched);
  }



}

