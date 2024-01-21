import express from 'express';
import { getData, createAddress } from './controller.js';
import { success, error } from '../../network/response.js';

export const addressRouter = express.Router();

addressRouter.get('/', (req, res) => {
  getData()
    .then((userData) => {
      return success(req, res, 200, 'URLs successfully obtained', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error getting URLs', err);
    });
});

addressRouter.post('/', (req, res) => {
  // TODO: Get userId to "createdBy" and send it (Now is from body, get from locals)
  const { urlCode, originalLink, name, description, createdBy } = req.body;

  createAddress(urlCode, originalLink, name, description, createdBy)
    .then((userData) => {
      return success(req, res, 200, 'URL created succesfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error creating URL', err);
    });
});
