export class AlertModel {
  idAlert: number;
  idPoll: number;
  score: number;

  constructor(idAlert: number, idPoll: number, score: number) {
    this.idAlert = idAlert;
    this.idPoll = idPoll;
    this.score = score;
  }
}
