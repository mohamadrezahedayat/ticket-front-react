import React, { useEffect, useState, useContext } from 'react';

import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import Seat from './Seat';

const Zone = ({ zone, unit, offsetX, offsetY }) => {
  const { selectByZone, selectedZones, addZone, removeZone } =
    useContext(manageSeatsContext);
  const [selected, setselected] = useState(false);
  const { columns, rows, startColumn, startRow } = zone.layout;
  const width = `${columns * unit + 0.2 * unit}rem`;
  const height = `${rows * unit + 0.2 * unit}rem`;
  const left = `${startColumn * unit + offsetX}rem`;
  const top = `${startRow * unit + offsetY}rem`;
  const color = selectByZone && selected ? 'rgb(55,200,55)' : 'rgb(55,55,55)';

  // reset state if selection reset in outside
  useEffect(() => {
    if (selectedZones.includes(zone._id)) {
      setselected(true);
    } else {
      setselected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedZones]);

  // update internal state and context state by selecting each seat
  const onClickHandler = () => {
    if (!selectByZone) return;

    if (!selectedZones.includes(zone._id)) {
      setselected(true);
      addZone(zone._id);
    } else {
      setselected(false);
      removeZone(zone._id);
    }
  };
  return (
    <div
      style={{
        width,
        height,
        left,
        top,
        border: `2px solid ${color}`,
        background: color,
        position: 'absolute',
      }}
      onClick={onClickHandler}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {zone.seats.map((seat, id) => (
          <Seat unit={unit} seat={seat} key={id} />
        ))}
      </div>
    </div>
  );
};

export default Zone;
