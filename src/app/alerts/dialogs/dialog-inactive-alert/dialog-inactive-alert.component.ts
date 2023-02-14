import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../instrument-review/instrument-review.component";
import {AlertsService} from "../../alerts.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

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
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.formInactiveDialog = this.formBuilder.group({
      reason: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    console.log('Alerta: id_poll: ', this.data.id_poll)
  }

  sendInactiveAlert(): void {

    this.alertsService.AlertByIdPoll(this.data.id_poll).subscribe((info: any) => {
      let extracDataAlert: any = info;

      // console.log(extracDataAlert)
      extracDataAlert.forEach((dataAlert: any) => {
        console.log('Los datos capturados de la alerta son: ', dataAlert)
        console.log('La RAZON es: ', this.formInactiveDialog.value.reason)
        this.alertsService.postInactiveAlert({
          idAlert: 1,
          idPoll: this.data.id_poll,
          score: dataAlert.score,
          professional: dataAlert.professional,
          nameBeneficiary: dataAlert.nameBeneficiary,
          lastNameBeneficiary: dataAlert.lastNameBeneficiary,
          identification: dataAlert.identification,
          typeIdentification: dataAlert.typeIdentification,
          municipality: dataAlert.municipality,
          typeQuestionnaire: dataAlert.typeQuestionnaire,
          date: dataAlert.date,
          cellphone: dataAlert.cellphone,
          // status: 'INACTIVE',
          reason: this.formInactiveDialog.value.reason

        }).subscribe({complete:() => {
            /** Se elimina el registro de ALERT */

            this.alertsService.deleteAlertByIdPoll(this.data.id_poll).subscribe()
            this.dialogRef.close()
            this.toastr.success('¡La ALERTA ha sido DESACTIVADA, se guardó una copia en la tabla Alertas Inactivas!', 'Alerta Desactivada');
            setInterval(()=>{
              this.router.navigate(['navbar/alerts/inactive-alerts']);
            },2000);
          }} );

      })
    })


  }

}
