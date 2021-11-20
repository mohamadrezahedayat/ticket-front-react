import React, { useState, useEffect, useCallback } from 'react';

import {
  api,
  baseURL,
  randomApi,
  imageAddress,
} from '../../shared/apis/server';
import Table from './Table';
import AddEditArtgroup from './AddEditArtgroup';
import { DeleteIcon, Edit } from '../../shared/components/UIElements/Svgs';

const ManageArtgroups = () => {
  const [name, setname] = useState();
  const [crew, setcrew] = useState();
  const [leader, setleader] = useState();
  const [artGroups, setartGroups] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [description, setdescription] = useState();
  const [activeArtGroup, setactiveArtGroup] = useState(false);

  const getArtGroups = useCallback(async () => {
    let like = `like=and[`;
    like += `name=${name || '.'},`;
    like += `leader=${leader || '.'},`;
    like += `crew=${crew || '.'},`;
    like += `description=${description || '.'}`;
    like += `]`;
    const { data } = await api.get(`${baseURL}/artgroups?${like}&limit=20`);
    setartGroups(data.data.data);
  }, [crew, description, leader, name]);

  const deleteArtGroupHandler = async (artGroup) => {
    const { data } = await api.get(`${baseURL}/shows?artGroup=${artGroup._id}`);
    if (data.results === 0) {
      await api.delete(`${baseURL}/artgroups/${artGroup._id}`);
      getArtGroups();
    } else console.log(`Can't delete! \nthis artist has ${data.results} shows`);
    // todo throws error and remove console.log()
  };

  useEffect(() => {
    const timeout = setTimeout(getArtGroups, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [getArtGroups, editMode]);

  const editArtGroupHandler = (artGroup) => {
    seteditMode(true);
    setactiveArtGroup(artGroup);
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
            value={leader}
            onChange={(e) => setleader(e.target.value)}
            placeholder='leader'
          />
        </th>
        <th>
          <input
            value={crew}
            onChange={(e) => setcrew(e.target.value)}
            placeholder='crew'
          />
        </th>
        <th>
          <input
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder='description'
          />
        </th>
        <th>profile</th>
        <th>action</th>
      </>
    );
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
              <Edit
                className='edit__button'
                onClick={() => {
                  editArtGroupHandler(artGroup);
                }}
              />
              <DeleteIcon
                className='delete__button'
                onClick={() => deleteArtGroupHandler(artGroup)}
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
      {!editMode && renderTable()}
      {editMode && (
        <AddEditArtgroup
          editMode='true'
          artGroup={activeArtGroup}
          onEdit={() => seteditMode(false)}
        />
      )}
    </>
  );
};

export default ManageArtgroups;
