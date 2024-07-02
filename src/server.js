import React from 'react'
import { App } from './components/App'
import { StaticRouter } from 'react-router-dom/server'
import express from 'express'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { HeadProvider } from 'react-head'
import { ServerStyleSheet } from 'styled-components'

import { Provider } from './components/DataLoader'
import { FRONTEND_TAITAN_URL } from './utility/env'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

const handleData = async promises => {
  try {
    const data = await Promise.all(promises)
    const cacheObject = Object.assign(...data.map(d => ({[d.cacheKey]: d})))
    return [cacheObject]
  } catch(err) {
    return [{}, err]
  }
}

console.log('RAZZLE_PUBLIC_DIR', process.env.RAZZLE_PUBLIC_DIR)
console.log('RAZZLE_ASSETS_MANIFEST', process.env.RAZZLE_ASSETS_MANIFEST)

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/fuzzyfile', (req, res) => res.redirect(FRONTEND_TAITAN_URL + '/fuzzyfile'))
  .get('/*', async (req, res) => {
    const context = {}
    const promises = []
    const headTags = []
    const vdom = (error) =>
      <StaticRouter context={context} location={req.url}>
        <Provider value={{promises, error}}>
          <HeadProvider headTags={headTags}>
            <App />
          </HeadProvider>
        </Provider>
      </StaticRouter>

    // render the tree to trigger all promises
    try {
      renderToStaticMarkup(vdom())
    } catch(error) {
      console.error(error)
    }

    // wait for them to finish
    const [cacheObject, error] = await handleData(promises)

    // render the tree again with data
    const sheet = new ServerStyleSheet()
    const markup = renderToString(sheet.collectStyles(vdom(error)))

    if (context.url) {
      res.redirect(context.url)
    } else {
        res.status((error && error.code) || 200).send(
`<!doctype html>
  <html lang="${req.url.startsWith('/en') ? 'en' : 'sv'}">
  <head>
    <meta name="google-site-verification" content="tIS6TUU0SAJrplJvlVybZ4ATVZlOKAGswiLPLIBWUKs" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/icons/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#e83d84">
    <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png">
    <meta name="theme-color" content="#e83d84">
    <link rel="stylesheet" href="https://aurora.datasektionen.se/">
    ${assets.client.css
      ? `<link rel="stylesheet" href="${assets.client.css}">`
      : ''
    }
    ${sheet.getStyleTags()}
    ${process.env.NODE_ENV === 'production'
      ? `<script src="${assets.client.js}" defer></script>`
      : `<script src="${assets.client.js}" defer crossorigin></script>`
    }
    ${renderToString(headTags)}
    <script>
      // We can't send this as a plain string because sometimes the contents include script tags :) :) :)
      window.__cache__ = JSON.parse(decodeURIComponent("${encodeURIComponent(JSON.stringify(cacheObject))}"))
    </script>
  </head>
  <body>
    <div id="root">${markup}</div>
  </body>
</html>`)
    }
  })

export default server
