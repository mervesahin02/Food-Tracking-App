import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, authToken }) {
    if (!authToken) {
        // Kullanıcı giriş yapmadıysa login sayfasına yönlendir
        return <Navigate to="/login" />;
    }
    // Kullanıcı giriş yaptıysa istenen sayfayı göster
    return children;
}

export default PrivateRoute;
