import React, { useContext, useEffect, useState } from 'react';

import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import chairs from '../../img/chairs.jpg';
import Div from '../../shared/styledComponent/Div';
import { Colors } from '../../shared/styledComponent/functions';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';

const SeatSelection = ({ events, date }) => {
  const {
    activeEvent,
    setactiveEvent,
    settooltipMode,
    setselectedSeats,
    setInitialCapacity,
  } = useContext(manageSeatsContext);

  // eslint-disable-next-line no-unused-vars
  const [width, setwidth] = useState();
  const [columnMax, setcolumnMax] = useState();

  // resize eventHandler
  useEffect(() => {
    const getWidth = () =>
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setwidth(getWidth()), 150);
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

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
    setselectedSeats([]);

    // calculate maximum columns
    const layouts = capacity.map((zone) => zone.layout);
    const colMax = Math.max(
      ...layouts.map((layout) => layout.columns + layout.startColumn)
    );
    setcolumnMax(colMax);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeEvent, setInitialCapacity]);

  return (
    <Div
      row
      height='100vh'
      gridRowStart='3'
      gridColumn='full-start/full-end'
      background={{ img: chairs, color: `${Colors.primaryLight}3f` }}
    >
      <LeftPanel date={date} columnMax={columnMax} />
      <RightPanel />
    </Div>
  );
};

export default SeatSelection;
