import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = (props) => {
    const userRoles = props?.monRole;
    const allowedRoles = props?.roleAutorise;
    // console.log(userRoles);
    // console.log(allowedRoles);
    const allowedRole = userRoles.find(role => allowedRoles?.includes(role));
    //console.log("ito",allowedRoles);
    const location = useLocation();
    return(
        allowedRole ? <Outlet/> : <Navigate to="/401" state={{ from: location }} replace />
    )
}

export default PrivateRoutes;