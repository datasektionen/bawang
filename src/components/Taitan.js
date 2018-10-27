import React from 'react'
import { Redirect } from 'react-router-dom'

import fetch from 'cross-fetch'

import { DataLoader } from './DataLoader'

const RAZZLE_TAITAN_URL = process.env.RAZZLE_TAITAN_URL || 'https://taitan.datasektionen.se'

const taitanFetcher = url =>
  fetch(url)
    .then(res => {
      const redirected = res.url !== url // node-fetch doesnt have the res.redirected property
      if(redirected) {
        if(res.url.startsWith(RAZZLE_TAITAN_URL)) {
          return { redirect: res.url.substr(RAZZLE_TAITAN_URL.length) }
        } else {
          return { redirect: res.url }
        }
      } else if (res.ok) {
        return res.json()
      } else {
        throw new Error(`HTTP error ${res.status}`)
      }
    })
    .then(res => ({ status: 200, redirect: false, ...res }))

export const Taitan = ({ pathname, children, ttl }) =>
  <DataLoader
    cacheKey={RAZZLE_TAITAN_URL + pathname}
    fetcher={taitanFetcher}
    ttl={ttl || 60 * 60}
  >
    {({ data, loading, error }) => {
      if (!loading && data && data.redirect)
        return <Redirect to={data.redirect} />

      return children(data, error)
    }}
  </DataLoader>

export default Taitan
