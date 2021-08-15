import React from 'react';
import Artists from '../components/Artists';
import Header from '../components/Header';
import Shows from '../components/Shows';
import Sidebar from '../../shared/components/UIElements/Sidebar';

const Home = () => {
  return (
    <div className='home-page-container'>
      <Sidebar />
      <Header />
      <Artists />
      <Shows />
    </div>
  );
};

export default Home;
