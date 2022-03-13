export class AnswerModel {
  idAnswer: number;
  idQuestion: number;
  idOptionAnswers: Array<number>[];
  openAnswer: string;
  idPoll: number;

  constructor(idAnswer: number, idQuestion: number, idOptionAnswers: Array<number>[], openAnswer: string, idPoll: number) {
    this.idAnswer = idAnswer;
    this.idQuestion = idQuestion;
    this.idOptionAnswers = idOptionAnswers;
    this.openAnswer = openAnswer;
    this.idPoll = idPoll;
  }
}
