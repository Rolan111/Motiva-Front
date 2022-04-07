import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TrackingSheetService} from "../tracking-sheet/tracking-sheet.service";
import {CareSheetService} from "./care-sheet.service";
import {AnswerPsychosocialModel} from "./answer-psychosocial.model";


@Component({
  selector: 'app-care-sheet',
  templateUrl: './care-sheet.component.html',
  styleUrls: ['./care-sheet.component.scss']
})
export class CareSheetComponent implements OnInit {

  listaDeRespuestas: AnswerPsychosocialModel [] = [];

  nivelIntervencionModeloBiopsicosocial: string[] = ['Promoción de la salud', 'Prevención de la enfermedad', 'Adherencia al tratamiento', 'Afrontamiento de la enfermedad', 'Psicooncología', 'Manejo del dolor', 'Intervención en enfermedades crónicas transmisibles y no transmisibles'];
  listaPrevencionEnfermedad: string[] = ['Primario', 'Secundario', 'Terciario', 'Cuaternario'];

  public listaValidandoCareSheet: any = [];
  public listaOpcionesDeRespuesta: any = [];

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
    private route: ActivatedRoute,
    private trackingSheetService: TrackingSheetService,
    private formBuilder: FormBuilder,
    private careSheetService: CareSheetService
  ) {
    this.form = this.formBuilder.group({
        capturaIdPoll: ['', Validators.required],
        city: ['', Validators.required],
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
        phone: ['', Validators.required],

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
        especifique_promocionSalud: ['', Validators.required],
        seleccione_prevencionEnfermedad: [Validators.required],

        professionalName: ['', Validators.required],
        TP: ['', Validators.required],
        Profession: ['', Validators.required]
      }
    );

  }

  ngOnInit(): void {
    this.careSheetService.getInstrumentAnswers().subscribe(respuesta => {
      this.listaValidandoCareSheet = respuesta;
      this.listaValidandoCareSheet.forEach((recorriendoArray: any) => {
        this.form.get('capturaIdPoll')?.setValue(recorriendoArray.id_poll);
        if (recorriendoArray.id_question == 5) {
          this.form.get('city')?.setValue(recorriendoArray.open_answer);
        }

        if (recorriendoArray.id_question == 2) {
          this.form.get('sex')?.setValue(recorriendoArray.open_answer);
        }

          if (recorriendoArray.id_question == 1) {
            this.form.get('age')?.setValue(recorriendoArray.open_answer);
          }

          if (recorriendoArray.id_question == 200) {
            this.form.get('name')?.setValue(recorriendoArray.open_answer);
          }

          if (recorriendoArray.id_question == 202) {
            this.form.get('lastName')?.setValue(recorriendoArray.open_answer);
          }

          if (recorriendoArray.id_question == 205) {
            this.form.get('identificationNumber')?.setValue(recorriendoArray.open_answer);
          }

          if (recorriendoArray.id_question == 3) {//Traemos las opciones de respuestas
            recorriendoArray.id_option_answers.forEach((recorriendo2: bigint) => {

              this.careSheetService.getOpcionesRespuestas(recorriendo2).subscribe((respuesta2: any) => {
                this.listaOpcionesDeRespuesta = respuesta2;
                this.listaOpcionesDeRespuesta.forEach((recorriendo3: any) => {
                  this.form.get('ethnicity')?.setValue(recorriendo3.description);
                })

              })

            })
          }

        });
      }
    );

  }


  public saveForm() {
    this.listaDeRespuestas.push({
      id_question: 101,
      id_option_answer: 0,
      open_answer: this.form.value.departament,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 102,
      id_option_answer: 0,
      open_answer: this.form.value.evaluationDate,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 110,
      id_option_answer: 0,
      open_answer: this.form.value.religion,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 111,
      id_option_answer: 0,
      open_answer: this.form.value.placeBirth,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 112,
      id_option_answer: 0,
      open_answer: this.form.value.origin,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 113,
      id_option_answer: 0,
      open_answer: this.form.value.originAddress,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 114,
      id_option_answer: 0,
      open_answer: this.form.value.neighborhood,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 115,
      id_option_answer: 0,
      open_answer: this.form.value.stratum,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 116,
      id_option_answer: 0,
      open_answer: this.form.value.phone,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 117,
      id_option_answer: 0,
      open_answer: this.form.value.reasonConsultation,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 118,
      id_option_answer: 0,
      open_answer: this.form.value.currentIllness,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 119,
      id_option_answer: 0,
      open_answer: this.form.value.AP_APS_Observations,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 120,
      id_option_answer: 0,
      open_answer: this.form.value.AP_APS_Diagnostics,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 121,
      id_option_answer: 0,
      open_answer: this.form.value.AP_APS_Medicine,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 122,
      id_option_answer: 0,
      open_answer: this.form.value.AP_APS_Dose,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 123,
      id_option_answer: 0,
      open_answer: this.form.value.AP_APS_Time,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 124,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AM_Observations,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 125,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AM_Diagnostics,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 126,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AM_Medicine,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 127,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AM_Dose,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 128,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AM_Time,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 129,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AQ_Observations,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 130,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AR_employmentSituation,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 131,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AR_Relationships,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 132,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AR_socialRelationships,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 133,
      id_option_answer: 0,
      open_answer: this.form.value.AP_AR_familyRelationships,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 134,
      id_option_answer: 0,
      open_answer: this.form.value.AF_APS_Observations,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 135,
      id_option_answer: 0,
      open_answer: this.form.value.AF_AM_Observations,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 136,
      id_option_answer: 0,
      open_answer: this.form.value.EM_Time,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 137,
      id_option_answer: 0,
      open_answer: this.form.value.EM_Place,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 138,
      id_option_answer: 0,
      open_answer: this.form.value.EM_Person,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 139,
      id_option_answer: 0,
      open_answer: this.form.value.EM_Observations,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });

    this.listaDeRespuestas.push({
      id_question: 140,
      id_option_answer: 0,
      open_answer: this.form.value.EPIS_healthProblems,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 141,
      id_option_answer: 0,
      open_answer: this.form.value.EPIS_healthBeliefSystem,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 142,
      id_option_answer: 0,
      open_answer: this.form.value.EPIS_copingWithIllness,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 143,
      id_option_answer: 0,
      open_answer: this.form.value.EPIS_diagnosticImpression,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });

    switch (this.form.value.nivelIntervencionElegida) {
      case "Promoción de la salud":
        this.listaDeRespuestas.push({
          id_question: 144,
          id_option_answer: 300,
          open_answer: this.form.value.especifique_promocionSalud,
          id_clinic_history: 1,
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Prevención de la enfermedad":
        this.listaDeRespuestas.push({
          id_question: 144,
          id_option_answer: 301,
          open_answer: this.form.value.seleccione_prevencionEnfermedad,
          id_clinic_history: 1,
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Adherencia al tratamiento":
        this.listaDeRespuestas.push({
          id_question: 144,
          id_option_answer: 302,
          open_answer: "",
          id_clinic_history: 1,
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Afrontamiento de la enfermedad":
        this.listaDeRespuestas.push({
          id_question: 144,
          id_option_answer: 303,
          open_answer: "",
          id_clinic_history: 1,
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Psicooncología":
        this.listaDeRespuestas.push({
          id_question: 144,
          id_option_answer: 304,
          open_answer: "",
          id_clinic_history: 1,
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Manejo del dolor":
        this.listaDeRespuestas.push({
          id_question: 144,
          id_option_answer: 305,
          open_answer: "",
          id_clinic_history: 1,
          id_poll: this.form.value.capturaIdPoll
        });
        break
      case "Intervención en enfermedades crónicas transmisibles y no transmisibles":
        this.listaDeRespuestas.push({
          id_question: 144,
          id_option_answer: 306,
          open_answer: "",
          id_clinic_history: 1,
          id_poll: this.form.value.capturaIdPoll
        });
        break

    }

    this.listaDeRespuestas.push({
      id_question: 145,
      id_option_answer: 0,
      open_answer: this.form.value.professionalName,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 146,
      id_option_answer: 0,
      open_answer: this.form.value.TP,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });
    this.listaDeRespuestas.push({
      id_question: 147,
      id_option_answer: 0,
      open_answer: this.form.value.Profession,
      id_clinic_history: 1,
      id_poll: this.form.value.capturaIdPoll
    });

    //Procedemos a guardar
    for (let guardando of this.listaDeRespuestas) {
      this.careSheetService.create2(guardando).subscribe()
    }

  }

}

