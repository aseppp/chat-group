import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = JSON.parse(localStorage.getItem('userData'));

      setUserData(data);
    }
  }, [setUserData]);

  return (
    <UserContext.Provider value={[userData, setUserData]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
