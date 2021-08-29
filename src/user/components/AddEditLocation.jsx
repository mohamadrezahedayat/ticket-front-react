import React, { Fragment, useContext, useState } from 'react';

import {
  VALIDATOR_MIN,
  VALIDATOR_MAX,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import ZoneInputs from './ZoneInputs';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/components/FormElements/Input';
import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { baseURL, randomApi, imageAddress } from '../../shared/apis/server';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const AddEditLocation = ({ editMode, location, onFinish, onEdit }) => {
  const [locationType, setlocationType] = useState(
    !editMode ? 'concert' : location.type
  );
  const { token } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [zoneInputs, setzoneInputs] = useState(
    editMode ? location.capacity.map((cap, i) => 'zone' + (i + 1)) : []
  );

  const initialZoneValState = () => {
    const { capacity } = location;
    const types = capacity.map((cap) => cap.type);
    const valueArray = capacity.map((cap) => Object.values(cap.layout));
    valueArray.map((lay, i) => lay.unshift(types[i]));

    const ids = capacity.map((cap, i) => 'zone' + (i + 1));
    const values = valueArray.map((val) => val.join(','));
    const initialState = [];
    for (let i = 0; i < ids.length; i++) {
      initialState.push({ id: ids[i], value: values[i] });
    }
    return initialState;
  };
  const [zonesVal, setZonesVal] = useState(editMode ? initialZoneValState : []);

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
    },
    editMode
  );

  const addZoneHandler = (id, value) => {
    const zones = zonesVal.filter((val) => id !== val[Object.keys(val)[0]]);
    setZonesVal([...zones, { id, value }]);
  };

  const removeZoneHandler = (id) => {
    setzoneInputs(zoneInputs.filter((zone) => zone !== id));
    setZonesVal(zonesVal.filter((val) => id !== val[Object.keys(val)[0]]));
  };

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

      // calculate capacity
      const zones = [];
      const layouts = [];
      if (zonesVal && zonesVal.length !== 0) {
        zonesVal.forEach((zone) => {
          if (zone.value.split(',').length === 5) {
            zones.push(zone.value.split(',')[0].trim());
            layouts.push([
              zone.value.split(',')[1].trim() * 1,
              zone.value.split(',')[2].trim() * 1,
              zone.value.split(',')[3].trim() * 1,
              zone.value.split(',')[4].trim() * 1,
            ]);
          }
        });
      }

      // i for each zone
      const capacityArray = zones.map((zone, i) => {
        const seats = [];

        // j for each row
        for (let j = 0; j < layouts[i][0] * 1; j++) {
          // k for each columns
          for (let k = 0; k < layouts[i][1]; k++) {
            seats.push({ code: `${zone}-${j + 1}-${k + 1}` });
          }
        }
        return {
          type: zone,
          layout: {
            rows: layouts[i][0],
            columns: layouts[i][1],
            startRow: layouts[i][2],
            startColumn: layouts[i][3],
          },
          seats,
        };
      });
      formData.append('capacity', JSON.stringify(capacityArray));

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
          value={editMode ? locationType : 'concert'}
          onChange={(e) => {
            setlocationType(e.target.value);
          }}
        >
          <option value='concert'>Concert</option>
          <option value='club'>Club</option>
          <option value='boat'>Boat</option>
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

        <button
          type='button'
          className='button button--inverse u-margin-bottom-small '
          onClick={() =>
            setzoneInputs([...zoneInputs, `zone${zoneInputs.length + 1}`])
          }
        >
          Add New Zone
        </button>
        {zoneInputs.map((zone, i) => (
          <ZoneInputs
            id={zone}
            key={zone}
            initialValue={editMode && zonesVal[i] && zonesVal[i].value}
            onInput={addZoneHandler}
            onRemove={removeZoneHandler}
          />
        ))}
        <Button
          type='submit'
          disabled={!formState.isValid}
          className='form__submit'
        >
          {!editMode ? 'Add New Location' : 'Edit Location'}
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

export default AddEditLocation;
