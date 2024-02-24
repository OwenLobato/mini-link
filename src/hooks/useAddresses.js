import { request } from '../utils/requests';

const base = '/addresses';
const publicBase = '/short';

const useAddresses = (headers) => {
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

  const getAddress = async (linkId) => {
    return await request('GET', `${base}/link/${linkId}`, headers);
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
    getData,
    getAddress,
    createAddress,
    editAddress,
    getAddressByKey,
    goToAddress,
  };
};

export default useAddresses;
