import { Component, OnInit } from '@angular/core';
import {PollModel} from "../polls/question.model";
import {PollService} from "./poll.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-poll',
  templateUrl: './add-poll.component.html',
  styleUrls: ['./add-poll.component.css'],
  providers: [PollService]
})
export class AddPollComponent implements OnInit {
  poll : PollModel;
  correct : string;


  constructor(private _router: Router,  private _pollSevice: PollService) {

  }

  addAnswer(){
    this.poll.answers.push('');
  }

  removeAnswer(answer){
    this.poll.answers.splice(this.poll.answers.indexOf(answer), 1);
  }

  ngOnInit() {
    if(this._pollSevice.getPoll() != null){
      this.poll = this._pollSevice.getPoll();
      this.correct = this.poll.correct.toString();
      console.log(this.correct);
    }
    else{
      this.poll = new PollModel('', [''], 0);
      this.correct = '0';
    }
  }

  onSubmit() {
    this.poll.correct = parseInt(this.correct);
    this._pollSevice.addPoll(this.poll);
    this._router.navigateByUrl('/');
  }

  identify(index, item){
    return index;
  }

}