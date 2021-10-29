import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';

import {
  api,
  baseURL,
  randomApi,
  imageAddress,
} from '../../shared/apis/server';
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
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const AddEditShow = ({ editMode, show, onFinish, onEdit }) => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [artgroup, setartgroup] = useState(editMode && show.artGroup._id);
  const [manager, setmanager] = useState(editMode && show.manager[0]._id);
  const [artgroups, setartgroups] = useState([]);
  const [managers, setmanagers] = useState([]);
  const { token } = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: editMode && show.name,
        isValid: editMode,
      },
      description: {
        value: editMode && show.description,
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
  // get list of artgroups to render artgroup lists
  const getArtgroups = useCallback(async () => {
    const { data } = await api.get(`${baseURL}/artgroups?fields=name,_id`);
    setartgroups(data.data.data);
    !editMode && setartgroup(data.data.data[0]._id);
  }, [editMode]);

  // get list of managers to render manager lists
  const getManagers = useCallback(async () => {
    const { data } = await api.get(
      `${baseURL}/users?role=show-manager&fields=name,_id`,
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    setmanagers(data.data.data);
    !editMode && setmanager(data.data.data[0]._id);
  }, [token, editMode]);

  // set artgroups and managers state in first render
  useEffect(() => {
    getArtgroups();
    getManagers();
  }, [getArtgroups, getManagers]);

  // submit form
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
        onFinish();
      } else {
        await sendRequest(`${baseURL}/shows/${show._id}`, 'PATCH', formData, {
          authorization: `Bearer ${token}`,
        });
        onEdit();
      }
    } catch (err) {}
  };

  return (
    <Fragment>
      <Heading3>{`${!editMode ? 'Add New Show' : 'Edit Show'}`}</Heading3>
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
                ? `${imageAddress}/shows/${show.imageCover}`
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
              value={editMode ? show.artGroup._id : artgroup}
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
              value={editMode ? show.manager[0]._id : manager}
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

export default AddEditShow;
