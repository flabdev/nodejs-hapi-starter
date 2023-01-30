const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, default: null },
    firstName: { type: String, required: true },
    lastName: { type: String, default: null, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', UserSchema);
