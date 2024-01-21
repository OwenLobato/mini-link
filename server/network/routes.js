import { config } from 'dotenv';
import { userRouter, addressRouter } from '../components/index.js';

config();

const apiVersion = process.env.API_VERSION;

export const userRoutes = (app) => {
  app.use(`${apiVersion}/users`, userRouter);
};

export const addressRoutes = (app) => {
  app.use(`${apiVersion}/addresses`, addressRouter);
};
