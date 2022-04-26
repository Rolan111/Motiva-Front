import {Component, OnInit} from '@angular/core';
import {AlertsService} from "../alerts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from '@angular/material/dialog';
import {DialogInactiveAlertComponent} from "../dialogs/dialog-inactive-alert/dialog-inactive-alert.component";
import {DialogRasmComponent} from "../dialogs/dialog-rasm/dialog-rasm.component";

export interface DialogData {
  id_poll: number;
}

@Component({
  selector: 'app-instrument-review',
  templateUrl: './instrument-review.component.html',
  styleUrls: ['./instrument-review.component.scss']
})
export class InstrumentReviewComponent implements OnInit {

  public capturaIdPollUrl: any;
  id_poll!: number;

  form: FormGroup;
  recuperandoPreguntas: any = [];
  recuperandoRespuestas: any = [];
  resultadoFinal2: any = [];

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
    this.loadAnswerPsychosocial();
  }

  private loadAnswerPsychosocial() {
    this.alertsService.getAnswerPsychosocialByIdPoll(this.capturaIdPollUrl).subscribe(data => {
      let extrayendoAnsPsyIdQuestion: any = data;
      extrayendoAnsPsyIdQuestion.forEach((recorriendoAnsPsy: any) => {
        //ahora nos traemos la pregunta perteneciente al id question
        this.alertsService.getQuestionByIdQuestion(recorriendoAnsPsy.id_question).subscribe(data2 => {
          let extrayendoQuestion: any = data2;
          extrayendoQuestion.forEach((recorriendoQuestion: any) => {
            this.resultadoFinal2.push({
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
