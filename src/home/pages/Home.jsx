import React from 'react';
import styled from 'styled-components';

import Artists from '../components/Artists';
import Header from '../components/Header';
import Shows from '../components/Shows';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import Footer from '../../shared/styledComponent/Footer';
const Home = ({ className }) => {
  return (
    <div className={className}>
      <Sidebar />
      <Header />
      <Artists />
      <Shows />
      <Footer />
    </div>
  );
};

export default styled(Home)`
  display: grid;
  grid-template-rows: 80vh repeat(5, min-content);
  grid-template-columns:
    [sidebar-start] 8rem [sidebar-end full-start] 1fr [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] 1fr [full-end];
`;
