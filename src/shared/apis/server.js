import axios from 'axios';

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_HOST_ADDRESS}/api/v1/`,
});
export const imageAddress = `${process.env.REACT_APP_HOST_ADDRESS}/img/`;
export const baseURL = `${process.env.REACT_APP_HOST_ADDRESS}/api/v1`;

export const randomApi = (seed) =>
  `https://avatars.dicebear.com/api/avataaars/${seed}.svg`;
