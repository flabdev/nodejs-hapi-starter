const mongoose = require('mongoose');
const Config = require('./config');

const { init } = require('./index');

mongoose.set('strictQuery', false);
mongoose.connect(Config.database.uri, {
  useUnifiedTopology: true,
});
const server = mongoose.connection;

server.on('connected', () => {
  console.log('Connected to DB.');
  init();
});

server.on('error', () => {
  console.log('Connection to DB failed!');
  process.exit(0);
});

server.on('disconnected', (err) => {
  console.log('Connection teminated to DB ', err);
  process.exit(0);
});

module.exports.server = server;
