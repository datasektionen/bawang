import React from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'react-head'
import classNames from 'classnames/bind'

import Taitan from '../Taitan'
import Calypso from '../Calypso'
import { Translate, English, Swedish } from '../Translate'

import styles from './Frontpage.module.css'
import skold from './skold.svg'

const cx = classNames.bind(styles)

const Frontpage = ({ location, lang }) =>
<Taitan pathname={location.pathname}>
  {({ title, body, sidebar }) =>
    <div>
      <Title>
        { title }
      </Title>
      <header className={styles.header}>
        <div className={styles.title}>
          <span className={cx('thin', 'left')}>
            <Translate>
              <English>Welcome to</English>
              <Swedish>Välkommen till</Swedish>
            </Translate>
          </span>
          <span className={styles.bold}>
          Konglig
            <img src={skold} alt=" " />
          Datasektionen
          </span>
          <span className={cx('thin',  'right')}>
            <Translate>
                <English>Chapter of THS &bull; Since 1983</English>
                <Swedish>Vid THS &bull; Sedan 1983</Swedish>
            </Translate>
          </span>
        </div>
      </header>
      <div className={cx('content', 'flex', 'hero')}>
        <div
          className={cx('col-md-3', 'intro')}
          dangerouslySetInnerHTML={{__html: body}}
        />
        <Calypso type='list' search='?itemType=POST'>
          {({ content }) =>
            <div className={cx('col-md-5', 'news')}>
              <h2>
                 <Translate>
                  <English>News</English>
                  <Swedish>Nyheter</Swedish>
                </Translate>
              </h2>
              <ul>
                {
                  content &&
                  content
                    .filter((_, i) => i < 4)
                    .map(item => <li key={item.id}>
                      <h3>
                        <Translate>
                            <English>{item.titleEnglish}</English>
                            <Swedish>{item.titleSwedish}</Swedish>
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
              <div className="text-center">
              <Link
                to={ lang === 'en' ? '/en/news' : '/nyheter' }
                className={cx('more-btn')}
              >
               <Translate>
                <English>More News »</English>
                <Swedish>Mer Nyheter »</Swedish>
                </Translate>
              </Link>
              </div>
            </div>
          }
        </Calypso>
        <Calypso type='event'>
          {content =>
            <div className={cx('col-md-4', 'news')}>
              <h2>
                <Translate>
                  <English>Event</English>
                  <Swedish>Event</Swedish>
                </Translate>
              </h2>
              <ul>
                {
                  (content && content.length)
                  ? content
                    .filter((_, i) => i < 5)
                    .map(item => <li key={item.id}>
                      <h3>
                        <Translate>
                          <English>{item.titleEnglish}</English>
                          <Swedish>{item.titleSwedish}</Swedish>
                        </Translate>
                      </h3>
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
                      &bull;
                      <span>
                        { item.publishAsDisplay || item.authorDisplay }
                      </span>
                    </li>)
                  : <h4 className={cx('empty')}>
                      <Translate>
                        <English>No upcoming events :(</English>
                        <Swedish>Inga kommande event :(</Swedish>
                      </Translate>
                    </h4>
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
