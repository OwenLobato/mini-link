import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import { customError } from '../../network/response.js';

export const login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password) {
      reject(customError(400, 'Please provide email and password'));
    }

    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        reject(customError(401, 'Invalid credentials'));
      }

      const { _id, name } = user;

      const token = jwt.sign(
        {
          _id,
          name,
          email,
        },
        process.env.JWT_SECRET_KEY
      );

      resolve({ user, token });
    } catch (err) {
      reject(customError(500, err.message));
    }
  });
};

export const register = (name, email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!name || !email || !password) {
      reject(customError(400, 'Please provide the complete data'));
    }

    try {
      const user = await User.create({
        name,
        email,
        password,
      });

      const token = jwt.sign(
        {
          _id: user._id,
          name,
          email,
        },
        process.env.JWT_SECRET_KEY
      );

      const userResponse = { ...user._doc };
      delete userResponse.password;

      resolve({ user: userResponse, token });
    } catch (err) {
      reject(err);
    }
  });
};
