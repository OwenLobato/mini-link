import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createHash = (valueToHash) =>
  bcrypt.hashSync(valueToHash, Number(process.env.SALT_ROUNDS));

export const compareHash = (valueToCompare, hashValue) => {
  bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  return bcrypt.compareSync(valueToCompare, hashValue);
};

export const generateAccessToken = (id, name, email) =>
  jwt.sign(
    {
      _id: id,
      name,
      email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  );

export const getUserResponse = (user, token) => {
  const userResponse = { ...user._doc };
  delete userResponse.password;

  return { user: userResponse, token };
};
