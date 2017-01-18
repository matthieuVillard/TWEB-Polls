import {AnswerModel} from "./answer.model";
export class PollModel {
  constructor(
    public title: string,
    public answers: string[],
    public correct: string
  ) {  }
}