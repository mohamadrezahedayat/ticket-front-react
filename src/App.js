import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Home from './home/pages/Home';
import Auth from './user/pages/Auth';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Account from './user/pages/Account';

const App = () => {
  const {
    userId,
    userPhoto,
    username,
    email,
    mobile,
    token,
    role,
    login,
    logout,
  } = useAuth();

  // let routes;
  const routes = () => {
    if (token) {
      return (
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>

          <Route path='/auth'>
            <Auth />
          </Route>

          <Route path='/account'>
            <Account />
          </Route>

          <Redirect to='/' exact />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>

          <Route path='/auth'>
            <Auth />
          </Route>

          <Redirect to='/auth' />
        </Switch>
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId,
        userPhoto,
        username,
        email,
        mobile,
        token,
        role,
        login,
        logout,
      }}
    >
      <Router>{routes()}</Router>
    </AuthContext.Provider>
  );
};

export default App;
