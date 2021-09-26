import React, { useContext, useEffect, useRef, useState } from 'react';

import ZoneV2 from './ZoneV2';
import chairs from '../../img/chairs.jpg';
import Div from '../../shared/styledComponent/Div';
import Label from '../../shared/styledComponent/Label';
import Slider from '../../shared/styledComponent/Slider';
import Checkbox from '../../shared/styledComponent/Checkbox';
import { Colors } from '../../shared/styledComponent/functions';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import ReservedTicket from './ReservedTicket';

const SeatSelection = ({ className, events, date }) => {
  const {
    seatsState,
    ticketCount,
    activeEvent,
    selectByGroup,
    setactiveEvent,
    setticketCount,
    settooltipMode,
    setselectedSeats,
    setselectByGroup,
    setInitialCapacity,
  } = useContext(manageSeatsContext);
  const [unit, setunit] = useState();
  const [width, setwidth] = useState();
  const [offsetX, setoffsetX] = useState();
  const [columnMax, setcolumnMax] = useState();
  const [afterrender, setafterrender] = useState(false);
  const [rightPanelWidth, setrightPanelWidth] = useState();
  const [seatWrapperWidth, setseatWrapperWidth] = useState();

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

  // after render get div widthes
  const seatsWrapper = useRef();
  const rightPanelWrapper = useRef();
  useEffect(() => {
    if (!afterrender) {
      setafterrender(true);
      return;
    }
    setseatWrapperWidth(seatsWrapper.current.clientWidth);
    setrightPanelWidth(rightPanelWrapper.current.clientWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [afterrender, width]);

  // calculate unit
  useEffect(() => {
    if (!columnMax || !seatWrapperWidth) return;
    const unit = Math.round((seatWrapperWidth - 40) / columnMax) / 10;
    setunit(unit);
    setoffsetX((seatWrapperWidth - unit * columnMax * 10) / 20);
  }, [columnMax, seatWrapperWidth]);

  return (
    <Div
      row
      height='100vh'
      className={className}
      background={{ img: chairs, color: `${Colors.primaryLight}3f` }}
    >
      {/* left panel */}
      <Div
        boxShadow
        ref={seatsWrapper}
        overflow='x,auto'
        borderRadius='3rem'
        bgcolor={`${Colors.white}5`}
        margin='3rem 1.5rem 3rem 3rem'
        flexSelf={{ flex: '7', alignSelf: 'stretch' }}
      >
        {seatsState.map((zone) => (
          <ZoneV2
            unit={unit}
            zone={zone}
            offsetY={10}
            key={zone._id}
            offsetX={offsetX}
            date={date}
          />
        ))}
      </Div>
      {/* right panel */}
      <Div
        boxShadow
        // height='100%'
        padding='2rem'
        borderRadius='3rem'
        ref={rightPanelWrapper}
        bgcolor={`${Colors.white}5`}
        margin='3rem 3rem 3rem 1.5rem'
        flexSelf={{ flex: '3', alignSelf: 'stretch' }}
      >
        <Div rowWrap>
          <Div SingleMargin='bottom,2rem'>
            <Label SingleMargin='right,1rem' fontSize='1.7rem'>
              {`Ticket Counts: ${ticketCount}`}
            </Label>
            <Slider
              min={1}
              max={10}
              id='count'
              name='count'
              value={ticketCount}
              SingleMargin='top,1rem'
              onChange={(e) => setticketCount(e.target.value)}
            />
          </Div>
          <Div id='group' row>
            <Label
              fontSize='1.7rem'
              htmlFor='selectMode'
              SingleMargin='right,1rem'
            >
              Mode:
            </Label>
            <Checkbox
              spin={5}
              id='selectMode'
              active='Group'
              inactive='One by One '
              value={selectByGroup}
              checked={selectByGroup}
              width={`${rightPanelWidth * 0.5 * 0.1}rem`}
              height={`${rightPanelWidth * 0.5 * 0.1 * 0.2}rem`}
              onChange={() => setselectByGroup(!selectByGroup)}
            />
          </Div>
          <Div
            width='100%'
            height='100rem'
            padding='1rem'
            margin='2rem 0'
            overflow='y,auto'
            border={{ width: '1px', style: 'dashed', color: 'purple' }}
            borderRadius='2rem'
            bgcolor={`${Colors.white}3`}
          >
            <Label>Your Reserved Seats:</Label>
            <ReservedTicket />
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default SeatSelection;
