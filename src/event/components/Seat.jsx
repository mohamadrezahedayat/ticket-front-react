import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import {
  setAbsPos,
  setBoxShadow,
} from '../../shared/styledComponent/functions';
import { Colors } from '../../shared/styledComponent/variables';
const Seat = ({ unit, seat }) => {
  const {
    addSeat,
    removeSeat,
    configMode,
    tooltipMode,
    selectByZone,
    selectedSeats,
  } = useContext(manageSeatsContext);
  const [selected, setselected] = useState(false);
  const [fillcolor, setfillcolor] = useState('#373737');

  const calcRgb = (price) => {
    if (price * 1 === 0) return `rgb(0,0,0)`;
    if (price * 1 < 256) return `rgb(0,0,${price})`;
    if (price * 1 < 512) return `rgb(0,${price % 255},0)`;
    if (price * 1 < 768) return `rgb(${price % 255},0,0)`;
    if (price * 1 < 1024) return `rgb(${price % 255},255,0)`;
    if (price * 1 < 1280) return `rgb(${price % 255},0,255)`;
    if (price * 1 < 1536) return `rgb(255,${price % 255},255)`;
    if (price * 1 > 1790) return `rgb(255,50,50)`;
  };
  // to change color if status changed
  useEffect(() => {
    if (selected && !selectByZone) {
      setfillcolor('#37c2c2');
    } else if (configMode) {
      if (seat.status === 'free') setfillcolor('#373737');
      if (seat.status === 'sold') setfillcolor('#1b2b17');
      if (seat.status === 'inactive') setfillcolor('#6a666e');
      if (seat.status === 'reserved') setfillcolor('#a56789');
    } else {
      seat.status !== 'inactive'
        ? setfillcolor(calcRgb(seat.price))
        : setfillcolor('#6a666e');
    }
  }, [selected, seat.status, configMode, seat.price, selectByZone]);

  // reset state if selection reset in outside
  useEffect(() => {
    if (selectedSeats.includes(seat._id)) {
      setselected(true);
    } else {
      setselected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSeats]);

  // update internal state and context state by selecting each seat
  const onClickHandler = () => {
    if (selectByZone) return;
    if (!selectedSeats.includes(seat._id)) {
      setselected(true);
      addSeat(seat._id);
    } else {
      setselected(false);
      removeSeat(seat._id);
    }
  };
  return (
    <SeatWrapper
      unit={unit}
      bgcolor={fillcolor}
      onClick={onClickHandler}
      tooltipMode={tooltipMode}
    >
      <div className='tooltip'>
        <ul>
          <li>{seat.code}</li>
          <li>{seat.status}</li>
          <li>{seat.price}</li>
        </ul>
      </div>
      <svg
        version='1.1'
        id='armchair'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        xmlSpace='preserve'
        x='0px'
        y='0px'
        viewBox='0 0 512 512'
      >
        <g id='chair'>
          <g id='cover'>
            <path
              id='center-cover'
              d='M 414.893,450.201 V 114.752 C 307.576,103.47 202.943,103.479 97.1,114.752 V 450.2 c 53.831,17.284 106.637,26.324 158.897,26.483 v 0 c 52.259,-0.159 105.065,-9.198 158.896,-26.482'
            />

            <path
              id='arm-cover'
              d='M 434.677,27.967 C 315.893,14.205 196.094,14.205 77.319,27.967 38.363,32.143 8.826,65.008 8.826,104.185 V 450.2 c 0,24.382 19.765,44.138 44.138,44.138 24.373,0 44.138,-19.756 44.138,-44.138 V 114.39 c 105.843,-11.282 210.476,-11.29 317.793,0 V 450.2 c 0,24.382 19.765,44.138 44.138,44.138 24.373,0 44.138,-19.756 44.138,-44.138 V 104.185 c 0,-39.177 -29.537,-72.042 -68.494,-76.218'
            />
            <path
              id='highlight'
              d='M 77.316,27.83 C 141.104,20.441 205.184,17.157 269.237,17.714 214.012,18.173 158.795,21.466 103.799,27.83 64.843,32.005 35.306,64.879 35.306,104.056 v 346.015 c 0,19.721 13.038,36.246 30.897,41.887 -4.202,1.333 -8.589,2.251 -13.241,2.251 -24.373,0 -44.138,-19.765 -44.138,-44.138 V 104.056 C 8.822,64.879 38.359,32.005 77.316,27.83'
            />
            <path
              id='shadow'
              d='M 434.677,27.83 C 370.889,20.441 306.809,17.157 242.756,17.714 c 55.225,0.459 110.442,3.752 165.438,10.116 38.956,4.175 68.493,37.049 68.493,76.226 v 346.015 c 0,19.721 -13.038,36.246 -30.897,41.887 4.202,1.333 8.589,2.251 13.241,2.251 24.373,0 44.138,-19.765 44.138,-44.138 V 104.056 C 503.171,64.879 473.634,32.005 434.677,27.83'
            />
          </g>
          <g id='outline'>
            <path
              id='in'
              d='m 414.893,450.201 h 0.088 z M 105.928,443.73 c 51.288,15.863 101.747,23.976 150.095,24.126 48.296,-0.15 98.754,-8.263 150.042,-24.126 V 122.715 C 304.548,112.563 206.191,112.546 105.927,122.706 V 443.73 Z m 150.086,41.781 c -52.136,-0.159 -106.496,-9.207 -161.615,-26.906 -3.646,-1.174 -6.126,-4.564 -6.126,-8.404 V 114.752 c 0,-4.52 3.407,-8.298 7.892,-8.775 106.849,-11.388 211.412,-11.388 319.647,0 4.502,0.468 7.91,4.255 7.91,8.775 V 450.2 c 0,3.84 -2.481,7.23 -6.126,8.404 -55.121,17.7 -109.49,26.748 -161.582,26.907 z'
            />
            <path
              id='out'
              d='m 255.47,97.071 c 53.027,0 106.222,2.842 160.344,8.545 4.493,0.468 7.91,4.255 7.91,8.775 v 335.81 c 0,19.474 15.837,35.31 35.31,35.31 19.465,0 35.31,-15.837 35.31,-35.31 V 104.186 c 0,-34.745 -26.059,-63.744 -60.61,-67.443 -0.026,0 -0.053,0 -0.071,-0.009 C 315.771,23.078 196.219,23.087 78.335,36.734 43.704,40.442 17.654,69.44 17.654,104.186 v 346.015 c 0,19.474 15.837,35.31 35.31,35.31 19.465,0 35.31,-15.837 35.31,-35.31 v -335.81 c 0,-4.52 3.399,-8.307 7.892,-8.775 53.417,-5.702 106.277,-8.545 159.304,-8.545 m 203.564,406.096 c -29.211,0 -52.966,-23.755 -52.966,-52.966 V 122.354 C 304.542,112.185 206.185,112.176 105.93,122.345 v 327.857 c 0,29.21 -23.764,52.966 -52.966,52.966 C 23.755,503.167 0,479.412 0,450.201 V 104.186 C 0,60.392 32.83,23.855 76.376,19.194 195.522,5.379 316.433,5.379 435.659,19.194 479.179,23.873 512,60.41 512,104.186 v 346.015 c 0,29.211 -23.764,52.966 -52.966,52.966'
            />
          </g>
        </g>
      </svg>
    </SeatWrapper>
  );
};

export default Seat;

const SeatWrapper = styled.div`
  height: ${(props) => props.unit}px;
  width: ${(props) => props.unit}px;
  padding: ${(props) => 0.05 * props.unit}px;
  transform: rotate(180deg);
  & .tooltip {
    display: none;
    ${setAbsPos({ x: 'left,1rem', y: 'top,2rem' })}
    transform: rotate(180deg);
    background-color: ${Colors.secondaryDark};
    color: ${Colors.white};
    border-radius: 1rem 1rem 0 1rem;
    text-align: center;
    width: 7rem;
    padding: 1rem;
    letter-spacing: 1px;
    font-size: 1rem;
    ${setBoxShadow()}
    & ul {
      list-style: none;
    }
  }
  &:hover .tooltip {
    ${(props) => props.tooltipMode && 'display: inline-block'};
  }
  & #cover {
    fill: ${(props) => props.bgcolor};
  }
`;
