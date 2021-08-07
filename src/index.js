import React from 'react';
import ReactDOM from 'react-dom';
import Artists from './layouts/Artists';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar';
import Shows from './layouts/Shows';
import './sass/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <Sidebar />
    <Header />
    <Artists />
    <Shows />
  </React.StrictMode>,
  document.querySelector('.container')
);
