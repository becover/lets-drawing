const express = require("express");
const router = express.Router();
const userService = require("./user.service");

//routers
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", userUpdate);
router.delete("/:id", _delete);

module.exports = router;

function authenticate(req, res, next) {
  console.log(req.body);
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    );
}

function register(req, res, next) {
  userService
    .createAccount(req.body)
    .then(() => res.status(200).json({ message: "signin success" }))
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.status(200).json(users))
    .catch((err) => next(err));
}

function getCurrent(req, res, next) {
  userService
    .getById(req.user.sub)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => (user ? res.json(user) : res.sendStatus(404)))
    .catch((err) => next(err));
}

function userUpdate(req, res, next) {
  userService
    .userUpdate(req.params.id, req.body)
    .then(() => res.status(200).json({ message: "update success" }))
    .catch((err) => next(err));
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.status(200).json({ message: "delete success" }))
    .catch((err) => next(err));
}
