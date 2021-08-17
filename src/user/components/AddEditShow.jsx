import React, { Fragment, useContext } from 'react';

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
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

const AddEditShow = ({ editMode, show, onFinish, onEdit }) => {
  const { token } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: editMode ? show.name : '',
        isValid: editMode,
      },
      leader: {
        value: editMode ? show.leader : '',
        isValid: editMode,
      },
      crew: {
        value: editMode ? show.crew : '',
        isValid: true,
      },
      description: {
        value: editMode ? show.description : '',
        isValid: true,
      },
      images: {
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
      formData.append('leader', formState.inputs.leader.value);
      if (formState.inputs.crew.value.length !== 0) {
        let crew;
        if (typeof formState.inputs.crew.value === 'string') {
          crew = formState.inputs.crew.value.split(',');
        } else {
          crew = formState.inputs.crew.value;
        }
        crew.forEach((cr) => {
          formData.append('crew', cr);
        });
      }
      if (formState.inputs.description.value)
        formData.append('description', formState.inputs.description.value);

      if (formState.inputs.images.value)
        for (let i = 0; i < formState.inputs.images.value.length; i++) {
          formData.append('images', formState.inputs.images.value[i]);
        }

      if (!editMode) {
        await sendRequest(`${baseURL}/shows/`, 'POST', formData, {
          authorization: `Bearer ${token}`,
        });
      } else {
        const resp = await sendRequest(
          `${baseURL}/shows/${show._id}`,
          'PATCH',
          formData,
          {
            authorization: `Bearer ${token}`,
          }
        );
        console.log('response', resp.data.data);
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
        !editMode ? 'Add New Show' : 'Edit Show'
      }`}</h3>
      <ErrorModal error={error} onClear={clearError} />
      <form className='form' onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element='input'
          id='name'
          type='text'
          label='Name'
          validators={[VALIDATOR_MAXLENGTH(40), VALIDATOR_MINLENGTH(4)]}
          initialValid={editMode}
          initialValue={editMode && show.name}
          onInput={inputHandler}
          errorText='Please enter a valid name.'
        />
        <Input
          element='textarea'
          initialValid={true}
          initialValue={editMode && show.description}
          id='description'
          label='Description'
          validators={[]}
          onInput={inputHandler}
        />
        <ImageUpload
          imageUrl={
            editMode
              ? `${imageAddress}/shows/${show.images[0]}`
              : randomApi('show')
          }
          initialValid={editMode}
          center
          id='imageCover'
          onInput={inputHandler}
          errorText='Please provide at least one image.'
        />
        <ImageUpload
          imageUrl={
            editMode
              ? `${imageAddress}/shows/${show.images[0]}`
              : randomApi('images')
          }
          initialValid={editMode}
          multiple={true}
          center
          id='images'
          onInput={inputHandler}
          errorText='Please provide at least one image.'
        />
        <Input
          element='input'
          id='dates'
          type='date'
          label='Dates'
          initialValue={editMode && show.dates}
          initialValid={editMode}
          validators={[VALIDATOR_MAXLENGTH(40), VALIDATOR_MINLENGTH(3)]}
          errorText='Please enter a valid name.'
          onInput={inputHandler}
        />
        <Input
          initialValid={true}
          initialValue={editMode && show.artgroup}
          type='select'
          id='artgroup'
          label='Artgroup'
          validators={[]}
          onInput={inputHandler}
        />
        <Input
          initialValid={true}
          initialValue={editMode && show.manager}
          type='select'
          id='manager'
          label='Manager'
          validators={[]}
          onInput={inputHandler}
        />

        <Button
          type='submit'
          disabled={!formState.isValid}
          className='form__submit'
        >
          {!editMode ? 'Add New Show' : 'Edit Show'}
        </Button>
      </form>
    </Fragment>
  );
};

export default AddEditShow;
