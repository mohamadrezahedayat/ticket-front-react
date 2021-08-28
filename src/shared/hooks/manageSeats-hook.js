import { useState, useReducer, useCallback } from 'react';
const seatsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INITIAL_CAPACITY':
      state = undefined;
      state = JSON.parse(JSON.stringify(action.capacity));
      return state;

    case 'STATUS_CHANGE':
      if (action.status === 'free' || 'sold' || 'reserved' || 'inactive') {
        action.seats.forEach((seat) => {
          state.forEach((zone) => {
            zone.seats.forEach((s) => {
              if (s._id === seat) s.status = action.status;
            });
          });
        });
      }
      return state;

    case 'PRICE_CHANGE':
      action.seats.forEach((seat) => {
        state.forEach((zone) => {
          zone.seats.forEach((s) => {
            if (s._id === seat && s.status !== 'inactive')
              s.price = action.price;
          });
        });
      });
      return state;

    default:
      return state;
  }
};
export const useSeats = () => {
  const [selectByZone, setselectByZone] = useState(false);
  const [selectedSeats, setselectedSeats] = useState([]);
  const [selectedZones, setselectedZones] = useState([]);
  const [seatsState, dispatch] = useReducer(seatsReducer, []);
  const [configMode, setconfigMode] = useState('status');
  const [tooltipMode, settooltipMode] = useState(true);

  const setInitialCapacity = useCallback((capacity) => {
    dispatch({
      type: 'SET_INITIAL_CAPACITY',
      capacity: capacity,
    });
  }, []);

  const getSeatsIdFromZoneIds = () => {
    const filteredCapacity = seatsState.filter((zone) =>
      selectedZones.includes(zone._id)
    );
    const selectdZonesSeats = filteredCapacity.map((zone) => zone.seats);
    let selectedSeatsIds = [];
    selectdZonesSeats.forEach((array) => {
      const arrmap = array.map((seat) => seat._id);
      selectedSeatsIds = [...selectedSeatsIds, ...arrmap];
    });
    return selectedSeatsIds;
  };

  const changeStatus = (status) => {
    const selectedSeatsIds = getSeatsIdFromZoneIds();
    dispatch({
      type: 'STATUS_CHANGE',
      status,
      seats: !selectByZone ? selectedSeats : selectedSeatsIds,
    });
  };

  const addZone = (zoneId) => {
    setselectedZones([...selectedZones, zoneId]);
  };

  const removeZone = (zoneId) => {
    setselectedZones(selectedZones.filter((selected) => selected !== zoneId));
  };

  const addSeat = (seatId) => {
    if (!selectByZone) setselectedSeats([...selectedSeats, seatId]);
  };

  const removeSeat = (seatId) => {
    if (!selectByZone)
      setselectedSeats(selectedSeats.filter((selected) => selected !== seatId));
  };

  const setPrice = (price) => {
    const selectedSeatsIds = getSeatsIdFromZoneIds();
    dispatch({
      type: 'PRICE_CHANGE',
      price,
      seats: !selectByZone ? selectedSeats : selectedSeatsIds,
    });
  };

  return {
    selectedSeats,
    selectedZones,
    selectByZone,
    tooltipMode,
    seatsState,
    configMode,
    setInitialCapacity,
    setselectedSeats,
    setselectedZones,
    setselectByZone,
    settooltipMode,
    setconfigMode,
    changeStatus,
    removeZone,
    removeSeat,
    setPrice,
    addZone,
    addSeat,
  };
};
