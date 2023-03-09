import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

import { User, IUser } from './models';
import { api } from './api/api';

import { PATHS } from './common/constants';


const HTTP_ERROR_STATUSES = [404, 500];

const Context = React.createContext<any>(null);

export const ContextProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    api.errorMessage = async (error: Response | { status: number, message: string }) => {
      let message: string | null = null;

      if (error instanceof Response) {
        const errorBody = await error.json();

        const keyMessageBody = `errors.${errorBody.message}`;
        const tempMessageBody = t(keyMessageBody, { value: errorBody?.value });

        if (!tempMessageBody.includes('errors.')) message = tempMessageBody;
        else {
          const keyMessageStatus = `errors.${error.status}`;
          const tempMessageStatus = t(keyMessageStatus);
          if (!tempMessageStatus.includes('errors.')) message = tempMessageStatus;
        }
      } else {
        message = t(`errors.${error.message}`);
      }

      if (!message) message = t('errors.400');

      toast.error(message);
      console.error(error);

      if (HTTP_ERROR_STATUSES.includes(error.status)) navigate(PATHS.NOT_FOUND, { replace: true });
    };

    api.unauthorized = () => navigate(PATHS.LOGOUT, { replace: true });
  }, []);

  return (
    <Context.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () =>
  useContext<{
    currentUser: User;
    setCurrentUser: (value: IUser | null) => void;
  }>(Context);
