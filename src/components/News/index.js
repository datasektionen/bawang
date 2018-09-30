import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'react-head'
import { pickBy, identity } from 'lodash'
import classNames from 'classnames/bind'
import styles from './News.module.css'

import Calypso from '../Calypso'
import { Translate, English, Swedish } from '../Translate'

const cx = classNames.bind(styles)

export const News = ({ location, lang }) => {
  const itemType = new URLSearchParams(location.search).get('itemType')
  const getSearch = page => {
    const params = new URLSearchParams(pickBy({page, itemType}, identity)).toString()
    return params ? '?' + params : ''
  }

  return <Calypso search={location.search}>
    {({content, first, last, number, totalPages}) =>
      <Fragment>
        <Title>
          <Translate>
            <English>News - Kongling Datasektionen</English>
            <Swedish>Nyheter - Kongling Datasektionen</Swedish>
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
              <div className="header-right col-md-2"/>
            </div>
          </div>
        </header>
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
                      to={location.pathname}
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
                      to={`${location.pathname}?itemType=POST`}
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
                      to={`${location.pathname}?itemType=EVENT`}
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
                <div className={cx('col-md-9', 'news')}>
                  {
                    content &&
                    content.map(item =>
                      <div key={item.id} className={cx('notice', 'ultra_light')}>
                        <div className={styles.metadata}>
                          <div className="row">
                            <div className="col-xs-6">
                              <i className="fa fa-user-circle"/>{'  '}
                              {item.publishAsDisplay || item.authorDisplay}
                            </div>
                            <div className="col-xs-6 text-right">
                              <i className="far fa-clock"/>{'  '}
                              {
                                new Date(item.publishDate)
                                  .toLocaleDateString(
                                    lang === 'en' ? 'en-US' : 'sv-SE',
                                    {
                                      day: 'numeric',
                                      month: 'long',
                                      year: 'numeric',
                                      hour: 'numeric',
                                      minute: 'numeric'
                                    }
                                  )
                              }
                            </div>
                          </div>
                        </div>
                        <div className={styles.content}>
                          <h2>
                            <Link to={`${location.pathname}/${item.id}`}>
                              <Translate>
                                <English>{item.titleEnglish}</English>
                                <Swedish>{item.titleSwedish}</Swedish>
                              </Translate>
                            </Link>
                          </h2>
                          <div dangerouslySetInnerHTML={{
                            __html: lang === 'en' ? item.contentEnglish : item.contentSwedish
                          }}
                          />
                        </div>
                        {(item.googleForm || item.facebookEvent) &&
                        <div className="row">
                          {item.googleForm && <div className={item.facebookEvent ? cx('col-xs-6', styles['no-padding-right']) : 'col-xs-12'}>
                            <a className={styles.gdocs} href={item.googleForm} target="_blank" rel="noopener noreferrer">
                              <i className="fab fa-fw fa-google"/>{'  '}
                              <Translate>
                                <English>Open in Google Docs</English>
                                <Swedish>Öppna i Google Docs</Swedish>
                              </Translate>
                            </a>
                          </div>}
                          {item.facebookEvent && <div className={item.googleForm ? cx('col-xs-6', styles['no-padding-left']) : 'col-xs-12'}>
                            <a className={styles.fb} href={item.facebookEvent} target="_blank" rel="noopener noreferrer">
                              <i className="fab fa-fw fa-facebook-f"/>{'  '}
                              <Translate>
                                <English>Facebook Event</English>
                                <Swedish>Facebook-event</Swedish>
                              </Translate>
                            </a>
                          </div>}
                        </div>}
                      </div>
                    )
                  }
                  <hr/>
                  <div className="text-center">
                    <nav aria-label="Page navigation">
                      <ul className="pagination">
                        {first
                          ? <li className="disabled"><span>&laquo;</span></li>
                          : <li><Link to={location.pathname + getSearch(0)}>&laquo;</Link></li>}
                        {first
                          ? <li className="disabled"><span>&lsaquo;</span></li>
                          : <li><Link to={location.pathname + getSearch(number - 1)}>&lsaquo;</Link></li>}
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
                          : <li><Link to={location.pathname + getSearch(number + 1)}>&rsaquo;</Link></li>}
                        {last
                          ? <li className="disabled"><span>&raquo;</span></li>
                          : <li><Link to={location.pathname + getSearch(totalPages - 1)}>&raquo;</Link></li>}
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-md-3" id="sidebar">
                  <div className="sidebar-card">
                    <h2>
                      <Translate>
                        <English>Upcoming events</English>
                        <Swedish>Kommande event</Swedish>
                      </Translate>
                    </h2>
                    <Calypso type='event'>
                      {content =>
                        (content && content.length)
                          ? content
                            .filter((_, i) => i < 5)
                            .map(item => <p key={item.id}>
                              <Link to={location.pathname + '/' + item.id}>
                                <strong>
                                  <Translate>
                                    <English>{item.titleEnglish}</English>
                                    <Swedish>{item.titleSwedish}</Swedish>
                                  </Translate>
                                </strong>
                              </Link>
                              <br/>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    }
  </Calypso>
}

export default News
