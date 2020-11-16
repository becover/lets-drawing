const express = require("express");
const isAuth = require("../auth/isAuth");
const router = express.Router();
const userService = require("./user.service");

//routers
router.post("/", isAuth, userService.checkedUsername);
router.get("/ckeckusername", userService.checkedDuplicate);
router.post("/signup", userService.signUp);
router.post("/signin", userService.signIn);

module.exports = router;
