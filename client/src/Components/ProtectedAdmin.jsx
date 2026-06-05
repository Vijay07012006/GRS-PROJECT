import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdmin = () => {
  const token = localStorage.getItem("adminToken");
  const role = localStorage.getItem("adminRole");

  if (!token || role !== "Admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdmin;
