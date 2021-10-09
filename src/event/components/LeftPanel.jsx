import React, { useContext, useEffect, useRef, useState } from 'react';

import ZoneV2 from './ZoneV2';
import Div from '../../shared/styledComponent/Div';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import { Colors } from '../../shared/styledComponent/functions';
import styled from 'styled-components';

const LeftPanel = ({ date, columnMax, width }) => {
  const seatsWrapper = useRef();

  const [unit, setunit] = useState();
  const [zoomedUnit, setzoomedUnit] = useState(unit);
  const [offsetX, setoffsetX] = useState();
  const [seatWrapperWidth, setseatWrapperWidth] = useState();

  const { seatsState, setclicked } = useContext(manageSeatsContext);

  useEffect(() => {
    setseatWrapperWidth(seatsWrapper.current.clientWidth);
  }, [width]);

  // calculate unit
  useEffect(() => {
    if (!columnMax || !seatWrapperWidth) return;
    const unit = Math.round((seatWrapperWidth - 40) / columnMax) / 10;
    setunit(unit);
    setzoomedUnit(unit);
    setoffsetX((seatWrapperWidth - unit * columnMax * 10) / 20);
  }, [seatWrapperWidth, columnMax]);

  return (
    <Div
      column
      boxShadow
      ref={seatsWrapper}
      overflow='auto'
      borderRadius='3rem'
      bgcolor={`${Colors.white}5`}
      margin='3rem 1.5rem 3rem 3rem'
      flexSelf={{ flex: '7', alignSelf: 'stretch' }}
      onClick={() => setclicked(true)}
    >
      {/* main header */}
      <Div
        rowStart
        width='100%'
        height='5rem'
        bgcolor={`${Colors.primaryDark}c0`}
        bgcolor__hover={`${Colors.primaryDark}ff`}
      >
        {/* zoom icons */}
        <SvgWrapper>
          {/* ZoomIn Icon*/}
          <svg
            cursor='zoom-in'
            id='icon-zoom-in'
            viewBox='0 0 32 32'
            width='25px'
            height='25px'
            onClick={() => setzoomedUnit(1.1 * zoomedUnit)}
          >
            <path d='M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM14 6h-4v4h-4v4h4v4h4v-4h4v-4h-4z'></path>
          </svg>
          {/* ZoomOut Icon */}
          <svg
            width='25px'
            height='25px'
            cursor='zoom-out'
            id='icon-zoom-out'
            viewBox='0 0 32 32'
            onClick={() => setzoomedUnit(0.9 * zoomedUnit)}
          >
            <path d='M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM6 10h12v4h-12z'></path>
          </svg>
          {/* reser zoom */}
          <svg
            width='25px'
            height='25px'
            id='icon-cycle'
            viewBox='0 0 20 20'
            cursor='pointer'
            onClick={() => setzoomedUnit(unit)}
          >
            <path d='M5.516 14.224c-2.262-2.432-2.222-6.244 0.128-8.611 0.962-0.969 2.164-1.547 3.414-1.736l-0.069-2.077c-1.755 0.213-3.452 0.996-4.797 2.351-3.149 3.17-3.187 8.289-0.123 11.531l-1.741 1.752 5.51 0.301-0.015-5.834-2.307 2.323zM12.163 2.265l0.015 5.834 2.307-2.322c2.262 2.434 2.222 6.246-0.128 8.611-0.961 0.969-2.164 1.547-3.414 1.736l0.069 2.076c1.755-0.213 3.452-0.996 4.798-2.35 3.148-3.172 3.186-8.291 0.122-11.531l1.741-1.754-5.51-0.3z'></path>
          </svg>
        </SvgWrapper>
        {/* scene icon */}
        <Div
          width='60%'
          height='1rem'
          absPosition={{ x: 'top,30%', y: 'left,50%' }}
          bgcolor={Colors.white}
          transform='translateX(-50%)'
          borderRadius='100% 100% 0 0 '
        />
      </Div>
      <Div width='100%' height='100%' overflow='auto'>
        {seatsState.map((zone) => (
          <ZoneV2
            unit={zoomedUnit}
            zone={zone}
            offsetY={10}
            key={zone._id}
            offsetX={offsetX}
            date={date}
          />
        ))}
      </Div>
    </Div>
  );
};

export default LeftPanel;

const SvgWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 2.5rem;
  & svg {
    margin-right: 0.8rem;
    &:hover {
      filter: brightness(1.4);
      box-shadow: 2px 4px 7px 1px rgb(0 0 0 / 80%);
    }
  }
  #icon-zoom-in {
    fill: green;
  }
  #icon-zoom-out {
    fill: tomato;
  }
  #icon-cycle {
    fill: gold;
  }
`;
