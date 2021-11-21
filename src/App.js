import React from 'react';

import Router from './Router';
import { useAuth } from './shared/hooks/auth-hook';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const { user, isLoggedin, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedin,
        login,
        logout,
      }}
    >
      <Router />
    </AuthContext.Provider>
  );
};

export default App;
