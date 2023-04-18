import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import './assets/scss/variables.scss';
import './assets/index.css';
import './assets/scss/Main.scss';
import MainWrapper from './MainWrapper';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render( // eslint-disable-line
  <MainWrapper>
    <AppRoutes />
  </MainWrapper>,
);
