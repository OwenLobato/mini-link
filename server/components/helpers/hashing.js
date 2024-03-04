import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createHash = (valueToHash) =>
  bcrypt.hashSync(valueToHash, Number(process.env.SALT_ROUNDS));

export const compareHash = (valueToCompare, hashValue) => {
  bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  return bcrypt.compareSync(valueToCompare, hashValue);
};

export const generateAccessToken = (id, name, email, isRefresh = false) =>
  jwt.sign(
    {
      _id: id,
      name,
      email,
    },
    isRefresh ? process.env.JWT_REFRESH_SECRET_KEY : process.env.JWT_SECRET_KEY,
    {
      expiresIn: isRefresh
        ? process.env.JWT_REFRESH_EXPIRE_TIME
        : process.env.JWT_EXPIRE_TIME,
    }
  );

export const getUserResponse = (user, token, refreshToken = '') => {
  const userResponse = { ...user._doc };
  delete userResponse.password;

  return { user: userResponse, token, refreshToken };
};

export const verifyToken = (token, isRefresh = false) =>
  jwt.verify(
    String(token),
    isRefresh ? process.env.JWT_REFRESH_SECRET_KEY : process.env.JWT_SECRET_KEY
  );
