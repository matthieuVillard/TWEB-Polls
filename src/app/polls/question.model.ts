import {AnswerModel} from "./answer.model";
export class PollModel {
  constructor(
    public question: string,
    public answers: string[],
    public correct: number
  ) {  }
}