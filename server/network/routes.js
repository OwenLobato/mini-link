import { config } from 'dotenv';
import {
  authRouter,
  userRouter,
  addressRouter,
  publicAddressRouter,
} from '../components/index.js';
import { isAuthenticated } from '../middlewares/auth.js';

config();

const apiVersion = process.env.API_VERSION;
const authVersion = '/auth';

export const authRoutes = (app) => {
  app.use(authVersion, authRouter);
};

export const userRoutes = (app) => {
  app.use(`${apiVersion}/users`, isAuthenticated, userRouter);
};

export const addressRoutes = (app) => {
  app.use(`${apiVersion}/addresses`, isAuthenticated, addressRouter);
};

export const publicAddressRoutes = (app) => {
  app.use(`${apiVersion}/short`, publicAddressRouter);
};
