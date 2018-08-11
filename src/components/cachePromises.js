import React from 'react'

export const CacheContext = React.createContext()

export function Provider({ cachePromises, children }) {
  return <CacheContext.Provider value={cachePromises || []}>
      { children }
    </CacheContext.Provider>
}

export function Consumer({ cachePromises, children }) {
  return <CacheContext.Consumer>
    {cachePromises => children(cachePromises)}
  </CacheContext.Consumer>
}

export function withConsumer(Child) {
  return props => <Consumer>
    { cachePromises => <Child {...props} cachePromises={cachePromises} /> }
  </Consumer>
}
