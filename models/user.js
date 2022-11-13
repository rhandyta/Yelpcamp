const mongoose = require('mongoose');
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose')


const schemaUser = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  }
})

schemaUser.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", schemaUser);
