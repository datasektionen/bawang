import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'react-head'

import Taitan from '../Taitan'


const getNav = (nav, lang) => {
  const enNav = lang === 'en' ? nav.find(item => item.slug === '/en').nav : nav
  const child = enNav.find(item => item.nav)
  if(child && child.nav) return child.nav
  return []
}

const parseNav = (items, slug) =>
  <ul key={slug}>
    { items.map(item =>
      <Fragment key={item.slug}>
        <li>
          <Link
            className={item.active ? 'text-theme-color strong' : ''}
            to={item.slug}
          >
            { item.title }
          </Link>
        </li>
        {item.nav && parseNav(item.nav, item.slug + '/')}
      </Fragment>
    )}
  </ul>

const Translate = ({ current, children }) => children[current || 'sv']

export const Default = ({ location, lang }) =>
<Taitan pathname={location.pathname}>
  {({ title, body, sidebar, nav, anchors }) =>
    <Fragment>
      <Title>
        { title + ' - Kongling Datasektionen'}
      </Title>
      <header key="header">
        <div className="header-inner">
          <div className="row">
            <div className="header-left col-md-2">
              <Link to="/">
                &laquo;
                <Translate current={lang}>
                  {{
                    en: 'Back',
                    sv: 'Tillbaka'
                  }}
                </Translate>
              </Link>
            </div>
            <div className="col-md-8">
              <h2>{ title }</h2>
            </div>
            <div className="header-right col-md-2" />
          </div>
        </div>
      </header>
      <div id="content" key="content">
        <div className="row">
          <div className="col-sm-4 col-md-3">
            <div id="secondary-nav">
              { !nav ? [] : parseNav(getNav(nav, lang)) }
            </div>
          </div>
          <div className="col-sm-8 col-md-9">
            <div className="row">
              <div
                className="col-md-9"
                dangerouslySetInnerHTML={{__html: body}}
              />
              <div
                className="col-md-3"
                id="sidebar"
              >
                { sidebar
                  ? <div
                      className="sidebar-card"
                      dangerouslySetInnerHTML={{__html: sidebar}}
                    />
                  : false
                }
                <div className="sidebar-card">
                  <h2>
                    <Translate current={lang}>
                      {{
                        en: 'On this page',
                        sv: 'På den här sidan'
                      }}
                    </Translate>
                  </h2>
                  <ul>
                    {
                      (anchors || []).map(anchor =>
                        <li key={ anchor.id }>
                          <a href={'#' + anchor.id}>
                            { anchor.value }
                          </a>
                        </li>
                      )
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  }
</Taitan>

export default Default
