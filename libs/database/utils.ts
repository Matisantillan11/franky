function getRandomBytes(count: number): number[] {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 256));
}

function formatUUIDv4(bytes: number[]): string {
  // Set version bits to 4 (0100xxxx)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // Set variant bits to RFC 4122 (10xxxxxx)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytes.map((b) => b.toString(16).padStart(2, '0'));

  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-');
}

export function generateUUID(): string {
  return formatUUIDv4(getRandomBytes(16));
}
