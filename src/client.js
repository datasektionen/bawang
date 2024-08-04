import React, { useState } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HeadProvider } from 'react-head'

import { App } from './components/App'
import { Provider } from './components/DataLoader'

function DataLoaderProvider({ children }) {
  const [error, setError] = useState()

  const promises = {
    push: promise => promise.catch(setError)
  }

  return <Provider value={{ promises, error }}>
    {children}
  </Provider>
}

const root = hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <DataLoaderProvider>
      <HeadProvider>
        <App />
      </HeadProvider>
    </DataLoaderProvider>
  </BrowserRouter>,
)

if (module.hot) {
  module.hot.accept()
}
