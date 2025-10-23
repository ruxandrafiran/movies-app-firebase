import { Outlet, Navigate } from "react-router";
import { useContext } from 'react';
import Context from './context';

const PrivateRoutesLogged = () => {
    let [user, setUser] = useContext(Context)

    return (
        user ? <Navigate to="/"/> : <Outlet/>
    )
}

export default PrivateRoutesLogged