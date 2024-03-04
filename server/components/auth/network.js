import express from 'express';
import { login, register, refresh, logout } from './controller.js';
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
  const { name, email, password, confirmPassword } = req.body;

  register(name, email, password, confirmPassword)
    .then((userData) => {
      return success(req, res, 201, 'User created successfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error registering user', err);
    });
});

authRouter.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  refresh(refreshToken)
    .then((userData) => {
      return success(req, res, 201, 'Token refresh successfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error refreshing token', err);
    });
});

authRouter.delete('/logout', (req, res) => {
  const { refreshToken } = req.body;

  logout(refreshToken)
    .then((userData) => {
      return success(req, res, 204, 'Logout successfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error on logout', err);
    });
});
