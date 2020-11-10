require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Connected to the server..."));
// app.use(jwt());

// api routes
app.use("/users", require("./users/user.controller"));
app.use("/gallery", require("./gallery/gallery.controller"));

// global error handler
// app.use(errorHandler);

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
app.listen(port, function () {
  console.log("Server listening on port " + port);
});
