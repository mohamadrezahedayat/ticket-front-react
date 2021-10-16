import React from 'react';
import ReactDOM from 'react-dom';

import './sass/main.scss';
import App from './App';
import { GlobalStyle } from './GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.querySelector('#root')
);
