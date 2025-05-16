const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../models/user.model");

const encryptPassword = (rawPassword) => {
  return bcrypt.hashSync(rawPassword, 10);
};

const validateUser = async (username, password) => {
  const user = await getUserByUsername(username);
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  return user; 
};

const generateToken = (username) => {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24,
  });
};

module.exports = {
  encryptPassword,
  validateUser,
  generateToken
};
