import React from 'react';
import { hydrate } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import App from './components/App';
import { Provider } from './components/fetcherContext';

hydrate(
  <BrowserRouter>
  	<Provider>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
