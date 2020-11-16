const config = require("_config/config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("_helpers/db");
const errorGenerator = require("../_helpers/errorGenerator");
const User = db.User;

const createUserData = async (userInput) => {
  const user = await userWithHashedPassword(userInput);
  return user.save();
};

const userWithHashedPassword = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({ username, hashedPassword });
  return user;
};

const signUp = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) res.status(404).json({ message: "아이디가 중복됩니다." });
    // errorGenerator("아이디가 중복됩니다. 다시 입력해주세요.", 404);
    await createUserData(req.body);
    res.status(201).json({ message: "회원가입이 되었습니다." });
  } catch (err) {
    next(err);
  }
};

const checkedDuplicate = async (req, res, next) => {
  try {
    const username = req.query.username;
    console.log(username);
    const user = await User.findOne({ username });
    if (user) res.status(404).json({ message: "아이디가 중복됩니다." });
    res.status(201).json({ message: "가입 할 수 있는 아이디입니다." });
    console.log("확인 오켕~~");
  } catch (err) {
    next(err);
  }
};

const createToken = (userId) => {
  const token = jwt.sign({ _id: userId.toString() }, config.SECRETKEY, {
    expiresIn: "1d",
  });
  return token;
};

const signIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) errorGenerator("Invalid input", 400);

    const user = await User.findOne({ username });
    if (!user) errorGenerator("사용자를 찾을 수 없습니다", 404);

    const checkPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!checkPassword) errorGenerator("비밀번호를 다시 확인해 주세요", 404);

    const token = createToken(user._id);
    res.status(201).json({ message: "OK", username: user.username, token });
    console.log("로그인오켕");
  } catch (err) {
    next(err);
  }
};

const checkedUsername = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) errorGenerator("사용자를 찾을 수 없습니다", 404);
    if (toString(user._id) === toString(req.user._id))
      res.status(200).json({ message: "로그인이 확인 되었습니다" });
    console.log("자동로그인 오켕!");
  } catch (err) {
    err.message = "자동 로그인중에 오류가 발생했습니다";
    err.statusCode = 401;
    next(err);
  }
};

module.exports = {
  checkedUsername,
  checkedDuplicate,
  signUp,
  signIn,
};
