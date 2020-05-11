class MessageServiceClass {
  messages: string[] = [];
  send(message: string) {
    this.messages.push(message);
  }
}

export const MessageService = new MessageServiceClass();

export default MessageService;
