export function getUA() {
  const ua = window.navigator.userAgent.match(/^Mozilla\/5\.0 \((.+?)\) (.+)$/)
  if (!Array.isArray(ua)) {
    return { os: '', browser: '' }
  }

  const [os, browser] = ua.slice(1)
  return { os, browser }
}
