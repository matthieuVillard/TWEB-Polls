import { Component, OnInit } from '@angular/core';
import {PollModel} from "./poll.model";
import {log} from "util";
import {AnswerModel} from "./answer.model";
import {Router} from "@angular/router";
import {PollService} from "../add-poll/poll.service";

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css'],
  providers: [PollService]
})
export class PollsComponent implements OnInit {

  polls: PollModel[];

  constructor(private _router: Router, private _pollSevice: PollService) {
    this.polls = _pollSevice.getPolls();
  }

  editPoll(poll){
    this._pollSevice.setPoll(poll);
    this._router.navigateByUrl('/addPoll');
  }

  addPoll(){
    this._pollSevice.setPoll(null);
    this._router.navigateByUrl('/addPoll');
  }

  pollDetails(poll){
    this._pollSevice.setPoll(poll);
    this._router.navigateByUrl('/poll');
  }

  removePoll(poll){
    this._pollSevice.removePoll(poll);
  }

  ngOnInit() {

  }

}
