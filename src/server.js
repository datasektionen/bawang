import App from './components/App';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import { renderToString, renderToNodeStream } from 'react-dom/server';
//import redis from 'redis';

import { Provider } from './components/fetcherContext';

const TAITAN_URL = process.env.TAITAN_URL || 'https://taitan.datasektionen.se';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

//const client = redis.createClient(process.env.REDIS_URL || 'redis://localhost')
const server = express();

server.get('/fuzzyfile', (req, res) => {
  res.redirect(TAITAN_URL + '/fuzzyfile');
});

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {};
    const promises = [];
    const vdom = <StaticRouter context={context} location={req.url}>
        <Provider fetcherContext={promises}>
          <App />
        </Provider>
      </StaticRouter>

    console.log('vdom', vdom)
    const data = await Promise.all(promises)
    console.log('data', data)

    const markup = renderToString(vdom)
    if (context.url) {
      res.redirect(context.url);
    } else {
      Promise.all(promises).then(() => {
        res.status(200).send(
          `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
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
</html>`);

      })
    }
  });

export default server;

const traverseData = (thing, props) => {
  const promises = [];
  if (typeof thing.loadData === 'function')
    promises.push(thing.loadData(props));

  if (thing.Child && typeof thing.Child.loadData === 'function')
    promises.push(traverseData(thing.Child, props));

  return Promise.all(promises).then(([one, child]) => ({...one, ...child}));
}
