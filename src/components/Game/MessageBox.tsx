import React from "react";
import { MessageService } from "../../services";

export class MessageBox extends React.Component {
  messages = MessageService.messages;
  messageNumber;

  shouldComponentUpdate() {
    // don't update if there are no new messages since last render
    return this.messages.length !== this.messageNumber;
  }

  renderMessage = (message: string, number: number) => {
    return (
      <li>
        Message #[{number}]: {message}
      </li>
    );
  };

  render() {
    if (!this.messages.length) return null;
    let RenderedMessages = this.messages.map((message, number) => this.renderMessage(message, number));
    // remember the number of messages rendered
    this.messageNumber = this.messages.length;
    return (
      <ul className="messages" id="messages">
        {RenderedMessages}
      </ul>
    );
  }

  scrollElement() {
    window.requestAnimationFrame(() => {
      var element = document.getElementById("messages");
      element.scrollTop = element.scrollHeight;
    });
  }

  componentDidUpdate() {
    if (this.messages.length) this.scrollElement();
  }
}
