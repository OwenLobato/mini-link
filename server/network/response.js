import ErrorResponse from '../utils/errorResponse.js';

const OPERATION_FAILED = 'OPERATION.FAILED';

export const success = (req, res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: true,
    error: false,
    message,
    data,
  });
};

const sendErrorResponse = (res, statusCode, error, message) => {
  return res.status(statusCode).send({ success: false, error, message });
};

export const error = (req, res, statusCode, message, error) => {
  try {
    console.log('[ERROR]', error);
    if (error) {
      if (error.errorInfo) {
        return sendErrorResponse(
          res,
          statusCode,
          error.errorInfo.code,
          error.errorInfo.message
        );
      } else {
        if (typeof error === 'object') {
          return sendErrorResponse(
            res,
            error.statusCode,
            OPERATION_FAILED,
            error.message
          );
        }
        return sendErrorResponse(res, statusCode, OPERATION_FAILED, message);
      }
    }
  } catch (err) {
    try {
      if (error) {
        switch (err.name) {
          case 'MongooseError':
            return sendErrorResponse(
              res,
              statusCode,
              OPERATION_FAILED,
              error.message
            );
          case 'ValidationError':
            return sendErrorResponse(
              res,
              statusCode,
              OPERATION_FAILED,
              `${err._message} in the following keys: ${Object.keys(
                err.errors
              )}`
            );

          case 'Error':
            return sendErrorResponse(
              res,
              statusCode,
              OPERATION_FAILED,
              err.message
            );
          default:
            return sendErrorResponse(
              res,
              statusCode,
              OPERATION_FAILED,
              message
            );
        }
      }
    } catch (ndErr) {
      return sendErrorResponse(res, statusCode, OPERATION_FAILED, message);
    }
  }
};

export const customError = (statusCode, message) =>
  new ErrorResponse(statusCode, message);
