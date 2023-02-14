import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../instrument-review/instrument-review.component";
import {AlertsService} from "../../alerts.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-inactive-alert',
  templateUrl: './dialog-inactive-alert.component.html',
  styleUrls: ['./dialog-inactive-alert.component.scss']
})
export class DialogInactiveAlertComponent implements OnInit {

  formInactiveDialog: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<DialogInactiveAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertsService: AlertsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formInactiveDialog = this.formBuilder.group({
      reason: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    console.log('Alerta: id_poll: ', this.data.id_poll)
  }

  sendInactiveAlert(): void {
    //Enviamos el registro a la tabla INACTIVE_ALERT
    /*this.alertsService.postInactiveAlert({
      idPoll: this.data.id_poll,
      reason: this.formInactiveDialog.value.reason,
    }).subscribe()*/


    this.alertsService.AlertByIdPoll(this.data.id_poll).subscribe((info: any) => {
      let extracDataAlert: any = info;
      console.log(extracDataAlert)
      extracDataAlert.forEach((dataAlert: any) => {

        this.alertsService.postInactiveAlert({
          idPoll: this.data.id_poll,
          reason: this.formInactiveDialog.value.reason,
          nameBeneficiary: dataAlert.nameBeneficiary,
          lastNameBeneficiary: dataAlert.lastNameBeneficiary,
          professional: dataAlert.professional,
          cellphone: dataAlert.cellphone,
          identification: dataAlert.identification,
          typeIdentification: dataAlert.typeIdentification,
          municipality: dataAlert.municipality,
          typeQuestionnaire: dataAlert.typeQuestionnaire,
          score: dataAlert.score,
          status: 'INACTIVE'
        }).subscribe();

      })
    })

    //Eliminamos el registro de ALERT
    this.alertsService.deleteAlertByIdPoll(this.data.id_poll).subscribe()
    this.router.navigate(['navbar/alerts/inactive-alerts']);
    this.dialogRef.close();
  }

}
