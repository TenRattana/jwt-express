const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("token is required");
  }

  try {
    const decode = jwt.verify(token, config.TOKEN_KEY);
    req.person = decode;
  } catch (error) {
    return res.status(401).send("Invalid");
  }

  return next();
};

module.exports = verifyToken;
