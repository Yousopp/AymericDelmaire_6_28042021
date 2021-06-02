const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');
const mongooseFieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const dotenv = require('dotenv').config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Veuillez entrer votre adresse email"],
  },
  password: { type: String, required: true}
});

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongooseFieldEncryption, { fields: ["email"], secret: process.env.CRYPTO_SECRET_KEY, saltGenerator: function (secret) {
  return "1234567890123456";
},
});

module.exports = mongoose.model('User', userSchema);