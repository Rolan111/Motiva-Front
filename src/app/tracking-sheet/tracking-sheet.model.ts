export class TrackingSheetModel {
  names: string;
  lastnames: string;
  identificationType: string;
  identification: string;
  typeRoute: string;
  referredEntity: string;
  attentionStatus: string;
  recommendations: string;

  constructor(names: string, lastnames: string, identificationType: string, identification: string, typeRoute: string, referredEntity: string, attentionStatus: string, recommendations: string) {
    this.names = names;
    this.lastnames = lastnames;
    this.identificationType = identificationType;
    this.identification = identification;
    this.typeRoute = typeRoute;
    this.referredEntity = referredEntity;
    this.attentionStatus = attentionStatus;
    this.recommendations = recommendations;
  }
}
