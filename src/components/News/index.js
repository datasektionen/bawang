import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'react-head'

import classNames from 'classnames/bind'
import styles from './News.module.css'

import Calypso from '../Calypso'

const cx = classNames.bind(styles)
const Translate = ({ current, children }) => children[current || 'sv']

export const News = ({ location, lang }) => {
  const itemType = new URLSearchParams(location.search).get('itemType')

  return <Calypso search={location.search}>
    {({content, first, last, number, totalPages}) =>
      <Fragment>
        <Title>
          <Translate>
            {{
              en: 'News - Kongling Datasektionen',
              sv: 'Nyheter - Kongling Datasektionen'
            }}
          </Translate>
        </Title>
        <header key="header">
          <div className="header-inner">
            <div className="row">
              <div className="header-left col-md-2">
                <Link to="/">
                  &laquo;&nbsp;
                  <Translate current={lang}>
                    {{
                      en: 'Back',
                      sv: 'Tillbaka'
                    }}
                  </Translate>
                </Link>
              </div>
              <div className="col-md-8">
                <h2>
                  <Translate current={lang}>
                    {{
                      en: 'News',
                      sv: 'Nyheter'
                    }}
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
                  <Link to={location.pathname}>
                    <Translate current={lang}>
                      {{
                        en: 'News/Events',
                        sv: 'Nyheter/Event'
                      }}
                    </Translate>
                  </Link>
                </h3>
                <ul>
                  <li><Link to={location.pathname} className={!itemType && 'text-theme-color strong'}>Nyheter och event</Link></li>
                  <li><Link to={'?itemType=POST'} className={itemType === 'POST' && 'text-theme-color strong'}>Endast nyheter</Link></li>
                  <li><Link to={'?itemType=EVENT'} className={itemType === 'EVENT' && 'text-theme-color strong'}>Endast event</Link></li>
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
                              <i className="fa fa-user-circle"/>&nbsp;&nbsp;
                              {item.publishAsDisplay || item.authorDisplay}
                            </div>
                            <div className="col-xs-6 text-right">
                              <i className="far fa-clock"/>&nbsp;&nbsp;
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
                            <Link to={location.pathname + '/' + item.id}>
                              <Translate current={lang}>
                                {{
                                  en: item.titleEnglish,
                                  sv: item.titleSwedish
                                }}
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
                              <i className="fab fa-fw fa-google"/>&nbsp;&nbsp;
                              <Translate current={lang}>
                                {{
                                  en: 'Open in Google Docs',
                                  sv: 'Öppna i Google Docs'
                                }}
                              </Translate>
                            </a>
                          </div>}
                          {item.facebookEvent && <div className={item.googleForm ? cx('col-xs-6', styles['no-padding-left']) : 'col-xs-12'}>
                            <a className={styles.fb} href={item.facebookEvent} target="_blank" rel="noopener noreferrer">
                              <i className="fab fa-fw fa-facebook-f"/>&nbsp;&nbsp;
                              <Translate current={lang}>
                                {{
                                  en: 'Facebook Event',
                                  sv: 'Facebook-event'
                                }}
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
                          : <li><Link to={location.pathname + itemType && '?itemType=' + itemType}>&laquo;</Link></li>}
                        {first
                          ? <li className="disabled"><span>&lsaquo;</span></li>
                          : <li><Link to={`?page=${number - 1}`}>&lsaquo;</Link></li>}
                        <li className="disabled">
                          <span>
                            <Translate current={lang}>
                              {{
                                en: `Page ${number + 1} of ${totalPages}`,
                                sv: `Sida ${number + 1} av ${totalPages}`
                              }}
                            </Translate>
                          </span>
                        </li>
                        {last
                          ? <li className="disabled"><span>&rsaquo;</span></li>
                          : <li><Link to={`?page=${number + 1}${itemType && '&itemType=' + itemType}`}>&rsaquo;</Link></li>}
                        {last
                          ? <li className="disabled"><span>&raquo;</span></li>
                          : <li><Link to={`?page=${totalPages - 1}${itemType && '&itemType=' + itemType}`}>&raquo;</Link></li>}
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="col-md-3" id="sidebar">
                  <div className="sidebar-card">
                    <h2>
                      <Translate current={lang}>
                        {{
                          en: 'Upcoming events',
                          sv: 'Kommande event'
                        }}
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
                                  <Translate current={lang}>
                                    {{
                                      en: item.titleEnglish,
                                      sv: item.titleSwedish
                                    }}
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
                          : <Translate current={lang}>
                            {{
                              en: 'No upcoming events :(',
                              sv: 'Inga kommande event :('
                            }}
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
  </Calypso>;
}

export default News
