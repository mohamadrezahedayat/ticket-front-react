import React, { useContext, useState } from 'react';

import MyTickets from '../components/MyTickets';
import Accordions from '../components/Accordions';
import GridLayout from '../components/GridLayout';
import MyPayments from '../components/MyPayments';
import AddEditShow from '../components/AddEditShow';
import ManageShows from '../components/ManageShows';
import ManageUsers from '../components/ManageUsers';
import AddEditEvent from '../components/AddEditEvent';
import ManageEvents from '../components/ManageEvents';
import FormContainer from '../components/FormContainer';
import ChangePassword from '../components/ChangePassword';
import EditAccountForm from '../components/EditAccountForm';
import AddEditArtgroup from '../components/AddEditArtgroup';
import ManageArtgroups from '../components/ManageArtgroups';
import ManageLocations from '../components/ManageLocations';
import AddEditLocation from '../components/AddEditLocation';
import EditProfilePhoto from '../components/EditProfilePhoto';
import { AuthContext } from '../../shared/context/auth-context';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import { imageAddress, randomApi } from '../../shared/apis/server';

const Account = () => {
  const { user } = useContext(AuthContext);
  const [formName, setFormName] = useState(false);

  const getUserPhoto = () => {
    if (!user.photo || user.photo === 'default.jpg') return randomApi(user._id);
    if (user.photo.startsWith('user-'))
      return `${imageAddress}/users/${user.photo}`;
    return user.photo;
  };

  const renderForm = () => {
    let form, header;

    switch (formName) {
      case 'EditAccountForm':
        form = <EditAccountForm onFinish={() => setFormName('')} />;
        header = 'Edit Account information';
        break;
      case 'EditProfilePhoto':
        form = <EditProfilePhoto onFinish={() => setFormName('')} />;
        header = 'Add / replace profile photo';
        break;
      case 'ChangePassword':
        form = <ChangePassword onFinish={() => setFormName('')} />;
        header = 'Change Password';
        break;
      case 'ManageUsers':
        form = <ManageUsers />;
        header = 'Manage Users';
        break;
      case 'AddEditArtgroup':
        form = (
          <AddEditArtgroup
            onFinish={() => {
              setFormName('ManageArtgroups');
            }}
          />
        );
        header = 'Add Artgroup';
        break;
      case 'ManageArtgroups':
        form = <ManageArtgroups />;
        header = 'manage Artgroups';
        break;
      case 'AddEditShow':
        form = <AddEditShow onFinish={() => setFormName('ManageShows')} />;
        header = 'add show';
        break;
      case 'ManageShows':
        form = <ManageShows />;
        header = 'manage shows';
        break;
      case 'AddEditLocation':
        form = (
          <AddEditLocation onFinish={() => setFormName('ManageLocations')} />
        );
        header = 'add location';
        break;
      case 'ManageLocations':
        form = <ManageLocations />;
        header = 'manage locations';
        break;
      case 'AddEditEvent':
        form = <AddEditEvent onFinish={() => setFormName('ManageEvents')} />;
        header = 'add event';
        break;
      case 'ManageEvents':
        form = <ManageEvents onFinish={() => setFormName('ManageEvents')} />;
        header = 'manage events';
        break;
      case 'MyPayments':
        form = <MyPayments />;
        header = 'my payments';
        break;
      case 'MyTickets':
        form = <MyTickets />;
        header = 'my tickets';
        break;

      default:
        form = (
          <div className='acount-view'>
            <div className='acount-view__detail'></div>
            <img
              className='acount-view__photo'
              src={getUserPhoto()}
              alt={user.name}
            />
          </div>
        );
    }

    return (
      <FormContainer
        gridColumn='6 / -2'
        gridColumnTabLand='5 / -2'
        header={header ? header : user.name}
      >
        {form}
      </FormContainer>
    );
  };

  return (
    <GridLayout className='main-grid'>
      <Sidebar />
      <Accordions setFormName={setFormName} />
      {renderForm()}
    </GridLayout>
  );
};

export default Account;
