import React from "react";
import MessageService from "../../services/MessageService";

export class MessageBox extends React.Component {
  messages = MessageService.messages;

  renderMessage = (message, number) => {
    return (
      <li>
        Message nr[{number}]: {message}
      </li>
    );
  };

  render() {
    let RenderedMessages = this.messages.map((message, number) => {
      return this.renderMessage(message, number);
    });

    return <ul>{RenderedMessages}</ul>;
  }
}
