const Boom = require('@hapi/boom');
const { NO_DOCUMENT } = require('../constants/index');

exports.createOne = Model => async req => {
  try {
    const doc = await Model.create(req.payload);
    return { status: 'success', data: doc, statusCode: 200 };
  } catch (err) {
    return Boom.badRequest(err.message);
  }
};

exports.getAll = Model => async () => {
  try {
    const docs = await Model.find({});
    return { status: 'success', data: docs, statusCode: 200 };
  } catch (err) {
    return Boom.badRequest(err.message);
  }
};

exports.getOne = Model => async req => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return Boom.notFound(NO_DOCUMENT);
    }
    return { status: 'success', data: doc, statusCode: 200 };
  } catch (err) {
    return Boom.badRequest(err.message);
  }
};

exports.updateOne = Model => async req => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return Boom.notFound(NO_DOCUMENT);
    }
    return await Model.findByIdAndUpdate(req.params.id, req.payload, {
      new: true,
      runValidators: true,
    });
  } catch (err) {
    return Boom.badRequest(err.message);
  }
};

exports.deleteOne = Model => async req => {
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return Boom.notFound(NO_DOCUMENT);
    }
    return await Model.findByIdAndDelete(req.params.id);
  } catch (err) {
    return Boom.badRequest(err.message);
  }
};

exports.getOneWithPopulate = (Model, popOptions) => async req => {
  try {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return Boom.notFound(NO_DOCUMENT);
    }
    return { status: 'success', data: doc, statusCode: 200 };
  } catch (err) {
    return Boom.badRequest(err.message);
  }
};
