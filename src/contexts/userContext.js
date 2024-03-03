import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import useUsers from '../hooks/useUsers';

const getTimestampsDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

const getNowDate = () => {
  const now = new Date();
  return now.toLocaleString();
};

const UserContextProvider = createContext();

export const UserContext = ({ children }) => {
  const getAuthToken = () => window.localStorage.getItem('authToken');

  const setAuthToken = (token) =>
    window.localStorage.setItem('authToken', token);

  const removeAuthToken = () => window.localStorage.removeItem('authToken');

  const isExpiredAuthToken = () => {
    try {
      const decodedToken = jwtDecode(getAuthToken());

      const NOW = getNowDate();
      const EXP = getTimestampsDate(decodedToken.exp);
      if (NOW > EXP) return true;

      return false;
    } catch (error) {
      return true;
    }
  };

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
    if (getAuthToken() && !isExpiredAuthToken()) {
      getDashboardData()
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } else {
      removeAuthToken();
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
        isExpiredAuthToken,
      }}
    >
      {children}
    </UserContextProvider.Provider>
  );
};

export const useUserContext = () => useContext(UserContextProvider);
