export type QueueResolver = {
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}