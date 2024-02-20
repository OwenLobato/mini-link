import { request } from '../utils/requests';

const authVersion = process.env.REACT_APP_AUTH_VERSION;

const useAuth = (headers) => {
  const login = async (email, password) => {
    return await request('POST', `${authVersion}/login`, headers, {
      data: { email, password },
      api: false,
    });
  };

  const register = async (name, email, password) => {
    return await request('POST', `${authVersion}/register`, headers, {
      data: { name, email, password },
      api: false,
    });
  };

  return {
    login,
    register,
  };
};

export default useAuth;
