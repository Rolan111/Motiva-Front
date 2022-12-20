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
  errorMessage:string = 'mensaje de error';
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
    this.quantitativeInstrumentService.getAnswerByIdQuestionAndOpenAnswer(205, this.identification).subscribe((data:any)=>{
      console.log('La data es: ',data)//1058550690
      if(data[0]==null){
        console.log('No encontrado el ID')
        this.errorMessage='El número de cédula NO se ha encontrado'
      }else{
        console.log('El idPoll es: ',data[0].idPoll)
        this.idPollCapturado = data[0].idPoll
        this.quantitativeInstrumentService.getAnswerByIdPollAndIdQuestion(this.idPollCapturado,200).subscribe((data:any)=>{
          console.log('El nombre de la persona es: ',data[0].openAnswer)
          this.nombreCapturado = data[0].openAnswer
        })
      }

    }, error => {this.errorMessage='El número de cédula NO se ha encontrado'
      console.log('NO HAY DATOS')},
      () => {

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
