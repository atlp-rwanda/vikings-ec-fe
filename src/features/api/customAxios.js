import axios from 'axios';

const customAxios = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  timeout: 50000,
  headers: {},
});

const requestHandler = (request) => {
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token') || '';
  request.headers.Authorization = token;
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    // eslint-disable-next-line no-undef
    window.location = '/login';
  }

  return response;
};

const errorHandler = (error) => Promise.reject(error);
customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error),
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error),
);

export default customAxios;
