import React from "react";
// services
import "./MessageBox.scss";
import { MessageRecord, MessageService } from "services";

export class MessageBox extends React.Component {
  messages = MessageService.messages;
  messageNumber;

  shouldComponentUpdate() {
    // don't update if there are no new messages since last render
    return this.messages.length !== this.messageNumber;
  }

  renderMessage = (messageRecord: MessageRecord, number: number) => {
    const messageNumber = `000${number}`.slice(-3);
    return (
      <li key={`msg${number}`}>
        <span className="message-number">{messageNumber + ` `}</span>
        <span className="message-timestamp">{messageRecord.timestamp + ` `}</span>
        <span className="message-text">{messageRecord.message}</span>
      </li>
    );
  };

  render() {
    if (!this.messages.length) return null;
    const RenderedMessages = this.messages.map((message, number) => this.renderMessage(message, number));
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
      const element = document.getElementById("messages");
      element.scrollTop = element.scrollHeight;
    });
  }

  componentDidUpdate() {
    if (this.messages.length) this.scrollElement();
  }
}
