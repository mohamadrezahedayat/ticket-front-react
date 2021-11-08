import React, { useState, useEffect, useContext, useCallback } from 'react';

import {
  api,
  baseURL,
  randomApi,
  imageAddress,
} from '../../shared/apis/server';
import Table from './Table';
import EditUser from './EditUser';
import { Edit } from '../../shared/components/UIElements/Svgs';
import { AuthContext } from '../../shared/context/auth-context';

const ManageUsers = () => {
  const { token } = useContext(AuthContext);

  const [role, setrole] = useState();
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [mobile, setmobile] = useState();
  const [users, setusers] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [activeUser, setactiveUser] = useState(null);

  const getUsers = useCallback(async () => {
    let like = `like=and[`;
    like += `name=${name || '.'},`;
    like += `email=${email || '.'},`;
    like += `role=${role || '.'},`;
    like += `mobile=${mobile || '.'}`;
    like += `]`;

    const { data } = await api.get(
      `${baseURL}/users?${like}&fields=-passwordChangedAt&limit=20`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setusers(data.data.data);
  }, [token, role, email, mobile, name]);

  useEffect(() => {
    const timeout = setTimeout(getUsers, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [getUsers, editMode]);

  const editUserHandler = (user) => {
    seteditMode(true);
    setactiveUser(user);
  };

  const renderHeader = () => {
    return (
      <>
        <th>
          <input
            value={role}
            onChange={(e) => setrole(e.target.value)}
            placeholder='role'
          />
        </th>
        <th>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder='name'
          />
        </th>
        <th>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder='email'
          />
        </th>
        <th>
          <input
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
            placeholder='mobile'
          />
        </th>
        <th>profile</th>
        <th>action</th>
      </>
    );
  };

  const renderBody = () => {
    return (
      users &&
      users.map((user) => (
        <tr key={user._id}>
          <td>{user.role}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.mobile}</td>
          <td>
            <img
              src={
                user.photo && user.photo !== 'default.jpg'
                  ? `${imageAddress}/users/${user.photo}`
                  : randomApi(user._id)
              }
              alt='profile'
            />
          </td>
          <td className='opration'>
            <Edit
              className='edit__button'
              onClick={() => editUserHandler(user)}
            />
          </td>
        </tr>
      ))
    );
  };

  return !editMode ? (
    <Table
      className='table'
      headers={renderHeader()}
      body={renderBody()}
    ></Table>
  ) : (
    <EditUser user={activeUser} onSubmit={() => seteditMode(false)} />
  );
};

export default ManageUsers;
