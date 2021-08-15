import React, { useContext } from 'react';

import Input from '../../shared/components/FormElements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { baseURL } from '../../shared/apis/server';
import { VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const ChangePassword = ({ onFinish }) => {
  const { token } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      passwordCurrent: {
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
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${baseURL}/users/updateMyPassword`,
        'PATCH',
        JSON.stringify({
          password: formState.inputs.password.value,
          passwordConfirm: formState.inputs.passwordConfirm.value,
          passwordCurrent: formState.inputs.passwordCurrent.value,
        }),
        {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        }
      );

      onFinish();
    } catch (err) {}
  };

  return (
    <form className='form' onSubmit={submitHandler}>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <h3 className='heading-3'>Change Your Password</h3>
      <Input
        element='input'
        id='passwordCurrent'
        type='password'
        label='Password Current'
        autoComplete='current-password'
        validators={[VALIDATOR_MINLENGTH(8)]}
        errorText='Please enter your current password, at least 8 characters.'
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
        autoComplete='current-password'
        validators={[VALIDATOR_MINLENGTH(8)]}
        errorText='Please confirm your password, at least 8 characters.'
        onInput={inputHandler}
      />

      <Button
        type='submit'
        disabled={!formState.isValid}
        className='form__submit'
      >
        Save
      </Button>
    </form>
  );
};
export default ChangePassword;
