import React, { Fragment } from 'react';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MOBILE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { imageAddress } from '../../shared/apis/server';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { baseURL, randomApi } from '../../shared/apis/server';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const EditUser = ({ user, onSubmit }) => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: null,
        isValid: false,
      },
      email: {
        value: null,
        isValid: true,
      },
      mobile: {
        value: null,
        isValid: true,
      },
      role: {
        value: null,
        isValid: true,
      },
      image: {
        value: null,
        isValid: true,
      },
    },
    true
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      if (formState.inputs.image.value)
        formData.append('photo', formState.inputs.image.value[0]);
      formData.append('role', formState.inputs.role.value);
      formData.append('name', formState.inputs.name.value);
      formData.append('email', formState.inputs.email.value);
      formData.append('mobile', formState.inputs.mobile.value);

      await sendRequest(`${baseURL}/users/${user._id}`, 'PATCH', formData);
    } catch (err) {}
    onSubmit();
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className='form' onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element='input'
          id='name'
          type='text'
          label='Name'
          initialValue={user.name}
          initialValid={true}
          validators={[]}
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='email'
          type='email'
          label='E-Mail'
          initialValid={true}
          initialValue={user.email}
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid email address.'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='mobile'
          type='mobile'
          label='Mobile'
          initialValue={user.mobile}
          initialValid={true}
          placeholder='+98-9120000000'
          validators={[VALIDATOR_MOBILE()]}
          errorText='Please enter a valid mobile number.'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='role'
          type='text'
          label='Role'
          initialValue={user.role}
          initialValid={true}
          validators={[]}
          errorText='valid types are: user, show-manager, admin, super-admin'
          onInput={inputHandler}
        />

        <ImageUpload
          imageUrl={
            user.photo && user.photo !== 'default.jpg'
              ? `${imageAddress}/users/${user.photo}`
              : randomApi(user._id)
          }
          center
          id='image'
          initialValid={true}
          onInput={inputHandler}
          errorText='Please provide a profile image.'
        />
        <Button
          type='submit'
          disabled={!formState.isValid}
          className='form__submit'
        >
          Edit User
        </Button>
        <button type='button' className='form__cancel' onClick={onSubmit}>
          Cancel
        </button>
      </form>
    </Fragment>
  );
};

export default EditUser;
