import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PollService} from "../add-poll/poll.service";
import {PollModel} from "../polls/question.model";
import {SocketService} from "../http/socket.service";
import {WebSocketSendMode} from 'angular2-websocket/angular2-websocket';


@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
  providers: [PollService,  SocketService]
})
export class PollComponent implements OnInit {
  isOpen = false;
  poll: PollModel;
  answers = []; // pourcentages par réponse
  total = 0; // total de réponse


  constructor(private _pollSevice: PollService, private _socketService: SocketService) {
    this.poll = _pollSevice.getPoll();
  }

  ngOnInit() {

  }

  start(){
    this.isOpen = true;
    var data = "{\"label\":\"begin\", \"payload\":" + JSON.stringify(this.poll) + "}";
    this._socketService.getSocket('room').send4Direct(data);

    this._socketService.getSocket('room/').getDataStream().subscribe(
        (msg)=> {
          console.log(msg.data);
          var json = JSON.parse(msg.data);
          if(json.label == 'STATE_UPDATED'){
            var results = JSON.parse(msg.data.payload.results);
            this.total = 0;
            for(var i = 0; i < results.length; i++){
              this.total += results[i];
            }
            for(var i = 0; i < results.length; i++){
              this.answers[i] = results[i] / this.total * 100;
            }
          }
        },
        (msg)=> {
          console.log("error", msg);
        },
        ()=> {
          console.log("complete");
        }
    );
  }

  stop(){
    this.isOpen = false;
    var data = "{\"label\":\"close\",\"payload\":null}";
    this._socketService.getSocket('room').send4Direct(data);
  }

}
