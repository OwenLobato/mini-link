import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { customError } from '../network/response.js';
import { error } from '../network/response.js';

export const isAuthenticated = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    error(
      req,
      res,
      401,
      'Not authorized to access this route',
      new Error('User without token')
    );
  }

  try {
    const decoded = jwt.verify(String(token), process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded._id);
    if (!user) {
      error(
        req,
        res,
        404,
        'No user found',
        new Error('User with token does not exist')
      );
    } else {
      res.locals = user;
      next();
    }
  } catch (err) {
    error(
      req,
      res,
      401,
      'Not authorized',
      new Error('Error on "isAuthenticated" middleware')
    );
    return next(customError(401, 'Not authorized'));
  }
};
