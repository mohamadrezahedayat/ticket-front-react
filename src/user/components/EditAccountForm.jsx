import React, { useContext } from 'react';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MOBILE,
} from '../../shared/util/validators';
import { baseURL } from '../../shared/apis/server';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/components/FormElements/Input';
import { AuthContext } from '../../shared/context/auth-context';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const EditAcountForm = ({ onFinish }) => {
  const { username, token, email, mobile, login } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: username,
        isValid: true,
      },
      email: {
        value: email,
        isValid: true,
      },
      mobile: {
        value: mobile,
        isValid: true,
      },
    },
    true
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await sendRequest(
        `${baseURL}/users/updateMe`,
        'PATCH',
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          mobile: formState.inputs.mobile.value,
        }),
        {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        }
      );
      const { expiration, photo, userId, role } = JSON.parse(
        localStorage.getItem('userData')
      );
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId,
          username: data.user.name,
          email: data.user.email,
          mobile: data.user.mobile,
          photo,
          token,
          expiration,
          role,
        })
      );
      login(
        userId,
        data.user.email,
        data.user.mobile,
        data.user.name,
        photo,
        token,
        new Date(new Date().getTime() + 1000 * 60 * 60),
        role
      );
      onFinish();
    } catch (err) {}
  };

  return (
    <form className='form' onSubmit={submitHandler}>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Input
        element='input'
        id='name'
        type='text'
        label='Name'
        initialValid={true}
        initialValue={username}
        validators={[]}
        onInput={inputHandler}
      />

      <Input
        element='input'
        id='email'
        type='email'
        label='E-Mail'
        autoComplete='email'
        initialValue={email}
        initialValid={true}
        validators={[VALIDATOR_EMAIL()]}
        errorText='Please enter a valid email address.'
        onInput={inputHandler}
      />

      <Input
        element='input'
        id='mobile'
        type='mobile'
        label='Mobile'
        initialValid={true}
        initialValue={mobile}
        placeholder='+98-9120000000'
        validators={[VALIDATOR_MOBILE()]}
        errorText='Please enter a valid mobile number.'
        onInput={inputHandler}
      />

      <Button
        type='submit'
        disabled={!formState.isValid}
        className='form__submit'
      >
        Save
      </Button>
      <button type='button' className='form__cancel' onClick={onFinish}>
        Cancel
      </button>
    </form>
  );
};
export default EditAcountForm;
