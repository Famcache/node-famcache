export class MessagingEvent {
  static isMessagingEvent(event: string): boolean {
    return event.startsWith('MESSAGE ');
  }

  static fromEvent(event: string): MessagingEvent {
    const [, topic, data] = event.split(' ');

    return new MessagingEvent(topic, data);
  }

  public topic: string;
  public data: string;

  constructor(topic: string, data: string) {
    this.topic = topic;
    this.data = data;
  }

}
