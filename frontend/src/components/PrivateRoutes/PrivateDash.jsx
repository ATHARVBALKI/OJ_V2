import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Unauthorized from './Unauthorized';

const PrivateDash = ({ children, roles = ["Admin"] }) => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const accountType = user ? user.accountType : null;

    console.log(accountType);
    console.log(token);

    if (token !== null && roles.includes(accountType)) {
        return children;
    }
    if (token !== null && !roles.includes(accountType)) {
        return <Unauthorized />;
    }
    if (token === null) {
        return <Navigate to="/login" />;
    }

    return null; // Added to handle any unexpected cases
};

export default PrivateDash;
