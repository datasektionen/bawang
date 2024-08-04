import React, { Children, createContext } from 'react'

export const LanguageContext = createContext()

export const Swedish = ({ children }) => children || 'Missing value :('
export const English = ({ children }) => children || 'Missing value :('

const languages = {
  sv: Swedish,
  en: English
}

export const Translate = ({ children }) =>
  <LanguageContext.Consumer>
    {lang => Children.toArray(children).filter(c => c.type === languages[lang]).concat(children).slice(0, 1)}
  </LanguageContext.Consumer>
