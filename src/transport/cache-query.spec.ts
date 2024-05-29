import { CacheQuery } from './cache-query';

describe('CacheQuery', () => {
  it('should parse response string that contains data', () => {
    const query = CacheQuery.fromString('1 OK 10');

    expect(query.id).toBe('1');
    expect(query.isOk()).toBe(true);
    expect(query.data).toBe('10');
  });

  it('should parse response string that contains error', () => {
    const query = CacheQuery.fromString('1 ERROR');

    expect(query.id).toBe('1');
    expect(query.isError()).toBe(true);
    expect(query.data).toBe('');
  });

  it('should parse response string that contains data with spaces', () => {
    const query = CacheQuery.fromString('1 OK 10 20 30');

    expect(query.id).toBe('1');
    expect(query.isOk()).toBe(true);
    expect(query.data).toBe('10 20 30');
  });
});
