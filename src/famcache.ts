import { Socket } from 'net';
import { randomUUID } from 'crypto';
import type { ConnectionParams } from './params';
import type { QueueResolver, SubscribeCallback } from './types';
import {
  CacheQuery,
  get,
  set,
  del,
  publish,
  unsubscribe,
  subscribe,
  Messaging,
} from './transport';

class Famcache {
  private socket: Socket;
  private params: ConnectionParams;
  private queue: Map<string, QueueResolver>;
  private listeners: Map<string, SubscribeCallback[]>;

  constructor(params: ConnectionParams) {
    this.socket = new Socket();
    this.queue = new Map();
    this.listeners = new Map();

    this.params = params;
  }

  private genId() {
    return randomUUID();
  }

  private listen() {
    this.socket.on('data', (data) => {
      const payload = data.toString();

      if (Messaging.isMessagingEvent(payload)) {
        const message = Messaging.fromEvent(payload);

        if (!this.listeners.has(message.topic)) {
          return;
        }

        this.listeners
          .get(message.topic)
          ?.forEach((callback) => callback(message.data));
        return;
      }

      const query = CacheQuery.fromString(payload);

      const resolver = this.queue.get(query.id);

      if (!resolver) {
        this.queue.delete(query.id);
        return;
      }

      if (query.isError()) {
        resolver.reject(query.data);
      } else {
        resolver.resolve(query.data);
      }

      this.queue.delete(query.id);
    });
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.connect(this.params.port, this.params.host, () => {
        this.listen();

        resolve();
      });
      this.socket.on('error', (err) => {
        reject(err);
      });
    });
  }

  set(key: string, value: string, ttl?: number) {
    return new Promise<void>((resolve, reject) => {
      const queryId = this.genId();

      this.socket.write(set(queryId, key, value, ttl));

      this.queue.set(queryId, { resolve: () => resolve(), reject });
    });
  }

  get<T>(key: string) {
    return new Promise<T>((resolve, reject) => {
      const queryId = this.genId();

      this.socket.write(get(queryId, key));

      this.queue.set(queryId, {
        resolve: (data) => resolve(data as T),
        reject,
      });
    });
  }

  del(key: string) {
    return new Promise<void>((resolve, reject) => {
      const queryId = this.genId();

      this.socket.write(del(queryId, key));

      this.queue.set(queryId, { resolve: () => resolve(), reject });
    });
  }

  publish(topic: string, data: string) {
    const queryId = this.genId();

    this.socket.write(publish(queryId, topic, data));
  }

  subscribe(topic: string, callback: SubscribeCallback) {
    const queryId = this.genId();

    this.socket.write(subscribe(queryId, topic));

    const listeners = this.listeners.get(topic);

    if (!listeners) {
      this.listeners.set(topic, [callback]);
    } else {
      listeners.push(callback);
    }
  }

  unsubscribe(topic: string) {
    const queryId = this.genId();

    this.socket.write(unsubscribe(queryId, topic));
  }
}

export default Famcache;
