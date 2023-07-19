import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'react-head'
import classNames from 'classnames/bind'

import Taitan from '../Taitan'
import Calypso from '../Calypso'
import { Translate, English, Swedish } from '../Translate'

import styles from './Frontpage.module.css'
import skold from './skold.svg'
import './FixMe.css'

const cx = classNames.bind(styles)

const Frontpage = ({ location, lang }) =>
<Taitan pathname={location.pathname}>
  {({ title, body, sidebar }) =>
    <Fragment>
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
          className={cx('intro')}
          dangerouslySetInnerHTML={{__html: body}}
        />
        <Calypso type='list' search='?itemType=POST'>
          {({ content }) =>
            <div className={cx('news')}>
              <Link
                to={ lang === 'en' ? '/en/news?itemType=POST' : '/nyheter?itemType=POST' }
              >
                <h2>
                  <Translate>
                    <English>News</English>
                    <Swedish>Nyheter</Swedish>
                  </Translate>
                </h2>
              </Link>
              <ul>
                {
                  content &&
                  content
                    .filter((_, i) => i < 4)
                    .map(item => <li key={item.id}>
                      <Link
                          to={ lang === 'en' ? `/en/news/${item.id}` : `/nyheter/${item.id}` }
                      >
                        <h3>
                          <Translate>
                            <English>{item.titleEnglish}</English>
                            <Swedish>{item.titleSwedish}</Swedish>
                          </Translate>
                        </h3>
                      </Link>
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
            <div className={cx('news')}>
              <Link
                to={ lang === 'en' ? '/en/news?itemType=EVENT' : '/nyheter?itemType=EVENT' }
              >
                <h2>
                  <Translate>
                    <English>Event</English>
                    <Swedish>Event</Swedish>
                  </Translate>
                </h2>
              </Link>
              <ul>
                {
                  (content && content.length)
                  ? content
                    .filter((_, i) => i < 4)
                    .map(item => <li key={item.id}>
                      <Link
                          to={ lang === 'en' ? `/en/news/${item.id}` : `/nyheter/${item.id}` }
                      >
                        <h3>
                          <Translate>
                            <English>{item.titleEnglish}</English>
                            <Swedish>{item.titleSwedish}</Swedish>
                          </Translate>
                        </h3>
                      </Link>
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
              {
                content.length > 4 &&
                <div className="text-center">
                  <Link
                    to={ lang === 'en' ? '/en/news?itemType=EVENT' : '/nyheter?itemType=EVENT' }
                    className={cx('more-btn')}
                  >
                    <Translate>
                      <English>More Events »</English>
                      <Swedish>Mer Event »</Swedish>
                    </Translate>
                  </Link>
                </div>
              }
            </div>
          }
        </Calypso>
      </div>
      <div className={cx('content')} >
        <h2 id="sections_intro">Are you an international student?</h2>
        <div className="text-center" id="home_sections">
          Discover everything you need to know as an international student in the CS Chapter on the website for META internationals.
          <a className="action" href="https://meta-internationals.mailchimpsites.com/">META Internationals website</a>
          <a className="action" href="/en">Read this website in english</a>
        </div>
      </div>
      <div className={cx('content')} >
        <h2 id="sections_intro">
          <Translate>
            <Swedish>Det här är&nbsp;</Swedish>
            <English>This is&nbsp;</English>
          </Translate>
          <span>Datasektionen</span>
        </h2>
        <div id="home_sections">
          {sidebar && sidebar.split('<hr>').map(__html =>
            <div className="col-md-4 home_section" key={__html}>
              <div className="home_section_icon">
                <i className="fa" />
              </div>
              <div dangerouslySetInnerHTML={{__html}} />
            </div>
          )}
        </div>
      </div>
      <div id="footer" className="row">
        <div className="col-sm-6 col-md-3" id="contact">
            <Translate>
              <Swedish>
                <p>&nbsp;</p>
                <p>
                    <strong>Adress</strong>
                </p>
                <p>
                    Konglig Datasektionen<br />
                    Fack vid THS<br />
                    100 44 Stockholm
                </p>
                <p>
                    <strong>Organisationsnummer</strong>
                </p>
                <p>802412 - 7709</p>
                <p>
                    <a className="action" href="/kontakt">Kontakt</a>
                </p>
              </Swedish>
              <English>
              <p>&nbsp;</p>
                <p>
                    <strong>Address</strong>
                </p>
                <p>
                    Konglig Datasektionen<br />
                    Fack vid THS<br />
                    100 44 Stockholm
                </p>
                <p>
                    <strong>Organization number</strong>
                </p>
                <p>802412 - 7709</p>
                <p>
                  <a className="action" href="/kontakt">Contact</a>
                </p>
              </English>
            </Translate>
        </div>
        <div className="col-sm-6 col-md-9" id="map">
          <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.0958020405822!2d18.069220116002757!3d59.348048616563695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d6a99ea1e8d%3A0x8637b28fa239bfcb!2sOsquars+backe+21%2C+114+28+Stockholm!5e0!3m2!1sen!2sse!4v1463425310266" width="100%" height="300" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
        </div>
      </div>

    </Fragment>
  }
</Taitan>

export default Frontpage
