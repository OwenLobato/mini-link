import express from 'express';
import { getData } from './controller.js';
import { success, error } from '../../network/response.js';

export const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  getData()
    .then((userData) => {
      return success(
        req,
        res,
        200,
        'User data successfully obtained',
        userData
      );
    })
    .catch((err) => {
      return error(req, res, 500, 'Error getting user data', err);
    });
});
