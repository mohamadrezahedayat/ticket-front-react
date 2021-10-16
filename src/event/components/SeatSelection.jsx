import React, { useCallback, useContext, useEffect, useState } from 'react';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import chairs from '../../img/chairs.jpg';
import Div from '../../shared/styledComponent/Div';
import { Colors } from '../../shared/styledComponent/variables';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';

const SeatSelection = ({ events, date }) => {
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

  const [width, setwidth] = useState(getWidth());
  const [columnMax, setcolumnMax] = useState();

  // resize eventHandler
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

    // calculate maximum columns
    const layouts = capacity.map((zone) => zone.layout);
    const colMax = Math.max(
      ...layouts.map((layout) => layout.columns + layout.startColumn)
    );
    setcolumnMax(colMax);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent]);

  return (
    <Div
      row
      minHeight='100vh'
      gridRowStart='3'
      gridColumn='full-start/full-end'
      background={{ img: chairs, color: `${Colors.primaryLight}3f` }}
    >
      <LeftPanel date={date} columnMax={columnMax} width={width} />
      <RightPanel width={width} event={activeEvent} />
    </Div>
  );
};

export default SeatSelection;
