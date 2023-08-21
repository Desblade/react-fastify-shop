import axios from 'axios';

const $host = axios.create({
  baseURL: 'http://localhost:5100/api',
});

const interceptors = (config) => {
  config.headers.authorization = `bearer ${localStorage.getItem('token')}`;

  return config;
};

$host.interceptors.request.use(interceptors);

export {
  $host,
};
