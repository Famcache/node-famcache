import { Socket } from 'net';
import type { ConnectionParams } from './params';
import { get, set, del } from './commands';

class Famcache {
  private socket: Socket;
  private params: ConnectionParams;

  constructor(params: ConnectionParams) {
    this.socket = new Socket();
    this.params = params;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.connect(this.params.port, this.params.host, () => {
        resolve();
      });
      this.socket.on('error', (err) => {
        reject(err);
      });
    });
  }

  set(key: string, value: string, ttl?: number) {
    this.socket.emit(set(key, value, ttl));
  }

  get(key: string) {
    this.socket.emit(get(key));
  }

  del(key: string) {
    this.socket.emit(del(key));
  }
}

export default Famcache;
