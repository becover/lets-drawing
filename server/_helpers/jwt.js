const expressJwt = require("express-jwt");
const config = require("../_config/config.json");
const userService = require("../users/user.service");

function jwt() {
  const secret = config.secret;
  return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    // public routes that don't require authentication
    // 인증 요청이 필요없는 공개된 경로
    path: ["/users/authenticate", "/users/register"],
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  // revoke token if user no longer exists
  // 사용자가 더이상 존재하지 않으면 토큰 취소
  if (!user) {
    return done(null, true);
  }

  done();
}

module.exports = jwt;
