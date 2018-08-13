import React from 'react'
import { hydrate } from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import App from './components/App'
import { Provider } from './components/cachePromises'

hydrate(
  <BrowserRouter>
    <Provider value={[]}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
