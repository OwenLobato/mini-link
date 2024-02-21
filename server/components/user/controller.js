import { findUserBy, getAllUsers } from './store.js';
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
        user: dbUser,
        links: dbAddresses,
      };

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

export const getData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbUser = await getAllUsers();
      if (!dbUser) {
        reject(customError(401, 'Users not found'));
      }

      resolve(dbUser);
    } catch (err) {
      reject(err);
    }
  });
};
