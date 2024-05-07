export type MessageRecord = {
  message: string;
  timestamp: string;
  level?: MessageLevel;
};

export enum MessageLevel {
  log = "log",
  warning = "warning",
  debug = "debug",
}

export class MessageServiceClass {
  messages: MessageRecord[] = [];
  cursorMessage: string = "";
  /** Needed to let us know when to render a new message */
  cursorMessageNumber: number = 0;

  send(message: string, level: MessageLevel = MessageLevel.log) {
    const timestamp = new Date().toISOString().substring(11, 23);
    const newMessageRecord: MessageRecord = {
      message,
      timestamp,
      level,
    };
    this.messages.push(newMessageRecord);
  }

  setCursorMessage(messageText: string) {
    this.cursorMessage = messageText;
    this.cursorMessageNumber++;
  }
}

export const MessageService = new MessageServiceClass();
