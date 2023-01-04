import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    displayName: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: false,
    },
    salt: {
      type: String,
      require: false,
    },
  },
  modelOptions
);
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};
userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return (this.password = hash);
};
const userModel = mongoose.model("User", userSchema);
export default userModel;