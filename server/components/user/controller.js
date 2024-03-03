import { findUserBy, modifyUser } from './store.js';
import { createHash } from '../helpers/hashing.js';
import { findAddressBy } from '../address/store.js';
import { customError } from '../../network/response.js';

export const getDashboardData = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbUser = await findUserBy('_id', userId);
      if (!dbUser) {
        reject(customError(401, 'User not found'));
      }
      const dbAddresses = await findAddressBy('createdBy', userId);
      if (!dbAddresses) {
        reject(customError(401, 'Addresses not found'));
      }

      const data = {
        _id: dbUser?._id,
        name: dbUser?.name,
        email: dbUser?.email,
        links: dbAddresses,
      };

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

export const getProfile = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbUser = await findUserBy('_id', userId);
      if (!dbUser) {
        reject(customError(401, 'Users not found'));
      }

      resolve(dbUser);
    } catch (err) {
      reject(err);
    }
  });
};

export const editUser = (name, email, password, userId) => {
  return new Promise(async (resolve, reject) => {
    if (!name || !email || !userId) {
      reject(customError(400, 'Please provide the complete data'));
    }

    let updateFields = { name, email };
    if (password) {
      updateFields.password = createHash(password);
    }

    try {
      const updatedUser = await modifyUser(updateFields, userId);
      if (!updatedUser) {
        reject(customError(401, 'Users not found'));
      }

      resolve(updatedUser);
    } catch (err) {
      reject(err);
    }
  });
};
