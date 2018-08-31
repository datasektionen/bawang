import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Taitan from './Taitan'
import Methone from 'methone'
import Frontpage from './Frontpage'
import News from './News'
import Default from './Default'

import './App.css'

const createLinks = nav => nav.map(({ slug, title }) => <Link key={slug} to={slug}>{title}</Link>)

const renderMethone = path => match =>
  <Taitan pathname={path}>
    {({ nav }) =>
      <Methone config={{
        sytem_name: 'bawang',
        color_scheme: 'cerise',
        login_text: path === '/en' ? 'Svenska' : 'English',
        login_href: path === '/en' ? '/' : '/en',
        links: !nav ? [] : createLinks(
          path === '/en'
          ? nav.find(n => n.slug === '/en').nav
          : nav.filter(n => n.slug !== '/en')
        )
      }} />
    }
  </Taitan>

const App = () =>
  <div id="application" className="cerise">
    <Switch>
      <Route path="/en/" render={renderMethone('/en')} />
      <Route path="/" render={renderMethone('/')} />
    </Switch>
    <Switch>
      <Route path="/en/" exact render={ match => <Frontpage lang="en" {...match} /> } />
      <Route path="/en/news" exact render={ match => <News lang="en" {...match} /> } />
      <Route path="/en/" render={ match => <Default lang="en" {...match} /> } />

      <Route path="/" exact render={ match => <Frontpage {...match} /> } />
      <Route path="/nyheter" render={ match => <News {...match} /> } />
      <Route path="/" render={ match => <Default {...match} /> } />
    </Switch>
  </div>

export default App
