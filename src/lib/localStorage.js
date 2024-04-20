export const KEY_LOCAL = {
  TOKEN: 'TOKEN',
  LANGUAGE: 'LANGUAGE',
}

const getTokenStorage = () => {
  return localStorage.getItem(KEY_LOCAL.TOKEN)
}

const setTokenStorage = token => {
  return localStorage.setItem(KEY_LOCAL.TOKEN, token)
}

const getLanguageStorage = () => {
  return localStorage.getItem(KEY_LOCAL.LANGUAGE)
}

const setLanguageStorage = language => {
  return localStorage.setItem(KEY_LOCAL.LANGUAGE, language)
}

const APP_LOCAL = {
  getTokenStorage,
  setTokenStorage,
  getLanguageStorage,
  setLanguageStorage,
}

export default APP_LOCAL
