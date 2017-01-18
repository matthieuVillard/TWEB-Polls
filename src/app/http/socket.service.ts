import { Injectable }     from '@angular/core';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import 'rxjs/add/operator/map'


/**
 * HTTP service for all the usualls calls to the Angualr2 HTTP Deamon.
 */
@Injectable()
export class SocketService {

    private static socket : $WebSocket;

    /**
     * constructor
     */
    constructor() {

    }

    public getSocket(url : string) : $WebSocket {
        if(SocketService.socket != undefined && SocketService.socket != null){
            return SocketService.socket;
        }
        else{
            return this.createSocket(url);
        }

    }

    public createSocket(url : string) : $WebSocket {

        SocketService.socket = new $WebSocket("ws://eventail.me:8000/" + url);
        return SocketService.socket;
    }

    public close(){
        if(SocketService.socket != undefined && SocketService.socket != null){
            SocketService.socket.close(false);
            SocketService.socket = null;
        }
    }
}