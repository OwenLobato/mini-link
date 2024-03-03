import { createContext, useState, useEffect, useContext } from 'react';
import useUsers from '../hooks/useUsers';

const UserContextProvider = createContext();

export const UserContext = ({ children }) => {
  const getAuthToken = () => window.localStorage.getItem('authToken');

  const setAuthToken = (token) =>
    window.localStorage.setItem('authToken', token);

  const removeAuthToken = () => window.localStorage.removeItem('authToken');

  const { getDashboardData } = useUsers({
    Authorization: `Bearer ${getAuthToken()}`,
  });

  const initialUserData = {
    _id: '',
    name: '',
    email: '',
    links: [],
  };
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    if (getAuthToken()) {
      getDashboardData()
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    }
  }, []);

  return (
    <UserContextProvider.Provider
      value={{
        userData,
        setUserData,
        getAuthToken,
        setAuthToken,
        removeAuthToken,
      }}
    >
      {children}
    </UserContextProvider.Provider>
  );
};

export const useUserContext = () => useContext(UserContextProvider);
