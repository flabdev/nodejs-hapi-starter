const Boom = require('@hapi/boom');
const { NO_DOCUMENT } = require('../constants/index');

exports.createOne = Model => async req => {
  const doc = await Model.create(req.payload);
  return { status: 'success', data: doc, statusCode: 200 };
};

exports.getAll = Model => async () => {
  const docs = await Model.find({});
  return { status: 'success', data: docs, statusCode: 200 };
};

exports.getOne = Model => async req => {
  const doc = await Model.findById(req.params.id);
  if (!doc) {
    return Boom.notFound(NO_DOCUMENT);
  }
  return { status: 'success', data: doc, statusCode: 200 };
};

exports.updateOne = Model => async req => {
  const existedDoc = await Model.findById(req.params.id);
  if (!existedDoc) {
    return Boom.notFound(NO_DOCUMENT);
  }
  const doc = await Model.findByIdAndUpdate(req.params.id, req.payload, {
    new: true,
    runValidators: true,
  });
  return { status: 'success', data: doc, statusCode: 200 };
};

exports.deleteOne = Model => async req => {
  const existedDoc = await Model.findById(req.params.id);
  if (!existedDoc) {
    return Boom.notFound(NO_DOCUMENT);
  }
  const doc = await Model.findByIdAndDelete(req.params.id);
  return { status: 'success', message: `${doc} deleted from the Database` };
};

exports.getOneWithPopulate = (Model, popOptions) => async req => {
  let query = Model.findById(req.params.id);
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return Boom.notFound(NO_DOCUMENT);
  }
  return { status: 'success', data: doc, statusCode: 200 };
};
