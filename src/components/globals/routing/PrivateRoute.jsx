import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/userContext';

export const PrivateRoute = (props) => {
  const navigate = useNavigate();

  const { getAuthToken, isExpiredAuthToken, removeAuthToken } =
    useUserContext();
  const authToken = getAuthToken();
  const isExpired = isExpiredAuthToken();

  useEffect(() => {
    if (!authToken || isExpired) {
      removeAuthToken();
      navigate('/');
    }
  }, [authToken]);

  return <>{authToken && props.children}</>;
};
