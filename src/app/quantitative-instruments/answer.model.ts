export class AnswerModel {
  idAnswer: number;
  idQuestion: number;
  idOptionAnswers: Array<number>[];
  openAnswer: string;
  idPoll: number;
  type: string;

  constructor(idAnswer: number, idQuestion: number, idOptionAnswers: Array<number>[], openAnswer: string, idPoll: number, type: string) {
    this.idAnswer = idAnswer;
    this.idQuestion = idQuestion;
    this.idOptionAnswers = idOptionAnswers;
    this.openAnswer = openAnswer;
    this.idPoll = idPoll;
    this.type = type;
  }
}
