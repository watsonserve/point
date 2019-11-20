import dictionary from '../assets/i18n'

const languages = window.navigator.languages

export function getLang() {
  for (let lang of languages) {
    const dict = dictionary[lang]
    if (dict) {
      return lang
    }
  }
  return 'en-US'
}

const dict = dictionary[getLang()]

export default function t(word: string) {
  const ret = dict[word]
  return ret ? ret : word
}
