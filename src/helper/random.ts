
function toHex(n: number, pad: number): string {
  let hex = (~~n).toString(16)
  const length = hex.length
  if (hex.length < pad) {
    hex = '0'.repeat(pad - length) + hex
  }
  return hex
}

export function hashColor(str: string): string {
  const bit: number = [].reduce.call(str, (sum: number, item: string) => sum + item.codePointAt(0), 0)
  return toHex(+ `${bit << 1}${bit}${bit % 256}`, 6)
}

export function randomColor(): string {
  return [...Array(3)].map(() => toHex(Math.random() * 254 + 1, 2)).join('')
}
