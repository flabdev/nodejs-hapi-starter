
const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(winston.format.prettyPrint()),
  transports: [
     new winston.transports.Console(),

     //add file configuration for exporting the JSON.
  ],
});

const writeResponseLog = (payload, requestId) => {

  logger.info(JSON.stringify({
    requestId,
    statusCode: payload?.statusCode,
    path: payload?.request?.path,
    method: payload?.request?.method,
  }, null, 1));
};

const writeErrorLog = (payload, requestId) => {

  logger.error(JSON.stringify({
    requestId,
    statusCode: payload?.statusCode,
    path: payload?.request?.path,
    method: payload?.request?.method,
    error: payload?.source?.message,
    stack: payload?._error?.stack,
  }, null, 1));
};

module.exports = { writeResponseLog, writeErrorLog };