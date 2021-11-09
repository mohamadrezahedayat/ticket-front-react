import React, { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  setBoxShadow,
  setBackgroundColor,
} from '../../shared/styledComponent/functions';
import {
  Screen,
  setMediaQuery,
} from '../../shared/styledComponent/mediaQueries';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import chairs from '../../img/chairs.jpg';
import Div from '../../shared/styledComponent/Div';
import { Colors } from '../../shared/styledComponent/variables';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';

const SeatSelection = ({ events, date, className }) => {
  const [width, setwidth] = useState();
  const [rowMax, setrowMax] = useState();
  const [columnMax, setcolumnMax] = useState();

  const {
    activeEvent,
    setactiveEvent,
    settooltipMode,
    setselectedSeats,
    setInitialCapacity,
    setReservedSeatsOfCurrentUser,
    getReservedSeatsOfCurrentUser,
  } = useContext(manageSeatsContext);

  const getWidth = useCallback(
    () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth,
    []
  );

  // resize eventHandler, set width state after user resize
  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setwidth(getWidth()), 150);
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [getWidth]);

  // disable tooltip mode
  useEffect(() => {
    settooltipMode(false);
  }, [settooltipMode]);

  // set active event based on selected date
  useEffect(() => {
    setactiveEvent(events.filter((event) => event.startDate === date)[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, events]);

  // fill Initial capacity and calculate row max and column max
  useEffect(() => {
    if (!activeEvent) return;
    const { capacity } = activeEvent;
    setInitialCapacity(capacity);
    setReservedSeatsOfCurrentUser(getReservedSeatsOfCurrentUser(capacity));
    setselectedSeats([]);

    // calculate maximum columns & rows
    const layouts = capacity.map((zone) => zone.layout);
    const colMax = Math.max(
      ...layouts.map((layout) => layout.columns + layout.startColumn)
    );
    const rowMax = Math.max(
      ...layouts.map((layout) => layout.rows + layout.startRow)
    );
    setcolumnMax(colMax);
    setrowMax(rowMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent]);
  return (
    <Div
      className={className}
      background={{ img: chairs, color: `${Colors.primaryLight}3f` }}
    >
      <LeftPanel
        className='left-panel'
        columnMax={columnMax}
        rowMax={rowMax}
        width={width}
      />
      <RightPanel className='right-panel' width={width} event={activeEvent} />
    </Div>
  );
};

const SeatSelectionWrapper = styled(SeatSelection)`
  grid-row-start: 3;
  grid-column: full-start/full-end;
  padding: 3rem;
  display: grid;
  grid-template-columns: 7fr 3fr;
  grid-auto-rows: max-content;
  gap: 3rem;
  ${setMediaQuery(
    { isMinWidth: false, breakPoint: '62.5em' },
    `padding:3rem 1rem;
    gap: 1.5rem;`
  )}
  ${Screen.tabletLandscape`
    grid-template-columns: 1fr;
    grid-auto-rows: min-content;
  `}
  & .left-panel {
    height: 80vh;
    display: flex;
    flex-direction: column;
    ${setBoxShadow()}
    overflow: hidden;
    border-radius: 3rem;
    ${setBackgroundColor(Colors.white + '5')}
    ${Screen.tabletLandscape` grid-row-start:2;margin-bottom:3rem;`}
  }

  & .right-panel {
    border-radius: 3rem;
    overflow-x: auto;
    ${setBackgroundColor(Colors.white + '5')}
    ${setBoxShadow()}
    ${Screen.tabletLandscape`max-width:40rem;
    justify-self:center;
  `}
  }
`;
export default SeatSelectionWrapper;
