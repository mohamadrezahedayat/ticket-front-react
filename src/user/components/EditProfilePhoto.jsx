import React, { useContext } from 'react';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { baseURL, imageAddress } from '../../shared/apis/server';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const EditProfilePhoto = ({ onFinish }) => {
  const { token, login, userPhoto } = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('photo', formState.inputs.image.value[0]);
      const responseData = await sendRequest(
        `${baseURL}/users/updateMe`,
        'PATCH',
        formData,
        {
          authorization: `Bearer ${token}`,
        }
      );
      const { email, mobile, username, expiration, userId, role } = JSON.parse(
        localStorage.getItem('userData')
      );
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId,
          username,
          email,
          mobile,
          photo: responseData.data.user.photo,
          token,
          expiration,
          role,
        })
      );
      login(
        userId,
        email,
        mobile,
        username,
        responseData.data.user.photo,
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
      <h3 className='heading-3'>Edit Your Profile photo</h3>
      <ImageUpload
        imageUrl={`${imageAddress}users/${userPhoto}`}
        center
        id='image'
        onInput={inputHandler}
        errorText='Please provide a profile image.'
      />
      <Button
        type='submit'
        disabled={!formState.isValid}
        className='form__submit'
      >
        Save Profile Image
      </Button>
      <button type='button' className='form__cancel' onClick={onFinish}>
        Cancel
      </button>
    </form>
  );
};
export default EditProfilePhoto;
