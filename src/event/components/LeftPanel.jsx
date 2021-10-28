import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ZoneV2 from './ZoneV2';
import Div from '../../shared/styledComponent/Div';
import {
  Arrow,
  Reset,
  ZoomIn,
  ZoomOut,
} from '../../shared/components/UIElements/Svgs';
import { Colors } from '../../shared/styledComponent/variables';
import { Screen } from '../../shared/styledComponent/mediaQueries';
import { setBackgroundColor } from '../../shared/styledComponent/functions';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';

const LeftPanel = ({ date, columnMax, rowMax, width, className }) => {
  const seatsWrapper = useRef();

  const [unit, setunit] = useState();
  const [offsetX, setoffsetX] = useState();
  const [offsetY, setoffsetY] = useState(30);
  const [zoomedUnit, setzoomedUnit] = useState(unit);
  const [seatWrapperWidth, setseatWrapperWidth] = useState();

  const { seatsState, setclicked } = useContext(manageSeatsContext);

  // first width of left panel window
  useEffect(() => {
    setseatWrapperWidth(seatsWrapper.current.clientWidth);
  }, [width]);

  // calculate unit by px
  useEffect(() => {
    if (!columnMax || !seatWrapperWidth) return;
    const padding = 20;

    const unit = Math.round((seatWrapperWidth - padding * 2) / columnMax);

    setunit(unit);
    setzoomedUnit(unit);

    setoffsetX((seatWrapperWidth - unit * columnMax) / 2);
  }, [seatWrapperWidth, columnMax, rowMax]);

  const onResetHandler = () => {
    setzoomedUnit(unit);
    setoffsetY(unit);
    setoffsetX((seatWrapperWidth - unit * columnMax) / 2);
  };

  return (
    <Div
      className={className}
      ref={seatsWrapper}
      onClick={() => setclicked(true)}
    >
      <Header>
        <div className='left-icons'>
          <ZoomIn
            className='svg zoom '
            onZoomIn={() => setzoomedUnit(Math.round(1.1 * zoomedUnit))}
          />
          <ZoomOut
            className='svg zoom'
            onZoomOut={() =>
              setzoomedUnit(Math.max(Math.round(0.9 * zoomedUnit), 15))
            }
          />
          <Reset className='svg zoom' onReset={onResetHandler} />
        </div>
        <div className='scene' />
        <div className='right-icons'>
          <Arrow
            className='right svg'
            onClick={() => setoffsetX(offsetX + zoomedUnit)}
          />
          <Arrow
            className='left svg'
            onClick={() => setoffsetX(offsetX - zoomedUnit)}
          />
          <Arrow
            className='up svg'
            onClick={() => setoffsetY(offsetY - zoomedUnit)}
          />
          <Arrow
            className='down svg'
            onClick={() => setoffsetY(offsetY + zoomedUnit)}
          />
        </div>
      </Header>
      {/* seats area */}
      <Div width='100%' height='100%'>
        {seatsState.map((zone) => (
          <ZoneV2
            key={zone._id}
            zone={zone}
            unit={zoomedUnit}
            offsetY={offsetY}
            offsetX={offsetX}
            date={date}
          />
        ))}
      </Div>
    </Div>
  );
};

export default LeftPanel;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  column-gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  width: 100%;
  height: 5rem;
  z-index: 2;
  ${setBackgroundColor(`${Colors.primaryDark}c0`)}
  &:hover {
    ${setBackgroundColor(`${Colors.primaryDark}ff`)}
  }

  & svg {
    width: 2.5rem;
    height: 2.5rem;
    ${Screen.tabletPortrait`transform:scale(80%)`}
    &:hover {
      filter: brightness(1.4);
      box-shadow: 2px 4px 7px 1px rgb(0 0 0 / 80%);
    }
  }
  & .svg.zoom {
    width: 2.8rem;
    height: 2.8rem;
  }
  & .left-icons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;

    #icon-zoom-in {
      fill: green;
    }
    #icon-zoom-out {
      fill: tomato;
    }
    #icon-cycle {
      fill: gold;
    }
  }

  & .scene {
    width: 100%;
    height: 1rem;
    ${setBackgroundColor(Colors.white)}
    border-radius: 100% 100% 0 0;
  }

  & .right-icons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    fill: ${Colors.white};

    & .right {
      transform: rotate(90deg);
      ${Screen.tabletPortrait`transform:scale(80%) rotate(90deg);`}
    }
    & .left {
      transform: rotate(-90deg);
      ${Screen.tabletPortrait` transform:scale(80%) rotate(-90deg);`}
    }
    & .up {
    }
    & .down {
      transform: rotate(180deg);
      ${Screen.tabletPortrait` transform:scale(80%) rotate(180deg);`}
    }
  }
`;
