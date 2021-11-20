import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/v1',
});
export const imageAddress = '/img';
export const baseURL = '/api/v1';

export const randomApi = (seed) =>
  `https://avatars.dicebear.com/api/avataaars/${seed}.svg`;
