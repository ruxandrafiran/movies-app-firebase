import { Outlet, Navigate, useNavigate } from "react-router";
import { useContext } from 'react';
import Context from './context';

const PrivateRoutes = () => {
    let [user, setUser] = useContext(Context)

    return (
        user ? <Outlet /> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes