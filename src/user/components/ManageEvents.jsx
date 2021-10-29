import React, { useState, useEffect, useContext, useCallback } from 'react';

import {
  api,
  baseURL,
  randomApi,
  imageAddress,
} from '../../shared/apis/server';
import Table from './Table';
import EditSeats from './EditSeats';
import AddEditEvent from './AddEditEvent';
import { useSeats } from '../../shared/hooks/manageSeats-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { Heading3 } from '../../shared/styledComponent/Typography';
import {
  DeleteIcon,
  Edit,
  SeatSvg,
} from '../../shared/components/UIElements/Svgs';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';

const ManageEvents = () => {
  const { token } = useContext(AuthContext);

  const [events, setevents] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [editSeatsMode, seteditSeatsMode] = useState(false);
  const [activeEvent, setactiveEvent] = useState(false);

  const {
    addZone,
    addSeat,
    setPrice,
    seatsState,
    removeSeat,
    configMode,
    removeZone,
    tooltipMode,
    selectByZone,
    changeStatus,
    selectedZones,
    selectedSeats,
    setconfigMode,
    settooltipMode,
    setselectByZone,
    setselectedSeats,
    setselectedZones,
    setInitialCapacity,
  } = useSeats();

  const getEvents = useCallback(async () => {
    const { data } = await api.get(`${baseURL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setevents(data.data.data);
  }, [token]);

  const deleteEventHandler = async (event) => {
    // todo check ticket sold
    await api.delete(`${baseURL}/events/${event._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getEvents();
  };

  useEffect(() => {
    getEvents();
  }, [getEvents, editMode, editSeatsMode]);

  const editEventHandler = (event) => {
    seteditMode(true);
    setactiveEvent(event);
  };

  const editSeatsHandler = (event) => {
    seteditSeatsMode(true);
    setactiveEvent(event);
  };

  const renderHeader = () => {
    return (
      <>
        <th>show name</th>
        <th>location name</th>
        <th>date</th>
        <th>time</th>
        <th>profile</th>
        <th>action</th>
      </>
    );
  };

  const renderBody = () => {
    return (
      events &&
      events.map((event) => {
        const { _id, show, location, startDate } = event;

        return (
          <tr key={_id}>
            <td>{show.name}</td>
            <td>{location.name}</td>
            <td>{new Date(startDate).toDateString()}</td>
            <td>{new Date(startDate).toTimeString()}</td>
            <td>
              <img
                src={
                  show.images !== 0
                    ? `${imageAddress}/shows/${show.images[0]}`
                    : randomApi(event._id)
                }
                alt='show'
              />
            </td>
            <td className='opration'>
              <Edit
                className='edit__button'
                onClick={() => editEventHandler(event)}
              />
              <SeatSvg
                className='seat__button'
                onClick={() => editSeatsHandler(event)}
              />
              <DeleteIcon
                className='delete__button'
                onClick={() => deleteEventHandler(event)}
              />
            </td>
          </tr>
        );
      })
    );
  };

  const renderTable = () => {
    return (
      <Table
        className='table'
        headers={renderHeader()}
        body={renderBody()}
      ></Table>
    );
  };

  return (
    <>
      {!editMode && <Heading3>Manage Event</Heading3>}
      {!editMode && !editSeatsMode && renderTable()}
      {editMode && !editSeatsMode && (
        <AddEditEvent
          editMode='true'
          event={activeEvent}
          onEdit={() => seteditMode(false)}
        />
      )}
      {editSeatsMode && (
        <manageSeatsContext.Provider
          value={{
            addZone,
            addSeat,
            setPrice,
            seatsState,
            removeSeat,
            configMode,
            removeZone,
            tooltipMode,
            selectByZone,
            changeStatus,
            selectedZones,
            selectedSeats,
            setconfigMode,
            settooltipMode,
            setselectByZone,
            setselectedSeats,
            setselectedZones,
            setInitialCapacity,
          }}
        >
          <EditSeats
            event={activeEvent}
            onEdit={() => {
              seteditSeatsMode(false);
              setselectedSeats([]);
            }}
          />
        </manageSeatsContext.Provider>
      )}
    </>
  );
};

export default ManageEvents;
