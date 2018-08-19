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
          {
            content &&
            content.filter(item => item.itemType === 'POST')
              .filter((_, i) => i < 5)
              .map(item =>
                <li key={item.id}>
                  <h3>
                    <Translate current={lang}>
                      {{
                        en: item.titleEnglish,
                        sv: item.titleSwedish
                      }}
                    </Translate>
                  </h3>
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
                </li>
              )
          }
        </div>
      </Fragment>
    }
  </Calypso>

export default News
