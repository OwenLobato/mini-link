import { config } from 'dotenv';
import { userRouter } from '../components/index.js';

config();

const apiVersion = process.env.API_VERSION;

export const userRoutes = (app) => {
  app.use(`${apiVersion}/users`, userRouter);
};
