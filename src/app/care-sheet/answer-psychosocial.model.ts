export class AnswerPsychosocialModel {
  id_question: number;
  id_option_answer: number;
  open_answer: string;
  id_poll: number;


  constructor(id_question: number, id_option_answer: number, open_answer: string, id_poll: number) {
    this.id_question = id_question;
    this.id_option_answer = id_option_answer;
    this.open_answer = open_answer;
    this.id_poll = id_poll;
  }
}
