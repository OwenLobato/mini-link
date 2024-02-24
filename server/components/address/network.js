import express from 'express';
import {
  createAddress,
  editAddress,
  getAddressByKey,
  goToAddress,
} from './controller.js';
import { success, error } from '../../network/response.js';

export const addressRouter = express.Router();

addressRouter.get('/', (req, res) => {
  const { _id } = res.locals;
  const [key, value] = Object.entries(req.query)[0] || [];

  getAddressByKey(key, value, _id)
    .then((userData) => {
      return success(req, res, 200, 'URL obtained succesfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error obtaining URL', err);
    });
});

addressRouter.post('/', (req, res) => {
  const { name, urlCode, originalLink, description } = req.body;
  const { _id } = res.locals;

  createAddress(urlCode, originalLink, name, description, _id)
    .then((userData) => {
      return success(req, res, 200, 'URL created succesfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error creating URL', err);
    });
});

addressRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, urlCode, originalLink, description } = req.body;

  editAddress(name, urlCode, originalLink, description, id)
    .then((userData) => {
      return success(req, res, 200, 'URL edited succesfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error editing URL', err);
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
