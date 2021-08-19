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
import EditUser from './EditUser';

const ManageUsers = () => {
  const { token } = useContext(AuthContext);
  const [users, setusers] = useState([]);
  const [editMode, seteditMode] = useState(false);
  const [activeUser, setactiveUser] = useState(null);

  const getUsers = useCallback(async () => {
    const response = await api.get(`${baseURL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setusers(response.data.data.data);
  }, [token]);

  useEffect(() => {
    getUsers();
  }, [getUsers, editMode]);

  const editUserHandler = (user) => {
    seteditMode(true);
    setactiveUser(user);
  };

  const renderHeader = () => {
    let headerElement = [
      'role',
      'username',
      'email',
      'phone',
      'profile',
      'operation',
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      users &&
      users.map((user) => {
        return (
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
              <button
                className='opration__button'
                onClick={() => editUserHandler(user)}
              >
                Edit
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
      <h3 className='heading-3'>Manage Users</h3>

      {!editMode && renderTable()}
      {editMode && (
        <EditUser user={activeUser} onSubmit={() => seteditMode(false)} />
      )}
    </Fragment>
  );
};

export default ManageUsers;
