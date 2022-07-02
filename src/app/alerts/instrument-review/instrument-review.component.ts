import {Component, OnInit} from '@angular/core';
import {AlertsService} from "../alerts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import {DialogInactiveAlertComponent} from "../dialogs/dialog-inactive-alert/dialog-inactive-alert.component";
import {DialogRasmComponent} from "../dialogs/dialog-rasm/dialog-rasm.component";

export interface DialogData {
  id_poll: string;
}

@Component({
  selector: 'app-instrument-review',
  templateUrl: './instrument-review.component.html',
  styleUrls: ['./instrument-review.component.scss']
})
export class InstrumentReviewComponent implements OnInit {

  public capturaIdPollUrl: any;
  id_poll!: string;

  form: FormGroup;
  resultadoFinalInstrumentos: any = [];
  resultadoFinalFicha: any = [];

  constructor(public dialog: MatDialog,
              private alertsService: AlertsService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      type_rasm: ['', Validators.required]
    })
  }


  ngOnInit(): void {
    //capturamos id_poll de la URL
    this.route.paramMap.subscribe((paramMap: any) => {
      const {params} = paramMap
      this.capturaIdPollUrl = params.variable
    })
    this.loadQuantitativeInstrument();
    this.loadAnswerPsychosocial();
  }


  //Carga preguntas y respuestas deL INSTRUMENTO CUANTITATIVO
  private loadQuantitativeInstrument() {
    //opción dos

    //ahora nos traemos la pregunta perteneciente al id question
    this.alertsService.getQuestionsAdult().subscribe(data => {
      let extractingQuestions: any = data;
      extractingQuestions.forEach((recorriendoQuestion: any) => {
        this.alertsService.getAnswerByIdPollAndIdQuestion(this.capturaIdPollUrl, recorriendoQuestion.idQuestion).subscribe(data2=>{

          let extractingAnswers:any = data2;
          extractingAnswers.forEach((recorriendoAnswers: any)=>{

            if(recorriendoAnswers.idOptionAnswers == ''){ //Si está vacío significa que la respuesta es de tipo abierta
              console.log('Las preguntas son: ', recorriendoQuestion.description)
              console.log('Las respuestas son: ', recorriendoAnswers.openAnswer)
              this.resultadoFinalInstrumentos.push({
                pregunta: recorriendoQuestion.description,
                respuesta: recorriendoAnswers.openAnswer
              })
            }else{//si no está vacío puede tener una o varias respuestas en el array así que lo recorremos

              recorriendoAnswers.idOptionAnswers.forEach((recorriendoOptionAnswers1:any)=>{
                //console.log('Los datos son: ',recorriendoOptionAnswers1)
                this.alertsService.getOtionAnswerByIdOptionAnswer(recorriendoOptionAnswers1).subscribe(data3=>{
                  let extractingOptionAnswer:any = data3;
                  extractingOptionAnswer.forEach((recorriendoOptionAnswer:any)=>{
                    console.log('Las preguntas son: ', recorriendoQuestion.description)
                    console.log('Las respuestas son: ', recorriendoOptionAnswer.description)
                    this.resultadoFinalInstrumentos.push({
                      pregunta: recorriendoQuestion.description,
                      respuesta: recorriendoOptionAnswer.description
                    })
                  })
                })
              })



            }


          })

        })


      })
    })

  }

  //Carga preguntas y respuestas de la FICHA DE ATENCIÓN
  private loadAnswerPsychosocial() {
    this.alertsService.getAnswerPsychosocialByIdPoll(this.capturaIdPollUrl).subscribe(data => {
      let extrayendoAnsPsyIdQuestion: any = data;
      extrayendoAnsPsyIdQuestion.forEach((recorriendoAnsPsy: any) => {
        //ahora nos traemos la pregunta perteneciente al id question
        this.alertsService.getQuestionByIdQuestion(recorriendoAnsPsy.id_question).subscribe(data2 => {
          let extrayendoQuestion: any = data2;
          extrayendoQuestion.forEach((recorriendoQuestion: any) => {
            this.resultadoFinalFicha.push({
              pregunta: recorriendoQuestion.description,
              respuesta: recorriendoAnsPsy.open_answer
            })
          })
        })

      })

    })
  }


  //DIALOGS

  openDialogInactiveAlert(): void {
    const dialogRef = this.dialog.open(DialogInactiveAlertComponent, {
      width: '400px',
      data: {id_poll: this.capturaIdPollUrl}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog inactive-alerts was closed');
    });
  }

  openDialogRASM(): void {
    const dialogRef = this.dialog.open(DialogRasmComponent, {
      width: '450px',
      data: {id_poll: this.capturaIdPollUrl}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog rasm was closed');
    });
  }


}
