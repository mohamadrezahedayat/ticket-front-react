import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { baseURL } from '../../shared/apis/server';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MOBILE,
} from '../../shared/util/validators';

const Auth = () => {
  const { login } = useContext(AuthContext);

  const history = useHistory();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          mobile: undefined,
          image: undefined,
          passwordConfirm: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: true,
          },
          image: {
            value: null,
            isValid: true,
          },
          mobile: {
            value: null,
            isValid: false,
          },
          passwordConfirm: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${baseURL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        login(
          responseData.data.user._id,
          responseData.data.user.email,
          responseData.data.user.mobile,
          responseData.data.user.name,
          responseData.data.user.photo,
          responseData.token,
          new Date(new Date().getTime() + 1000 * 60 * 60),
          responseData.data.user.role
        );
        history.push('/');
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        if (formState.inputs.image.value)
          formData.append('photo', formState.inputs.image.value[0]);

        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('mobile', formState.inputs.mobile.value);
        formData.append('password', formState.inputs.password.value);
        formData.append(
          'passwordConfirm',
          formState.inputs.passwordConfirm.value
        );
        const responseData = await sendRequest(
          `${baseURL}/users/signup`,
          'POST',
          formData
        );
        login(
          responseData.data.user._id,
          responseData.data.user.email,
          responseData.data.user.mobile,
          responseData.data.user.name,
          responseData.data.user.photo,
          responseData.token,
          new Date(new Date().getTime() + 1000 * 60 * 60),
          responseData.data.user.role
        );
        history.push('/');
      } catch (err) {}
    }
  };

  const authForm = (
    <form className='form' onSubmit={authSubmitHandler}>
      <h3 className='heading-3'>
        {!isLoginMode ? 'Create An Acount' : 'Login To Your Acount'}
      </h3>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoginMode && (
        <Input
          element='input'
          id='name'
          type='text'
          label='Name'
          validators={[]}
          onInput={inputHandler}
        />
      )}
      <Input
        element='input'
        id='email'
        type='email'
        label='E-Mail'
        autoComplete='email'
        validators={[VALIDATOR_EMAIL()]}
        errorText='Please enter a valid email address.'
        onInput={inputHandler}
      />
      {!isLoginMode && (
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
      )}
      {isLoginMode && (
        <Link to='forgotPassword' className='form__input--inline'>
          FORGOT PASSWORD?
        </Link>
      )}

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
      {!isLoginMode && (
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
      )}
      {!isLoginMode && (
        <ImageUpload
          center
          id='image'
          onInput={inputHandler}
          errorText='Please provide a profile image.'
        />
      )}
      <Button
        type='submit'
        disabled={!formState.isValid}
        className='form__submit'
      >
        {isLoginMode ? 'LOG IN' : 'SIGN UP'}
      </Button>

      {isLoginMode ? (
        <h4>
          Don't have an acount?
          <span onClick={switchModeHandler} className='form__input--inline'>
            Sign up
          </span>
        </h4>
      ) : (
        <h4>
          Do you have an acount?
          <span onClick={switchModeHandler} className='form__input--inline'>
            Log in
          </span>
        </h4>
      )}
    </form>
  );

  return (
    <div className='auth-page-container'>
      <Sidebar />
      <div className='form-container'>
        <ErrorModal error={error} onClear={clearError} />
        <div className='sign-form-container'>{authForm}</div>
      </div>
    </div>
  );
};

export default Auth;
