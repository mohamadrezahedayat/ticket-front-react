import axios from 'axios';

/**
 * REACT_APP_HOST_ADDRESS = http://localhost:3300
 * or is server
 * REACT_APP_HOST_ADDRESS = https://ticket.bimdotexe.ir
 */
export const api = axios.create({
  baseURL: '/api/v1',
});

export const authApi = axios.create({
  baseURL: '/auth',
});

export const imageAddress = '/img';
export const baseURL = '/api/v1';
export const AuthUrl = '/auth';
export const AuthFullUrl = `${process.env.REACT_APP_BACKEND_ADDRESS}/auth`;

export const randomApi = (seed) =>
  `https://avatars.dicebear.com/api/avataaars/${seed}.svg`;
