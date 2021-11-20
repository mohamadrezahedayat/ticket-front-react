import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MOBILE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import GridLayout from '../components/GridLayout';
import { baseURL } from '../../shared/apis/server';
import Div from '../../shared/styledComponent/Div';
import { useForm } from '../../shared/hooks/form-hook';
import FormContainer from '../components/FormContainer';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/components/FormElements/Input';
import { Colors } from '../../shared/styledComponent/variables';
import { AuthContext } from '../../shared/context/auth-context';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import Button from '../../shared/components/FormElements/Button';
import { GoogleIcon } from '../../shared/components/UIElements/Svgs';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { Span, Heading4 } from '../../shared/styledComponent/Typography';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Auth = () => {
  const history = useHistory();
  const { login } = useContext(AuthContext);
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
        const { data } = responseData;
        login(
          data.user._id,
          data.user.email,
          data.user.mobile,
          data.user.name,
          data.user.photo,
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
        const { data } = await sendRequest(
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
          new Date(new Date().getTime() + 1000 * 60 * 60),
          data.user.role
        );

        history.push('/account');
      } catch (err) {}
    }
  };

  return (
    <GridLayout>
      <Sidebar />
      <FormContainer
        gridColumn='3 / -3'
        header={!isLoginMode ? 'Create An Acount' : 'Login To Your Acount'}
      >
        <ErrorModal error={error} onClear={clearError} />
        <form className='form' onSubmit={authSubmitHandler}>
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
            <Span textAlign='right' SingleMargin='bottom,-2.5rem'>
              <Link to='forgotPassword'>Forgot Password?</Link>
            </Span>
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
            <Heading4 SingleMargin='top,.5rem'>
              Don't have an acount?
              <Span onClick={switchModeHandler} fontWeight='600'>
                &nbsp;Sign up
              </Span>
            </Heading4>
          ) : (
            <Heading4 SingleMargin='top,.5rem'>
              Do you have an acount?
              <Span onClick={switchModeHandler} fontWeight='600'>
                &nbsp;Log in
              </Span>
            </Heading4>
          )}
        </form>
        {
          <Div
            border={{
              position: 'top',
              width: '1px',
              style: 'solid',
              color: `${Colors.primary}`,
            }}
            width='100%'
            SingleMargin='top,1rem'
            row
          >
            <Heading4>
              {true ? 'Log out from Google' : 'Login with Google'}
            </Heading4>
            <GoogleIcon className='googleIcon' onClick={() => {}} />
          </Div>
        }
      </FormContainer>
    </GridLayout>
  );
};

export default Auth;
