import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  Fragment,
} from 'react';
import {
  api,
  baseURL,
  imageAddress,
  randomApi,
} from '../../shared/apis/server';
import { AuthContext } from '../../shared/context/auth-context';
import AddEditLocation from './AddEditLocation';
import Table from './Table';

const ManageLocations = () => {
  const { token } = useContext(AuthContext);
  const [locations, setlocations] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [activeLocation, setactiveLocation] = useState(false);

  const getLocations = useCallback(async () => {
    const response = await api.get(`${baseURL}/locations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setlocations(response.data.data.data);
  }, [token]);

  const deleteLocationHandler = async (location) => {
    await api.delete(`${baseURL}/locations/${location._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getLocations();
  };

  useEffect(() => {
    getLocations();
  }, [getLocations, editMode]);

  const editLocationHandler = (location) => {
    seteditMode(true);
    setactiveLocation(location);
  };

  const renderHeader = () => {
    let headerElement = [
      'Name',
      'Type',
      'City',
      'Address',
      'Description',
      'Image',
      'Operation',
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  };

  const renderBody = () => {
    return (
      locations &&
      locations.map((location) => {
        return (
          <tr key={location._id}>
            <td>{location.name}</td>
            <td>{location.type}</td>
            <td>{location.city}</td>
            <td>{location.address}</td>
            <td>{location.description}</td>
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
              <button
                className='opration__button'
                onClick={() => editLocationHandler(location)}
              >
                Edit
              </button>
              <button
                className='opration__button--danger'
                onClick={() => deleteLocationHandler(location)}
              >
                Delete
              </button>
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
    <Fragment>
      <h3 className='heading-3'>{`${!editMode ? 'Manage Location' : ''}`}</h3>
      {!editMode && renderTable()}
      {editMode && (
        <AddEditLocation
          editMode='true'
          location={activeLocation}
          onEdit={() => seteditMode(false)}
        />
      )}
    </Fragment>
  );
};

export default ManageLocations;
