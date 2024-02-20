import { createContext, useState, useContext } from 'react';

const UserContextProvider = createContext();

export const UserContext = ({ children }) => {
  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: '',
  });

  return (
    <UserContextProvider.Provider value={{ userData, setUserData }}>
      {children}
    </UserContextProvider.Provider>
  );
};

export const useUserContext = () => useContext(UserContextProvider);
