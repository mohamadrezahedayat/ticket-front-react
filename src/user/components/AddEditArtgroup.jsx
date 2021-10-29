import React, { Fragment, useContext } from 'react';

import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/components/FormElements/Input';
import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/FormElements/Button';
import { Heading3 } from '../../shared/styledComponent/Typography';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { baseURL, randomApi, imageAddress } from '../../shared/apis/server';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const AddEditArtgroup = ({ editMode, artGroup, onFinish, onEdit }) => {
  const { token } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: editMode ? artGroup.name : '',
        isValid: editMode,
      },
      leader: {
        value: editMode ? artGroup.leader : '',
        isValid: editMode,
      },
      crew: {
        value: editMode ? artGroup.crew : '',
        isValid: true,
      },
      description: {
        value: editMode ? artGroup.description : '',
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
        await sendRequest(`${baseURL}/artgroups/`, 'POST', formData, {
          authorization: `Bearer ${token}`,
        });
        onFinish();
      } else {
        await sendRequest(
          `${baseURL}/artgroups/${artGroup._id}`,
          'PATCH',
          formData,
          {
            authorization: `Bearer ${token}`,
          }
        );
        onEdit();
      }
    } catch (err) {}
  };

  return (
    <Fragment>
      <Heading3>{`${
        !editMode ? 'Add New Artgroup' : 'Edit Artgroup'
      }`}</Heading3>
      <ErrorModal error={error} onClear={clearError} />
      <form className='form' onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element='input'
          id='name'
          type='text'
          label='Name'
          validators={[VALIDATOR_MAXLENGTH(40), VALIDATOR_MINLENGTH(3)]}
          initialValid={editMode}
          initialValue={editMode && artGroup.name}
          onInput={inputHandler}
          errorText='Please enter a valid name.'
        />
        <Input
          element='input'
          id='leader'
          type='text'
          label='Leader'
          initialValue={editMode && artGroup.leader}
          initialValid={editMode}
          validators={[VALIDATOR_MAXLENGTH(40), VALIDATOR_MINLENGTH(3)]}
          errorText='Please enter a valid name.'
          onInput={inputHandler}
        />
        <Input
          element='textarea'
          initialValid={true}
          initialValue={editMode && artGroup.crew}
          id='crew'
          label='Crew'
          validators={[]}
          onInput={inputHandler}
        />
        <Input
          element='textarea'
          initialValid={true}
          initialValue={editMode && artGroup.description}
          id='description'
          label='Description'
          validators={[]}
          onInput={inputHandler}
        />

        <ImageUpload
          imageUrl={
            editMode
              ? `${imageAddress}/artists/${artGroup.images[0]}`
              : randomApi('artgroup')
          }
          initialValid={editMode}
          multiple={true}
          center
          id='images'
          onInput={inputHandler}
          errorText='Please provide at least one image.'
        />
        <Button
          type='submit'
          disabled={!formState.isValid}
          className='form__submit'
        >
          {!editMode ? 'Add New Artgroup' : 'Edit Artgroup'}
        </Button>
        <button
          type='button'
          className='form__cancel'
          onClick={() => (editMode ? onEdit() : onFinish())}
        >
          Cancel
        </button>
      </form>
    </Fragment>
  );
};

export default AddEditArtgroup;
