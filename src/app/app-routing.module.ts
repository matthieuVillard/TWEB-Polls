import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import {PollsComponent} from "./polls/polls.component";
import {AddPollComponent} from "./add-poll/add-poll.component";
import {PollComponent} from "./poll/poll.component";
import {RoomComponent} from "./room/room.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'polls', component: PollsComponent},
      { path: 'addPoll', component: AddPollComponent},
      { path: 'poll', component: PollComponent},
      { path: '', component: PollsComponent },
      { path: 'room/:id', component: RoomComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}