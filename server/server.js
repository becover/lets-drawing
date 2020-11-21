require("rootpath")();
require("dotenv").config();
const express = require("express");
const app = express();
const https = require("https");
const http = require("http");
const fs = require("fs");
const bodyParser = require("body-parser");
const errorHandler = require("./_helpers/error-handler");
const config = require("./_config/config.json");
const cors = require("cors");

process.env.NODE_ENV === "develop" &&
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(
  bodyParser.json({
    limit: "30mb",
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/", (req, res) =>
    res.sendFile(__dirname, "../client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => res.send("Connected to the server..."));
}

// api routes
app.use("/users", require("./users/user.controller"));
app.use("/gallery", require("./gallery/gallery.controller"));

// global error handler
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  const PORT =
    process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;

  const option = {
    ca: fs.readFileSync(config.ca),
    key: fs.readFileSync(config.key),
    cert: fs.readFileSync(config.cert),
  };

  http
    .createServer(function (req, res) {
      res.writeHead(301, {
        Location: "https://" + req.headers["host"] + req.url,
      });
      res.end();
    })
    .listen(80);
  https.createServer(option, app).listen(PORT, function () {
    console.log("Server listening on port " + PORT);
  });
} else {
  const port = 4000;
  app.listen(port, function () {
    console.log("Server listening on port " + port);
  });
}
