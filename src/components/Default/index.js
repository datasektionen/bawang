import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'react-head'

import Taitan from '../Taitan'
import ErrorPage from '../ErrorPage'
import { Translate, English, Swedish } from '../Translate'
import { comparePages } from '../../utility/compare'

const getNav = (nav, lang) => {
  const enNav = lang === 'en' ? nav.find(item => item.slug === '/en').nav : nav
  const child = enNav.find(item => item.nav)
  if(child && child.nav) return child.nav
  return []
}

const parseNav = (items, slug) =>
  <ul key={slug}>
    {items
      .sort(comparePages)
      .map(item =>
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

const getRightSidebarListItemStyle = (headerLevel) => {
  // smallest level is 1, but it since we don't display the list item dot, 
  // it is nice to move the top level header a bit to the left to 
  // compensate (since that doesn't happen automatically)
  const indent = (headerLevel - 2)
  return {
    "margin-left": indent + "rem",
    "line-height": "120%",
    "margin-bottom": "1rem"
  }
}

export const Default = ({ location, lang }) =>
<Taitan pathname={location.pathname}>
  {({ title, body, sidebar, nav, anchors }, error) =>
    error ? <ErrorPage error={error} />
    : <Fragment>
      <Title>
        { title + ' - Konglig Datasektionen'}
      </Title>
      <header key="header">
        <div className="header-inner">
          <div className="row">
            <div className="header-left col-md-2">
              <Link to="/">
                {'« '}
                <Translate>
                  <English>Back</English>
                  <Swedish>Tillbaka</Swedish>
                </Translate>
              </Link>
            </div>
            <div className="col-md-8">
              <h2>{ title }</h2>
            </div>
            <div className="header-right col-md-2">
              <a className="primary-action" href={"https://github.com/datasektionen/bawang-content/tree/master/" + location.pathname}>
                <Translate>
                  <English>Edit</English>
                  <Swedish>Redigera</Swedish>
                </Translate>
              </a>
            </div>
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
                    <Translate>
                      <English>On this page</English>
                      <Swedish>På den här sidan</Swedish>
                    </Translate>
                  </h2>
                  <ul>
                    {(anchors || []).map(anchor =>
                      <li key={anchor.id} style={{"list-style-type": "none"}}>
                        <a href={'#' + anchor.id}>
                          <div style={getRightSidebarListItemStyle(anchor.level)}>
                            { anchor.value }
                          </div>
                        </a>
                      </li>
                    )}
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
