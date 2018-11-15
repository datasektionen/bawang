import React from 'react'
import fetch from 'cross-fetch'

import { DataLoader } from './DataLoader'

const RAZZLE_CALYPSO_URL = process.env.RAZZLE_CALYPSO_URL || 'https://calypso.datasektionen.se/api'

const calypsoFetcher = url =>
  fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.error('Calypso error', err)
    })

export const Calypso = ({ type, search, children, ttl }) =>
  <DataLoader
    cacheKey={`${RAZZLE_CALYPSO_URL}/${type || 'list'}${search || ''}`}
    fetcher={calypsoFetcher}
    ttl={ ttl || 30 }
  >
    {({ data, loading, time }) => children(data) }
  </DataLoader>

export default Calypso
