import React from 'react';
import styled from 'styled-components';

import Artists from '../components/Artists';
import Header from '../components/Header';
import Shows from '../components/Shows';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import Footer from '../../shared/styledComponent/Footer';
import { Screen } from '../../shared/styledComponent/mediaQueries';
const Home = ({ className }) => {
  return (
    <HomeWrapper>
      <Sidebar />
      <Header />
      <Artists />
      <Shows />
      <Footer />
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  display: grid;
  grid-template-rows: 80vh repeat(5, min-content);
  grid-template-columns:
    [sidebar-start] 8rem [sidebar-end full-start] 1fr [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] 1fr [full-end];

  ${Screen.phone`
    grid-template-rows: 8rem calc(100vh - 8rem) repeat(5, min-content);
    grid-template-columns: [full-start] 1fr [center-start] repeat(
      4,
      [col-start] minmax(min-content, 8rem) [col-end]
    )
    [center-end] 1fr [full-end];;
  `}
`;
