import Address from '../../models/Address.js';
import { getAllAddresses } from './store.js';
import { customError } from '../../network/response.js';

export const getData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbAddresses = await getAllAddresses();
      if (!dbAddresses) {
        reject(customError(401, 'URLs not found'));
      }

      resolve(dbAddresses);
    } catch (err) {
      reject(err);
    }
  });
};

export const createAddress = (
  urlCode,
  originalLink,
  name,
  description,
  createdBy
) => {
  return new Promise(async (resolve, reject) => {
    if (!name || !urlCode || !originalLink || !createdBy) {
      reject(customError(400, 'Please provide the complete data'));
    }

    try {
      const address = await Address.create({
        name,
        urlCode,
        originalLink,
        description,
        createdBy,
      });

      resolve(address);
    } catch (err) {
      reject(err);
    }
  });
};
