import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../instrument-review/instrument-review.component";
import {AlertsService} from "../../alerts.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-rasm',
  templateUrl: './dialog-rasm.component.html',
  styleUrls: ['./dialog-rasm.component.scss']
})
export class DialogRasmComponent implements OnInit {

  typeRasmi: any = [];
  formDialog: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<DialogRasmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertsService: AlertsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formDialog = this.formBuilder.group({
      type_rasm: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    console.log('Alerta> id_poll: ', this.data.id_poll)
    console.log('Tipo: ', this.formDialog.value.type_rasm)

    this.alertsService.getAllTypeRasmi().subscribe(data => { /** Datos de tipo de ruta para mostrar en el navegador */
      console.log('La data es: ',data)
      this.typeRasmi.push(data)
    },error => error,() => console.log('Asi quedo type rasmi: ',this.typeRasmi))

    this.alertsService.AlertByIdPoll(this.data.id_poll).subscribe(data =>{
      console.log('Alert data: ', data)
    })

  }

  sendRASM() {

    //Enviamos el registro a RASM
    this.alertsService.getAllAlerts()

    this.alertsService.AlertByIdPoll(this.data.id_poll).subscribe((info: any) => {
      let extracDataAlert: any = info;
      console.log(extracDataAlert)
      extracDataAlert.forEach((dataAlert: any) => {

        this.alertsService.createRasm({
          idPoll: this.data.id_poll,
          typeRasm: this.formDialog.value.type_rasm,
          nameBeneficiary: dataAlert.nameBeneficiary,
          lastNameBeneficiary: dataAlert.lastNameBeneficiary,
          professional: dataAlert.professional,
          cellphone: dataAlert.cellphone,
          identification: dataAlert.identification,
          typeIdentification: dataAlert.typeIdentification,
          municipality: dataAlert.municipality,
          typeQuestionnaire: dataAlert.typeQuestionnaire,
          score: dataAlert.score,
        }).subscribe();

      })
    })

   /* this.alertsService.postRASM({
      idPoll: this.data.id_poll,
      typeRasm: this.form.value.type_rasm
    }).subscribe();*/

    //Eliminamos el registro de ALERT
    this.alertsService.deleteAlertByIdPoll(this.data.id_poll).subscribe();
    this.router.navigate(['navbar/care-rasm']);
    this.dialogRef.close();
  }

}
