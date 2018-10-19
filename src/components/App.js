import React, { Fragment } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Taitan from './Taitan'
import Methone from 'methone'
import Frontpage from './Frontpage'
import News from './News'
import SingleNews from './News/SingleNews'
import Default from './Default'

import { LanguageContext } from './Translate'

import './App.css'
import './FixMe.css'

const createLinks = nav => nav.map(({ slug, title }) => <Link key={slug} to={slug}>{title}</Link>)

const renderMethone = path =>
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
      <Route path="/en/" render={() =>
        <Fragment>
          {renderMethone('/en')}
          <LanguageContext.Provider value='en'>
            <Switch>
              <Route path="/en/" exact render={ args => <Frontpage lang="en" {...args} /> } />
              <Route path="/en/news/:postId" exact render={ args => <SingleNews lang="en" {...args} /> } />
              <Route path="/en/news" exact render={ args => <News lang="en" {...args} /> } />
              <Route path="/en/" render={ args => <Default lang="en" {...args} /> } />
            </Switch>
          </LanguageContext.Provider>
        </Fragment>
      } />
      <Route path="/" render={() =>
        <Fragment>
          {renderMethone('/')}
          <LanguageContext.Provider value='sv'>
            <Switch>
              <Route path="/" exact render={ args => <Frontpage {...args} /> } />
              <Route path="/nyheter/:postId" render={ args => <SingleNews {...args} /> } />
              <Route path="/nyheter" render={ args => <News {...args} /> } />
              <Route path="/" render={ args => <Default {...args} /> } />
            </Switch>
          </LanguageContext.Provider>
        </Fragment>
        } />
    </Switch>
  </div>

export default App
