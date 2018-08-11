import App from './components/App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

import { Provider } from './components/cachePromises'

const TAITAN_URL = process.env.TAITAN_URL || 'https://taitan.datasektionen.se'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

server.get('/fuzzyfile', (req, res) => {
  res.redirect(TAITAN_URL + '/fuzzyfile')
})

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {}
    const promises = []
    const vdom =
      <StaticRouter context={context} location={req.url}>
        <Provider cachePromises={promises}>
          <App />
        </Provider>
      </StaticRouter>

    console.log('promises', promises)
    const data = await Promise.all(promises)
    console.log('data', data, context, req.url)

    const markup = renderToString(vdom)
    if (context.url) {
      res.redirect(context.url)
    } else {
        res.status(200).send(
`<!doctype html>
  <html lang="">
  <head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    <title>Konglig Datasektionen</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${assets.client.css
      ? `<link rel="stylesheet" href="${assets.client.css}">`
      : ''}
    ${process.env.NODE_ENV === 'production'
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`}
  </head>
  <body>
    <div id="root">${markup}</div>
  </body>
</html>`)
    }
  })

export default server
