export type MessageRecord = {
  message: string,
  timestamp: string,
  type?: string,
}

export class MessageServiceClass {
  messages: MessageRecord[] = [];
  send(message: string) {
    const timestamp = new Date().toISOString().substring(11,23);
    const newMessageRecord: MessageRecord = {
      message,
      timestamp
    }
    this.messages.push(newMessageRecord);
  }
}

export const MessageService = new MessageServiceClass();
