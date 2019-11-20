
export function loadImage(src: string, timeout: number = 0): Promise<any> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve()
    img.onerror = reject
    if (timeout) {
      const timeHandle = setTimeout(() => {
        clearTimeout(timeHandle)
        reject(new Error('timeout'))
      }, timeout)
    }
  })
}
