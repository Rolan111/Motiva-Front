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

  typeRams: any = "hola";
  typeRasmi: any = [];
  form: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<DialogRasmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertsService: AlertsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      type_rasm: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    console.log('Alerta> id_poll: ', this.data.id_poll)
    this.alertsService.getAllTypeRasmi().subscribe(data => { /** Datos de tipo de ruta para mostrar en el navegador */
      console.log('La data es: ',data)
      this.typeRasmi.push(data)
    },error => error,() => console.log('Asi quedo type rasmi: ',this.typeRasmi))

  }

  sendRASM() {

    //Enviamos el registro a RASM
    this.alertsService.getAllAlerts()

    this.alertsService.postRASM({
      idPoll: this.data.id_poll,
      typeRasm: this.form.value.type_rasm
    }).subscribe();

    //Eliminamos el registro de ALERT
    this.alertsService.deleteAlertByIdPoll(this.data.id_poll).subscribe();
    this.router.navigate(['navbar/care-rasm']);
    this.dialogRef.close();
  }

}
