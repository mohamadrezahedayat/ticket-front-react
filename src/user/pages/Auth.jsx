import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MOBILE,
} from '../../shared/util/validators';
import {
  setBackground,
  setBackgroundColor,
  setBoxShadow,
} from '../../shared/styledComponent/functions';
import userImage from '../../img/user.jpg';
import { baseURL } from '../../shared/apis/server';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/components/FormElements/Input';
import { AuthContext } from '../../shared/context/auth-context';
import { Colors } from '../../shared/styledComponent/variables';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

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
        const { data, token } = responseData;
        login(
          data.user._id,
          data.user.email,
          data.user.mobile,
          data.user.name,
          data.user.photo,
          token,
          new Date(new Date().getTime() + 1000 * 60 * 60),
          data.user.role
        );
        history.push('/account');
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        const { image, email, name, mobile, password, passwordConfirm } =
          formState.inputs;

        if (formState.inputs.image.value)
          formData.append('photo', image.value[0]);

        formData.append('email', email.value);
        formData.append('name', name.value);
        formData.append('mobile', mobile.value);
        formData.append('password', password.value);
        formData.append('passwordConfirm', passwordConfirm.value);
        const { data, token } = await sendRequest(
          `${baseURL}/users/signup`,
          'POST',
          formData
        );

        login(
          data.user._id,
          data.user.email,
          data.user.mobile,
          data.user.name,
          data.user.photo,
          token,
          new Date(new Date().getTime() + 1000 * 60 * 60),
          data.user.role
        );

        history.push('/account');
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
    <Container className='auth-page-container'>
      <Sidebar />
      <div className='form-container'>
        <ErrorModal error={error} onClear={clearError} />
        <div className='sign-form-container'>{authForm}</div>
      </div>
    </Container>
  );
};

export default Auth;

const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  display: grid;
  grid-template-columns:
    [sidebar-start] 8rem [sidebar-end full-start] 1fr [center-start]
    repeat(8, [col-start] minmax(min-content, 12rem) [col-end])
    [center-end] 1fr [full-end];

  ${setBackground({ img: userImage, color: `${Colors.primary}70` })}

  .form-container {
    display: grid;
    grid-column: col-start 1 / col-end 8;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    padding: 5rem;
    grid-gap: 5rem;
  }

  & .sign-form-container {
    display: inline-block;
    ${setBackgroundColor(`${Colors.greyLight1}35`)}
    padding: 3rem;
    border-radius: 2rem;
    ${setBoxShadow({ x: '1rem', y: '1rem', z: '1rem', color: 'fff4' })}
    align-self: center;
    overflow: auto;
    position: relative;
  }
`;
