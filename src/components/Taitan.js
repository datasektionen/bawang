import React from 'react'
import { Redirect } from 'react-router-dom'
import { HTTPError } from '../HTTPError'

import fetch from 'cross-fetch'

import { DataLoader } from './DataLoader'
import { TAITAN_URL } from '../utility/env'

const TAITAN_CACHE_TTL = process.env.TAITAN_CACHE_TTL ? parseInt(process.env.TAITAN_CACHE_TTL, 10) : 60 * 60

const taitanFetcher = url =>
  fetch(url)
    .then(res => {
      const redirected = res.url !== url // node-fetch doesnt have the res.redirected property
      if (redirected) {
        if (res.url.startsWith(TAITAN_URL)) {
          return { redirect: res.url.substring(TAITAN_URL.length) }
        } else {
          return { redirect: res.url }
        }
      } else if (res.ok) {
        return res.json()
      } else {
        throw new HTTPError(res.status)
      }
    })
    .then(res => ({ status: 200, redirect: false, ...res }));

export const Taitan = ({ pathname, children }) =>
  <DataLoader
    cacheKey={TAITAN_URL + pathname}
    fetcher={taitanFetcher}
    ttl={TAITAN_CACHE_TTL}
  >
    {({ data, loading, error }) => {
      if (!loading && data && data.redirect)
        return <Redirect to={data.redirect} />

      return children(data, error)
    }}
  </DataLoader>

export default Taitan
