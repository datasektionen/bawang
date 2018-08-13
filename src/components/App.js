import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Methone from 'methone'
import Frontpage from './Frontpage'
import News from './News'
import Default from './Default'

import './App.css'

//const links = taitanSlugs.map(({link, name} => <Link to={link}>{name}</Link>))
const links = [
  <Link key="nyheter" to="/nyheter">Nyheter</Link>,
  <Link key="sektionen" to="/sektionen">Sektionen</Link>,
  <Link key="studier" to="/studier">Studier</Link>,
  <Link key="namnder" to="/namnder">Nämnder</Link>,
  <Link key="organisation" to="/organisation">Organisation</Link>,
  <Link key="naringsliv" to="/naringsliv">Näringsliv</Link>,
  <Link key="kontakt" to="/kontakt">Kontakt</Link>,
]

const App = () =>
  <div id="application" className="cerise">
    <Methone config={{sytem_name: 'bawang', color_scheme: 'cerise', links}} />
    <Switch>
      <Route path="/" exact render={ match => <Frontpage {...match} /> } />
      <Route path="/nyheter" render={ match => <News {...match} /> } />
      <Route path="/nyheter/:postId" render={ match => <News {...match} /> } />
      <Route render={ match => <Default {...match} /> } />
    </Switch>
  </div>

export default App
