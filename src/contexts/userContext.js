import { createContext, useState, useEffect, useContext } from 'react';
import useUsers from '../hooks/useUsers';

const UserContextProvider = createContext();

export const UserContext = ({ children }) => {
  const { getDashboardData } = useUsers({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  });

  const initialUserData = {
    _id: '',
    name: '',
    email: '',
    links: [],
  };
  const [userData, setUserData] = useState(initialUserData);

  useEffect(() => {
    getDashboardData()
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  return (
    <UserContextProvider.Provider value={{ userData, setUserData }}>
      {children}
    </UserContextProvider.Provider>
  );
};

export const useUserContext = () => useContext(UserContextProvider);
