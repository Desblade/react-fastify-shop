import { $host } from './http';

export const addGroceierAPI = async (groceier) => {
  const { data: { message } } = await $host.post('/admin', groceier);

  return message;
};

export const deleteGroceierAPI = async (id) => {
  const { data: { message } } = await $host.delete('/admin', { params: { id } });

  return message;
};

export const updateGroceierAPI = async (formData, id) => {
  const { data: { message } } = await $host.patch('/admin', formData, { params: { id } });

  return message;
};

export const getChatsAPI = async () => {
  const { data } = await $host.get('/admin');

  return data;
};
