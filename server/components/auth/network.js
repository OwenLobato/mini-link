import express from 'express';
import { login, register } from './controller.js';
import { success, error } from '../../network/response.js';

export const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  login(email, password)
    .then((userData) => {
      return success(req, res, 200, 'User login successful', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error signing in', err);
    });
});

authRouter.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  register(name, email, password)
    .then((userData) => {
      return success(req, res, 201, 'User created successfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error registering user', err);
    });
});
