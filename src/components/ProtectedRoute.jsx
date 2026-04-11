import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    // Redirect to the appropriate login page based on the prefix of the attempted URL
    const path = location.pathname;
    let loginRoot = '/user/login';
    if (path.startsWith('/driver')) loginRoot = '/driver/login';
    if (path.startsWith('/admin')) loginRoot = '/admin/login';
    
    return <Navigate to={loginRoot} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
