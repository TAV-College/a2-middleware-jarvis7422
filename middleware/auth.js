const jwt = require("jsonwebtoken");
const { getUserByUsername } = require("../models/user.model");

const verifyToken = async (req, res, next) => {
  const token = req.cookies["authCookie"];

  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await getUserByUsername(payload.username);
    if (!user) return res.sendStatus(403);

    const permissions = user.permissions ?? 0;

    req.user = { username: payload.username, permissions };
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};


module.exports = {
  verifyToken,
};

