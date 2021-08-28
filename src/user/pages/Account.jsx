import React, { useContext, useState } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import Accordion from '../components/Accordion';
import EditAccountForm from '../components/EditAccountForm';
import { imageAddress, randomApi } from '../../shared/apis/server';
import EditProfilePhoto from '../components/EditProfilePhoto';
import ManageUsers from '../components/ManageUsers';
import ChangePassword from '../components/ChangePassword';
import AddEditArtgroup from '../components/AddEditArtgroup';
import ManageArtgroups from '../components/ManageArtgroups';
import AddEditShow from '../components/AddEditShow';
import ManageShows from '../components/ManageShows';
import AddEditLocation from '../components/AddEditLocation';
import ManageLocations from '../components/ManageLocations';
import AddEditEvent from '../components/AddEditEvent';
import ManageEvents from '../components/ManageEvents';

const Account = () => {
  const { logout, username, userPhoto, role, userId } = useContext(AuthContext);

  const [formName, setFormName] = useState(false);

  const renderForm = () => {
    switch (formName) {
      case 'EditAccountForm':
        return <EditAccountForm onFinish={() => setFormName('')} />;
      case 'EditProfilePhoto':
        return <EditProfilePhoto onFinish={() => setFormName('')} />;
      case 'ChangePassword':
        return <ChangePassword onFinish={() => setFormName('')} />;
      case 'ManageUsers':
        return <ManageUsers />;
      case 'AddEditArtgroup':
        return (
          <AddEditArtgroup onFinish={() => setFormName('ManageArtgroups')} />
        );
      case 'ManageArtgroups':
        return <ManageArtgroups />;
      case 'AddEditShow':
        return <AddEditShow onFinish={() => setFormName('ManageShows')} />;
      case 'ManageShows':
        return <ManageShows />;
      case 'AddEditLocation':
        return (
          <AddEditLocation onFinish={() => setFormName('ManageLocations')} />
        );
      case 'ManageLocations':
        return <ManageLocations />;
      case 'AddEditEvent':
        return <AddEditEvent onFinish={() => setFormName('ManageEvents')} />;
      case 'ManageEvents':
        return <ManageEvents onFinish={() => setFormName('ManageEvents')} />;

      default:
        return (
          <div className='acount-view'>
            <div className='acount-view__detail'>
              <h3>{username}</h3>
            </div>
            <img
              className='acount-view__photo'
              src={
                userPhoto && userPhoto !== 'default.jpg'
                  ? `${imageAddress}users/${userPhoto}`
                  : randomApi(userId)
              }
              alt={username}
            />
          </div>
        );
    }
  };

  const renderAccordions = () => {
    if (role === 'user') {
      return (
        <div className='accordion-wrapper'>
          <Accordion
            checked
            id='1'
            label='Acount Settings'
            items={[
              {
                title: 'edit account information',
                onClick: () => setFormName('EditAccountForm'),
              },
              {
                title: 'Add/Replace profile photo',
                onClick: () => setFormName('EditProfilePhoto'),
              },
              {
                title: 'change password',
                onClick: () => setFormName('ChangePassword'),
              },
              { title: 'sign out', onClick: logout },
            ]}
          />
        </div>
      );
    }
    if (role === 'admin') {
      return (
        <div className='accordion-wrapper'>
          <Accordion
            id='1'
            label='Acount Settings'
            items={[
              {
                title: 'edit account information',
                onClick: () => setFormName('EditAccountForm'),
              },
              {
                title: 'Add/Replace profile photo',
                onClick: () => setFormName('EditProfilePhoto'),
              },
              {
                title: 'change password',
                onClick: () => setFormName('ChangePassword'),
              },
              { title: 'sign out', onClick: logout },
            ]}
          />
          <Accordion
            id='2'
            label='User Settings'
            items={[
              {
                title: 'Manage Users',
                onClick: () => setFormName('ManageUsers'),
              },
            ]}
          />
          <Accordion
            id='3'
            label='Artgroups Settings'
            items={[
              {
                title: 'Add New Artgroup',
                onClick: () => setFormName('AddEditArtgroup'),
              },
              {
                title: 'Manage Artgroups',
                onClick: () => setFormName('ManageArtgroups'),
              },
            ]}
          />
          <Accordion
            id='4'
            label='Show Settings'
            items={[
              {
                title: 'Add New Show',
                onClick: () => setFormName('AddEditShow'),
              },
              {
                title: 'Manage Shows',
                onClick: () => setFormName('ManageShows'),
              },
            ]}
          />
          <Accordion
            id='5'
            label='Location Settings'
            items={[
              {
                title: 'Add New Location',
                onClick: () => setFormName('AddEditLocation'),
              },
              {
                title: 'Manage Locations',
                onClick: () => setFormName('ManageLocations'),
              },
            ]}
          />
          <Accordion
            id='6'
            label='Event Settings'
            items={[
              {
                title: 'Add New Event',
                onClick: () => setFormName('AddEditEvent'),
              },
              {
                title: 'Manage Events',
                onClick: () => setFormName('ManageEvents'),
              },
            ]}
          />

          <Accordion
            id='7'
            label='ticket Settings'
            items={[{ title: 'edit account information', to: '' }]}
          />
          <Accordion
            id='8'
            label='review Settings'
            items={[{ title: 'edit account information', to: '' }]}
          />
          <Accordion
            id='9'
            label='other Settings'
            items={[{ title: 'edit account information', to: '' }]}
          />
        </div>
      );
    }
  };

  return (
    <div className='auth-page-container'>
      <Sidebar />
      <div className='acount-nav'>{renderAccordions()}</div>
      <div className='form-container--acount'>
        <div className='sign-form-container'>{renderForm()}</div>
      </div>
    </div>
  );
};

export default Account;
