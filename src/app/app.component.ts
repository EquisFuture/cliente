import { Component } from '@angular/core';
import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://localhost:3333')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cliente';
  constructor(){
    const socket = ws.subscribe('socket');
    socket.on('ready', () => {
      console.log("conectado")
    })
  }
}
 