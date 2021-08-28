import React, {
  Fragment,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { baseURL, api } from '../../shared/apis/server';
import { AuthContext } from '../../shared/context/auth-context';

const AddEditEvent = ({ editMode, event, onFinish, onEdit }) => {
  const { token } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [shows, setshows] = useState([]);
  const [show, setshow] = useState();
  const [locations, setlocations] = useState([]);
  const [location, setlocation] = useState();

  if (event) {
    var [date, time] = new Date(event.startDate).toLocaleString().split(',');
    var [mon, day, year] = date.split('/');
    var [hour, min, sec] = time.split(':');
    if (+mon < 10) mon = 0 + mon;
    if (sec.includes('PM')) hour = +hour + 12;
  }

  const [formState, inputHandler] = useForm(
    {
      show: {
        value: editMode && event.show._id,
        isValid: true,
      },
      location: {
        value: editMode && event.location._id,
        isValid: true,
      },
      date: {
        value: editMode && `${year}-${mon}-${day}`,
        isValid: true,
      },
      time: {
        value: editMode && `${hour}:${min}`,
        isValid: true,
      },
    },
    editMode
  );

  const getShows = useCallback(async () => {
    const response = await api.get(`${baseURL}/shows?fields=name,_id`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setshows(response.data.data.data);
    if (!editMode) setshow(response.data.data.data[0]._id);
  }, [token, editMode]);

  const getLocations = useCallback(async () => {
    const response = await api.get(
      `${baseURL}/locations?fields=name,_id,capacity`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    setlocations(response.data.data.data);
    if (!editMode) setlocation(response.data.data.data[0]._id);
  }, [token, editMode]);

  useEffect(() => {
    getShows();
    getLocations();
  }, [getShows, getLocations]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const date = new Date(
        `${formState.inputs.time.value} ${formState.inputs.date.value}`
      ).toISOString();

      if (!editMode) {
        await sendRequest(
          `${baseURL}/events/`,
          'POST',
          JSON.stringify({
            show: show,
            location: location,
            startDate: date,
          }),
          {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          }
        );
      } else {
        await sendRequest(
          `${baseURL}/events/${event._id}`,
          'PATCH',
          JSON.stringify({
            show: show,
            location: location,
            startDate: date,
          }),
          {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          }
        );
      }

      if (!editMode) {
        onFinish();
      } else {
        onEdit();
      }
    } catch (err) {}
  };

  return (
    <Fragment>
      <h3 className='heading-3'>{`${
        !editMode ? 'Add New Event' : 'Edit Event'
      }`}</h3>
      <ErrorModal error={error} onClear={clearError} />
      <form className='form' onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}

        <div className='form__select-container'>
          <div className='form__input--sidebyside'>
            <label htmlFor='show'>Show</label>
            <select
              id='show'
              value={show}
              onChange={(e) => setshow(e.target.value)}
            >
              {shows &&
                shows.map((show, i) => (
                  <option
                    value={show._id}
                    key={show._id}
                    selected={editMode && show._id === event.show._id}
                  >
                    {show.name}
                  </option>
                ))}
            </select>
          </div>
          <div className='form__input--sidebyside'>
            <label htmlFor='location'>Location</label>
            <select
              id='location'
              value={location}
              onChange={(e) => setlocation(e.target.value)}
            >
              {locations &&
                locations.map((location, i) => (
                  <option
                    value={location._id}
                    key={location._id}
                    selected={editMode && event.location._id === location._id}
                  >
                    {location.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className='form__select-container'>
          <div className='form__input--sidebyside'>
            <Input
              element='input'
              id='date'
              type='date'
              label='Date'
              validators={[]}
              initialValid={editMode}
              initialValue={editMode && `${year}-${mon}-${day}`}
              onInput={inputHandler}
              errorText='Please enter a valid date.'
            />
          </div>
          <div className='form__input--sidebyside'>
            <Input
              element='input'
              id='time'
              type='time'
              label='Time'
              validators={[]}
              initialValid={editMode}
              initialValue={editMode && `${hour}:${min}`}
              onInput={inputHandler}
              errorText='Please enter a valid time.'
            />
          </div>
        </div>

        <Button
          type='submit'
          disabled={!formState.isValid}
          className='form__submit'
        >
          {!editMode ? 'Add New Event' : 'Edit Event'}
        </Button>

        <Button
          type='button'
          onClick={() => (editMode ? onEdit() : onFinish())}
          inverse={true}
        >
          Cancel
        </Button>
      </form>
    </Fragment>
  );
};

export default AddEditEvent;
