export function get(key: string): string {
  return `GET ${key}`;
}

export function set(key: string, value: string, ttl?: number): string {
  return `SET ${key} ${value} ${ttl}`;
}

export function del(key: string): string {
  return `DEL ${key}`;
}
