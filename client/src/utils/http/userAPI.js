import { $host } from './http';
import jwtDecode from 'jwt-decode';

export const registerAPI = async (registerData) => {
  const { data } = await $host.post('/user/register', registerData);

  localStorage.setItem('token', data.token);

  return jwtDecode(data.token);
};

export const confirmMailAPI = async (email) => {
  await $host.post('/user/confirmMail', email);
}

export const loginAPI = async (loginData) => {
  const { data } = await $host.post('/user/login', loginData);

  localStorage.setItem('token', data.token);

  return jwtDecode(data.token);
};

export const checkTokenAPI = async () => {
  const { data } = await $host.get('/user/check');

  localStorage.setItem('token', data.token);

  return jwtDecode(data.token);
};

export const getGroceiresAPI = async () => {
  const { data } = await $host.get('/user/getAll');

  return data;
};

export const addInCartAPI = async (count, id) => {
  await $host.post('/user/addInCart', { count }, { params: { id } });
};

export const getOneAPI = async (id) => {
  const { data } = await $host.get(`/user/getItem/${id}`);

  return data;
};

export const addAvatarAPI = async (formData) => {
  const { data } = await $host.post('/user/saveAvatar', formData);

  localStorage.setItem('pathAvatar', data.pathAvatar.path);

  return data;
};

export const getAvatarAPI = async () => {
  const { data } = await $host.get('user/getAvatar');

  localStorage.setItem('pathAvatar', data);

  return data;
};

export const firstStepGoogleAuthAPI = async () => {
  const { data } = await $host.get('/user/google/auth');

  return data;
};

export const getCountOfMessagesAPI = async () => {
  const { data } = await $host.get('/user/getCountMessages');

  return data;
}