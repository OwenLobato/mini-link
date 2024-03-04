import { request } from '../utils/requests';

const authVersion = process.env.REACT_APP_AUTH_VERSION;

const useAuth = (headers) => {
  const login = async (email, password) => {
    return await request('POST', `${authVersion}/login`, headers, {
      data: { email, password },
      api: false,
    });
  };

  const register = async (name, email, password, confirmPassword) => {
    return await request('POST', `${authVersion}/register`, headers, {
      data: { name, email, password, confirmPassword },
      api: false,
    });
  };

  const refresh = async (refreshToken) => {
    return await request('POST', `${authVersion}/refresh`, headers, {
      data: { refreshToken },
      api: false,
    });
  };

  const logout = async (refreshToken) => {
    return await request('DELETE', `${authVersion}/logout`, headers, {
      data: { refreshToken },
      api: false,
    });
  };

  return {
    login,
    register,
    refresh,
    logout,
  };
};

export default useAuth;
