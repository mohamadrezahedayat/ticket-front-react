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
import FormContainer from '../components/FormContainer';

const Account = () => {
  const { username, userPhoto, userId } = useContext(AuthContext);
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
      case 'MyPayments':
        return <MyPayments />;
      case 'MyTickets':
        return <MyTickets />;

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

  return (
    <GridLayout>
      <Sidebar />
      <Accordions setFormName={setFormName} />
      <FormContainer gridColumn='6 / -2' gridColumnTabLand='5 / -2'>
        {renderForm()}
      </FormContainer>
    </GridLayout>
  );
};

export default Account;
