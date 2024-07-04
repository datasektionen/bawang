import React, { Fragment } from 'react'
import { Title } from 'react-head'
import { Link } from 'react-router-dom'

import { Translate, English, Swedish } from '../Translate'

export const ErrorPage = ({ error }) => (
  <Fragment>
    <Title>
      {error.code + ' - Konglig Datasektionen'}
    </Title>
    <header key="header">
      <div className="header-inner">
        <div className="row">
          <div className="header-left col-md-2">
            <Link to="/">
              {'« '}
              <Translate>
                <English>Back</English>
                <Swedish>Tillbaka</Swedish>
              </Translate>
            </Link>
          </div>
          <div className="col-md-8">
            <h2>{error.code} - {error.message}</h2>
          </div>
          <div className="header-right col-md-2"></div>
        </div>
        <div className="clear"></div>
      </div>
    </header>
    <div id="content" key="content">
      <div className="text-center" style={{ padding: '50px' }}>
        <Translate>
          <English>
            <h2>That didn't go to well...</h2>
            <br />
            <h4>Perhaps the URL is incorrect, or the content might have moved.</h4>
            <p>
              If you think this shouldn't happen you could create an issue on <a href="https://github.com/datasektionen/bawang">GitHub</a> or ask about it on our <a href="https://ior.slack.com">Slack</a>.
            </p>
          </English>
          <Swedish>
            <h2>Det här gick ju inte så bra...</h2>
            <br />
            <h4>Kanske stavade du fel i adressen, eller så har innehållet flyttat.</h4>
            <p>
              Om du tror att det här inte borde hända så kan du skapa ett issue på <a href="https://github.com/datasektionen/bawang">GitHub</a> eller ställa en fråga i <a href="https://ior.slack.com"> Slacken</a>.
            </p>
          </Swedish>
        </Translate>
      </div>
    </div>
  </Fragment>
);

export default ErrorPage
