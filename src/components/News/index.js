import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'react-head'

import Calypso from '../Calypso'

const Translate = ({ current, children }) => children[current || 'sv']

export const News = ({ location, lang }) =>
  <Calypso search={location.search}>
    {({ content }) =>
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
              <div className="header-right col-md-2" />
            </div>
          </div>
        </header>
        <div id="content" key="content">
          <div className="row">
            <div className="col-sm-4 col-md-3">
              <div id="secondary-nav"><h3><a href="/nyheter">Nyheter/Event</a></h3>
                <ul>
                  <li><a className="text-theme-color strong">Nyheter och event</a></li>
                  <li><a className="">Endast nyheter</a></li>
                  <li><a className="">Endast event</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-8 col-md-9">
              <div className="row">
                <div className="col-md-9">
                  {
                    content &&
                    content.filter(item => item.itemType === 'POST')
                      .filter((_, i) => i < 5)
                      .map(item =>
                        <div key={item.id}>
                          <h1>
                            <Link to={lang === 'en' ? '/en/news/' + item.id : '/nyheter/' + item.id }>
                              <Translate current={lang}>
                                {{
                                  en: item.titleEnglish,
                                  sv: item.titleSwedish
                                }}
                              </Translate>
                            </Link>
                          </h1>
                          <div>
                            {
                              new Date(item.publishDate)
                                .toLocaleDateString(
                                  lang === 'en' ? 'en-GB' : 'sv-SE',
                                  {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  }
                                )
                            }
                          </div>
                          <div>
                            { item.publishAsDisplay || item.authorDisplay }
                          </div>
                          <div dangerouslySetInnerHTML={{
                            __html: lang === 'en' ? item.contentEnglish : item.contentSwedish
                          }}
                          />
                        </div>
                      )
                  }
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
                              <strong>
                                <Translate current={lang}>
                                  {{
                                    en: item.titleEnglish,
                                    sv: item.titleSwedish
                                  }}
                                </Translate>
                              </strong>
                              <br />
                              <span>
                                    {
                                      new Date(item.eventStartTime)
                                        .toLocaleDateString(
                                          lang === 'en' ? 'en-US' : 'sv-SE',
                                          {
                                            day: 'numeric',
                                            month: 'short',
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
  </Calypso>

export default News
