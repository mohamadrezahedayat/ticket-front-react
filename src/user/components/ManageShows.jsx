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
import AddEditArtgroup from './AddEditArtgroup';

const ManageShows = () => {
  const { token } = useContext(AuthContext);
  const [shows, setshows] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [activeShow, setactiveShow] = useState(false);

  const getShows = useCallback(async () => {
    const response = await api.get(`${baseURL}/shows`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setshows(response.data.data.data);
  }, [token]);

  const deleteShowHandler = async (show) => {
    await api.delete(`${baseURL}/shows/${show._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getShows();
  };

  useEffect(() => {
    getShows();
  }, [getShows, editMode]);

  const editShowHandler = (show) => {
    seteditMode(true);
    setactiveShow(show);
  };

  const renderHeader = () => {
    let headerElement = [
      'name',
      'description',
      'artGroup',
      'manager',
      'imageCover',
      'operation',
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      shows &&
      shows.map((show) => {
        return (
          <tr key={show._id}>
            <td>{show.name}</td>
            <td>{show.description}</td>
            <td>{show.artGroup}</td>
            <td>{show.manager}</td>
            <td>
              <img
                src={
                  show.images.length !== 0 && show.imageCover !== 'default.jpg'
                    ? `${imageAddress}/shows/${show.imageCover}`
                    : randomApi(show._id)
                }
                alt='profile'
              />
            </td>
            <td className='opration'>
              <button
                className='opration__button'
                onClick={() => editShowHandler(show)}
              >
                Edit
              </button>
              <button
                className='opration__button--danger'
                onClick={() => deleteShowHandler(show)}
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
      <table className='table'>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    );
  };
  return (
    <Fragment>
      <h3 className='heading-3'>{`${!editMode ? 'Manage Show' : ''}`}</h3>
      {!editMode && renderTable()}
      {editMode && (
        <AddEditArtgroup
          editMode='true'
          show={activeShow}
          onEdit={() => seteditMode(false)}
        />
      )}
    </Fragment>
  );
};

export default ManageShows;
