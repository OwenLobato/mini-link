import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const PrivateRoute = (props) => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (!authToken) {
      navigate('/');
    }
  }, [authToken]);

  return <>{authToken && props.children}</>;
};
