import express from 'express';
import {
  getData,
  createAddress,
  editAddress,
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

addressRouter.get('/link/:linkId', (req, res) => {
  const { linkId } = req.params;
  const { _id } = res.locals;

  getAddressByKey('_id', linkId, _id)
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
