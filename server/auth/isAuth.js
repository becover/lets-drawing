const config = require("../_config/config.json");
const jwt = require("jsonwebtoken");
const User = require("../users/user.model");
const errorGenerator = require("../_helpers/errorGenerator");

module.exports = async (req, res, next) => {
  try {
    // console.log("req.body", req.body);
    const token = req.body.Authorization;
    const decodedToken = jwt.verify(token, config.SECRETKEY);
    const { _id } = decodedToken;
    const user = await User.findOne({ _id });
    if (!user) errorGenerator("사용자를 찾을 수 없습니다.", 404);
    req.user = user;
    console.log("인증오켕");
    next();
  } catch (err) {
    err.message = "인증에 오류가 발생했습니다.";
    err.statusCode = 401;
    next(err);
  }
};
