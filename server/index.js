import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB } from './config/mongo.js';
import {
  userRoutes,
  addressRoutes,
  publicAddressRoutes,
} from './network/routes.js';

config();
connectDB();

const port = process.env.PORT || 5000;
export const ORIGIN_PATH =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_ORIGIN
    : process.env.ORIGIN;

const app = express();
app.use(cors({ credentials: true, origin: ORIGIN_PATH }));
app.use(express.json());

// ROUTES
userRoutes(app);
addressRoutes(app);
publicAddressRoutes(app);

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged error ${err}`);
  server.close(() => process.exit(1));
});
