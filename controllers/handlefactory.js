const Boom = require('@hapi/boom');
const { NO_DOCUMENT } = require('../constants/index');

exports.createOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.create(req.payload);
    return { status: 'success', data: doc, statusCode: 200 };
  } catch (e) {
    return Boom.badImplementation();
  }
};

exports.getAll = (Model) => async (req, res) => {
  try {
    const docs = await Model.find({});
    return { status: 'success', data: docs, statusCode: 200 };
  } catch (e) {
    return Boom.badImplementation();
  }
};

exports.getOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findById(req.params.userId);
    if (!doc) {
      return Boom.notFound(NO_DOCUMENT);
    }
    return { status: 'success', data: doc, statusCode: 200 };
  } catch (e) {
    return Boom.badImplementation();
  }
};

exports.updateOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findById(req.params.userId);
    if (!doc) {
      return Boom.notFound(NO_DOCUMENT);
    }
    return await Model.findByIdAndUpdate(req.params.userId, req.payload, {
      new: true,
      runValidators: true,
    });
  } catch (e) {
    return Boom.badImplementation();
  }
};

exports.deleteOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findById(req.params.userId);
    if (!doc) {
      return Boom.notFound(NO_DOCUMENT);
    }
    return await Model.findByIdAndDelete(req.params.userId);
  } catch (e) {
    return Boom.badImplementation();
  }
};

exports.getOneWithPopulate = (Model, popOptions) => async (req, res, next) => {
  try {
    let query = Model.findById(req.params.userId);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return Boom.notFound(NO_DOCUMENT);
    }
    return { status: 'success', data: doc, statusCode: 200 };
  } catch (e) {
    return Boom.badImplementation();
  }
};
