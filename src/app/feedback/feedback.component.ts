import { Component, OnInit } from '@angular/core';
import {QuantitativeInstrumentService} from "../quantitative-instruments/quantitative-instrument.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CareSheetService} from "../care-sheet/care-sheet.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  formFeedBack!:FormGroup;
  selected = 'ficha_atencion';
  identification!:string;
  idPollCapturado!:string;
  nombreCapturado!:string;
  constructor(
    private router: Router,
    private quantitativeInstrumentService:QuantitativeInstrumentService,
    private careSheetService:CareSheetService, //utilizamos el mismo servicio para ambos módulos (ficha de atención y consentimiento informado)
    private formBuilder:FormBuilder
  ) {
    this.formFeedBack = this.formBuilder.group({
      identification: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  probandoSeleccion(){

    console.log('La opción seleccionada es: ',this.selected)
    console.log('La identificación es: ', this.formFeedBack.value.identification)
    this.identification = this.formFeedBack.value.identification
    // console.log('El dato seleccionado es: ',this.selected)
    this.quantitativeInstrumentService.getAnswerByIdQuestionAndOpenAnswer(205, this.identification).subscribe((data:any)=>{
      console.log('El idPoll es: ',data[0].idPoll)
      this.idPollCapturado = data[0].idPoll
        this.quantitativeInstrumentService.getAnswerByIdPollAndIdQuestion(data[0].idPoll,200).subscribe((data:any)=>{
        console.log('El nombre de la persona es: ',data[0].openAnswer)
          this.nombreCapturado = data[0].openAnswer

      })
    })
  }

  realizarRetroalimentacion(){
    if(this.selected=='ficha_atencion'){
      this.careSheetService.shareIdPoll = this.idPollCapturado;
      this.router.navigate(['navbar/care-sheet'])
    }else{
      this.careSheetService.shareIdPoll = this.idPollCapturado;
      this.router.navigate(['navbar/informed-consent'])
    }
  }

}
