import React, { useState, useEffect, useCallback } from 'react';

import {
  api,
  baseURL,
  randomApi,
  imageAddress,
} from '../../shared/apis/server';
import { DeleteIcon, Edit } from '../../shared/components/UIElements/Svgs';
import AddEditShow from './AddEditShow';
import Table from './Table';

const ManageShows = () => {
  const [name, setname] = useState();
  const [shows, setshows] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [description, setdescription] = useState();
  const [activeShow, setactiveShow] = useState(false);

  const getShows = useCallback(async () => {
    let like = `like=and[`;
    like += `name=${name || '.'},`;
    like += `description=${description || '.'}`;
    like += `]`;
    const { data } = await api.get(`${baseURL}/shows?${like}&limit=20`);
    setshows(data.data.data);
  }, [description, name]);

  const deleteShowHandler = async (show) => {
    const { data } = await api.get(`${baseURL}/events?show=${show._id}`);
    if (data.results === 0) {
      await api.delete(`${baseURL}/shows/${show._id}`);
      getShows();
    } else console.log(`Can't delete! \nthis show has ${data.results} events`);
    // todo throws error and remove console.log()
  };

  useEffect(() => {
    const timeout = setTimeout(getShows, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [getShows, editMode]);

  const editShowHandler = (show) => {
    seteditMode(true);
    setactiveShow(show);
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
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder='description'
          />
        </th>
        <th>artgroup</th>
        <th>manager</th>
        <th>Photo</th>
        <th>action</th>
      </>
    );
  };

  const renderBody = () => {
    return (
      shows &&
      shows.map((show) => {
        return (
          <tr key={show._id}>
            <td>{show.name}</td>
            <td>{show.description}</td>
            <td>{show.artGroup && show.artGroup.name}</td>
            <td>{show.manager && show.manager[0] && show.manager[0].name}</td>
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
              <Edit
                className='edit__button'
                onClick={() => editShowHandler(show)}
              />
              <DeleteIcon
                className='delete__button'
                onClick={() => deleteShowHandler(show)}
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
        <AddEditShow
          editMode='true'
          show={activeShow}
          onEdit={() => seteditMode(false)}
        />
      )}
    </>
  );
};

export default ManageShows;
