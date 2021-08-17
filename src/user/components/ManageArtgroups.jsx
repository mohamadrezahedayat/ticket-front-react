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

const ManageArtgroups = () => {
  const { token } = useContext(AuthContext);
  const [artGroups, setartGroups] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [activeArtGroup, setactiveArtGroup] = useState(false);

  const getArtGroups = useCallback(async () => {
    const response = await api.get(`${baseURL}/artgroups`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setartGroups(response.data.data.data);
  }, [token]);

  const deleteArtGroupHandler = async (artGroup) => {
    await api.delete(`${baseURL}/artgroups/${artGroup._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    getArtGroups();
  };

  useEffect(() => {
    getArtGroups();
  }, [getArtGroups, editMode]);

  const editArtGroupHandler = (artGroup) => {
    seteditMode(true);
    setactiveArtGroup(artGroup);
  };

  const renderHeader = () => {
    let headerElement = [
      'name',
      'leader',
      'crew',
      'description',
      'profile',
      'operation',
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      artGroups &&
      artGroups.map((artGroup) => {
        return (
          <tr key={artGroup._id}>
            <td>{artGroup.name}</td>
            <td>{artGroup.leader}</td>
            <td>{artGroup.crew}</td>
            <td>{artGroup.description}</td>
            <td>
              <img
                src={
                  artGroup.images.length !== 0 &&
                  artGroup.images[0] !== 'default.jpg'
                    ? `${imageAddress}/artists/${artGroup.images[0]}`
                    : randomApi(artGroup._id)
                }
                alt='profile'
              />
            </td>
            <td className='opration'>
              <button
                className='opration__button'
                onClick={() => editArtGroupHandler(artGroup)}
              >
                Edit
              </button>
              <button
                className='opration__button--danger'
                onClick={() => deleteArtGroupHandler(artGroup)}
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
      <h3 className='heading-3'>{`${!editMode ? 'Manage ArtGroup' : ''}`}</h3>
      {!editMode && renderTable()}
      {editMode && (
        <AddEditArtgroup
          editMode='true'
          artGroup={activeArtGroup}
          onEdit={() => seteditMode(false)}
        />
      )}
    </Fragment>
  );
};

export default ManageArtgroups;
