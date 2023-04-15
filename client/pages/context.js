import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getUser } from '@/utils';

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const user = getUser();
  const [userData, setUserData] = useState();

  const data = useMemo(() => {
    return [userData, setUserData];
  }, [userData, setUserData]);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
