import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Taitan from '../Taitan'

export const Default = ({ location }) =>
  <Taitan pathname={location.pathname}>
    {({ title, body, sidebar, nav, anchors }) => {
      const activeNav = (nav.filter(item => item.expanded || item.active)[0] || {}).nav

      const parseNav = (items, slug) =>
        <ul key={slug}>
        { items.map(item => {
          const active = item.active ? 'text-theme-color strong' : ''
          const listitem = <li key={ item.slug }>
            <Link className={active} to={ item.slug }>{ item.title }</Link>
          </li>
          if (item.nav)
            return [listitem, parseNav(item.nav, item.slug + '/')]
          else
            return listitem
        })
        }
      </ul>

    return (
      <Fragment>
        <header key="header">
          <div className="header-inner">
            <div className="row">
              <div className="header-left col-md-2">
                <Link to="/">&laquo; Tillbaka</Link>
              </div>
              <div className="col-md-8">
                <h2>{ title }</h2>
              </div>
              <div className="header-right col-md-2"></div>
            </div>
          </div>
        </header>
        <div id="content" key="content">
          <div className="row">
            <div className="col-sm-4 col-md-3">
              <div id="secondary-nav">
                { parseNav(activeNav || nav) }
              </div>
            </div>
            <div className="col-sm-8 col-md-9">
              <div className="row">
                <div className="col-md-9" dangerouslySetInnerHTML={{__html: body}}></div>
                <div className="col-md-3" id="sidebar">
                  { sidebar ?
                    <div className="sidebar-card" dangerouslySetInnerHTML={{__html: sidebar}}></div>
                    : false }
                  <div className="sidebar-card">
                    <h2>På den här sidan</h2>
                    <ul>
                      { anchors.map(anchor => <li key={ anchor.id }>
                        <a href={'#' + anchor.id}>{ anchor.value }</a>
                      </li>) }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )}}
  </Taitan>

export default Default
