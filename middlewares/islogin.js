const jwt = require("jsonwebtoken");
const config = require("../config");

exports.isLogin = async (req, res, next) => {
  try {
    const token = req.get("Authorization");

    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded.data;
    next();

  } catch (err) {
    return res
      .status(401)
      .json({ Message: "User not autorized", Error: err });
  }
};
