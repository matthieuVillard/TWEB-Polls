import { Injectable }     from '@angular/core';
import {$WebSocket, WebSocketSendMode} from 'angular2-websocket/angular2-websocket';
import 'rxjs/add/operator/map'


/**
 * HTTP service for all the usualls calls to the Angualr2 HTTP Deamon.
 */
@Injectable()
export class SocketService {

    socket : $WebSocket;

    /**
     * constructor
     */
    constructor() {

    }

    public getSocket(url : string) : $WebSocket {
        if(this.socket != undefined && this.socket != null){
            return this.socket;
        }
        return this.createSocket(url);
    }

    public createSocket(url : string) : $WebSocket {
        this.close();
        this.socket = new $WebSocket("ws://eventail.me:8000/" + url);
        return this.socket;
    }

    public close(){
        if(this.socket != undefined && this.socket != null){
            this.socket.close(false);
        }
    }
}