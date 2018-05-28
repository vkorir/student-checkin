const mongoose = require("mongoose");
const { Schema } = mongoose;
const { users } = require("../config/constants").collections;

const userSchema = new Schema({
  code: String,
  googleId: String,
  sid: String,
  name: String,
  email: String,
  role: { type: String, default: "student" }
});

mongoose.model(users, userSchema);
