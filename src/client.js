import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { HeadProvider } from 'react-head'

import App from './components/App'
import { Provider } from './components/DataLoader'

hydrate(
  <BrowserRouter>
    <Provider value={[]}>
      <HeadProvider>
        <App />
      </HeadProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
