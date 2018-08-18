import React from 'react'
import { Redirect } from 'react-router-dom'

import fetch from 'cross-fetch'

import NotFound from './NotFound'
import { DataLoader } from './DataLoader'

const TAITAN_URL = process.env.TAITAN_URL || 'https://taitan.datasektionen.se'
//const TAITAN_URL = process.env.TAITAN_URL || 'http://localhost:1234'

const taitanFetcher = pathname => () =>
  fetch(TAITAN_URL + pathname)
    .then(res => {
      const redirected = !res.url.endsWith(pathname) // node-fetch doesnt have the res.redirected property
      if(redirected) {
        if(res.url.startsWith(TAITAN_URL)) {
          return { redirect: res.url.substr(TAITAN_URL.length) }
        } else {
          return { redirect: res.url }
        }
      } else if (res.ok) {
        return res.json()
      } else {
        return { status: res.status }
      }
    })
    .then(res => ({ status: 200, redirect: false, ...res }))
    .catch(err => {
      // Most likely we were redirected and the target did not allow cors-requests
      // Should not happen while SSR-ing, so is probably safe
      if(err.message === 'Failed to fetch'
        && window.confirm(`Redirect to "${TAITAN_URL + pathname}"?`))
        window.location.href = TAITAN_URL + pathname
    })

export const Taitan = ({ pathname, children }) =>
  <DataLoader
    cacheKey={'taitan' + pathname}
    fetcher={taitanFetcher(pathname)}
    ttl={60 * 60}
  >
    {({ data, loading }) => {
      if(!loading) {
        if(data.redirect)
          return <Redirect to={data.redirect} />
        else if (data.status !== 200)
          return <NotFound status={data.status} />
      }

      return children(data)
    }}
  </DataLoader>

export default Taitan
