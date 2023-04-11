import axios from 'axios';

const customAxios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  timeout: 50000,
  headers: {},
});
const requestHandler = (request) => {
  const token = localStorage.getItem('token') || '';
  request.headers.Authorization = `Bearer ${token}`;
  return request;
};

const responseHandler = (response) => response;

const errorHandler = (error) => {
  if (error.response.status === 401) {
    return (location.href = `${process.env.REACT_APP_BASE_URL}/auth`);
  }
  return Promise.reject(error);
};
customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error),
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error),
);

export default customAxios;
