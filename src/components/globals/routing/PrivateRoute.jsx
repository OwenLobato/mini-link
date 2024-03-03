import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/userContext';

export const PrivateRoute = (props) => {
  const navigate = useNavigate();

  const { getAuthToken } = useUserContext();
  const authToken = getAuthToken();

  useEffect(() => {
    if (!authToken) {
      navigate('/');
    }
  }, [authToken]);

  return <>{authToken && props.children}</>;
};
