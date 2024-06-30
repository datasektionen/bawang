
// handles the case if the lang is undefinede
export const addLangToUrl = (url, lang) => {
  return lang ? url + "?lang=" + lang : url
}