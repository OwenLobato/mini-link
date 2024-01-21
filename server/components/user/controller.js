import { getAllUsers } from './store.js';
import { customError } from '../../network/response.js';

export const getData = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const dbUser = await getAllUsers('_id', userId);
      if (!dbUser) {
        reject(customError(401, 'Users not found'));
      }

      resolve(dbUser);
    } catch (err) {
      reject(err);
    }
  });
};
