import axios from 'axios';

const customAxios = axios.create({
  // baseURL: 'https://vikings-ec-bn-mbhd.onrender.com/api/v1',
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 50000,
  headers: {},
});

const requestHandler = (request) => {
  const token = localStorage.getItem('token')||'';
  request.headers.Authorization = `Bearer ${token}`;
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    window.location = '/login';
  }

  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};
customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default customAxios;
