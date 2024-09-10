import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const PublicRoute = () => {
   const {user}=useAuthStore();
  // console.log(user.tipo)


  return user.tipo ?<Navigate to="/curriculum" />: <Outlet /> ; 
};

export default PublicRoute;