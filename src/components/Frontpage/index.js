import React, { Component } from 'react'
import classNames from 'classnames/bind'

import Taitan from '../Taitan'
import Calypso from '../Calypso'

import styles from './Frontpage.css'

const cx = classNames.bind(styles)

class Frontpage extends Component {
  render() {
    return <Taitan pathname={this.props.location.pathname}>
      {taitan =>
        <Calypso search={this.props.location.search}>
          {calypso =>
      <div className={styles.frontpage}>
      <header>
        <div className={styles.title}>
          <span className={cx('thin', 'left')}>
            Välkommen till
          </span>
          <span className={styles.bold}>
          Konglig
            <img src="/images/skold.svg" alt=" " />
          Datasektionen
          </span>
          <span className={cx('thin',  'right')}>
            Vid THS &bull; Sedan 1983
          </span>
        </div>
      </header>
      <div className={cx('content', 'flex')}>
        <div className={cx('col-md-4', 'intro')} dangerouslySetInnerHTML={{__html: taitan.body}}></div>
        <div className={cx('col-md-4', 'news')}>
          <h2>
            Nyheter
          </h2>
          <ul>
            {
              calypso.content &&
              calypso.content
                .filter(item => item.itemType === 'POST')
                .filter((_, i) => i < 5)
                .map(item => <li key={item.id}>
                  <h3>{ item.titleSwedish }</h3>
                  <span>
                    { new Date(item.publishDate)
                      .toLocaleDateString('sv-SE', {day: 'numeric', month: 'short', year: 'numeric'}) }
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
            Event
          </h2>
          <ul>
            {
              calypso.content &&
              calypso.content
                .filter(item => item.itemType === 'EVENT')
                .filter((_, i) => i < 5)
                .map(item => <li key={item.id}>
                  <h3>{ item.titleSwedish }</h3>
                  <span>
                    { new Date(item.eventStartTime)
                      .toLocaleDateString('sv-SE', {day: 'numeric', month: 'short', year: 'numeric'}) }
                  </span>
                  &bull;
                  <span>
                    { item.publishAsDisplay || item.authorDisplay }
                  </span>
                </li>)
            }
          </ul>
        </div>
      </div>
      <div className={cx('content')} dangerouslySetInnerHTML={{__html: this.props.sidebar}}></div>
    </div>
          }
      </Calypso>
      }
    </Taitan>
  }
}

export default Frontpage
