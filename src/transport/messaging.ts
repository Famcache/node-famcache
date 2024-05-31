export class Messaging {
  static isMessagingEvent(event: string): boolean {
    return event.startsWith('MESSAGE ');
  }

  static fromEvent(event: string): Messaging {
    const [, topic, data] = event.split(' ');

    return new Messaging(topic, data);
  }

  public topic: string;
  public data: string;

  constructor(topic: string, data: string) {
    this.topic = topic;
    this.data = data;
  }
}
