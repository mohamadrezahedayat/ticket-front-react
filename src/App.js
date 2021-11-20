import React from 'react';

import Router from './Router';
import { useAuth } from './shared/hooks/auth-hook';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const { userPhoto, username, userId, mobile, email, role, login, logout } =
    useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!username,
        userPhoto,
        username,
        mobile,
        userId,
        email,
        role,
        login,
        logout,
      }}
    >
      <Router />
    </AuthContext.Provider>
  );
};

export default App;
