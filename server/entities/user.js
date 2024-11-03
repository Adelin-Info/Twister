const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {
    userName:{
      type: String,
      required : true,
      unique: true,
      trim: true
    },

    email:{
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6
    },

    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    followers: {
      type: [String],
    },

    followings: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
  
);

const User = mongoose.model('users', userSchema);
module.exports = User;