import React, { Fragment } from 'react'
import { Routes, Route, Link, useSearchParams, useLocation } from 'react-router-dom'

import Taitan from './Taitan'
import Methone from 'methone'
import Frontpage from './Frontpage'
import News from './News'
import SingleNews from './News/SingleNews'
import Default from './Default'
import { comparePages } from '../utility/compare'

import { LanguageContext } from './Translate'

import './App.css'

const createLinks = nav => nav
  .sort(comparePages)
  .map(({ slug, title }) => <Link key={slug} to={slug}>{title}</Link>)

const renderMethone = (path, lang) => {
  const info = {
    "en": "Svenska",
    "sv": "English"
  }[lang] || "Svenska";

  const redir = {
    "en": path,
    "sv": path + "?lang=en"
  }[lang] || path;

  const methoneRenderFunc = ({ nav }) => {
    const links = nav ? createLinks(nav) : [];

    return (
      <Methone config={{
        sytem_name: 'bawang',
        color_scheme: 'cerise',
        login_text: info,
        login_href: redir,
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
  const [searchParams,] = useSearchParams()
  const lang = searchParams.get("lang")

  return (
    <div id="application" className="cerise">
      {renderMethone(location.pathname, lang)}
      <LanguageContext.Provider value={lang}>
        <Routes>
          <Route path="/" exact element={<Frontpage lang={lang} />} />
          <Route path="/nyheter/:postId" element={<SingleNews lang={lang} />} />
          <Route path="/nyheter" element={<News lang={lang} />} />
          <Route path="/*" element={<Default lang={lang}/>} />
        </Routes>
      </LanguageContext.Provider>
    </div>
  )
}
