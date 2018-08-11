import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Calypso from '../Calypso'

export const News = ({ location }) =>
  <Calypso search={location.search}>
    {({ content }) =>
      <Fragment>
        <header key="header">
          <div className="header-inner">
            <div className="row">
              <div className="header-left col-md-2">
                <Link to="/">&laquo; Tillbaka</Link>
              </div>
              <div className="col-md-8">
                <h2>Nyheter</h2>
              </div>
              <div className="header-right col-md-2"></div>
            </div>
          </div>
        </header>
        <div id="content" key="content">
          {
            content &&
            content.filter(item => item.itemType === 'POST')
              .filter((_, i) => i < 5)
              .map(item => <li key={item.id}>
                <h3>{ item.titleSwedish }</h3>
                <span>
                  { new Date(item.publishDate)
                    .toLocaleDateString('sv-SE', {day: 'numeric', month: 'short', year: 'numeric'}) }
                </span>
                <span>
                  { item.publishAsDisplay || item.authorDisplay }
                </span>
                <div dangerouslySetInnerHTML={{__html: item.contentSwedish}}></div>
              </li>)
          }
        </div>
      </Fragment>
    }
  </Calypso>

export default News
