import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { authService } from '../../services';

import { useUserContext } from '../../ContextProvider';

import { PATHS } from '../../common/constants';


const Logout = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useUserContext();

  useEffect(() => {
    navigate(`${PATHS.AUTH.SIGN_IN}${window.location.search}`, { replace: true });
    authService.logout()
      .catch(e => console.error(e))
      .finally(() => {
        currentUser?.logout();
        setCurrentUser(null);
      });
  }, []);

  return null;
}

export default Logout;
