import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Title } from 'react-head'
import classNames from 'classnames/bind'

import Taitan from '../Taitan'
import Calypso from '../Calypso'
import { Translate, English, Swedish } from '../Translate'

import styles from './Frontpage.module.css'
import skold from './skold.svg'
import EventCalendar, { getWeekTimeSpan } from '../EventCalendar/index.jsx';
import './FixMe.css'

const cx = classNames.bind(styles)

const Frontpage = ({ location, lang }) =>
  <Taitan pathname={location.pathname} lang={lang}>
    {({ title, body, sidebar }) =>
      /*
      A "Fragment" groups multiple components in a place where only one component is expected.
      You can do <Fragment> ...components </Fragment>.
      A useful shorthand you might've seen is <> ...components </>.
      */
      <Fragment>
        <Title>{title}</Title>

        {/* HOME PAGE HEADER/TITLE */}
        <header className={styles.header}>
          <div className={styles.title}>
            {/* Small super heading */}
            <span className={cx('thin', 'left')}>
              <Translate>
                <English>Welcome to</English>
                <Swedish>Välkommen till</Swedish>
              </Translate>
            </span>
            {/* MAIN TITLE */}
            <span className={styles.bold}>
              Konglig
              <img src={skold} alt=" " />
              Datasektionen
            </span>
            {/* Small sub heading */}
            <span className={cx('thin', 'right')}>
              <Translate>
                <English>Chapter of THS &bull; Since 1983</English>
                <Swedish>Vid THS &bull; Sedan 1983</Swedish>
              </Translate>
            </span>
          </div>
        </header>

        {/* Datasektionen description, News & Events */}
        <div className={cx('content', 'flex', 'hero')}>
          {/* Datasektionen description (text from `body` parameter) */}
          <div className={cx('intro')} dangerouslySetInnerHTML={{ __html: body }} />

          {/* News section */}
          <Calypso type='list' search='?itemType=POST'>
          {/* Given content from Calypso, populate the section with news information */}
          {({ content }) => (
            <div className={cx('news')}>
              {/* Title */}
              <Link to={lang === 'en' ? '/en/news?itemType=POST' : '/nyheter?itemType=POST'}>
                <h2>
                  <Translate>
                    <English>News</English>
                    <Swedish>Nyheter</Swedish>
                  </Translate>
                </h2>
              </Link>

              {/* List of news */}
              <ul>
              {content && content.filter((_, i) => i < 4).map(item => (
                /* Single news item*/
                <li key={item.id}>
                  {/* News item title */}
                  <Link to={lang === 'en' ? `/en/news/${item.id}` : `/nyheter/${item.id}`}>
                    <h3>
                      <Translate>
                        <English>{item.titleEnglish}</English>
                        <Swedish>{item.titleSwedish}</Swedish>
                      </Translate>
                    </h3>
                  </Link>

                  {/* Additional info: date and author */}
                  <div>
                    {/* Date */}
                    <span>
                      {new Date(item.publishDate).toLocaleDateString(
                        lang === 'en' ? 'en-US' : 'sv-SE',
                        {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }
                      )}
                    </span>
                    &bull;
                    {/* Author */}
                    <span>{item.publishAsDisplay || item.authorDisplay}</span>
                  </div>
                </li>
                )
              )}
              </ul>

              {/* "More News" button at the bottom of the news section */}
              <div className="text-center">
                <Link
                  to={lang === 'en' ? '/en/news?itemType=POST' : '/nyheter?itemType=POST'}
                  className={cx('more-btn')}
                >
                  <Translate>
                    <English>More News »</English>
                    <Swedish>Mer Nyheter »</Swedish>
                  </Translate>
                </Link>
              </div>
            </div>
          )}
          </Calypso>

          {/* Events section */}
          <Calypso type='event'>
          {/* Given content from Calypso, populate the section with events information */}
          {({content}) => (
            <div className={cx('news')}>
              {/* Title */}
              <Link to={lang === 'en' ? '/en/news?itemType=EVENT' : '/nyheter?itemType=EVENT'}>
                <h2>
                  {/* TODO: does this really need a "Translate" component? */}
                  <Translate>
                    <English>Event</English>
                    <Swedish>Event</Swedish>
                  </Translate>
                </h2>
              </Link>

              {/* List of events */}
              <ul>
              {(content && content.length)
              /* If there's content, display it as a list of event items */
              // TODO: All of this is just a duplication of the news list. Abstracting into a new component would be nice.
              ? content.filter((_, i) => i < 4).map(item => (
                /* Single event item */
                <li key={item.id}>
                  {/* Event title */}
                  <Link to={lang === 'en' ? `/en/news/${item.id}` : `/nyheter/${item.id}`}>
                    <h3>
                      <Translate>
                        <English>{item.titleEnglish}</English>
                        <Swedish>{item.titleSwedish}</Swedish>
                      </Translate>
                    </h3>
                  </Link>

                  {/* Additional info: date and author */}
                  <div>
                    {/* Date */}
                    <span>
                      {new Date(item.eventStartTime).toLocaleDateString(
                        lang === 'en' ? 'en-US' : 'sv-SE',
                        {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        }
                      )}
                    </span>
                    &bull;
                    {/* Author */}
                    <span>
                      {item.publishAsDisplay || item.authorDisplay}
                    </span>
                  </div>
                </li>))

              /* Otherwise (no content)... */
              // TODO: is it semantically correct for this to be inside a list?
              : <h4 className={cx('empty')}>
                  <Translate>
                    <English>No upcoming events :(</English>
                    <Swedish>Inga kommande event :(</Swedish>
                  </Translate>
                </h4>
              }
              </ul>

              {
              /* If there's ENOUGH content, show "More events" button */
              content.length > 4 &&
              <div className="text-center">
                <Link to={lang === 'en' ? '/en/news?itemType=EVENT' : '/nyheter?itemType=EVENT'} className={cx('more-btn')}>
                  <Translate>
                    <English>More Events »</English>
                    <Swedish>Mer Event »</Swedish>
                  </Translate>
                </Link>
              </div>
              }
            </div>
          )}
          </Calypso>
        </div>

        {/* Section only in English for International Students */}
        <div className={cx('content')} >
          <h2 id="sections_intro">Are you an international student?</h2>
          <div className="text-center" id="home_sections">
            <p>
              Read this website in <a href="/en" className="inline_link">English</a>, or go to the website for META internationals and discover everything you need to know as an international student in the CS Chapter.
            </p>
            <p>
              <a className="action" href="https://meta-internationals.mailchimpsites.com/">META Internationals website</a>
            </p>
          </div>
        </div>

        {/* "This is Datasektionen" section */}
        <div className={cx('content')} >
          {/* Title */}
          <h2 id="sections_intro">
            <Translate>
              <Swedish>Det här är&nbsp;</Swedish>
              <English>This is&nbsp;</English>
            </Translate>
            <span>Datasektionen</span>
          </h2>
          
          {/* Studies, Social & Business sections, condensed in a loop */}
          <div id="home_sections">
            {sidebar && sidebar.split('<hr>').map(__html =>
              <div className="col-md-4 home_section" key={__html}>
                <div className="home_section_icon">
                  <i className="fa" />
                </div>
                <div dangerouslySetInnerHTML={{ __html }} />
              </div>
            )}
          </div>
        </div>

        {/* Calendar section*/}
        <div className={cx('content')} >
          {/* Title - &#8203; is zero-width space character, useful for line breaking */}
          <h2 id="sections_intro">
            <Translate>
              <Swedish>Evenemangs&shy;kalender</Swedish>
              <English>Event Calendar</English>
            </Translate>
          </h2>

          {/* Calendar */}
          <Calypso type='event' defaultTimeSpan={getWeekTimeSpan(new Date())}>
          {/* Given content from Calypso, populate the section with events information */}
          {({content, loading, onUpdateTimeSpan}) =>
            <EventCalendar
              events={loading ? [] : content}
              location={location}
              lang={lang}
              onUpdateTimeSpan={onUpdateTimeSpan}
            />
          }
          </Calypso>
        </div>

        {/* Footer: contact section (address, number and META location in Google Maps) */}
        <div id="footer" className="row">
          {/* Address and number section, with final contact button (dark box) */}
          <div className="col-sm-6 col-md-3" id="contact">
            <Translate>
              <Swedish>
                <p>&nbsp;</p>
                <p><strong>Adress</strong></p>
                <p>
                  Konglig Datasektionen<br />
                  Fack vid THS<br />
                  100 44 Stockholm
                </p>

                <p><strong>Organisationsnummer</strong></p>
                <p>802412 - 7709</p>

                <p><a className="action" href="/kontakt">Kontakt</a></p>
              </Swedish>
              <English>
                <p>&nbsp;</p>
                <p><strong>Address</strong></p>
                {/*
                Comment for international students: this is not meant to be translated!
                "Fack vid" is a postal term with a meaning similar to "Mail to" or "Care of"
                */}
                <p>
                  Konglig Datasektionen<br />
                  Fack vid THS<br />
                  100 44 Stockholm
                </p>

                <p><strong>Organization number</strong></p>
                <p>802412 - 7709</p>

                <p><a className="action" href="/kontakt">Contact</a></p>
              </English>
            </Translate>
          </div>

          {/* META Location in Google Maps */}
          <div className="col-sm-6 col-md-9" id="map">
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.0958020405822!2d18.069220116002757!3d59.348048616563695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d6a99ea1e8d%3A0x8637b28fa239bfcb!2sOsquars+backe+21%2C+114+28+Stockholm!5e0!3m2!1sen!2sse!4v1463425310266" width="100%" height="300" frameBorder="0" style={{ border: 0 }} allowFullScreen></iframe>
          </div>
        </div>
      </Fragment>
    }
  </Taitan>

export default Frontpage
