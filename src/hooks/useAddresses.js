import { request } from '../utils/requests';

const base = '/addresses';
const publicBase = '/short';

const useUsers = (headers) => {
  const getData = async () => {
    return await request('GET', `${base}`, headers);
  };

  const getAddressByKey = async (createdBy, key, value) => {
    return await request(
      'GET',
      `${base}/${createdBy}?${key}=${value}`,
      headers
    );
  };

  const createAddress = async (addressData) => {
    return await request('POST', `${base}/`, headers, {
      data: addressData,
    });
  };

  const goToAddress = async (urlCode) => {
    return await request('GET', `${publicBase}/${urlCode}`, headers);
  };

  return {
    getData,
    createAddress,
    getAddressByKey,
    goToAddress,
  };
};

export default useUsers;
