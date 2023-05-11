import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../utils/getUserInfo';

const redirectPath = {
  buyer: '/dashboard/orders',
  seller: '/dashboard/sales',
};
const RestrictTo = ({ children, userRoles = [] }) => {
  const user = getUserInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && !userRoles.includes(user.role)) {
      navigate(redirectPath[user.role] || '/');
    }
  }, [user]);
  return children;
};
export default RestrictTo;
