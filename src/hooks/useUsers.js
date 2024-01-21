import { request } from '../utils/requests';

const base = '/users';

const useUsers = (headers) => {
  const getUsers = async () => {
    return await request('GET', `${base}/`, headers);
  };

  return {
    getUsers,
  };
};

export default useUsers;
