const auth = require('./auth');
const users = require('./userRoute');
const products = require('./productRoute');
const orders = require('./orderRoute');

module.exports = [...auth, ...users, ...products, ...orders];
