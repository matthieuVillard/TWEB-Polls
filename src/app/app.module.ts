import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";

import { MaterialModule } from '@angular/material';
import { PollsComponent } from './polls/polls.component';
import { AddPollComponent } from './add-poll/add-poll.component';
import { PollComponent } from './poll/poll.component';

@NgModule({
  declarations: [
    AppComponent,
    PollsComponent,
    AddPollComponent,
    PollComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
