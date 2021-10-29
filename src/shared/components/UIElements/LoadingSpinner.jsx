import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Colors } from '../../styledComponent/variables';
import { setBorder } from '../../styledComponent/functions';

const LoadingSpinner = ({ asOverlay }) => {
  return (
    <Wrapper asOverlay={asOverlay}>
      <div className='lds-dual-ring'></div>
    </Wrapper>
  );
};

export default LoadingSpinner;

const loadingSpinnerOverlay = `
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 199;
  `;

const lds_dual_ring = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  ${(props) => props.asOverlay && loadingSpinnerOverlay}

  .lds-dual-ring {
    display: inline-block;
    width: 64px;
    height: 64px;
    z-index: 200;
    &:after {
      content: ' ';
      display: block;
      width: 46px;
      height: 46px;
      margin: 1px;
      border-radius: 50%;
      ${setBorder({ width: '5px', color: Colors.primary })}
      border-color: ${Colors.primary} transparent ${Colors.primary} transparent;
      animation: ${lds_dual_ring} 1.2s linear infinite;
    }
  }
`;
