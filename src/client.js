import React, { useState } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { HeadProvider } from 'react-head'

import App from './components/App'
import { Provider } from './components/DataLoader'

function DataLoaderProvider({ children }) {
  const [ error, setError ] = useState()

  const promises = {
    push: promise => promise.catch(setError)
  }

  return <Provider value={{ promises, error }}>
      {children}
    </Provider>
}

hydrate(
  <BrowserRouter>
    <DataLoaderProvider>
      <HeadProvider>
        <App />
      </HeadProvider>
    </DataLoaderProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
