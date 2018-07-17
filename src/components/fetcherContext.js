import React from 'react'

const Context = React.createContext()

export function Provider({ fetcherContext, children }) {
  return <Context.Provider value={fetcherContext || []}>
      { children }
    </Context.Provider>
}

export function Consumer({ fetcherContext, children }) {
  return <Context.Consumer>
    {fetcherContext => children(fetcherContext)}
  </Context.Consumer>
}

export function withConsumer(Child) {
  return props => <Consumer>
    { fetcherContext => <Child {...props} fetcherContext={fetcherContext} /> }
  </Consumer>
}
