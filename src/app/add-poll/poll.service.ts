import { Injectable }     from '@angular/core';
import {PollModel} from "../polls/question.model";


@Injectable()
export class PollService {
  private static poll: PollModel;
  private static polls: PollModel[] = [];
  private static roomId : string;

/**
 * constructor
 */
  constructor()
  {

  }


  public getPoll(): PollModel
  {
    return PollService.poll;
  }


  public setPoll(poll: PollModel)
  {
    PollService.poll = poll;
  }

  public getPolls(): PollModel[]{
    return PollService.polls;
  }

  public addPoll(poll: PollModel){
    if(PollService.polls.indexOf(poll) == -1){
      PollService.polls.push(poll);
    }
  }

  public removePoll(poll: PollModel){
    if(PollService.polls.indexOf(poll) != -1){
      PollService.polls.splice(PollService.polls.indexOf(poll), 1);
    }
  }

  public setRoomId(roomId : string){
    PollService.roomId = roomId;
  }

  public getRoomId() : string {
    return PollService.roomId;
  }
}