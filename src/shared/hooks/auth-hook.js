import { useCallback, useState, useEffect } from 'react';
import { authApi } from '../apis/server';

let logoutTimer;

export const useAuth = () => {
  const [user, setuser] = useState({});
  const [isLoggedin, setisLoggedin] = useState(false);

  const login = useCallback((user, _expDate) => {
    const expDate =
      _expDate || new Date(new Date().getTime() + 1000 * 8 * 60 * 60);
    localStorage.setItem(
      'userData',
      JSON.stringify({ ...user, expirationDate: expDate.toISOString() })
    );

    setuser({ ...user, expirationDate: expDate });
    setisLoggedin(true);
  }, []);

  const logout = useCallback((alsoInBackend = true) => {
    localStorage.removeItem('userData');
    setuser({});
    setisLoggedin(false);
    if (alsoInBackend) authApi.get('/google/logout');
  }, []);

  const getUserFromPassport = useCallback(async () => {
    const { data } = await authApi.get('/current_user');
    if (data._id) {
      login(data);
    }
  }, [login]);

  // [startup: local storage] check local storage if already loggedin
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (!storedData?._id) return;
    const expDate = new Date(storedData.expirationDate);
    if (expDate < new Date()) {
      logout(false);
      return;
    }
    setuser(storedData);
    setisLoggedin(true);
  }, [logout]);

  // [startup: google auth] send request to server to findout if google auth is logged on
  useEffect(() => {
    if (isLoggedin) return;
    getUserFromPassport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserFromPassport]);

  // create and run a timer to automatically logout in expiration time
  useEffect(() => {
    if (user?.expirationDate) {
      const remainingTime =
        new Date(user.expirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, user?.expirationDate]);

  return {
    user,
    isLoggedin,
    login,
    logout,
  };
};
