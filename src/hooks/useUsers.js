import { request } from '../utils/requests';

const base = '/users';

const useUsers = (headers) => {
  const getDashboardData = async () => {
    return await request('GET', `${base}/dashboard`, headers);
  };

  const getUser = async () => {
    return await request('GET', `${base}/`, headers);
  };

  const editUser = async (profileData) => {
    return await request('PUT', `${base}/`, headers, { data: profileData });
  };

  return {
    getDashboardData,
    getUser,
    editUser,
  };
};

export default useUsers;
