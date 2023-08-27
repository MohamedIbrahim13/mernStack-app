const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = _id => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 });
    res.status(201).json({ user, email, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 });
    res.status(201).json({ user, email, token });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(201).json();
};

module.exports = { signup, login, logout };
