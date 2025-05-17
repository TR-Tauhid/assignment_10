import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext'; 
import LoadingPage from './components/LoadingPage';

const PrivateRoute = () => {
    const { user, loading } = useAuth(); 

    if (loading) {
        return (
              <LoadingPage/>
        );
    }

    if (user) {
        return <Outlet />;
    }
    
    return <Navigate to="/login" replace />;
};

export default PrivateRoute;