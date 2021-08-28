import React, {
  Fragment,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  baseURL,
  randomApi,
  imageAddress,
  api,
} from '../../shared/apis/server';
import { AuthContext } from '../../shared/context/auth-context';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';

const AddEditShow = ({ editMode, show, onFinish, onEdit }) => {
  const { token } = useContext(AuthContext);
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [artgroups, setartgroups] = useState([]);
  const [artgroup, setartgroup] = useState();
  const [managers, setmanagers] = useState([]);
  const [manager, setmanager] = useState();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: editMode ? show.name : '',
        isValid: editMode,
      },
      description: {
        value: editMode ? show.description : '',
        isValid: true,
      },
      imageCover: {
        value: null,
        isValid: true,
      },
      images: {
        value: null,
        isValid: true,
      },
    },
    editMode
  );

  const getArtgroups = useCallback(async () => {
    const response = await api.get(`${baseURL}/artgroups?fields=name,_id`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setartgroups(response.data.data.data);
    setartgroup(response.data.data.data[0]._id);
  }, [token]);

  const getManagers = useCallback(async () => {
    const response = await api.get(
      `${baseURL}/users?role=show-manager&fields=name,_id`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    setmanagers(response.data.data.data);
    setmanager(response.data.data.data[0]._id);
  }, [token]);

  useEffect(() => {
    getArtgroups();
    getManagers();
  }, [getArtgroups, getManagers]);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);

      if (formState.inputs.description.value)
        formData.append('description', formState.inputs.description.value);

      if (formState.inputs.images.value)
        for (let i = 0; i < formState.inputs.images.value.length; i++) {
          formData.append('images', formState.inputs.images.value[i]);
        }
      if (formState.inputs.imageCover.value)
        formData.append('imageCover', formState.inputs.imageCover.value[0]);

      formData.append('manager', manager);
      formData.append('artGroup', artgroup);

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
        <div className='form__image-uplader-container'>
          <ImageUpload
            className='form__input--inline'
            imageUrl={
              editMode
                ? `${imageAddress}/shows/${show.images[0]}`
                : randomApi('show')
            }
            initialValid={editMode}
            center
            id='imageCover'
            onInput={inputHandler}
            errorText='Select show image cover.'
          />
          <ImageUpload
            className='form__input--inline'
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
            errorText='Select Show Images.'
          />
        </div>

        <div className='form__select-container'>
          <div className='form__input--sidebyside'>
            <label htmlFor='artgroup'>Artgroup</label>
            <select
              id='artgroup'
              value={artgroup}
              onChange={(e) => setartgroup(e.target.value)}
            >
              {artgroups &&
                artgroups.map((artgroup, i) => (
                  <option value={artgroup._id} key={artgroup._id}>
                    {artgroup.name}
                  </option>
                ))}
            </select>
          </div>
          <div className='form__input--sidebyside'>
            <label htmlFor='manager'>Manager</label>
            <select
              id='manager'
              value={manager}
              onChange={(e) => {
                setmanager(e.target.value);
              }}
            >
              {managers &&
                managers.map((manager) => (
                  <option value={manager._id} key={manager._id}>
                    {manager.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
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
