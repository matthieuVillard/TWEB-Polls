import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {SocketService} from "./http/socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SocketService]
})
export class AppComponent {

  root : string = document.location.host;
  room : string;
  /**
   * constructor
   */
  constructor(private _router: Router, private _socketService: SocketService){
    _socketService.getSocket('room').getDataStream().subscribe(
        (msg)=> {
          var json = JSON.parse(msg.data);
          if(json.label == 'ROOM_READY'){
            this.room = json.payload;
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
