import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

import Home from './home/pages/Home';
import Auth from './user/pages/Auth';
import Account from './user/pages/Account';
import BookEvent from './event/pages/BookEvent';
import { useAuth } from './shared/hooks/auth-hook';
import EventDetail from './event/pages/EventDetail';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const {
    userPhoto,
    username,
    userId,
    mobile,
    email,
    token,
    role,
    login,
    logout,
  } = useAuth();

  const routes = () => {
    return (
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route path='/account'>
          {token ? <Account /> : <Redirect to='/auth' exact />}
        </Route>
        <Route path='/eventDetail/:showId' exact>
          <EventDetail />
        </Route>
        <Route path='/bookEvent/:showId' exact>
          {token ? <BookEvent /> : <Redirect to='/auth' exact />}
        </Route>
        <Redirect to='/' exact />
      </Switch>
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userPhoto,
        username,
        mobile,
        userId,
        email,
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
