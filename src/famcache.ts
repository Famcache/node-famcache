import { Socket } from 'net';
import { randomUUID } from 'crypto';
import type { ConnectionParams } from './params';
import type { IMessaging, QueueResolver } from './types';
import {
  CacheQuery,
  get,
  set,
  del,
  MessagingEvent,
} from './transport';
import { Messaging } from './modules';

class Famcache {
  private socket: Socket;
  private params: ConnectionParams;
  private queue: Map<string, QueueResolver>;
  public messaging: IMessaging;

  constructor(params: ConnectionParams) {
    this.socket = new Socket();
    this.queue = new Map();
    this.messaging = new Messaging(this.socket);

    this.params = params;
  }

  private genId() {
    return randomUUID();
  }

  private listen() {
    this.socket.on('data', (data) => {
      const payload = data.toString();

      if (MessagingEvent.isMessagingEvent(payload)) {
        const message = MessagingEvent.fromEvent(payload);

        (this.messaging as Messaging).trigger(message);
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
}

export default Famcache;
