import React, { Fragment } from 'react'
import { Routes, Route, Link, useSearchParams } from 'react-router-dom'

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

const renderMethone = (lang) => {
  const path = window.location.pathname;
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
      <Routes>

        <Route path render={() =>
          <Fragment>
            {renderMethone(lang)}
            <LanguageContext.Provider value={lang}>
              <Routes>
                <Route path="/" exact render={args => <Frontpage lang={lang} {...args} />} />
                <Route path="/nyheter/:postId" render={args => <SingleNews lang={lang}{...args} />} />
                <Route path="/nyheter" render={args => <News lang={lang}{...args} />} />
                <Route path="/" render={args => <Default lang={lang}{...args} />} />
              </Routes>
            </LanguageContext.Provider>
          </Fragment>
        } />
      </Routes>
    </div>
  )
}
