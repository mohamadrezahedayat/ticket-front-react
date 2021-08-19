import React, { Fragment, useContext, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { baseURL, randomApi, imageAddress } from '../../shared/apis/server';
import { AuthContext } from '../../shared/context/auth-context';
import {
  VALIDATOR_MIN,
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

const AddEditLocation = ({ editMode, location, onFinish, onEdit }) => {
  const [locationType, setlocationType] = useState(
    !editMode ? 'concert' : location.type
  );

  const { token } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: editMode ? location.name : '',
        isValid: editMode,
      },
      latitude: {
        value: editMode ? location.latitude : '',
        isValid: true,
      },
      longitude: {
        value: editMode ? location.longitude : '',
        isValid: true,
      },
      address: {
        value: editMode ? location.address : '',
        isValid: true,
      },
      description: {
        value: editMode ? location.description : '',
        isValid: true,
      },
      images: {
        value: null,
        isValid: true,
      },
      zones: {
        value: null,
        isValid: true,
      },
      capacities: {
        value: null,
        isValid: true,
      },
    },
    editMode
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);

      if (formState.inputs.latitude.value && formState.inputs.longitude.value) {
        const locationCoordinate = {
          coordinates: [
            formState.inputs.latitude.value,
            formState.inputs.longitude.value,
          ],
        };
        formData.append('location', JSON.stringify(locationCoordinate));
      }

      formData.append('type', locationType);

      if (formState.inputs.address.value)
        formData.append('address', formState.inputs.description.value);

      if (formState.inputs.description.value)
        formData.append('description', formState.inputs.description.value);

      if (formState.inputs.images.value)
        for (let i = 0; i < formState.inputs.images.value.length; i++) {
          formData.append('images', formState.inputs.images.value[i]);
        }

      if (formState.inputs.zones.value && formState.inputs.capacities.value) {
        const zones = formState.inputs.zones.value.split(',');
        const caps = formState.inputs.capacities.value.split(',');
        if (zones.length !== caps.length) return;

        const capacityArray = zones.map((zone, i) => {
          const seats = [];
          for (let j = 0; j < caps[i] * 1; j++) {
            seats.push({ code: `${zone}-${j + 1}` });
          }
          return {
            type: zone,
            seats,
          };
        });
        formData.append('capacity', JSON.stringify(capacityArray));
      }

      if (!editMode) {
        await sendRequest(`${baseURL}/locations/`, 'POST', formData, {
          authorization: `Bearer ${token}`,
        });
      } else {
        await sendRequest(
          `${baseURL}/locations/${location._id}`,
          'PATCH',
          formData,
          {
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
        !editMode ? 'Add New Location' : 'Edit Location'
      }`}</h3>
      <ErrorModal error={error} onClear={clearError} />
      <form className='form' onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element='input'
          id='name'
          type='text'
          label='Name'
          validators={[VALIDATOR_REQUIRE]}
          initialValid={editMode}
          initialValue={editMode && location.name}
          onInput={inputHandler}
          errorText='Please enter a valid name.'
        />
        <div className='form__select-container'>
          <Input
            className='form__number-input'
            element='input'
            id='latitude'
            type='number'
            label='latitude'
            validators={[VALIDATOR_MAX(90), VALIDATOR_MIN(-90)]}
            initialValid={true}
            initialValue={editMode && location.location.coordinates[0]}
            onInput={inputHandler}
            errorText='a number between -90 to 90.'
          />
          <Input
            className='form__number-input'
            element='input'
            id='longitude'
            type='number'
            label='longitude'
            validators={[VALIDATOR_MAX(180), VALIDATOR_MIN(-180)]}
            initialValid={true}
            initialValue={editMode && location.location.coordinates[1]}
            onInput={inputHandler}
            errorText='a number between -90 to 90.'
          />
        </div>

        <label htmlFor='locationType'>Location Type</label>
        <select
          className='form__number-input'
          id='locationType'
          value={locationType}
          onChange={(e) => {
            setlocationType(e.target.value);
          }}
        >
          <option
            value='concert'
            selected={locationType === 'concert' || !editMode ? true : false}
          >
            Concert
          </option>
          <option
            value='club'
            selected={locationType === 'club' ? true : false}
          >
            Club
          </option>
          <option
            value='boat'
            selected={locationType === 'boat' ? true : false}
          >
            Boat
          </option>
        </select>

        <Input
          element='textarea'
          rows={2}
          initialValid={true}
          initialValue={editMode && location.address}
          id='address'
          label='Address'
          validators={[]}
          onInput={inputHandler}
        />
        <Input
          element='textarea'
          rows={2}
          initialValid={true}
          initialValue={editMode && location.description}
          id='description'
          label='Description'
          validators={[]}
          onInput={inputHandler}
        />
        <div className='form__image-uplader-container u-margin-bottom-medium'>
          <ImageUpload
            className='form__input--inline'
            imageUrl={
              editMode && location.images && location.images.length !== 0
                ? `${imageAddress}locations/${location.images[0]}`
                : randomApi('images')
            }
            initialValid={editMode}
            multiple={true}
            center
            id='images'
            onInput={inputHandler}
            errorText='Select Location Images.'
          />
        </div>
        <div className='form__select-container'>
          <Input
            element='input'
            id='zones'
            type='text'
            label='Zones'
            validators={[]}
            placeholder='vip, left, right, center'
            initialValid={true}
            initialValue={
              editMode && location.capacity.map((cap) => cap.type).join(',')
            }
            onInput={inputHandler}
            errorText='Divide zones by commas.'
          />
          <Input
            element='input'
            id='capacities'
            type='text'
            label='Capacities'
            placeholder='30, 25, 18, 50'
            validators={[]}
            initialValid={true}
            initialValue={
              editMode &&
              location.capacity.map((cap) => cap.seats.length).join(',')
            }
            onInput={inputHandler}
            errorText='Divide capacities by commas.'
          />
        </div>
        <Button
          type='submit'
          disabled={!formState.isValid}
          className='form__submit'
        >
          {!editMode ? 'Add New Location' : 'Edit Location'}
        </Button>
      </form>
    </Fragment>
  );
};

export default AddEditLocation;
