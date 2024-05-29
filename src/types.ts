export type Optional<T> = T | null | undefined | void;

export type QueueResolver = {
  resolve: (value: Optional<string>) => void;
  reject: (reason: Optional<string>) => void;
};
