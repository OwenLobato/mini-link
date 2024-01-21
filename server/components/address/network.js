import express from 'express';
import {
  getData,
  createAddress,
  getAddressByKey,
  goToAddress,
} from './controller.js';
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

addressRouter.get('/:createdBy', (req, res) => {
  // TODO: Get userId (createdBy) and send it (Now is from params but get from locals)
  const { createdBy } = req.params;
  const [key, value] = Object.entries(req.query)[0] || [];

  getAddressByKey(key, value, createdBy)
    .then((userData) => {
      return success(req, res, 200, 'URL obtained succesfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error obtaining URL', err);
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

// PUBLIC ADDRESS ROUTER (/short/)
export const publicAddressRouter = express.Router();

publicAddressRouter.get('/:urlCode', (req, res) => {
  goToAddress(req.params.urlCode)
    .then((userData) => {
      return res.status(301).redirect(userData.originalLink);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error obtaining URL, try again', err);
    });
});
