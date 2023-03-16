const Boom = require('@hapi/boom');
const UserModel = require('../models/userModel');
const factory = require('./handlefactory');

exports.createUser = async (req) => {
  try {
    const UserFound = await UserModel.findOne({ email: req.payload.email });
    if (UserFound) {
      return Boom.conflict('User with this emailId already exists');
    }
    const doc = await UserModel.create(req.payload);
    return { status: 'success', data: doc, statusCode: 200 };
  } catch (err) {
    return Boom.badImplementation();
  }
};

exports.getAllUsers = factory.getAll(UserModel);
exports.getUserDetails = factory.getOne(UserModel);
exports.updateUser = factory.updateOne(UserModel);
exports.deleteUser = factory.deleteOne(UserModel);
