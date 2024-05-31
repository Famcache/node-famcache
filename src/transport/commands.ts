export function get(id: string, key: string): string {
  return `${id} GET ${key}\n`;
}

export function set(
  id: string,
  key: string,
  value: string,
  ttl?: number,
): string {
  const args = [key, value];

  if (ttl) {
    args.push(ttl.toString());
  }

  return `${id} SET ${args.join(' ')}\n`;
}

export function del(id: string, key: string): string {
  return `${id} DELETE ${key}\n`;
}

export function publish(id: string, topic: string, data: string): string {
  return `${id} PUBLISH ${topic} ${data}\n`;
}

export function subscribe(id: string, topic: string): string {
  return `${id} SUBSCRIBE ${topic}\n`;
}

export function unsubscribe(id: string, topic: string): string {
  return `${id} UNSUBSCRIBE ${topic}\n`;
}
