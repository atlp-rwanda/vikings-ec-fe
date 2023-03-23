import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import AppRoutes from './routes/AppRoutes';
import './assets/scss/variables.scss';
import './assets/index.css';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render( // eslint-disable-line
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>,
);
