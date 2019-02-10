import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'react-head'
import classNames from 'classnames/bind'
import styles from './News.module.css'

import Calypso from '../Calypso'
import { Translate, English, Swedish } from '../Translate'

const cx = classNames.bind(styles)

export const SingleItem = ({ item, location, lang, match }) =>
<Calypso type='item' search={'/' + match.params.postId}>
  {(item) =>
    <Fragment>
      <Title>
          <Translate>
            <English>{ `${item.titleEnglish} - Kongling Datasektionen` }</English>
            <Swedish>{ `${item.titleSwedish} - Kongling Datasektionen` }</Swedish>
          </Translate>
        </Title>
        <header key="header">
          <div className="header-inner">
            <div className="row">
              <div className="header-left col-md-2">
                <Translate>
                  <English>
                    <Link to="/en/news">{'« '}Back</Link>
                  </English>
                  <Swedish>
                    <Link to="/nyheter">{'« '}Tillbaka</Link>
                  </Swedish>
                </Translate>
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
        <div id='content'>
          <div key={item.id} className={cx('notice', 'ultra_light', 'col-md-9')}>
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
              <h1>
                <Translate>
                  <English>{item.titleEnglish}</English>
                  <Swedish>{item.titleSwedish}</Swedish>
                </Translate>
              </h1>
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
          {item.itemType === "EVENT" &&
            <div className="col-md-3" id="sidebar">
              <div className="sidebar-card">
                <h2>
                  <Translate>
                    <English>Event Details</English>
                    <Swedish>Eventinformation</Swedish>
                  </Translate>
                </h2>
                <p>
                  <b>
                    <Translate>
                      <English>Location</English>
                      <Swedish>Plats</Swedish>
                    </Translate>
                  </b>
                  <br />
                  {item.eventLocation}
                </p>
                <p>
                  <b>
                    <Translate>
                      <English>Start Time</English>
                      <Swedish>Starttid</Swedish>
                    </Translate>
                  </b>
                  <br />
                  {new Date(item.eventStartTime)
                      .toLocaleDateString(
                        lang === 'en' ? 'en-US' : 'sv-SE',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        }
                      )}
                </p>
                <p>
                  <b>
                    <Translate>
                      <English>End Time</English>
                      <Swedish>Sluttid</Swedish>
                    </Translate>
                  </b>
                  <br />
                  {new Date(item.eventEndTime)
                      .toLocaleDateString(
                        lang === 'en' ? 'en-US' : 'sv-SE',
                        {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric'
                        }
                      )}
                </p>
              </div>
            </div>
          }
      </div>
    </Fragment>
  }
</Calypso>

export default SingleItem
