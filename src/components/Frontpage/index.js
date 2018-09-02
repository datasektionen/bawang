import React from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'react-head'
import classNames from 'classnames/bind'

import Taitan from '../Taitan'
import Calypso from '../Calypso'

import styles from './Frontpage.module.css'
import skold from './skold.svg'

const cx = classNames.bind(styles)

const Translate = ({ current, children }) => children[current || 'sv']

const Frontpage = ({ location, lang }) =>
<Taitan pathname={location.pathname}>
  {({ title, body, sidebar }) =>
    <div className={styles.frontpage}>
      <Title>
        { title }
      </Title>
      <header>
        <div className={styles.title}>
          <span className={cx('thin', 'left')}>
            <Translate current={lang}>
              {{
                en: 'Welcome to',
                sv: 'Välkommen till'
              }}
            </Translate>
          </span>
          <span className={styles.bold}>
          Konglig
            <img src={skold} alt=" " />
          Datasektionen
          </span>
          <span className={cx('thin',  'right')}>
            <Translate current={lang}>
              {{
                en: 'Chapter of THS • Since 1983',
                sv: 'Vid THS • Sedan 1983'
              }}
            </Translate>
          </span>
        </div>
      </header>
      <div className={cx('content', 'flex', 'hero')}>
        <div
          className={cx('col-md-3', 'intro')}
          dangerouslySetInnerHTML={{__html: body}}
        />
        <Calypso type='list'>
          {({ content }) =>
            <div className={cx('col-md-5', 'news')}>
              <h2>
                <Translate current={lang}>
                  {{
                    en: 'News',
                    sv: 'Nyheter'
                  }}
                </Translate>
              </h2>
              <ul>
                {
                  content &&
                  content
                    .filter(item => item.itemType === 'POST')
                    .filter((_, i) => i < 5)
                    .map(item => <li key={item.id}>
                      <h3>
                        <Translate current={lang}>
                         {{
                            en: item.titleEnglish,
                            sv: item.titleSwedish
                         }}
                        </Translate>
                      </h3>
                      <span>
                        {
                          new Date(item.publishDate)
                          .toLocaleDateString(
                            lang === 'en' ? 'en-US' : 'sv-SE',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            }
                          )
                        }
                        &nbsp;&bull;&nbsp;
                        { item.publishAsDisplay || item.authorDisplay }
                      </span>
                    </li>)
                }
              </ul>
              <div className="text-center">
              <Link
                to={ lang === 'en' ? '/en/news' : '/nyheter' }
                className={cx('more-btn')}
              >
                <Translate current={lang}>
                {{
                  en: 'More News »',
                  sv: 'Mer Nyheter »'
                }}
                </Translate>
              </Link>
              </div>
            </div>
          }
        </Calypso>
        <Calypso type='event'>
          {({ content }) =>
            <div className={cx('col-md-4', 'news')}>
              <h2>
                <Translate current={lang}>
                  {{
                    en: 'Event',
                    sv: 'Event'
                  }}
                </Translate>
              </h2>
              <ul>
                {
                  content &&
                  content
                    .filter(item => item.itemType === 'EVENT')
                    .filter((_, i) => i < 5)
                    .map(item => <li key={item.id}>
                      <h3>
                        <Translate current={lang}>
                         {{
                            en: item.titleEnglish,
                            sv: item.titleSwedish
                         }}
                        </Translate>
                      </h3>
                      <span>
                        {
                          new Date(item.publishDate)
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
                      &bull;
                      <span>
                        { item.publishAsDisplay || item.authorDisplay }
                      </span>
                    </li>)
                }
              </ul>
            </div>
          }
        </Calypso>
      </div>
      <div
        className={cx('content')}
        dangerouslySetInnerHTML={{__html: sidebar}}
      />
    </div>
  }
</Taitan>

export default Frontpage
