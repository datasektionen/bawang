import React, { useState } from 'react';

import { DataLoader } from './DataLoader';
import { CALYPSO_URL, FRONTEND_CALYPSO_URL } from '../utility/env';

const CALYPSO_CACHE_TTL = process.env.CALYPSO_CACHE_TTL ? parseInt(process.env.CALYPSO_CACHE_TTL, 10) : 30;

function calypsoFetcher(cacheKey) {
  // We're using the frontend url as the cache key when running on the backend as well, even though
  // we're not fetching using it, since the cache created by the backend is sent to the frontend.
  const url = cacheKey.startsWith(FRONTEND_CALYPSO_URL)
    ? cacheKey.replace(FRONTEND_CALYPSO_URL, CALYPSO_URL)
    : cacheKey;
  return fetch(url)
    .then(res => res.json())
    .catch(err => {
      console.error('Calypso error', err)
    });
}

function iso(date) {
  let str = date.toISOString();
  if (str.endsWith('Z')) {
    return str.slice(0, -1);
  }
  return str;
}

/**
 * Get the Calypso API URL to fetch from. If events are being fetched and a time
 * span is set, events in that time span will be fetched. Otherwise, all future
 * events will be returned.
 *
 * @param {'list' | 'event'} type The type of post to fetch.
 * @param {string} search Search part of the URL.
 * @param {[Date, Date] | null} timeSpan The time span, or null for all future events.
 */
function getCalypsoUrl(type, search, timeSpan) {
  if (!timeSpan || type !== 'event') {
    return `${FRONTEND_CALYPSO_URL}/${type || 'list'}${search || ''}`;
  }
  const [startDate, endDate] = timeSpan;
  const url = new URL(`${FRONTEND_CALYPSO_URL}/event/span`);
  url.searchParams.set('startDate', iso(startDate));
  url.searchParams.set('endDate', iso(endDate));
  return url.href;
}

export const Calypso = ({ type, search, children, defaultTimeSpan }) => {
  const [timeSpan, setTimeSpan] = useState(defaultTimeSpan);
  const cacheKey = getCalypsoUrl(type, search, timeSpan);

  return <DataLoader
    cacheKey={cacheKey}
    fetcher={calypsoFetcher}
    ttl={CALYPSO_CACHE_TTL}
  >
    {({ data, loading, time }) => {
      if (type === 'event') {
        return children({
          content: data,
          loading,
          time,
          onUpdateTimeSpan(span) {
            setTimeSpan(span);
          }
        });
      }
      return children(data);
    }}
  </DataLoader>;
};

export default Calypso;
