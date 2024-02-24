import User from '../../models/User.js';
import { objectIdConversor } from '../helpers/dbConverters.js';

export const modifyUser = async (updatedFields, userId) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });

    return updatedUser;
  } catch (error) {
    throw new Error('Error updating user');
  }
};

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
