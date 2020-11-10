const express = require("express");
const router = express.Router();
const userService = require("./user.service");

//routers
router.post("/signup", userService.signUp);
router.post("/signin", userService.signIn);

module.exports = router;
