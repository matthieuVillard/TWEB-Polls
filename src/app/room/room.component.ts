import { Component, OnInit } from '@angular/core';
import {PollService} from "../add-poll/poll.service";
import {PollModel} from "../polls/question.model";
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "../http/socket.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
  providers: [PollService, SocketService]
})
export class RoomComponent implements OnInit {

  id: string; // id room pour étudiant
  private sub: any;
  isOpen = false;
  poll: PollModel;
  selected : string;
  answers = []; // pourcentages par réponse
  total = 0; // total de réponse


  constructor(private route: ActivatedRoute, private _pollSevice: PollService, private _socketService: SocketService) {
    this.id = undefined;
    this.poll = _pollSevice.getPoll();

    _socketService.createSocket('room/' + this.id).getDataStream().subscribe(
        (msg)=> {
          console.log(msg.data);
          var json = JSON.parse(msg.data);
          if(json.label == 'STATE_UPDATED'){
            this.poll = json.payload.poll;
            this.isOpen = true;
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

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if(this.selected != undefined && this.selected != '') {
      var data = "{\"label\":\"STUDENTS_COUNT_UPDATED\",\"payload\":" + parseInt(this.selected) + "}";
      this._socketService.getSocket('room').send4Direct(data);
      this.isOpen = false;

      this._socketService.getSocket('room/' + this.id).getDataStream().subscribe(
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
  }

}
