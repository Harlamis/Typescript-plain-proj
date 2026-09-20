export function generateNumericId(): string {
  return String(Date.now() + Math.floor(Math.random() * 1000));
}
