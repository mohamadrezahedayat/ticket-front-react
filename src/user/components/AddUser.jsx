import React, { useState, useContext, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { baseURL, imageAddress } from '../../shared/apis/server';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MOBILE,
} from '../../shared/util/validators';

const AddUser = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: true,
      },
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      passwordConfirm: {
        value: '',
        isValid: false,
      },
      mobile: {
        value: '',
        isValid: false,
      },
      role: {
        value: 'user',
        isValid: true,
      },
      image: {
        value: '',
        isValid: true,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('email', formState.inputs.email.value);
      formData.append('name', formState.inputs.name.value);
      formData.append('mobile', formState.inputs.mobile.value);
      formData.append('password', formState.inputs.password.value);
      formData.append(
        'passwordConfirm',
        formState.inputs.passwordConfirm.value
      );
      formData.append('role', formState.inputs.password.value);
      formData.append('photo', formState.inputs.image.value);
      const responseData = await sendRequest(
        `${baseURL}/users/signup`,
        'POST',
        formData
      );
    } catch (err) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className='form' onSubmit={authSubmitHandler}>
        <h3 className='heading-3'>Create A New User</h3>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          element='input'
          id='name'
          type='text'
          label='Name'
          initialValid={true}
          validators={[]}
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='email'
          type='email'
          label='E-Mail'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid email address.'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='mobile'
          type='mobile'
          label='Mobile'
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
          initialValue='user'
          initialValid={true}
          validators={[]}
          errorText='valid types are: user, show-manager, admin, super-admin'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          autoComplete='current-password'
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText='Please enter a valid password, at least 8 characters.'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='passwordConfirm'
          type='password'
          label='Password Confirm'
          au
          autoComplete='current-password'
          validators={[VALIDATOR_MINLENGTH(8)]}
          errorText='Please confirm your password, at least 8 characters.'
          onInput={inputHandler}
        />
        <ImageUpload
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
          Create A New User
        </Button>
      </form>
    </Fragment>
  );
};

export default AddUser;
