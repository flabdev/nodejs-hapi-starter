const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Config = require('./config');
const Routes = require('./routes');
const Pack = require('./package.json');

exports.init = async () => {
  const server = Hapi.server({
    host: Config.server.host,
    port: Config.server.port,
    compression: {
      minBytes: 2048,
    },
    routes: {
      cors: true,
      validate: {
        failAction: (req, h, err) => {
          throw err;
        },
      },
    },
  });

  const swaggerOptions = {
    info: {
      title: Config.swagger.title,
      version: Pack.version,
      contact: {
        name: Config.swagger.contact,
      },
    },
    schemes: ['http', 'https'],
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [{ jwt: [] }],
  };


  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.route({
    method: 'GET',
    path: '/',
    handler: (request) => 'welcome to the HapiJs Seed Project',
  });

  server.route(Routes);
  try {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    console.log(`Swagger documentation is running on ${server.info.uri}/documentation`);
    return server;
  } catch (err) {
    console.log(err);
  }
};

