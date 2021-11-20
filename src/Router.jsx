import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import Auth from './user/pages/Auth';
import Home from './home/pages/Home';
import Account from './user/pages/Account';
import Payment from './payment/pages/Payment';
import BookEvent from './event/pages/BookEvent';
import EventDetail from './event/pages/EventDetail';
import { AuthContext } from './shared/context/auth-context';
import { BrowserRouter } from 'react-router-dom';

const Router = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isloggedin, setisloggedin] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setisloggedin(true);
      return;
    }
    setisloggedin(false);
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route path='/account'>
          {isloggedin ? <Account /> : <Redirect to='/auth' exact />}
        </Route>
        <Route path='/eventDetail/:showId' exact>
          <EventDetail />
        </Route>
        <Route path='/bookEvent/:showId' exact>
          <BookEvent />
        </Route>
        <Route path='/payment/:eventId' exact>
          {isloggedin ? <Payment /> : <Redirect to='/auth' exact />}
        </Route>

        <Redirect to='/' exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
