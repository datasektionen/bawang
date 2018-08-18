import React from 'react'
import fetch from 'cross-fetch'

import { DataLoader } from './DataLoader'

const CALYPSO_URL = process.env.CALYPSO_URL || 'https://calypso.datasektionen.se/api/list'

const calypsoFetcher = search => () =>
  fetch(CALYPSO_URL + search)
    .then(res => res.json())
    .catch(err => {
      console.error('Calypso error', err)
    })

export const Calypso = ({ search, children }) =>
  <DataLoader
    cacheKey={'calypso' + search}
    fetcher={calypsoFetcher(search)}
  >
    {({ data, loading, time }) => children(data) }
  </DataLoader>

export default Calypso
