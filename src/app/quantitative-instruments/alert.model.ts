export class AlertModel {
  idAlert: number;
  // idPoll: number;
  idPoll: string;
  score: number;
  professional: string;
  beneficiary: string;
  municipality: string;
  date: string;
  nameBeneficiary: string;
  lastNameBeneficiary: string;
  identification: number;
  typeIdentification: string;


  constructor(idAlert: number, idPoll: string, score: number, professional: string, beneficiary: string, municipality: string, date: string, nameBeneficiary: string, lastNameBeneficiary: string, identification: number, typeIdentification: string) {
    this.idAlert = idAlert;
    this.idPoll = idPoll;
    this.score = score;
    this.professional = professional;
    this.beneficiary = beneficiary;
    this.municipality = municipality;
    this.date = date;
    this.nameBeneficiary = nameBeneficiary;
    this.lastNameBeneficiary = lastNameBeneficiary;
    this.identification = identification;
    this.typeIdentification = typeIdentification;
  }
}
//
