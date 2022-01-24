export class AnswerModel {
  idAnswer: number;
  idQuestion: number;
  idOptionAnswer: number;
  openAnswer: string;
  idPoll: number;

  constructor(idAnswer: number, idQuestion: number, idOptionAnswer: number, openAnswer: string, idPoll: number) {
    this.idAnswer = idAnswer;
    this.idQuestion = idQuestion;
    this.idOptionAnswer = idOptionAnswer;
    this.openAnswer = openAnswer;
    this.idPoll = idPoll;
  }
}
