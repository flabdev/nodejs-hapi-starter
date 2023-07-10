const hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const vision = require('@hapi/vision');
const hapiSwagger = require('hapi-swagger');
const mongoose = require('mongoose');
const Boom = require('@hapi/boom');

const config = require('./config');
const routes = require('./routes');
const packageFile = require('./package.json');
const utils = require('./utils/logger');

mongoose.connect(config.Database.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const init = async () => {
  console.log('Initializing the configuration...');
  const server = hapi.server({
    host: config.server.host,
    port: config.server.port,
    routes: {
      cors: true,
      validate: {
        // If any Joi validations fail, it will send the proper error message to the user
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  });

  const swaggerOptions = {
    host: config.swagger.host,
    info: {
      title: config.swagger.title,
      version: packageFile.version,
      contact: {
        name: config.swagger.contact,
      },
    },
    grouping: 'tags',
    schemes:
      process.env.HOST === 'localhost' ? ['http', 'https'] : ['https', 'http'],
  };

  await server.register([
    inert,
    vision,
    {
      plugin: hapiSwagger,
      options: swaggerOptions,
    },
  ]);

  try {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    console.log(
      `Swagger documentation is running on ${server.info.uri}/documentation`,
    );
  } catch (err) {
    utils.writeErrorLog(Boom.badImplementation(err));
    console.log(err);
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return 'Hello World!';
    },
  });

  server.route(routes);

  server.events.on('response', request => {
    console.log(
      `${new Date().toISOString()} : ${
        request?.info?.remoteAddress
      } : ${request?.method?.toUpperCase()} : ${request?.path} : ${
        request?.response?.statusCode
      }`,
    );
    if (config.NODE_ENV === 'production') {
      if (request?.response?._error) {
        utils.writeErrorLog(request?.response, request.info.id);
      } else {
        utils.writeResponseLog(request?.response, request.info.id);
      }
    }
  });
};

db.on('connected', () => {
  console.log('Connected to DB');
  init();
});

db.on('error', err => {
  utils.writeErrorLog(Boom.badImplementation(err));
  console.log('Connection to DB failed', err);
  process.exit(0);
});

db.on('disconnected', () => {
  const message =
    'DB connection closed due to the network connectivity issues, or database server crashing';
  utils.writeErrorLog(Boom.badImplementation(message));
  console.log('Connection teminated to DB');
  process.exit(0);
});

process.on('unhandledRejection', err => {
  utils.writeErrorLog(Boom.badImplementation(err));
  console.error('DB unhandled rejection', err);
  process.exit(1);
});
