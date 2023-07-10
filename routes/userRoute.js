const usersController = require('../controllers/userController');
const { userJoiSchema, checkUserId } = require('../utils/userValidate');

module.exports = [
  {
    method: 'POST',
    path: '/api/v1/users',
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
    path: '/api/v1/users',
    handler: usersController.getAllUsers,
    config: {
      description: 'Get all users',
      tags: ['api', 'user'],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/api/v1/users/{id}',
    handler: usersController.getUserDetails,
    config: {
      description: 'Get user details',
      tags: ['api', 'user'],
      auth: false,
      validate: {
        params: checkUserId,
      },
    },
  },
  {
    method: 'PUT',
    path: '/api/v1/users/{id}',
    handler: usersController.updateUser,
    config: {
      description: 'Update user details',
      tags: ['api', 'user'],
      auth: false,
      validate: {
        params: checkUserId,
        payload: userJoiSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/v1/users/{id}',
    handler: usersController.deleteUser,
    config: {
      description: 'Delete user details',
      tags: ['api', 'user'],
      auth: false,
      validate: {
        params: checkUserId,
      },
    },
  },
];
