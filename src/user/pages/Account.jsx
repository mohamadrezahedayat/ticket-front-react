import React, { useContext, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import Accordion from '../components/Accordion';
import EditAccountForm from '../components/EditAccountForm';
import { imageAddress } from '../../shared/apis/server';
import EditProfilePhoto from '../components/EditProfilePhoto';
import ChangePassword from '../components/ChangePassword';
// import AddUser from '../components/AddUser';
import ManageUsers from '../components/ManageUsers';
const Account = () => {
  const { logout, username, userPhoto, role } = useContext(AuthContext);

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
        return <ManageUsers onFinish={() => setFormName('')} />;

      default:
        return (
          <div className='acount-view'>
            <div className='acount-view__detail'>
              <h3>{username}</h3>
            </div>
            <img
              className='acount-view__photo'
              src={`${imageAddress}users/${userPhoto}`}
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
            label='Show Settings'
            items={[{ title: 'edit account information', to: '' }]}
          />
          <Accordion
            id='9'
            label='Artgroups Settings'
            items={[{ title: 'edit account information', to: '' }]}
          />
          <Accordion
            id='4'
            label='Event Settings'
            items={[{ title: 'edit account information', to: '' }]}
          />
          <Accordion
            id='5'
            label='Location Settings'
            items={[{ title: 'edit account information', to: '' }]}
          />
          <Accordion
            id='6'
            label='ticket Settings'
            items={[{ title: 'edit account information', to: '' }]}
          />
          <Accordion
            id='7'
            label='review Settings'
            items={[{ title: 'edit account information', to: '' }]}
          />
          <Accordion
            id='8'
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
