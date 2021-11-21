import React, { useContext } from 'react';
import styled from 'styled-components';

import Accordion from './Accordion';
import { AuthContext } from '../../shared/context/auth-context';
import { setBoxShadow } from '../../shared/styledComponent/functions';
import { Screen } from '../../shared/styledComponent/mediaQueries';

const Accordions = ({ setFormName }) => {
  const { logout, user } = useContext(AuthContext);

  const renderAccordions = () => {
    if (user.role === 'user' || user.role === 'show-manager') {
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
          <Accordion
            id='7'
            label='Tickets'
            items={[
              {
                title: 'My Payments',
                onClick: () => setFormName('MyPayments'),
              },
              {
                title: 'My Tickets',
                onClick: () => setFormName('MyTickets'),
              },
            ]}
          />
        </div>
      );
    }
    if (user.role === 'admin') {
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
            label='Tickets'
            items={[
              {
                title: 'My Payments',
                onClick: () => setFormName('MyPayments'),
              },
              {
                title: 'My Tickets',
                onClick: () => setFormName('MyTickets'),
              },
            ]}
          />
        </div>
      );
    }
  };

  return <AccordionWrapper>{renderAccordions(user.role)}</AccordionWrapper>;
};

export default Accordions;

const AccordionWrapper = styled.div`
  max-height: 100%;
  grid-column: 2 / span 3;
  margin: 1rem 0 0 1rem;
  ${Screen.phone`
    grid-column: 3 / -3;
    margin: 2rem 0 ;
  `}
  .accordion-wrapper {
    overflow: hidden;
    ${setBoxShadow()}
  }
`;
