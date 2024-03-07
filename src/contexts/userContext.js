import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import useUsers from '../hooks/useUsers';

// LOCALSTORAGE MANAGE
const localStorageHandler = {
  get: (key) => window.localStorage.getItem(key),
  set: (key, value) => window.localStorage.setItem(key, value),
  remove: (key) => window.localStorage.removeItem(key),
};
const { get, set, remove } = localStorageHandler;

const getAuthToken = () => get('authToken');
const setAuthToken = (token) => set('authToken', token);
const removeAuthToken = () => remove('authToken');
const getRefreshToken = () => get('refreshToken');
const setRefreshToken = (refreshToken) => set('refreshToken', refreshToken);
const removeRefreshToken = () => remove('refreshToken');

// DATE MANAGE
const getTimestampsDate = (timestamp) => new Date(timestamp * 1000);
const getNowDate = () => new Date();

// TOKEN MANAGE
const isValidToken = (token) => {
  if (!token && token === 'undefined' && token === 'null') return false;

  try {
    return jwtDecode(token);
  } catch (err) {
    return false;
  }
};

const isExpiredToken = (token) => {
  try {
    const decodedToken = isValidToken(token);
    if (!decodedToken) return true;

    const NOW = getNowDate();
    const EXP = getTimestampsDate(decodedToken.exp);
    if (NOW > EXP) return true;

    return false;
  } catch (err) {
    return true;
  }
};

const UserContextProvider = createContext();

export const UserContext = ({ children }) => {
  const { getDashboardData } = useUsers({
    Authorization: `Bearer ${getAuthToken()}`,
  });
  const { refresh } = useAuth();

  const refreshAuthToken = async () => {
    const refreshToken = getRefreshToken();

    if (isExpiredToken(refreshToken)) return null;

    try {
      const res = await refresh(refreshToken);
      const newAuthToken = res.data.data.token;
      setAuthToken(newAuthToken);
      return newAuthToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const [userData, setUserData] = useState({
    _id: '',
    name: '',
    email: '',
    links: [],
  });

  useEffect(() => {
    refreshAuthToken();

    const authToken = getAuthToken();
    const refreshToken = getRefreshToken();

    if (!isExpiredToken(authToken) || !isExpiredToken(refreshToken)) {
      getDashboardData()
        .then((res) => {
          setUserData(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    } else {
      removeAuthToken();
      removeRefreshToken();
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
        getRefreshToken,
        setRefreshToken,
        removeRefreshToken,
        isExpiredToken,
        refreshAuthToken,
      }}
    >
      {children}
    </UserContextProvider.Provider>
  );
};

export const useUserContext = () => useContext(UserContextProvider);
