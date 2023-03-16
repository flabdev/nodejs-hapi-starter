const Joi = require('joi');
const usersController = require('../controllers/userController');

const userJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).unknown();

module.exports = [
  {
    method: 'POST',
    path: '/user',
    handler: usersController.createUser,
    config: {
      description: 'Create a new user',
      tags: ['api', 'user'],
      auth: false,
      validate: {
        payload: userJoiSchema,
      },
    },
  },
  {
    method: 'GET',
    path: '/users',
    handler: usersController.getAllUsers,
    config: {
      description: 'Get all users',
      tags: ['api', 'user'],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/user/{userId}',
    handler: usersController.getUserDetails,
    config: {
      description: 'Get user details',
      tags: ['api', 'user'],
      auth: false,
      validate: {
        params: Joi.object({
          userId: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/user/update/{userId}',
    handler: usersController.updateUser,
    config: {
      description: 'Update user details',
      tags: ['api', 'user'],
      auth: false,
      validate: {
        params: Joi.object({
          userId: Joi.string().required(),
        }),
        payload: userJoiSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/users/delete/{userId}',
    handler: usersController.deleteUser,
    config: {
      description: 'Delete user details',
      tags: ['api', 'user'],
      auth: false,
      validate: {
        params: Joi.object({
          userId: Joi.string().required(),
        }),
      },
    },
  },
];
