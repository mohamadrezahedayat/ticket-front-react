import React, { useState, useEffect, useCallback } from 'react';

import { api, randomApi, imageAddress } from '../../shared/apis/server';
import { DeleteIcon, Edit } from '../../shared/components/UIElements/Svgs';
import { Heading3 } from '../../shared/styledComponent/Typography';
import AddEditLocation from './AddEditLocation';
import Table from './Table';

const ManageLocations = () => {
  const [name, setname] = useState();
  const [type, settype] = useState();
  const [city, setcity] = useState();
  const [address, setaddress] = useState();
  const [locations, setlocations] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [description, setdescription] = useState();
  const [activeLocation, setactiveLocation] = useState(false);

  const getLocations = useCallback(async () => {
    let like = `like=and[`;
    like += `name=${name || '.'},`;
    like += `type=${type || '.'},`;
    like += `city=${city || '.'},`;
    like += `address=${address || '.'},`;
    like += `description=${description || '.'}`;
    like += `]`;
    const { data } = await api.get(`/locations?${like}&limit=20`);
    setlocations(data.data.data);
  }, [address, city, description, name, type]);

  const deleteLocationHandler = async (location) => {
    const { data } = await api.get(`/events?location=${location._id}`);
    if (data.results === 0) {
      await api.delete(`/locations/${location._id}`);
      getLocations();
    } else
      console.log(`Can't delete! \nthis location has ${data.results} events`);
    // todo throws error and remove console.log()
  };

  useEffect(() => {
    const timeout = setTimeout(getLocations, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [getLocations, editMode]);

  const editLocationHandler = (location) => {
    seteditMode(true);
    setactiveLocation(location);
  };

  const renderHeader = () => {
    return (
      <>
        <th>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder='name'
          />
        </th>
        <th>
          <input
            value={type}
            onChange={(e) => settype(e.target.value)}
            placeholder='type'
          />
        </th>
        <th>
          <input
            value={city}
            onChange={(e) => setcity(e.target.value)}
            placeholder='city'
          />
        </th>
        <th>
          <input
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            placeholder='address'
          />
        </th>
        <th>
          <input
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder='description'
          />
        </th>
        <th>image</th>
        <th>action</th>
      </>
    );
  };

  const renderBody = () => {
    return (
      locations &&
      locations.map((location) => {
        return (
          <tr key={location._id}>
            <td>{location.name.slice(0, 40)}...</td>
            <td>{location.type}</td>
            <td>{location.city}</td>
            <td>{location.address.slice(0, 40)}...</td>
            <td>{location.description.slice(0, 40)}...</td>
            <td>
              <img
                src={
                  location.images.length !== 0 &&
                  location.images[0] !== 'default.jpg'
                    ? `${imageAddress}/locations/${location.images[0]}`
                    : randomApi(location._id)
                }
                alt='location'
              />
            </td>
            <td className='opration'>
              <Edit
                className='edit__button'
                onClick={() => editLocationHandler(location)}
              />
              <DeleteIcon
                className='delete__button'
                onClick={() => deleteLocationHandler(location)}
              />
            </td>
          </tr>
        );
      })
    );
  };

  const renderTable = () => {
    return (
      <Table
        className='table'
        headers={renderHeader()}
        body={renderBody()}
      ></Table>
    );
  };
  return (
    <>
      {!editMode && <Heading3>Manage Locations</Heading3>}
      {!editMode && renderTable()}
      {editMode && (
        <AddEditLocation
          editMode='true'
          location={activeLocation}
          onEdit={() => seteditMode(false)}
        />
      )}
    </>
  );
};

export default ManageLocations;
