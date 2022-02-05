import {Component, OnInit} from '@angular/core';
import {MessagesService} from "../services/message.service";

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

  constructor(public messagesService: MessagesService) {
  }

  ngOnInit(): void {
  }

}
