import { request } from '../utils/requests';

const base = '/users';

const useUsers = (headers) => {
  const getDashboardData = async () => {
    return await request('GET', `${base}/dashboard`, headers);
  };

  const getUsers = async () => {
    return await request('GET', `${base}/`, headers);
  };

  const editUser = async () => {
    return await request('PUT', `${base}/`, headers);
  };

  return {
    getDashboardData,
    getUsers,
    editUser,
  };
};

export default useUsers;
