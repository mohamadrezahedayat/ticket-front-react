import React, { useState, useEffect, useContext } from 'react';

import { api, baseURL, imageAddress } from '../../shared/apis/server';
import { AuthContext } from '../../shared/context/auth-context';

const ManageUsers = () => {
  const { token } = useContext(AuthContext);
  const [users, setusers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const response = await api.get(`${baseURL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setusers(response.data.data.data);
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
      users.map(({ id, role, name, email, mobile, photo }) => {
        return (
          <tr key={id}>
            <td>{role}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{mobile}</td>
            <td>
              <img src={`${imageAddress}/users/${photo}`} alt='profile' />
            </td>
            <td className='opration'>
              <button
                className='opration__button'
                onClick={() => console.log(id)}
              >
                Edit
              </button>
            </td>
          </tr>
        );
      })
    );
  };
  return (
    <>
      <h3 id='title'>ManageUsers</h3>
      <table id='employee'>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </>
  );
};

export default ManageUsers;
