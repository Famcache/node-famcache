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
  return `${id} DEL ${key}\n`;
}
