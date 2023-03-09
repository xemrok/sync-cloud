import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { User } from './models';

import { useUserContext } from './ContextProvider';
import { Loader } from './common/components';

import { logoutUrl } from './utils/query';


const PrivateRouter = ({ children }: any) => {
    const { currentUser, setCurrentUser } = useUserContext();

    useEffect(() => {
        if (!currentUser && window.token) User.me().then((user) => setCurrentUser(user));
    }, []);

    if (!window.token) return <Navigate to={logoutUrl()} />;

    return currentUser ? children || <Outlet /> : <Loader />;
}

export default PrivateRouter;
