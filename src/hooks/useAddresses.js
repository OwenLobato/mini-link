import { request } from '../utils/requests';

const base = '/addresses';
const publicBase = '/short';

const useAddresses = (headers) => {
  const getAddressByKey = async (key, value) => {
    const params = key && value ? `?${key}=${value}` : '';
    return await request('GET', `${base}${params}`, headers);
  };

  const createAddress = async (addressData) => {
    return await request('POST', `${base}/`, headers, {
      data: addressData,
    });
  };

  const editAddress = async (id, newAddressData) => {
    return await request('PUT', `${base}/${id}`, headers, {
      data: newAddressData,
    });
  };

  const goToAddress = async (urlCode) => {
    return await request('GET', `${publicBase}/${urlCode}`, headers);
  };

  return {
    createAddress,
    editAddress,
    getAddressByKey,
    goToAddress,
  };
};

export default useAddresses;
