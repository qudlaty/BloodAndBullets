import React from "react";
import MessageService from "../../services/MessageService";

export class MessageBox extends React.Component {
  messages = MessageService.messages;

  renderMessage = (message: string, number: number) => {
    return (
      <li>
        Message #[{number}]: {message}
      </li>
    );
  };

  render() {
    let RenderedMessages = this.messages.map((message, number) => this.renderMessage(message, number));

    return <ul className="messagesUl">{RenderedMessages}</ul>;
  }
}
