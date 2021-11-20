import { useCallback, useState, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState(false);
  const [userId, setUserId] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [username, setUsername] = useState(false);
  const [userPhoto, setUserPhoto] = useState(false);
  const [expirationDate, setExpirationDate] = useState(false);

  const login = useCallback(
    (userId, email, mobile, username, photo, expDate, role) => {
      const expiration =
        expDate || new Date(new Date().getTime() + 1000 * 8 * 60 * 60);
      setExpirationDate(expiration);
      setUserId(userId);
      setEmail(email);
      setMobile(mobile);
      setUsername(username);
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
          expirationDate: expiration.toISOString(),
          role,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setUserId(null);
    setUsername(null);
    setUserPhoto(null);
    setMobile(null);
    setEmail(null);
    setExpirationDate(null);
    setRole(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (expirationDate) {
      const remainingTime = expirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, expirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData?.userId &&
      new Date(storedData.expirationDate) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.email,
        storedData.mobile,
        storedData.username,
        storedData.photo,
        new Date(storedData.expirationDate),
        storedData.role
      );
    } else {
      setUserId(null);
    }
  }, [login]);

  return {
    userId,
    userPhoto,
    username,
    email,
    mobile,
    role,
    login,
    logout,
  };
};
