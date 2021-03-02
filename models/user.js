const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const { errMessages } = require("../data/messages");
const AuthError = require("../helpers/authorization-error");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(errMessages.login));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError(errMessages.login));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
