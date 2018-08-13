import React from 'react'

export const CacheContext = React.createContext()
export const Provider = CacheContext.Provider
export const Consumer = CacheContext.Consumer

export function withConsumer(Child) {
  return props => <CacheContext.Consumer>
    { cachePromises => <Child {...props} cachePromises={cachePromises} /> }
  </CacheContext.Consumer>
}
