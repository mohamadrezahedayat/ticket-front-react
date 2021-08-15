import { useCallback, useState, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [userId, setUserId] = useState(false);
  const [email, setEmail] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [username, setUsername] = useState(false);
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);
  const [userPhoto, setUserPhoto] = useState(false);
  const [role, setRole] = useState('user');

  const login = useCallback(
    (userId, email, mobile, username, photo, token, expDate, role) => {
      const tokenExpirationDate =
        expDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      setUserId(userId);
      setEmail(email);
      setMobile(mobile);
      setUsername(username);
      setToken(token);
      setUserPhoto(photo);
      setRole(role);

      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId,
          username,
          email,
          mobile,
          photo,
          token,
          expiration: tokenExpirationDate.toISOString(),
          role,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setUserId(null);
    setUsername(null);
    setToken(null);
    setUserPhoto(null);
    setMobile(null);
    setEmail(null);
    setTokenExpirationDate(null);
    setRole('user');
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.email,
        storedData.mobile,
        storedData.username,
        storedData.photo,
        storedData.token,
        new Date(storedData.expiration),
        storedData.role
      );
    }
  }, [login]);

  return {
    userId,
    userPhoto,
    username,
    email,
    mobile,
    role,
    token,
    login,
    logout,
  };
};
