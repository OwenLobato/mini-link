import Address from '../../models/Address.js';
import { getAllAddresses, findAddressBy } from './store.js';
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

export const goToAddress = (urlCode) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbAddress = await findAddressBy('urlCode', urlCode, true);

      if (!dbAddress || dbAddress.length === 0) {
        reject(customError(404, 'URL not exists'));
      }

      dbAddress.visitCount = dbAddress.visitCount + 1;
      await dbAddress.save(dbAddress);

      resolve(dbAddress);
    } catch (err) {
      reject(err);
    }
  });
};
