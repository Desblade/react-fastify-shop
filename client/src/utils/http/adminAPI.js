import { $host } from './http';

export const addGroceierAPI = async (groceier) => {
  const { data } = await $host.post('/admin/', groceier);

  return data;
};