import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './News.module.css'

import { Translate, English, Swedish } from '../Translate'
const cx = classNames.bind(styles)

export const NewsItem = ({ item, location, lang }) =>
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

export default NewsItem
