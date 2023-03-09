import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../ContextProvider';

import { PATHS } from '../../common/constants';


const Logout = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserContext();

  useEffect(() => {
    currentUser?.logout();
    setCurrentUser(null);
    navigate(`${PATHS.AUTH.SIGN_IN}${window.location.search}`, { replace: true });
  }, []);

  return null;
}

export default Logout;
