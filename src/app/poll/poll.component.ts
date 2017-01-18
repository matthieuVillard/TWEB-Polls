import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PollService} from "../add-poll/poll.service";
import {PollModel} from "../polls/poll.model";

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
  providers: [PollService]
})
export class PollComponent implements OnInit {
  id: string; // id room pour étudiant
  private sub: any;
  isOpen = false;
  poll: PollModel;
  answers = [65, 35]; // pourcentages par réponse
  total = 4; // total de réponse


  constructor(private route: ActivatedRoute, private _pollSevice: PollService) {
    this.id = undefined;
    this.poll = _pollSevice.getPoll();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {

  }

  start(){
    this.isOpen = true;
  }

  stop(){
    this.isOpen = false;
  }

}
