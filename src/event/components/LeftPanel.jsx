import React, { useContext, useEffect, useRef, useState } from 'react';

import ZoneV2 from './ZoneV2';
import Div from '../../shared/styledComponent/Div';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import { Colors } from '../../shared/styledComponent/functions';

const LeftPanel = ({ date, columnMax, width }) => {
  const seatsWrapper = useRef();

  const [unit, setunit] = useState();
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
    setoffsetX((seatWrapperWidth - unit * columnMax * 10) / 20);
  }, [seatWrapperWidth, columnMax]);

  return (
    <Div
      boxShadow
      ref={seatsWrapper}
      overflow='x,auto'
      borderRadius='3rem'
      bgcolor={`${Colors.white}5`}
      margin='3rem 1.5rem 3rem 3rem'
      flexSelf={{ flex: '7', alignSelf: 'stretch' }}
      onClick={() => setclicked(true)}
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
  );
};

export default LeftPanel;
