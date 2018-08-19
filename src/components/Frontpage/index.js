import React, { Fragment } from 'react'
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
  {taitan =>
    <div className={styles.frontpage}>
      <Title>
        { taitan.title }
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
                en: 'Chapter of THS &bull; Since 1983',
                sv: 'Vid THS &bull; Sedan 1983'
              }}
            </Translate>
          </span>
        </div>
      </header>
      <div className={cx('content', 'flex')}>
        <div
          className={cx('col-md-4', 'intro')}
          dangerouslySetInnerHTML={{__html: taitan.body}}
        />
        <Calypso search={location.search}>
          {({ content }) =>
            <Fragment>
              <div className={cx('col-md-4', 'news')}>
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
                              lang === 'en' ? 'en-GB' : 'sv-SE',
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
              <div className={cx('col-md-4', 'news')}>
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
                              lang === 'en' ? 'en-GB' : 'sv-SE',
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
            </Fragment>
          }
        </Calypso>
      </div>
      <div
        className={cx('content')}
        dangerouslySetInnerHTML={{__html: taitan.sidebar}}
      />
    </div>
  }
</Taitan>

export default Frontpage
