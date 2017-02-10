import { Component, Input } from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() messageText: string;
  @Input() messageType: string;

  constructor() { }
}
