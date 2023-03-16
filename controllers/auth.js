const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

const Config = require('../config');
const UsersModel = require('../models/userModel');

module.exports.registerUser = async (req) => {
  try {
    const userFound = await UsersModel.findOne({
      email: req.payload.email.toLowerCase(),
    });
    if (userFound) {
      return Boom.conflict('User with this email already exists');
    }
    req.payload.password = bcrypt.hashSync(req.payload.password, 8);
    const doc = await UsersModel.create(req.payload);
    return { status: 'success', data: doc, statusCode: 200 };
  } catch (error) {
    return Boom.badImplementation();
  }
};

module.exports.loginUser = async (req) => {
  let token = null;
  try {
    const user = await UsersModel.findOne({
      email: req.payload.email.toLowerCase(),
    });
    if (!user) {
      return Boom.notFound('User not found with the given email id');
    }
    const correctPwd = bcrypt.compareSync(req.payload.password, user.password);
    if (correctPwd) {
      const userData = _.pick(user, ['email', 'firstName', 'lastName']);
      token = jwt.sign(userData, Config.auth.jwtSecretKey, {
        expiresIn: Config.auth.expiresIn,
      });
      return {
        status: 'success',
        data: token,
        statusCode: 200,
      };
    }
    return Boom.unauthorized('Invalid password');
  } catch (error) {
    return Boom.badImplementation();
  }
};
