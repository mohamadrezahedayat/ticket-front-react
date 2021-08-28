import { createContext } from 'react';

export const manageSeatsContext = createContext({
  selectedSeats: [],
  tooltipMode: true,
  selectedZones: null,
  selectByZone: false,
  configMode: 'status',
  setselectedSeats: () => {},
  setselectedZones: () => {},
  setselectByZone: () => {},
  settooltipMode: () => {},
  setconfigMode: () => {},
  changeStatus: () => {},
  removeZone: () => {},
  removeSeat: () => {},
  setPrice: () => {},
  addZone: () => {},
  addSeat: () => {},
});
