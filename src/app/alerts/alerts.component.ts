import {Component, OnInit} from '@angular/core';
import {AlertsService} from "./alerts.service";
import {of} from "rxjs";

export interface Alerts {
  id_poll: number;
  professional: number;
  beneficiary: string;
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alertSizeAux: number[] = [];
  arrayDeAlertas: any = [];
  procesamientoDeAlertas: Alerts[] = [];
  arrayDeAlertasTabla: any = [];

  displayedColumns: string[] = ['id_poll', 'professional', 'beneficiary'];
  dataSource = this.arrayDeAlertasTabla;

  constructor(private alertsService: AlertsService) {
  }

  ngOnInit(): void {
    //Consultamos la cantidad de registros
    this.alertsService.getAlertSize().subscribe((data: any) => {
      this.alertSizeAux.push(data);
    })

    this.loadAlerts();
  }


  private loadAlerts() {
    this.alertsService.getAllAlerts().subscribe(data => {
      this.arrayDeAlertas = data;
      this.arrayDeAlertas.forEach((recorriendoArray: any) => {
        //Para traer el NOMBRE DEL PROFESIONAL consultamos en la tabla poll y nos traemos el id_user
        this.alertsService.getPollById(recorriendoArray.idPoll).subscribe(data2 => { //para traer los idUser
          let extrayendoIdUser: any = data2;
          extrayendoIdUser.forEach((recorriendoArray2: any) => {
            //Ahora con el idUser consultamos la tabla user y traemos el nombre(name) del profesional
            this.alertsService.getUserById(recorriendoArray2.idUser).subscribe(data3 => {

              let extrayendoNameUser: any = data3;
              extrayendoNameUser.forEach((recorriendoArray3: any) => {
                //Aqui capturamos el NOMBRE DEL PROFESIONAL
                //Ahora traermos el NOMBRE DEL BENEFICIARIO consultando la tabla Answer con el id_poll y el id_question
                this.alertsService.getNameAnswerByPollAndIdQuestion(recorriendoArray.idPoll, 200).subscribe(data4 => {
                  let extrayendoNameBeneficiario: any = data4;
                  extrayendoNameBeneficiario.forEach((recorriendoArray4: any) => {

                    this.procesamientoDeAlertas.push({
                      id_poll: recorriendoArray.idPoll,
                      professional: recorriendoArray3.name,
                      beneficiary: recorriendoArray4.openAnswer,
                    })

                    if (this.procesamientoDeAlertas.length == this.alertSizeAux[0]) {
                      of(this.procesamientoDeAlertas).subscribe(data6 => {
                        this.arrayDeAlertasTabla = data6;
                      })
                    }


                  })

                })

              })
            })
          })
        })

      })

    })


  }


}
