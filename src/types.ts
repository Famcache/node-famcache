export type Optional<T> = T | null | undefined | void;

export type QueueResolver = {
  resolve: (value: Optional<string>) => void;
  reject: (reason: Optional<string>) => void;
};

export type SubscribeCallback = (data: string) => void;

export type IMessaging = {
  publish(topic: string, data: string): void;
  subscribe(topic: string, callback: SubscribeCallback): void;
  unsubscribe(topic: string): void;
}