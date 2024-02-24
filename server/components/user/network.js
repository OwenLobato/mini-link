import express from 'express';
import { getData, getDashboardData, editUser } from './controller.js';
import { success, error } from '../../network/response.js';

export const userRouter = express.Router();
userRouter.get('/dashboard', (req, res) => {
  getDashboardData(res.locals._id)
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

userRouter.put('/', (req, res) => {
  const { name, email, password } = req.body;
  const { _id } = res.locals;

  editUser(name, email, password, _id)
    .then((userData) => {
      return success(req, res, 200, 'User edited successfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error editing user', err);
    });
});
