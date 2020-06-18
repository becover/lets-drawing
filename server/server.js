require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("_helpers/jwt");
const errorHandler = require("_helpers/eroror-handler");

app.use(bodyParser.urlendcoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(jwt());

// api routes
app.use("/users", require("./users/users.controller"));

// global error handler
app.use(errorHandler);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
