import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3300/api/v1/',
});
export const imageAddress = 'http://localhost:3300/img/';
export const baseURL = 'http://localhost:3300/api/v1';

export const randomApi = (seed) =>
  `https://avatars.dicebear.com/api/avataaars/${seed}.svg`;
