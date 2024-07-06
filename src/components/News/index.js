import React, { Fragment } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Title } from 'react-head'
import { pickBy, identity } from 'lodash'
import classNames from 'classnames/bind'
import styles from './News.module.css'

import Calypso from '../Calypso'
import { Translate, English, Swedish } from '../Translate'
import NewsItem from './NewsItem'
import EventCalendar, { getWeekTimeSpan } from '../EventCalendar'
import { addLangToUrl } from '../../util/lang'

if (global && !global.URLSearchParams) {
  global.URLSearchParams = require('url').URLSearchParams
}

const cx = classNames.bind(styles)

export const News = ({ location, lang }) => {
  const [searchParams,] = useSearchParams()
  const itemType = searchParams.get("itemType")
  const getSearch = page => {
    const params = new URLSearchParams(pickBy({ page, itemType }, identity)).toString()
    return params ? '?' + params : ''
  }

  return <Fragment>
    <Title>
      <Translate>
        <English>News - Konglig Datasektionen</English>
        <Swedish>Nyheter - Konglig Datasektionen</Swedish>
      </Translate>
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
            <h2>
              <Translate>
                <English>News</English>
                <Swedish>Nyheter</Swedish>
              </Translate>
            </h2>
          </div>
          <div className="header-right col-md-2">
            <a className="primary-action" href="https://calypso.datasektionen.se/">
              <Translate>
                <English>Edit</English>
                <Swedish>Redigera</Swedish>
              </Translate>
            </a>
          </div>
        </div>
      </div>
    </header>

    {/* Calendar section*/}
    <div className={cx("calendar-content")}>
      {/* Title */}
      <h2 id="sections_intro">
        <Translate>
          <Swedish>Evenemangskalender</Swedish>
          <English>Event Calendar</English>
        </Translate>
      </h2>

      {/* Calendar */}
      <Calypso type='event' defaultTimeSpan={getWeekTimeSpan(new Date())}>
        {/* Given content from Calypso, populate the section with events information */}
        {({ content, loading, onUpdateTimeSpan }) =>
          <EventCalendar
            events={loading ? [] : content}
            location={location}
            lang={lang}
            onUpdateTimeSpan={onUpdateTimeSpan}
          />
        }
      </Calypso>
    </div>

    <div id="content" key="content">

      <div className="row">
        <div className="col-sm-4 col-md-3">
          <div id="secondary-nav">
            <h3>
              <Translate>
                <English>Filters</English>
                <Swedish>Filtrering</Swedish>
              </Translate>
            </h3>
            <ul>
              <li>
                <Link
                  to={addLangToUrl(location.pathname, lang)}
                  className={classNames({ 'text-theme-color strong': !itemType })}
                >
                  <Translate>
                    <English>News and events</English>
                    <Swedish>Nyheter och event</Swedish>
                  </Translate>
                </Link>
              </li>
              <li>
                <Link
                  to={addLangToUrl(`${location.pathname}?itemType=POST`, lang)}
                  className={classNames({ 'text-theme-color strong': itemType === 'POST' })}
                >
                  <Translate>
                    <English>Only news</English>
                    <Swedish>Endast nyheter</Swedish>
                  </Translate>
                </Link>
              </li>
              <li>
                <Link
                  to={addLangToUrl(`${location.pathname}?itemType=EVENT`, lang)}
                  className={classNames({ 'text-theme-color strong': itemType === 'EVENT' })}
                >
                  <Translate>
                    <English>Only events</English>
                    <Swedish>Endast event</Swedish>
                  </Translate>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-8 col-md-9">
          <div className="row">
            <Calypso search={location.search}>
              {({ content, first, last, number, totalPages }) =>
                <div className={cx('col-md-9', 'news')}>
                  {
                    content && content.map(item => <NewsItem item={item} location={location} lang={lang} key={item.id} />)
                  }
                  <hr />
                  <div className="text-center">
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                        {first
                          ? <li className="disabled"><span>&laquo;</span></li>
                          : <li><Link to={addLangToUrl(location.pathname + getSearch(0), lang)}>&laquo;</Link></li>}
                        {first
                          ? <li className="disabled"><span>&lsaquo;</span></li>
                          : <li><Link to={addLangToUrl(location.pathname + getSearch(number - 1), lang)}>&lsaquo;</Link></li>}
                        <li className="disabled">
                          <span>
                            <Translate>
                              <English>Page {number + 1} of {totalPages}</English>
                              <Swedish>Sida {number + 1} av {totalPages}</Swedish>
                            </Translate>
                          </span>
                        </li>
                        {last
                          ? <li className="disabled"><span>&rsaquo;</span></li>
                          : <li><Link to={addLangToUrl(location.pathname + getSearch(number + 1), lang)}>&rsaquo;</Link></li>}
                        {last
                          ? <li className="disabled"><span>&raquo;</span></li>
                          : <li><Link to={addLangToUrl(location.pathname + getSearch(totalPages - 1), lang)}>&raquo;</Link></li>}
                      </ul>
                    </nav>
                  </div>
                </div>
              }
            </Calypso>
            <div className="col-md-3" id="sidebar">
              <div className="sidebar-card">
                <h2>
                  <Translate>
                    <English>Upcoming events</English>
                    <Swedish>Kommande event</Swedish>
                  </Translate>
                </h2>
                <Calypso type='event'>
                  {({ content }) =>
                    (content && content.length)
                      ? content
                        .filter((_, i) => i < 5)
                        .map(item => <p key={item.id}>
                          <Link to={addLangToUrl(location.pathname + '/' + item.id, lang)}>
                            <strong>
                              <Translate>
                                <English>{item.titleEnglish}</English>
                                <Swedish>{item.titleSwedish}</Swedish>
                              </Translate>
                            </strong>
                          </Link>
                          <br />
                          <span>
                            {
                              new Date(item.eventStartTime)
                                .toLocaleDateString(
                                  lang === 'en' ? 'en-US' : 'sv-SE',
                                  {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  }
                                )
                            }
                          </span>
                        </p>)
                      :
                      <Translate>
                        <English>No upcoming events :(</English>
                        <Swedish>Inga kommande event :(</Swedish>
                      </Translate>
                  }
                </Calypso>
                <h2>
                  <Translate>
                    <English>Export news</English>
                    <Swedish>Exportera nyheter</Swedish>
                  </Translate>
                </h2>
                <Translate>
                  <English><a href="https://calypso.datasektionen.se/feeds/ical_en">Link to ical-calendar</a></English>
                  <Swedish><a href="https://calypso.datasektionen.se/feeds/ical">Länk till ical-kalender</a></Swedish>
                </Translate>
                <br />
                <Translate>
                  <English><a href="https://calypso.datasektionen.se/feeds/rss">Link to RSS</a></English>
                  <Swedish><a href="https://calypso.datasektionen.se/feeds/rss">Länk till RSS</a></Swedish>
                </Translate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Fragment>
}

export default News
