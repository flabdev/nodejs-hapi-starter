require('dotenv').config();

module.exports = {
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  swagger: {
    host: 'sai krishna thatipamula',
    title: 'Node.js seed project with Hapi.js framework',
    contact: 'sai krishna thatipamula',
  },
  Database: {
    URI: process.env.MONGODB_URI,
  },
};
