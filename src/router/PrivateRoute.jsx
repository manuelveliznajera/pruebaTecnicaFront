import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';


const PrivateRoute = () => {
 
  const {user}=useAuthStore();


  return user.tipo ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;