export class AnswerModel {
  idAnswer: number;
  idQuestion: number;
  idOptionAnswers: Array<number>;
  openAnswer: string;
  // idPoll: number;
  idPoll: string;
  type: string;
  score: number;

  constructor(idAnswer: number, idQuestion: number, idOptionAnswers: Array<number>, openAnswer: string, idPoll: string,
              type: string, score: number) {
    this.idAnswer = idAnswer;
    this.idQuestion = idQuestion;
    this.idOptionAnswers = idOptionAnswers;
    this.openAnswer = openAnswer;
    this.idPoll = idPoll;
    this.type = type;
    this.score = score;
  }
}
