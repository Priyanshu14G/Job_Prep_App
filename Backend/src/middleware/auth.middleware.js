const jwt = require("jsonwebtoken");
const TokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  console.log("--> Entered authUser middleware");
  const token = req.cookies?.token;
  console.log("--> Token:", token);

  if (!token) {
    console.log("--> Returning 401 because token is missing");
    return res.status(401).json({ message: "Token is not present" });
  }

  const isTokenBlacklisted = await TokenBlacklistModel.findOne({
    token,
  });

  if (isTokenBlacklisted) {
    return res.status(401).json({ message: "Token is invalid" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { authUser };
