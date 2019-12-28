function splitN(line: string, ch: string, seg: number): string[] {
  const ret: string[] = []
  const chLen = ch.length

  for (let i = 0; i < seg; i++) {
    const idx = line.search(ch)
    const foo = line.substring(0, idx)
    line = line.substring(idx + chLen)
    ret.push(foo)
  }

  ret.push(line)
  return ret
}

export function markDown(md: string): string {
  return md.split('\n')
  .map(line => {
    const [sign, txt] = splitN(line, ' ', 1)
    switch (sign) {
      case '#':
        return `<h1>${ txt }</h1>`
      case '##':
        return `<h2>${ txt }</h2>`
      case '###':
        return `<h3>${ txt }</h3>`
      case '####':
        return `<h4>${ txt }</h4>`
      case '#####':
        return `<h5>${ txt }</h5>`
      case '######':
        return `<h6>${ txt }</h6>`
    }
    return line
  })
  .join('')
}
