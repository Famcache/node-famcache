import { set, get, del, publish, unsubscribe } from './commands';

describe('commands', () => {
  it('should generate get command', () => {
    const command = get('1', 'key');

    expect(command).toBe('1 GET key\n');
  });

  it('should generate set command', () => {
    const command = set('1', 'key', 'value', 1000);

    expect(command).toBe('1 SET key value 1000\n');
  });

  it('should generate set command without ttl', () => {
    const command = set('1', 'key', 'value');

    expect(command).toBe('1 SET key value\n');
  });

  it('should generate del command', () => {
    const command = del('1', 'key');

    expect(command).toBe('1 DELETE key\n');
  });

  it('should generate publish command', () => {
    const command = publish('1', 'key', 'value');

    expect(command).toBe('1 PUBLISH key value\n');
  });

  it('should generate unsubscribe command', () => {
    const command = unsubscribe('1', 'key');

    expect(command).toBe('1 UNSUBSCRIBE key\n');
  });
});
