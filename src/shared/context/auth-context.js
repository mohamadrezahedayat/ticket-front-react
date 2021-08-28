import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  email: null,
  mobile: null,
  userPhoto: null,
  username: null,
  token: null,
  role: null,
  login: () => {},
  logout: () => {},
});
