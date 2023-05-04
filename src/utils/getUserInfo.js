import jwtDecode from 'jwt-decode';

const getUserInfo = (token = (Window && localStorage) ? localStorage.getItem('token') : null) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export default getUserInfo;
