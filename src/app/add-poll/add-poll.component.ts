import { Component, OnInit } from '@angular/core';
import {PollModel} from "../polls/poll.model";
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
    }
    else{
      this.poll = new PollModel('', [''], '0');
    }
  }

  onSubmit() {
    this._pollSevice.addPoll(this.poll);
    this._router.navigateByUrl('/');
  }

}