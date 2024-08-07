import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

import Taitan from './Taitan'
import Methone from 'methone'
import Frontpage from './Frontpage'
import News from './News'
import SingleNews from './News/SingleNews'
import Default from './Default'
import { comparePages } from '../utility/compare'

import { LanguageContext } from './Translate'

import './App.css'
import { addLangToUrl, useLang } from '../utility/lang'

const createLinks = (nav, lang) => nav
  .sort(comparePages)
  .map(({ slug, title }) =>
    <Link key={slug} to={addLangToUrl(slug, lang)}>{title}</Link>
  )

const renderMethone = (path, lang) => {
  // currently we only have support for 2 languages. If we want to add more, we'll have to 
  // figure out a more complex language switching solution, and can't just piggyback of methone.
  const loginTargetLang = lang === 'en' ? 'sv' : 'en';
  
  const targetLangLabel = {
    "sv": "Svenska",
    "en": "English"
  }[loginTargetLang];

  const targetLangHref = {
    "sv": path,
    "en": path + "?lang=en"
  }[loginTargetLang];

  const methoneRenderFunc = ({ nav }) => {
    const links = nav ? createLinks(nav, lang) : [];

    return (
      <Methone config={{
        sytem_name: 'bawang',
        color_scheme: 'cerise',
        login_text: targetLangLabel,
        login_href: targetLangHref,
        links: links
      }} />
    )
  }

  return (
    <Taitan pathname={"/"} lang={lang}>
      {methoneRenderFunc}
    </Taitan>
  )
}

export const App = () => {
  const lang = useLang()
  const location = useLocation()

  return (
    <div id="application" className="cerise">
      {renderMethone(location.pathname, lang)}
      <LanguageContext.Provider value={lang || 'sv'}>
        <Routes>
          <Route path="/" exact element={<Frontpage lang={lang} />} />
          <Route path="/nyheter/:postId" element={<SingleNews lang={lang} />} />
          <Route path="/nyheter" element={<News lang={lang} location={location} />} />
          <Route path="/*" element={<Default lang={lang} />} />
        </Routes>
      </LanguageContext.Provider>
    </div>
  )
}
