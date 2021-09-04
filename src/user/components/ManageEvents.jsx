import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  Fragment,
} from 'react';
import {
  api,
  baseURL,
  imageAddress,
  randomApi,
} from '../../shared/apis/server';
import { AuthContext } from '../../shared/context/auth-context';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import { useSeats } from '../../shared/hooks/manageSeats-hook';
import AddEditEvent from './AddEditEvent';
import EditSeats from './EditSeats';

const ManageEvents = () => {
  const { token } = useContext(AuthContext);
  const [events, setevents] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [editSeatsMode, seteditSeatsMode] = useState(false);
  const [activeEvent, setactiveEvent] = useState(false);

  // *=====
  // *======
  // !=======
  // *======
  const {
    configMode,
    tooltipMode,
    selectedZones,
    selectedSeats,
    selectByZone,
    seatsState,
    addZone,
    addSeat,
    setPrice,
    removeSeat,
    removeZone,
    changeStatus,
    setconfigMode,
    settooltipMode,
    setselectByZone,
    setselectedSeats,
    setselectedZones,
    setInitialCapacity,
  } = useSeats();

  const getEvents = useCallback(async () => {
    const response = await api.get(`${baseURL}/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setevents(response.data.data.data);
  }, [token]);

  const deleteEventHandler = async (event) => {
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
    let headerElement = [
      'Event name',
      'location name',
      'date',
      'time',
      'image',
      'operation',
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
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
              <button
                className='opration__button'
                onClick={() => editEventHandler(event)}
              >
                Edit
              </button>
              <button
                className='opration__button'
                onClick={() => editSeatsHandler(event)}
              >
                Seats
              </button>
              <button
                className='opration__button--danger'
                onClick={() => deleteEventHandler(event)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })
    );
  };

  const renderTable = () => {
    return (
      <table className='table'>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    );
  };

  return (
    <Fragment>
      <h3 className='heading-3'>{`${
        !editMode && !editSeatsMode ? 'Manage Event' : ''
      }`}</h3>
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
            configMode,
            tooltipMode,
            selectedSeats,
            selectedZones,
            selectByZone,
            seatsState,
            addZone,
            addSeat,
            setPrice,
            removeZone,
            removeSeat,
            changeStatus,
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
    </Fragment>
  );
};

export default ManageEvents;
