import User from '../../models/User.js';
import {
  createHash,
  compareHash,
  generateAccessToken,
  getUserResponse,
  verifyToken,
} from '../helpers/hashing.js';
import { modifyUser } from '../user/store.js';
import { customError } from '../../network/response.js';

export const login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password)
      reject(customError(400, 'Please provide email and password'));

    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user) reject(customError(401, 'Invalid credentials'));

      const passwordMatch = compareHash(password, user.password);
      if (!passwordMatch) reject(customError(401, 'Invalid credentials'));

      const token = generateAccessToken(user._id, user.name, user.email);
      const refreshToken = generateAccessToken(
        user._id,
        user.name,
        user.email,
        true
      );

      await modifyUser({ refreshToken }, user._id);

      resolve(getUserResponse(user, token, refreshToken));
    } catch (err) {
      reject(customError(500, err.message));
    }
  });
};

export const register = (name, email, password, confirmPassword) => {
  return new Promise(async (resolve, reject) => {
    if (!name || !email || !password || !confirmPassword)
      reject(customError(400, 'Please provide the complete data'));

    if (password !== confirmPassword)
      reject(customError(400, 'Passwords do not match'));

    try {
      const user = await User.create({
        name,
        email,
        password: createHash(password),
      });

      const token = generateAccessToken(user._id, name, email);

      resolve(getUserResponse(user, token));
    } catch (err) {
      reject(err);
    }
  });
};

export const refresh = (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    if (!refreshToken)
      reject(customError(400, 'Please provide the refresh token'));

    try {
      const decodedToken = verifyToken(refreshToken, true);

      const user = await User.findOne({ _id: decodedToken._id }).select(
        '+refreshToken'
      );
      if (!user) reject(customError(401, 'Invalid user'));
      if (!user.refreshToken)
        reject(customError(400, 'Not authorized to refresh'));

      const decodedDBToken = verifyToken(user.refreshToken, true);

      const newToken = generateAccessToken(
        decodedDBToken._id,
        decodedDBToken.name,
        decodedDBToken.email
      );

      resolve(getUserResponse(user, newToken, refreshToken));
    } catch (err) {
      reject(err);
    }
  });
};

export const logout = (refreshToken) => {
  return new Promise(async (resolve, reject) => {
    if (!refreshToken)
      reject(customError(400, 'Please provide the refresh token'));

    try {
      const decodedToken = verifyToken(refreshToken, true);

      const dbUser = await modifyUser(
        { $unset: { refreshToken: 1 } },
        decodedToken._id
      );
      if (!dbUser) reject(customError(401, 'Invalid user'));

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
