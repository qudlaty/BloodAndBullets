export type MessageRecord = {
  message: string;
  timestamp: string;
  type?: string;
};

export class MessageServiceClass {
  messages: MessageRecord[] = [];
  cursorMessage: string = "";
  /** Needed to let us know when to render a new message */
  cursorMessageNumber: number = 0;

  send(message: string) {
    const timestamp = new Date().toISOString().substring(11, 23);
    const newMessageRecord: MessageRecord = {
      message,
      timestamp,
    };
    this.messages.push(newMessageRecord);
  }

  setCursorMessage(messageText: string) {
    this.cursorMessage = messageText;
    this.cursorMessageNumber++;
  }
}

export const MessageService = new MessageServiceClass();
