const auth = require('./auth');
const users = require('./userRoute');

module.exports = [...auth, ...users];
