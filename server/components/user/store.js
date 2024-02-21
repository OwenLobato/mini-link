import User from '../../models/User.js';
import { objectIdConversor } from '../helpers/dbConverters.js';

export const getAllUsers = async () => {
  try {
    const allUsers = await User.find({});
    return allUsers;
  } catch (error) {
    throw new Error('Error finding users');
  }
};

export const findUserBy = async (key, value) => {
  try {
    const filter =
      key === '_id' ? { _id: objectIdConversor(value) } : { [key]: value };
    const user = await User.findOne(filter);
    return user;
  } catch (error) {
    throw new Error('Error finding user');
  }
};
