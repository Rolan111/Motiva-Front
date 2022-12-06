import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {CareSheetService} from "../care-sheet/care-sheet.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-informed-consent',
  templateUrl: './informed-consent.component.html',
  styleUrls: ['./informed-consent.component.scss']
})
export class InformedConsentComponent implements OnInit {

  completed:boolean = false;
  idPollWidthData:boolean = false;
  file!: File;

  constructor(private storage: AngularFireStorage,
              private router: Router,
              private careSheetService:CareSheetService,
              private toastr: ToastrService
              ) { }

  idPollRecuperado:string = this.careSheetService.shareIdPoll;

  ngOnInit(): void {
    console.log('El idPoll recuperado es: ', this.idPollRecuperado)
    /** Evalumaos que el id_poll no esté vacío */
    if(this.idPollRecuperado==''){
      this.toastr.warning('¡Este consentimiento NO TIENE enlace con instrumento Cuantitativo!. Este consentimiento no se podrá guardar', 'Error, por favor informar')
    }else{
      this.idPollWidthData=true;
    }
  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.completed = true;
    }
  }

  uploadFile() {
    const filePath = this.idPollRecuperado+'/'+'consentimiento_informado';
    // Crea una referencia de acceso
    const fileRef = this.storage.ref(filePath);
    fileRef.put(this.file).then(() => {
      this.completed = true;
      this.toastr.success('¡El consentimiento informado ha sido enviado!', 'Caracterización Finalizada');
      this.router.navigate(['navbar/dashboard'])
    });
  }

}
