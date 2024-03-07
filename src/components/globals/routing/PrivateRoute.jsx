import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../contexts/userContext';

export const PrivateRoute = (props) => {
  const navigate = useNavigate();

  const { getAuthToken, getRefreshToken, refreshAuthToken, isExpiredToken } =
    useUserContext();

  const authToken = getAuthToken();
  const refreshToken = getRefreshToken();

  const refreshAndProceed = async () => {
    try {
      const newToken = await refreshAuthToken();
      if (!newToken) return navigate('/');
    } catch (err) {
      console.log(err);
      navigate('/');
      return err;
    }
  };

  useEffect(() => {
    if (isExpiredToken(refreshToken)) return navigate('/');

    if (isExpiredToken(authToken)) {
      refreshAndProceed();
    }
  }, [navigate]);

  return <>{authToken && props.children}</>;
};
