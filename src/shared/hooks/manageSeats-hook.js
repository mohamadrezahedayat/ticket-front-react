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
  const [ticketCount, setticketCount] = useState(2);
  const [hoveredSeats, sethoveredSeats] = useState([]);
  const [tooltipMode, settooltipMode] = useState(true);
  const [configMode, setconfigMode] = useState('status');
  const [selectedSeats, setselectedSeats] = useState([]);
  const [selectedZones, setselectedZones] = useState([]);
  const [selectByZone, setselectByZone] = useState(false);
  const [selectByGroup, setselectByGroup] = useState(true);
  const [seatsState, dispatch] = useReducer(seatsReducer, []);

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

  const flattenSeats = () => {
    const seatsCluster = seatsState.map((zone) => zone.seats);
    let seats = [];
    seatsCluster.forEach((cluster) => {
      seats = [...seats, ...cluster];
    });
    return seats;
  };
  const getZoneBySeat = (code) => {
    const zoneType = code.split('-')[0];
    const zone = seatsState.filter((zone) => zone.type === zoneType)[0];
    return zone;
  };
  const getSeatByCode = (code) => {
    const res = flattenSeats().filter((seat) => seat.code === code);
    if (res.length === 0) return 'NOT-EXIST';
    return res[0];
  };

  const getSeatById = (Id) => {
    const res = flattenSeats().filter((seat) => seat._id === Id);
    if (res.length === 0) return 'NOT-EXIST';
    return res[0];
  };

  const isSeatFree = (code) => {
    return (
      getSeatByCode(code) !== 'NOT-EXIST' &&
      getSeatByCode(code).status === 'free'
    );
  };
  const calculateNewCode = (code, num, columns) => {
    let [zone, row, col] = code.split('-');
    col = col * 1;
    row = row * 1;
    col = col + num;

    if (col === 0 && num < 0) {
      col = columns;
      row--;
    }

    if (col > columns) {
      row += Math.floor(col / columns);
      col = col % columns;
      if (col === 0) {
        row--;
        col = columns;
      }
    }

    if (col < 0) {
      row += Math.ceil(col / columns) - 1;
      col = columns + (col % columns);
    }

    return `${zone}-${row}-${col}`;
  };

  const getNextSeat = (code, num, columns) => {
    let newCode = calculateNewCode(code, num, columns);

    return getSeatByCode(newCode);
  };

  const getNextSeatInRow = (code, num, columns) => {
    let [zone, row, col] = code.split('-');
    col = col * 1 + num;

    if (col > columns || col < 1) return 'NOT-EXIST';

    const newCode = `${zone}-${row}-${col}`;
    return getSeatByCode(newCode);
  };

  const getNextSeatStatus = (code, num, columns) => {
    const nextSeat = getNextSeatInRow(code, num, columns);
    return nextSeat !== 'NOT-EXIST' ? nextSeat.status : 'NOT-EXIST';
  };

  const isFreeToGroupSelect = (code, columns, isNegative) => {
    if (isNegative) {
      if (
        getNextSeatStatus(code, -1, columns) === 'free' &&
        getNextSeatStatus(code, -2, columns) !== 'free'
      )
        return false;
    } else {
      if (
        getNextSeatStatus(code, 1, columns) === 'free' &&
        getNextSeatStatus(code, 2, columns) !== 'free'
      )
        return false;
    }
    return true;
  };
  const singleHoverHandler = (seat) => {
    if (seat.status !== 'free') return;

    sethoveredSeats([seat._id]);
  };

  const generateCounterArray = () => {
    const counterArray = [];
    let isNegative = false;
    counterArray.push(0);
    let counter = 1;

    for (let i = 1; i < ticketCount; i++) {
      counterArray.push(counter);
      isNegative = !isNegative;
      counter = -counter;
      if (!isNegative) counter++;
    }
    return counterArray;
  };

  const groupHoverHandler = (seat) => {
    const isEven = ticketCount % 2 === 0 ? true : false;
    const { layout } = getZoneBySeat(seat.code);
    const counterArray = generateCounterArray();
    const hoverNominates = [];
    let isEnds = false;
    let isValid = true;

    for (let i = 0; i < counterArray.length; i++) {
      const counter = counterArray[i];
      let nextSeat = getNextSeat(seat.code, counter, layout.columns);

      if (i === counterArray.length - 1 || i === counterArray.length - 2)
        isEnds = true;

      if (nextSeat === 'NOT-EXIST') isValid = false;

      if (isEnds && isValid) {
        isValid = isFreeToGroupSelect(
          nextSeat.code,
          layout.columns,
          counter <= 0
        );
      }

      if (nextSeat === 'NOT-EXIST' || nextSeat.status !== 'free' || !isValid) {
        if (isEven && counter === counterArray.length) {
          nextSeat = getNextSeat(seat.code, -counter, layout.columns);
          isValid = isFreeToGroupSelect(
            nextSeat.code,
            layout.columns,
            -counter <= 0
          );
        } else return;

        if (nextSeat === 'NOT-EXIST' || nextSeat.status !== 'free') return;
      }

      if (isValid) hoverNominates.push(nextSeat.code);
    }

    sethoveredSeats(hoverNominates);
  };

  const seatHoverHandler = (seat) => {
    sethoveredSeats([]);
    if (!selectByGroup || ticketCount === 1) {
      singleHoverHandler(seat);
    } else {
      groupHoverHandler(seat);
    }
  };

  return {
    addSeat,
    addZone,
    setPrice,
    configMode,
    seatsState,
    removeZone,
    isSeatFree,
    removeSeat,
    ticketCount,
    getNextSeat,
    tooltipMode,
    getSeatById,
    selectByZone,
    hoveredSeats,
    changeStatus,
    selectedSeats,
    getSeatByCode,
    selectByGroup,
    selectedZones,
    setconfigMode,
    settooltipMode,
    setticketCount,
    setselectByZone,
    sethoveredSeats,
    setselectedZones,
    seatHoverHandler,
    setselectedSeats,
    setselectByGroup,
    getNextSeatStatus,
    setInitialCapacity,
  };
};
