const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("No email or password provided!!");
  }
  if (!validator.default.isEmail(email)) {
    throw Error("Email is not valid!!");
  }
  if (!validator.default.isStrongPassword(password)) {
    throw Error("Password is not strong enough!!");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("No email or password provided!!");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("No such email exists!");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Ouch!!Worng Password!!");
  }
  return user;
};

const User = model("User", userSchema);

module.exports = User;
