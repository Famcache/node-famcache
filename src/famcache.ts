import { Socket } from 'net';
import { randomUUID } from 'crypto';
import type { ConnectionParams } from './params';
import type { QueueResolver } from './types';
import { CacheQuery, get, set, del } from './transport';

class Famcache {
  private socket: Socket;
  private params: ConnectionParams;
  private queue: Map<string, QueueResolver>;

  constructor(params: ConnectionParams) {
    this.socket = new Socket();
    this.queue = new Map();

    this.params = params;
  }

  private genId() {
    return randomUUID();
  }

  private listen() {
    this.socket.on('data', (data) => {
      const payload = data.toString();
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
