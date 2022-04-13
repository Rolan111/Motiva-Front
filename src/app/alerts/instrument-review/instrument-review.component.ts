import {Component, OnInit} from '@angular/core';
import {AlertsService} from "../alerts.service";
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-instrument-review',
  templateUrl: './instrument-review.component.html',
  providers: [NgbModalConfig, NgbModal],
  styleUrls: ['./instrument-review.component.scss']
})
export class InstrumentReviewComponent implements OnInit {

  public capturaIdPollUrl: any;

  recuperandoPreguntas: any = [];
  recuperandoRespuestas: any = [];
  resultadoFinal2: any = [];

  constructor(private alertsService: AlertsService, config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  conten: any = 'content';

  open(content: any) {
    this.modalService.open(content, {centered: true});
  }

  ngOnInit(): void {
    //capturamos id_poll de la URL
    this.route.paramMap.subscribe((paramMap: any) => {
      const {params} = paramMap
      // this.loadAnswerPsychosocial(params.variable)
      this.capturaIdPollUrl = params.variable
    })
    this.loadAnswerPsychosocial();
    console.log('El id capturadeo del URL es> ', this.capturaIdPollUrl)
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

}
