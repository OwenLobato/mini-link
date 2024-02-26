import Address from '../../models/Address.js';
import { findAddressBy } from './store.js';
import { objectIdConversor } from '../helpers/dbConverters.js';
import { customError } from '../../network/response.js';

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

export const editAddress = (
  name,
  urlCode,
  originalLink,
  description,
  userId
) => {
  return new Promise(async (resolve, reject) => {
    if (!name || !urlCode || !originalLink || !userId) {
      reject(customError(400, 'Please provide the complete data'));
    }

    try {
      const address = await Address.findById(userId);
      if (!address) reject(customError(404, 'Address not found'));

      address.name = name;
      address.urlCode = urlCode;
      address.originalLink = originalLink;
      address.description = description;

      await address.save();

      resolve(address);
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteAddress = (addressId, userId) => {
  return new Promise(async (resolve, reject) => {
    if (!addressId || !userId) {
      reject(customError(400, 'Please provide the complete data'));
    }

    try {
      const deletedAddress = await Address.findOneAndDelete({
        _id: addressId,
        createdBy: userId,
      });
      if (!deletedAddress) reject(customError(404, 'Address not found'));

      resolve(deletedAddress);
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
