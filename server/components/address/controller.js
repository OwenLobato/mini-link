import Address from '../../models/Address.js';
import { getAllAddresses, findAddressBy } from './store.js';
import { objectIdConversor } from '../helpers/dbConverters.js';
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

export const getAddressByKey = (key, value, createdBy) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbAddress =
        key && value
          ? await findAddressBy(key, value)
          : await findAddressBy('createdBy', createdBy);

      if (!dbAddress) {
        reject(customError(401, 'URL not found'));
      }

      resolve(getUserAddresses(createdBy, dbAddress));
    } catch (err) {
      reject(err);
    }
  });
};

const getUserAddresses = (userId, addresses) => {
  return addresses.filter(
    (address) =>
      objectIdConversor(userId).toString() ===
      objectIdConversor(address.createdBy).toString()
  );
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
