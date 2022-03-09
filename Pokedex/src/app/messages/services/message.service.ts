import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  /**
   * The list of messages that are shown on the view.
   */
  messages: String[] = []

  constructor() {
  }

  /**
   * Add a new message to the list of messages.
   *
   * @param message The message to add.
   */
  add(message: String) {
    this.messages.push(message)
  }

  /**
   * Clear the list of messages by removing all of them.
   */
  clear() {
    this.messages = []
  }
}
